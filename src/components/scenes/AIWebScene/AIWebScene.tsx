"use client";

import { useRef } from "react";
import { AI_OUTPUTS, AI_PROMPT, AI_TOKENS } from "@/lib/aiOutputs";
import { getEra } from "@/lib/eras";
import { gsap, useGSAP } from "@/lib/gsap";
import { motion } from "@/lib/motion";

function isDesktopOnly(element: HTMLElement) {
  return element.classList.contains("ai-desktop-only");
}

function offsetFromField(el: HTMLElement, field: HTMLElement) {
  const box = el.getBoundingClientRect();
  const origin = field.getBoundingClientRect();
  return {
    x: origin.left + origin.width / 2 - (box.left + box.width / 2),
    y: origin.top + origin.height / 2 - (box.top + box.height / 2),
  };
}

export function AIWebScene() {
  const era = getEra("ai-web");
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) {
        return;
      }

      const field = root.querySelector<HTMLElement>("[data-ai-field]");
      const branches = root.querySelector<HTMLElement>("[data-ai-branches]");
      if (!field) {
        return;
      }

      const chars = gsap.utils.toArray<HTMLElement>("[data-ai-char]", root);
      const tokens = gsap.utils.toArray<HTMLElement>("[data-ai-token]", root);
      const outputs = gsap.utils.toArray<HTMLElement>("[data-ai-output]", root);
      const firstPass = gsap.utils.toArray<HTMLElement>("[data-gen-a]", root);
      const secondPass = gsap.utils.toArray<HTMLElement>("[data-gen-b]", root);
      const mm = gsap.matchMedia();

      const showFinal = (visibleOutputs: HTMLElement[]) => {
        gsap.set(field, { autoAlpha: 1, y: 0 });
        gsap.set(chars, { autoAlpha: 1 });
        gsap.set(tokens, { autoAlpha: 1, y: 0 });
        gsap.set(outputs, { autoAlpha: 0, x: 0, y: 0, scale: 1 });
        gsap.set(visibleOutputs, { autoAlpha: 1, x: 0, y: 0, scale: 1 });
        gsap.set(firstPass, { autoAlpha: 0 });
        gsap.set(secondPass, { autoAlpha: 1 });
        if (branches) {
          gsap.set(branches, { autoAlpha: 1 });
        }
      };

      mm.add("(prefers-reduced-motion: reduce)", () => {
        showFinal(outputs);
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
          const visibleOutputs = isMobile
            ? outputs.filter((output) => !isDesktopOnly(output))
            : outputs;
          const hiddenOutputs = outputs.filter(
            (output) => !visibleOutputs.includes(output),
          );

          gsap.set(field, { autoAlpha: 0, y: 10 });
          gsap.set(chars, { autoAlpha: 0 });
          gsap.set(tokens, { autoAlpha: 0, y: 10 });
          gsap.set(hiddenOutputs, { autoAlpha: 0, x: 0, y: 0, scale: 1 });
          gsap.set(firstPass, { autoAlpha: 1 });
          gsap.set(secondPass, { autoAlpha: 0 });
          if (branches) {
            gsap.set(branches, { autoAlpha: 0 });
          }

          visibleOutputs.forEach((output) => {
            if (isMobile) {
              gsap.set(output, { autoAlpha: 0, x: 0, y: 16, scale: 0.96 });
              return;
            }
            const offset = offsetFromField(output, field);
            gsap.set(output, {
              autoAlpha: 0,
              scale: 0.42,
              x: offset.x,
              y: offset.y,
            });
          });

          const timeline = gsap.timeline({
            defaults: { ease: motion.easeEnter },
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: isMobile ? "+=100%" : "+=160%",
              pin: true,
              scrub: 0.65,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          timeline
            .to(field, { autoAlpha: 1, y: 0, duration: 0.28 }, 0.04)
            .to(
              chars,
              {
                autoAlpha: 1,
                stagger: 0.018,
                duration: 0.12,
                ease: motion.easeLinear,
              },
              0.12,
            )
            .to(
              tokens,
              {
                autoAlpha: 1,
                y: 0,
                stagger: 0.05,
                duration: 0.28,
              },
              0.32,
            );

          if (!isMobile && branches) {
            timeline.to(branches, { autoAlpha: 1, duration: 0.28 }, 0.42);
          }

          timeline
            .to(
              visibleOutputs,
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                scale: 1,
                stagger: 0.06,
                duration: 0.42,
                ease: motion.easeCinematic,
              },
              0.48,
            )
            .to(firstPass, { autoAlpha: 0, duration: 0.22 }, 0.74)
            .to(secondPass, { autoAlpha: 1, duration: 0.24 }, 0.76);
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
      aria-labelledby="ai-web-heading"
      className="museum-section era-theme-ai ai-scene"
    >
      <div className="ai-pin">
        <div className="ai-copy">
          <p className="ai-year">{era.year}</p>
          <h2 id="ai-web-heading">{era.statement}</h2>
          {era.support ? <p className="ai-support">{era.support}</p> : null}
        </div>

        <div className="ai-stage">
          <svg
            className="ai-branches ai-desktop-only"
            data-ai-branches
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line x1="50" y1="48" x2="16" y2="18" />
            <line x1="50" y1="48" x2="84" y2="20" />
            <line x1="50" y1="48" x2="18" y2="82" />
            <line x1="50" y1="48" x2="86" y2="80" />
          </svg>

          <div className="ai-field" data-ai-field>
            <span className="ai-prompt-mark" aria-hidden="true">
              ›
            </span>
            <p className="ai-prompt">
              {AI_PROMPT.split("").map((char, index) => (
                <span key={`${char}-${index}`} data-ai-char>
                  {char === " " ? "\u00a0" : char}
                </span>
              ))}
            </p>
            <span className="ai-caret" data-ai-caret aria-hidden="true" />
          </div>

          <div className="ai-tokens" aria-hidden="true">
            {AI_TOKENS.map((token, index) => (
              <span
                key={token}
                className={`ai-token${index > 3 ? " ai-desktop-only" : ""}`}
                data-ai-token
              >
                {token}
              </span>
            ))}
          </div>

          <div className="ai-outputs">
            {AI_OUTPUTS.map((output) => (
              <article
                key={output.id}
                className={`ai-output ai-output-${output.kind}${
                  output.desktopOnly ? " ai-desktop-only" : ""
                }`}
                data-ai-output
                aria-hidden="true"
              >
                <span className="ai-output-label">
                  <span data-gen-a>{output.label}</span>
                  <span data-gen-b>{output.labelAlt}</span>
                </span>
                {output.kind === "ui" ? (
                  <div className="ai-ui">
                    <span className="ai-ui-bar" />
                    <strong data-gen-a>the web</strong>
                    <strong data-gen-b>your web</strong>
                    <p data-gen-a>{output.body}</p>
                    <p data-gen-b>{output.bodyAlt}</p>
                  </div>
                ) : null}
                {output.kind === "code" ? (
                  <pre className="ai-code">
                    <code data-gen-a>{output.body}</code>
                    <code data-gen-b>{output.bodyAlt}</code>
                  </pre>
                ) : null}
                {output.kind === "image" ? (
                  <div className="ai-image">
                    <span className="ai-image-field" />
                    <p data-gen-a>{output.body}</p>
                    <p data-gen-b>{output.bodyAlt}</p>
                  </div>
                ) : null}
                {output.kind === "diagram" ? (
                  <div className="ai-diagram">
                    <svg viewBox="0 0 120 56" aria-hidden="true">
                      <circle cx="18" cy="28" r="6" />
                      <circle cx="60" cy="14" r="5.5" />
                      <circle cx="60" cy="42" r="5.5" />
                      <circle cx="102" cy="28" r="6" />
                      <line x1="24" y1="28" x2="54" y2="16" />
                      <line x1="24" y1="28" x2="54" y2="40" />
                      <line x1="66" y1="16" x2="96" y2="28" />
                      <line x1="66" y1="40" x2="96" y2="28" />
                    </svg>
                    <p data-gen-a>{output.body}</p>
                    <p data-gen-b>{output.bodyAlt}</p>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
