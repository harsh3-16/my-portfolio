"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  title: string;
  category: string;
  src: string;
}

export default function ProjectItem({ title, category, src }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const imageContainer = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const catRef = useRef<HTMLSpanElement>(null);
  const line = useRef<HTMLDivElement>(null);

  const splitText = (text: string) => {
    return text.split(' ').map((word, wordIndex) => (
      <span key={wordIndex} className="inline-flex whitespace-nowrap">
        {word.split('').map((char, charIndex) => (
          <span key={charIndex} className="inline-block project-char opacity-0 translate-y-full rotate-[10deg]">
            {char}
          </span>
        ))}
      </span>
    ));
  };

  useGSAP(
    () => {
      const t1 = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom-=100",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      });

      t1.fromTo(
        line.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 1, ease: "power3.out" }
      );

      // Animate character by character
      const chars = titleRef.current?.querySelectorAll(".project-char") || [];
      t1.to(
        chars,
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          stagger: 0.03,
          duration: 0.8,
          ease: "back.out(1.2)",
        },
        "<"
      );

      t1.from(
        catRef.current,
        {
          yPercent: 100,
          duration: 0.8,
          ease: "power4.out",
        },
        "<0.2"
      );

      t1.fromTo(
        imageContainer.current,
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power3.out" },
        "<+0.2"
      );

      // Deep Parallax: Image moves inside the container as user scrolls
      gsap.to(image.current, {
        y: "15%",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: container }
  );

  const handleMouseEnter = () => {
    gsap.to(image.current, {
      scale: 1.1,
      filter: "grayscale(0%)",
      duration: 1,
      ease: "power2.out",
    });

    gsap.to(titleRef.current, {
      x: 20,
      duration: 1,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(image.current, {
      scale: 1,
      filter: "grayscale(100%)",
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(titleRef.current, {
      x: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col md:flex-row items-center gap-10 py-20 cursor-pointer"
    >
      <div
        ref={line}
        className="absolute top-0 left-0 w-full h-[1px] bg-white/20"
      />

      <div className="w-full md:w-1/2 space-y-2 z-10 mix-blend-difference pb-8 md:pb-0">
        <div className="overflow-hidden">
          <h2
            ref={titleRef}
            className="text-4xl md:text-7xl font-bold font-oswald uppercase text-white leading-none flex flex-wrap gap-x-3 md:gap-x-4 gap-y-2 will-change-transform"
          >
            {splitText(title)}
          </h2>
        </div>
        <div className="overflow-hidden">
          <span
            ref={catRef}
            className="block text-lg md:text-xl font-light text-gray-400 uppercase tracking-wide will-change-transform mt-4"
          >
            {category}
          </span>
        </div>
      </div>

      <div className="w-full md:w-1/2 px-4 md:px-0">
        <div
          ref={imageContainer}
          className="relative aspect-video md:aspect-[4/3] overflow-hidden"
        >
          {/* Inner Image is larger than container to allow for parallax scrolling */}
          <div
            ref={image}
            className="absolute top-[-10%] left-0 w-full h-[120%] grayscale will-change-transform"
          >
            <Image
              src={src}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
