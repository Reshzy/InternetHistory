"use client";

import { useRef } from "react";
import { getEra } from "@/lib/eras";
import { gsap, useGSAP } from "@/lib/gsap";
import { motion } from "@/lib/motion";
import {
  SOCIAL_FEED,
  SOCIAL_NOTES,
  SOCIAL_PEOPLE,
  SOCIAL_SELF,
} from "@/lib/socialPeople";

function layoutLines(
  svg: SVGSVGElement,
  pairs: Array<[HTMLElement | null, HTMLElement | null]>,
) {
  const root = svg.getBoundingClientRect();
  const lines = svg.querySelectorAll("line");
  svg.setAttribute("viewBox", `0 0 ${root.width} ${root.height}`);
  svg.setAttribute("width", String(root.width));
  svg.setAttribute("height", String(root.height));

  pairs.forEach(([from, to], index) => {
    const line = lines[index];
    if (!from || !to || !line) {
      line?.setAttribute("opacity", "0");
      return;
    }
    if (from.offsetParent === null || to.offsetParent === null) {
      line.setAttribute("opacity", "0");
      return;
    }
    const a = from.getBoundingClientRect();
    const b = to.getBoundingClientRect();
    line.setAttribute("opacity", "0.8");
    line.setAttribute("x1", String(a.left + a.width * 0.5 - root.left));
    line.setAttribute("y1", String(a.top + a.height * 0.5 - root.top));
    line.setAttribute("x2", String(b.left + b.width * 0.5 - root.left));
    line.setAttribute("y2", String(b.top + b.height * 0.5 - root.top));
    const length = line.getTotalLength();
    line.setAttribute("stroke-dasharray", String(length));
    line.dataset.length = String(length);
  });
}

function isDesktopOnly(element: HTMLElement) {
  return Boolean(element.closest(".social-desktop-only"));
}

