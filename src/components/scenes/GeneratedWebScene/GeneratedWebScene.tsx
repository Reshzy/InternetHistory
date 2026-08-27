"use client";

import { useRef } from "react";
import { usePointerCapabilities } from "@/hooks/usePointerCapabilities";
import { getEra } from "@/lib/eras";
import { FUTURE_MODES, GENERATED_SHARDS, type FutureModeId } from "@/lib/futureModes";
import { gsap, useGSAP } from "@/lib/gsap";
import { motion } from "@/lib/motion";

function isMode(value: string | undefined): value is FutureModeId {
  return FUTURE_MODES.some((mode) => mode.id === value);
}

function modeHint(id: FutureModeId) {
  return FUTURE_MODES.find((mode) => mode.id === id)?.hint ?? "";
}

function writeShardText(root: HTMLElement, alt: boolean) {
  root.querySelectorAll<HTMLElement>("[data-label-place]").forEach((el) => {
    el.textContent = alt ? (el.dataset.labelAlt ?? "") : (el.dataset.labelPlace ?? "");
  });
  root.querySelectorAll<HTMLElement>("[data-body-place]").forEach((el) => {
    el.textContent = alt ? (el.dataset.bodyAlt ?? "") : (el.dataset.bodyPlace ?? "");
  });
}

