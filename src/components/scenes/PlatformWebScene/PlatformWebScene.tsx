"use client";

import { useRef } from "react";
import { getEra } from "@/lib/eras";
import { gsap, useGSAP } from "@/lib/gsap";
import { motion } from "@/lib/motion";
import { formatMetric, PLATFORM_FEED } from "@/lib/platformFeed";

const NOTES = [
  { id: "n1", label: "3", x: "8%", y: "22%" },
  { id: "n2", label: "1", x: "86%", y: "18%" },
  { id: "n3", label: "12", x: "12%", y: "58%" },
  { id: "n4", label: "8", x: "90%", y: "64%" },
  { id: "n5", label: "2", x: "78%", y: "38%" },
] as const;

function isDesktopOnly(element: HTMLElement) {
  return element.classList.contains("platform-desktop-only");
}

export function PlatformWebScene() {
  const era = getEra("platform-web");
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) {
        return;
      }

      const feed = root.querySelector<HTMLElement>("[data-platform-feed]");
      const following = root.querySelector<HTMLElement>("[data-tab-following]");
      const forYou = root.querySelector<HTMLElement>("[data-tab-foryou]");
      const tabMark = root.querySelector<HTMLElement>("[data-tab-mark]");
      const choiceFrom = root.querySelector<HTMLElement>("[data-choice-from]");
      const choiceTo = root.querySelector<HTMLElement>("[data-choice-to]");
      if (!feed || !following || !forYou || !tabMark || !choiceFrom || !choiceTo) {
        return;
      }

      const posts = gsap.utils.toArray<HTMLElement>("[data-platform-post]", root);
      const uniques = gsap.utils.toArray<HTMLElement>(
        "[data-post-unique]",
        root,
      );
      const generics = gsap.utils.toArray<HTMLElement>(
        "[data-post-generic]",
        root,
      );
      const notes = gsap.utils.toArray<HTMLElement>("[data-platform-note]", root);
      const likeEls = gsap.utils.toArray<HTMLElement>("[data-likes]", root);
      const viewEls = gsap.utils.toArray<HTMLElement>("[data-views]", root);
      const mm = gsap.matchMedia();

      const setHomogenized = () => {
        gsap.set(uniques, { autoAlpha: 0 });
        gsap.set(generics, { autoAlpha: 1 });
        gsap.set(choiceFrom, { autoAlpha: 0, y: -8 });
        gsap.set(choiceTo, { autoAlpha: 1, y: 0 });
        gsap.set(following, { color: "#8b9098" });
        gsap.set(forYou, { color: "#1c1f26" });
        gsap.set(tabMark, { x: forYou.offsetLeft, width: forYou.offsetWidth });
        likeEls.forEach((el) => {
          const end = Number(el.dataset.end ?? 0);
          el.textContent = formatMetric(end);
        });
        viewEls.forEach((el) => {
          const end = Number(el.dataset.end ?? 0);
          el.textContent = formatMetric(end);
        });
      };

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(root, { backgroundColor: "#f4f5f7" });
        gsap.set(posts, { autoAlpha: 1, y: 0 });
        gsap.set(feed, { y: -48 });
        gsap.set(notes, { autoAlpha: 0, scale: 0.6 });
        setHomogenized();
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
          const visiblePosts = isMobile
            ? posts.filter((post) => !isDesktopOnly(post))
            : posts;
          const visibleNotes = isMobile ? [] : notes;
          const hiddenPosts = posts.filter(
            (post) => !visiblePosts.includes(post),
          );

          gsap.set(root, { backgroundColor: "#2c2e32" });
          gsap.set(feed, { y: 0 });
          gsap.set(visiblePosts, { autoAlpha: 0, y: 28 });
          gsap.set(hiddenPosts, { autoAlpha: 0, y: 28 });
          gsap.set(uniques, { autoAlpha: 1 });
          gsap.set(generics, { autoAlpha: 0 });
          gsap.set(notes, { autoAlpha: 0, scale: 0.4 });
          gsap.set(choiceFrom, { autoAlpha: 1, y: 0 });
          gsap.set(choiceTo, { autoAlpha: 0, y: 12 });
          gsap.set(following, { color: "#1c1f26" });
          gsap.set(forYou, { color: "#8b9098" });
          gsap.set(tabMark, {
            x: following.offsetLeft,
            width: following.offsetWidth,
          });
          likeEls.forEach((el) => {
            el.textContent = formatMetric(Number(el.dataset.start ?? 0));
          });
          viewEls.forEach((el) => {
            el.textContent = formatMetric(Number(el.dataset.start ?? 0));
          });

          const likes = likeEls.map((el) => ({
            el,
            value: Number(el.dataset.start ?? 0),
            end: Number(el.dataset.end ?? 0),
          }));
          const views = viewEls.map((el) => ({
            el,
            value: Number(el.dataset.start ?? 0),
            end: Number(el.dataset.end ?? 0),
          }));

          const timeline = gsap.timeline({
            defaults: { ease: motion.easeEnter },
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: isMobile ? "+=100%" : "+=170%",
              pin: true,
              scrub: 0.65,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          timeline
            .to(
              root,
              {
                backgroundColor: "#f4f5f7",
                duration: 0.28,
                ease: motion.easeCinematic,
              },
              0,
            )
            .to(
              visiblePosts,
              {
                autoAlpha: 1,
                y: 0,
                stagger: 0.06,
                duration: 0.32,
              },
              0.06,
            )
            .to(
              feed,
              {
                y: isMobile ? -32 : -64,
                duration: 0.28,
                ease: motion.easeCinematic,
              },
              0.28,
            )
            .to(
              feed,
              {
                y: isMobile ? -210 : -420,
                duration: 0.42,
                ease: "power2.in",
              },
              0.42,
            )
            .to(uniques, { autoAlpha: 0, duration: 0.28 }, 0.48)
            .to(generics, { autoAlpha: 1, duration: 0.28 }, 0.5)
            .to(
              following,
              { color: "#8b9098", duration: 0.2, ease: motion.easeLinear },
              0.52,
            )
            .to(
              forYou,
              { color: "#1c1f26", duration: 0.2, ease: motion.easeLinear },
              0.52,
            )
            .to(
              tabMark,
              {
                x: forYou.offsetLeft,
                width: forYou.offsetWidth,
                duration: 0.24,
                ease: motion.easeCinematic,
              },
              0.52,
            );

          likes.forEach((item) => {
            timeline.to(
              item,
              {
                value: item.end,
                duration: 0.36,
                ease: motion.easeLinear,
                onUpdate: () => {
                  const next = formatMetric(item.value);
                  if (item.el.textContent !== next) {
                    item.el.textContent = next;
                  }
                },
              },
              0.54,
            );
          });
          views.forEach((item) => {
            timeline.to(
              item,
              {
                value: item.end,
                duration: 0.36,
                ease: motion.easeLinear,
                onUpdate: () => {
                  const next = formatMetric(item.value);
                  if (item.el.textContent !== next) {
                    item.el.textContent = next;
                  }
                },
              },
              0.54,
            );
          });

          timeline
            .to(
              visibleNotes,
              {
                autoAlpha: 1,
                scale: 1,
                stagger: 0.05,
                duration: 0.22,
              },
              0.62,
            )
            .to(choiceFrom, { autoAlpha: 0, y: -10, duration: 0.22 }, 0.72)
            .to(choiceTo, { autoAlpha: 1, y: 0, duration: 0.26 }, 0.76)
            .to(
              feed,
              {
                y: isMobile ? -260 : -560,
                duration: 0.22,
                ease: motion.easeCinematic,
              },
              0.86,
            );
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  const stream = [...PLATFORM_FEED, ...PLATFORM_FEED];

  return (
    <section
      ref={rootRef}
      id={era.id}
      aria-labelledby="platform-web-heading"
      className="museum-section era-theme-platform platform-scene"
    >
      <div className="platform-pin">
        <div className="platform-copy">
          <p className="platform-year">{era.year}</p>
          <h2 id="platform-web-heading">{era.statement}</h2>
          {era.support ? <p className="platform-support">{era.support}</p> : null}
          <div className="platform-choice">
            <p data-choice-from>I choose where to go.</p>
            <p data-choice-to>The feed chooses what comes next.</p>
          </div>
        </div>

        <div className="platform-stage">
          {NOTES.map((note) => (
            <span
              key={note.id}
              className="platform-note platform-desktop-only"
              data-platform-note
              style={{ left: note.x, top: note.y }}
              aria-hidden="true"
            >
              {note.label}
            </span>
          ))}

          <div className="platform-app">
            <div className="platform-tabs" aria-hidden="true">
              <span className="platform-tab-mark" data-tab-mark />
              <span data-tab-following>Following</span>
              <span data-tab-foryou>For You</span>
            </div>

            <div className="platform-feed-clip">
              <div className="platform-feed" data-platform-feed>
                {stream.map((post, index) => {
                  const echo = index >= PLATFORM_FEED.length;
                  return (
                    <article
                      key={`${post.id}-${index}`}
                      className={`platform-post${post.desktopOnly ? " platform-desktop-only" : ""}`}
                      data-platform-post
                      aria-hidden="true"
                    >
                      <header className="platform-post-head">
                        <span
                          className="platform-avatar"
                          style={{ background: post.color }}
                        >
                          {post.initial}
                        </span>
                        <div>
                          <p className="platform-post-name">{post.name}</p>
                          <p className="platform-post-time">{post.time}</p>
                        </div>
                      </header>
                      <div className="platform-post-copy">
                        <p data-post-unique>{post.uniqueText}</p>
                        <p data-post-generic>{post.genericText}</p>
                      </div>
                      <div
                        className="platform-media"
                        style={{ background: echo ? "#d5d8de" : post.media }}
                      />
                      <footer className="platform-metrics">
                        <span>
                          <span
                            data-likes
                            data-start={post.likesStart}
                            data-end={post.likesEnd}
                          >
                            {formatMetric(post.likesStart)}
                          </span>{" "}
                          likes
                        </span>
                        <span>
                          <span
                            data-views
                            data-start={post.viewsStart}
                            data-end={post.viewsEnd}
                          >
                            {formatMetric(post.viewsStart)}
                          </span>{" "}
                          views
                        </span>
                      </footer>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
