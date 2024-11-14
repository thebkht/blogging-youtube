"use server";

import { eq } from "drizzle-orm";
import { auth } from "./auth";
import { db } from "./db/drizzle";
import { posts } from "./db/schema";
import { slugify } from "./utils";

export const getPost = async (id: string) => {
  const post = await db.select().from(posts).where(eq(posts.id, id));

  return post[0];
};

export const createPost = async (data?: any) => {
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
    })
    .returning({ id: posts.id });

  return post[0];
};
