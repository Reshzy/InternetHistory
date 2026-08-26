"use client";

import { useSyncExternalStore } from "react";

const FINE = "(pointer: fine)";
const COARSE = "(pointer: coarse)";
const HOVER = "(hover: hover)";

type PointerCapabilities = {
  isFine: boolean;
  isCoarse: boolean;
  canHover: boolean;
};

const serverSnapshot: PointerCapabilities = {
  isFine: false,
  isCoarse: true,
  canHover: false,
};

let cachedSnapshot: PointerCapabilities = serverSnapshot;

function readCapabilities(): PointerCapabilities {
  const next = {
    isFine: window.matchMedia(FINE).matches,
    isCoarse: window.matchMedia(COARSE).matches,
    canHover: window.matchMedia(HOVER).matches,
  };

  if (
    cachedSnapshot.isFine === next.isFine &&
    cachedSnapshot.isCoarse === next.isCoarse &&
    cachedSnapshot.canHover === next.canHover
  ) {
    return cachedSnapshot;
  }

  cachedSnapshot = next;
  return cachedSnapshot;
}

function subscribe(onStoreChange: () => void) {
  const fine = window.matchMedia(FINE);
  const coarse = window.matchMedia(COARSE);
  const hover = window.matchMedia(HOVER);
  fine.addEventListener("change", onStoreChange);
  coarse.addEventListener("change", onStoreChange);
  hover.addEventListener("change", onStoreChange);
  return () => {
    fine.removeEventListener("change", onStoreChange);
    coarse.removeEventListener("change", onStoreChange);
    hover.removeEventListener("change", onStoreChange);
  };
}

function getServerSnapshot() {
  return serverSnapshot;
}

export function usePointerCapabilities() {
  return useSyncExternalStore(subscribe, readCapabilities, getServerSnapshot);
}
