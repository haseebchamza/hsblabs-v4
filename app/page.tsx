"use client";
import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import FloatingNav from "@/components/FloatingNav";
import WorkSection from "@/components/WorkSection";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import TabletFooter from "@/components/TabletFooter";
import Cursor from "@/components/Cursor";
import Scene from "@/components/Scene";
import SmoothScroll from "@/components/SmoothScroll";
import ProjectOverlay from "@/components/ProjectOverlay";
import ParticleText from "@/components/ParticleText";
import SectionDivider from "@/components/SectionDivider";
import TechMatrix from "@/components/TechMatrix";
import ServicesSection from "@/components/ServicesSection";
import ContinuityLayer from "@/components/ContinuityLayer";
import BrandTitle from "@/components/BrandTitle";
import AmbientTerrain from "@/components/AmbientTerrain";
import SectionFade from "@/components/SectionFade";
import AboutSection from "@/components/AboutSection";
import ScrollProgress from "@/components/ScrollProgress";
import { PROJECTS } from "@/components/WorkSection";
import { playClick, playBrandSting } from "@/lib/audio";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const BIO_TEXT =
    "I'm Haseeb. I design products in Figma and ship them with code — the careful kind and the AI-assisted kind. I treat every interface as a problem worth thinking through, not a grid to fill. UX flows, design systems, and AI-powered tooling that makes design teams faster — that's the work I keep coming back to.";
const bioWords = BIO_TEXT.split(" ");

