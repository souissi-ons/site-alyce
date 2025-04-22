// app/(main)/layout.tsx
import { Footer } from "@/components/footer";
import HeaderWrapper from "@/components/HeaderWrapper";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderWrapper />
      {children}
      <Footer />
    </>
  );
}
