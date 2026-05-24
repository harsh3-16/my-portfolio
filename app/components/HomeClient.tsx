"use client";

import Hero from "./Hero";
import ProjectItem from "./ProjectItem";
import PullToRefresh from "./ui/PullToRefresh";
import TransitionLink from "./TransitionLink";

export default function HomeClient() {
    const handleRefresh = async () => {
        // Simulate a network request or data refetch
        await new Promise((resolve) => setTimeout(resolve, 1500));
        window.location.reload();
    };

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
                        <ProjectItem
                            title="Shopify Storefront"
                            category="E-Commerce / Performance"
                            src="https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=1200"
                        />
                        <ProjectItem
                            title="Analytics Dashboard"
                            category="Data Visualization / Admin"
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200"
                        />
                        <ProjectItem
                            title="Production Mobile App"
                            category="React Native / Node.js"
                            src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200"
                        />
                    </div>

                    <div className="flex justify-between items-center mt-12 py-8 border-b border-white/10">
                        <TransitionLink
                            href="/work"
                            className="text-xs uppercase tracking-widest text-white hover:text-neutral-400 transition-colors"
                        >
                            View All Projects ↗
                        </TransitionLink>
                    </div>

                    {/* ABOUT TEASER SECTION */}
                    <div className="mt-40 mb-20 md:mb-40 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-4xl md:text-6xl font-oswald font-bold uppercase tracking-tighter text-white">
                                Passionate About Performance.
                            </h2>
                            <p className="text-gray-400 text-lg max-w-lg leading-relaxed">
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
                </section>
            </main>
        </PullToRefresh>
    );
}

