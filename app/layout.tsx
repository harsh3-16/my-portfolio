import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import Cursor from "./components/Cursor";
import Preloader from "./components/Preloader";
import FluidBackground from "./components/FluidBackground";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
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
        className={` ${inter.variable} ${oswald.variable} font-sans antialiased bg-[#0a0a0a] text-[#f0f0f0]`}
      >
        <Preloader />
        <Cursor />
        <FluidBackground />
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
        <Footer />
      </body>
    </html>
  );
}
