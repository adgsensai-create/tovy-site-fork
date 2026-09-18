import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tovyphotography.com"),
  title: {
    default: "Tovy Photography | Skokie Family & Newborn Photographer",
    template: "%s | Tovy Photography",
  },
  description:
    "Skokie family, newborn, maternity and milestone photographer. Natural light sessions at home or on location across Chicago's North Shore.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tovyphotography.com",
    siteName: "Tovy Photography",
    images: [
      {
        url: "https://tovyphotography.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tovy Photography — Family & Newborn Photographer in Skokie, IL",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
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
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="font-[family-name:var(--font-montserrat)] antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
