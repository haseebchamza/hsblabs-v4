"use client";
import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
import BrandTitle from "./BrandTitle";

type Service = {
    code: string;
    title: string;
    accent: string;        // word that becomes the red outline accent
    summary: string;
    deliverables: string[];
    stack: string[];
};

const SERVICES: Service[] = [
    {
        code: "S01",
        title: "PRODUCT",
        accent: "DESIGN",
        summary:
            "End-to-end design of digital products — research, IA, interaction, and visual systems built to scale across teams and surfaces.",
        deliverables: [
            "Discovery & user research",
            "Information architecture",
            "Interaction & flow design",
            "High-fidelity UI",
            "Design QA & dev handoff",
        ],
        stack: ["Figma", "FigJam", "Hotjar", "Notion"],
    },
    {
        code: "S02",
        title: "FRONTEND",
        accent: "ENGINEERING",
        summary:
            "Production-grade React/Next.js builds. Pixel-faithful, type-safe, performant, and animated with intent — design and code under one roof.",
        deliverables: [
            "Next.js / React app build",
            "Design-system implementation",
            "Performance / Core Web Vitals",
            "CMS & data integration",
            "Animation choreography",
        ],
        stack: ["React", "Next.js", "TypeScript", "Tailwind", "GSAP"],
    },
    {
        code: "S03",
        title: "BRAND",
        accent: "IDENTITY",
        summary:
            "Identity systems built for the screen — type, motion, voice, and component grammar that flex across product, marketing, and social.",
        deliverables: [
            "Logo & wordmark systems",
            "Type & color tokens",
            "Motion brand guidelines",
            "Marketing site templates",
            "Social asset kits",
        ],
        stack: ["Illustrator", "Figma", "After Effects"],
    },
    {
        code: "S04",
        title: "SPATIAL",
        accent: "INTERFACES",
        summary:
            "Web-native 3D, scrollytelling, and cinematic landing experiences — orchestrating Three.js, GSAP, and shaders to make products feel alive.",
        deliverables: [
            "Hero / scrollytelling builds",
            "Interactive 3D viewers",
            "Shader & particle systems",
            "WebGL performance tuning",
        ],
        stack: ["Three.js", "R3F", "GLSL", "GSAP"],
    },
    {
        code: "S05",
        title: "DESIGN",
        accent: "SYSTEMS",
        summary:
            "Single source of truth across Figma and code. Tokens, components, and contracts that close the gap between design intent and shipped UI.",
        deliverables: [
            "Token architecture",
            "Component contracts",
            "Multi-brand theming",
            "Storybook + docs",
            "Adoption playbooks",
        ],
        stack: ["Figma Tokens", "Storybook", "TS", "Tailwind"],
    },
];

