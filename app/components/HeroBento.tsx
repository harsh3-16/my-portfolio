"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function HeroBento() {
  const container = useRef<HTMLDivElement>(null);
  const gridItems = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      // Stagger in the grid items
      gsap.from(gridItems.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.5,
      });

      // Simple hover effects on the items
      gridItems.current.forEach((item) => {
        if (!item) return;
        
        item.addEventListener("mouseenter", () => {
          gsap.to(item, { backgroundColor: "rgba(255,255,255,0.03)", duration: 0.3 });
        });
        item.addEventListener("mouseleave", () => {
          gsap.to(item, { backgroundColor: "transparent", duration: 0.3 });
        });
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative min-h-screen w-full flex items-center justify-center pt-32 pb-20 px-4 md:px-12 bg-[#0a0a0a]">
      
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-[80vh]">
        
        {/* Main Title Box */}
        <div 
          ref={(el) => { gridItems.current[0] = el; }}
          className="col-span-1 md:col-span-2 row-span-1 border border-white/10 rounded-2xl p-8 md:p-12 flex flex-col justify-end relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full" />
          <h2 className="text-sm tracking-[0.2em] uppercase text-gray-500 mb-4">Harsh Arora</h2>
          <h1 className="text-6xl md:text-8xl font-oswald font-bold uppercase tracking-tighter text-white leading-none">
            Frontend<br />Developer
          </h1>
        </div>

        {/* Info Box */}
        <div 
          ref={(el) => { gridItems.current[1] = el; }}
          className="col-span-1 row-span-1 border border-white/10 rounded-2xl p-8 flex flex-col justify-between"
        >
          <div className="flex justify-between items-center text-gray-500 mb-8">
            <span className="text-xs uppercase tracking-widest">Availability</span>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
          <p className="text-gray-300 text-lg leading-relaxed font-light">
            Specializing in high-performance web architecture, fluid animations, and premium digital experiences.
          </p>
        </div>

        {/* Visual Box (could hold a video loop or fluid bg component) */}
        <div 
          ref={(el) => { gridItems.current[2] = el; }}
          className="col-span-1 border border-white/10 rounded-2xl overflow-hidden relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-black z-0" />
          {/* Decorative code pattern */}
          <div className="absolute inset-0 p-6 text-[10px] text-white/20 font-mono opacity-50 group-hover:opacity-100 transition-opacity">
            {`const init = () => {\n  gsap.to(camera, {\n    z: 100,\n    duration: 2\n  });\n};`}
          </div>
          <div className="absolute bottom-6 left-6 text-xs uppercase tracking-widest text-white/50">Tech Stack</div>
        </div>

        {/* CTA Box */}
        <div 
          ref={(el) => { gridItems.current[3] = el; }}
          className="col-span-1 md:col-span-2 border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row justify-between items-center bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth'})}
        >
          <div>
            <h3 className="text-2xl font-bold font-oswald uppercase text-white mb-2">Explore Projects</h3>
            <p className="text-gray-400 text-sm">View selected case studies below.</p>
          </div>
          <div className="mt-4 md:mt-0 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center -rotate-45">
            <svg width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 11L11 1M11 1H3.5M11 1V8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}
