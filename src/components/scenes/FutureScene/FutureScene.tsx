"use client";

import { type FormEvent, useRef, useState } from "react";
import { NoiseLayer } from "@/components/effects/NoiseLayer";
import { getEra } from "@/lib/eras";
import { gsap, useGSAP } from "@/lib/gsap";
import { motion } from "@/lib/motion";

const ANSWER_LIMIT = 80;

function glyphStyle(index: number): { left: string; top: string } {
  const x = ((index * 37) % 78) + 8;
  const y = ((index * 53 + 19) % 48) + 16;
  return { left: `${x}%`, top: `${y}%` };
}

export function FutureScene() {
  const era = getEra("next");
  const rootRef = useRef<HTMLElement>(null);
  const [answer, setAnswer] = useState("");
  const glyphs = [...answer].filter((character) => character !== " ");

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) {
        return;
      }

      const pin = root.querySelector<HTMLElement>("[data-future-pin]");
      const year = root.querySelector<HTMLElement>("[data-future-year]");
      const statement = root.querySelector<HTMLElement>("[data-future-statement]");
      const question = root.querySelector<HTMLElement>("[data-future-question]");
      const prompt = root.querySelector<HTMLElement>("[data-future-prompt]");
      if (!pin || !year || !statement || !question || !prompt) {
        return;
      }

      const intro = [year, statement, question, prompt];
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(intro, { autoAlpha: 1, y: 0 });
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

          gsap.set(intro, { autoAlpha: 0, y: 14 });

          const timeline = gsap.timeline({
            defaults: { ease: motion.easeEnter },
            scrollTrigger: {
              trigger: pin,
              start: "top top",
              end: isMobile ? "+=50%" : "+=70%",
              pin: true,
              scrub: 0.55,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          timeline
            .to(year, { autoAlpha: 1, y: 0, duration: 0.28 }, 0)
            .to(statement, { autoAlpha: 1, y: 0, duration: 0.42 }, 0.12)
            .to(question, { autoAlpha: 1, y: 0, duration: 0.38 }, 0.4)
            .to(prompt, { autoAlpha: 1, y: 0, duration: 0.32 }, 0.68);
        },
      );

      return () => {
        mm.revert();
      };
    },
    { scope: rootRef },
  );

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section
      ref={rootRef}
      id={era.id}
      aria-labelledby="next-heading"
      className="museum-section era-theme-next future-scene"
    >
      <div className="future-pin" data-future-pin>
        <div className="future-noise" aria-hidden="true">
          <NoiseLayer />
        </div>

        <div className="future-glyphs" aria-hidden="true">
          {glyphs.map((character, index) => (
            <span
              key={`${character}-${index}`}
              className="future-glyph"
              style={glyphStyle(index)}
            >
              {character}
            </span>
          ))}
        </div>

        <div className="future-copy">
          <p className="future-year" data-future-year>
            {era.year}
          </p>
          <h2 id="next-heading" data-future-statement>
            {era.statement}
          </h2>
          {era.support ? (
            <p className="future-question" data-future-question>
              {era.support}
            </p>
          ) : null}
          <output
            htmlFor="future-answer"
            className="future-answer-line"
            data-has-answer={answer.length > 0 ? "true" : "false"}
          >
            {answer}
          </output>
        </div>

        <form className="future-prompt" data-future-prompt onSubmit={onSubmit}>
          <label htmlFor="future-answer" className="future-prompt-label">
            What should the web become next?
          </label>
          <p id="future-limit" className="sr-only">
            Up to {ANSWER_LIMIT} characters.
          </p>
          <span className="future-prompt-mark" aria-hidden="true">
            &gt;
          </span>
          <span className="boot-cursor future-idle-cursor" aria-hidden="true" />
          <input
            id="future-answer"
            className="future-field"
            value={answer}
            maxLength={ANSWER_LIMIT}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            placeholder=" "
            aria-describedby="future-limit"
            onChange={(event) => setAnswer(event.target.value.slice(0, ANSWER_LIMIT))}
          />
        </form>
      </div>

      <footer className="future-rest">
        <p className="future-signature">
          <span>NET//HISTORY</span>
          <span>1995 — 2026 — ?</span>
        </p>
        <p className="future-credits">An interactive museum exhibit.</p>
        <a className="future-replay" href="#boot">
          Begin again
        </a>
      </footer>
    </section>
  );
}
