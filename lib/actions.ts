"use server";

import { eq } from "drizzle-orm";
import { auth } from "./auth";
import { db } from "./db/drizzle";
import { posts } from "./db/schema";
import { slugify } from "./utils";
import { put } from "@vercel/blob";
import { postFormSchema } from "./types";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const getPost = async (id: string) => {
  const post = await db.select().from(posts).where(eq(posts.id, id));

  return post[0];
};

export const createPost = async (data?: z.infer<typeof postFormSchema>) => {
  const session = await auth();

  if (!session) {
    throw new Error("Not authenticated");
  }

  const post = await db
    .insert(posts)
    .values({
      authorId: session.user.id,
      title: data ? data.title : "Untitled",
      description: data ? data.description : "",
      slug: data ? data.slug : slugify(),
      image: data ? data.image : "",
    })
    .returning({ id: posts.id });

  revalidatePath(`/${session.user.username}/`);

  return post[0];
};

export const updatePost = async (
  id: string,
  data: z.infer<typeof postFormSchema>,
) => {
  const session = await auth();

  if (!session) {
    throw new Error("Not authenticated");
  }

  const post = await db
    .update(posts)
    .set(data)
    .where(eq(posts.id, id))
    .returning({ slug: posts.slug });

  revalidatePath(`/${session.user.username}/`);
  revalidatePath(`/${session.user.username}/${post[0].slug}`);
  
  return post[0];
};

export const isValidSlug = async (slug: string) => {
  const post = await db.select().from(posts).where(eq(posts.slug, slug));

  return post.length === 0;
};

export const uploadImage = async (file: File, filename: string) => {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error(
      "Missing BLOB_READ_WRITE_TOKEN. Don't forget to add that to your .env file.",
    );
  }

  const contentType = file.type;
  const fileType = `.${contentType.split("/")[1]}`;

  // construct final filename based on content-type if not provided
  const finalName = filename.includes(fileType)
    ? `post_covers/${filename}`
    : `post_covers/${filename}${fileType}`;
  const blob = await put(finalName, file, {
    contentType,
    access: "public",
  });

  return blob;
};
