import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "J.J VALOR ENTERPRISES LTD - Innovative Creativity Unbound",
  description: "Building Businesses That Build Lives. A legacy-driven ecosystem where enterprise fuels impact, communities are empowered, and the Children's Orphanage becomes a beacon of hope for generations to come.",
  keywords: ["J.J Valor", "Enterprises", "Uganda", "Real Estate", "Events Management", "Agriculture", "Youth Empowerment", "Orphanage"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
