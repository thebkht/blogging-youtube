import { auth } from "@/lib/auth";
import { db } from "@/lib/db/drizzle";
import { follows, posts, users } from "@/lib/db/schema";
import { and, count, eq, ne, sql } from "drizzle-orm";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function TrendsSidebar() {
  return (
    <div className="sticky top-4 hidden w-72 space-y-4 py-4 md:block lg:w-80">
      <Suspense fallback={<Loader2 className="mx-auto my-3 animate-spin" />}>
        <TrendsContent />
      </Suspense>
    </div>
  );
}

async function TrendsContent() {
  const [trendingPosts, whoToFollowData] = await Promise.all([
    getTrendingPosts(),
    getWhoToFollow(),
  ]);

  return (
    <>
      {trendingPosts.length > 0 && (
        <div className="space-y-4 rounded-xl border bg-card p-4 text-card-foreground shadow">
          <h2 className="text-xl font-bold">Trending Posts</h2>
          <div className="space-y-2">
            {trendingPosts.map((post) => (
              <Link
                key={post.id}
                href={`/${post.user?.username}/${post.slug}`}
                className="line-clamp-1 flex flex-col gap-1 underline-offset-2 hover:underline"
              >
                <h3 className="text-base font-medium">{post.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      )}
      {whoToFollowData.length > 0 && (
        <div className="space-y-4 rounded-xl border bg-card p-4 text-card-foreground shadow">
          <h2 className="text-xl font-bold">Who to Follow</h2>
          <div className="space-y-2">
            {whoToFollowData.map((user) => (
              <div className="flex items-center gap-1.5" key={user.id}>
                <Avatar>
                  <AvatarImage src={user.image ?? ""} alt={user.username} />
                  <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                </Avatar>
                <Link
                  href={`/${user.username}`}
                  className="line-clamp-1 flex flex-col gap-1 underline-offset-2 hover:underline"
                >
                  <h3 className="text-base font-medium">{user.name}</h3>
                  <p className="text-muted-foreground">@{user.username}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

async function getTrendingPosts() {
  const data = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      user: {
        username: users.username,
        name: users.name,
      },
    })
    .from(posts)
    .leftJoin(users, eq(posts.authorId, users.id))
    .where(eq(posts.published, true))
    .orderBy(sql`reads DESC`)
    .limit(5);
  return data;
}

async function getWhoToFollow() {
  const session = await auth();

  if (!session?.user) {
    // Get top users with the most followers
    const data = await db
      .select({
        id: users.id,
        username: users.username,
        name: users.name,
        image: users.image,
        followersCount: count(follows.followerId).as("followersCount"),
      })
      .from(users)
      .leftJoin(follows, eq(users.id, follows.followeeId))
      .groupBy(users.id)
      .orderBy(sql`followersCount DESC`)
      .limit(5);
    return data;
  } else {
    // Get users not followed by the current user
    const data = await db
      .select({
        id: users.id,
        username: users.username,
        name: users.name,
        image: users.image,
        followersCount: count(follows.followerId).as("followersCount"),
      })
      .from(users)
      .where(
        and(
          ne(users.id, session.user.id),
          sql`NOT EXISTS (
            SELECT 1 FROM ${follows}
            WHERE ${follows.followerId} = ${session.user.id}
            AND ${follows.followeeId} = ${users.id}
          )`,
        ),
      )
      .groupBy(users.id)
      .orderBy(sql`followersCount DESC`)
      .limit(5);
    return data;
  }
}