export function SocialWebScene() {
  const era = getEra("social-web");
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) {
        return;
      }

      const world = root.querySelector<HTMLElement>("[data-social-world]");
      const svg = root.querySelector<SVGSVGElement>("[data-social-lines]");
      const profile = root.querySelector<HTMLElement>("[data-social-profile]");
      const feed = root.querySelector<HTMLElement>("[data-social-feed]");
      if (!world || !svg || !profile || !feed) {
        return;
      }

      const people = gsap.utils.toArray<HTMLElement>(
        "[data-social-person]",
        root,
      );
      const notes = gsap.utils.toArray<HTMLElement>(
        "[data-social-note]",
        root,
      );
      const pairs: Array<[HTMLElement | null, HTMLElement | null]> = people.map(
        (person) => [profile, person],
      );
      const mm = gsap.matchMedia();

      const prepareLines = (draw: boolean) => {
        layoutLines(svg, pairs);
        svg.querySelectorAll("line").forEach((line) => {
          const length = Number(line.dataset.length ?? line.getTotalLength());
          gsap.set(line, {
            strokeDasharray: length,
            strokeDashoffset: draw ? 0 : length,
            autoAlpha: draw ? 0.8 : 1,
          });
        });
      };

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(root, { backgroundColor: "#c5cdd8" });
        gsap.set(world, { scale: 1 });
        gsap.set(profile, { autoAlpha: 1, y: -36, scale: 0.92 });
        gsap.set(people, { autoAlpha: 0.12, scale: 1 });
        gsap.set(notes, { autoAlpha: 0, y: 0 });
        gsap.set(feed, { autoAlpha: 1, y: 0 });
        prepareLines(true);
        gsap.set(svg.querySelectorAll("line"), { autoAlpha: 0 });
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
          const visiblePeople = isMobile
            ? people.filter((person) => !isDesktopOnly(person))
            : people;
          const visibleNotes = isMobile
            ? notes.filter((note) => !isDesktopOnly(note))
            : notes;

          gsap.set(root, { backgroundColor: "#000010" });
          gsap.set(world, { scale: 1 });
          gsap.set(profile, { autoAlpha: 0, y: 18, scale: 0.96 });
          gsap.set(people, { autoAlpha: 0, scale: 0.86 });
          gsap.set(notes, { autoAlpha: 0, y: -10 });
          gsap.set(feed, { autoAlpha: 0, y: 28 });
          prepareLines(false);

          const timeline = gsap.timeline({
            defaults: { ease: motion.easeEnter },
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: isMobile ? "+=110%" : "+=150%",
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onRefresh: (self) => {
                layoutLines(svg, pairs);
                svg.querySelectorAll("line").forEach((line) => {
                  const length = Number(line.dataset.length ?? 0);
                  gsap.set(line, {
                    strokeDasharray: length,
                    strokeDashoffset: self.progress > 0.45 ? 0 : length,
                    autoAlpha: self.progress > 0.72 ? 0 : 0.8,
                  });
                });
              },
            },
          });

          timeline
            .to(profile, { autoAlpha: 1, y: 0, scale: 1, duration: 0.32 }, 0)
            .to(
              root,
              {
                backgroundColor: "#d4dce8",
                duration: 0.4,
                ease: motion.easeCinematic,
              },
              0.06,
            )
            .to(
              visiblePeople,
              {
                autoAlpha: 1,
                scale: 1,
                stagger: 0.07,
                duration: 0.3,
              },
              0.2,
            )
            .to(
              svg.querySelectorAll("line"),
              {
                strokeDashoffset: 0,
                duration: 0.42,
                stagger: 0.05,
                ease: motion.easeLinear,
              },
              0.36,
            )
            .to(
              world,
              {
                scale: isMobile ? 1 : 1.045,
                duration: 0.28,
                ease: motion.easeCinematic,
              },
              0.52,
            )
            .to(
              visibleNotes,
              {
                autoAlpha: 1,
                y: 0,
                stagger: 0.08,
                duration: 0.24,
              },
              0.56,
            )
            .to(
              world,
              {
                scale: 1,
                duration: 0.26,
                ease: motion.easeCinematic,
              },
              0.72,
            )
            .to(
              visiblePeople,
              { autoAlpha: 0.12, duration: 0.28 },
              0.76,
            )
            .to(
              svg.querySelectorAll("line"),
              { autoAlpha: 0, duration: 0.22 },
              0.76,
            )
            .to(visibleNotes, { autoAlpha: 0, duration: 0.2 }, 0.78)
            .to(
              profile,
              {
                y: isMobile ? -36 : -56,
                scale: 0.92,
                duration: 0.3,
                ease: motion.easeCinematic,
              },
              0.78,
            )
            .to(feed, { autoAlpha: 1, y: 0, duration: 0.34 }, 0.8)
            .to(
              root,
              {
                backgroundColor: "#c5cdd8",
                duration: 0.28,
                ease: motion.easeCinematic,
              },
              0.82,
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
      aria-labelledby="social-web-heading"
      className="museum-section era-theme-social social-scene"
    >
      <div className="social-pin">
        <div className="social-world" data-social-world>
          <svg className="social-lines" data-social-lines aria-hidden="true">
            {SOCIAL_PEOPLE.map((person) => (
              <line
                key={person.id}
                stroke="#6b87b8"
                strokeWidth="1.15"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>

          <div className="social-slot social-slot-profile">
            <article className="social-profile" data-social-profile>
              <p className="social-profile-bar">
                {SOCIAL_SELF.name} — profile
              </p>
              <div className="social-profile-body">
                <span
                  className="social-avatar social-avatar-lg"
                  style={{ background: SOCIAL_SELF.color }}
                  aria-hidden="true"
                >
                  {SOCIAL_SELF.initial}
                </span>
                <div>
                  <p className="social-year">{era.year}</p>
                  <h2 id="social-web-heading">{era.statement}</h2>
                  {era.support ? (
                    <p className="social-support">{era.support}</p>
                  ) : null}
                  <p className="social-meta">wall · networks · friends</p>
                </div>
              </div>
            </article>
          </div>

          {SOCIAL_PEOPLE.map((person) => (
            <div
              key={person.id}
              className={`social-slot social-slot-${person.id}${
                person.desktopOnly ? " social-desktop-only" : ""
              }`}
            >
              <article
                className="social-person"
                data-social-person
                aria-hidden="true"
              >
                <span
                  className="social-avatar"
                  style={{ background: person.color }}
                >
                  {person.initial}
                </span>
                <p className="social-person-name">{person.name}</p>
                <p className="social-person-status">{person.status}</p>
              </article>
            </div>
          ))}

          {SOCIAL_NOTES.map((note) => (
            <p
              key={note.id}
              className={`social-note social-note-${note.id}${
                "desktopOnly" in note && note.desktopOnly
                  ? " social-desktop-only"
                  : ""
              }`}
              data-social-note
              aria-hidden="true"
            >
              {note.text}
            </p>
          ))}

          <div className="social-slot social-slot-feed">
            <div
              className="social-feed"
              data-social-feed
              role="region"
              aria-label="Status updates"
            >
              <p className="social-feed-label">updates</p>
              {SOCIAL_FEED.map((item) => (
                <div
                  key={item.id}
                  className={`social-post${
                    item.desktopOnly ? " social-desktop-only" : ""
                  }`}
                  aria-hidden={item.desktopOnly || undefined}
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
