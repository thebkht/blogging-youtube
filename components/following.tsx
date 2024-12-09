"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { PostCard } from "./post-card";
import { PostPage } from "@/lib/types";
import { InfinitiveContainer } from "./infinitive-container";
import { Loader2 } from "lucide-react";
import PostSkeleton from "./post-skeleton";

export default function Following() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["post-feed", "following"],
    queryFn: ({ pageParam = 0 }) =>
      axios
        .get<PostPage>(`/api/posts/following`, {
          params: { cursor: pageParam },
        })
        .then((res) => res.data),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.data.nextCursor,
  });

  const posts = data?.pages.flatMap((page) => page.data.posts) ?? [];

  if (isFetching && !posts.length) {
    return <PostSkeleton />;
  }

  if (status === "pending") {
    return <PostSkeleton />;
  };

  if (status === "success" && !posts.length) {
    return (
      <p className="w-full p-4 text-center text-muted-foreground">
        No posts found.
      </p>
    );
  }

  if (status === "error") {
    return (
      <p className="w-full p-4 text-center text-destructive">
        An error occurred while fetching posts. Please try again later.
      </p>
    );
  }

  return (
    <>
      <InfinitiveContainer
        onIntersect={() => hasNextPage && !isFetching && fetchNextPage()}
        className="space-y-4"
      >
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        {isFetchingNextPage && (
          <Loader2 className="mx-auto my-3 animate-spin" />
        )}
      </InfinitiveContainer>
    </>
  );
}
