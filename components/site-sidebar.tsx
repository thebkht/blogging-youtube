"use client";
import {
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Icons } from "./icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ChevronsUpDown } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

const items = [
  {
    title: "Home",
    slug: "/",
    icon: {
      default: Icons.home,
      active: Icons.homeActive,
    },
  },
  {
    title: "Explore",
    slug: "/explore",
    icon: {
      default: Icons.explore,
      active: Icons.exploreActive,
    },
  },
  {
    title: "Notifications",
    slug: "/notifications",
    icon: {
      default: Icons.notifications,
      active: Icons.notificationsActive,
    },
  },
  {
    title: "Bookmarks",
    slug: "/bookmarks",
    icon: {
      default: Icons.bookmarks,
      active: Icons.bookmarksActive,
    },
  },
];

export default function SiteSidebar({
  ...props
}: React.ComponentPropsWithoutRef<typeof Sidebar>) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { setTheme, theme } = useTheme();
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Icons.logo className="h-8 w-8" />
        <span className="sr-only">falsenotes</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.slug}>
                    {pathname === item.slug ? (
                      <item.icon.active className="h-7 w-7" />
                    ) : (
                      <item.icon.default className="h-7 w-7" />
                    )}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            {session && (
              <>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href={`/${session.user.username}`}>
                      {pathname === `/${session.user.username}` ? (
                        <Icons.profileActive className="h-7 w-7" />
                      ) : (
                        <Icons.profile className="h-7 w-7" />
                      )}
                      <span>Profile</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "my-2 hover:text-primary-foreground",
                    )}
                  >
                    Post
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      {session ? (
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
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
                      <span className="truncate font-semibold">
                        {session?.user?.name}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src={session?.user?.image ?? ""}
                          alt={session?.user?.name ?? ""}
                        />
                        <AvatarFallback className="rounded-lg">
                          {session?.user?.name
                            ?.split(" ")
                            .map((name) => name[0])}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {session?.user?.name}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
                      <DropdownMenuSubContent>
                        <DropdownMenuCheckboxItem
                          checked={theme === "light"}
                          onCheckedChange={() => setTheme("light")}
                        >
                          Light
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={theme === "dark"}
                          onCheckedChange={() => setTheme("dark")}
                        >
                          Dark
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      ) : (
        <Button size="lg" className="w-full" onClick={() => signIn("google")}>
          Sign in
        </Button>
      )}
    </Sidebar>
  );
}
