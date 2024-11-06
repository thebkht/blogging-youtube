import SiteSidebar from "@/components/site-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteSidebar />
      <div className="flex-1 overflow-y-auto p-4">{children}</div>
    </>
  );
}
