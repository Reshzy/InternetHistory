import { useId } from "react";

export function NoiseLayer() {
  const rawId = useId();
  const id = `noise-${rawId.replace(/:/g, "")}`;

  return (
    <svg className="noise-layer" aria-hidden="true">
      <filter id={id}>
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.85"
          numOctaves="2"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${id})`} />
    </svg>
  );
}
