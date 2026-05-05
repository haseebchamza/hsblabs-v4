"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import BrandTitle from "./BrandTitle";
import Scene from "./Scene";

type Tool = {
    code: string;
    name: string;
    role: string; // brief role description shown in detail panel
    icon: string; // path to SVG glyph (URL-encoded)
};

type Cluster = {
    id: string;
    label: string;
    tag: string; // e.g. "DESIGN_SUITE"
    tools: Tool[];
};

/** Helper: URL-encode an icon path so file names containing spaces work. */
const ic = (file: string) => `/Icons/Tools/${encodeURIComponent(file)}`;

const CLUSTERS: Cluster[] = [
    {
        id: "design",
        label: "Design Suite",
        tag: "DESIGN_SUITE",
        tools: [
            { code: "D01", name: "Figma",     role: "Primary design environment — components, variants, auto-layout, dev-mode handoff.", icon: ic("Figma.svg") },
            { code: "D02", name: "Framer",    role: "Marketing-site delivery, advanced motion, component-driven CMS.",                  icon: ic("framer.svg") },
            { code: "D03", name: "Webflow",   role: "Visually authored production sites with custom CMS structures.",                   icon: ic("webflow.svg") },
            { code: "D04", name: "Sketch",    role: "Symbol libraries and macOS-native vector workflows.",                              icon: ic("sketch.svg") },
            { code: "D05", name: "InVision",  role: "Prototype review, freehand whiteboarding, design ops.",                            icon: ic("invision-icon-svgrepo-com 1.svg") },
            { code: "D06", name: "Balsamiq",  role: "Low-fidelity sketching for fast stakeholder alignment.",                           icon: ic("Balsamiq.svg") },
            { code: "D07", name: "Whimsical", role: "User flows, IA diagrams, sticky-noted brainstorms.",                               icon: ic("Whimsical.svg") },
            { code: "D08", name: "Spline",    role: "Web-native 3D scenes, interactive product viewers, exports.",                      icon: ic("Spline.svg") },
        ],
    },
    {
        id: "adobe",
        label: "Adobe Kit",
        tag: "ADOBE_KIT",
        tools: [
            { code: "A01", name: "Photoshop",     role: "Compositing, retouching, mockup detailing, print prep.",       icon: ic("Photoshop.svg") },
            { code: "A02", name: "Illustrator",   role: "Logo systems, vector iconography, brand assets.",              icon: ic("Adobe illustrator.svg") },
            { code: "A03", name: "Premiere",      role: "Video editing for case-study reels, social cuts, brand films.",icon: ic("premiere pro.svg") },
            { code: "A04", name: "InDesign",      role: "Long-form layout — proposals, brand books, print collateral.", icon: ic("indesign.svg") },
            { code: "A05", name: "After Effects", role: "Motion graphics, kinetic type, Lottie / web export.",          icon: ic("after effects.svg") },
        ],
    },
    {
        id: "ai",
        label: "AI Ops",
        tag: "AI_OPS",
        tools: [
            { code: "I01", name: "Antigravity",     role: "Agent-driven design / code orchestration.",                    icon: ic("antigravity.svg") },
            { code: "I02", name: "Cursor",          role: "AI-pair-programmed frontend builds at full IDE speed.",        icon: ic("Cursor.svg") },
            { code: "I03", name: "Windsurf",        role: "AI editor with deep multi-file context, refactor flows.",     icon: ic("windsurf.svg") },
            { code: "I04", name: "Google AI Studio",role: "Gemini prototypes, prompt iteration, vision tasks.",          icon: ic("AI studio.svg") },
            { code: "I05", name: "Freepik Spaces",  role: "AI ideation / asset generation for campaign concepts.",       icon: ic("Freepik.svg") },
            { code: "I06", name: "Figma Make",      role: "Prompt-to-frame UI iteration directly inside Figma.",         icon: ic("Figma make.svg") },
        ],
    },
];

