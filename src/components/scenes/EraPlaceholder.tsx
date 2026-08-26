import type { Era } from "@/types/museum";

export function EraPlaceholder({ era }: { era: Era }) {
  return (
    <section
      id={era.id}
      aria-labelledby={`${era.id}-heading`}
      className={`museum-section era-theme-${era.theme} relative flex min-h-[62vh] flex-col justify-end border-t border-white/10 px-5 py-20 md:min-h-[70vh] md:px-10`}
    >
      <p className="font-mono text-[11px] tracking-[0.28em] text-[var(--era-accent)]">
        {era.year}
      </p>
      <h2
        id={`${era.id}-heading`}
        className="mt-3 max-w-xl font-mono text-xl leading-tight tracking-tight text-[#e8e4d9]/80 md:text-2xl"
      >
        {era.title}
      </h2>
      <p className="mt-4 max-w-md font-mono text-sm leading-relaxed text-[#e8e4d9]/55">
        Gallery closed. This wing of the museum opens in a later phase.
      </p>
    </section>
  );
}
