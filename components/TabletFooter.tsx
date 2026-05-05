"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BrandTitle from "./BrandTitle";
import Scene from "./Scene";

const SOCIALS = [
    { label: "EMAIL", value: "haseebc1999@gmail.com", href: "mailto:haseebc1999@gmail.com", primary: true },
    { label: "LINKEDIN", value: "/in/haseebc", href: "https://www.linkedin.com/in/haseebc/" },
    { label: "BEHANCE", value: "/haseebchovardz", href: "https://www.behance.net/haseebchovardz" },
];

export default function TabletFooter() {
    const [time, setTime] = useState("");
    useEffect(() => {
        const update = () => {
            const d = new Date();
            const hh = String(d.getUTCHours()).padStart(2, "0");
            const mm = String(d.getUTCMinutes()).padStart(2, "0");
            const ss = String(d.getUTCSeconds()).padStart(2, "0");
            setTime(`${hh}:${mm}:${ss} UTC`);
        };
        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <section className="section-shell w-full py-16 md:py-24">

            {/* Top marquee */}
            <div className="absolute top-0 left-0 right-0 h-9 bg-[#0a0a0a] border-b border-white/10 overflow-hidden">
                <div className="brut-marquee-track absolute top-0 left-0 h-full flex items-center font-mono text-[10px] uppercase tracking-[0.4em] text-white/55">
                    {Array.from({ length: 2 }).map((_, k) => (
                        <span key={k} className="flex items-center">
                            {[
                                "OPEN FOR Q3 2026",
                                "BASED IN DUBAI",
                                "REMOTE OK",
                                "RESPONSE WITHIN 24H",
                                "PROVIDENT × USH",
                                "AVAILABLE FOR CONTRACT",
                            ].concat([
                                "OPEN FOR Q3 2026",
                                "BASED IN DUBAI",
                                "REMOTE OK",
                                "RESPONSE WITHIN 24H",
                            ]).map((item, i) => (
                                <span key={i} className="px-6 flex items-center gap-3">
                                    <span className="text-[var(--accent-red)]">▮</span>
                                    {item}
                                </span>
                            ))}
                        </span>
                    ))}
                </div>
                <div className="brut-beam" />
            </div>

            <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 pt-12">

                {/* Section meta */}
                <div className="flex items-start justify-between mb-6 md:mb-10">
                    <div className="flex flex-col gap-1">
                        <span className="brut-tag brut-tag--red">&lt;uplink.open /&gt;</span>
                        <span className="brut-tag">CHANNEL_SECURE // {time || "00:00:00 UTC"}</span>
                    </div>
                    <div className="hidden md:flex flex-col items-end gap-1">
                        <span className="brut-tag">SIGNAL</span>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 bg-[var(--accent-red)] brut-blink" />
                            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/70">
                                ONLINE
                            </span>
                        </div>
                    </div>
                </div>

                {/* Headline + reused 3D cursor as uplink indicator */}
                <div className="flex items-end gap-6 md:gap-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <BrandTitle
                            primary="LET'S SYNC"
                            accent="VISION"
                            size="mega"
                            glitchPrimary
                        />
                    </motion.div>
                    <div className="hidden md:block w-[140px] h-[140px] shrink-0 mb-2">
                        <Scene className="w-full h-full relative" scale={1.0} autoRotate={true} />
                    </div>
                </div>

                {/* Body grid */}
                <div className="mt-10 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
                    {/* Left: copy */}
                    <div className="md:col-span-5 flex flex-col gap-5">
                        <p className="text-base md:text-lg text-white/70 leading-relaxed font-light max-w-[480px]">
                            Got a brief, a half-formed idea, or a system that needs untangling?
                            Open the uplink and we&apos;ll figure out the right shape together.
                        </p>
                        <div className="flex flex-col gap-2 pt-2 border-t border-white/15">
                            <div className="flex justify-between items-center font-mono text-[10px] uppercase tracking-[0.35em] text-white/55 py-1.5 border-b border-white/10">
                                <span>BASED</span>
                                <span className="text-white">DUBAI · UAE</span>
                            </div>
                            <div className="flex justify-between items-center font-mono text-[10px] uppercase tracking-[0.35em] text-white/55 py-1.5 border-b border-white/10">
                                <span>RATE</span>
                                <span className="text-[var(--accent-red)]">AVAILABLE</span>
                            </div>
                            <div className="flex justify-between items-center font-mono text-[10px] uppercase tracking-[0.35em] text-white/55 py-1.5 border-b border-white/10">
                                <span>CYCLE</span>
                                <span className="text-white">Q3 / Q4 2026</span>
                            </div>
                            <div className="flex justify-between items-center font-mono text-[10px] uppercase tracking-[0.35em] text-white/55 py-1.5">
                                <span>RESPONSE</span>
                                <span className="text-white">&lt;24H</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: socials as brutalist plate */}
                    <div className="md:col-span-7">
                        <div className="brut-tag brut-tag--red mb-2">CHANNEL.LIST</div>
                        <div className="border border-white/15 bg-[#0a0a0a]/80 backdrop-blur-sm">
                            {SOCIALS.map((s, i) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target={s.href.startsWith("http") ? "_blank" : undefined}
                                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    className={`group flex items-center gap-4 px-4 md:px-6 py-4 md:py-5 border-b border-white/10 last:border-b-0 transition-colors ${
                                        s.primary
                                            ? "hover:bg-[var(--accent-red)] hover:text-black"
                                            : "hover:bg-white hover:text-black"
                                    }`}
                                >
                                    <span className="font-mono text-[10px] tracking-[0.4em] text-[var(--accent-red)] group-hover:text-black w-10 shrink-0">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <div className="flex flex-col">
                                        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/55 group-hover:text-black/60">
                                            {s.label}
                                        </span>
                                        <span className="font-black text-xl md:text-2xl uppercase tracking-tighter leading-tight">
                                            {s.value}
                                        </span>
                                    </div>
                                    <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.35em] text-white/55 group-hover:text-black flex items-center gap-2">
                                        OPEN <span className="brut-blink">▸</span>
                                    </span>
                                </a>
                            ))}
                        </div>
                        <div className="mt-3 flex items-center justify-between brut-tag">
                            <span>{SOCIALS.length} CHANNELS // SECURE</span>
                            <span className="text-[var(--accent-red)]">END_OF_LIST</span>
                        </div>
                    </div>
                </div>

                {/* Personal signature — clip-path reveal as ink dries */}
                <div className="mt-12 md:mt-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-6">
                    <div className="flex flex-col gap-2">
                        <span className="brand-kicker text-white/40">SIGNED</span>
                        <motion.div
                            initial={{ clipPath: "inset(0 100% 0 0)" }}
                            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/Signature.svg"
                                alt="Haseeb Hamza signature"
                                className="block"
                                style={{
                                    width: 120,
                                    height: "auto",
                                    filter: "brightness(0) invert(1)",
                                    opacity: 0.85,
                                }}
                            />
                        </motion.div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/55">
                            HASEEB HAMZA
                        </span>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-1.5">
                        <span className="brand-kicker text-white/40">DOSSIER_END</span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/55">
                            VERIFIED ✓
                        </span>
                    </div>
                </div>

                {/* Bottom signature row */}
                <div className="pt-6 border-t border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                    <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/45">
                        © HSBLABS_V4 {"//"} {new Date().getFullYear()} {"//"} ALL_RIGHTS_RENDERED
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/45 flex items-center gap-3">
                        <span>BUILT_WITH NEXT × GSAP × THREE</span>
                        <span className="text-[var(--accent-red)] brut-blink">▮</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
