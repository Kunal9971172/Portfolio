import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import AppProvider from "@/components/providers/AppProvider";
import Navbar from "@/components/navigation/Navbar";
import CommandCenter from "@/components/command-center/CommandCenter";
import Footer from "@/components/footer/Footer";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: { default: `${profile.name} — AI & Software Engineering`, template: `%s · ${profile.name}` },
  description: profile.positioning,
  openGraph: {
    title: `${profile.name} — Personal Engineering HQ`,
    description: profile.positioning,
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#030712" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col selection:bg-cyan/20 selection:text-white">
        <AppProvider>
          <div className="ambient fx-only" aria-hidden />
          <div className="grid-mesh fx-only" aria-hidden />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-black"
          >
            Skip to content
          </a>
          <Navbar />
          <CommandCenter />
          <div id="main" className="flex-1">
            {children}
          </div>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
