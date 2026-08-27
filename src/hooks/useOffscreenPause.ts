"use client";

import { useEffect } from "react";

export function useMuseumOffscreenPause() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(".museum-section"),
    );
    if (nodes.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle("is-offscreen", !entry.isIntersecting);
        }
      },
      { root: null, rootMargin: "100% 0px", threshold: 0 },
    );

    for (const node of nodes) {
      observer.observe(node);
    }

    return () => observer.disconnect();
  }, []);
}
