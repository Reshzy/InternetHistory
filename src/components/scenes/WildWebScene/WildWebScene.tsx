"use client";

import { useRef } from "react";
import { Marquee } from "@/components/primitives/Marquee";
import { getEra } from "@/lib/eras";
import { gsap, useGSAP } from "@/lib/gsap";
import { motion } from "@/lib/motion";

const COUNTER_START = 421;
const COUNTER_END = 38912;
const MARQUEE_TEXT =
  "★ welcome to my homepage ★ you are visitor ★ sign the guestbook ★ best viewed with any browser ★ under construction forever ★";

function padHits(value: number) {
  return String(Math.floor(value)).padStart(6, "0");
}

function isDesktopOnly(element: HTMLElement) {
  return element.classList.contains("wild-desktop-only");
}

export function WildWebScene() {
  const era = getEra("wild-web");
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) {
        return;
      }

      const bg = root.querySelector<HTMLElement>("[data-wild-bg]");
      const home = root.querySelector<HTMLElement>("[data-wild-home]");
      const marquee = root.querySelector<HTMLElement>(".wild-marquee");
      const counterEl = root.querySelector<HTMLElement>("[data-wild-counter]");
      if (!bg || !home || !marquee || !counterEl) {
        return;
      }

      const stickers = gsap.utils.toArray<HTMLElement>(
        "[data-wild-sticker]",
        root,
      );
      const windows = gsap.utils.toArray<HTMLElement>(
        "[data-wild-window]",
        root,
      );
      const sprites = gsap.utils.toArray<HTMLElement>(
        "[data-wild-sprite]",
        root,
      );
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(root, { backgroundColor: "#000010" });
        gsap.set(bg, { autoAlpha: 1 });
        gsap.set(home, { autoAlpha: 1, scale: 1, y: 0 });
        gsap.set(stickers, { autoAlpha: 1, scale: 1, x: 0, y: 0 });
        gsap.set(windows, { autoAlpha: 1, x: 0, y: 0, rotate: 0 });
        gsap.set(sprites, { autoAlpha: 0, x: 0, y: 0 });
        gsap.set(marquee, { autoAlpha: 1, y: 0 });
        counterEl.textContent = padHits(COUNTER_END);
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
          const visibleStickers = isMobile
            ? stickers.filter((sticker) => !isDesktopOnly(sticker))
            : stickers;
          const visibleWindows = isMobile
            ? windows.filter((frame) => !isDesktopOnly(frame))
            : windows;
          const visibleSprites = isMobile ? [] : sprites;
          const hits = { value: COUNTER_START };

          gsap.set(root, { backgroundColor: "#141618" });
          gsap.set(bg, { autoAlpha: 0 });
          gsap.set(home, { autoAlpha: 0, scale: 0.94, y: 18 });
          gsap.set(stickers, { autoAlpha: 0, scale: 0.72, y: 16 });
          gsap.set(windows, { autoAlpha: 0, y: 36, x: 0, rotate: 0, zIndex: 3 });
          gsap.set(sprites, { autoAlpha: 0, x: 0, y: 0, rotation: 0 });
          gsap.set(marquee, { autoAlpha: 0, y: -28 });
          counterEl.textContent = padHits(COUNTER_START);

          const timeline = gsap.timeline({
            defaults: { ease: motion.easeEnter },
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: isMobile ? "+=110%" : "+=170%",
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          timeline
            .to(home, { autoAlpha: 1, scale: 1, y: 0, duration: 0.34 }, 0)
            .to(
              root,
              {
                backgroundColor: "#000010",
                duration: 0.4,
                ease: motion.easeCinematic,
              },
              0.1,
            )
            .to(bg, { autoAlpha: 1, duration: 0.4 }, 0.1)
            .to(
              visibleStickers,
              {
                autoAlpha: 1,
                scale: 1,
                y: 0,
                stagger: 0.07,
                duration: 0.3,
              },
              0.26,
            )
            .to(
              hits,
              {
                value: COUNTER_END,
                duration: 0.46,
                ease: motion.easeLinear,
                onUpdate: () => {
                  counterEl.textContent = padHits(hits.value);
                },
              },
              0.36,
            )
            .to(
              visibleWindows,
              {
                autoAlpha: 1,
                y: 0,
                x: (index) => (isMobile ? 0 : index % 2 === 0 ? -20 : 24),
                rotate: (index) => (isMobile ? 0 : index % 2 === 0 ? -5 : 6),
                zIndex: 6,
                stagger: 0.09,
                duration: 0.38,
              },
              0.48,
            )
            .to(marquee, { autoAlpha: 1, y: 0, duration: 0.26 }, 0.56)
            .to(
              visibleSprites,
              {
                autoAlpha: 1,
                x: (index) => [92, -104, 118, -78][index] ?? 0,
                y: (index) => [-72, 86, 48, -96][index] ?? 0,
                rotation: (index) => index * 22,
                stagger: 0.05,
                duration: 0.38,
              },
              0.64,
            )
            .to(visibleSprites, { autoAlpha: 0, duration: 0.26 }, 0.86)
            .to(
              visibleWindows,
              {
                autoAlpha: 0.18,
                x: 0,
                y: 10,
                rotate: 0,
                zIndex: 3,
                duration: 0.34,
                ease: motion.easeCinematic,
              },
              0.88,
            )
            .to(marquee, { y: -36, autoAlpha: 0, duration: 0.26 }, 0.9)
            .to(
              visibleStickers,
              {
                autoAlpha: 0.5,
                scale: 0.92,
                duration: 0.26,
              },
              0.9,
            )
            .to(
              home,
              {
                autoAlpha: 0.7,
                scale: 0.98,
                duration: 0.28,
                ease: motion.easeCinematic,
              },
              0.94,
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
      aria-labelledby="wild-web-heading"
      className="museum-section era-theme-wild wild-scene"
    >
      <div className="wild-pin">
        <div className="wild-bg" data-wild-bg aria-hidden="true" />

        <Marquee
          className="wild-marquee"
          text={MARQUEE_TEXT}
        />

        <div className="wild-world">
          <div className="wild-slot wild-slot-home">
            <article className="wild-home" data-wild-home>
              <p className="wild-home-bar">
                http://hometown.web/~corner/index.htm
              </p>
              <div className="wild-home-page">
                <p className="wild-year">{era.year}</p>
                <p className="wild-welcome">★ welcome to my corner ★</p>
                <h2 id="wild-web-heading">{era.statement}</h2>
                <div className="wild-rainbow" aria-hidden="true" />
                {era.support ? (
                  <p className="wild-support">{era.support}</p>
                ) : null}
                <p className="wild-webring">
                  <a href="#document-web">prev</a>
                  <span aria-hidden="true"> · webring · </span>
                  <a href="#social-web">next</a>
                </p>
                <p className="wild-hits">
                  you are visitor
                  <span className="wild-counter" data-wild-counter>
                    {padHits(COUNTER_START)}
                  </span>
                </p>
              </div>
            </article>
          </div>

          <div
            className="wild-window wild-window-guestbook"
            data-wild-window
            aria-hidden="true"
          >
            <p className="wild-window-bar">guestbook.htm</p>
            <div className="wild-window-body">
              <p>12/04/99 — cool site!!! add me</p>
              <p>12/18/99 — the midi is stuck in my head</p>
              <p>12/31/99 — see you if the clocks survive</p>
            </div>
          </div>

          <div
            className="wild-window wild-window-midi wild-desktop-only"
            data-wild-window
            aria-hidden="true"
          >
            <p className="wild-window-bar">now playing</p>
            <div className="wild-window-body">
              <p>untitled.mid</p>
              <span className="wild-midi-bar" />
            </div>
          </div>

          <div
            className="wild-window wild-window-links wild-desktop-only"
            data-wild-window
            aria-hidden="true"
          >
            <p className="wild-window-bar">cool_links.htm</p>
            <div className="wild-window-body">
              <p>html_guides.htm</p>
              <p>space_gifs.htm</p>
              <p>how_to_midi.htm</p>
            </div>
          </div>

          <div
            className="wild-sticker wild-construction"
            data-wild-sticker
            aria-hidden="true"
          >
            UNDER CONSTRUCTION
          </div>
          <div
            className="wild-sticker wild-new"
            data-wild-sticker
            aria-hidden="true"
          >
            NEW!
          </div>
          <div
            className="wild-sticker wild-desktop-only"
            data-wild-sticker
            aria-hidden="true"
          >
            <div className="wild-badge wild-spin">
              BEST
              <br />
              VIEWED
              <br />
              WITH
              <br />
              ANY
              <br />
              BROWSER
            </div>
          </div>
          <div
            className="wild-sticker wild-desktop-only"
            data-wild-sticker
            aria-hidden="true"
          >
            <div className="wild-hot">HOT</div>
          </div>

          <span
            className="wild-sprite wild-star wild-desktop-only"
            data-wild-sprite
            aria-hidden="true"
          />
          <span
            className="wild-sprite wild-planet wild-desktop-only"
            data-wild-sprite
            aria-hidden="true"
          />
          <span
            className="wild-sprite wild-pixel wild-desktop-only"
            data-wild-sprite
            aria-hidden="true"
          />
          <span
            className="wild-sprite wild-spark wild-desktop-only"
            data-wild-sprite
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
