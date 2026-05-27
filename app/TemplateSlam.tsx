"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function TemplateSlam({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();
        // Since they start at xPercent: 0 from the TransitionLink, we push them out further.
        tl.set(".transition-slam", { xPercent: 0 })
          .to(".transition-slam-0", { xPercent: 100, duration: 0.6, ease: "power4.inOut" }, 0)
          .to(".transition-slam-1", { xPercent: -100, duration: 0.6, ease: "power4.inOut" }, 0)
          .to(".transition-slam-2", { xPercent: 100, duration: 0.6, ease: "power4.inOut" }, 0);
    }, { scope: containerRef });

    return (
        <>
            <div
                ref={containerRef}
                className="fixed top-0 left-0 w-full h-screen z-[100] pointer-events-none flex flex-col overflow-hidden"
            >
                <div className="transition-slam transition-slam-0 w-full h-1/3 bg-[#111]" style={{ transform: "translateX(-100%)" }} />
                <div className="transition-slam transition-slam-1 w-full h-1/3 bg-[#111]" style={{ transform: "translateX(100%)" }} />
                <div className="transition-slam transition-slam-2 w-full h-1/3 bg-[#111]" style={{ transform: "translateX(-100%)" }} />
            </div>
            {children}
        </>
    );
}
