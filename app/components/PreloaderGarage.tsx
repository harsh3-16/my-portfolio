"use client";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function PreloaderGarage() {
  const [visible, setVisible] = useState(true);
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

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

    // Fade in text
    t1.from(textRef.current, { opacity: 0, y: 20, duration: 1, ease: "power3.out", delay: 0.2 });
    
    // Fade out text
    t1.to(textRef.current, { opacity: 0, duration: 0.5 }, "+=0.8");

    // Slide garage door UP
    t1.to(bgRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "expo.inOut",
    }, "-=0.2");

  }, { scope: container });

  if (!visible) return null;

  return (
    <div ref={container} className="fixed inset-0 z-[9999] flex items-center justify-center w-full h-full pointer-events-none">
      <div ref={bgRef} className="absolute inset-0 w-full h-full bg-[#0a0a0a]" />
      
      <div ref={textRef} className="relative z-10 flex flex-col items-center">
        <h1 className="text-white font-oswald font-bold uppercase tracking-tighter text-5xl md:text-7xl">
          Harsh Arora
        </h1>
        <p className="text-gray-400 tracking-[0.3em] text-xs md:text-sm mt-4 uppercase">
          Creative Developer
        </p>
      </div>
    </div>
  );
}
