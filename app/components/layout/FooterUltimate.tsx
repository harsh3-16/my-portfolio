"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import MagneticButtons from "../MagneticButtons";

gsap.registerPlugin(ScrollTrigger);

export default function FooterUltimate() {
  const container = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState("");

  // Live Clock Logic
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZoneName: "short",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      // Split Text Stagger Reveal (3D Flip In)
      gsap.from(".footer-letter", {
        y: 100,
        opacity: 0,
        rotateX: -90,
        stagger: 0.05,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        },
      });
      
      // Floating Glass Dock Entrance
      gsap.from(".footer-dock", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
        },
      });
    },
    { scope: container }
  );

  const headingText = "LET'S TALK";

  return (
    <footer
      ref={container}
      className="relative w-full min-h-[80vh] bg-transparent pt-12 px-4 md:px-12 pb-8 flex flex-col justify-between overflow-hidden"
    >
      {/* TOP SECTION: BIG CTA */}
      <div className="flex flex-col items-center justify-center flex-grow relative z-10">
        <p className="text-neutral-500 uppercase tracking-[0.3em] text-xs mb-8">
          Have an idea?
        </p>

        <div className="flex justify-center w-full">
          <MagneticButtons>
            <Link href="/contact" className="group flex justify-center cursor-pointer">
              <div ref={textRef} className="relative inline-block py-2 overflow-hidden flex perspective-[1000px]">
                {headingText.split("").map((char, index) => (
                  <span 
                    key={index} 
                    className="footer-letter text-[13vw] md:text-[14vw] font-bold font-oswald uppercase leading-[1] text-white group-hover:text-[#b4b4b4] transition-colors duration-500 inline-block origin-bottom pointer-events-none"
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
                {/* Underline Animation */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[0.22,1,0.36,1] origin-center pointer-events-none" />
              </div>
            </Link>
          </MagneticButtons>
        </div>
      </div>

      {/* BOTTOM SECTION: GLASSMORPHIC DOCK */}
      <div className="footer-dock w-full mt-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs md:text-sm uppercase tracking-widest text-neutral-400">
          
          {/* Copyright */}
          <div className="flex flex-col items-center md:items-start w-full md:w-1/3">
            <span className="text-white/60">© 2026 Harsh Arora</span>
            <span>All Rights Reserved</span>
          </div>

          {/* Socials - Wrapped in Magnetic */}
          <div className="flex gap-6 justify-center w-full md:w-1/3">
            <MagneticButtons>
              <SocialLink href="mailto:harshdhruv099@gmail.com" label="Email" />
            </MagneticButtons>
            <MagneticButtons>
              <SocialLink href="https://github.com/harsh3-16" label="GitHub" />
            </MagneticButtons>
            <MagneticButtons>
              <SocialLink href="https://linkedin.com/in/harsh-arora" label="LinkedIn" />
            </MagneticButtons>
          </div>

          {/* Time & Location */}
          <div className="flex flex-col items-center md:items-end w-full md:w-1/3 text-center md:text-right">
            <div className="flex items-center gap-2 mb-1">
              {/* Pulsing Live Dot */}
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-white/90 font-mono">{time}</span>
            </div>
            <span className="text-white/50">Ghaziabad, India</span>
          </div>
          
        </div>
      </div>

      {/* Background Glows (Deep Jewel Tones) */}
      <div className="absolute bottom-0 left-1/4 w-[40vw] h-[40vh] bg-indigo-900/30 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[40vw] h-[40vh] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none -z-10" />
    </footer>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="relative hover:text-white transition-colors duration-300"
    >
      {label}
    </a>
  );
}
