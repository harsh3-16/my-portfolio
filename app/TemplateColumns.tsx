"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function TemplateColumns({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.set(".transition-column", { scaleY: 1, transformOrigin: "top" })
          .to(".transition-column", {
              scaleY: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: "power3.inOut",
          });
    }, { scope: containerRef });

    return (
        <>
            <div
                ref={containerRef}
                className="fixed top-0 left-0 w-full h-screen z-[100] pointer-events-none flex"
            >
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="transition-column w-1/5 h-full bg-[#111] scale-y-0" />
                ))}
            </div>
            {children}
        </>
    );
}
