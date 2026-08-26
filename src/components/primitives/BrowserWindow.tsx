type BrowserWindowProps = {
  title: string;
  url: string;
  children: React.ReactNode;
  className?: string;
};

export function BrowserWindow({
  title,
  url,
  children,
  className,
}: BrowserWindowProps) {
  return (
    <article className={["browser", className].filter(Boolean).join(" ")}>
      <header className="browser-chrome">
        <div className="browser-controls" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="browser-title">{title}</p>
      </header>
      <div className="browser-toolbar">
        <span className="browser-nav" aria-hidden="true">
          Location
        </span>
        <span className="browser-url">{url}</span>
      </div>
      <div className="browser-page">{children}</div>
    </article>
  );
}
