import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Farcaster Frame",
  description: "Farcaster frame endpoints and landing page.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hu">
      <body>{children}</body>
    </html>
  );
}
