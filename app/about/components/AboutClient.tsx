"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import PullToRefresh from "../../components/ui/PullToRefresh";
import {
  personalInfo,
  skillsData,
  experienceData,
  educationData,
  certificationData,
} from "../../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

export default function AboutClient() {
  const container = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number,
  ) => {
    const card = cardsRef.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

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
        delay: 0.2,
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
    { scope: container },
  );

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <main
        ref={container}
        className="min-h-screen w-full bg-transparent text-white pt-32 pb-24 px-6 md:px-12 lg:px-24 selection:bg-white selection:text-black"
      >
        {/* HERO SUMMARY */}
        <section ref={heroRef} className="max-w-5xl mb-32 z-10 relative">
          <p className="text-neutral-500 uppercase tracking-[0.3em] text-xs mb-8">
            The Story
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-oswald font-bold uppercase tracking-tighter leading-[0.9] mb-8 mix-blend-difference">
            {personalInfo.tagline}
          </h1>
          <p className="text-gray-400 text-lg md:text-2xl max-w-3xl leading-relaxed">
            {personalInfo.aboutHero}
          </p>
        </section>

        {/* ARSENAL / SKILLS GRID */}
        <section className="animate-section mb-32 pt-12 border-t border-white/10">
          <h2 className="text-xl md:text-2xl font-oswald uppercase tracking-widest mb-12 text-white/80">
            The Arsenal
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {skillsData.map((group, index) => {
              // Accent color glows based on mapping
              const glowColor =
                group.color === "emerald"
                  ? "rgba(16, 185, 129, 0.15)"
                  : group.color === "sky"
                  ? "rgba(56, 189, 248, 0.15)"
                  : "rgba(168, 85, 247, 0.15)";

              const borderGlow =
                group.color === "emerald"
                  ? "hover:border-emerald-500/20"
                  : group.color === "sky"
                  ? "hover:border-sky-500/20"
                  : "hover:border-purple-500/20";

              const pillAccent =
                group.color === "emerald"
                  ? "bg-emerald-400 shadow-[0_0_8px_#34d399]"
                  : group.color === "sky"
                  ? "bg-sky-400 shadow-[0_0_8px_#38bdf8]"
                  : "bg-purple-400 shadow-[0_0_8px_#c084fc]";

              const pillAccentBorder =
                group.color === "emerald"
                  ? "hover:border-emerald-500/30"
                  : group.color === "sky"
                  ? "hover:border-sky-500/30"
                  : "hover:border-purple-500/30";

              const badgeTheme =
                group.color === "emerald"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : group.color === "sky"
                  ? "bg-sky-500/10 text-sky-400 border-sky-500/20"
                  : "bg-purple-500/10 text-purple-400 border-purple-500/20";

              const colSpan =
                index === 2
                  ? "md:col-span-2 xl:col-span-1"
                  : "";

              return (
                <div
                  key={group.title}
                  ref={(el) => {
                    if (el) cardsRef.current[index] = el;
                  }}
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  className={`group relative rounded-2xl bg-[#111] border border-white/10 overflow-hidden p-8 transition-all duration-300 ${borderGlow} ${colSpan}`}
                >
                  <div
                    className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(400px circle at var(--mouse-x, 0) var(--mouse-y, 0), ${glowColor}, transparent 40%)`,
                    }}
                  />

                  <div className="relative z-10">
                    <div className="flex flex-col gap-2 mb-6 items-start">
                      <h3 className="text-xl font-oswald uppercase tracking-wider text-white leading-tight">
                        {group.title}
                      </h3>
                      <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded font-semibold border ${badgeTheme}`}>
                        {group.badge}
                      </span>
                    </div>
                    <p className="text-neutral-500 text-xs mb-6 min-h-[32px]">
                      {group.description}
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {group.items.map((skill) => (
                        <div
                          key={skill}
                          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 ${pillAccentBorder} transition-all duration-300 cursor-default select-none`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${pillAccent}`} />
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* EXPERIENCE TIMELINE */}
        <section className="animate-section mb-32 pt-12 border-t border-white/10">
          <h2 className="text-xl md:text-2xl font-oswald uppercase tracking-widest mb-12 text-white/80">
            Experience
          </h2>

          <div className="space-y-20 border-l border-white/10 pl-6 md:pl-12">
            {experienceData.map((job, idx) => {
              const timelineBullet =
                job.accentColor === "emerald"
                  ? "bg-emerald-400 shadow-[0_0_10px_#34d399]"
                  : "border border-neutral-500 bg-black";

              const bulletArrow =
                job.accentColor === "emerald"
                  ? "text-emerald-400"
                  : "text-neutral-500";

              return (
                <div key={job.role + job.company} className="relative">
                  <div className={`absolute -left-[29px] md:-left-[53px] top-2 w-3 h-3 rounded-full ${timelineBullet} hidden md:block`} />
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                    <h3 className="text-2xl font-bold uppercase tracking-tight text-white mb-2 md:mb-0">
                      {job.role}
                    </h3>
                    <span className="text-sm uppercase tracking-widest text-neutral-500">
                      {job.period}
                    </span>
                  </div>
                  <h4 className="text-lg text-gray-400 mb-6 italic">
                    {job.company} • {job.location}
                  </h4>
                  <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
                    {job.bullets.map((bullet, bulletIdx) => (
                      <div key={bulletIdx} className="flex items-start gap-3 group">
                        <span className={`${bulletArrow} group-hover:translate-x-1 transition-transform duration-300 font-mono mt-0.5 select-none`}>
                          →
                        </span>
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* EDUCATION & CERTIFICATION */}
        <section className="animate-section pt-12 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Education Card */}
            <div
              ref={(el) => {
                if (el) cardsRef.current[3] = el;
              }}
              onMouseMove={(e) => handleMouseMove(e, 3)}
              className="group relative rounded-2xl bg-[#111] border border-white/10 overflow-hidden p-8 transition-all duration-300 hover:border-cyan-500/20"
            >
              <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(400px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(56, 189, 248, 0.15), transparent 40%)`,
                }}
              />

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm uppercase tracking-[0.2em] text-neutral-500 font-bold">
                      Education
                    </h3>
                    <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-semibold border border-cyan-500/20 font-mono">
                      B.TECH
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold font-oswald text-white mb-2 uppercase">
                    {educationData.degree}
                  </h4>
                  <p className="text-gray-400 text-sm mb-4">
                    {educationData.institution}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-xs text-neutral-500 font-mono">
                  <span>{educationData.period}</span>
                  <span className="text-cyan-400 font-bold">
                    Score: {educationData.score}
                  </span>
                </div>
              </div>
            </div>

            {/* Certification Card */}
            <div
              ref={(el) => {
                if (el) cardsRef.current[4] = el;
              }}
              onMouseMove={(e) => handleMouseMove(e, 4)}
              className="group relative rounded-2xl bg-[#111] border border-white/10 overflow-hidden p-8 transition-all duration-300 hover:border-purple-500/20"
            >
              <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(400px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(168, 85, 247, 0.15), transparent 40%)`,
                }}
              />

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm uppercase tracking-[0.2em] text-neutral-500 font-bold">
                      Certifications
                    </h3>
                    <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 font-semibold border border-purple-500/20 font-mono font-bold">
                      AWS COGNITIVE
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold font-oswald text-white mb-2 uppercase">
                    {certificationData.title}
                  </h4>
                  <p className="text-gray-400 text-sm mb-4">
                    {certificationData.issuer}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-xs text-neutral-500 font-mono">
                  <span>CREDENTIAL ID: {certificationData.credentialId}</span>
                  <span className="text-purple-400 font-bold">
                    ISSUED: {certificationData.period}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Background Glow */}
        <div className="fixed top-1/4 right-0 w-[50vw] h-[50vh] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none -z-10 mix-blend-screen" />
      </main>
    </PullToRefresh>
  );
}
