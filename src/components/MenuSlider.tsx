"use client";

import Link from "next/link";
import { useEffect } from "react";

type MenuSliderProps = {
  isOpen: boolean;
  onClose: () => void;
};

type IntentItem = {
  title: string;
  subtitle?: string;
  href?: string;
  children?: Array<{ label: string; href: string }>;
};

const intentItems: IntentItem[] = [
  {
    title: "Gift Gently",
    subtitle: "Choose a quiet offering",
    children: [
      { label: "To Yourself", href: "/shop" },
      { label: "To a Loved One", href: "/seasonaldrops" },
    ],
  },
  {
    title: "Gift a Program",
    subtitle: "A guided ritual experience",
    href: "/ritual",
  },
  {
    title: "Recommend a Retreat",
    subtitle: "For deeper immersion",
    href: "/retreats",
  },
  {
    title: "Gift an Exclusive Seasonal",
    subtitle: "Limited cultural editions",
    href: "/seasonaldrops",
  },
  {
    title: "Our Story",
    href: "/our-story",
  },
  {
    title: "Behind the Scenes",
    href: "/a-seijaku-life",
  },
  {
    title: "Shop All",
    href: "/shop-all",
  },
];

export default function MenuSlider({ isOpen, onClose }: MenuSliderProps) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      className={`menuOverlay transition-opacity duration-300 ease-out ${
        isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!isOpen}
    >
      <div className={`menuBackdrop ${isOpen ? "is-open" : ""}`} onClick={onClose} />
      <aside className={`menuDrawer ${isOpen ? "is-open" : ""}`}>
        <div className="menuDrawerInner">
          <p className="font-serif text-[19px] tracking-[-0.01em] text-[rgba(28,29,27,0.96)]">
            How would you like to begin?
          </p>

          <ul className="mt-8 space-y-9">
            {intentItems.map((item) => (
              <li key={item.title} className="menuItem">
                {item.href ? (
                  <Link href={item.href} className="menuItemTitle" onClick={onClose}>
                    {item.title}
                  </Link>
                ) : (
                  <p className="menuItemTitle">{item.title}</p>
                )}

                {item.subtitle && <p className="menuItemSubtitle">{item.subtitle}</p>}

                {item.children && (
                  <ul className="mt-3 space-y-2 pl-1">
                    {item.children.map((subItem) => (
                      <li key={subItem.label}>
                        <Link
                          href={subItem.href}
                          className="text-[14px] text-[rgba(28,29,27,0.9)] underline-offset-4 transition-opacity duration-200 hover:opacity-75 hover:underline"
                          onClick={onClose}
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
