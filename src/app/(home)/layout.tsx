import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
