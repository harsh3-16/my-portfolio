"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Track if we're in the browser (portal needs document.body)
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  useGSAP(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
          delay: 0.05,
        },
      );
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.35,
        ease: "power2.inOut",
      });
      gsap.to(contentRef.current, {
        y: 20,
        opacity: 0,
        scale: 0.96,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-md opacity-0 pointer-events-none"
      onClick={onClose}
    >
      <div
        ref={contentRef}
        className="relative w-[92%] max-w-2xl max-h-[90vh] bg-[#111] border border-white/10 rounded-2xl shadow-2xl opacity-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button wrapper to keep it out of the scrolling content but properly positioned */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-50">
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-xl border border-white/20 text-white/80 hover:text-white hover:bg-black/90 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto max-h-[90vh] p-6 sm:p-8 pt-12 sm:pt-14 scrollbar-hide w-full rounded-2xl">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
