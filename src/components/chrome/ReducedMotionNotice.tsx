"use client";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function ReducedMotionNotice() {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (!prefersReducedMotion) {
    return null;
  }

  return (
    <p className="motion-notice">
      Motion reduced — the full timeline is still here.
    </p>
  );
}
