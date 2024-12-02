"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ContentField } from "./content-field";
import { postFormSchema } from "@/lib/types";
import { PostSettings } from "./post-settings";
import { EditorNavbar } from "../editor-nav";
import { isValidSlug, updatePost } from "@/lib/actions";
import { slugify } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export function PostForm({ post }: { post: z.infer<typeof postFormSchema> }) {
  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      ...post,
    },
  });

  const { data: session } = useSession();

  const router = useRouter();

  // const [image, setImage] = useState<File | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof postFormSchema>) {
    const data = { ...values, published: true };

    const post = await updatePost(data.id, data);
    setOpen(false);

    router.push(`/${session?.user.username}/${post.slug}`);
  }

  return (
    <>
      <EditorNavbar isOpen={open} onOpenChange={setOpen} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-16 space-y-8"
          id="post-editor"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Title..."
                    defaultValue={field.value}
                    onChange={async (e) => {
                      field.onChange(e.target.value);
                      const slug = e.target.value
                        .toLowerCase()
                        .replace(/\s+/g, "-");

                      if (await isValidSlug(slug)) {
                        form.setValue("slug", slug);
                      } else {
                        form.setValue("slug", slug + slugify());
                      }
                      console.log(form.getValues());
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description..."
                    defaultValue={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ContentField form={form} />
          <PostSettings form={form} open={open} onOpenChange={setOpen} />
        </form>
      </Form>
    </>
  );
}
