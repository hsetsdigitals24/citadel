import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { BlogEditor } from "@/components/admin/BlogEditor";

export default async function EditBlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await prisma.blogPost.findUnique({ where: { id: params.id } });
  if (!post) notFound();
  return (
    <BlogEditor
      initial={{
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        coverImage: post.coverImage,
        published: post.published,
      }}
    />
  );
}
