import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        padding: "32px",
        background: "#0b1120",
        color: "#e2e8f0",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "28px", fontWeight: 700 }}>Farcaster Frame is live</div>
      <p style={{ maxWidth: "520px", fontSize: "16px", color: "#cbd5f5" }}>
        The frame endpoint is available at /frames. Open it in Farcaster or test it in a browser.
      </p>
      <Link
        href="/frames"
        style={{
          padding: "10px 18px",
          borderRadius: "999px",
          background: "#f43f5e",
          color: "#0f172a",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        Go to /frames
      </Link>
    </main>
  );
}
