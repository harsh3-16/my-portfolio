"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";

export default function Preloader() {
  const container = useRef<HTMLDivElement>(null);
  const textContainer = useRef<HTMLHeadingElement>(null);
  const followContainer = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useGSAP(
    () => {
      const t1 = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          setVisible(false);
        },
      });

      t1.to(".loader-text-line", {
        y: 100,
        opacity: 0,
        skewY: 10,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out",
      });

      t1.to({}, { duration: 0.5 });

      t1.to(".loader-text-line", {
        y: -100,
        opacity: 0,
        skewY: -10,
        duration: 1.5,
        stagger: 0.1,
        ease: "power3.in",
      });

      t1.to(container.current, {
        height: 0,
        duration: 1,
        ease: "expo.inOut",
      });

      t1.to(
        followContainer.current,
        {
          height: 0,
          duration: 1.2,
          ease: "expo.inOut",
        },
        "<0.1"
      );
    },
    { scope: container }
  );
  if (!visible) return null;

  return (
    <>
      {/* Secondary Layer (Dark Gray) for depth effect */}
      <div
        ref={followContainer}
        className="fixed inset-0 z-[9998] bg-[#2a2a2a] w-full h-full"
      />

      {/* Main Preloader Layer */}
      <div
        ref={container}
        className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center w-full h-full overflow-hidden"
      >
        <div ref={textContainer} className="text-center space-y-2 px-4">
          {/* Using overflow-hidden divs for the masking effect */}

          <div className="overflow-hidden">
            <h1 className="loader-text-line block text-white font-oswald text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-none">
              Portfolio
            </h1>
          </div>

          <div className="overflow-hidden">
            <div className="loader-text-line flex items-center justify-center gap-4">
              <span className="h-[1px] w-12 bg-white/50 inline-block" />
              <p className="text-gray-400 font-oswald text-lg md:text-xl tracking-[0.2em] uppercase">
                © 2024 Experience
              </p>
              <span className="h-[1px] w-12 bg-white/50 inline-block" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
