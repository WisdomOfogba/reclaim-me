import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/landing/Header";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ReclaimMe - AI Legal Letter Generator",
    template: "%s | ReclaimMe",
  },
  description:
    "Easily generate professional legal letters for scams or incidents using AI. Streamline your response and protect your rights with ReclaimMe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${roboto.variable} antialiased`}>
        <div className=" font-[family-name:var(--font-roboto)]">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
