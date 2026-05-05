import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

import { playHoverSound } from "../lib/audio";

export default function FloatingNav() {
    const [isVisible] = useState(true);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Remove the CSS 3D rotation effect as we'll use the real Scenę component
    /*
    useEffect(() => {
        if (!rotRef.current) return;
        let frame = 0;
        let raf: number;
        const spin = () => {
            frame += 0.8;
            if (rotRef.current) {
                rotRef.current.style.transform = `rotateY(${frame}deg) rotateX(${Math.sin(frame * 0.01) * 15}deg)`;
            }
            raf = requestAnimationFrame(spin);
        };
        raf = requestAnimationFrame(spin);
        return () => cancelAnimationFrame(raf);
    }, []);
    */

    useEffect(() => {
        if (isVisible && navRef.current) {
            gsap.fromTo(navRef.current,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 2 }
            );
        }
    }, [isVisible]);

    const panTo = (id: string) => {
        window.dispatchEvent(new CustomEvent("panToLandmark", { detail: { id } }));
    };

    const toggleAudio = () => {
        if (!audioRef.current) return;
        if (isAudioPlaying) {
            audioRef.current.pause();
            setIsAudioPlaying(false);
            // Mute the click + sting effects too
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
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[1000] pointer-events-none">
                    <div
                        ref={navRef}
                        className="flex items-center bg-black/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_20px_60px_rgba(0,0,0,0.8)] pointer-events-auto overflow-hidden opacity-0"
                    >
                        <button
                            onClick={() => panTo("intro")}
                            aria-label="Home"
                            className="w-12 h-12 md:w-16 md:h-16 relative flex items-center justify-center border-r border-white/10 hover:bg-white/5 transition-colors shrink-0 overflow-hidden"
                        >
                            <div className="absolute inset-0 flex items-center justify-center p-2 pl-4 overflow-visible">
                                <img src="/HASEEB.svg" className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" alt="Logo" />
                            </div>
                        </button>

                        {/* NAV LINKS */}
                        <nav className="flex items-center px-4 md:px-8 gap-4 md:gap-8 text-white/40 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.4em]">
                            <button
                                onClick={() => panTo("projects")}
                                onMouseEnter={playHoverSound}
                                className="hover:text-[#ff3333] transition-colors py-4 md:py-5 relative group"
                            >
                                PROJECTS
                                <span className="absolute bottom-2 md:bottom-3 left-0 w-full h-px bg-[#ff3333] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                            </button>
                            <button
                                onClick={() => panTo("about")}
                                onMouseEnter={playHoverSound}
                                className="hover:text-[#ff3333] transition-colors py-4 md:py-5 relative group"
                            >
                                ABOUT
                                <span className="absolute bottom-2 md:bottom-3 left-0 w-full h-px bg-[#ff3333] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                            </button>
                            <button
                                onClick={() => window.dispatchEvent(new CustomEvent('triggerCinematicReveal'))}
                                onMouseEnter={playHoverSound}
                                className="hover:text-[#ff3333] transition-colors py-4 md:py-5 relative group"
                            >
                                CONTACT
                                <span className="absolute bottom-2 md:bottom-3 left-0 w-full h-px bg-[#ff3333] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                            </button>
                        </nav>

                        {/* AUDIO */}
                        <button
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
                                .eq-bar.playing { animation-duration: inherit; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }
                            `}</style>
                            {isAudioPlaying ? (
                                <svg width="32" height="16" viewBox="0 0 32 16">
                                    <rect className="eq-bar" x="2" y="6" width="3" height="4" style={{ animation: 'eq1 0.6s ease-in-out infinite' }} />
                                    <rect className="eq-bar" x="8" y="4" width="3" height="8" style={{ animation: 'eq2 0.8s ease-in-out infinite' }} />
                                    <rect className="eq-bar" x="14" y="2" width="3" height="12" style={{ animation: 'eq3 0.5s ease-in-out infinite' }} />
                                    <rect className="eq-bar" x="20" y="5" width="3" height="6" style={{ animation: 'eq4 0.9s ease-in-out infinite' }} />
                                    <rect className="eq-bar" x="26" y="6.5" width="3" height="3" style={{ animation: 'eq5 0.7s ease-in-out infinite' }} />
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
                </div>
            )}
        </>
    );
}
