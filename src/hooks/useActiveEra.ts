"use client";

import { useEffect, useState } from "react";
import { pinSpacerFor, triggerSectionId } from "@/lib/eraScroll";
import { ScrollTrigger } from "@/lib/gsap";
import type { EraId } from "@/types/museum";

function visiblePx(el: Element) {
  const rect = el.getBoundingClientRect();
  return Math.max(
    0,
    Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0),
  );
}

export function useActiveEra(ids: readonly EraId[], fallback: EraId) {
  const [activeId, setActiveId] = useState<EraId>(fallback);

  useEffect(() => {
    const idSet = new Set<string>(ids);

    const measure = () => {
      const activeTriggers: { id: EraId; start: number }[] = [];
      for (const trigger of ScrollTrigger.getAll()) {
        const target = trigger.trigger;
        if (!(target instanceof Element)) {
          continue;
        }
        const id = triggerSectionId(target);
        if (idSet.has(id) && trigger.isActive) {
          activeTriggers.push({ id: id as EraId, start: trigger.start });
        }
      }

      let nextId = fallback;
      let best = 0;

      if (activeTriggers.length > 0) {
        activeTriggers.sort((a, b) => a.start - b.start);
        nextId = activeTriggers[activeTriggers.length - 1].id;
        best = 1;
      } else {
        for (const id of ids) {
          const section = document.getElementById(id);
          if (!section) {
            continue;
          }
          const visible = visiblePx(pinSpacerFor(section));
          if (visible > best) {
            best = visible;
            nextId = id;
          }
        }
      }

      if (best > 0) {
        setActiveId(nextId);
      }
    };

    ScrollTrigger.addEventListener("refresh", measure);
    window.addEventListener("scroll", measure, { passive: true });
    measure();

    return () => {
      ScrollTrigger.removeEventListener("refresh", measure);
      window.removeEventListener("scroll", measure);
    };
  }, [fallback, ids]);

  return activeId;
}
