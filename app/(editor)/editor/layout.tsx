import "@/app/prosemirror.css";

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col">{children}</div>
  );
}
