import { request } from '@/lib/datocms';

/* Tags in DatoCMS do double duty: two of them mark the *audience* a post is
 * written for, and the rest are the *category* shown as the coloured pill.
 * Splitting them here keeps that CMS convention in one place. IDs match the
 * ones the main Reslink app filters on. */
export const AUDIENCE_TAG_IDS = {
  company: 'aeJJmqsiQ0--mBtos5DO6w',
  jobSeeker: 'XEc58GYWSrez_p8nJSUqqg',
} as const;
const AUDIENCE_IDS: string[] = Object.values(AUDIENCE_TAG_IDS);

export type DatoTag = { id: string; name: string; textColor: string | null; bgColor: string | null };

/** A single node in DatoCMS structured text (DAST). */
export type DastNode = {
  type: string;
  value?: string;
  marks?: string[];
  level?: number;
  style?: 'bulleted' | 'numbered';
  url?: string;
  item?: string;
  children?: DastNode[];
};

type DatoImage = { url: string; width: number | null; height: number | null; alt: string | null } | null;

export type DatoPostRecord = {
  id: string;
  title: string | null;
  slug: string | null;
  description: string | null;
  readTimeline: string | null;
  isPrivate: boolean;
  _firstPublishedAt: string | null;
  coverImage: { url: string; responsiveImage: DatoImage } | null;
  tags: DatoTag[];
  content?: { value: { document: DastNode }; blocks: ContentBlock[] } | null;
};

export type ContentBlock =
  | { __typename: 'ImageBlockRecord'; id: string; image: DatoImage }
  | { __typename: 'LinkImageBlockRecord'; id: string; href: string | null; image: DatoImage }
  | { __typename: 'VideoBlockRecord'; id: string; videoInContent: { url: string } | null };

/** The shape the blog UI renders — kept identical to the old hardcoded POSTS
 *  entries so the existing markup and styling carry over unchanged. */
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  tagColor: string;
  tagBg: string;
  date: string;
  read: string;
  image: string;
  imageFull: string;
  document: DastNode | null;
  blocks: ContentBlock[];
};

const POST_FIELDS = `
  id
  title
  slug
  description
  readTimeline
  isPrivate
  _firstPublishedAt
  coverImage {
    url
    responsiveImage(imgixParams: { fit: crop, w: 900, h: 560, auto: format }) {
      src
      width
      height
      alt
    }
  }
  tags { id name textColor bgColor }
`;

const ALL_POSTS_QUERY = `
  query AllPosts {
    allPosts(first: 100, orderBy: _firstPublishedAt_DESC, filter: { isPrivate: { eq: false } }) {
      ${POST_FIELDS}
    }
  }
`;

const POST_BY_SLUG_QUERY = `
  query PostBySlug($slug: String!) {
    post(filter: { slug: { eq: $slug }, isPrivate: { eq: false } }) {
      ${POST_FIELDS}
      content {
        value
        blocks {
          __typename
          ... on ImageBlockRecord { id image { url width height alt } }
          ... on LinkImageBlockRecord { id href image { url width height alt } }
          ... on VideoBlockRecord { id videoInContent { url } }
        }
      }
    }
  }
`;

/** "Mar 20, 2026" — matches the format the blog cards were already using. */
function formatDate(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/* Some descriptions were entered in the CMS with a literal "Metadescription:"
 * prefix. It's clearly an authoring artefact rather than copy, so strip it
 * rather than render it on the card. */
function cleanExcerpt(raw: string | null): string {
  return (raw ?? '').replace(/^\s*meta\s*description\s*:\s*/i, '').trim();
}

function toPost(r: DatoPostRecord): Post {
  const category = r.tags.find(t => !AUDIENCE_IDS.includes(t.id)) ?? r.tags[0] ?? null;
  const cover = r.coverImage?.responsiveImage?.url ?? r.coverImage?.url ?? '';
  return {
    slug: r.slug ?? '',
    title: r.title ?? 'Untitled',
    excerpt: cleanExcerpt(r.description),
    tag: category?.name ?? 'Article',
    tagColor: category?.textColor ?? '#5C6070',
    tagBg: category?.bgColor ?? '#ECEEF1',
    date: formatDate(r._firstPublishedAt),
    read: r.readTimeline ?? '',
    image: cover,
    imageFull: r.coverImage?.url ?? cover,
    document: r.content?.value?.document ?? null,
    blocks: r.content?.blocks ?? [],
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const data = await request<{ allPosts: DatoPostRecord[] }>({ query: ALL_POSTS_QUERY });
  return data.allPosts.filter(p => p.slug).map(toPost);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const data = await request<{ post: DatoPostRecord | null }>({
    query: POST_BY_SLUG_QUERY,
    variables: { slug },
  });
  return data.post ? toPost(data.post) : null;
}

/** Category names present across the published posts, in CMS-defined order. */
export async function getCategoryTags(): Promise<DatoTag[]> {
  const data = await request<{ allTags: DatoTag[] }>({
    query: `query AllTags { allTags { id name textColor bgColor } }`,
  });
  return data.allTags.filter(t => !AUDIENCE_IDS.includes(t.id));
}
