import { z } from "zod";

export const postFormSchema = z.object({
  id: z.string(),
  authorId: z.string(),
  title: z.string().min(3, "Title is too short"),
  description: z.string(),
  slug: z.string(),
  content: z.string(),
  published: z.boolean(),
  image: z.string().optional(),
  imageBlurhash: z.string().optional(),
});

export interface PostData {
  id: string;
  title: string;
  description: string;
  content: string;
  publishedAt: Date;
  image: {
    url: string;
    blurhash: string;
  };
  slug: string;
  likes: number;
  reads: number;
  comments: number;
  bookmarks: number;
  user: {
    id: string;
    username: string;
    name: string;
    image: string;
    bio: string;
    followers: number;
    followings: number;
  };
}

export interface PostPage {
  data: {
    posts: PostData[];
    nextCursor: string | null;
  };
}
