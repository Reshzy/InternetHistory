"use client";

import { useEffect } from "react";
import { ReducedMotionNotice } from "@/components/chrome/ReducedMotionNotice";
import { eraIds, eras } from "@/lib/eras";
import { useActiveEra } from "@/hooks/useActiveEra";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { Era } from "@/types/museum";

function EraMark({ era, isActive }: { era: Era; isActive: boolean }) {
  const inactive =
    era.status === "placeholder" ? "text-[#cfcbbf]" : "text-[#d4d0c4]";

  return (
    <a
      href={`#${era.id}`}
      data-era-mark={era.id}
      data-era-status={era.status}
      className={`group relative inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-2 px-2 py-2 font-mono text-[11px] tracking-[0.14em] no-underline transition-colors lg:min-h-0 lg:min-w-0 lg:px-1 lg:py-1 ${
        isActive ? "text-[#e8e4d9]" : `${inactive} hover:text-[#e8e4d9] focus-visible:text-[#e8e4d9]`
      }`}
      aria-current={isActive ? "true" : undefined}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isActive
            ? "bg-[var(--signal)]"
            : "bg-[#e8e4d9]/45 group-hover:bg-[#e8e4d9]/80 group-focus-visible:bg-[#e8e4d9]/80"
        }`}
        aria-hidden="true"
      />
      <span>{era.year}</span>
      <span className="sr-only">
        {era.title}
        {era.status === "placeholder" ? " — gallery closed" : ""}
      </span>
    </a>
  );
}

export function MuseumNav() {
  const activeId = useActiveEra(eraIds, "boot");
  const activeEra = eras.find((era) => era.id === activeId) ?? eras[0];
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const marks = document.querySelectorAll(`[data-era-mark="${activeId}"]`);
    marks.forEach((mark) => {
      if (!(mark instanceof HTMLElement) || mark.offsetParent === null) {
        return;
      }
      const rail = mark.closest(".era-rail");
      if (!(rail instanceof HTMLElement)) {
        return;
      }
      const markRect = mark.getBoundingClientRect();
      const railRect = rail.getBoundingClientRect();
      rail.scrollTo({
        left:
          rail.scrollLeft +
          (markRect.left - railRect.left) -
          railRect.width / 2 +
          markRect.width / 2,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    });
  }, [activeId, prefersReducedMotion]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40">
      <div className="museum-chrome pointer-events-auto border-b border-white/10 bg-[#050505]/92">
        <div className="flex items-center justify-between gap-3">
          <a
            href="#boot"
            className="inline-flex min-h-11 items-center font-mono text-[11px] tracking-[0.32em] text-[#e8e4d9] no-underline lg:min-h-0"
          >
            NET//HISTORY
          </a>
          <p className="min-w-0 truncate font-mono text-[11px] tracking-[0.12em] text-[#d4d0c4] lg:hidden">
            <span className="text-[var(--signal)]">{activeEra.year}</span>
            <span className="mx-2 text-[#e8e4d9]/40">/</span>
            <span>{activeEra.shortTitle}</span>
          </p>
        </div>

        <nav
          id="museum-nav"
          tabIndex={-1}
          aria-label="Museum timeline"
          className="era-rail mt-1 flex items-center gap-1 overflow-x-auto lg:mt-2 lg:gap-0"
        >
          <div className="hidden min-w-0 flex-1 items-center lg:flex">
            {eras.map((era, index) => (
              <span key={era.id} className="flex min-w-0 items-center">
                {index > 0 ? (
                  <span
                    className="h-px w-3 min-w-2 flex-1 bg-[#e8e4d9]/15 lg:w-6"
                    aria-hidden="true"
                  />
                ) : null}
                <EraMark era={era} isActive={era.id === activeId} />
              </span>
            ))}
          </div>
          <div className="flex lg:hidden">
            {eras.map((era) => (
              <EraMark key={era.id} era={era} isActive={era.id === activeId} />
            ))}
          </div>
        </nav>
        <ReducedMotionNotice />
      </div>
    </header>
  );
}
