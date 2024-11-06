import { SidebarProvider as SidebarProviderPrimitive } from "../ui/sidebar";

export function SidebarProvider({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof SidebarProviderPrimitive>) {
  return (
    <>
      <SidebarProviderPrimitive {...props}>{children}</SidebarProviderPrimitive>
    </>
  );
}
