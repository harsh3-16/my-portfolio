"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import MagneticButtons from "../MagneticButtons";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
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
      // Parallax effect on the big text
      gsap.fromTo(
        textRef.current,
        { y: -50 },
        {
          y: 50,
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <footer
      ref={container}
      className="relative w-full min-h-[80vh] bg-transparent pt-24 px-6 md:px-12 pb-12 flex flex-col justify-between border-t border-white/10 mt-24"
    >
      {/* TOP SECTION: BIG CTA */}
      <div className="flex flex-col items-center justify-center flex-grow relative z-10">
        <p className="text-neutral-500 uppercase tracking-[0.3em] text-xs mb-8">
          Have an idea?
        </p>

        <Link href="/contact" className="group flex justify-center">
          <div ref={textRef} className="relative inline-block py-2">
            <h2 className="text-[11vw] md:text-[13vw] font-bold font-oswald uppercase leading-[1.1] text-white/90 mix-blend-overlay group-hover:text-white transition-colors duration-500">
              Let's Talk
            </h2>
            {/* Underline Animation */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[0.22,1,0.36,1] origin-left" />
          </div>
        </Link>
      </div>

      {/* BOTTOM SECTION: INFO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full border-t border-white/10 pt-8 mt-12 text-sm uppercase tracking-widest text-neutral-400">
        {/* COL 1: Copyright */}
        <div className="flex flex-col justify-end">
          <span className="text-white/60">© 2026 Harsh Arora</span>
          <span>All Rights Reserved</span>
        </div>

        {/* COL 2: Socials - Wrapped in Magnetic */}
        <div className="flex flex-col justify-end items-start md:items-center">
          <div className="flex gap-4">
            {" "}
            {/* Reduced gap slightly to fit magnets */}
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
        </div>

        {/* COL 3: Time & Location */}
        <div className="flex flex-col justify-end items-start md:items-end text-right">
          <span className="text-white/80">{time}</span>
          <span>Ghaziabad, India</span>
        </div>
      </div>

      {/* Background Glow for Atmosphere */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-[40vh] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />
    </footer>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="relative hover:text-white transition-colors duration-300"
    >
      {label}
    </a>
  );
}
