import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '../queries';
import ArticleView from './ArticleView';

// Next requires this to be a literal — keep in sync with BLOG_REVALIDATE.
export const revalidate = 300;

/** Pre-render every published article at build time. */
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Article not found · Reslink' };
  return {
    title: `${post.title} · Reslink`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.imageFull ? [post.imageFull] : undefined,
      type: 'article',
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, all] = await Promise.all([getPostBySlug(slug), getAllPosts()]);
  if (!post) notFound();

  const related = all.filter(p => p.slug !== slug && p.tag === post.tag).slice(0, 3);
  return <ArticleView post={post} related={related} />;
}
