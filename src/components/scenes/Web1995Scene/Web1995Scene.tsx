"use client";

import { useEffect, useRef, useState, type MouseEvent, type SyntheticEvent } from "react";
import { BrowserWindow } from "@/components/primitives/BrowserWindow";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
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
    aside:
      "Translation for yo lil jits out there: The modem started yappin’. Everybody went AFK. Then a document spawned with +100 aura like bro unlocked Ohio DLC.",
  },
] as const;

const TRAVEL_PAGES = ["about", "links", "notes"] as const;

type TravelPage = "index" | (typeof TRAVEL_PAGES)[number];

const INDEX_META = {
  title: "INDEX.HTM — untitled document",
  url: "http://home.site/index.htm",
  file: "index.htm",
} as const;

const DONE_STATUS = "Document: Done";

function isTravelPage(value: string): value is TravelPage {
  return value === "index" || TRAVEL_PAGES.some((id) => id === value);
}

function pageMeta(id: TravelPage) {
  if (id === "index") {
    return INDEX_META;
  }
  const doc = DOCUMENTS.find((item) => item.id === id);
  if (!doc) {
    return INDEX_META;
  }
  return {
    title: `${doc.label.toUpperCase()} — untitled document`,
    url: `http://home.site/${doc.label}`,
    file: doc.label,
  };
}

function headingIdFor(page: TravelPage) {
  return page === "index" ? "document-web-heading" : `document-page-${page}`;
}

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
  const travelTimer = useRef(0);
  const pendingFocus = useRef<TravelPage | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activePage, setActivePage] = useState<TravelPage>("index");
  const [litPage, setLitPage] = useState<Exclude<TravelPage, "index"> | null>(
    null,
  );
  const [visited, setVisited] = useState<ReadonlySet<string>>(new Set());
  const [status, setStatus] = useState(DONE_STATUS);
  const [hoverStatus, setHoverStatus] = useState<string | null>(null);
  const [arriving, setArriving] = useState(false);

  const chrome = pageMeta(activePage);

  useEffect(() => {
    return () => window.clearTimeout(travelTimer.current);
  }, []);

  useEffect(() => {
    const page = pendingFocus.current;
    if (!page) {
      return;
    }
    pendingFocus.current = null;
    rootRef.current
      ?.querySelector<HTMLElement>(`#${headingIdFor(page)}`)
      ?.focus({ preventScroll: true });
  }, [activePage]);

  useEffect(() => {
    if (!arriving) {
      return;
    }
    const timer = window.setTimeout(() => setArriving(false), 220);
    return () => window.clearTimeout(timer);
  }, [arriving]);

  const goTo = (page: TravelPage) => {
    if (page === activePage) {
      return;
    }

    window.clearTimeout(travelTimer.current);
    setHoverStatus(null);
    setLitPage(page === "index" ? null : page);

    if (page !== "index") {
      setVisited((prev) => {
        if (prev.has(page)) {
          return prev;
        }
        const next = new Set(prev);
        next.add(page);
        return next;
      });
    }

    const apply = () => {
      pendingFocus.current = page;
      setActivePage(page);
      setStatus(DONE_STATUS);
      if (!prefersReducedMotion) {
        setArriving(true);
      }
    };

    if (prefersReducedMotion) {
      apply();
      return;
    }

    setStatus(`Opening ${pageMeta(page).file}…`);
    travelTimer.current = window.setTimeout(apply, 180);
  };

  const onSceneClick = (event: MouseEvent<HTMLElement>) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }
    const anchor = target.closest("a[data-web-link]");
    if (!(anchor instanceof HTMLAnchorElement)) {
      return;
    }
    const dest = anchor.dataset.docTarget;
    if (!dest || !isTravelPage(dest)) {
      return;
    }
    event.preventDefault();
    goTo(dest);
  };

  const onPreview = (event: SyntheticEvent<HTMLElement>) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }
    const anchor = target.closest("a[data-web-link]");
    if (!(anchor instanceof HTMLAnchorElement)) {
      return;
    }
    const dest = anchor.dataset.docTarget;
    if (!dest || !isTravelPage(dest)) {
      return;
    }
    setHoverStatus(pageMeta(dest).url);
  };

  const clearPreview = (event: SyntheticEvent<HTMLElement>) => {
    const target = event.target;
    if (!(target instanceof Element) || !target.closest("a[data-web-link]")) {
      return;
    }
    setHoverStatus(null);
  };

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
      onClick={onSceneClick}
      onPointerOver={onPreview}
      onPointerOut={clearPreview}
      onFocusCapture={onPreview}
      onBlurCapture={clearPreview}
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
              data-doc-line={doc.id}
              className={litPage === doc.id ? "is-lit" : undefined}
              stroke="#7aa0ff"
              strokeWidth="1.25"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        <div className="doc-slot doc-slot-main" data-doc-main>
          <div data-doc-motion>
            <BrowserWindow
              title={chrome.title}
              url={chrome.url}
              status={hoverStatus ?? status}
              onBack={() => goTo("index")}
              backDisabled={activePage === "index"}
            >
              <div
                className={[
                  "browser-page-view",
                  arriving && activePage === "index" ? "is-arriving" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                hidden={activePage !== "index"}
              >
                <p className="browser-year">{era.year}</p>
                <h2 id="document-web-heading" tabIndex={-1}>
                  {era.statement}
                </h2>
                {era.support ? (
                  <p>
                    Pages were{" "}
                    <a
                      href="#document-about"
                      data-web-link
                      data-doc-target="about"
                      className={visited.has("about") ? "is-visited" : undefined}
                    >
                      documents
                    </a>
                    . Links were{" "}
                    <a
                      href="#document-links"
                      data-web-link
                      data-doc-target="links"
                      className={visited.has("links") ? "is-visited" : undefined}
                    >
                      doors
                    </a>
                    . Getting online still felt like going{" "}
                    <a
                      href="#document-notes"
                      data-web-link
                      data-doc-target="notes"
                      className={visited.has("notes") ? "is-visited" : undefined}
                    >
                      somewhere
                    </a>
                    .
                  </p>
                ) : null}
              </div>
              {TRAVEL_PAGES.map((id) => {
                const doc = DOCUMENTS.find((item) => item.id === id);
                if (!doc) {
                  return null;
                }
                return (
                  <div
                    key={doc.id}
                    className={[
                      "browser-page-view",
                      arriving && activePage === doc.id ? "is-arriving" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    hidden={activePage !== doc.id}
                  >
                    <p className="browser-year">{era.year}</p>
                    <h2 id={`document-page-${doc.id}`} tabIndex={-1}>
                      {doc.heading}
                    </h2>
                    <p>{doc.body}</p>
                    {"aside" in doc && doc.aside ? (
                      <p className="browser-hanging">
                        <em>{doc.aside}</em>
                      </p>
                    ) : null}
                    <p>
                      <a
                        href="#document-web"
                        data-web-link
                        data-doc-target="index"
                      >
                        ← INDEX.HTM
                      </a>
                    </p>
                  </div>
                );
              })}
            </BrowserWindow>
          </div>
        </div>

        {DOCUMENTS.map((doc) => (
          <div key={doc.id} className={`doc-slot ${doc.slot}`}>
            <article
              id={`document-${doc.id}`}
              className={[
                "doc-card",
                litPage === doc.id ? "is-destination" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              data-doc-card
              data-doc-id={doc.id}
              data-doc-motion
            >
              <div data-doc-emphasis>
                <p className="doc-card-label">{doc.label}</p>
                <h3>{doc.heading}</h3>
                <p>{doc.body}</p>
              </div>
            </article>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
