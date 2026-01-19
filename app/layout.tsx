export const metadata = {
  title: "Farcaster Frame",
  description:
    "A gamified Farcaster Frame that lets users earn points by completing tasks like following, recasting, checking in and playing mini-games.",
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
