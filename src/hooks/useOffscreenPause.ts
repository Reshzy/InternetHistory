"use client";

import { useEffect, type RefObject } from "react";

export function useOffscreenPause(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }
        node.classList.toggle("is-offscreen", !entry.isIntersecting);
      },
      { root: null, rootMargin: "100% 0px", threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);
}
