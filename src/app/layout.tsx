import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { AppFooter, AppHeader } from "@/components/AppChrome";
import { CompareProvider } from "@/context/CompareContext";
import { CompareBar } from "@/components/CompareBar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const pangolin = localFont({
  src: "../fonts/pangolin-regular.woff2",
  variable: "--font-pangolin",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "FadeScore | Find the Best Barbers Near You",
  description:
    "We rank the best barbers by real customer reviews, prices, and FadeScore ratings. Find top fade barbers, cheap haircuts, and hidden gems in your city.",
  metadataBase: new URL("https://fadescore.com"),
  openGraph: {
    title: "FadeScore | Find the Best Barbers Near You",
    description:
      "We rank the best barbers by real customer reviews, prices, and FadeScore ratings.",
    siteName: "FadeScore",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FadeScore | Find the Best Barbers Near You",
    description:
      "We rank the best barbers by real customer reviews, prices, and FadeScore ratings.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${pangolin.variable}`}
    >
      <body className="antialiased min-h-screen flex flex-col font-sans bg-fade-canvas text-fade-navy">
        <GoogleAnalytics />
        <CompareProvider>
          <AppHeader />
          <main className="min-h-[60vh] flex-1">{children}</main>
          <CompareBar />
          <AppFooter />
        </CompareProvider>
      </body>
    </html>
  );
}
