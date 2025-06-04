import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import "driver.js/dist/driver.css";
import { Toaster } from "sonner";
import { ThemeProviders } from "@/lib/context/ThemeProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "ReclaimMe - Victim Support Portal",
    template: "%s | ReclaimMe",
  },
  description:
    "Report illegal or fraudulent activities to government officials",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-grad-back`}>
        <ThemeProviders
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProviders>
        <Toaster />
      </body>
    </html>
  );
}