export default function Home() {
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
    const selectedProject = PROJECTS.find((p) => p.id === selectedProjectId);

    // Refs for animation
    const heroContainerRef = useRef<HTMLDivElement>(null);
    const hRef = useRef<HTMLDivElement>(null);
    const sIntroRef = useRef<HTMLDivElement>(null);
    const bRef = useRef<HTMLDivElement>(null);
    const typographyLayerRef = useRef<HTMLDivElement>(null);
    const bioRef = useRef<HTMLDivElement>(null);

    // Brutalist HUD state — just the timestamp shown in the hero corner
    const [timeStr, setTimeStr] = useState("00:00:00");

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeStr(new Date().toISOString());
        }, 100);
        return () => clearInterval(interval);
    }, []);

    // ── BRAND AUDIO — sting on first gesture, click on every interactive ───
    useEffect(() => {
        const onFirstGesture = () => {
            playBrandSting();
            window.removeEventListener("scroll", onFirstGesture);
            window.removeEventListener("pointerdown", onFirstGesture);
        };
        window.addEventListener("scroll", onFirstGesture, { passive: true, once: true });
        window.addEventListener("pointerdown", onFirstGesture, { once: true });

        const onClick = (e: MouseEvent) => {
            const t = e.target as HTMLElement | null;
            if (!t) return;
            const interactive = t.closest("a, button, [role='button']");
            if (!interactive) return;
            // Skip the audio-toggle button itself so it doesn't click-on-mute-toggle
            if (interactive.closest("[data-no-click-sound]")) return;
            playClick();
        };
        document.addEventListener("click", onClick, true);

        return () => {
            window.removeEventListener("scroll", onFirstGesture);
            window.removeEventListener("pointerdown", onFirstGesture);
            document.removeEventListener("click", onClick, true);
        };
    }, []);

    useLayoutEffect(() => {
        // Wire Lenis into GSAP ScrollTrigger for the hero's pinned sequence.
        // We do this inline so SmoothScroll stays simple.
        type LenisLike = {
            on: (event: string, cb: (...args: unknown[]) => void) => void;
            off: (event: string, cb: (...args: unknown[]) => void) => void;
            raf: (time: number) => void;
        };
        const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
        let rafCb: ((t: number) => void) | null = null;
        if (lenis) {
            lenis.on("scroll", ScrollTrigger.update);
            rafCb = (t: number) => lenis.raf(t * 1000);
            gsap.ticker.add(rafCb);
            gsap.ticker.lagSmoothing(0);
        }

        const ctx = gsap.context(() => {
            // ─── ACT I — HERO ENTRANCE ─────────────────────────────────
            const hEl = hRef.current;
            const bEl = bRef.current;
            const sIntro = sIntroRef.current;

            if (hEl && bEl && sIntro) {
                gsap.set(hEl, { x: -25, y: "-50%", opacity: 0 });
                gsap.set(sIntro, { x: 0, y: "-50%", opacity: 0 });
                gsap.set(bEl, { x: 25, y: "-50%", opacity: 0 });

                gsap.set(".hero-portrait", { opacity: 0, scale: 0.95 });
                gsap.set(".hero-title", { opacity: 0, y: 20 });

                const introTl = gsap.timeline({ delay: 0.5 });

                introTl.to([hEl, sIntro, bEl], {
                    opacity: 1,
                    duration: 1.5,
                    ease: "power2.out",
                });

                const paddingX = window.innerWidth < 768 ? 40 : 100;
                const edgeDist = window.innerWidth / 2 - paddingX;

                introTl.to(hEl, { x: -edgeDist, duration: 1.8, ease: "power4.inOut" }, "+=0.5");
                introTl.to(bEl, { x: edgeDist, duration: 1.8, ease: "power4.inOut" }, "<");
                introTl.to(sIntro, { opacity: 0, scale: 0.5, duration: 1, ease: "power2.inOut" }, "<0.2");

                introTl.to(".hero-portrait", { opacity: 0.8, scale: 1, duration: 2, ease: "power2.out" }, "-=0.5");
                introTl.to(".hero-title", { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", stagger: 0.1 }, "<0.2");
                introTl.to(".brutalist-decor", { opacity: 1, duration: 1 }, "<");
            }

            // ─── ACT I — HERO PINNED SCROLL SEQUENCE ───────────────────
            gsap.set(".bio-word", { opacity: 0, filter: "blur(10px)" });

            const scrollTl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroContainerRef.current,
                    start: "top top",
                    end: "+=200%", // 2× viewport — snappier than the previous 3000px
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            scrollTl.to(typographyLayerRef.current, {
                y: "-100vh",
                duration: 2,
                ease: "power2.inOut",
            });

            scrollTl.to(".hero-portrait", {
                scale: 0.6,
                duration: 2,
                ease: "power2.inOut",
            }, "<");

            scrollTl.to(bioRef.current, {
                y: 0,
                opacity: 1,
                duration: 2,
                ease: "power3.out",
            }, "-=0.8");

            scrollTl.to(".bio-word", {
                opacity: 1,
                filter: "blur(0px)",
                duration: 4,
                stagger: 0.08,
                ease: "power1.out",
            });

            // Fade portrait before pin releases
            scrollTl.to(".hero-portrait", {
                opacity: 0,
                duration: 1,
                ease: "power2.in",
            }, "-=2");

            // Fade bio out before pin releases so it doesn't bleed into next section
            scrollTl.to(bioRef.current, {
                opacity: 0,
                duration: 1,
                ease: "power2.in",
            });

            scrollTl.to({}, { duration: 0.5 });

            // Section title pop-ins (Selected Works heading, etc.) handled per-component
        }, heroContainerRef);

        return () => {
            ctx.revert();
            if (rafCb) gsap.ticker.remove(rafCb);
            const l = (window as unknown as { __lenis?: LenisLike }).__lenis;
            if (l && rafCb) l.off("scroll", ScrollTrigger.update);
        };
    }, []);

    const handleProjectClick = (projectId: string) => {
        setSelectedProjectId(projectId);
    };

    const handleCloseProject = () => {
        setSelectedProjectId(null);
    };

    return (
        <SmoothScroll>
            <main className="relative w-full overflow-x-clip bg-[#050505] text-white">

                {/* Ambient backdrop */}
                <div className="ambient-canvas">
                    <AmbientTerrain />
                </div>

                {/* Persistent edge decorations: left coordinate rail, right red
                    tick column, corner ticks, top-right UTC clock. */}
                <ContinuityLayer />

                {/* ── PERSISTENT HUD ──────────────────────────────────── */}
                <Cursor />
                <div
                    className="hud-element transition-opacity duration-500"
                    style={{
                        opacity: selectedProjectId ? 0 : 1,
                        pointerEvents: selectedProjectId ? "none" : "auto",
                    }}
                >
                    <FloatingNav />
                    <ScrollProgress />
                </div>

                {/* ─────────────────────────────────────────────────────── */}
                {/* ACT I — INVOCATION                                      */}
                {/* ─────────────────────────────────────────────────────── */}
                <section
                    id="intro"
                    ref={heroContainerRef}
                    className="section-shell h-screen w-full"
                    style={{ zIndex: 10 }}
                >
                    {/* Portrait */}
                    <div className="hero-portrait absolute left-1/2 top-1/2 md:top-[40%] -translate-x-1/2 -translate-y-1/2 w-[80vw] md:w-[30vw] h-[55vh] md:h-[58vh] z-0 opacity-0 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/portrait.png"
                            className="w-full h-full object-contain filter grayscale contrast-125"
                            alt="Haseeb Hamza Portrait"
                        />
                    </div>

                    {/* Bio Paragraph */}
                    <div
                        ref={bioRef}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] md:w-[80vw] max-w-[1100px] max-h-[60vh] overflow-hidden text-center text-base md:text-2xl lg:text-[28px] font-light leading-snug text-white translate-y-[30vh] opacity-0 z-10 pointer-events-none"
                        style={{
                            fontFamily: '"Neue Machina", var(--font-anton), Arial, sans-serif',
                            letterSpacing: "-0.01em",
                        }}
                    >
                        {bioWords.map((word, i) => (
                            <span
                                key={i}
                                className="bio-word inline-block mr-[0.25em] mb-0.5 will-change-[filter,opacity]"
                            >
                                {word}
                            </span>
                        ))}
                    </div>

                    <div ref={typographyLayerRef} className="absolute inset-0 z-30 pointer-events-none">
                        <div
                            className="absolute inset-0 mix-blend-difference flex flex-col justify-center items-center text-white tracking-[-2px] leading-none uppercase"
                            style={{ fontFamily: '"Neue Machina", "Arial Black", Arial, sans-serif', fontWeight: 900 }}
                        >
                            {/* Line 1 */}
                            <div className="hero-title flex items-center justify-center gap-x-2 md:gap-x-4 transform -translate-x-4 md:-translate-x-12 opacity-0 w-full h-[110px] md:h-[170px]">
                                <span className="text-4xl md:text-[5.5vw]">I</span>
                                <div className="w-[160px] md:w-[460px] h-full flex items-center justify-center">
                                    <ParticleText text="DESIGN" />
                                </div>
                                <span className="text-4xl md:text-[5.5vw]">& CODE</span>
                            </div>
                            {/* Line 2 */}
                            <div className="hero-title flex items-center justify-center opacity-0 mt-0 text-4xl md:text-[5.5vw] whitespace-nowrap">
                                <span>FROM LOGIC TO</span>
                            </div>
                            {/* Line 3 — with the 3D pointer mark next to INTERFACE. */}
                            <div className="hero-title transform translate-x-2 md:translate-x-8 opacity-0 mt-0 flex items-center justify-center gap-x-3 md:gap-x-4 text-4xl md:text-[5.5vw] whitespace-nowrap">
                                <div className="w-[80px] md:w-[140px] h-[80px] md:h-[140px] relative flex items-center justify-center overflow-visible">
                                    <Scene className="w-full h-full relative" scale={0.5} autoRotate={false} />
                                </div>
                                <span>INTERFACE.</span>
                            </div>
                        </div>

                        <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 max-w-[280px] md:max-w-[400px] brutalist-decor">
                            <p className="text-xs md:text-sm leading-tight text-white/80 uppercase font-mono font-bold tracking-widest">
                                PRODUCT DESIGNER · AI BUILDER <br />
                                <span className="text-[#ff3333] mr-2">{"//"}</span>
                                FIGMA, DESIGN SYSTEMS, AND AI WORKFLOWS THAT ACTUALLY SHIP.
                            </p>
                        </div>
                    </div>

                    {/* H S B Letters */}
                    <div className="absolute inset-0 z-40 pointer-events-none mix-blend-difference text-white">
                        <div ref={hRef} className="absolute left-1/2 top-1/2 font-mono text-base md:text-xl font-black will-change-transform">H</div>
                        <div ref={sIntroRef} className="absolute left-1/2 top-1/2 font-mono text-base md:text-xl font-black will-change-transform -translate-x-1/2">S</div>
                        <div ref={bRef} className="absolute left-1/2 top-1/2 font-mono text-base md:text-xl font-black will-change-transform">B</div>
                    </div>

                    <div className="brutalist-decor opacity-0 font-mono text-[9px] md:text-[11px] text-white/60 uppercase font-bold tracking-widest z-40 pointer-events-none">
                        <div className="absolute top-8 left-8 md:top-12 md:left-12 flex flex-col gap-1">
                            <span className="text-[#ff3333]">SYS.STATUS: ONLINE</span>
                            <span>{timeStr}</span>
                        </div>
                        <div className="absolute top-8 right-8 md:top-12 md:right-12 text-right flex flex-col gap-1">
                            <span>COORD: 25.2048° N, 55.2708° E</span>
                            <span>CPU_UTIL: 14.8% // MEM: 244MB</span>
                        </div>
                        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-right flex flex-col gap-1">
                            <span className="text-[#ff3333]">REND_PASS: 0x0A4F</span>
                            <span>UX_ENGINE: V4.0</span>
                        </div>
                    </div>
                </section>

                {/* Stage container — transparent so AmbientTerrain shows
                    through. Each child section uses its own .section-shell.
                    Must NOT have overflow:hidden or it would break sticky
                    positioning inside ServicesSection. */}
                <div className="relative z-20 text-white">

                    {/* ── ACT II — ABOUT ───────────────────────────────── */}
                    <SectionFade>
                        <SectionDivider
                            act="II"
                            title="ABOUT"
                            accent="THE DESIGNER"
                            kicker="UI/UX, Figma-first, and an AI builder by night. Designing products and shipping the systems that scale them."
                            variant="red"
                        />
                        <AboutSection />
                    </SectionFade>

                    {/* ── ACT III — TECH STACK ─────────────────────────── */}
                    <SectionFade>
                        <SectionDivider
                            act="III"
                            title="TECH"
                            accent="STACK"
                            kicker="The tools I reach for daily — design, frontend, and AI."
                        />
                        <TechMatrix />
                    </SectionFade>

                    {/* ── ACT IV — SERVICES (pinned, no fade wrapper) ───── */}
                    <SectionFade>
                        <SectionDivider
                            act="IV"
                            title="SERVICES"
                            accent="OFFER"
                            kicker="Five engagement modes — from product design to AI workflows. Scroll to step through them."
                            variant="red"
                        />
                    </SectionFade>
                    <ServicesSection />

                    {/* ── ACT V — SELECTED WORKS ───────────────────────── */}
                    <SectionFade>
                        <SectionDivider
                            act="V"
                            title="SELECTED"
                            accent="WORKS"
                            kicker="A curated archive of recent work. Click any tile to enter the case."
                        />
                        <section id="projects" className="section-shell w-full">
                            <div className="max-w-[1600px] mx-auto px-6 md:px-10 pt-4 md:pt-8 pb-16 md:pb-24">
                                <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-white/15 pb-3 gap-3">
                                    <BrandTitle
                                        kicker="VOL. 2024 — 2026"
                                        primary="INDEX"
                                        accent="0001"
                                        accentFilled
                                        size="large"
                                        inline
                                    />
                                    <span className="font-mono text-[10px] md:text-xs text-white/55 uppercase tracking-[0.4em] mt-4 md:mt-0">
                                        {PROJECTS.length} CASE_FILES
                                    </span>
                                </div>
                                <WorkSection onProjectOpen={handleProjectClick} />
                            </div>
                        </section>
                    </SectionFade>

                    {/* ── ACT VI — ARCHIVE ─────────────────────────────── */}
                    <SectionFade>
                        <SectionDivider
                            act="VI"
                            title="EXPERIENCE"
                            accent="ARCHIVE"
                            kicker="A working record — design, product, and the side of the work that runs in production."
                            variant="red"
                        />
                        <ExperienceTimeline />
                    </SectionFade>

                    {/* ── ACT VII — UPLINK ─────────────────────────────── */}
                    <SectionFade>
                        <SectionDivider
                            act="VII"
                            title="OPEN"
                            accent="UPLINK"
                            kicker="Available for new collaborations. Response within 24 hours."
                        />
                        <div id="contact">
                            <TabletFooter />
                        </div>
                    </SectionFade>
                </div>

                <AnimatePresence>
                    {selectedProject && (
                        <ProjectOverlay project={selectedProject} onClose={handleCloseProject} />
                    )}
                </AnimatePresence>
            </main>
        </SmoothScroll>
    );
}
