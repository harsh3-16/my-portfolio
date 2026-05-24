"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import PullToRefresh from "../../components/ui/PullToRefresh";

gsap.registerPlugin(ScrollTrigger);

export default function AboutClient() {
    const container = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    const handleRefresh = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        window.location.reload();
    };

    useGSAP(
        () => {
            // General entrance animation for the page
            gsap.from(heroRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                delay: 0.2
            });

            // Iterate over all sections to fade them in on scroll
            const sections = gsap.utils.toArray(".animate-section") as HTMLElement[];
            sections.forEach((section) => {
                gsap.from(section, {
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom-=100",
                        toggleActions: "play none none reverse",
                    },
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out",
                });
            });
        },
        { scope: container }
    );

    return (
        <PullToRefresh onRefresh={handleRefresh}>
            <main ref={container} className="min-h-screen w-full bg-transparent text-white pt-32 pb-24 px-6 md:px-12 lg:px-24 selection:bg-white selection:text-black">

                {/* HERO SUMMARY */}
                <section ref={heroRef} className="max-w-5xl mb-32 z-10 relative">
                    <p className="text-neutral-500 uppercase tracking-[0.3em] text-xs mb-8">
                        The Story
                    </p>
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-oswald font-bold uppercase tracking-tighter leading-[0.9] mb-8 mix-blend-difference">
                        I assemble high-performance web applications.
                    </h1>
                    <p className="text-gray-400 text-lg md:text-2xl max-w-3xl leading-relaxed">
                        Frontend Developer with over 1 year of experience specializing in building responsive web applications and Shopify storefronts. I leverage modern architecture and AI-assisted workflows to create scalable, user-centric, and secure digital experiences.
                    </p>
                </section>

                {/* ARSENAL / SKILLS GRID */}
                <section className="animate-section mb-32 pt-12 border-t border-white/10">
                    <h2 className="text-xl md:text-2xl font-oswald uppercase tracking-widest mb-12 text-white/80">
                        The Arsenal
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-l border-white/10 pl-6 md:pl-12">
                        <div>
                            <h3 className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-6 font-bold pb-4 border-b border-white/10">Frontend Architecture</h3>
                            <ul className="space-y-3 font-light text-gray-300">
                                <li>React.js</li>
                                <li>Next.js</li>
                                <li>HTML5 & CSS3</li>
                                <li>Tailwind CSS</li>
                                <li>Material UI</li>
                                <li>Redux Toolkit</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-6 font-bold pb-4 border-b border-white/10">Backend & DevOps</h3>
                            <ul className="space-y-3 font-light text-gray-300">
                                <li>Node.js</li>
                                <li>Express.js</li>
                                <li>RESTful APIs</li>
                                <li>Git & GitHub</li>
                                <li>Postman</li>
                                <li>Vercel & AWS</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-6 font-bold pb-4 border-b border-white/10">Specialized Tools</h3>
                            <ul className="space-y-3 font-light text-gray-300">
                                <li>Shopify Liquid & OS 2.0</li>
                                <li>Cursor & Antigravity</li>
                                <li>MCP Servers</li>
                                <li>MongoDB</li>
                                <li>MySQL</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* EXPERIENCE TIMELINE */}
                <section className="animate-section mb-32 pt-12 border-t border-white/10">
                    <h2 className="text-xl md:text-2xl font-oswald uppercase tracking-widest mb-12 text-white/80">
                        Experience
                    </h2>

                    <div className="space-y-20 border-l border-white/10 pl-6 md:pl-12">
                        {/* Job 1 */}
                        <div className="relative">
                            <div className="absolute -left-[29px] md:-left-[53px] top-2 w-3 h-3 rounded-full bg-white hidden md:block" />
                            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                                <h3 className="text-2xl font-bold uppercase tracking-tight text-white mb-2 md:mb-0">Frontend Developer</h3>
                                <span className="text-sm uppercase tracking-widest text-neutral-500">Feb 2025 – Present</span>
                            </div>
                            <h4 className="text-lg text-gray-400 mb-6 italic">Cling InfoTech Works Pvt Ltd • Ghaziabad, India</h4>
                            <ul className="list-disc pl-5 space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
                                <li>Engineered responsive dashboards and business web solutions using React.js and Material UI, resulting in a 30% boost in development lifecycle efficiency.</li>
                                <li>Optimized application performance by implementing advanced state management with Redux Toolkit and Context API, reducing UI latency by 40%.</li>
                                <li>Architected mobile-first Shopify storefronts using Liquid and OS 2.0, enhancing user engagement and mobile usability by 25%.</li>
                                <li>Streamlined data integration processes by developing robust REST APIs and third-party service connections, ensuring 35% higher data reliability.</li>
                                <li>Leveraged AI-assisted workflows to accelerate the implementation of payment gateways and automated messaging services.</li>
                                <li>Spearheaded the design of modular, reusable components to ensure cross-project scalability and long-term maintainability.</li>
                            </ul>
                        </div>

                        {/* Job 2 */}
                        <div className="relative">
                            <div className="absolute -left-[29px] md:-left-[53px] top-2 w-3 h-3 rounded-full border border-white bg-transparent hidden md:block" />
                            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                                <h3 className="text-2xl font-bold uppercase tracking-tight text-white mb-2 md:mb-0">Project Coordinator</h3>
                                <span className="text-sm uppercase tracking-widest text-neutral-500">Aug 2024 – Jan 2025</span>
                            </div>
                            <h4 className="text-lg text-gray-400 mb-6 italic">Fluper Ltd • Noida, India</h4>
                            <ul className="list-disc pl-5 space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
                                <li>Orchestrated project timelines and cross-functional stakeholder communication, ensuring timely delivery of milestones through rigorous Agile methodologies.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* EDUCATION & CERTIFICATION */}
                <section className="animate-section pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between gap-12">
                    <div className="w-full md:w-1/2 border-l border-white/10 pl-6 md:pl-12">
                        <h2 className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-6 font-bold pb-4 border-b border-white/10">Education</h2>
                        <h3 className="text-lg font-bold text-white mb-2">B.Tech in Information Technology</h3>
                        <p className="text-gray-400 text-sm mb-1">Krishna Engineering College, Ghaziabad</p>
                        <p className="text-neutral-500 text-xs uppercase tracking-widest">2020 – 2024 • Score: 74%</p>
                    </div>

                    <div className="w-full md:w-1/2 border-l border-white/10 pl-6 md:pl-12">
                        <h2 className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-6 font-bold pb-4 border-b border-white/10">Certifications</h2>
                        <h3 className="text-lg font-bold text-white mb-2">AWS Cloud Computing Certification</h3>
                        <p className="text-gray-400 text-sm mb-1">Honeywell</p>
                        <p className="text-neutral-500 text-xs uppercase tracking-widest">Issued: 2024</p>
                    </div>
                </section>

                {/* Background Glow */}
                <div className="fixed top-1/4 right-0 w-[50vw] h-[50vh] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none -z-10 mix-blend-screen" />
            </main>
        </PullToRefresh>
    );
}
