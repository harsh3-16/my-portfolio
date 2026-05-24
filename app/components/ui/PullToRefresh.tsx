"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState, ReactNode } from "react";

interface PullToRefreshProps {
    onRefresh: () => Promise<void>;
    children: ReactNode;
}

export default function PullToRefresh({
    onRefresh,
    children,
}: PullToRefreshProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);

    const [startY, setStartY] = useState(0);
    const [isPulling, setIsPulling] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const maxPullParam = 100;

    const handleTouchStart = (e: React.TouchEvent) => {
        if (window.scrollY === 0 && !isRefreshing) {
            setStartY(e.touches[0].clientY);
            setIsPulling(true);
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isPulling || isRefreshing) return;

        const currentY = e.touches[0].clientY;
        const distance = currentY - startY;

        if (distance > 0 && window.scrollY === 0) {
            // Add resistance
            const pullDistance = Math.min(distance * 0.4, maxPullParam);

            gsap.to(contentRef.current, {
                y: pullDistance,
                duration: 0, // Instant
            });

            gsap.to(indicatorRef.current, {
                y: pullDistance,
                opacity: pullDistance / maxPullParam,
                rotate: distance,
                duration: 0,
            });

            if (e.cancelable) e.preventDefault();
        }
    };

    const handleTouchEnd = async () => {
        if (!isPulling) return;
        setIsPulling(false);

        const currentY = gsap.getProperty(contentRef.current, "y") as number;

        if (currentY >= 80) {
            setIsRefreshing(true);
            // Snap to refreshing position
            gsap.to(contentRef.current, { y: 60, duration: 0.3, ease: "back.out" });
            gsap.to(indicatorRef.current, {
                y: 60,
                rotate: "+=1080", // Spin fast
                duration: 2,
                repeat: -1,
                ease: "linear",
            });

            await onRefresh();

            // Reset
            setIsRefreshing(false);
            gsap.killTweensOf(indicatorRef.current);
            gsap.to([contentRef.current, indicatorRef.current], {
                y: 0,
                opacity: 0,
                duration: 0.4,
                ease: "power2.out",
            });
        } else {
            // Not pulled enough, reset
            gsap.to([contentRef.current, indicatorRef.current], {
                y: 0,
                opacity: 0,
                duration: 0.3,
                ease: "power2.out",
            });
        }
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Refresh Indicator */}
            <div
                ref={indicatorRef}
                className="absolute top-[-40px] left-1/2 -translate-x-1/2 flex items-center justify-center opacity-0 z-50 pointer-events-none"
            >
                <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin shadow-[0_0_15px_rgba(255,255,255,0.3)] bg-[#0a0a0a]" />
            </div>

            <div ref={contentRef} className="w-full h-full will-change-transform">
                {children}
            </div>
        </div>
    );
}
