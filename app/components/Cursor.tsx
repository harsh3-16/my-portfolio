"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cursor = cursorRef.current;
      if (!cursor) return;

      const xTo = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power3" });
      const yTo = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power3" });

      const moveShape = (e: MouseEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };

      window.addEventListener("mousemove", moveShape);

      return () => window.removeEventListener("mousemove", moveShape);
    },
    { scope: cursorRef }
  );

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-9999 mix-blend-difference
    -translate-x-1/2 -translate-y-0.5 "
    />
  );
}
