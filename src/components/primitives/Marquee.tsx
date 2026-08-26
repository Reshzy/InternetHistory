type MarqueeProps = {
  text: string;
  className?: string;
};

export function Marquee({ text, className }: MarqueeProps) {
  return (
    <div
      className={["museum-marquee", className].filter(Boolean).join(" ")}
      aria-hidden="true"
    >
      <div className="museum-marquee-track">
        <p>{text}</p>
        <p aria-hidden="true">{text}</p>
      </div>
    </div>
  );
}
