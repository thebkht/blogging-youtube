import { PostForm } from "@/components/forms/post";
import { getPost } from "@/lib/actions";
import { postFormSchema } from "@/lib/types";

export default async function EditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const post = await getPost(id);

  return (
    <>
      <PostForm post={postFormSchema.parse(post)} />
    </>
  );
}
