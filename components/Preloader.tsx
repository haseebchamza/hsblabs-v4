"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Curtain preloader — first-load only.
 *
 * Shows a black curtain with brand mark, a count-up percentage, and a
 * blinking status row. After the loading sequence completes, the curtain
 * sweeps up off the screen and unmounts.
 *
 * Sequence:
 *   0.0s   curtain visible, "00%" begins
 *   0—1.4s count up from 0 → 100, with synthetic jitter
 *   1.4s   "READY" flashes, brand mark settles
 *   2.0s   curtain wipes upward (clip-path), unmounts at 2.7s
 */
export default function Preloader({ onDone }: { onDone?: () => void }) {
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState<"loading" | "ready" | "wipe" | "gone">("loading");
    const startedAt = useRef(0);

    // Ramp percentage from 0 → 100 over ~1.4s with ease-out + mild jitter
    useEffect(() => {
        startedAt.current = performance.now();
        const DURATION = 1400;
        let raf = 0;
        const tick = () => {
            const t = Math.min(1, (performance.now() - startedAt.current) / DURATION);
            const eased = 1 - Math.pow(1 - t, 3);
            const jitter = t < 0.95 ? (Math.random() - 0.5) * 1.5 : 0;
            setProgress(Math.max(0, Math.min(100, Math.round(eased * 100 + jitter))));
            if (t < 1) {
                raf = requestAnimationFrame(tick);
            } else {
                setProgress(100);
                setPhase("ready");
            }
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, []);

    // After "ready" flashes briefly, wipe the curtain away
    useEffect(() => {
        if (phase !== "ready") return;
        const id1 = setTimeout(() => setPhase("wipe"), 600);
        const id2 = setTimeout(() => {
            setPhase("gone");
            onDone?.();
        }, 1500);
        return () => {
            clearTimeout(id1);
            clearTimeout(id2);
        };
    }, [phase, onDone]);

    // Lock body scroll while preloader is up
    useEffect(() => {
        if (phase === "gone") return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [phase]);

    return (
        <AnimatePresence>
            {phase !== "gone" && (
                <motion.div
                    key="preloader"
                    initial={false}
                    animate={
                        phase === "wipe"
                            ? { clipPath: "inset(0 0 100% 0)" }
                            : { clipPath: "inset(0 0 0% 0)" }
                    }
                    transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[10000] bg-black text-white pointer-events-auto"
                    style={{ clipPath: "inset(0 0 0% 0)" }}
                >
                    {/* Top bar */}
                    <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 md:px-8 py-3 md:py-4 border-b border-white/10">
                        <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.5em] text-[var(--accent-red)]">
                            HSB / V4
                        </span>
                        <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/55 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-[var(--accent-red)] animate-pulse" />
                            {phase === "loading" ? "BOOTING" : phase === "ready" ? "READY" : "DEPLOY"}
                        </span>
                    </div>

                    {/* Center stage */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
                        {/* Brand mark */}
                        <motion.div
                            initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                            className="brand-title brand-title--mega text-white text-center leading-[0.85]"
                            style={{ fontSize: "clamp(4rem, 14vw, 10rem)" }}
                        >
                            HASEEB
                            <br />
                            <span className="font-serif-italic text-[var(--accent-red)]">
                                hamza.
                            </span>
                        </motion.div>

                        {/* Percentage */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="mt-10 md:mt-14 flex items-baseline gap-3 font-mono"
                        >
                            <span
                                className="tabular-nums text-white tracking-tight"
                                style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 800 }}
                            >
                                {String(progress).padStart(3, "0")}
                            </span>
                            <span className="text-[var(--accent-red)] text-2xl md:text-4xl font-bold">
                                %
                            </span>
                        </motion.div>

                        {/* Progress bar */}
                        <div className="mt-6 w-[60vw] md:w-[420px] max-w-full h-[2px] bg-white/10 overflow-hidden">
                            <div
                                className="h-full bg-[var(--accent-red)] shadow-[0_0_12px_rgba(255,51,51,0.7)] origin-left transition-[width] duration-100 ease-linear"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        {/* Status row */}
                        <div className="mt-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.45em] text-white/50">
                            <span>UX_ENGINE</span>
                            <span className="text-[var(--accent-red)]">▮</span>
                            <span>{phase === "ready" ? "ALL SYSTEMS GO" : "INITIALIZING"}</span>
                        </div>
                    </div>

                    {/* Bottom marquee strip */}
                    <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 py-3 overflow-hidden">
                        <div className="brut-marquee-track flex items-center font-mono text-[10px] uppercase tracking-[0.45em] text-white/50">
                            {Array.from({ length: 4 }).map((_, k) => (
                                <span key={k} className="flex items-center gap-6 px-6">
                                    <span className="text-[var(--accent-red)]">▮</span>
                                    PRODUCT DESIGNER
                                    <span className="text-white/25">·</span>
                                    AI BUILDER
                                    <span className="text-white/25">·</span>
                                    BASED IN DUBAI
                                    <span className="text-white/25">·</span>
                                    OPEN FOR Q3 2026
                                    <span className="text-white/25">·</span>
                                    FIGMA-FIRST
                                    <span className="text-white/25">·</span>
                                    VIBE CODED
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Subtle scanlines for the brutalist feel */}
                    <div
                        aria-hidden
                        className="absolute inset-0 pointer-events-none opacity-60"
                        style={{
                            backgroundImage:
                                "repeating-linear-gradient(to bottom, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 4px)",
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
