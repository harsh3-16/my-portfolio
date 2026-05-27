"use client";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function PreloaderDive() {
  const [visible, setVisible] = useState(true);
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
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

    t1.from(textRef.current, { opacity: 0, duration: 1, ease: "power2.inOut", delay: 0.2 });
    
    t1.to(textRef.current, {
      scale: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power4.in",
    }, "+=0.5");

    t1.to(bgRef.current, {
      opacity: 0,
      duration: 0.5,
    }, "-=0.5");

  }, { scope: container });

  if (!visible) return null;

  return (
    <div ref={container} className="fixed inset-0 z-[9999] flex items-center justify-center w-full h-full pointer-events-none">
      <div ref={bgRef} className="absolute inset-0 bg-[#0a0a0a]" />
      <h1 
        ref={textRef} 
        className="relative z-10 text-white font-oswald font-bold uppercase tracking-tighter text-6xl md:text-8xl will-change-transform mix-blend-difference"
      >
        Harsh Arora
      </h1>
    </div>
  );
}
