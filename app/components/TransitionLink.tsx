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

export default function TransitionLink({
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

        // If we are already on the target path, do nothing
        if (pathname === href) return;

        if (onNavigate) {
            onNavigate();
        }

        // 1. Animate the Transition Layer IN (covering the screen)
        const tl = gsap.timeline({
            onComplete: () => {
                // 2. Once covered, push the new route
                router.push(href);
            },
        });

        tl.set(".page-transition-layer", { transformOrigin: "bottom" })
            .to(".page-transition-layer", {
                scaleY: 1,
                duration: 0.8,
                ease: "power4.inOut",
            })
            .to(
                ".page-transition-logo",
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: "power2.out",
                },
                "-=0.4"
            );
    };

    return (
        <Link href={href} className={className} onClick={handleTransition}>
            {children}
        </Link>
    );
}
