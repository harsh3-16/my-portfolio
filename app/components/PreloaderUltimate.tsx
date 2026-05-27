"use client";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function PreloaderUltimate() {
  const [visible, setVisible] = useState(true);
  const container = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const topHalf = useRef<HTMLDivElement>(null);
  const bottomHalf = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const diveBg = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useGSAP(() => {
    const t1 = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setVisible(false);
      },
    });

    // 1. Draw the sleek line across the center
    t1.to(line.current, { scaleX: 1, duration: 1, ease: "power3.inOut", delay: 0.2 });
    
    // 2. Open the eyelids
    t1.to(topHalf.current, { yPercent: -100, duration: 1.2, ease: "expo.inOut" }, "+=0.3");
    t1.to(bottomHalf.current, { yPercent: 100, duration: 1.2, ease: "expo.inOut" }, "<");
    t1.to(line.current, { opacity: 0, duration: 0.1 }, "<");
    
    // The eyelids opening reveal the diveBg which is STILL BLACK, hiding the site.
    // The text fades in slightly as the eyelids open.
    t1.from(textRef.current, { opacity: 0, scale: 0.9, duration: 1, ease: "power3.out" }, "<0.2");

    // 3. Dive through the text!
    t1.to(textRef.current, {
      scale: 150,
      opacity: 0,
      duration: 1.5,
      ease: "power4.in",
    }, "+=0.5");

    // As we dive through the text, fade out the black diveBg to reveal the site!
    t1.to(diveBg.current, {
      opacity: 0,
      duration: 0.5,
    }, "-=0.5");

  }, { scope: container });

  if (!visible) return null;

  return (
    <div ref={container} className="fixed inset-0 z-[9999] flex items-center justify-center w-full h-full pointer-events-none">
      
      {/* The Dive Background (Hides the site until the very end) */}
      <div ref={diveBg} className="absolute inset-0 w-full h-full bg-[#0a0a0a] z-10" />

      {/* Dive Typography */}
      <h1 
        ref={textRef} 
        className="relative z-20 text-white font-oswald font-bold uppercase tracking-tighter text-6xl md:text-8xl will-change-transform mix-blend-difference"
      >
        Harsh Arora
      </h1>

      {/* Eyelid Panels (Covers everything initially) */}
      <div className="absolute inset-0 flex flex-col w-full h-full z-30">
        <div ref={topHalf} className="w-full h-1/2 bg-[#050505]" />
        <div ref={bottomHalf} className="w-full h-1/2 bg-[#050505]" />
      </div>
      
      {/* Center Eyelid Line */}
      <div ref={line} className="absolute top-1/2 left-0 w-full h-[1px] bg-white scale-x-0 origin-center z-40" />
      
    </div>
  );
}
