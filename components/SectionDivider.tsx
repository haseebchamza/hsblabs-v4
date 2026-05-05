"use client";
import React from "react";
import { motion } from "framer-motion";
import BrandTitle from "./BrandTitle";

interface SectionDividerProps {
    /** Numeric act marker, e.g. "II" */
    act: string;
    /** Section title, e.g. "TRANSMISSION" — shown after a slash */
    title: string;
    /** Optional accent word styled with the red outline */
    accent?: string;
    /** Short kicker / subtitle */
    kicker?: string;
    /** Variant — controls accent intensity */
    variant?: "default" | "red";
}

/**
 * Slim brutalist chapter marker. Replaces the previous heavy divider so the
 * journey reads as one continuous canvas rather than a stack of cards
 * separated by thick seams. Just: act number, title, kicker, thin red rule.
 */
export default function SectionDivider({
    act,
    title,
    accent,
    kicker,
    variant = "default",
}: SectionDividerProps) {
    return (
        <section className="section-shell w-full">
            <div className="relative max-w-[1600px] mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-6 md:pb-8">
                {/* Top thin red rule with act number */}
                <div className="flex items-center gap-3 mb-4">
                    <span
                        className={`font-mono text-[10px] md:text-xs uppercase tracking-[0.5em] ${
                            variant === "red" ? "text-[var(--accent-red)]" : "text-white/55"
                        }`}
                    >
                        ACT_{act}
                    </span>
                    <div className="flex-1 h-[1px] bg-gradient-to-r from-[var(--accent-red)] via-white/15 to-transparent" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/35">
                        ▮ ▮ ▮
                    </span>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <BrandTitle
                        primary={title}
                        accent={accent}
                        size="mega"
                        glitchPrimary={false}
                    />
                </motion.div>

                {kicker && (
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="mt-5 font-mono text-[11px] md:text-xs uppercase tracking-[0.35em] text-white/55 max-w-[640px] leading-relaxed"
                    >
                        {kicker}
                    </motion.p>
                )}
            </div>
        </section>
    );
}
