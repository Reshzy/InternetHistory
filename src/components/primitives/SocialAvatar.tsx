type SocialAvatarProps = {
  initial: string;
  color: string;
  src?: string;
  className?: string;
};

export function SocialAvatar({
  initial,
  color,
  src,
  className,
}: SocialAvatarProps) {
  return (
    <span
      className={["social-avatar", className].filter(Boolean).join(" ")}
      style={src ? undefined : { background: color }}
    >
      {src ? (
        // DiceBear serves SVG; next/image does not optimize it.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" width={64} height={64} />
      ) : (
        initial
      )}
    </span>
  );
}
