"use client";

import { useRef } from "react";
import { getEra } from "@/lib/eras";
import { gsap, useGSAP } from "@/lib/gsap";
import { motion } from "@/lib/motion";

const TILES = [
  {
    id: "hero",
    label: "Hero",
    title: "A better way to ship",
    body: "Spacing, type, and components. The product is the system.",
    className: "polished-tile-hero",
  },
  {
    id: "card-a",
    label: "Card",
    title: "Feature",
    body: "Same radius. Same shadow. Same caption.",
  },
  {
    id: "card-b",
    label: "Card",
    title: "Feature",
    body: "Same radius. Same shadow. Same caption.",
  },
  {
    id: "cta",
    label: "Primary",
    title: "Get started",
    className: "polished-tile-cta",
    desktopOnly: false,
  },
  {
    id: "nav",
    label: "Nav",
    title: "Product  Pricing  Docs",
    body: "One row. One weight. One dialect.",
    desktopOnly: true,
  },
  {
    id: "avatar",
    label: "Avatar",
    title: "Users",
    desktopOnly: true,
  },
] as const;

function isDesktopOnly(element: HTMLElement) {
  return element.classList.contains("polished-desktop-only");
}

export function ModernWebScene() {
  const era = getEra("modern-web");
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) {
        return;
      }

      const machine = root.querySelector<HTMLElement>("[data-polished-machine]");
      const artifacts = gsap.utils.toArray<HTMLElement>(
        "[data-polished-artifact]",
        root,
      );
      const pill = root.querySelector<HTMLElement>("[data-polished-pill]");
      const gridLines = root.querySelector<HTMLElement>("[data-grid-lines]");
      const tiles = gsap.utils.toArray<HTMLElement>("[data-polished-tile]", root);
      if (!machine || !pill || !gridLines) {
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(artifacts, { autoAlpha: 0, x: 0 });
        gsap.set(machine, { autoAlpha: 0 });
        gsap.set(pill, { autoAlpha: 1, x: 0 });
        gsap.set(gridLines, { autoAlpha: 1 });
        gsap.set(tiles, { autoAlpha: 1, x: 0, y: 0, rotate: 0 });
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
          const visibleTiles = isMobile
            ? tiles.filter((tile) => !isDesktopOnly(tile))
            : tiles;
          const hiddenTiles = tiles.filter(
            (tile) => !visibleTiles.includes(tile),
          );
          const scatterX = isMobile
            ? [-18, 22, -14, 16]
            : [-72, 48, -36, 80, -44, 28];
          const scatterY = isMobile
            ? [26, -20, 22, -16]
            : [36, -52, 64, -18, 44, -30];
          const scatterR = isMobile ? [0, 0, 0, 0] : [-8, 6, -4, 9, -6, 3];

          gsap.set(hiddenTiles, { autoAlpha: 0, x: 0, y: 0, rotate: 0 });
          gsap.set(visibleTiles, {
            autoAlpha: 0,
            x: (index) => scatterX[index] ?? 0,
            y: (index) => scatterY[index] ?? 0,
            rotate: (index) => scatterR[index] ?? 0,
          });
          gsap.set(gridLines, { autoAlpha: 0 });

          if (isMobile) {
            gsap.set(artifacts, { autoAlpha: 0 });
            gsap.set(machine, { autoAlpha: 0 });
            gsap.set(pill, { autoAlpha: 0 });

            const timeline = gsap.timeline({
              defaults: { ease: motion.easeEnter },
              scrollTrigger: {
                trigger: root,
                start: "top top",
                end: "+=100%",
                pin: true,
                scrub: 0.6,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            timeline
              .to(gridLines, { autoAlpha: 1, duration: 0.28 }, 0.08)
              .to(
                visibleTiles,
                {
                  autoAlpha: 1,
                  x: 0,
                  y: 0,
                  rotate: 0,
                  stagger: 0.06,
                  duration: 0.42,
                  ease: motion.easeCinematic,
                },
                0.18,
              );
            return;
          }

          gsap.set(artifacts, { autoAlpha: 1, x: 0, y: 0 });
          gsap.set(machine, { autoAlpha: 1 });
          gsap.set(pill, { autoAlpha: 0, x: -28, scale: 0.86 });

          const timeline = gsap.timeline({
            defaults: { ease: motion.easeEnter },
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "+=160%",
              pin: true,
              scrub: 0.65,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          timeline
            .to(
              artifacts,
              {
                x: 118,
                stagger: 0.08,
                duration: 0.42,
                ease: motion.easeCinematic,
              },
              0.04,
            )
            .to(
              artifacts,
              {
                autoAlpha: 0,
                scale: 0.72,
                borderRadius: 999,
                stagger: 0.06,
                duration: 0.28,
              },
              0.32,
            )
            .to(
              pill,
              {
                autoAlpha: 1,
                x: 0,
                scale: 1,
                duration: 0.32,
                ease: motion.easeCinematic,
              },
              0.42,
            )
            .to(machine, { autoAlpha: 0, duration: 0.28 }, 0.58)
            .to(gridLines, { autoAlpha: 1, duration: 0.28 }, 0.62)
            .to(
              visibleTiles,
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                rotate: 0,
                stagger: 0.05,
                duration: 0.4,
                ease: motion.easeCinematic,
              },
              0.66,
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
      aria-labelledby="modern-web-heading"
      className="museum-section era-theme-polished polished-scene"
    >
      <div className="polished-pin">
        <div className="polished-copy">
          <p className="polished-year">{era.year}</p>
          <h2 id="modern-web-heading">{era.statement}</h2>
          {era.support ? <p className="polished-support">{era.support}</p> : null}
        </div>

        <div className="polished-stage">
          <div className="polished-machine" data-polished-machine>
            <div className="polished-artifacts">
              <span
                className="polished-artifact polished-construction"
                data-polished-artifact
                aria-hidden="true"
              >
                UNDER CONSTRUCTION
              </span>
              <span
                className="polished-artifact polished-hot"
                data-polished-artifact
                aria-hidden="true"
              >
                HOT
              </span>
              <span
                className="polished-artifact polished-badge"
                data-polished-artifact
                aria-hidden="true"
              >
                BEST
                <br />
                VIEWED
                <br />
                WITH
                <br />
                ANY
                <br />
                BROWSER
              </span>
              <span
                className="polished-artifact polished-click"
                data-polished-artifact
                aria-hidden="true"
              >
                CLICK HERE!!!
              </span>
            </div>

            <div className="polished-frame" aria-hidden="true">
              <p>NORMALIZER</p>
              <strong>8PX</strong>
              <strong>ROUNDED</strong>
              <strong>SYSTEM</strong>
              <div className="polished-slot" />
            </div>

            <div className="polished-out">
              <span className="polished-pill" data-polished-pill>
                Get started
              </span>
            </div>
          </div>

          <div className="polished-grid-wrap">
            <div
              className="polished-grid-lines"
              data-grid-lines
              aria-hidden="true"
            />
            <div className="polished-grid">
              {TILES.map((tile) => (
                <article
                  key={tile.id}
                  className={`polished-tile${"className" in tile && tile.className ? ` ${tile.className}` : ""}${
                    "desktopOnly" in tile && tile.desktopOnly
                      ? " polished-desktop-only"
                      : ""
                  }`}
                  data-polished-tile
                >
                  <span className="polished-tile-label">{tile.label}</span>
                  <div>
                    <h3>{tile.title}</h3>
                    {"body" in tile && tile.body ? <p>{tile.body}</p> : null}
                    {tile.id === "cta" ? (
                      <span className="polished-mini-pill">Get started</span>
                    ) : null}
                    {tile.id === "avatar" ? (
                      <div className="polished-avatars" aria-hidden="true">
                        <span />
                        <span />
                        <span />
                      </div>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
