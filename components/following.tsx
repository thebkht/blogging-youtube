"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { PostCard } from "./post-card";
import { PostPage } from "@/lib/types";
import { InfinitiveContainer } from "./infinitive-container";

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
    return <p>Loading...</p>;
  }

  if (status === "success" && !posts.length) {
    return <p>No posts found.</p>;
  }

  if (status === "error") {
    return (
      <p>An error occurred while fetching posts. Please try again later.</p>
    );
  }
  console.log(posts, hasNextPage, isFetchingNextPage);

  return (
    <>
      <InfinitiveContainer
        onIntersect={() => hasNextPage && !isFetching && fetchNextPage()}
        className="space-y-4"
      >
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </InfinitiveContainer>
    </>
  );
}
