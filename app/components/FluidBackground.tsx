"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function FluidBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blob1 = useRef<HTMLDivElement>(null);
  const blob2 = useRef<HTMLDivElement>(null);
  const blob3 = useRef<HTMLDivElement>(null);
  const interactiveBlob = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Configuration for the floating animation
      const breatheAnim = (
        target: any,
        xRange: number,
        yRange: number,
        duration: number,
        delay: number
      ) => {
        gsap.to(target, {
          x: `random(-${xRange}, ${xRange})`,
          y: `random(-${yRange}, ${yRange})`,
          scale: `random(0.8, 1.5)`,
          duration: duration,
          repeat: -1,
          yoyo: true, // Go back and forth
          ease: "sine.inOut", // Smooth, wave-like movement
          delay: delay,
        });
      };

      // Animate each blob with slightly different parameters for organic feel
      breatheAnim(blob1.current, 300, 200, 15, 0);
      breatheAnim(blob2.current, 400, 300, 20, 0.5);
      breatheAnim(blob3.current, 200, 400, 18, 1);

      const onMouseMove = (e: MouseEvent) => {
        gsap.to(interactiveBlob.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 3,
          ease: "power3.out",
        });
      };

      window.addEventListener("mousemove", onMouseMove);
      return () => window.removeEventListener("mousemove", onMouseMove);
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
    >
      {/* Blob 1: Deep Purple/Blue */}
      <div
        ref={blob1}
        className="absolute top-0 left-0 w-[60vw] h-[60vw] bg-indigo-900/40 rounded-full mix-blend-screen opacity-60"
      />

      {/* Blob 2: The Highlight - Vivid Violet/Pink */}
      <div
        ref={blob2}
        className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-purple-800/40 rounded-full mix-blend-screen opacity-50"
      />

      {/* Blob 3: The Cold Contrast - Deep Teal */}
      <div
        ref={blob3}
        className="absolute top-[40%] left-[40%] w-[40vw] h-[40vw] bg-teal-900/30 rounded-full mix-blend-screen opacity-40"
      />

      {/* Interactive Blob: Follows mouse subtly */}
      <div
        ref={interactiveBlob}
        className="absolute top-0 left-0 w-[20vw] h-[20vw] bg-blue-500/10 rounded-full mix-blend-plus-lighter -translate-x-1/2 -translate-y-1/2"
      />

      {/* Optional: Dark overlay to ensure text remains readable */}
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}
