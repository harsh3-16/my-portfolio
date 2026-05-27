"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function HeroSpotlight() {
  const container = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      // Setup initial opacity
      gsap.set(textRef.current, { opacity: 0 });
      gsap.to(textRef.current, { opacity: 1, duration: 2, delay: 0.5, ease: "power2.inOut" });

      // Spotlight tracking
      const xTo = gsap.quickTo(spotlightRef.current, "x", { duration: 0.4, ease: "power3" });
      const yTo = gsap.quickTo(spotlightRef.current, "y", { duration: 0.4, ease: "power3" });

      // Start spotlight in center
      if (spotlightRef.current) {
        gsap.set(spotlightRef.current, { x: window.innerWidth / 2, y: window.innerHeight / 2 });
      }

      const moveSpotlight = (e: MouseEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };

      window.addEventListener("mousemove", moveSpotlight);
      
      return () => window.removeEventListener("mousemove", moveSpotlight);
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative h-screen w-full bg-[#050505] overflow-hidden cursor-none">
      
      {/* Background layer (dark) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-20">
        <h1 className="text-[12vw] leading-[0.8] font-oswald font-bold uppercase tracking-tighter text-white">
          Harsh Arora
        </h1>
        <p className="text-2xl mt-4 tracking-widest uppercase font-light text-white">Frontend Developer</p>
      </div>

      {/* Spotlight layer (Masked) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage: "radial-gradient(circle at center, black 0%, transparent 400px)",
          WebkitMaskImage: "radial-gradient(circle at center, black 0%, transparent 400px)",
          // We will update the mask position via the spotlight ref
        }}
      >
        {/* We use a div to track the mask position dynamically */}
        <div 
          ref={spotlightRef} 
          className="absolute top-0 left-0 w-[800px] h-[800px] -ml-[400px] -mt-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)",
            mixBlendMode: "screen",
          }}
        />
        
        {/* Bright content revealed by spotlight */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 ref={textRef} className="text-[12vw] leading-[0.8] font-oswald font-bold uppercase tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Harsh Arora
          </h1>
          <p className="text-2xl mt-4 tracking-widest uppercase font-bold text-white">Frontend Developer</p>
        </div>
      </div>

    </section>
  );
}
