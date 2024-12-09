import SiteSidebar from "@/components/site-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-w-6xl flex w-full justify-center gap-5">
      <SiteSidebar className="left-auto" />
      {children}
    </div>
  );
}
