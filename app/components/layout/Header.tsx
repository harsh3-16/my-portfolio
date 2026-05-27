"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import MagneticButtons from "../MagneticButtons";
import TransitionLink from "../TransitionLinkPixel";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

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

  useGSAP(
    () => {
      if (isMenuOpen) {
        gsap.fromTo(
          ".mobile-nav-item",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: 0.2 }
        );
      } else {
        gsap.set(".mobile-nav-item", { opacity: 0, y: 50 });
      }
    },
    { dependencies: [isMenuOpen], scope: menuRef }
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
            <NavLink href="/work" title="Work" isActive={pathname.startsWith("/work")} />
          </MagneticButtons>
          <MagneticButtons>
            <NavLink href="/about" title="About" isActive={pathname.startsWith("/about")} />
          </MagneticButtons>
          <MagneticButtons>
            <NavLink href="/contact" title="Contact" isActive={pathname.startsWith("/contact")} />
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
        ref={menuRef}
        className={`fixed inset-0 bg-[#0a0a0a] z-40 flex flex-col justify-center items-center transition-all duration-500 ease-[0.22,1,0.36,1] ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <nav className="flex flex-col gap-10 text-center">
          <div className="mobile-nav-item">
            <MobileNavLink href="/work" title="Work" isActive={pathname.startsWith("/work")} onClick={() => setIsMenuOpen(false)} />
          </div>
          <div className="mobile-nav-item">
            <MobileNavLink href="/about" title="About" isActive={pathname.startsWith("/about")} onClick={() => setIsMenuOpen(false)} />
          </div>
          <div className="mobile-nav-item">
            <MobileNavLink href="/contact" title="Contact" isActive={pathname.startsWith("/contact")} onClick={() => setIsMenuOpen(false)} />
          </div>
        </nav>
      </div>
    </>
  );
}

function NavLink({ href, title, isActive }: { href: string; title: string; isActive: boolean }) {
  return (
    <TransitionLink
      href={href}
      className="group relative overflow-hidden block px-4 py-2"
    >
      <div className={`relative text-xs font-bold uppercase tracking-[0.2em] transition-opacity duration-300 ${isActive ? "opacity-100 text-cyan-400" : "opacity-70 hover:opacity-100"}`}>
        <span className="block group-hover:-translate-y-full transition-transform duration-500 ease-[0.22,1,0.36,1]">
          {title}
        </span>
        <span className="absolute top-0 left-0 block translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1] text-white">
          {title}
        </span>
      </div>
      {/* Active Dot Indicator */}
      {isActive && (
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
      )}
    </TransitionLink>
  );
}

function MobileNavLink({ href, title, isActive, onClick }: { href: string; title: string; isActive: boolean; onClick: () => void }) {
  return (
    <TransitionLink
      href={href}
      className="group relative overflow-hidden block px-4 py-2"
      onNavigate={onClick}
    >
      <div className={`relative text-5xl font-bold font-oswald uppercase tracking-widest transition-opacity duration-300 ${isActive ? "opacity-100 text-cyan-400" : "opacity-70 hover:opacity-100"}`}>
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
