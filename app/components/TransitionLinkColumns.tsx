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

export default function TransitionLinkColumns({
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

        tl.set(".transition-column", { transformOrigin: "bottom" })
          .to(".transition-column", {
              scaleY: 1,
              duration: 0.5,
              stagger: 0.1,
              ease: "power3.inOut",
          });
    };

    return (
        <Link href={href} className={className} onClick={handleTransition}>
            {children}
        </Link>
    );
}
