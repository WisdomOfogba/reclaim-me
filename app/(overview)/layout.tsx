import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      
      <div className="flex flex-col max-w-7xl mx-auto min-h-screen pt-20 gap-16">
        <Header />
        <main className="flex flex-col px-2.5">{children}</main>
      </div>

      <Footer />
    </div>
  );
}
