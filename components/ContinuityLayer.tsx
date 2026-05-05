"use client";
import React, { useEffect, useState } from "react";

/**
 * ContinuityLayer — fixed brand decorations that sit at the EDGES of the
 * viewport and span the full journey (left coordinate rail, right red tick
 * column, corner ticks, top-right UTC clock).
 *
 * Sections themselves provide their own solid background + scanlines via
 * the `.section-shell` class so they always occlude each other cleanly. This
 * layer only adds peripheral brand details that visually tie the sections
 * together without interfering with content stacking.
 */
export default function ContinuityLayer() {
    const [time, setTime] = useState("");
    useEffect(() => {
        const tick = () => {
            const d = new Date();
            const hh = String(d.getUTCHours()).padStart(2, "0");
            const mm = String(d.getUTCMinutes()).padStart(2, "0");
            const ss = String(d.getUTCSeconds()).padStart(2, "0");
            setTime(`${hh}:${mm}:${ss}`);
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <>
            {/* Left coordinate rail (faint white ticks running the whole journey) */}
            <div aria-hidden className="continuity-rail" />

            {/* Right-edge red tick column */}
            <div aria-hidden className="continuity-tick-r" />

            {/* Decorative left-edge SECTOR labels (vertical) */}
            <div
                aria-hidden
                className="fixed top-[20vh] left-[28px] z-[50] pointer-events-none flex flex-col gap-[15vh] text-white/15 font-mono text-[8px] uppercase tracking-[0.45em] -rotate-90 origin-top-left hidden md:block"
                style={{ writingMode: "horizontal-tb" }}
            >
                <span>SECTOR_001</span>
                <span>SECTOR_002</span>
                <span>SECTOR_003</span>
                <span>SECTOR_004</span>
                <span>SECTOR_005</span>
            </div>

            {/* Top-right HUD timestamp */}
            <div className="fixed top-3 right-9 z-[55] pointer-events-none font-mono text-[10px] uppercase tracking-[0.4em] text-white/35 hidden md:block">
                <span>{time} UTC</span>
            </div>

            {/* Corner ticks */}
            <div
                aria-hidden
                className="fixed top-3 right-12 z-[55] pointer-events-none w-3 h-3 border-t-2 border-r-2 border-[var(--accent-red)] opacity-50 hidden md:block"
            />
            <div
                aria-hidden
                className="fixed bottom-3 left-12 z-[55] pointer-events-none w-3 h-3 border-b-2 border-l-2 border-[var(--accent-red)] opacity-50 hidden md:block"
            />
        </>
    );
}
