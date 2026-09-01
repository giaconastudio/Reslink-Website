import { getAllPosts } from './queries';
import BlogIndex from './BlogIndex';

// Next requires this to be a literal — keep in sync with BLOG_REVALIDATE.
export const revalidate = 300;

export default async function BlogPage() {
  const posts = await getAllPosts();
  return <BlogIndex posts={posts} />;
}
