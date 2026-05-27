"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroUltimate() {
  const container = useRef<HTMLDivElement>(null);
  const gridItems = useRef<(HTMLDivElement | null)[]>([]);
  const layer1 = useRef<HTMLHeadingElement>(null);
  const layer2 = useRef<HTMLHeadingElement>(null);
  const showreelBg = useRef<HTMLDivElement>(null);
  const imageContainer = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Grid Entrance Animation
      gsap.from(gridItems.current, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.2,
      });

      // 2. Kinetic Parallax for Text
      const moveParallax = (e: MouseEvent) => {
        if (!container.current) return;
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        // Calculate offset based on center of screen (-1 to 1)
        const xPos = (clientX / innerWidth - 0.5) * 2;
        const yPos = (clientY / innerHeight - 0.5) * 2;

        gsap.to(layer1.current, { x: xPos * 25, y: yPos * 15, duration: 1.5, ease: "power2.out" });
        gsap.to(layer2.current, { x: xPos * -20, y: yPos * -10, duration: 1.5, ease: "power2.out" });
        gsap.to(imageContainer.current, { x: xPos * 10, y: yPos * 10, duration: 2, ease: "power3.out" });
      };

      window.addEventListener("mousemove", moveParallax);

      // 3. Showreel Scroll Parallax
      gsap.to(showreelBg.current, {
        y: "20%",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      });
      
      return () => {
        window.removeEventListener("mousemove", moveParallax);
      };
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative min-h-screen w-full flex items-center justify-center pt-32 pb-20 px-4 md:px-12 bg-transparent overflow-hidden">
      
      {/* "Invisible" Grid Layout - No borders, just structure */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-8 h-[80vh]">
        
        {/* MAIN TITLE (Kinetic Parallax) - Takes up left side */}
        <div 
          ref={(el) => { gridItems.current[0] = el; }}
          className="col-span-1 md:col-span-8 row-span-1 flex flex-col justify-end relative mix-blend-difference pointer-events-none"
        >
          <h2 className="text-sm tracking-[0.3em] uppercase text-gray-400 mb-8 z-10 relative">Harsh Arora</h2>
          
          <div className="relative">
            {/* Layer 1: Solid Text */}
            <h1 
              ref={layer1}
              className="text-[12vw] md:text-[8vw] font-oswald font-bold uppercase tracking-tighter text-white leading-[0.85] z-20 relative"
            >
              Frontend<br />Developer
            </h1>
            
            {/* Layer 2: Stroked Text (Offset behind) */}
            <h1 
              ref={layer2}
              className="absolute top-[5%] left-[2%] text-[12vw] md:text-[8vw] font-oswald font-bold uppercase tracking-tighter text-transparent leading-[0.85] z-10 opacity-50"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}
            >
              Frontend<br />Developer
            </h1>
          </div>
        </div>

        {/* INFO TEXT - Floating top right */}
        <div 
          ref={(el) => { gridItems.current[1] = el; }}
          className="col-span-1 md:col-span-4 row-span-1 flex flex-col justify-end pb-4"
        >
          <div className="flex items-center gap-4 text-gray-400 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs uppercase tracking-widest font-bold text-white">Available for Work</span>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed font-light mix-blend-difference">
            Specializing in high-performance web architecture, fluid animations, and premium digital experiences.
          </p>
        </div>

        {/* SHOWREEL VISUAL - Floating abstract container */}
        <div 
          ref={(el) => { gridItems.current[2] = el; }}
          className="col-span-1 md:col-span-7 relative flex items-center"
        >
           <div 
            ref={imageContainer}
            className="relative w-full h-[300px] md:h-full overflow-hidden"
            style={{ 
              // A soft edge mask makes it feel organic and boundless rather than a hard box
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
              maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
            }}
           >
            <div 
              ref={showreelBg}
              className="absolute top-[-20%] left-0 w-full h-[140%] opacity-40 grayscale will-change-transform mix-blend-luminosity"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>
        </div>

        {/* CTA TEXT - Bottom right */}
        <div 
          ref={(el) => { gridItems.current[3] = el; }}
          className="group col-span-1 md:col-span-5 flex flex-col justify-center items-start md:pl-12 cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth'})}
        >
          <h3 className="text-2xl font-bold font-oswald uppercase text-white mb-2 mix-blend-difference">Explore Projects</h3>
          <div className="flex items-center gap-4 mt-4">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-500 ease-[0.22,1,0.36,1]">
              <svg width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 11L11 1M11 1H3.5M11 1V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-xs uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">Scroll Down</span>
          </div>
        </div>

      </div>
    </section>
  );
}
