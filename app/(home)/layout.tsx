import SiteSidebar from "@/components/site-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-4xl">
      <SiteSidebar className="left-auto" />
      <div className="flex-1 overflow-y-auto p-4">{children}</div>
    </div>
  );
}
