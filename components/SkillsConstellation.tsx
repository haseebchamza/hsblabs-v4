"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

type Skill = {
    code: string;
    name: string;
    cluster: string;
    blurb: string;
    proficiency: number;
    role: "primary" | "secondary";
};

const SKILLS: Skill[] = [
    { code: "K01", name: "FIGMA", cluster: "DESIGN_CORE", blurb: "Vector tooling, auto-layout, variants, design tokens, prototyping.", proficiency: 98, role: "primary" },
    { code: "K02", name: "REACT", cluster: "FRONTEND", blurb: "Hooks, suspense, server components, app router patterns.", proficiency: 94, role: "primary" },
    { code: "K03", name: "NEXT.JS", cluster: "FRONTEND", blurb: "App router, RSC, edge runtime, image / font optimisation.", proficiency: 92, role: "primary" },
    { code: "K04", name: "GSAP", cluster: "MOTION", blurb: "ScrollTrigger choreography, scrubbed timelines, pin transitions.", proficiency: 90, role: "primary" },
    { code: "K05", name: "THREE.JS", cluster: "SPATIAL", blurb: "GLB pipelines, physical materials, R3F scene graphs.", proficiency: 84, role: "primary" },
    { code: "K06", name: "TAILWIND", cluster: "FRONTEND", blurb: "Token-driven utility CSS, design system extension.", proficiency: 96, role: "primary" },
    { code: "K07", name: "FRAMER", cluster: "MOTION", blurb: "Layout transitions, gesture choreography, exit anims.", proficiency: 88, role: "secondary" },
    { code: "K08", name: "TYPESCRIPT", cluster: "FRONTEND", blurb: "Strict-mode types, generics, type-safe DX.", proficiency: 90, role: "primary" },
    { code: "K09", name: "WEBGL / GLSL", cluster: "SPATIAL", blurb: "Shader fragments, post-processing, particle systems.", proficiency: 72, role: "secondary" },
    { code: "K10", name: "DESIGN SYS.", cluster: "DESIGN_CORE", blurb: "Component contracts, theming, multi-brand scaling.", proficiency: 92, role: "primary" },
    { code: "K11", name: "AI / FIGMA MAKE", cluster: "AI_OPS", blurb: "Prompt-to-frame iteration, AI-accelerated production.", proficiency: 86, role: "secondary" },
    { code: "K12", name: "BRAND DESIGN", cluster: "DESIGN_CORE", blurb: "Identity systems, type pairings, narrative direction.", proficiency: 89, role: "secondary" },
];

const CLUSTERS = [
    { id: "DESIGN_CORE", label: "DESIGN CORE" },
    { id: "FRONTEND", label: "FRONTEND ENGINEERING" },
    { id: "MOTION", label: "MOTION & INTERACTION" },
    { id: "SPATIAL", label: "SPATIAL / 3D" },
    { id: "AI_OPS", label: "AI OPS" },
];

// Card width in px + gap — used to calculate total track width
const CARD_W = 360;
const CARD_GAP = 32;

