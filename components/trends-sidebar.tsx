import { auth } from "@/lib/auth";
import { db } from "@/lib/db/drizzle";
import { follows, posts, users } from "@/lib/db/schema";
import { and, eq, isNull, ne } from "drizzle-orm";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function TrendsSidebar() {
  return (
    <div className="sticky top-4 hidden w-72 space-y-4 py-4 md:block lg:w-80">
      <Suspense fallback={<Loader2 className="mx-auto my-3 animate-spin" />}>
        <TrendingPosts />
        <WhoToFollow />
      </Suspense>
    </div>
  );
}

async function TrendingPosts() {
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
    .orderBy(posts.reads)
    .where(eq(posts.published, true))
    .limit(5);

  return (
    <div className="space-y-4 rounded-xl border bg-card p-4 text-card-foreground shadow">
      <h2 className="text-xl font-bold">Trending Posts</h2>
      <div className="space-y-2">
        {data.map((post) => (
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
  );
}

async function WhoToFollow() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }
  const data = await db
    .select({
      id: users.id,
      username: users.username,
      name: users.name,
      image: users.image,
    })
    .from(users)
    .leftJoin(
      follows,
      and(
        eq(follows.followeeId, users.id),
        eq(follows.followerId, session.user.id),
      ),
    )
    .where(and(ne(users.id, session.user.id), isNull(follows.followeeId)))
    .limit(5);

  if (!data.length) {
    return null;
  }

  return (
    <div className="space-y-4 rounded-xl border bg-card p-4 text-card-foreground shadow">
      <h2 className="text-xl font-bold">Who to Follow</h2>
      <div className="space-y-2">
        {data.map((user) => (
          <div className="flex items-center gap-1.5" key={user.id}>
            <Avatar>
              <AvatarImage src={user.image ?? ""} alt={user.username} />
              <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
            </Avatar>
            <Link
              key={user.id}
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
  );
}
