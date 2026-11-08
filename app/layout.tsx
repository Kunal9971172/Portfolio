import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import AppProvider from "@/components/providers/AppProvider";
import Navbar from "@/components/navigation/Navbar";
import CommandCenter from "@/components/command-center/CommandCenter";
import FloatingAssistant from "@/components/chatbot/FloatingAssistant";
import VisitorTracker from "@/components/analytics/VisitorTracker";
import Footer from "@/components/footer/Footer";
import { profile } from "@/lib/data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kunal-portfolio-steel-rho.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — AI & Software Engineering`,
    template: `%s · ${profile.name}`,
  },
  description: profile.positioning,
  keywords: [
    "Kunal Chaudhari",
    "AI Engineer",
    "Full-Stack Developer",
    "Product Engineer",
    "Data Science",
    "Machine Learning",
    "Next.js Portfolio",
    "Agentic Systems",
    "Pune Developer",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: `${profile.name} — Personal Engineering HQ`,
    description: profile.positioning,
    siteName: `${profile.name} Portfolio`,
    images: [
      {
        url: "/images/kunal.png",
        width: 800,
        height: 800,
        alt: `${profile.name} - Portrait`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — AI & Software Engineering`,
    description: profile.positioning,
    images: ["/images/kunal.png"],
  },
};

export const viewport: Viewport = { themeColor: "#030712" };

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: siteUrl,
  image: `${siteUrl}/images/kunal.png`,
  jobTitle: profile.title,
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Dr. D. Y. Patil Institute of Technology, Pune",
  },
  sameAs: [profile.linkedin, profile.github],
  description: profile.positioning,
  email: profile.email,
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Full-Stack Development",
    "Agentic RAG",
    "Next.js",
    "React",
    "TypeScript",
    "Python",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
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
          <FloatingAssistant />
          <VisitorTracker />
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
