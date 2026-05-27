"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import MagneticButtons from "../MagneticButtons";
import TransitionLink from "../TransitionLinkPixel";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(headerRef.current, {
        y: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.5,
      });
    },
    { scope: headerRef }
  );

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-6 flex justify-between items-center text-white transition-colors duration-300 ${isMenuOpen ? "" : "mix-blend-difference"}`}
      >
        {/* LOGO - Wrapped in Magnetic */}
        <MagneticButtons>
          <TransitionLink href="/" className="group cursor-pointer block p-2">
            {/* Added padding so the magnet area is larger than the text */}
            <div className="flex flex-col leading-none font-bold font-oswald uppercase text-xl tracking-tighter">
              <span className="group-hover:-translate-y-full transition-transform duration-500 ease-[0.22,1,0.36,1]">
                Harsh
              </span>
              <span className="absolute group-hover:-translate-y-full transition-transform duration-500 ease-[0.22,1,0.36,1] translate-y-full text-gray-400">
                Arora
              </span>
            </div>
          </TransitionLink>
        </MagneticButtons>

        {/* NAV LINKS */}
        <nav className="hidden md:flex gap-8">
          <MagneticButtons>
            <NavLink href="/work" title="Work" />
          </MagneticButtons>
          <MagneticButtons>
            <NavLink href="/about" title="About" />
          </MagneticButtons>
          <MagneticButtons>
            <NavLink href="/contact" title="Contact" />
          </MagneticButtons>
        </nav>

        {/* MOBILE MENU TRIGGER */}
        <div className="md:hidden">
          <MagneticButtons>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-xs uppercase tracking-widest font-bold p-4 relative z-50"
            >
              {isMenuOpen ? "Close" : "Menu"}
            </button>
          </MagneticButtons>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`fixed inset-0 bg-[#0a0a0a] z-40 flex flex-col justify-center items-center transition-all duration-500 ease-[0.22,1,0.36,1] ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <nav className="flex flex-col gap-10 text-center">
          <MobileNavLink href="/work" title="Work" onClick={() => setIsMenuOpen(false)} />
          <MobileNavLink href="/about" title="About" onClick={() => setIsMenuOpen(false)} />
          <MobileNavLink href="/contact" title="Contact" onClick={() => setIsMenuOpen(false)} />
        </nav>
      </div>
    </>
  );
}

// Sub-component (Unchanged, just added padding for better hit area)
function NavLink({ href, title }: { href: string; title: string }) {
  return (
    <TransitionLink
      href={href}
      className="group relative overflow-hidden block px-4 py-2"
    >
      <div className="relative text-xs font-bold uppercase tracking-[0.2em] transition-opacity duration-300 hover:opacity-100 opacity-70">
        <span className="block group-hover:-translate-y-full transition-transform duration-500 ease-[0.22,1,0.36,1]">
          {title}
        </span>
        <span className="absolute top-0 left-0 block translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1] text-white">
          {title}
        </span>
      </div>
    </TransitionLink>
  );
}

function MobileNavLink({ href, title, onClick }: { href: string; title: string, onClick: () => void }) {
  return (
    <TransitionLink
      href={href}
      className="group relative overflow-hidden block px-4 py-2"
      onNavigate={onClick}
    >
      <div className="relative text-5xl font-bold font-oswald uppercase tracking-widest transition-opacity duration-300 hover:opacity-100 opacity-70">
        <span className="block group-hover:-translate-y-full transition-transform duration-500 ease-[0.22,1,0.36,1]">
          {title}
        </span>
        <span className="absolute top-0 left-0 block translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1] text-white">
          {title}
        </span>
      </div>
    </TransitionLink>
  );
}
