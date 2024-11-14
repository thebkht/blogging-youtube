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
