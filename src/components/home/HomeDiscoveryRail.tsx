import Link from "next/link";

import { commerceMenuSections } from "@/src/lib/navigation";

const leftMenuItems = commerceMenuSections.slice(0, 2);
const rightMenuItems = commerceMenuSections.slice(2);

function MenuLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-[36px] shrink-0 items-center whitespace-nowrap px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-[#4f493f] transition-colors duration-300 hover:text-[#1f1a16] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8e806e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#ece5d8] sm:px-4 sm:text-[11px]"
    >
      {label}
    </Link>
  );
}

export default function HomeDiscoveryRail() {
  return (
    <nav
      aria-label="Featured shopping sections"
      className="border-b border-black/6 bg-[rgba(236,229,216,0.94)] backdrop-blur-[10px]"
    >
      <div className="page-container relative">
        <div className="overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="mx-auto flex min-w-max items-center justify-center gap-3 px-2 lg:grid lg:min-w-0 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-6 lg:px-0">
            <div className="flex items-center justify-end gap-1.5 sm:gap-2 lg:gap-3">
              {leftMenuItems.map((item) => (
                <MenuLink key={item.label} href={item.href} label={item.label} />
              ))}
            </div>

            <Link
              href="/"
              aria-label="Go to Seijaku homepage"
              className="inline-flex min-h-[36px] shrink-0 items-center px-2 text-[13px] font-medium uppercase tracking-[0.28em] text-[#40372f] transition-colors duration-300 hover:text-[#1f1a16] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8e806e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#ece5d8] sm:text-[14px]"
              style={{ fontFamily: '"Iowan Old Style", "Times New Roman", serif' }}
            >
              SEIJAKU
            </Link>

            <div className="flex items-center justify-start gap-1.5 sm:gap-2 lg:gap-3">
              {rightMenuItems.map((item) => (
                <MenuLink key={item.label} href={item.href} label={item.label} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* TODO: Add dedicated collection routes for Fragrance Sets, Perfumes, and Handcrafted Artifacts when those landing pages are created. */}
    </nav>
  );
}
