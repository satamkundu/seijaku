"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Search, ShoppingBag, User } from "lucide-react";
import { useState } from "react";
import MenuSlider from "./MenuSlider";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="brand-surface fixed top-0 z-50 flex h-[72px] w-full items-center sm:h-[76px]">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6">
          <div aria-hidden />

          <div className="flex items-center justify-center gap-5 text-[#e0c98a] sm:gap-6 md:gap-7">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setIsMenuOpen(true)}
              className="opacity-90 transition-opacity duration-200 hover:opacity-100"
            >
              <Menu size={18} strokeWidth={1.9} className="sm:h-5 sm:w-5" />
            </button>

            <Link href="/" aria-label="Go to home page" className="inline-flex items-center justify-center">
              <Image
                src="/images/seijaku-emblem-g.png"
                alt="Seijaku emblem"
                width={48}
                height={48}
                className="h-auto w-[40px] sm:w-[44px] md:w-[48px]"
                priority
              />
            </Link>

            <button
              type="button"
              aria-label="Search"
              className="opacity-90 transition-opacity duration-200 hover:opacity-100"
            >
              <Search size={18} strokeWidth={1.9} className="sm:h-5 sm:w-5" />
            </button>

            <button
              type="button"
              aria-label="User account"
              className="opacity-90 transition-opacity duration-200 hover:opacity-100"
            >
              <User size={18} strokeWidth={1.9} className="sm:h-5 sm:w-5" />
            </button>

            <button
              type="button"
              aria-label="Cart"
              className="opacity-90 transition-opacity duration-200 hover:opacity-100"
            >
              <ShoppingBag size={18} strokeWidth={1.9} className="sm:h-5 sm:w-5" />
            </button>
          </div>

          <div aria-hidden />
        </div>
      </header>

      <MenuSlider isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
