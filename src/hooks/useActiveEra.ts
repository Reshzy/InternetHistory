"use client";

import { useEffect, useState } from "react";
import type { EraId } from "@/types/museum";

export function useActiveEra(ids: readonly EraId[], fallback: EraId) {
  const [activeId, setActiveId] = useState<EraId>(fallback);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }

        let nextId = fallback;
        let best = 0;
        for (const id of ids) {
          const ratio = ratios.get(id) ?? 0;
          if (ratio > best) {
            best = ratio;
            nextId = id;
          }
        }

        if (best > 0) {
          setActiveId(nextId);
        }
      },
      {
        root: null,
        rootMargin: "-18% 0px -52% 0px",
        threshold: [0, 0.15, 0.35, 0.55, 0.75, 1],
      },
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, [fallback, ids]);

  return activeId;
}
