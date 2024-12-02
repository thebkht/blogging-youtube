"use client";

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function EditorNavbar({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { data: session } = useSession();

  return (
    <nav className="absolute left-0 top-0 flex h-14 w-screen items-center justify-between border-b bg-background/65 p-4 shadow-md backdrop-blur-md">
      <Link
        href={`/${session?.user.username}`}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "flex items-center gap-2 p-2",
        )}
      >
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage
            src={session?.user?.image ?? ""}
            alt={session?.user?.name ?? ""}
          />
          <AvatarFallback className="rounded-lg">
            {session?.user?.name?.split(" ").map((name) => name[0])}
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{session?.user?.name}</span>
        </div>
      </Link>
      <div className="flex items-center gap-2">
        <Button onClick={() => onOpenChange(!isOpen)}>Post</Button>
      </div>
    </nav>
  );
}
