"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { drawerBrowseSections } from "@/src/lib/navigation";

type MenuSliderProps = {
  isOpen: boolean;
  onClose: () => void;
};

const defaultExpandedGroups = ["By Type-Fragrances", "By Type-Gift Sets"];

function getGroupKey(sectionTitle: string, groupLabel: string) {
  return `${sectionTitle}-${groupLabel}`;
}

export default function MenuSlider({ isOpen, onClose }: MenuSliderProps) {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(defaultExpandedGroups);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const expandedSet = useMemo(() => new Set(expandedGroups), [expandedGroups]);

  const toggleGroup = (key: string) => {
    setExpandedGroups((current) =>
      current.includes(key) ? current.filter((entry) => entry !== key) : [...current, key],
    );
  };

  return (
    <div
      className={`menuOverlay transition-opacity duration-300 ease-out ${
        isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!isOpen}
    >
      <div className={`menuBackdrop ${isOpen ? "is-open" : ""}`} onClick={onClose} />
      <aside id="seijaku-drawer" className={`menuDrawer ${isOpen ? "is-open" : ""}`} aria-label="Browse Seijaku collections">
        <div className="menuDrawerInner">
          <div className="border-b border-[rgba(95,88,78,0.1)] pb-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[rgba(76,70,61,0.76)]">
              EXPLORE SEIJAKU
            </p>
          </div>

          <div className="mt-6 space-y-10">
            {drawerBrowseSections.map((section) => (
              <section key={section.title} aria-labelledby={`drawer-section-${section.title}`}>
                <p
                  id={`drawer-section-${section.title}`}
                  className="text-[10px] uppercase tracking-[0.26em] text-[rgba(92,84,73,0.74)]"
                >
                  {section.title}
                </p>

                <div className="mt-4 space-y-4 border-t border-[rgba(95,88,78,0.1)] pt-5">
                  {section.groups.map((group) => {
                    const hasChildren = Boolean(group.children?.length);
                    const key = getGroupKey(section.title, group.label);
                    const isExpanded = expandedSet.has(key);

                    if (hasChildren) {
                      return (
                        <div key={key} className="rounded-[18px] bg-[rgba(255,251,245,0.34)] px-4 py-3.5">
                          <div className="flex items-start justify-between gap-3">
                            {group.href ? (
                              <Link
                                href={group.href}
                                className="font-serif text-[20px] leading-[1.18] tracking-[-0.015em] text-[rgba(28,29,27,0.96)] transition-opacity duration-200 hover:opacity-74 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8e806e] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(247,241,231,0.92)]"
                                onClick={onClose}
                              >
                                {group.label}
                              </Link>
                            ) : (
                              <p className="font-serif text-[20px] leading-[1.18] tracking-[-0.015em] text-[rgba(28,29,27,0.96)]">{group.label}</p>
                            )}
                            <button
                              type="button"
                              aria-expanded={isExpanded}
                              aria-controls={`drawer-group-${key}`}
                              onClick={() => toggleGroup(key)}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[rgba(56,54,48,0.82)] transition-colors duration-200 hover:bg-[rgba(255,255,255,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8e806e] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(247,241,231,0.92)]"
                            >
                              <ChevronDown
                                size={16}
                                strokeWidth={1.8}
                                className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : "rotate-0"}`}
                              />
                            </button>
                          </div>

                          {isExpanded && (
                            <ul id={`drawer-group-${key}`} className="mt-4 space-y-1.5 pl-4">
                              {group.children?.map((child) => (
                                <li key={`${key}-${child.label}`}>
                                  <Link
                                    href={child.href}
                                    className="inline-flex min-h-[36px] items-center text-[14px] font-normal leading-[1.75] text-[rgba(53,49,44,0.76)] transition-opacity duration-200 hover:opacity-72 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8e806e] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(247,241,231,0.92)]"
                                    onClick={onClose}
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={key}
                        href={group.href ?? "/shop-all"}
                        className="block min-h-[38px] text-[16px] font-medium leading-[1.72] text-[rgba(28,29,27,0.92)] transition-opacity duration-200 hover:opacity-72 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8e806e] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(247,241,231,0.92)]"
                        onClick={onClose}
                      >
                        {group.label}
                      </Link>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
