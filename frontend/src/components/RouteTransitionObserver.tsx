"use client";

import { useEffect } from "react";

export default function RouteTransitionObserver() {
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("main section.section-primary, main section.section-secondary, main section.section-editorial"),
    ).filter((target) => {
      if (target.hasAttribute("data-home-reveal") || target.hasAttribute("data-reveal")) {
        return false;
      }

      if (target.closest(".home-story")) {
        return false;
      }

      target.classList.add("site-reveal-target");
      return true;
    });

    if (!targets.length) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return null;
}
