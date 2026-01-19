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
      <div style={{ fontSize: "28px", fontWeight: 700 }}>Farcaster Frame elérhető</div>
      <p style={{ maxWidth: "520px", fontSize: "16px", color: "#cbd5f5" }}>
        A keret végpont a /frames útvonalon érhető el. Nyisd meg Farcasterben vagy teszteld
        böngészőből.
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
        Ugrás a /frames oldalra
      </Link>
    </main>
  );
}
