"use client";
import React from "react";
import { motion } from "framer-motion";

// ── DATA ─────────────────────────────────────────────────────────────────────

type Job = {
    period: string;
    company: string;
    role: string;
    location?: string;
    points: string[];
    tags: string[];
};

const JOBS: Job[] = [
    {
        period: "APR 2025 — PRESENT",
        company: "Provident Real Estate",
        role: "UI/UX Designer",
        location: "Dubai, UAE",
        points: [
            "Data-driven landing page design — used Hotjar heatmaps, session recordings, and live market data to optimize layouts, lifting conversion ~30%.",
            "Designed end-to-end web experiences across the Provident ecosystem: off-plan property pages, developer profiles, area guides, roadshow pages.",
            "Translated real estate market insights into intuitive, visually compelling layouts that communicate off-plan developments clearly.",
            "AI-accelerated workflow — used Figma Make and other AI design tools to rapidly iterate on campaign assets and ship faster.",
        ],
        tags: ["Figma", "Hotjar", "Landing Pages", "AI Tools", "Real Estate"],
    },
    {
        period: "MAR 2025 — PRESENT",
        company: "Union Square House",
        role: "Visual Designer",
        location: "Dubai, UAE",
        points: [
            "Directed responsive landing page design for luxury real estate projects, focused on engagement and seamless UX.",
            "Designed digital assets across performance marketing — social posts, reels, paid ad creatives — tailored per channel.",
            "Cross-functional work with marketing, sales, and branding to keep visual consistency across every touchpoint.",
            "Delivered impactful visuals and marketing collateral for high-value property deals.",
        ],
        tags: ["Visual Design", "Marketing", "Social Media", "Brand"],
    },
    {
        period: "DEC 2023 — JAN 2025",
        company: "Aqary International Holding",
        role: "Product Designer",
        location: "Dubai, UAE",
        points: [
            "Led the design of in-house digital products — websites, mobile apps, and the Aqary dashboard end-to-end.",
            "Resolved complex design challenges around dense dashboards, multi-state UI, and large-scale information architecture.",
            "Earned 'Designer of the Month' recognition for outstanding contribution to product quality.",
            "Managed stakeholder communication, design reviews, and quality bar across the product team.",
        ],
        tags: ["Product Design", "Dashboards", "Mobile Apps", "Design Systems"],
    },
    {
        period: "DEC 2020 — NOV 2023",
        company: "StratAgile",
        role: "Creative Designer",
        points: [
            "Conceptualized and delivered engaging digital assets across diverse platforms and clients.",
            "Directed creative for high-profile projects, keeping output aligned with client branding objectives.",
            "Helped secure major contracts with Codashop (Malaysia, Philippines) through persuasive design pitches.",
            "Delivered high-quality work on tight deadlines, consistently exceeding client expectations.",
        ],
        tags: ["Creative", "Branding", "Digital Assets", "Pitches"],
    },
    {
        period: "DEC 2019 — 2020",
        company: "Freelance",
        role: "Creative Director",
        points: [
            "Designed websites and apps for early-stage clients, end-to-end.",
            "Built brand systems — logos, posters, banners, identity patterns — across digital and print.",
            "Conceptualized visually compelling design ideas aligned with client goals and brand identity.",
            "Owned client communication, feedback loops, and final delivery directly.",
        ],
        tags: ["Freelance", "Brand", "Web", "Identity"],
    },
];

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function ExperienceTimeline() {
    return (
        <section className="section-shell w-full">
            <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 pt-10 md:pt-14 pb-20 md:pb-28">

                {/* TOP META STRIP */}
                <div className="flex items-center justify-between mb-8 md:mb-12">
                    <div className="flex items-center gap-3">
                        <span className="brut-tag brut-tag--red">&lt;archive.timeline /&gt;</span>
                        <span className="brut-tag hidden md:inline">DOSSIER_LOAD: 100%</span>
                    </div>
                    <span className="brut-tag flex items-center gap-2">
                        <span className="text-[var(--accent-red)]">▮</span>
                        RECORDS_{String(JOBS.length).padStart(2, "0")}
                    </span>
                </div>

                {/* TIMELINE BODY */}
                <div className="relative">
                    {/* Vertical spine — red on left */}
                    <div
                        aria-hidden
                        className="absolute left-3 md:left-5 top-2 bottom-2 w-px bg-gradient-to-b from-[var(--accent-red)] via-[var(--accent-red)]/40 to-transparent"
                    />
                    {/* Spine cap (top) */}
                    <span
                        aria-hidden
                        className="absolute left-3 md:left-5 -translate-x-1/2 -top-1 w-2 h-2 rounded-full bg-[var(--accent-red)] shadow-[0_0_10px_rgba(255,51,51,0.9)]"
                    />

                    <ul className="flex flex-col gap-5 md:gap-7">
                        {JOBS.map((job, i) => (
                            <TimelineEntry
                                key={`${job.company}-${i}`}
                                job={job}
                                index={i}
                                isLast={i === JOBS.length - 1}
                            />
                        ))}
                    </ul>

                    {/* Spine cap (bottom) */}
                    <div className="relative pl-10 md:pl-14 mt-6">
                        <span
                            aria-hidden
                            className="absolute left-3 md:left-5 -translate-x-1/2 top-1 w-1.5 h-1.5 rounded-full bg-white/30"
                        />
                        <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-white/45">
                            END_OF_RECORDS · {JOBS.length} ENTRIES INDEXED
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ── ENTRY ─────────────────────────────────────────────────────────────────────

function TimelineEntry({
    job,
    index,
    isLast,
}: {
    job: Job;
    index: number;
    isLast: boolean;
}) {
    const fileNo = String(index + 1).padStart(2, "0");

    return (
        <motion.li
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
            className="relative pl-10 md:pl-14"
        >
            {/* Node dot on the spine */}
            <span
                aria-hidden
                className="absolute left-3 md:left-5 -translate-x-1/2 top-6 w-2.5 h-2.5 rounded-full bg-[var(--accent-red)] ring-4 ring-[#050505] shadow-[0_0_12px_rgba(255,51,51,0.7)]"
            />
            {/* Optional: a "tick" connecting node to card */}
            <span
                aria-hidden
                className="absolute left-3 md:left-5 top-6 -translate-y-1/2 h-px w-7 md:w-9 bg-gradient-to-r from-[var(--accent-red)] to-transparent"
            />

            {/* Card */}
            <article className="group relative border border-white/15 bg-[#0a0a0a]/70 backdrop-blur-sm hover:border-[var(--accent-red)]/60 transition-colors duration-300">
                {/* Corner ticks */}
                <span aria-hidden className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-[var(--accent-red)]" />
                <span aria-hidden className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-[var(--accent-red)]" />
                <span aria-hidden className="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-[var(--accent-red)]" />
                <span aria-hidden className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-[var(--accent-red)]" />

                {/* Header bar */}
                <header className="flex flex-wrap items-center justify-between gap-2 px-4 md:px-6 py-2.5 border-b border-white/10 bg-[#050505]">
                    <div className="flex items-center gap-3">
                        <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-[var(--accent-red)]">
                            FILE_{fileNo}
                        </span>
                        <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.35em] text-white/65">
                            {job.period}
                        </span>
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/40 flex items-center gap-1.5">
                        {isLast ? "ORIGIN" : "ARCHIVED"}
                        <span className={`w-1.5 h-1.5 ${isLast ? "bg-[var(--accent-red)] brut-blink" : "bg-white/30"}`} />
                    </span>
                </header>

                {/* Title row */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 md:gap-4 px-4 md:px-6 pt-5 pb-3 border-b border-white/10">
                    <div className="min-w-0">
                        <h3
                            className="brand-title text-white leading-tight break-words"
                            style={{ fontSize: "clamp(1.4rem, 3vw, 2.25rem)" }}
                        >
                            {job.company}
                        </h3>
                        <p className="mt-1 font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-white/55">
                            ROLE / <span className="text-white">{job.role}</span>
                            {job.location && (
                                <>
                                    <span className="mx-2 text-white/25">·</span>
                                    <span>{job.location}</span>
                                </>
                            )}
                        </p>
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/45 shrink-0">
                        ENTRIES // {String(job.points.length).padStart(2, "0")}
                    </span>
                </div>

                {/* Points list */}
                <ul className="px-4 md:px-6 py-4 space-y-2.5">
                    {job.points.map((pt, pi) => (
                        <li key={pi} className="flex items-start gap-3">
                            <span className="font-mono text-[9px] tracking-[0.3em] text-[var(--accent-red)] pt-[3px] shrink-0 w-7">
                                {String(pi + 1).padStart(2, "0")}
                            </span>
                            <span className="text-[13px] md:text-sm text-white/70 leading-relaxed font-light">
                                {pt}
                            </span>
                        </li>
                    ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 px-4 md:px-6 py-3 border-t border-white/10 bg-black/30">
                    {job.tags.map((t) => (
                        <span
                            key={t}
                            className="px-2 py-0.5 border border-white/15 font-mono text-[9px] uppercase tracking-[0.3em] text-white/60 group-hover:text-white/80 transition-colors"
                        >
                            {t}
                        </span>
                    ))}
                </div>

                {/* Hover accent rule */}
                <span
                    aria-hidden
                    className="absolute left-0 bottom-0 h-[2px] w-0 bg-[var(--accent-red)] transition-all duration-500 group-hover:w-full"
                />
            </article>
        </motion.li>
    );
}
