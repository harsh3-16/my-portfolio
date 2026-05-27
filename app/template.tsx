// "use client";

// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { useRef } from "react";

// export default function Template({ children }: { children: React.ReactNode }) {
//     const layerRef = useRef<HTMLDivElement>(null);
//     const logoRef = useRef<HTMLDivElement>(null);

//     useGSAP(() => {
//         // This runs EVERY time a new page mounts (because it's template.tsx)
//         // 3. Animate the Transition Layer OUT (revealing the new page)
//         const tl = gsap.timeline();

//         tl.set(layerRef.current, { scaleY: 1, transformOrigin: "top" })
//             .to(logoRef.current, {
//                 opacity: 0,
//                 y: -20,
//                 duration: 0.3,
//                 ease: "power2.in",
//             })
//             .to(
//                 layerRef.current,
//                 {
//                     scaleY: 0,
//                     duration: 0.8,
//                     ease: "power4.inOut",
//                 },
//                 "-=0.1"
//             );
//     });

//     return (
//         <>
//             <div
//                 ref={layerRef}
//                 className="page-transition-layer fixed top-0 left-0 w-full h-screen bg-[#111] z-[100] scale-y-0 origin-bottom pointer-events-none flex items-center justify-center"
//             >
//                 <div
//                     ref={logoRef}
//                     className="page-transition-logo opacity-0 translate-y-4 flex flex-col items-center"
//                 >
//                     <span className="text-4xl font-oswald font-bold uppercase tracking-tighter text-white">
//                         Harsh
//                     </span>
//                     <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest mt-2">
//                         Loading
//                     </span>
//                 </div>
//             </div>
//             {children}
//         </>
//     );
// }

import TemplatePixel from "./TemplatePixel";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <TemplatePixel>
            {children}
        </TemplatePixel>
    );
}