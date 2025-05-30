"use client";
import React from "react";
import clsx from "clsx";
import { useScrollDirection } from "@/lib/hooks/useScrollDirection";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle";

const Header = () => {
  const scrollDirection = useScrollDirection();

  return (
    <header
      className={clsx(
        "fixed top-0 w-full z-50 transition-transform duration-300",
        scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <div className="bg-white shadow-md">
        <div className="max-w-7xl p-4 sm:px-8 mx-auto flex items-center justify-between">
          <Link href="/">
            <Image src="/assets/logo.png" alt="Logo" width={100} height={40} />
          </Link>
          <nav className="hidden md:flex space-x-4">
            <ThemeToggle />
            <Link href="/signup">
              <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">
                Signup
              </button>
            </Link>
            <Link href="/login">
              <button className="px-4 py-2 rounded border border-blue-600 text-blue-600 hover:bg-blue-50 transition">
                Login
              </button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
