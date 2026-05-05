"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

import { playHoverSound } from "../lib/audio";

type LenisLike = {
    scrollTo: (
        target: string | number | HTMLElement,
        options?: { duration?: number; offset?: number; easing?: (t: number) => number; immediate?: boolean }
    ) => void;
};

type SectionId = "intro" | "about" | "projects" | "contact";

const NAV_LINKS: { id: SectionId; label: string }[] = [
    { id: "projects", label: "PROJECTS" },
    { id: "about", label: "ABOUT" },
    { id: "contact", label: "CONTACT" },
];

export default function FloatingNav() {
    const [isVisible] = useState(true);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [activeSection, setActiveSection] = useState<SectionId>("intro");
    const navRef = useRef<HTMLDivElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    // ── ENTRANCE ANIMATION ────────────────────────────────────────────
    useEffect(() => {
        if (isVisible && navRef.current) {
            gsap.fromTo(
                navRef.current,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 2 }
            );
        }
    }, [isVisible]);

    // ── AUTOPLAY WORKAROUND ───────────────────────────────────────────
    useEffect(() => {
        const startAudio = () => {
            if (audioRef.current && audioRef.current.paused && window.__hsbMuted !== true) {
                audioRef.current.play().catch(() => {});
            }
            // Remove listeners once triggered
            window.removeEventListener("pointerdown", startAudio);
            window.removeEventListener("scroll", startAudio);
            window.removeEventListener("keydown", startAudio);
        };

        // Attempt immediately (might fail due to browser policy)
        startAudio();

        // Fallback to first user interaction
        window.addEventListener("pointerdown", startAudio, { passive: true });
        window.addEventListener("scroll", startAudio, { passive: true });
        window.addEventListener("keydown", startAudio, { passive: true });

        return () => {
            window.removeEventListener("pointerdown", startAudio);
            window.removeEventListener("scroll", startAudio);
            window.removeEventListener("keydown", startAudio);
        };
    }, []);

    // ── SCROLL-SPY: highlight the section currently in view ──────────
    useEffect(() => {
        const ids: SectionId[] = ["intro", "about", "projects", "contact"];
        const observers: IntersectionObserver[] = [];
        const visible = new Map<SectionId, number>();

        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;
            const obs = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            visible.set(id, entry.intersectionRatio);
                        } else {
                            visible.delete(id);
                        }
                    });
                    // Pick the section with the highest intersection ratio
                    let best: SectionId = "intro";
                    let bestRatio = -1;
                    visible.forEach((ratio, sectionId) => {
                        if (ratio > bestRatio) {
                            best = sectionId;
                            bestRatio = ratio;
                        }
                    });
                    if (bestRatio > 0) setActiveSection(best);
                },
                { threshold: [0.15, 0.35, 0.6, 0.85] }
            );
            obs.observe(el);
            observers.push(obs);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, []);

    // ── NAVIGATION: real smooth scroll via Lenis when available ──────
    const navigateTo = (id: SectionId) => {
        const target = document.getElementById(id);
        if (!target) return;

        const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
        if (lenis?.scrollTo) {
            lenis.scrollTo(target, { duration: 1.6, offset: -20 });
        } else {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const toggleAudio = () => {
        if (!audioRef.current) return;
        if (isAudioPlaying) {
            audioRef.current.pause();
            setIsAudioPlaying(false);
            if (typeof window !== "undefined") window.__hsbMuted = true;
        } else {
            audioRef.current.play().then(() => setIsAudioPlaying(true)).catch(() => { });
            if (typeof window !== "undefined") window.__hsbMuted = false;
        }
    };

    return (
        <>
            <audio
                ref={audioRef}
                loop
                autoPlay
                src="/ambient-sound.mp3"
                onPlay={() => setIsAudioPlaying(true)}
                onPause={() => setIsAudioPlaying(false)}
            />

            {isVisible && (
                <div className="fixed bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-[1000] pointer-events-none">
                    <div
                        ref={navRef}
                        className="relative flex items-center bg-black/85 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_20px_60px_rgba(0,0,0,0.85)] pointer-events-auto overflow-hidden opacity-0"
                    >
                        {/* Subtle red glow rim */}
                        <span
                            aria-hidden
                            className="pointer-events-none absolute inset-0 rounded-full"
                            style={{
                                boxShadow:
                                    "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 0 28px rgba(255,51,51,0.06)",
                            }}
                        />

                        {/* HOME / LOGO */}
                        <button
                            onClick={() => navigateTo("intro")}
                            onMouseEnter={playHoverSound}
                            aria-label="Home"
                            className="w-12 h-12 md:w-16 md:h-16 relative flex items-center justify-center border-r border-white/10 hover:bg-white/5 transition-colors shrink-0 overflow-hidden"
                        >
                            <div className="absolute inset-0 flex items-center justify-center p-2 pl-4 overflow-visible">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/HASEEB.svg"
                                    className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                                    alt="Logo"
                                />
                            </div>
                            {/* tiny pulsing live dot */}
                            <span
                                aria-hidden
                                className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[var(--accent-red)] shadow-[0_0_8px_rgba(255,51,51,0.9)] animate-pulse"
                            />
                        </button>

                        {/* NAV LINKS */}
                        <nav className="flex items-center px-3 md:px-6 gap-3 md:gap-7 text-white/45 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.4em]">
                            {NAV_LINKS.map(({ id, label }) => {
                                const active = activeSection === id;
                                return (
                                    <button
                                        key={id}
                                        onClick={() => navigateTo(id)}
                                        onMouseEnter={playHoverSound}
                                        className={`relative py-4 md:py-5 transition-colors duration-300 group ${
                                            active
                                                ? "text-white"
                                                : "hover:text-[#ff3333]"
                                        }`}
                                    >
                                        <span className="relative z-10 flex items-center gap-1.5">
                                            <span
                                                aria-hidden
                                                className={`inline-block w-1 h-1 rounded-full transition-all duration-300 ${
                                                    active
                                                        ? "bg-[var(--accent-red)] shadow-[0_0_6px_rgba(255,51,51,0.9)] scale-100"
                                                        : "bg-white/0 scale-0"
                                                }`}
                                            />
                                            {label}
                                        </span>
                                        {/* Underline — animates from active state */}
                                        <span
                                            className={`absolute bottom-2 md:bottom-3 left-0 w-full h-px bg-[var(--accent-red)] origin-left transition-transform duration-500 ${
                                                active
                                                    ? "scale-x-100"
                                                    : "scale-x-0 group-hover:scale-x-100"
                                            }`}
                                        />
                                    </button>
                                );
                            })}
                        </nav>

                        {/* AUDIO TOGGLE */}
                        <button
                            data-no-click-sound
                            onClick={toggleAudio}
                            aria-label="Toggle audio"
                            className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center border-l border-white/10 hover:bg-white/5 transition-colors shrink-0"
                        >
                            <style>{`
                                @keyframes eq1 { 0%,100%{height:4px;y:6px} 50%{height:12px;y:2px} }
                                @keyframes eq2 { 0%,100%{height:8px;y:4px} 50%{height:3px;y:6.5px} }
                                @keyframes eq3 { 0%,100%{height:12px;y:2px} 50%{height:5px;y:5.5px} }
                                @keyframes eq4 { 0%,100%{height:6px;y:5px} 50%{height:14px;y:1px} }
                                @keyframes eq5 { 0%,100%{height:3px;y:6.5px} 50%{height:9px;y:3.5px} }
                                .eq-bar { rx:1; fill:white; }
                            `}</style>
                            {isAudioPlaying ? (
                                <svg width="32" height="16" viewBox="0 0 32 16">
                                    <rect className="eq-bar" x="2" y="6" width="3" height="4" style={{ animation: "eq1 0.6s ease-in-out infinite" }} />
                                    <rect className="eq-bar" x="8" y="4" width="3" height="8" style={{ animation: "eq2 0.8s ease-in-out infinite" }} />
                                    <rect className="eq-bar" x="14" y="2" width="3" height="12" style={{ animation: "eq3 0.5s ease-in-out infinite" }} />
                                    <rect className="eq-bar" x="20" y="5" width="3" height="6" style={{ animation: "eq4 0.9s ease-in-out infinite" }} />
                                    <rect className="eq-bar" x="26" y="6.5" width="3" height="3" style={{ animation: "eq5 0.7s ease-in-out infinite" }} />
                                </svg>
                            ) : (
                                <svg width="32" height="16" viewBox="0 0 32 16">
                                    <rect x="2" y="7" width="3" height="2" rx="1" fill="white" fillOpacity="0.3" />
                                    <rect x="8" y="7" width="3" height="2" rx="1" fill="white" fillOpacity="0.3" />
                                    <rect x="14" y="7" width="3" height="2" rx="1" fill="white" fillOpacity="0.3" />
                                    <rect x="20" y="7" width="3" height="2" rx="1" fill="white" fillOpacity="0.3" />
                                    <rect x="26" y="7" width="3" height="2" rx="1" fill="white" fillOpacity="0.3" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* tiny status row underneath */}
                    <div className="hidden md:flex items-center justify-center gap-3 mt-2 font-mono text-[9px] uppercase tracking-[0.4em] text-white/35 pointer-events-none">
                        <span className="text-[var(--accent-red)]">●</span>
                        <span>NAV.SECTION → {activeSection.toUpperCase()}</span>
                    </div>
                </div>
            )}
        </>
    );
}
