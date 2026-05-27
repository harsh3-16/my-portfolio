"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function HeroKinetic() {
  const container = useRef<HTMLDivElement>(null);
  const layer1 = useRef<HTMLHeadingElement>(null);
  const layer2 = useRef<HTMLHeadingElement>(null);
  const subtitle = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      // Intro animations
      const tl = gsap.timeline();
      
      tl.from([layer1.current, layer2.current], {
        y: 100,
        opacity: 0,
        rotateX: -45,
        duration: 1.5,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.5,
      });

      tl.from(subtitle.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power3.out",
      }, "-=1");

      // Parallax Mouse Movement
      const moveParallax = (e: MouseEvent) => {
        if (!container.current) return;
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        // Calculate offset based on center of screen (-1 to 1)
        const xPos = (clientX / innerWidth - 0.5) * 2;
        const yPos = (clientY / innerHeight - 0.5) * 2;

        gsap.to(layer1.current, {
          x: xPos * 40,
          y: yPos * 20,
          duration: 1,
          ease: "power2.out",
        });

        gsap.to(layer2.current, {
          x: xPos * -30,
          y: yPos * -15,
          duration: 1,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", moveParallax);
      
      return () => {
        window.removeEventListener("mousemove", moveParallax);
      };
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative h-[100vh] w-full flex items-center justify-center overflow-hidden bg-transparent perspective-[1000px]">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Kinetic Layers */}
        <div className="relative">
          {/* Layer 1: Solid Text */}
          <h1 
            ref={layer1}
            className="text-[12vw] leading-[0.8] font-oswald font-bold uppercase tracking-tighter text-white mix-blend-difference will-change-transform z-20 relative"
          >
            Frontend
          </h1>
          
          {/* Layer 2: Stroked Text (Offset behind) */}
          <h1 
            ref={layer2}
            className="absolute top-[30%] left-[5%] text-[10vw] leading-[0.8] font-oswald font-bold uppercase tracking-tighter text-transparent will-change-transform z-10"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
          >
            Developer
          </h1>
        </div>

        <p ref={subtitle} className="mt-12 text-sm md:text-base text-gray-400 tracking-[0.2em] uppercase font-light max-w-md text-center">
          Building highly interactive, premium web experiences with React & GSAP.
        </p>
      </div>

    </section>
  );
}
