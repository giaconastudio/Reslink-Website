import type { MetadataRoute } from 'next';
import { getAllPosts } from './blog/queries';
import { SITE_URL } from '@/lib/links';

// Next requires this to be a literal — keep in sync with BLOG_REVALIDATE, so a
// newly published article shows up here as soon as its page does.
export const revalidate = 300;

/* Every indexable marketing page. Left out on purpose:
   - /login — a leftover mock; every "Log in" now goes to the app's sign-in.
   - /careers — orphaned; open roles live on the app's company page.
   Add new pages here when you add them under src/app. */
const STATIC_PATHS = [
  '/',
  '/job-seekers',
  '/students',
  '/veterans',
  '/companies',
  '/agencies',
  '/universities',
  '/pricing',
  '/templates',
  '/oliviastone',
  '/blog',
  '/about',
  '/affiliates',
  '/help',
  '/contact',
  '/contact/sales',
  '/contact/support',
  '/get-started',
  '/eligibility',
  '/privacy',
  '/terms',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  return [
    ...STATIC_PATHS.map(path => ({ url: `${SITE_URL}${path === '/' ? '' : path}` })),
    ...posts.map(post => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt ?? undefined,
    })),
  ];
}
