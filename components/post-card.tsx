import { PostData } from "@/lib/types";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, formatDate } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import Image from "next/image";

export function PostCard({
  post,
  className,
  ...props
}: { post: PostData } & React.ComponentPropsWithoutRef<typeof Card>) {
  return (
    <article>
      <Card className={cn("flex gap-2", className)} {...props}>
        <Avatar>
          <AvatarImage src={post.user.image} alt={post.user.username} />
          <AvatarFallback>{post.user.username.charAt(0)}</AvatarFallback>
        </Avatar>
        <CardContent>
          <CardHeader className="flex-row items-center justify-between">
            <div className="flex items-center gap-1">
              <Link href={`/${post.user.username}`} className="font-bold">
                {post.user.name}
              </Link>
              <span className="text-muted-foreground">
                @{post.user.username}
              </span>
              <span className="mx-0.5">·</span>
              <p className="text-muted-foreground">
                {formatDate(post.publishedAt)}
              </p>
            </div>
          </CardHeader>
          <CardTitle>
            <Link
              href={`/${post.user.username}/${post.slug}`}
              className="font-bold"
            >
              {post.title}
            </Link>
          </CardTitle>
          {post.image.url !== "" && (
            <div className="relative w-full">
              <Image
                src={post.image.url}
                alt={post.title}
                className="w-full rounded-md"
                placeholder="blur"
                fill
                blurDataURL={post.image.blurhash}
              />
            </div>
          )}
          <CardDescription>{post.description}</CardDescription>
        </CardContent>
      </Card>
    </article>
  );
}
