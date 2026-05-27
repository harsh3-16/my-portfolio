"use client";

import Hero from "./HeroUltimate";
import ProjectItem from "./ProjectItem";
import PullToRefresh from "./ui/PullToRefresh";
import TransitionLink from "./TransitionLinkPixel";
import PerformanceSection from "./PerformanceSection";
import SectionBreak from "./ui/SectionBreak";
import { projectsData } from "../data/portfolioData";

export default function HomeClient() {
    const handleRefresh = async () => {
        // Simulate a network request or data refetch
        await new Promise((resolve) => setTimeout(resolve, 1500));
        window.location.reload();
    };

    // Use only featured or first 3 projects for the home highlights
    const homeFeaturedProjects = projectsData.filter(p => p.featured).slice(0, 3);

    return (
        <PullToRefresh onRefresh={handleRefresh}>
            <main className="min-h-screen w-full bg-transparent">
                <Hero />
                <section className="px-8 md:px-24 pb-24">
                    <div className="mb-20">
                        <h3 className="text-sm uppercase tracking-widest text-gray-500">
                            Selected Projects
                        </h3>
                    </div>

                    <div className="flex flex-col border-t border-white/10">
                        {homeFeaturedProjects.map((project) => (
                            <TransitionLink key={project.id} href="/work">
                                <ProjectItem
                                    title={project.title}
                                    category={project.category}
                                    src={project.src}
                                />
                            </TransitionLink>
                        ))}
                    </div>

                    <div className="flex justify-between items-center mt-12 py-8 border-b border-white/10">
                        <TransitionLink
                            href="/work"
                            className="text-xs uppercase tracking-widest text-white hover:text-neutral-400 transition-colors"
                        >
                            View All Projects ↗
                        </TransitionLink>
                    </div>

                    <SectionBreak />
                    <PerformanceSection />
                </section>
            </main>
        </PullToRefresh>
    );
}

