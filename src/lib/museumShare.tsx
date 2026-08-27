export function MuseumShareMark() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#050505",
        color: "#e8e4d9",
        padding: "72px 80px",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 10,
            background: "#d4782a",
          }}
        />
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
          }}
        >
          NET//HISTORY
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div
          style={{
            fontSize: 58,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            maxWidth: 920,
          }}
        >
          30 years of the web in one scroll.
        </div>
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.04em",
            color: "#cfcbbf",
            maxWidth: 760,
          }}
        >
          An interactive museum. Not an article with animations added.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: 22,
          fontSize: 16,
          letterSpacing: "0.18em",
          color: "#d4d0c4",
        }}
      >
        <span>BOOT</span>
        <span>1995</span>
        <span>2007</span>
        <span>2026</span>
        <span>NEXT</span>
      </div>
    </div>
  );
}
