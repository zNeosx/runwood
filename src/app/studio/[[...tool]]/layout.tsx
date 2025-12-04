import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Runwood App Sanity Studio',
  description: 'Runwood App Sanity Studio',
};

export default function SanityRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
