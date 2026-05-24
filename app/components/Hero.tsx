"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const stickySection = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const title1 = useRef<HTMLHeadingElement>(null);
  const title2 = useRef<HTMLHeadingElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  // Helper function to split text
  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="inline-block hero-char opacity-0 translate-y-full rotate-[15deg]">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  useGSAP(
    () => {
      // Background glow breathe
      gsap.to(glow.current, {
        opacity: 0.8,
        duration: 3,
        scale: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Character-level Entrance Animation (on load)
      gsap.to(title1.current?.querySelectorAll(".hero-char") || [], {
        y: 0,
        opacity: 1,
        rotate: 0,
        duration: 1.2,
        stagger: 0.05,
        ease: "power4.out",
        delay: 0.5,
      });

      // Subtitle Entrance Animation
      gsap.to(container.current?.querySelectorAll(".hero-subtitle") || [], {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
        delay: 1.2,
      });

      // Scroll Animation Timeline
      const t1 = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Push title 1 up and away
      t1.to(
        title1.current,
        {
          y: -100,
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: "power2.out",
        },
        "start"
      );

      // Reveal title 2 characters
      t1.to(title2.current?.querySelectorAll(".hero-char") || [], {
        y: 0,
        opacity: 1,
        rotate: 0,
        duration: 2,
        stagger: 0.1,
        ease: "power3.out",
      }, "start+=0.2");

      t1.to(
        content.current,
        {
          scale: 100,
          duration: 3,
          ease: "power2.inOut",
        },
        "<+1"
      );

      t1.to(
        stickySection.current,
        {
          opacity: 0,
          pointerEvents: "none",
          duration: 1,
          ease: "power1.in",
        },
        "-=1"
      );
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative h-[350vh] w-full">
      <div
        ref={stickySection}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-transparent"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_80%)] opacity-80 z-0" />

        {/* ATMOSPHERE LAYER 2: The Glow */}
        <div
          ref={glow}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-blue-500/10 rounded-full blur-[100px] opacity-40 mix-blend-screen will-change-transform z-0"
        />

        <div
          ref={content}
          className="relative flex flex-col items-center justify-center will-change-transform z-10"
        >
          <div className="overflow-hidden w-max">
            <h1
              ref={title1}
              className="z-10 text-[12vw] font-bold font-oswald leading-[0.8] tracking-tight uppercase text-white mix-blend-difference whitespace-nowrap"
            >
              {splitText("Frontend")}
            </h1>
          </div>
          <div className="overflow-hidden mt-6 text-center">
            <p className="text-gray-400 text-sm md:text-base tracking-widest uppercase opacity-0 translate-y-full" ref={(el) => {
              if (el && title1.current) {
                // Attach the paragraph to the same animation timeline as the characters if we want,
                // but for simplicity, we'll animate it in useGSAP directly below.
                el.classList.add("hero-subtitle")
              }
            }}>
              Specializing in React.js, Next.js, & High-Performance Web Apps
            </p>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden w-max text-center">
            <h1
              ref={title2}
              className="text-[12vw] leading-[0.8] font-oswald font-bold tracking-tight uppercase text-white/80 whitespace-nowrap"
            >
              {splitText("Developer")}
            </h1>
          </div>

        </div>
      </div>
    </section>
  );
}
