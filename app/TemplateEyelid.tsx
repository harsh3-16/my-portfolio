"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function TemplateEyelid({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.set(".transition-eyelid", { yPercent: 0 })
          .to(".transition-eyelid-0", { yPercent: -100, duration: 0.8, ease: "expo.inOut" }, 0)
          .to(".transition-eyelid-1", { yPercent: 100, duration: 0.8, ease: "expo.inOut" }, 0);
    }, { scope: containerRef });

    return (
        <>
            <div
                ref={containerRef}
                className="fixed top-0 left-0 w-full h-screen z-[100] pointer-events-none flex flex-col"
            >
                <div className="transition-eyelid transition-eyelid-0 w-full h-1/2 bg-[#050505]" style={{ transform: "translateY(-100%)" }} />
                <div className="transition-eyelid transition-eyelid-1 w-full h-1/2 bg-[#050505]" style={{ transform: "translateY(100%)" }} />
            </div>
            {children}
        </>
    );
}
