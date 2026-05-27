"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function TemplatePixel({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Very dark orb colors (black with a hint of tint)
        const colors = ["#0a091a", "#150821", "#051a17", "#050505", "#080b14"];
        gsap.utils.toArray(".transition-pixel").forEach((el: any) => {
            el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        });

        const tl = gsap.timeline();
        tl.set(".transition-pixel", { scale: 1, opacity: 1 })
          .to(".transition-pixel", {
              scale: 0,
              opacity: 0,
              duration: 0.4,
              stagger: {
                  amount: 0.5,
                  from: "random",
              },
              ease: "power2.inOut",
          });
    }, { scope: containerRef });

    return (
        <>
            <div
                ref={containerRef}
                className="fixed top-0 left-0 w-full h-screen z-[100] pointer-events-none grid grid-cols-10 grid-rows-10"
            >
                {[...Array(100)].map((_, i) => (
                    <div key={i} className="transition-pixel w-full h-full scale-0 opacity-0 border-[1px] border-white/10" />
                ))}
            </div>
            {children}
        </>
    );
}
