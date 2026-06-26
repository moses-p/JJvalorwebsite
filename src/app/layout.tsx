import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/SiteShell";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jjvalor.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "J.J VALOR ENTERPRISES LTD - Innovative Creativity Unbound",
    template: "%s | J.J Valor Enterprises",
  },
  description:
    "Building Businesses That Build Lives. A legacy-driven ecosystem where enterprise fuels impact, communities are empowered, and the Children's Orphanage becomes a beacon of hope for generations to come.",
  keywords: [
    "J.J Valor",
    "Enterprises",
    "Uganda",
    "Real Estate",
    "Events Management",
    "Agriculture",
    "Youth Empowerment",
    "Orphanage",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "J.J Valor Enterprises",
    title: "J.J VALOR ENTERPRISES LTD - Innovative Creativity Unbound",
    description:
      "Building Businesses That Build Lives across construction, agriculture, education, tours, and community empowerment in Uganda.",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "J.J Valor Enterprises",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "J.J VALOR ENTERPRISES LTD",
    description: "Building Businesses That Build Lives.",
    images: ["/images/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
