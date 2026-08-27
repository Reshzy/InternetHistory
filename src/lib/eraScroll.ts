"use client";

import { eraIds } from "@/lib/eras";
import { ScrollTrigger } from "@/lib/gsap";

const NATIVE_HASH_IDS = new Set(["museum-nav", "museum-main"]);
const ERA_HASH_IDS = new Set<string>(eraIds);

function isEraHash(id: string) {
  return ERA_HASH_IDS.has(id);
}

export function triggerSectionId(target: Element) {
  if (target.classList.contains("museum-section") && target.id) {
    return target.id;
  }
  return target.closest(".museum-section")?.id ?? "";
}

export function pinSpacerFor(el: HTMLElement) {
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

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function pinForEra(id: string) {
  const el = document.getElementById(id);
  if (!el) {
    return undefined;
  }

  const spacerTop =
    pinSpacerFor(el).getBoundingClientRect().top + window.scrollY;

  return ScrollTrigger.getAll()
    .filter((st) => {
      const target = st.trigger;
      return target instanceof Element && triggerSectionId(target) === id;
    })
    .sort(
      (a, b) =>
        Math.abs(a.start - spacerTop) - Math.abs(b.start - spacerTop),
    )[0];
}

export function scrollToEra(id: string, allowFallback = false) {
  const el = document.getElementById(id);
  if (!el) {
    return false;
  }

  const trigger = pinForEra(id);

  if (trigger) {
    const span = Math.max(1, trigger.end - trigger.start);
    instantScroll(trigger.start + Math.min(span * 0.1, 64));
    return true;
  }

  if (allowFallback || prefersReducedMotion()) {
    const spacerTop =
      pinSpacerFor(el).getBoundingClientRect().top + window.scrollY;
    instantScroll(spacerTop);
    return true;
  }

  return false;
}

export function bindHashEraScroll() {
  let lockUntil = 0;
  const timers: number[] = [];

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  const fromHash = (allowFallback = false) => {
    const id = window.location.hash.replace(/^#/, "");
    if (!id || NATIVE_HASH_IDS.has(id) || !isEraHash(id)) {
      return;
    }
    scrollToEra(id, allowFallback);
  };

  const restart = () => {
    lockUntil = performance.now() + 3200;
    fromHash();
  };

  const onRefresh = () => {
    if (performance.now() < lockUntil && window.location.hash) {
      fromHash();
    }
  };

  const onClick = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0) {
      return;
    }
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    const anchor = target.closest("a[href^='#']");
    if (!(anchor instanceof HTMLAnchorElement)) {
      return;
    }
    if (anchor.hasAttribute("data-web-link")) {
      return;
    }

    const id = anchor.hash.replace(/^#/, "");
    if (!id || NATIVE_HASH_IDS.has(id) || !isEraHash(id)) {
      return;
    }

    event.preventDefault();
    if (window.location.hash !== `#${id}`) {
      history.pushState(null, "", `#${id}`);
    }
    lockUntil = performance.now() + 3200;
    if (!scrollToEra(id)) {
      ScrollTrigger.refresh();
      timers.push(window.setTimeout(() => fromHash(true), 120));
    }
  };

  window.addEventListener("hashchange", restart);
  window.addEventListener("popstate", restart);
  document.addEventListener("click", onClick, true);
  ScrollTrigger.addEventListener("refresh", onRefresh);

  timers.push(window.setTimeout(restart, 80));
  timers.push(window.setTimeout(restart, 450));
  timers.push(
    window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 900),
  );
  timers.push(window.setTimeout(() => fromHash(true), 1800));

  return () => {
    window.removeEventListener("hashchange", restart);
    window.removeEventListener("popstate", restart);
    document.removeEventListener("click", onClick, true);
    ScrollTrigger.removeEventListener("refresh", onRefresh);
    for (const timer of timers) {
      window.clearTimeout(timer);
    }
  };
}