export function GeneratedWebScene() {
  const era = getEra("generated-web");
  const rootRef = useRef<HTMLElement>(null);
  const { isFine, isCoarse, canHover } = usePointerCapabilities();
  const canAttract = isFine && canHover && !isCoarse;

  useGSAP(
    (_context, contextSafe) => {
      const root = rootRef.current;
      if (!root || !contextSafe) {
        return;
      }

      const stage = root.querySelector<HTMLElement>("[data-generated-stage]");
      const hint = root.querySelector<HTMLElement>("[data-mode-hint]");
      const buttons = gsap.utils.toArray<HTMLButtonElement>(
        "[data-future-mode]",
        root,
      );
      const shards = gsap.utils.toArray<HTMLElement>("[data-generated-shard]", root);
      if (!stage || !hint || buttons.length === 0 || shards.length === 0) {
        return;
      }

      const mm = gsap.matchMedia();
      const xTo = shards.map((shard) =>
        gsap.quickTo(shard, "x", { duration: 0.45, ease: "power3.out" }),
      );
      const yTo = shards.map((shard) =>
        gsap.quickTo(shard, "y", { duration: 0.45, ease: "power3.out" }),
      );

      let mode: FutureModeId = "place";
      let motionApply: ((next: FutureModeId) => void) | null = null;

      const setChrome = (next: FutureModeId) => {
        mode = next;
        root.dataset.mode = next;
        hint.textContent = modeHint(next);
        writeShardText(root, next === "dissolve");
        buttons.forEach((button) => {
          button.setAttribute(
            "aria-pressed",
            String(button.dataset.futureMode === next),
          );
        });
      };

      const onModeClick = buttons.map((button) => {
        const handler = contextSafe(() => {
          const next = button.dataset.futureMode;
          if (!isMode(next) || next === mode) {
            return;
          }
          setChrome(next);
          motionApply?.(next);
        });
        button.addEventListener("click", handler);
        return { button, handler };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        motionApply = null;
        gsap.set(shards, { autoAlpha: 1, x: 0, y: 0, scale: 1 });
        gsap.set(buttons, { autoAlpha: 1, y: 0 });
        setChrome("place");
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
          const pointer = { x: 0, y: 0 };
          let angle = 0;

          gsap.set(shards, { autoAlpha: 0, y: 18, x: 0, scale: 1 });
          gsap.set(buttons, { autoAlpha: 0, y: 8 });
          setChrome("place");

          const settle = () => {
            shards.forEach((_, index) => {
              xTo[index](0);
              yTo[index](0);
              gsap.to(shards[index], {
                scale: 1,
                duration: 0.35,
                ease: motion.easeCinematic,
                overwrite: "auto",
              });
            });
          };

          motionApply = (next) => {
            if (next === "place") {
              settle();
              return;
            }
            if (next === "orbit") {
              settle();
              return;
            }
            shards.forEach((shard, index) => {
              const scatterX = isMobile ? 0 : index % 2 === 0 ? -14 : 16;
              const scatterY = isMobile ? 0 : index < 2 ? -10 : 12;
              gsap.fromTo(
                shard,
                { autoAlpha: 0.2, scale: 0.92 },
                {
                  autoAlpha: 1,
                  scale: 1,
                  duration: 0.48,
                  ease: motion.easeCinematic,
                  overwrite: "auto",
                },
              );
              xTo[index](scatterX);
              yTo[index](scatterY);
            });
          };

          const tick = () => {
            if (mode !== "orbit") {
              return;
            }
            angle += isMobile ? 0.04 : 0.016;
            shards.forEach((shard, index) => {
              if (isMobile) {
                gsap.set(shard, {
                  scale: 1 + Math.sin(angle * 1.4 + index) * 0.035,
                });
                return;
              }
              const radius = 26 + index * 11;
              const theta = angle + (index * Math.PI * 2) / shards.length;
              xTo[index](pointer.x * 0.28 + Math.cos(theta) * radius);
              yTo[index](pointer.y * 0.28 + Math.sin(theta) * radius);
            });
          };

          const onPointerMove = contextSafe((event: PointerEvent) => {
            const box = stage.getBoundingClientRect();
            pointer.x = gsap.utils.clamp(
              -140,
              140,
              event.clientX - box.left - box.width / 2,
            );
            pointer.y = gsap.utils.clamp(
              -90,
              90,
              event.clientY - box.top - box.height / 2,
            );

            if (!canAttract || isMobile || mode !== "place") {
              return;
            }

            shards.forEach((_, index) => {
              const strength = 0.1 + index * 0.03;
              xTo[index](gsap.utils.clamp(-30, 30, pointer.x * strength));
              yTo[index](gsap.utils.clamp(-22, 22, pointer.y * strength));
            });
          });

          if (canAttract && !isMobile) {
            stage.addEventListener("pointermove", onPointerMove);
          }

          gsap.ticker.add(tick);

          const timeline = gsap.timeline({
            defaults: { ease: motion.easeEnter },
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: isMobile ? "+=70%" : "+=90%",
              pin: true,
              scrub: 0.55,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          timeline
            .to(
              shards,
              {
                autoAlpha: 1,
                y: 0,
                stagger: 0.07,
                duration: 0.4,
                ease: motion.easeCinematic,
              },
              0.08,
            )
            .to(
              buttons,
              {
                autoAlpha: 1,
                y: 0,
                stagger: 0.05,
                duration: 0.28,
              },
              0.36,
            );

          return () => {
            motionApply = null;
            gsap.ticker.remove(tick);
            stage.removeEventListener("pointermove", onPointerMove);
          };
        },
      );

      return () => {
        onModeClick.forEach(({ button, handler }) => {
          button.removeEventListener("click", handler);
        });
        mm.revert();
      };
    },
    { scope: rootRef, dependencies: [canAttract] },
  );

  return (
    <section
      ref={rootRef}
      id={era.id}
      aria-labelledby="generated-web-heading"
      className="museum-section era-theme-generated generated-scene"
      data-cursor-scene="generated"
      data-mode="place"
    >
      <div className="generated-pin">
        <div className="generated-copy">
          <p className="generated-year">{era.year}</p>
          <h2 id="generated-web-heading">{era.statement}</h2>
          {era.support ? (
            <p className="generated-support">{era.support}</p>
          ) : null}
          <p className="generated-hint" data-mode-hint aria-live="polite">
            {FUTURE_MODES[0].hint}
          </p>
        </div>

        <div className="generated-stage" data-generated-stage>
          {GENERATED_SHARDS.map((shard) => (
            <article
              key={shard.id}
              className={`generated-shard generated-shard-${shard.kind}`}
              data-generated-shard
              aria-hidden="true"
            >
              <span
                className="generated-shard-kicker"
                data-label-place={shard.label}
                data-label-alt={shard.labelAlt}
              >
                {shard.label}
              </span>
              <p
                className={
                  shard.kind === "heading"
                    ? "generated-shard-title"
                    : "generated-shard-copy"
                }
                data-body-place={shard.body}
                data-body-alt={shard.bodyAlt}
              >
                {shard.body}
              </p>
            </article>
          ))}
        </div>

        <div
          className="generated-modes"
          role="group"
          aria-label="Future modes"
        >
          {FUTURE_MODES.map((mode, index) => (
            <button
              key={mode.id}
              type="button"
              className="generated-mode"
              data-future-mode={mode.id}
              aria-pressed={index === 0}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
