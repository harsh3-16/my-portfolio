"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import React, { useRef } from "react";
import WorkCard from "../components/WorkCard";
import MagneticButtons from "../components/MagneticButtons";
import TransitionLink from "../components/TransitionLink";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Lumina",
    category: "Web Design",
    year: "2024",
    src: "/img.jpg",
  },
  {
    id: 2,
    title: "Apex",
    category: "Development",
    year: "2023",
    src: "/img.jpg",
  },
  { id: 3, title: "Mono", category: "Branding", year: "2023", src: "/img.jpg" },
  {
    id: 4,
    title: "Vortex",
    category: "Product",
    year: "2024",
    src: "/img.jpg",
  },
  {
    id: 5,
    title: "Ether",
    category: "Experience",
    year: "2022",
    src: "/img.jpg",
  },
  {
    id: 6,
    title: "Nebula",
    category: "Interface",
    year: "2024",
    src: "/img.jpg",
  },
];

export default function WorkPage() {
  const container = useRef<HTMLDivElement>(null);
  const col1 = useRef<HTMLDivElement>(null);
  const col2 = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".work-header-char", {
        y: 100,
        opacity: 0,
        stagger: 0.05,
        duration: 1,
        ease: "power4.out",
      });

      gsap.to(col1.current, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      gsap.to(col2.current, {
        y: -250,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    },
    { scope: container }
  );

  return (
    <main
      ref={container}
      className="min-h-[200vh] w-full pt-32 pb-24 px-4 md:px-12"
    >
      {/* HEADER */}
      <header className="mb-32 flex flex-col items-center justify-center">
        <h1 className="text-[15vw] font-bold font-oswald uppercase leading-[0.8] tracking-tighter text-white/50 mix-blend-overlay">
          {"WORK".split("").map((char, i) => (
            <span key={i} className="work-header-char inline-block">
              {char}
            </span>
          ))}
        </h1>
        <p className="mt-8 text-neutral-400 uppercase tracking-[0.2em] text-sm animate-pulse">
          Selected Cases (2022 — 2024)
        </p>
      </header>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 w-full max-w-7xl mx-auto">
        {/* COLUMN 1 (Odd items) */}
        <div ref={col1} className="flex flex-col gap-12 md:gap-32">
          {projects
            .filter((_, i) => i % 2 === 0)
            .map((project) => (
              <WorkCard key={project.id} project={project} />
            ))}
        </div>

        {/* COLUMN 2 (Even items - Offset visually) */}
        <div ref={col2} className="flex flex-col gap-12 md:gap-32 md:pt-48">
          {projects
            .filter((_, i) => i % 2 !== 0)
            .map((project) => (
              <WorkCard key={project.id} project={project} />
            ))}
        </div>
      </div>

      {/* FOOTER LINK */}
      <div className="mt-48 flex justify-center">
        <MagneticButtons>
          <TransitionLink
            href="/"
            className="group relative px-8 py-4 border border-white/20 rounded-full hover:bg-white/5 transition-colors duration-300 block"
          >
            <span className="text-sm uppercase tracking-widest text-white/80">
              Back Home
            </span>
          </TransitionLink>
        </MagneticButtons>
      </div>
    </main>
  );
}