export default function TechMatrix() {
    const totalTools = CLUSTERS.reduce((n, c) => n + c.tools.length, 0);
    // Active selection: { clusterIdx, toolIdx } — defaults to cluster 0 / tool 0
    const [active, setActive] = useState<{ c: number; t: number }>({ c: 0, t: 0 });
    const activeTool = CLUSTERS[active.c].tools[active.t];
    const activeCluster = CLUSTERS[active.c];

    return (
        <section className="section-shell w-full min-h-screen text-white px-6 md:px-12 pt-4 md:pt-8 pb-16 md:pb-24">
            {/* Top HUD strip */}
            <div className="flex items-center justify-between mb-8 md:mb-10">
                <div className="brand-kicker">&lt;tech.matrix /&gt;</div>
                <div className="hidden md:flex items-center gap-4 brut-tag">
                    <span>UNITS_INDEXED</span>
                    <span className="text-white tabular-nums">{String(totalTools).padStart(2, "0")}</span>
                    <span className="text-[var(--accent-red)]">●</span>
                    <span>3_CLUSTERS</span>
                </div>
                <div className="brut-tag flex items-center gap-2">
                    <span className="text-[var(--accent-red)]">●</span>
                    <span>LIVE</span>
                </div>
            </div>

            {/* Section heading */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end mb-10 md:mb-14">
                <div className="md:col-span-7">
                    <BrandTitle
                        kicker="WHAT I WORK WITH"
                        primary="TECH"
                        accent="STACK"
                        size="large"
                    />
                </div>
                {/* Floating 3D cursor as brand mark */}
                <div className="md:col-span-2 hidden md:flex items-center justify-center">
                    <div className="w-[120px] h-[120px] relative">
                        <Scene className="w-full h-full relative" scale={1.0} autoRotate={true} />
                    </div>
                </div>
                <div className="md:col-span-3 text-right">
                    <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-white/55 leading-relaxed">
                        Nineteen tools. Three clusters. One operator.
                    </p>
                </div>
            </div>

            {/* Matrix grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-10">
                {/* Three cluster columns */}
                <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                    {CLUSTERS.map((cluster, ci) => (
                        <ClusterColumn
                            key={cluster.id}
                            cluster={cluster}
                            clusterIdx={ci}
                            active={active}
                            onSelect={(c, t) => setActive({ c, t })}
                        />
                    ))}
                </div>

                {/* Detail panel — updates on hover/select */}
                <div className="md:col-span-4 relative">
                    <DetailPanel cluster={activeCluster} tool={activeTool} />
                </div>
            </div>

            {/* Bottom marquee */}
            <div className="relative w-full h-9 bg-[#0a0a0a]/80 border border-white/10 overflow-hidden">
                <div className="brut-marquee-track absolute top-0 left-0 h-full flex items-center font-mono text-[10px] uppercase tracking-[0.4em] text-white/55">
                    {Array.from({ length: 2 }).map((_, k) => (
                        <span key={k} className="flex items-center">
                            {CLUSTERS.flatMap((c) => c.tools)
                                .map((t, i) => (
                                    <span key={i} className="px-5 flex items-center gap-3">
                                        <span className="text-[var(--accent-red)]">{t.code}</span>
                                        {t.name.toUpperCase()}
                                        <span className="text-white/30">▮</span>
                                    </span>
                                ))}
                        </span>
                    ))}
                </div>
                <div className="brut-beam" />
            </div>
        </section>
    );
}

// ── CLUSTER COLUMN ───────────────────────────────────────────────────────────
function ClusterColumn({
    cluster,
    clusterIdx,
    active,
    onSelect,
}: {
    cluster: Cluster;
    clusterIdx: number;
    active: { c: number; t: number };
    onSelect: (c: number, t: number) => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: clusterIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="border border-white/15 bg-[#0a0a0a]/70 backdrop-blur-sm flex flex-col"
        >
            {/* Cluster header */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/15 bg-[#050505]">
                <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[var(--accent-red)]">
                    {cluster.tag}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/50">
                    {String(cluster.tools.length).padStart(2, "0")}_UNITS
                </span>
            </div>

            {/* Tool rows */}
            <div>
                {cluster.tools.map((tool, ti) => {
                    const isActive = active.c === clusterIdx && active.t === ti;
                    return (
                        <button
                            key={tool.code}
                            type="button"
                            onMouseEnter={() => onSelect(clusterIdx, ti)}
                            onFocus={() => onSelect(clusterIdx, ti)}
                            onClick={() => onSelect(clusterIdx, ti)}
                            className={`w-full flex items-center gap-3 px-3 py-2 border-b border-white/10 last:border-b-0 transition-colors duration-200 text-left focus:outline-none ${
                                isActive
                                    ? "bg-[var(--accent-red)] text-black"
                                    : "hover:bg-white/5 text-white"
                            }`}
                        >
                            <span
                                className={`font-mono text-[9px] tracking-[0.3em] w-7 shrink-0 ${
                                    isActive ? "text-black" : "text-[var(--accent-red)]"
                                }`}
                            >
                                {tool.code}
                            </span>
                            {/* Tool glyph */}
                            <span
                                className={`w-5 h-5 shrink-0 flex items-center justify-center transition ${
                                    isActive ? "" : "opacity-90 group-hover:opacity-100"
                                }`}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={tool.icon}
                                    alt=""
                                    aria-hidden
                                    className="w-full h-full object-contain"
                                    style={{
                                        filter: isActive
                                            ? "brightness(0) saturate(100%)"   // turn icon black on red bg
                                            : "none",
                                    }}
                                />
                            </span>
                            <span
                                className={`font-mono text-[11px] uppercase tracking-[0.15em] flex-1 truncate ${
                                    isActive ? "text-black font-bold" : "text-white"
                                }`}
                            >
                                {tool.name}
                            </span>
                            <span
                                className={`font-mono text-[10px] ${
                                    isActive ? "text-black" : "text-white/30"
                                }`}
                            >
                                {isActive ? "▸" : "·"}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="mt-auto px-3 py-1.5 border-t border-white/10 bg-[#050505] flex items-center justify-between">
                <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-white/35">
                    {cluster.label}
                </span>
                <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-[var(--accent-red)]">
                    READY
                </span>
            </div>
        </motion.div>
    );
}

// ── DETAIL PANEL ─────────────────────────────────────────────────────────────
function DetailPanel({ cluster, tool }: { cluster: Cluster; tool: Tool }) {
    return (
        <div className="border border-white/15 bg-[#0a0a0a]/80 backdrop-blur-sm relative h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/15 bg-[#050505]">
                <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[var(--accent-red)]">
                    UNIT_DETAIL
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/55">
                    {tool.code}
                </span>
            </div>

            {/* Body */}
            <motion.div
                key={tool.code}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex-1 flex flex-col gap-3 p-5"
            >
                <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/45">
                    {cluster.tag} {"//"} {cluster.label}
                </span>

                {/* Large glyph + name row */}
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 shrink-0 flex items-center justify-center border border-white/15 bg-black/40">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={tool.icon}
                            alt=""
                            aria-hidden
                            className="w-8 h-8 object-contain"
                        />
                    </div>
                    <h3
                        className="brand-title text-white leading-tight break-words min-w-0"
                        style={{ fontSize: "clamp(1.25rem, 2.6vw, 2rem)" }}
                    >
                        {tool.name.toUpperCase()}
                    </h3>
                </div>

                <div className="w-8 h-[2px] bg-[var(--accent-red)] my-1" />
                <p className="font-mono text-[11px] md:text-xs text-white/65 leading-relaxed">
                    {tool.role}
                </p>

                {/* Mini metric strip */}
                <div className="mt-auto pt-4 border-t border-white/10 grid grid-cols-2 gap-3 font-mono text-[9px] uppercase tracking-[0.35em] text-white/55">
                    <div className="flex flex-col gap-0.5">
                        <span className="text-white/40">CLUSTER</span>
                        <span className="text-white">{cluster.label}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="text-white/40">STATUS</span>
                        <span className="text-[var(--accent-red)] flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-[var(--accent-red)] brut-blink" />
                            ACTIVE
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Corner ticks */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--accent-red)]" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--accent-red)]" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--accent-red)]" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--accent-red)]" />
        </div>
    );
}