export default function SkillsConstellation() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Total horizontal distance the track needs to travel
    // SKILLS cards + closing plate
    const totalCards = SKILLS.length + 1;
    const trackWidth = totalCards * (CARD_W + CARD_GAP) + 300; // 300 = leading offset
    const scrollDistance = trackWidth - (typeof window !== "undefined" ? window.innerWidth : 1440);

    const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

    return (
        /* Tall scroll container: 1 extra viewport per ~3 cards */
        <div
            ref={containerRef}
            className="relative bg-[#050505]"
            style={{ height: `${Math.ceil(SKILLS.length / 3) * 100 + 100}vh` }}
        >
            {/* Sticky viewport */}
            <div className="sticky top-0 h-screen overflow-hidden bg-[#050505] brut-noise">

                {/* Background grid */}
                <div
                    className="absolute inset-0 opacity-[0.06] pointer-events-none"
                    style={{
                        backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                        backgroundSize: "80px 80px",
                    }}
                />
                <div className="absolute inset-0 brut-scanlines pointer-events-none" />

                {/* HUD top-left */}
                <div className="absolute top-8 left-8 md:top-12 md:left-12 z-20 flex flex-col gap-2 pointer-events-none">
                    <div className="brut-tag brut-tag--red">&lt;skills.constellation /&gt;</div>
                    <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85]">
                        OPERATING<br />
                        <span className="brut-outline-red">SYSTEM</span>
                    </h2>
                    <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-white/50 mt-2 max-w-[280px]">
                        Twelve modules. One stack. Scroll →
                    </p>
                </div>

                {/* HUD bottom-left: cluster legend */}
                <div className="absolute bottom-12 left-8 md:bottom-14 md:left-12 z-20 hidden md:flex flex-col gap-1 pointer-events-none">
                    <span className="brut-tag">CLUSTERS // {CLUSTERS.length}</span>
                    {CLUSTERS.map((c, i) => (
                        <div key={c.id} className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/45">
                            <span className="text-[var(--accent-red)]">{String(i + 1).padStart(2, "0")}</span>
                            {c.label}
                        </div>
                    ))}
                </div>

                {/* HUD top-right: counter */}
                <div className="absolute top-8 right-8 md:top-12 md:right-12 z-20 text-right pointer-events-none flex flex-col gap-1">
                    <span className="brut-tag">CATALOGUE</span>
                    <span className="font-mono text-3xl md:text-5xl font-black tabular-nums text-white">
                        {String(SKILLS.length).padStart(2, "0")}
                    </span>
                    <span className="brut-tag brut-tag--red">UNITS_INDEXED</span>
                </div>

                {/* Horizontal scroll track */}
                <div className="absolute inset-0 flex items-center">
                    <motion.div
                        style={{ x }}
                        className="flex items-center gap-8 pl-[100vw] pr-[40vw] will-change-transform"
                    >
                        {SKILLS.map((skill, i) => (
                            <SkillCard key={skill.code} skill={skill} index={i} />
                        ))}

                        {/* Closing plate */}
                        <div
                            className="shrink-0 flex flex-col justify-between p-8 border border-[var(--accent-red)] bg-[var(--accent-red)] text-black brut-hardshadow-white"
                            style={{ width: CARD_W, height: "58vh" }}
                        >
                            <div className="font-mono text-[10px] uppercase tracking-[0.4em]">END_OF_CATALOGUE</div>
                            <div className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85]">
                                ALWAYS<br />SHIPPING<br />NEW UNITS.
                            </div>
                            <div className="font-mono text-[10px] uppercase tracking-[0.4em] flex justify-between">
                                <span>VER 04.26</span>
                                <span className="brut-blink">▮</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom marquee rail */}
                <div className="absolute bottom-0 left-0 right-0 h-8 md:h-9 bg-[#0a0a0a] border-t border-white/10 z-20 overflow-hidden">
                    <div className="brut-marquee-track brut-marquee-track--reverse h-full flex items-center text-[10px] font-mono uppercase tracking-[0.4em] text-white/40">
                        {Array.from({ length: 2 }).map((_, k) => (
                            <span key={k} className="flex items-center">
                                {SKILLS.concat(SKILLS).map((s, i) => (
                                    <span key={i} className="px-6 flex items-center gap-3">
                                        <span className="text-[var(--accent-red)]">{s.code}</span>
                                        {s.name}
                                        <span className="text-white/30">▮</span>
                                    </span>
                                ))}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
    return (
        <div
            className="shrink-0 flex flex-col justify-between p-6 md:p-7 border border-white/15 bg-[#0a0a0a] hover:border-[var(--accent-red)] transition-colors duration-500 group"
            style={{ width: CARD_W, height: "58vh" }}
        >
            {/* Corner ticks */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--accent-red)]" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--accent-red)]" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--accent-red)]" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--accent-red)]" />

            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                    <span className="brut-tag brut-tag--red">{skill.code}</span>
                    <span className="brut-tag">{skill.cluster}</span>
                </div>
                <span className={`font-mono text-[9px] uppercase tracking-[0.3em] px-2 py-1 border ${skill.role === "primary" ? "border-[var(--accent-red)] text-[var(--accent-red)]" : "border-white/30 text-white/60"}`}>
                    {skill.role}
                </span>
            </div>

            {/* Big name */}
            <div className="flex flex-col gap-3">
                <h3 className="text-5xl font-black uppercase tracking-tighter leading-[0.85] text-white">
                    {skill.name.split(" ").map((w, i) => (
                        <span key={i} className="block">{w}</span>
                    ))}
                </h3>
                <p className="font-mono text-[10px] md:text-xs text-white/50 leading-relaxed max-w-[260px]">
                    {skill.blurb}
                </p>
            </div>

            {/* Proficiency meter */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.3em] text-white/55">
                    <span>PROFICIENCY</span>
                    <span className="text-white">{skill.proficiency}%</span>
                </div>
                <div className="relative h-[3px] w-full bg-white/10">
                    <div
                        className="absolute top-0 left-0 h-full bg-[var(--accent-red)] group-hover:bg-white transition-colors"
                        style={{ width: `${skill.proficiency}%` }}
                    />
                </div>
                <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.3em] text-white/30 pt-1">
                    <span>UNIT_{String(index + 1).padStart(2, "0")}</span>
                    <span className="text-[var(--accent-red)]">●</span>
                </div>
            </div>
        </div>
    );
}
