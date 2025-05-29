"use client";
import React from "react";
import clsx from "clsx";
import { useScrollDirection } from "@/lib/hooks/useScrollDirection";

const Header = () => {
  const scrollDirection = useScrollDirection();

  return (
    <header
      className={clsx(
        "fixed top-0 w-full z-50 transition-transform duration-300",
        scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <div className="bg-white shadow-md p-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold">My Awesome App</h1>
      </div>
    </header>
  );
};

export default Header;