import type { ReactNode } from "react";

type BrowserWindowProps = {
  title: string;
  url: string;
  children: ReactNode;
  className?: string;
  status?: string;
  onBack?: () => void;
  backDisabled?: boolean;
};

export function BrowserWindow({
  title,
  url,
  children,
  className,
  status = "Document: Done",
  onBack,
  backDisabled = true,
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
        {onBack ? (
          <button
            type="button"
            className="browser-back"
            onClick={onBack}
            disabled={backDisabled}
            aria-label="Back to INDEX.HTM"
          >
            Back
          </button>
        ) : null}
        <span className="browser-nav" aria-hidden="true">
          Location
        </span>
        <span className="browser-url">{url}</span>
      </div>
      <div className="browser-page">{children}</div>
      <p className="browser-status">{status}</p>
    </article>
  );
}
