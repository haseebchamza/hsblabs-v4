"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import BrandTitle from "./BrandTitle";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const STATS = [
    { value: "UI/UX", label: "DISCIPLINE" },
    { value: "FIGMA", label: "MAIN TOOL" },
    { value: "DXB", label: "LOCATION" },
    { value: "OPEN", label: "STATUS" },
];

const PILLARS = [
    {
        index: "01",
        title: "PRODUCT DESIGN",
        body: "End-to-end UI/UX in Figma — research, flows, IA, and visual systems built to scale across teams.",
    },
    {
        index: "02",
        title: "DESIGN SYSTEMS",
        body: "Tokens, components, and contracts that close the gap between design intent and shipped UI.",
    },
    {
        index: "03",
        title: "AI FOR DESIGN",
        body: "Building AI workflows for design teams — prompts, evals, and design-to-code pipelines that compress the loop.",
    },
    {
        index: "04",
        title: "VIBE CODING",
        body: "Shipping production code with AI as a co-pilot. Cursor, Claude, v0 — taking ideas from frame to live in hours, not sprints.",
    },
];

const STACK = [
    "Figma", "Figma Tokens", "FigJam",
    "Adobe Suite", "Illustrator", "After Effects",
    "React", "Next.js", "TypeScript", "Tailwind",
    "GSAP", "Framer Motion",
    "Cursor", "Claude", "v0", "Figma Make",
    "Vercel", "Git",
];

