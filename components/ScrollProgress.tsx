"use client";
import React, { useEffect, useState } from "react";

/**
 * ScrollProgress — slim scanning bar fixed at the top of the viewport.
 * Red, brutalist, fills as the user scrolls. Plays nicely with Lenis since
 * we read scrollY on every animation frame instead of relying on scroll events.
 */
export default function ScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let raf = 0;
        const tick = () => {
            const doc = document.documentElement;
            const scrollTop = window.scrollY || doc.scrollTop;
            const total = doc.scrollHeight - window.innerHeight;
            const p = total > 0 ? Math.min(1, Math.max(0, scrollTop / total)) : 0;
            setProgress(p);
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 h-[2px] z-[1100] pointer-events-none">
            {/* track */}
            <div className="absolute inset-0 bg-white/5" />
            {/* fill */}
            <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[var(--accent-red)] via-[#ff6a6a] to-[var(--accent-red)] shadow-[0_0_12px_rgba(255,51,51,0.7)]"
                style={{
                    width: `${progress * 100}%`,
                    transition: "width 80ms linear",
                }}
            />
            {/* leading dot */}
            <div
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--accent-red)] shadow-[0_0_10px_rgba(255,51,51,0.9)]"
                style={{
                    left: `calc(${progress * 100}% - 4px)`,
                    opacity: progress > 0.005 && progress < 0.995 ? 1 : 0,
                    transition: "left 80ms linear, opacity 200ms ease",
                }}
            />
        </div>
    );
}
