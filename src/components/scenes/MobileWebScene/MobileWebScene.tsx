"use client";

import { useRef } from "react";
import { DeviceFrame } from "@/components/primitives/DeviceFrame";
import { getEra } from "@/lib/eras";
import { gsap, useGSAP } from "@/lib/gsap";
import { motion } from "@/lib/motion";
import { SOCIAL_FEED, SOCIAL_SELF } from "@/lib/socialPeople";

const POCKET_NAV = ["Wall", "Friends", "Inbox", "Search"] as const;
const PROFILE_HANDLE = SOCIAL_SELF.name.split(" ")[0].toLowerCase();

function deskSize(root: HTMLElement, stage: HTMLElement) {
  return {
    width: Math.min(root.clientWidth * 0.9, 720),
    height: Math.min(stage.clientHeight * 0.92, 480),
  };
}

function phoneSize(root: HTMLElement, stage: HTMLElement) {
  return {
    width: Math.min(root.clientWidth * 0.72, 312),
    height: Math.min(stage.clientHeight * 0.96, 560),
  };
}

export function MobileWebScene() {
  const era = getEra("mobile-web");
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) {
        return;
      }

      const stage = root.querySelector<HTMLElement>("[data-mobile-stage]");
      const device = root.querySelector<HTMLElement>("[data-device]");
      const ear = root.querySelector<HTMLElement>("[data-device-ear]");
      const home = root.querySelector<HTMLElement>("[data-device-home]");
      const chrome = root.querySelector<HTMLElement>("[data-desk-chrome]");
      const rail = root.querySelector<HTMLElement>("[data-pocket-rail]");
      const topnav = root.querySelector<HTMLElement>("[data-pocket-topnav]");
      const feed = root.querySelector<HTMLElement>("[data-pocket-feed]");
      const hint = root.querySelector<HTMLElement>("[data-touch-hint]");
      const posts = gsap.utils.toArray<HTMLElement>("[data-pocket-post]", root);
      if (
        !stage ||
        !device ||
        !ear ||
        !home ||
        !chrome ||
        !rail ||
        !topnav ||
        !feed ||
        !hint
      ) {
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        const phone = phoneSize(root, stage);
        gsap.set(device, {
          width: phone.width,
          height: phone.height,
          borderRadius: 28,
          padding: "12px 9px 14px",
          backgroundColor: "#2a2a2c",
        });
        gsap.set(ear, { autoAlpha: 1, height: 6, marginBottom: 8 });
        gsap.set(home, { autoAlpha: 1, scale: 1, height: 18, marginTop: 10 });
        gsap.set(chrome, { autoAlpha: 0, maxHeight: 0, padding: 0 });
        gsap.set(rail, { autoAlpha: 0, width: 0, padding: 0 });
        gsap.set(topnav, { autoAlpha: 1, maxHeight: 36, y: 0 });
        gsap.set(posts, { paddingTop: 12, paddingBottom: 12 });
        gsap.set(hint, { autoAlpha: 0.85, scale: 1 });
        gsap.set(feed, { y: 0 });
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
          const desk = deskSize(root, stage);
          const phone = phoneSize(root, stage);

          gsap.set(device, {
            width: isMobile ? Math.min(desk.width, 420) : desk.width,
            height: isMobile ? Math.min(desk.height, 380) : desk.height,
            borderRadius: 3,
            padding: 0,
            backgroundColor: "#c8c8c8",
          });
          gsap.set(ear, { autoAlpha: 0, height: 0, marginBottom: 0 });
          gsap.set(home, { autoAlpha: 0, scale: 0.4, height: 0, marginTop: 0 });
          gsap.set(chrome, {
            autoAlpha: 1,
            maxHeight: 40,
            padding: "6px 8px",
          });
          gsap.set(rail, {
            autoAlpha: isMobile ? 0 : 1,
            width: isMobile ? 0 : 128,
          });
          gsap.set(topnav, { autoAlpha: 0, maxHeight: 0, y: 0 });
          gsap.set(posts, { paddingTop: 7, paddingBottom: 7 });
          gsap.set(hint, { autoAlpha: 0, scale: 0.6 });
          gsap.set(feed, { y: 0 });

          const timeline = gsap.timeline({
            defaults: { ease: motion.easeCinematic },
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: isMobile ? "+=100%" : "+=185%",
              pin: true,
              scrub: 0.65,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          timeline
            .to(
              device,
              {
                width: phone.width,
                height: phone.height,
                borderRadius: 28,
                padding: "12px 9px 14px",
                backgroundColor: "#2a2a2c",
                duration: 0.72,
              },
              0.12,
            )
            .to(
              ear,
              {
                autoAlpha: 1,
                height: 6,
                marginBottom: 8,
                duration: 0.32,
              },
              0.28,
            )
            .to(
              home,
              {
                autoAlpha: 1,
                scale: 1,
                height: 18,
                marginTop: 10,
                duration: 0.32,
              },
              0.3,
            )
            .to(
              chrome,
              {
                autoAlpha: 0,
                maxHeight: 0,
                padding: 0,
                duration: 0.28,
                ease: motion.easeEnter,
              },
              0.34,
            )
            .to(
              rail,
              {
                autoAlpha: 0,
                width: 0,
                duration: 0.32,
                ease: motion.easeEnter,
              },
              0.36,
            )
            .to(
              topnav,
              {
                autoAlpha: 1,
                maxHeight: 36,
                duration: 0.28,
                ease: motion.easeEnter,
              },
              0.42,
            )
            .to(
              posts,
              {
                paddingTop: 12,
                paddingBottom: 12,
                duration: 0.28,
                ease: motion.easeEnter,
              },
              0.5,
            )
            .to(
              hint,
              {
                autoAlpha: 0.9,
                scale: 1,
                duration: 0.22,
                ease: motion.easeEnter,
              },
              0.72,
            )
            .to(feed, { y: -14, duration: 0.16, ease: motion.easeLinear }, 0.82)
            .to(feed, { y: 0, duration: 0.22, ease: motion.easeEnter }, 0.9);
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  const visibleFeed = SOCIAL_FEED.filter((item) => !item.desktopOnly).slice(
    0,
    4,
  );

  return (
    <section
      ref={rootRef}
      id={era.id}
      aria-labelledby="mobile-web-heading"
      className="museum-section era-theme-mobile mobile-scene"
    >
      <div className="mobile-pin">
        <div className="mobile-copy">
          <p className="mobile-year">{era.year}</p>
          <h2 id="mobile-web-heading">{era.statement}</h2>
          {era.support ? <p className="mobile-support">{era.support}</p> : null}
        </div>

        <div className="mobile-stage" data-mobile-stage>
          <DeviceFrame>
            <header className="desk-chrome" data-desk-chrome aria-hidden="true">
              <span className="desk-controls">
                <span />
                <span />
                <span />
              </span>
              <p className="desk-url">people.web/{PROFILE_HANDLE}</p>
            </header>

            <div className="pocket-app">
              <aside className="pocket-rail" data-pocket-rail aria-hidden="true">
                {POCKET_NAV.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </aside>

              <div className="pocket-main">
                <nav
                  className="pocket-topnav"
                  data-pocket-topnav
                  aria-hidden="true"
                >
                  {POCKET_NAV.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </nav>

                <div className="pocket-feed" data-pocket-feed aria-hidden="true">
                  {visibleFeed.map((item, index) => (
                    <div
                      key={item.id}
                      className="pocket-post"
                      data-pocket-post
                    >
                      <span
                        className="social-avatar social-avatar-sm"
                        style={{ background: item.color }}
                      >
                        {item.initial}
                      </span>
                      <p>
                        <strong>{item.name}</strong> {item.text}
                      </p>
                      {index === 1 ? (
                        <span className="touch-hint" data-touch-hint />
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DeviceFrame>
        </div>
      </div>
    </section>
  );
}
