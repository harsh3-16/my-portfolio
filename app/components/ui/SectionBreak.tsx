"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function SectionBreak() {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineLeftRef = useRef<HTMLDivElement>(null);
    const lineRightRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Set initial hidden state
        gsap.set([lineLeftRef.current, lineRightRef.current], { scaleX: 0 });
        gsap.set(iconRef.current, { scale: 0, rotation: -180, opacity: 0 });

        const playAnimation = () => {
            const tl = gsap.timeline();
            tl.to([lineLeftRef.current, lineRightRef.current], {
                scaleX: 1,
                duration: 1.5,
                ease: "power4.out",
            }).to(
                iconRef.current,
                {
                    scale: 1,
                    rotation: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "back.out(1.7)",
                },
                "-=1.2",
            );
        };

        const reverseAnimation = () => {
            gsap.to([lineLeftRef.current, lineRightRef.current], {
                scaleX: 0,
                duration: 0.6,
                ease: "power2.in",
            });
            gsap.to(iconRef.current, {
                scale: 0,
                rotation: -180,
                opacity: 0,
                duration: 0.4,
                ease: "power2.in",
            });
        };

        // IntersectionObserver: fires when 50% of the element is visible
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        playAnimation();
                    } else {
                        reverseAnimation();
                    }
                });
            },
            { threshold: 0.5 }, // 50% of the element must be in view
        );

        observer.observe(container);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-full py-12 md:py-20 flex items-center justify-center opacity-80 overflow-hidden"
        >
            <div className="w-full max-w-7xl px-8 flex items-center gap-6">
                {/* Left Line */}
                <div
                    ref={lineLeftRef}
                    className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-white/30 origin-right"
                />

                {/* Center Icon (Four-pointed star) */}
                <div ref={iconRef} className="flex-shrink-0 text-white/40">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                            fill="currentColor"
                        />
                    </svg>
                </div>

                {/* Right Line */}
                <div
                    ref={lineRightRef}
                    className="h-px flex-1 bg-gradient-to-l from-transparent via-white/10 to-white/30 origin-left"
                />
            </div>
        </div>
    );
}
