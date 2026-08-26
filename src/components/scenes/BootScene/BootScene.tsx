"use client";

import { useRef } from "react";
import { CRTScreen } from "@/components/primitives/CRTScreen";
import { getEra } from "@/lib/eras";
import { gsap, useGSAP } from "@/lib/gsap";
import { motion } from "@/lib/motion";

const BOOT_LINES = [
  "MEMORY CHECK ........ OK",
  "NETWORK ADAPTER ..... FOUND",
  "MODEM ............... READY",
  "",
  "CONNECTING",
] as const;

export function BootScene() {
  const era = getEra("boot");
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const crt = root?.querySelector<HTMLElement>("[data-crt]");
      if (!root || !crt) {
        return;
      }

      const lines = gsap.utils.toArray<HTMLElement>("[data-boot-line]", root);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(lines, { autoAlpha: 1 });
        gsap.set(crt, { scale: 1, xPercent: 0, yPercent: 0 });
      });

      mm.add(
        {
          isDesktop:
            "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          isMobile:
            "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const isMobile = Boolean(context.conditions?.isMobile);
          gsap.set(lines, { autoAlpha: 0 });
          gsap.set(crt, { scale: isMobile ? 0.92 : 0.78 });

          const coverScale = () => {
            const sx = window.innerWidth / crt.offsetWidth;
            const sy = window.innerHeight / crt.offsetHeight;
            return Math.max(sx, sy) * 1.08;
          };

          const timeline = gsap.timeline({
            defaults: { ease: motion.easeLinear },
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: isMobile ? "+=95%" : "+=145%",
              pin: true,
              scrub: 0.55,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          timeline
            .to(lines, { autoAlpha: 1, stagger: 0.12, duration: 0.28 }, 0)
            .to(
              crt,
              {
                scale: coverScale,
                duration: 1,
                ease: motion.easeCinematic,
              },
              0.42,
            )
            .to(
              "[data-crt-bezel]",
              { padding: 0, duration: 0.35, ease: motion.easeCinematic },
              0.72,
            )
            .to(
              "[data-boot-copy]",
              { autoAlpha: 0.18, duration: 0.22 },
              0.84,
            )
            .to(
              "[data-crt-screen]",
              { backgroundColor: "#f4f1e8", duration: 0.28 },
              0.86,
            );
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id={era.id}
      aria-labelledby="boot-heading"
      className="museum-section boot-scene"
    >
      <div className="boot-pin">
        <CRTScreen>
          <div className="crt-copy" data-boot-copy>
            <h2 id="boot-heading" className="sr-only">
              {era.year} — {era.title}
            </h2>
            <p className="mb-6 font-mono text-[11px] tracking-[0.28em] text-[#8fba6a]/80">
              {era.year}
            </p>
            <pre className="font-mono text-sm leading-7 md:text-[0.95rem]">
              {BOOT_LINES.map((line, index) => (
                <span
                  key={`${line}-${index}`}
                  data-boot-line
                  className="block min-h-[1.75rem]"
                >
                  {line}
                  {line === "CONNECTING" ? (
                    <span className="boot-cursor" aria-hidden="true" />
                  ) : null}
                </span>
              ))}
            </pre>
          </div>
        </CRTScreen>
      </div>
    </section>
  );
}
