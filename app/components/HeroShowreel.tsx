"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroShowreel() {
  const container = useRef<HTMLDivElement>(null);
  const textContainer = useRef<HTMLDivElement>(null);
  const showreelBg = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Intro animation
      gsap.from(textContainer.current, {
        opacity: 0,
        scale: 0.8,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.5,
      });

      // Scroll timeline: dive into the showreel
      const t1 = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
        },
      });

      // Text scales up massively to create the "dive" effect
      t1.to(textContainer.current, {
        scale: 15,
        opacity: 0,
        ease: "power2.in",
        duration: 1,
      }, "start");

      // Showreel background comes into full focus/scale
      t1.to(showreelBg.current, {
        scale: 1.1,
        opacity: 1,
        filter: "brightness(1)",
        ease: "power2.inOut",
        duration: 1,
      }, "start");

    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative h-screen w-full overflow-hidden bg-[#0a0a0a]">
      {/* Showreel Background Image/Video */}
      <div 
        ref={showreelBg}
        className="absolute inset-0 w-full h-full opacity-40 scale-100 will-change-transform brightness-50"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Typography Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        <div ref={textContainer} className="flex flex-col items-center will-change-transform mix-blend-difference">
          <h1 className="text-[12vw] leading-[0.85] font-oswald font-bold tracking-tighter uppercase text-white whitespace-nowrap">
            Harsh Arora
          </h1>
          <h2 className="text-[3vw] md:text-[2vw] tracking-[0.3em] font-light uppercase text-gray-300 mt-4">
            Frontend Developer
          </h2>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest text-white/50 animate-pulse">
        Scroll to dive
      </div>
    </section>
  );
}
