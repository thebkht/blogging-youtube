"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { PostCard } from "./post-card";
import { PostPage } from "@/lib/types";

export default function ForYou() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["post-feed", "for-you"],
    queryFn: ({ pageParam = 0 }) =>
      axios
        .get<PostPage>(`/api/posts/for-you`, {
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
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Loading more..." : "Load more"}
        </button>
      )}
    </>
  );
}