export default function ServicesSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const [activeIndex, setActiveIndex] = useState(0);
    useEffect(() => {
        return scrollYProgress.on("change", (v) => {
            const idx = Math.min(
                SERVICES.length - 1,
                Math.floor(v * SERVICES.length)
            );
            setActiveIndex(idx);
        });
    }, [scrollYProgress]);

    const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

    const service = SERVICES[activeIndex];
    const maxDeliverables = Math.max(...SERVICES.map((s) => s.deliverables.length));
    const paddedDeliverables: string[] = [
        ...service.deliverables,
        ...Array(maxDeliverables - service.deliverables.length).fill(""),
    ];

    return (
        /* Tall scroll container — each service = 100vh of scroll room */
        <div
            ref={containerRef}
            className="relative"
            style={{ height: `${SERVICES.length * 100}vh` }}
        >
            {/* Sticky cinematic viewport */}
            <div className="sticky top-0 h-screen overflow-hidden section-shell">

                {/* ── BACKDROP: massive outlined service number ────────── */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`bg-${activeIndex}`}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                    >
                        <span
                            className="brand-title leading-[0.8] text-white/[0.04]"
                            style={{
                                fontSize: "clamp(20rem, 80vh, 60rem)",
                                WebkitTextStroke: "2px rgba(255,255,255,0.06)",
                                color: "transparent",
                            }}
                        >
                            {String(activeIndex + 1).padStart(2, "0")}
                        </span>
                    </motion.div>
                </AnimatePresence>

                {/* ── TOP HUD ───────────────────────────────────────────── */}
                <div className="absolute top-0 left-0 right-0 h-10 md:h-12 border-b border-white/10 bg-black/60 backdrop-blur-md z-30 flex items-center justify-between px-6 md:px-12">
                    <div className="brand-kicker" style={{ color: "var(--accent-red)" }}>
                        &lt;services.offer /&gt;
                    </div>
                    <div className="hidden md:flex items-center gap-4 brand-kicker text-white/55">
                        <span>RATE: AVAILABLE</span>
                        <span className="text-[var(--accent-red)]">●</span>
                        <span>BOOKING_Q3_2026</span>
                    </div>
                    <div className="brand-kicker tabular-nums text-white/55">
                        <span className="text-white">
                            {String(activeIndex + 1).padStart(2, "0")}
                        </span>
                        <span className="text-white/40">
                            {" "}/ {String(SERVICES.length).padStart(2, "0")}
                        </span>
                    </div>
                </div>

                {/* ── LEFT-EDGE BRAND LABEL ─────────────────────────────── */}
                <div className="absolute top-16 md:top-20 left-6 md:left-12 z-20 pointer-events-none">
                    <BrandTitle
                        kicker="WHAT I BUILD FOR YOU"
                        primary="SERVICES"
                        accent="OFFER"
                        size="mid"
                    />
                </div>

                {/* ── MAIN CINEMATIC STAGE ──────────────────────────────── */}
                <div className="absolute inset-0 flex items-center justify-center px-6 md:px-12 pt-44 md:pt-48 pb-24">
                    <div className="relative w-full max-w-[1500px] grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center">

                        {/* LEFT: huge code badge + service title */}
                        <div className="md:col-span-7 flex flex-col gap-6 relative">

                            {/* Service code chip */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`code-${activeIndex}`}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 30 }}
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    className="flex items-center gap-3"
                                >
                                    <span className="px-2.5 py-1 border border-[var(--accent-red)] text-[var(--accent-red)] font-mono text-[10px] uppercase tracking-[0.4em]">
                                        {service.code}
                                    </span>
                                    <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/45">
                                        {"//"} CHAPTER_{String(activeIndex + 1).padStart(2, "0")}
                                    </span>
                                    <div className="flex-1 h-px bg-gradient-to-r from-[var(--accent-red)] via-white/20 to-transparent" />
                                </motion.div>
                            </AnimatePresence>

                            {/* Massive title — uses BrandTitle (Anton) for brand consistency */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`title-${activeIndex}`}
                                    initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, y: -40, filter: "blur(12px)" }}
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <h3 className="brand-title brand-title--mega">
                                        {service.title}
                                        <br />
                                        <span className="brand-title__accent brand-title__accent--filled">
                                            {service.accent}
                                        </span>
                                    </h3>
                                </motion.div>
                            </AnimatePresence>

                            {/* Summary */}
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={`sum-${activeIndex}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                    className="text-sm md:text-base text-white/65 leading-relaxed max-w-[560px]"
                                >
                                    {service.summary}
                                </motion.p>
                            </AnimatePresence>

                            {/* Stack */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`stk-${activeIndex}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4, delay: 0.18 }}
                                    className="flex flex-wrap gap-2"
                                >
                                    <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/40 self-center mr-2">
                                        STACK ▸
                                    </span>
                                    {service.stack.map((s) => (
                                        <span
                                            key={s}
                                            className="px-2.5 py-1 border border-white/20 font-mono text-[9px] uppercase tracking-[0.3em] text-white/70 hover:border-[var(--accent-red)] hover:text-[var(--accent-red)] transition-colors"
                                        >
                                            {s}
                                        </span>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* RIGHT: dossier panel with deliverables */}
                        <div className="md:col-span-5 relative">
                            <div className="brand-kicker mb-2" style={{ color: "var(--accent-red)" }}>
                                DELIVERABLES.LIST
                            </div>
                            <div className="border border-white/15 bg-black/60 backdrop-blur-md relative">
                                {/* Corner ticks */}
                                <span className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-[var(--accent-red)]" />
                                <span className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-[var(--accent-red)]" />
                                <span className="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-[var(--accent-red)]" />
                                <span className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-[var(--accent-red)]" />

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`del-${activeIndex}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {paddedDeliverables.map((d, i) => (
                                            <motion.div
                                                key={`${activeIndex}-d-${i}`}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: d ? 1 : 0.25, x: 0 }}
                                                transition={{ duration: 0.35, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                                className="flex items-center gap-4 px-4 py-3.5 border-b border-white/10 last:border-b-0 group"
                                                style={{ minHeight: "3.25rem" }}
                                            >
                                                <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--accent-red)] w-8 shrink-0">
                                                    {String(i + 1).padStart(2, "0")}
                                                </span>
                                                <span className="font-mono text-[11px] md:text-sm uppercase tracking-wider text-white/85 group-hover:text-white">
                                                    {d || "—"}
                                                </span>
                                                <span className="ml-auto text-white/30 group-hover:text-[var(--accent-red)] font-mono text-xs transition-colors">
                                                    ▸
                                                </span>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                            <div className="mt-3 flex justify-between brand-kicker text-white/45 tabular-nums">
                                <span>
                                    <span className="text-white">
                                        {String(service.deliverables.length).padStart(2, "0")}
                                    </span>
                                    {" "}ITEMS RENDERED
                                </span>
                                <span>PER_ENGAGEMENT</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── SERVICE TICKER (left rail of dots) ────────────────── */}
                <div className="absolute left-6 md:left-12 bottom-16 md:bottom-20 z-20 flex items-center gap-3 pointer-events-none">
                    {SERVICES.map((s, i) => (
                        <div
                            key={s.code}
                            className="flex flex-col items-center gap-1.5"
                        >
                            <span
                                className="font-mono text-[8px] uppercase tracking-[0.3em] transition-colors duration-300"
                                style={{
                                    color: i === activeIndex ? "var(--accent-red)" : "rgba(255,255,255,0.25)",
                                }}
                            >
                                {s.code}
                            </span>
                            <div
                                className="transition-all duration-300"
                                style={{
                                    width: i === activeIndex ? 24 : 6,
                                    height: 2,
                                    background:
                                        i === activeIndex
                                            ? "var(--accent-red)"
                                            : "rgba(255,255,255,0.2)",
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* ── BOTTOM PROGRESS RAIL ──────────────────────────────── */}
                <div className="absolute bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-black/70 backdrop-blur-md">
                    <div className="relative h-[2px] w-full bg-white/10">
                        <motion.div
                            className="absolute top-0 left-0 h-full w-full bg-[var(--accent-red)] origin-left"
                            style={{ scaleX: progressScaleX }}
                        />
                    </div>
                    <div className="flex items-center justify-between px-6 md:px-12 h-10 md:h-12 brand-kicker text-white/55">
                        <span className="flex items-center gap-2">
                            <span className="text-[var(--accent-red)] brut-blink">▮</span>
                            SCROLL ↓ TO ADVANCE
                        </span>
                        <span className="hidden md:block text-white/35">
                            CINEMATIC_TIMELINE // ENGAGEMENT_GUIDE
                        </span>
                        <span className="text-[var(--accent-red)]">END_OF_OFFER</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
