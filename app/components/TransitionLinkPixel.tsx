"use client";

import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import Link from "next/link";
import React, { ReactNode } from "react";

interface TransitionLinkProps {
    href: string;
    className?: string;
    children: ReactNode;
    onNavigate?: () => void;
}

export default function TransitionLinkPixel({
    href,
    className,
    children,
    onNavigate,
}: TransitionLinkProps) {
    const router = useRouter();
    const pathname = usePathname();

    const handleTransition = (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        e.preventDefault();
        if (pathname === href) return;
        if (onNavigate) onNavigate();

        const tl = gsap.timeline({
            onComplete: () => { router.push(href); },
        });

        // Use random stagger for pixels
        tl.to(".transition-pixel", {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            stagger: {
                amount: 0.5,
                from: "random",
            },
            ease: "power2.inOut",
        });
    };

    return (
        <Link href={href} className={className} onClick={handleTransition}>
            {children}
        </Link>
    );
}
