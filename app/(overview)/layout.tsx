import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full">
      <Header />

      <div className="flex flex-col max-w-7xl min-h-screen gap-16">
        <main className="flex flex-col">{children}</main>
      </div>

      <Footer />
    </div>
  );
}
