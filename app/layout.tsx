import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import Cursor from "./components/Cursor";
import Preloader from "./components/PreloaderUltimate";
import FluidBackground from "./components/FluidBackground";
import Header from "./components/layout/Header";
import Footer from "./components/layout/FooterUltimate";
import BackToTop from "./components/BackToTop";
import SectionBreak from "./components/ui/SectionBreak";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harsh Arora | Creative Developer",
  description: "Portfolio of Harsh Arora, a Creative Developer specializing in highly interactive, premium web experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${inter.variable} ${oswald.variable} antialiased bg-[#0a0a0a] text-[#f0f0f0]`}
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        <Preloader />
        <Cursor />
        <FluidBackground />
        <BackToTop />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#111',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
            },
          }}
        />
        <div className="fixed inset-0 z-5 pointer-events-none noise-overlay" />
        <Header />
        <SmoothScroll>
          <div className="relative z-10">{children}</div>
        </SmoothScroll>
        <SectionBreak />
        <Footer />
      </body>
    </html>
  );
}
