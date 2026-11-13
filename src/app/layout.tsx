import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter-tight";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { Providers } from "@/components/ui/Providers";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Toaster } from "@/components/ui/Toaster";
import { PageFade } from "@/components/ui/PageFade";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "VYRA — Hear beyond the frame",
    template: "%s — VYRA",
  },
  description: SITE.description,
  applicationName: "VYRA",
  keywords: [
    "VYRA",
    "spatial audio",
    "headphones",
    "concept design",
    "premium audio",
    "WebGL",
  ],
  authors: [{ name: "VYRA Concept Studio" }],
  openGraph: {
    title: "VYRA — Hear beyond the frame",
    description: SITE.description,
    type: "website",
    siteName: "VYRA",
  },
  twitter: {
    card: "summary_large_image",
    title: "VYRA — Hear beyond the frame",
    description: SITE.description,
  },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08090D",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Providers>
          <div className="grain" aria-hidden="true" />
          <CustomCursor />
          <SiteHeader />
          <PageFade>
            <main id="main" className="relative">
              {children}
            </main>
          </PageFade>
          <SiteFooter />
          <CartDrawer />
          <SearchOverlay />
          <MobileMenu />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