export default function AboutSection() {
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>(".about-fade").forEach((el, i) => {
                gsap.from(el, {
                    y: 40,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                    delay: i * 0.05,
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                });
            });
        }, rootRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            id="about"
            ref={rootRef}
            className="section-shell w-full relative overflow-hidden"
        >
            <div className="relative max-w-[1600px] mx-auto px-6 md:px-12 pt-10 md:pt-16 pb-20 md:pb-28">

                {/* Top meta strip */}
                <div className="flex items-center justify-between mb-10 md:mb-14 about-fade">
                    <div className="flex items-center gap-3">
                        <span className="brut-tag brut-tag--red">&lt;about.dossier /&gt;</span>
                        <span className="brut-tag hidden md:inline">PROFILE_LOAD: 100%</span>
                    </div>
                    <span className="brut-tag">FILE_NO. HSB-001</span>
                </div>

                {/* HEADLINE */}
                <div className="about-fade">
                    <BrandTitle
                        kicker="<who.am.i />"
                        primary="DESIGN,"
                        accent="THEN SHIP."
                        size="mega"
                    />
                </div>

                {/* MAIN GRID — portrait + bio + stats */}
                <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">

                    {/* Portrait card */}
                    <div className="md:col-span-5 about-fade">
                        <div className="relative">
                            {/* corner ticks */}
                            <span aria-hidden className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-[var(--accent-red)] z-20" />
                            <span aria-hidden className="absolute -top-2 -right-2 w-4 h-4 border-t border-r border-[var(--accent-red)] z-20" />
                            <span aria-hidden className="absolute -bottom-2 -left-2 w-4 h-4 border-b border-l border-[var(--accent-red)] z-20" />
                            <span aria-hidden className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-[var(--accent-red)] z-20" />

                            <div className="relative aspect-[4/5] w-full overflow-hidden bg-black border border-white/10">

                                {/* Portrait — blur-in tech reveal */}
                                <motion.img
                                    src="/portrait.png"
                                    alt="Haseeb Hamza"
                                    initial={{ filter: "blur(24px) brightness(0.6)", scale: 1.06, opacity: 0.5 }}
                                    whileInView={{ filter: "blur(0px) brightness(1)", scale: 1, opacity: 1 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                                    className="absolute inset-0 w-full h-full object-cover will-change-[filter,transform]"
                                />

                                {/* Horizontal scan-line that sweeps once during reveal */}
                                <motion.div
                                    aria-hidden
                                    initial={{ y: "-100%", opacity: 0 }}
                                    whileInView={{ y: "100%", opacity: [0, 0.9, 0.9, 0] }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1], times: [0, 0.15, 0.85, 1] }}
                                    className="absolute left-0 right-0 h-[2px] bg-[var(--accent-red)] z-10 pointer-events-none"
                                    style={{ boxShadow: "0 0 18px rgba(255,51,51,0.85), 0 0 4px rgba(255,255,255,0.7)" }}
                                />

                                {/* Soft tech vignette — cool tone, very subtle, no red wash */}
                                <div
                                    aria-hidden
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background:
                                            "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 35%)",
                                    }}
                                />

                                {/* Pixel-grid overlay for the "tech" feel — extremely faint */}
                                <div
                                    aria-hidden
                                    className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-40"
                                    style={{
                                        backgroundImage:
                                            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                                        backgroundSize: "32px 32px",
                                    }}
                                />

                                {/* meta strip overlaid bottom */}
                                <div className="absolute bottom-0 left-0 right-0 px-3 py-2.5 bg-black/70 backdrop-blur-sm flex items-center justify-between font-mono text-[9px] md:text-[10px] uppercase tracking-[0.35em] text-white/70 border-t border-white/10 z-10">
                                    <span className="text-[var(--accent-red)]">SUBJECT_001</span>
                                    <span>HASEEB HAMZA</span>
                                    <span className="brut-blink text-[var(--accent-red)]">▮</span>
                                </div>
                            </div>

                            <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.4em] text-white/45">
                                <span>ROLE / DESIGNER × AI BUILDER</span>
                                <span className="text-[var(--accent-red)]">VERIFIED ✓</span>
                            </div>
                        </div>
                    </div>

                    {/* Right column — bio + stats */}
                    <div className="md:col-span-7 flex flex-col gap-8 md:gap-10">
                        <div className="about-fade flex flex-col gap-5">
                            <span className="brand-kicker">{"/* manifesto */"}</span>
                            <p className="text-xl md:text-3xl font-light leading-snug text-white">
                                I&apos;m <span className="text-[var(--accent-red)]">Haseeb Hamza</span> — a
                                UI/UX designer who ships, not just hands off.
                            </p>
                            <p className="text-base md:text-lg text-white/70 leading-relaxed font-light max-w-[640px]">
                                I live in Figma, build design systems that scale, and use AI
                                tooling — Cursor, Claude, v0 — to take what I design straight into production.
                                I don&apos;t believe in the handoff between design and code; with the right tools,
                                they&apos;re the same loop.
                            </p>
                            <p className="text-base md:text-lg text-white/55 leading-relaxed font-light max-w-[640px]">
                                Currently working on product, brand, and AI design tooling out of Dubai.
                                Always taking on collaborations where the design problem and the systems
                                problem are the same problem.
                            </p>
                        </div>

                        {/* Stats grid */}
                        <div className="about-fade grid grid-cols-2 md:grid-cols-4 border border-white/15 bg-[#0a0a0a]/70 backdrop-blur-sm">
                            {STATS.map((s) => (
                                <div
                                    key={s.label}
                                    className="relative px-3 py-4 md:px-4 md:py-5 border-r border-b md:border-b-0 last:border-r-0 border-white/10 transition-colors hover:bg-[var(--accent-red)]/10 min-w-0 overflow-hidden"
                                >
                                    <div
                                        className="brand-title text-white tracking-tight truncate"
                                        style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.75rem)" }}
                                    >
                                        {s.value}
                                    </div>
                                    <div className="mt-1 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.18em] text-white/55 truncate">
                                        {s.label}
                                    </div>
                                    <span
                                        aria-hidden
                                        className="absolute top-2 right-2 w-1 h-1 rounded-full bg-[var(--accent-red)] opacity-70"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* PILLARS */}
                <div className="mt-20 md:mt-28">
                    <div className="about-fade flex items-end justify-between mb-8 md:mb-12 border-b border-white/15 pb-3 gap-3 flex-wrap">
                        <BrandTitle
                            kicker="<discipline.matrix />"
                            primary="HOW I"
                            accent="ACTUALLY WORK."
                            size="large"
                            inline
                        />
                        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/45">
                            04 PILLARS
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {PILLARS.map((p) => (
                            <motion.div
                                key={p.index}
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                className="about-fade group relative border border-white/15 bg-[#0a0a0a]/60 backdrop-blur-sm p-6 md:p-8 hover:border-[var(--accent-red)]/60 transition-colors"
                            >
                                <div className="flex items-baseline justify-between mb-4">
                                    <span className="font-mono text-[var(--accent-red)] text-xs tracking-[0.4em]">
                                        {p.index}
                                    </span>
                                    <span className="brut-blink text-[var(--accent-red)] text-[10px]">▸</span>
                                </div>
                                <h3
                                    className="brand-title text-white mb-3 leading-tight break-words"
                                    style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.5rem)" }}
                                >
                                    {p.title}
                                </h3>
                                <p className="text-sm md:text-base text-white/65 leading-relaxed font-light">
                                    {p.body}
                                </p>
                                {/* hover accent line */}
                                <span
                                    aria-hidden
                                    className="absolute left-0 bottom-0 h-[2px] w-0 bg-[var(--accent-red)] transition-all duration-500 group-hover:w-full"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* STACK marquee-style chips */}
                <div className="mt-20 md:mt-24 about-fade">
                    <div className="flex items-end justify-between mb-6 border-b border-white/10 pb-3">
                        <span className="brand-kicker">&lt;stack.imprint /&gt;</span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/45">
                            {STACK.length} TOOLS
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                        {STACK.map((tool) => (
                            <span
                                key={tool}
                                className="px-3 py-1.5 md:px-4 md:py-2 border border-white/15 bg-black/40 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/75 hover:border-[var(--accent-red)] hover:text-white hover:bg-[var(--accent-red)]/10 transition-all cursor-default"
                            >
                                {tool}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
