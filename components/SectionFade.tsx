"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * SectionFade — wraps a section with scroll-linked parallax + fade so that
 * sections morph into each other instead of cutting hard. The wrapper itself
 * stays in document flow (so layout is unaffected); only the visual content
 * inside is transformed based on the wrapper's position relative to the
 * viewport.
 *
 * Behavior:
 *  - On entry (bottom of viewport → middle): content rises 40px and fades in
 *  - In view (middle): full opacity, no offset
 *  - On exit (middle → top): content lifts another 40px and fades to ~0.4
 *
 * Disabled when prefers-reduced-motion is set.
 */
export default function SectionFade({
    children,
    className = "",
    intensity = 1,
}: {
    children: React.ReactNode;
    className?: string;
    /** 0 = no parallax, 1 = default, >1 = stronger */
    intensity?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const baseY = 40 * intensity;
    const y = useTransform(
        scrollYProgress,
        [0, 0.25, 0.75, 1],
        reduced ? [0, 0, 0, 0] : [baseY, 0, 0, -baseY]
    );
    const opacity = useTransform(
        scrollYProgress,
        [0, 0.18, 0.82, 1],
        reduced ? [1, 1, 1, 1] : [0, 1, 1, 0.45]
    );

    return (
        <div ref={ref} className={className}>
            <motion.div style={{ y, opacity, willChange: "transform, opacity" }}>
                {children}
            </motion.div>
        </div>
    );
}
