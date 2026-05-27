"use client";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function PreloaderEyelid() {
  const [visible, setVisible] = useState(true);
  const container = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const topHalf = useRef<HTMLDivElement>(null);
  const bottomHalf = useRef<HTMLDivElement>(null);

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

    // Draw the line
    t1.to(line.current, { scaleX: 1, duration: 1, ease: "power3.inOut", delay: 0.2 });
    
    // Open the eyelids
    t1.to(topHalf.current, { yPercent: -100, duration: 1, ease: "expo.inOut" }, "+=0.3");
    t1.to(bottomHalf.current, { yPercent: 100, duration: 1, ease: "expo.inOut" }, "<");
    t1.to(line.current, { opacity: 0, duration: 0.1 }, "<");
  }, { scope: container });

  if (!visible) return null;

  return (
    <div ref={container} className="fixed inset-0 z-[9999] flex flex-col w-full h-full pointer-events-none">
      <div ref={topHalf} className="w-full h-1/2 bg-[#0a0a0a]" />
      <div ref={bottomHalf} className="w-full h-1/2 bg-[#0a0a0a]" />
      <div ref={line} className="absolute top-1/2 left-0 w-full h-[1px] bg-white scale-x-0 origin-center" />
    </div>
  );
}
