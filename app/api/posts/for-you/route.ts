import { auth } from "@/lib/auth";
import { db } from "@/lib/db/drizzle";
import { bookmarks, comments, posts, users } from "@/lib/db/schema";
import { and, count, eq, ne } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cursor = Number(req.nextUrl.searchParams.get("cursor"));
    const limit = 10;
    const session = await auth();
    const user = session?.user;

    const postData = await db
      .select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        description: posts.description,
        user: {
          id: users.id,
          username: users.username,
          name: users.name,
          image: users.image,
          bio: users.bio,
          followers: count(users.id),
          followings: count(users.id),
        },
        publishedAt: posts.publishedAt,
        image: {
          url: posts.image,
          blurhash: posts.imageBlurhash,
        },
        slug: posts.slug,
        likes: posts.likes,
        reads: posts.reads,
        comments: count(comments.id),
        bookmarks: count(bookmarks.id),
      })
      .from(posts)
      .limit(limit + 1)
      .leftJoin(comments, eq(posts.id, comments.postId))
      .leftJoin(bookmarks, eq(posts.id, bookmarks.postId))
      .leftJoin(users, eq(posts.authorId, users.id))
      .where(
        and(
          eq(posts.published, true),
          user ? ne(posts.authorId, user.id) : undefined,
        ),
      )
      .orderBy(posts.publishedAt)
      .offset(cursor ? cursor : 0)
      .groupBy(posts.id, users.id);

    const nextCursor =
      postData.length > limit ? postData[postData.length].id : null;

    return NextResponse.json({
      data: {
        posts: postData.slice(0, limit),
        nextCursor: nextCursor,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
