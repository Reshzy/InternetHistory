"use client";

import { ScrollTrigger } from "@/lib/gsap";

function triggerSectionId(target: Element) {
  if (target.classList.contains("museum-section") && target.id) {
    return target.id;
  }
  return target.closest(".museum-section")?.id ?? "";
}

function pinSpacerFor(el: HTMLElement) {
  if (el.parentElement?.classList.contains("pin-spacer")) {
    return el.parentElement;
  }
  const nested = el.querySelector(":scope > .pin-spacer");
  if (nested instanceof HTMLElement) {
    return nested;
  }
  return el;
}

function instantScroll(top: number) {
  const html = document.documentElement;
  const previous = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  window.scrollTo(0, top);
  html.style.scrollBehavior = previous;
}

export function scrollToEra(id: string) {
  const el = document.getElementById(id);
  if (!el) {
    return false;
  }

  const spacerTop =
    pinSpacerFor(el).getBoundingClientRect().top + window.scrollY;

  const trigger = ScrollTrigger.getAll()
    .filter((st) => {
      const target = st.trigger;
      return target instanceof Element && triggerSectionId(target) === id;
    })
    .sort(
      (a, b) =>
        Math.abs(a.start - spacerTop) - Math.abs(b.start - spacerTop),
    )[0];

  if (trigger) {
    const span = Math.max(1, trigger.end - trigger.start);
    instantScroll(trigger.start + Math.min(span * 0.1, 64));
    return true;
  }

  instantScroll(spacerTop);
  return false;
}

export function bindHashEraScroll() {
  let lockUntil = 0;

  const fromHash = () => {
    const id = window.location.hash.replace(/^#/, "");
    if (!id || id === "museum-nav") {
      return;
    }
    scrollToEra(id);
  };

  const restart = () => {
    lockUntil = performance.now() + 2800;
    fromHash();
  };

  const onRefresh = () => {
    if (performance.now() < lockUntil && window.location.hash) {
      fromHash();
    }
  };

  window.addEventListener("hashchange", restart);
  ScrollTrigger.addEventListener("refresh", onRefresh);

  const t1 = window.setTimeout(restart, 80);
  const t2 = window.setTimeout(restart, 450);
  const t3 = window.setTimeout(() => {
    ScrollTrigger.refresh();
  }, 900);
  const t4 = window.setTimeout(restart, 1800);

  return () => {
    window.removeEventListener("hashchange", restart);
    ScrollTrigger.removeEventListener("refresh", onRefresh);
    window.clearTimeout(t1);
    window.clearTimeout(t2);
    window.clearTimeout(t3);
    window.clearTimeout(t4);
  };
}
