import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";

export default function Home() {
  return (
    <div className="flex flex-col max-w-7xl mx-auto min-h-screen px-4 sm:px-8 pt-20 gap-16">
      <main className="flex flex-col">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}
