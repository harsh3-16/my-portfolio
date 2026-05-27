"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { personalInfo } from "../../data/portfolioData";

export default function ContactClient() {
    const container = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !email.trim() || !message.trim()) {
            toast.error("Please fill in Name, Email, and Message.", {
                icon: "⚠️",
            });
            return;
        }

        setIsSubmitting(true);
        toast.loading("Sending your message...", { id: "contact-submit" });

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, subject, message }),
            });

            if (!response.ok) {
                throw new Error("Failed to send message.");
            }

            toast.success("Message sent successfully!", { id: "contact-submit" });
            
            // Clear form
            setName("");
            setEmail("");
            setSubject("");
            setMessage("");
        } catch (error) {
            console.error("Contact form error:", error);
            toast.error("Failed to send the message. Please try again later.", { id: "contact-submit" });
        } finally {
            setIsSubmitting(false);
        }
    };

    useGSAP(
        () => {
            const tl = gsap.timeline();

            // Hero Text Animation
            tl.fromTo(
                heroRef.current?.querySelectorAll("h1, p") || [],
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power4.out", delay: 0.2 }
            );

            // Info Panels Animation
            tl.fromTo(
                infoRef.current?.children || [],
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
                "-=0.5"
            );

            // Form Entrance Animation
            tl.fromTo(
                formRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power4.out" },
                "-=0.6"
            );
        },
        { scope: container }
    );

    return (
        <div ref={container} className="min-h-screen bg-transparent text-white pt-32 md:pt-48 pb-24 px-6 md:px-12 relative overflow-hidden">

            {/* Background Glows matching Ultimate Aesthetic */}
            <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-indigo-900/20 blur-[120px] rounded-full pointer-events-none -z-10 mix-blend-screen" />
            <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none -z-10 mix-blend-screen" />

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 relative z-10">

                {/* LEFT SIDE: Info */}
                <div className="w-full md:w-1/2 flex flex-col justify-between">
                    <section ref={heroRef} className="mb-16">
                        <p className="text-neutral-500 uppercase tracking-[0.3em] text-xs mb-8">
                            Get In Touch
                        </p>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-oswald font-bold uppercase tracking-tighter leading-[0.9] text-white">
                            Let's Build <br /> Together.
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl mt-8 max-w-md leading-relaxed">
                            Whether you have a specific project in mind, need a frontend expert, or just want to say hi, my inbox is always open.
                        </p>
                    </section>

                    <div ref={infoRef} className="space-y-8 md:space-y-16 mt-12 md:mt-0">
                        <div className="flex flex-col gap-3">
                            <span className="text-xs md:text-sm uppercase tracking-widest text-neutral-500 font-bold">Email</span>
                            <a href={`mailto:${personalInfo.email}`} className="text-xl md:text-3xl font-light hover:text-gray-300 transition-colors tracking-wide">
                                {personalInfo.email}
                            </a>
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="text-xs md:text-sm uppercase tracking-widest text-neutral-500 font-bold">Phone</span>
                            <a href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`} className="text-xl md:text-3xl font-light hover:text-gray-300 transition-colors tracking-wide">
                                {personalInfo.phone}
                            </a>
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="text-xs md:text-sm uppercase tracking-widest text-neutral-500 font-bold">Location</span>
                            <span className="text-xl md:text-3xl font-light tracking-wide">
                                {personalInfo.location}
                            </span>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE: Form */}
                <div ref={formRef} className="w-full md:w-1/2 mt-16 md:mt-0">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-white/5 p-8 md:p-12 rounded-[2.5rem] border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                        
                        {/* Decorative inner glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                        <div className="flex flex-col gap-2">
                            <label className="text-xs uppercase tracking-widest text-white/50 font-bold pl-2">Name *</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                className="w-full bg-black/20 rounded-2xl border border-white/5 p-5 text-lg tracking-wide focus:outline-none focus:border-white/30 focus:bg-white/5 transition-all text-white placeholder:text-neutral-700"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs uppercase tracking-widest text-white/50 font-bold pl-2">Email *</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="john@example.com"
                                className="w-full bg-black/20 rounded-2xl border border-white/5 p-5 text-lg tracking-wide focus:outline-none focus:border-white/30 focus:bg-white/5 transition-all text-white placeholder:text-neutral-700"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs uppercase tracking-widest text-white/50 font-bold pl-2">Subject</label>
                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Website Redesign"
                                className="w-full bg-black/20 rounded-2xl border border-white/5 p-5 text-lg tracking-wide focus:outline-none focus:border-white/30 focus:bg-white/5 transition-all text-white placeholder:text-neutral-700"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs uppercase tracking-widest text-white/50 font-bold pl-2">Message *</label>
                            <textarea
                                rows={4}
                                required
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Tell me about your project..."
                                className="w-full bg-black/20 rounded-2xl border border-white/5 p-5 text-lg tracking-wide focus:outline-none focus:border-white/30 focus:bg-white/5 transition-all text-white placeholder:text-neutral-700 resize-none leading-relaxed"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-6 group relative flex items-center justify-center w-full gap-4 px-8 py-5 bg-white text-black rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-gray-200 hover:scale-[1.02] transition-all overflow-hidden disabled:opacity-50 disabled:pointer-events-none"
                        >
                            <div className="relative overflow-hidden leading-none h-[1em]">
                                <span className="block transition-transform duration-300 group-hover:-translate-y-[150%]">
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </span>
                                <span className="absolute top-0 left-0 block translate-y-[150%] transition-transform duration-300 group-hover:translate-y-0">
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </span>
                            </div>
                            <div className="relative z-10 w-8 h-8 rounded-full bg-black flex items-center justify-center group-hover:rotate-45 group-hover:bg-indigo-600 transition-all duration-300 ml-2">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 11L11 1M11 1H3.5M11 1V8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}
