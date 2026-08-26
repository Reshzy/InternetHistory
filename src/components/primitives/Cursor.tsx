"use client";

import { useEffect, useRef, useState } from "react";
import { usePointerCapabilities } from "@/hooks/usePointerCapabilities";
import { gsap, useGSAP } from "@/lib/gsap";

export function Cursor() {
  const { isFine, isCoarse, canHover } = usePointerCapabilities();
  const enabled = isFine && canHover && !isCoarse;
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useGSAP(
    (_context, contextSafe) => {
      if (!enabled || !dotRef.current || !ringRef.current || !contextSafe) {
        return;
      }

      const dot = dotRef.current;
      const ring = ringRef.current;
      const xDot = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
      const yDot = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
      const xRing = gsap.quickTo(ring, "x", { duration: 0.22, ease: "power3" });
      const yRing = gsap.quickTo(ring, "y", { duration: 0.22, ease: "power3" });

      let armed = false;
      const onMove = contextSafe((event: PointerEvent) => {
        xDot(event.clientX);
        yDot(event.clientY);
        xRing(event.clientX);
        yRing(event.clientY);
        if (!armed) {
          armed = true;
          setReady(true);
        }
      });

      const onOver = contextSafe((event: PointerEvent) => {
        const target = event.target;
        if (!(target instanceof Element)) {
          return;
        }
        const interactive = target.closest("a, button");
        gsap.to(ring, {
          scale: interactive ? 1.55 : 1,
          duration: 0.18,
          ease: "power2.out",
        });
      });

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerover", onOver);

      return () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerover", onOver);
      };
    },
    { dependencies: [enabled] },
  );

  useEffect(() => {
    if (!enabled || !ready) {
      return;
    }
    document.documentElement.classList.add("has-custom-cursor");
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled, ready]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        className="museum-cursor"
        aria-hidden="true"
        style={{ opacity: ready ? 1 : 0 }}
      />
      <div
        ref={ringRef}
        className="museum-cursor-ring"
        aria-hidden="true"
        style={{ opacity: ready ? 0.85 : 0 }}
      />
    </>
  );
}
