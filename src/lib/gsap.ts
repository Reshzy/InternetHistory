"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  gsap.config({ nullTargetWarn: false });
  ScrollTrigger.config({ ignoreMobileResize: true });

  const view = window as Window & { __nhTickerBound?: boolean };
  if (!view.__nhTickerBound) {
    view.__nhTickerBound = true;
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        gsap.ticker.sleep();
      } else {
        gsap.ticker.wake();
      }
    });
  }
}

export { gsap, ScrollTrigger, useGSAP };
