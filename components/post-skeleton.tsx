import { Skeleton } from "./ui/skeleton";

export default function PostSkeleton() {
  return (
    <>
      <article>
        <div className="flex gap-2 rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-4 pr-0">
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
          <div className="grow">
            <div className="flex grow flex-row items-center justify-between p-4">
              <div className="flex items-center gap-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-20" />
                <span className="mx-1 text-sm"></span>
                <Skeleton className="h-4 w-14" />
              </div>
            </div>
            <div className="p-4 pt-0">
              <Skeleton className="mb-1.5 h-5 w-full" />
              <Skeleton className="mb-2.5 h-5 w-48" />
              <Skeleton className="mb-2.5 h-48 w-full" />
              <Skeleton className="mb-1.5 h-4 w-full" />
              <Skeleton className="mb-1.5 h-4 w-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
