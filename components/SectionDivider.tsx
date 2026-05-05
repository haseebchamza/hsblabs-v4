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
 * Chapter marker. The journey reads as one continuous canvas with each
 * act announced through a slim, animated header — act number, title,
 * kicker, and a scanning beam over the divider rule.
 */
export default function SectionDivider({
    act,
    title,
    accent,
    kicker,
    variant = "default",
}: SectionDividerProps) {
    const isRed = variant === "red";

    return (
        <section className="section-shell w-full">
            <div className="relative max-w-[1600px] mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-6 md:pb-8">

                {/* TOP DIVIDER RULE with scanning beam */}
                <div className="flex items-center gap-3 mb-5 md:mb-6">
                    <motion.span
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className={`font-mono text-[10px] md:text-xs uppercase tracking-[0.5em] ${
                            isRed ? "text-[var(--accent-red)]" : "text-white/60"
                        }`}
                    >
                        ACT_{act}
                    </motion.span>

                    {/* The animated rule itself */}
                    <div className="relative flex-1 h-[1px] overflow-hidden">
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-0 origin-left bg-gradient-to-r from-[var(--accent-red)] via-white/20 to-transparent"
                        />
                        {/* scanning beam */}
                        <span className="brut-beam" />
                    </div>

                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/35"
                    >
                        ▮ ▮ ▮
                    </motion.span>
                </div>

                {/* TITLE */}
                <motion.div
                    initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                    <BrandTitle
                        primary={title}
                        accent={accent}
                        size="mega"
                        glitchPrimary={false}
                    />
                </motion.div>

                {/* KICKER */}
                {kicker && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, delay: 0.25 }}
                        className="mt-5 md:mt-6 flex items-start gap-3 max-w-[720px]"
                    >
                        <span className="text-[var(--accent-red)] font-mono text-xs md:text-sm leading-none mt-1">
                            ▸
                        </span>
                        <p className="font-mono text-[11px] md:text-xs uppercase tracking-[0.35em] text-white/60 leading-relaxed">
                            {kicker}
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
