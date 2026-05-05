"use client";
import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useFinePointer } from "../lib/useViewport";

/**
 * Magnetic — wraps any child element so it pulls toward the cursor on hover.
 * The classic awwwards interaction. Uses Framer Motion springs for buttery
 * smoothness. Disabled on touch / coarse-pointer devices automatically.
 *
 * @param strength  How strongly the element follows the cursor. 0.4 = subtle,
 *                  1 = matches cursor 1:1. Default 0.35.
 * @param activeRadius  Distance from element center within which the pull
 *                  activates. Defaults to 1.5× the element's largest side.
 */
export default function Magnetic({
    children,
    strength = 0.35,
    activeRadius,
    className,
    style,
}: {
    children: React.ReactNode;
    strength?: number;
    activeRadius?: number;
    className?: string;
    style?: React.CSSProperties;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
    const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });
    const enabled = useFinePointer();

    useEffect(() => {
        if (!enabled) return;
        const el = ref.current;
        if (!el) return;

        const onMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const radius = activeRadius ?? Math.max(rect.width, rect.height) * 1.5;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < radius) {
                // Falloff: stronger pull when close, gentler when far
                const fall = 1 - Math.min(1, dist / radius);
                x.set(dx * strength * fall);
                y.set(dy * strength * fall);
            } else {
                x.set(0);
                y.set(0);
            }
        };
        const onLeave = () => {
            x.set(0);
            y.set(0);
        };

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseout", onLeave);
        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseout", onLeave);
        };
    }, [enabled, strength, activeRadius, x, y]);

    if (!enabled) {
        // No-op wrapper on touch devices — no extra DOM, no listeners.
        return (
            <div className={className} style={style}>
                {children}
            </div>
        );
    }

    return (
        <motion.div
            ref={ref}
            className={className}
            style={{ ...style, x: sx, y: sy }}
        >
            {children}
        </motion.div>
    );
}
