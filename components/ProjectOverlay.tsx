"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

interface ProjectOverlayProps {
    project: any;
    onClose: () => void;
}

export default function ProjectOverlay({ project, onClose }: ProjectOverlayProps) {
    const [phase, setPhase] = useState<"opening" | "fading" | "done">("opening");

    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        container: containerRef,
        target: heroRef,
        offset: ["start start", "end start"]
    });
    
    // Parallax effect for hero image
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    useEffect(() => {
        document.body.style.overflow = "hidden";

        const t1 = setTimeout(() => setPhase("fading"), 1200);
        const t2 = setTimeout(() => setPhase("done"), 1800);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            document.body.style.overflow = "auto";
        };
    }, []);

    if (!project) return null;

    return (
        <div className="fixed inset-0 z-[5000] bg-[#0a0a0a] text-[#e8e8e8] selection:bg-white selection:text-black overflow-hidden font-sans">
            
            {/* ARCHIVAL GRAIN OVERLAY */}
            <div
                className="absolute inset-0 pointer-events-none z-[100] opacity-[0.04] mix-blend-overlay"
                style={{ backgroundImage: "url('/Book textures/Paper Texture.jpg')", backgroundSize: "400px" }}
            />

            {/* ── FOLDER-OPENING INTRO OVERLAY ──────────────────────────────── */}
            <AnimatePresence>
                {phase !== "done" && (
                    <motion.div
                        key="folder-overlay"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: phase === "fading" ? 0 : 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="fixed inset-0 z-[5100] flex items-center justify-center bg-[#0a0a0a] pointer-events-none"
                    >
                        <div className="relative flex flex-col items-center select-none scale-75 md:scale-100">
                            {/* Folder tab */}
                            <motion.div
                                initial={{ y: 0 }}
                                animate={{ y: phase === "fading" ? -8 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="w-32 h-8 bg-[#1a1a1a] rounded-t-lg border border-white/10 self-start ml-6"
                            />

                            <div className="relative w-[240px] h-[180px]">
                                {/* Back of folder */}
                                <div
                                    className="absolute inset-0 rounded-sm bg-[#111] border border-white/10"
                                    style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.5)" }}
                                />

                                {/* Front cover */}
                                <motion.div
                                    initial={{ rotateX: 0, transformOrigin: "top center" }}
                                    animate={{
                                        rotateX: phase === "fading" ? -95 : 0,
                                        transformOrigin: "top center",
                                    }}
                                    transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                                    className="absolute inset-0 rounded-sm bg-[#1a1a1a] border border-white/10 flex items-center justify-center backdrop-blur-md"
                                >
                                    <div className="flex flex-col items-center gap-2 opacity-80">
                                        <span className="text-[8px] uppercase tracking-[0.4em] font-mono text-white/50">
                                            {project.category}
                                        </span>
                                        <span className="text-xl font-black uppercase tracking-tighter text-white">
                                            {project.title}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-4 left-6 right-6 flex flex-col gap-1.5 opacity-20">
                                        {[...Array(4)].map((_, i) => (
                                            <div key={i} className="h-px bg-white" />
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Sheets inside folder */}
                                <motion.div
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: phase === "fading" ? 1 : 0, y: phase === "fading" ? 0 : 4 }}
                                    transition={{ duration: 0.3, delay: 0.25 }}
                                    className="absolute inset-x-2 top-2 bottom-0 bg-[#222] rounded-sm border border-white/10 shadow-lg"
                                />
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: phase === "fading" ? 0.6 : 0, y: phase === "fading" ? 4 : 8 }}
                                    transition={{ duration: 0.3, delay: 0.15 }}
                                    className="absolute inset-x-4 top-4 bottom-0 bg-[#333] rounded-sm border border-white/5 shadow-lg"
                                />
                            </div>

                            {/* Caption below */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 1.2, times: [0, 0.3, 1] }}
                                className="mt-6 text-[9px] uppercase tracking-[0.5em] font-mono text-[#00c878]"
                            >
                                Decrypting dossier...
                            </motion.p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── MAIN CONTENT ──────────────────────────────────────────────── */}
            <motion.main
                ref={containerRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === "done" ? 1 : 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="h-full overflow-y-auto pb-32"
            >
                {/* NAV */}
                <nav className="sticky top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50 mix-blend-difference text-white">
                    <button
                        onClick={onClose}
                        className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-mono"
                    >
                        <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                            ←
                        </span>
                        <span className="hidden sm:inline">Back to System</span>
                        <span className="sm:hidden">Back</span>
                    </button>
                    <div className="hidden md:block">
                        <span className="text-[10px] uppercase tracking-[0.4em] font-mono opacity-50">
                            Registry Vol. 25-04
                        </span>
                    </div>
                </nav>

                {/* HERO - PARALLAX FULL BLEED */}
                <header ref={heroRef} className="relative w-full h-[90vh] overflow-hidden flex items-end md:items-center -mt-24 md:-mt-32 pt-24 md:pt-32">
                    <motion.div style={{ y, opacity }} className="absolute inset-0">
                        <Image
                            src={project.img || project.image}
                            alt={project.title}
                            fill
                            priority
                            className="object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
                    </motion.div>

                    <div className="relative z-10 w-full px-6 md:px-10 pb-12 md:pb-0">
                        <motion.div
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <span className="px-4 py-1.5 border border-white/20 rounded-full text-[9px] md:text-[10px] uppercase font-mono tracking-widest text-white/80 backdrop-blur-md mb-6 inline-block">
                                {project.category}
                            </span>
                            <h1 className="text-[12vw] md:text-[10vw] font-black uppercase tracking-tighter leading-[0.85] text-white drop-shadow-2xl mix-blend-overlay">
                                {project.title}
                            </h1>
                        </motion.div>
                    </div>
                </header>

                {/* CONTENT GRID */}
                <section className="max-w-[1400px] mx-auto mt-16 md:mt-32 px-6 md:px-10">
                    <div className="flex flex-col md:flex-row gap-16 md:gap-24">

                        {/* LEFT: Sticky Metadata */}
                        <aside className="md:w-1/3 md:sticky md:top-32 h-fit flex flex-col gap-10 md:gap-14">
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, root: containerRef }}
                                transition={{ duration: 0.6 }}
                                className="flex flex-col gap-3 border-l-[3px] border-[#00c878]/50 pl-6 md:pl-8 group hover:border-[#00c878] transition-colors"
                            >
                                <span className="text-[10px] uppercase tracking-[0.3em] font-mono opacity-40 group-hover:opacity-100 transition-opacity">Role</span>
                                <p className="text-xl md:text-2xl font-bold uppercase tracking-tight text-white/90">Design Engineer</p>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, root: containerRef }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="flex flex-col gap-3 border-l-[3px] border-white/10 pl-6 md:pl-8 group hover:border-white/40 transition-colors"
                            >
                                <span className="text-[10px] uppercase tracking-[0.3em] font-mono opacity-40 group-hover:opacity-100 transition-opacity">Stack</span>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {(project as any).tech?.map((t: string) => (
                                        <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[10px] md:text-[11px] font-mono uppercase tracking-wider text-white/80 hover:bg-white/10 transition-colors">{t}</span>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, root: containerRef }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="flex flex-col gap-3 border-l-[3px] border-white/10 pl-6 md:pl-8 group hover:border-white/40 transition-colors"
                            >
                                <span className="text-[10px] uppercase tracking-[0.3em] font-mono opacity-40 group-hover:opacity-100 transition-opacity">Metrics</span>
                                <div className="grid grid-cols-2 gap-6 mt-2">
                                    {Object.entries((project as any).stats || {}).map(([key, val], i) => (
                                        <div key={key}>
                                            <p className="text-3xl md:text-4xl font-black tracking-tighter text-white">{val as string}</p>
                                            <p className="text-[8px] md:text-[9px] uppercase tracking-widest font-mono opacity-50 mt-1">{key.replace(/_/g, ' ')}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </aside>

                        {/* RIGHT: Narrative */}
                        <div className="md:w-2/3 flex flex-col gap-20 md:gap-32">
                            <motion.article
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, root: containerRef }}
                                transition={{ duration: 0.8 }}
                            >
                                <h2 className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#00c878] mb-6">
                                    // 01. Concept & Execution
                                </h2>
                                <p className="text-xl md:text-4xl leading-tight text-white/90 font-medium tracking-tight">
                                    {(project as any).overview}
                                </p>
                            </motion.article>

                            {/* CHALLENGE */}
                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, root: containerRef }}
                                transition={{ duration: 0.8 }}
                                className="flex flex-col md:flex-row gap-6 md:gap-12 border-t border-white/10 pt-12 md:pt-16 group"
                            >
                                <h3 className="md:w-1/3 text-[10px] uppercase font-mono tracking-[0.4em] text-white/30 group-hover:text-white/60 transition-colors shrink-0">
                                    // 02. The Challenge
                                </h3>
                                <p className="md:w-2/3 text-lg md:text-2xl text-white/70 leading-relaxed font-medium">
                                    {(project as any).challenge}
                                </p>
                            </motion.div>

                            {/* STRATEGY */}
                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, root: containerRef }}
                                transition={{ duration: 0.8 }}
                                className="flex flex-col md:flex-row gap-6 md:gap-12 border-t border-white/10 pt-12 md:pt-16 group"
                            >
                                <h3 className="md:w-1/3 text-[10px] uppercase font-mono tracking-[0.4em] text-[#00c878] shrink-0">
                                    // 03. The Strategy
                                </h3>
                                <p className="md:w-2/3 text-lg md:text-2xl text-white/90 leading-relaxed font-medium">
                                    {(project as any).solution}
                                </p>
                            </motion.div>

                            {/* BEHANCE LINK */}
                            {(project as any).behance && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, root: containerRef }}
                                    transition={{ duration: 0.5 }}
                                    className="mt-8"
                                >
                                    <a 
                                        href={(project as any).behance} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="group relative inline-flex items-center gap-4 px-8 py-5 bg-white text-black font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs rounded-full overflow-hidden"
                                    >
                                        <span className="relative z-10 group-hover:text-white transition-colors duration-500">View Case Study</span>
                                        <svg className="relative z-10 group-hover:text-white transition-colors duration-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                        <div className="absolute inset-0 bg-[#00c878] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                                    </a>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </section>

                {/* CYBER HUD DECORATION */}
                <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 pointer-events-none opacity-30 hidden sm:block mix-blend-difference">
                    <p className="text-[9px] md:text-[10px] font-mono whitespace-pre text-white text-right leading-relaxed">
                        {`SYS_ID: ${project.id.toUpperCase()}\nREND_STAT: OPTIMIZED\nENC_LVL: ALPHA`}
                    </p>
                </div>

                {/* FOOTER */}
                <footer className="mt-32 md:mt-48 pt-20 pb-20 px-4 border-t border-white/5 relative overflow-hidden flex flex-col items-center">
                    <button
                        onClick={onClose}
                        className="relative z-10 mt-10 px-6 py-3 border border-white/20 rounded-full text-[9px] uppercase font-mono tracking-widest text-white/50 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                    >
                        Return to System
                    </button>
                </footer>
            </motion.main>
        </div>
    );
}
