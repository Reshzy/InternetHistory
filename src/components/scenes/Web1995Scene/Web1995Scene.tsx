"use client";

import { useRef } from "react";
import { BrowserWindow } from "@/components/primitives/BrowserWindow";
import { getEra } from "@/lib/eras";
import { gsap, useGSAP } from "@/lib/gsap";
import { motion } from "@/lib/motion";

const DOCUMENTS = [
  {
    id: "about",
    slot: "doc-slot-about",
    label: "about.htm",
    heading: "What is a homepage?",
    body: "A page you made. A page you kept. A page that waited for someone to type the address correctly.",
  },
  {
    id: "links",
    slot: "doc-slot-links",
    label: "links.htm",
    heading: "A directory of doors",
    body: "Blue, underlined, slightly mysterious. You did not know where a link went until you went.",
  },
  {
    id: "guestbook",
    slot: "doc-slot-guestbook",
    label: "guestbook.htm",
    heading: "Sign the guestbook",
    body: "Presence was a line of text and a date. Nobody optimized it. Somebody was here.",
  },
  {
    id: "notes",
    slot: "doc-slot-notes",
    label: "notes.htm",
    heading: "Getting online",
    body: "The modem sang. The room waited. Then a document appeared, as if a place had opened.",
  },
] as const;

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
    line.setAttribute("opacity", "0.85");
    line.setAttribute("x1", String(a.left + a.width * 0.5 - root.left));
    line.setAttribute("y1", String(a.top + a.height * 0.5 - root.top));
    line.setAttribute("x2", String(b.left + b.width * 0.5 - root.left));
    line.setAttribute("y2", String(b.top + b.height * 0.5 - root.top));
    const length = line.getTotalLength();
    line.setAttribute("stroke-dasharray", String(length));
    line.dataset.length = String(length);
  });
}

export function Web1995Scene() {
  const era = getEra("document-web");
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) {
        return;
      }

      const world = root.querySelector<HTMLElement>("[data-doc-world]");
      const svg = root.querySelector<SVGSVGElement>("[data-doc-lines]");
      const main = root.querySelector<HTMLElement>("[data-doc-main]");
      const mainMotion = root.querySelector<HTMLElement>(
        "[data-doc-main] [data-doc-motion]",
      );
      if (!world || !svg || !main || !mainMotion) {
        return;
      }

      const cards = gsap.utils.toArray<HTMLElement>("[data-doc-card]", root);
      const links = gsap.utils.toArray<HTMLElement>("[data-web-link]", root);
      const pairs: Array<[HTMLElement | null, HTMLElement | null]> = cards.map(
        (card) => [main, card],
      );

      const mm = gsap.matchMedia();

      const prepareLines = (draw: boolean) => {
        layoutLines(svg, pairs);
        svg.querySelectorAll("line").forEach((line) => {
          const length = Number(line.dataset.length ?? line.getTotalLength());
          gsap.set(line, {
            strokeDasharray: length,
            strokeDashoffset: draw ? 0 : length,
          });
        });
      };

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(root, { backgroundColor: "#141618" });
        gsap.set(world, { scale: 1, x: 0, y: 0 });
        gsap.set(mainMotion, { autoAlpha: 1, scale: 1, y: 0 });
        gsap.set(cards, { autoAlpha: 1, x: 0, y: 0, scale: 1 });
        gsap.set(links, { color: "#0000ee" });
        prepareLines(true);
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
          const visibleCards = isMobile
            ? cards.filter(
                (card) =>
                  !card.closest(".doc-slot-guestbook, .doc-slot-notes"),
              )
            : cards;

          gsap.set(root, { backgroundColor: "#f4f1e8" });
          gsap.set(world, { scale: 1, x: 0, y: 0 });
          gsap.set(mainMotion, { autoAlpha: 0.2, scale: 0.98, y: 10 });
          gsap.set(cards, { autoAlpha: 0, x: 0, y: 28, scale: 0.96 });
          prepareLines(false);

          const timeline = gsap.timeline({
            defaults: { ease: motion.easeEnter },
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: isMobile ? "+=120%" : "+=185%",
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
                    strokeDashoffset: self.progress > 0.7 ? 0 : length,
                  });
                });
              },
            },
          });

          timeline
            .to(mainMotion, { autoAlpha: 1, scale: 1, y: 0, duration: 0.4 }, 0)
            .to(
              links,
              {
                color: "#0000ee",
                textDecorationThickness: 2,
                duration: 0.22,
              },
              0.22,
            )
            .to(
              visibleCards,
              {
                autoAlpha: 1,
                y: 0,
                x: (index) => (isMobile ? 0 : index % 2 === 0 ? -22 : 28),
                scale: 1,
                stagger: 0.08,
                duration: 0.4,
              },
              0.34,
            )
            .to(
              root,
              {
                backgroundColor: "#141618",
                duration: 0.45,
                ease: motion.easeCinematic,
              },
              0.48,
            )
            .to(
              svg.querySelectorAll("line"),
              {
                strokeDashoffset: 0,
                duration: 0.5,
                stagger: 0.06,
                ease: motion.easeLinear,
              },
              0.58,
            )
            .to(
              world,
              {
                scale: isMobile ? 1.08 : 1.16,
                x: isMobile ? -8 : -42,
                y: isMobile ? -16 : -30,
                duration: 0.55,
                ease: motion.easeCinematic,
              },
              0.78,
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
      aria-labelledby="document-web-heading"
      className="museum-section doc-scene"
    >
      <div className="doc-pin">
        <div className="doc-world" data-doc-world>
        <svg
          className="doc-lines"
          data-doc-lines
          aria-hidden="true"
        >
          {DOCUMENTS.map((doc) => (
            <line
              key={doc.id}
              stroke="#7aa0ff"
              strokeWidth="1.25"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        <div className="doc-slot doc-slot-main" data-doc-main>
          <div data-doc-motion>
            <BrowserWindow
              title="INDEX.HTM — untitled document"
              url="http://home.site/index.htm"
            >
              <p className="browser-year">{era.year}</p>
              <h2 id="document-web-heading">{era.statement}</h2>
              {era.support ? (
                <p>
                  Pages were{" "}
                  <a href="#document-about" data-web-link>
                    documents
                  </a>
                  . Links were{" "}
                  <a href="#document-links" data-web-link>
                    doors
                  </a>
                  . Getting online still felt like going{" "}
                  <a href="#document-about" data-web-link>
                    somewhere
                  </a>
                  .
                </p>
              ) : null}
            </BrowserWindow>
          </div>
        </div>

        {DOCUMENTS.map((doc) => (
          <div key={doc.id} className={`doc-slot ${doc.slot}`}>
            <article
              id={`document-${doc.id}`}
              className="doc-card"
              data-doc-card
              data-doc-motion
            >
              <p className="doc-card-label">{doc.label}</p>
              <h3>{doc.heading}</h3>
              <p>{doc.body}</p>
            </article>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
