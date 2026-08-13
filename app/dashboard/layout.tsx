import SideBarMenu from "@/src/components/SideBarMenu/SideBarMenu";
import "../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <main className="flex gap-10 w-screen h-screen justify-center pt-10 ">
          <SideBarMenu />
          {children}
      </main>
  );
}
