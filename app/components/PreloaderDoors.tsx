"use client";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function PreloaderDoors() {
  const [visible, setVisible] = useState(true);
  const container = useRef<HTMLDivElement>(null);
  const leftDoor = useRef<HTMLDivElement>(null);
  const rightDoor = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

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

    // Animate counter 0 to 100
    const counter = { val: 0 };
    t1.to(counter, {
      val: 100,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.innerText = Math.round(counter.val) + "%";
        }
      }
    });

    // Fade out counter
    t1.to(counterRef.current, { opacity: 0, duration: 0.3 }, "+=0.2");

    // Open doors
    t1.to(leftDoor.current, { xPercent: -100, duration: 1.2, ease: "expo.inOut" }, "<");
    t1.to(rightDoor.current, { xPercent: 100, duration: 1.2, ease: "expo.inOut" }, "<");
  }, { scope: container });

  if (!visible) return null;

  return (
    <div ref={container} className="fixed inset-0 z-[9999] flex w-full h-full pointer-events-none">
      <div ref={leftDoor} className="w-1/2 h-full bg-[#0a0a0a]" />
      <div ref={rightDoor} className="w-1/2 h-full bg-[#0a0a0a]" />
      <div 
        ref={counterRef} 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-oswald text-4xl md:text-6xl tracking-widest font-bold"
      >
        0%
      </div>
    </div>
  );
}
