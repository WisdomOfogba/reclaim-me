"use client";
import React from "react";
import clsx from "clsx";
import { useScrollDirection } from "@/lib/hooks/useScrollDirection";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/learn-more", label: "Learn More" },
    { href: "/help", label: "Help" },
    { href: "/contact", label: "Contact" },
    { href: "/dashboard", label: "Dashboard" },
  ];
  const scrollDirection = useScrollDirection();

  return (
      <nav
        className={clsx(
          "border-b bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm fixed w-full top-0 z-50 border-slate-200 dark:border-slate-800 transition-transform duration-300",
          scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
        )}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/assets/logo.png"
                alt="Reclaimme Logo"
                width={100}
                height={50}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link href="/signin">
                <Button
                  variant="ghost"
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Sign In
                </Button>
              </Link>
              <ThemeToggle />
              <Link href="/signup">
                <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile Navigation */}
            <div className="lg:hidden flex items-center space-x-2">
              <ThemeToggle />
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col space-y-4 mt-8">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <div className="border-t pt-4 space-y-2">
                      <Link href="/signin" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full">
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/signup" onClick={() => setIsOpen(false)}>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    // </header>
  );
};

export default Header;