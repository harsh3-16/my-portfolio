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

export default function TransitionLinkEyelid({
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

        tl.to(".transition-eyelid", {
            yPercent: 0,
            duration: 0.8,
            ease: "expo.inOut",
        });
    };

    return (
        <Link href={href} className={className} onClick={handleTransition}>
            {children}
        </Link>
    );
}
