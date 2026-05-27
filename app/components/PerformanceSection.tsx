"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import TransitionLink from "./TransitionLinkPixel";

gsap.registerPlugin(ScrollTrigger);

export default function PerformanceSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    
    // For Mouse Glow Effect on Cards
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        const card = cardsRef.current[index];
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    };

    useGSAP(
        () => {
            // Title Animation
            gsap.from(titleRef.current, {
                y: 100,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            });

            // Text Animation
            gsap.from(textRef.current, {
                y: 50,
                opacity: 0,
                duration: 1.2,
                delay: 0.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            });

            // Cards Staggered Animation
            gsap.from(cardsRef.current, {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                }
            });

            // Number Counter Animations
            const statNumbers = gsap.utils.toArray('.stat-number') as HTMLElement[];
            statNumbers.forEach((el) => {
                const endValue = parseInt(el.getAttribute("data-value") || "0");
                
                // Initialize to 0 immediately
                el.innerHTML = "0";

                gsap.to(el, {
                    innerHTML: endValue,
                    duration: 2.5,
                    ease: "power3.out",
                    snap: { innerHTML: 1 },
                    scrollTrigger: {
                        trigger: el, // Trigger when the actual number element scrolls into view
                        start: "top 85%", // Start when the top of the number hits 85% down the viewport
                    }
                });
            });
        },
        { scope: containerRef }
    );

    return (
        <section ref={containerRef} className="relative">
            {/* Header Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end mb-24">
                <div className="space-y-6">
                    <div className="overflow-hidden">
                        <h2 ref={titleRef} className="text-5xl md:text-7xl font-oswald font-bold uppercase tracking-tighter text-white leading-tight">
                            Passionate About<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
                                Performance.
                            </span>
                        </h2>
                    </div>
                    <p ref={textRef} className="text-gray-400 text-lg max-w-lg leading-relaxed">
                        I specialize in building high-performance, scalable web environments and mobile-first storefronts. Let's assemble something incredible together.
                    </p>
                </div>
                
                <div className="flex justify-start md:justify-end">
                    <TransitionLink
                        href="/about"
                        className="group relative inline-flex items-center gap-4 px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors"
                    >
                        <span>More About Me</span>
                        <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 11L11 1M11 1H3.5M11 1V8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </TransitionLink>
                </div>
            </div>

            {/* Stats Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Card 1: Client Projects */}
                <div 
                    ref={(el) => { cardsRef.current[0] = el; }}
                    onMouseMove={(e) => handleMouseMove(e, 0)}
                    className="group relative h-80 rounded-2xl bg-[#111] border border-white/10 overflow-hidden flex flex-col justify-between p-8"
                >
                    <div className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100" style={{
                        background: `radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(16, 185, 129, 0.15), transparent 40%)`
                    }} />

                    <div className="relative z-10 flex justify-between items-start">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                        </div>
                    </div>

                    <div className="relative z-10 mt-auto">
                        <div className="text-6xl font-oswald font-bold text-white mb-2 flex items-baseline">
                            <span className="stat-number" data-value="15">0</span>
                            <span className="text-emerald-400 ml-1">+</span>
                        </div>
                        <h3 className="text-xl font-bold tracking-wide text-white mb-2">Client Projects</h3>
                        <p className="text-gray-500 text-sm">Across healthcare, logistics & fintech</p>
                    </div>
                </div>

                {/* Card 2: Production Systems */}
                <div 
                    ref={(el) => { cardsRef.current[1] = el; }}
                    onMouseMove={(e) => handleMouseMove(e, 1)}
                    className="group relative h-80 rounded-2xl bg-[#111] border border-white/10 overflow-hidden flex flex-col justify-between p-8"
                >
                    <div className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100" style={{
                        background: `radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(56, 189, 248, 0.15), transparent 40%)`
                    }} />

                    <div className="relative z-10 flex justify-between items-start">
                        <div className="w-12 h-12 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                        </div>
                    </div>

                    <div className="relative z-10 mt-auto">
                        <div className="text-6xl font-oswald font-bold text-white mb-2 flex items-baseline">
                            <span className="stat-number" data-value="3">0</span>
                        </div>
                        <h3 className="text-xl font-bold tracking-wide text-white mb-2">Production Systems</h3>
                        <p className="text-gray-500 text-sm">Independently delivered end-to-end</p>
                    </div>
                </div>

                {/* Card 3: API Endpoints */}
                <div 
                    ref={(el) => { cardsRef.current[2] = el; }}
                    onMouseMove={(e) => handleMouseMove(e, 2)}
                    className="group relative h-80 rounded-2xl bg-[#111] border border-white/10 overflow-hidden flex flex-col justify-between p-8"
                >
                    <div className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100" style={{
                        background: `radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(168, 85, 247, 0.15), transparent 40%)`
                    }} />

                    <div className="relative z-10 flex justify-between items-start">
                         <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                        </div>
                    </div>

                    <div className="relative z-10 mt-auto">
                        <div className="text-6xl font-oswald font-bold text-white mb-2 flex items-baseline">
                            <span className="stat-number" data-value="72">0</span>
                            <span className="text-purple-400 ml-1">+</span>
                        </div>
                        <h3 className="text-xl font-bold tracking-wide text-white mb-2">API Endpoints</h3>
                        <p className="text-gray-500 text-sm">Across auth, payments, real-time & more</p>
                    </div>
                </div>

            </div>
        </section>
    );
}
