"use client";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GalleryTrack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Setup Horizontal ScrollTrigger
    const track = trackRef.current;
    const bg = backgroundRef.current;
    const fg = foregroundRef.current;
    const container = containerRef.current;

    if (!track || !bg || !fg || !container) return;

    // We want the total scrollable distance to match the width of the track minus the viewport
    // but give it some extra padding so it doesn't end abruptly
    const totalWidth = track.scrollWidth - window.innerWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1, // Smooth scrubbing
        start: "top top",
        end: () => `+=${totalWidth}`, // scroll distance equals track length
        onUpdate: (self) => {
          setProgress(self.progress);
        }
      }
    });

    // Animate the main gallery walls (standard move)
    tl.to(track, {
      x: -totalWidth,
      ease: "none"
    }, 0);

    // Animate background grid (slow move - translates 50% of track)
    tl.to(bg, {
      x: -(totalWidth * 0.5),
      ease: "none"
    }, 0);

    // Animate foreground elements (fast move - translates 150% of track)
    tl.to(fg, {
      x: -(totalWidth * 1.5),
      ease: "none"
    }, 0);

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#111] text-white">
      
      {/* Background Grid Layer (Slow) */}
      <div 
        ref={backgroundRef} 
        className="absolute top-0 left-0 h-full w-[200vw] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }}
      />

      {/* Character Anchor (Fixed in center) */}
      <div 
        id="character-anchor" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-dashed border-[#ff4444]/50 z-40 flex items-center justify-center backdrop-blur-sm pointer-events-none"
      >
        <div className="text-center">
          <span className="block text-[#ff4444] text-xs font-mono uppercase tracking-widest">Character Anchor</span>
          <span className="block text-white/30 text-[10px] font-mono mt-2">(1:1 Placeholder)</span>
        </div>
      </div>

      {/* Gallery Walls / Main Track (Standard) */}
      <div 
        ref={trackRef} 
        className="absolute top-0 left-0 h-full flex items-center px-[20vw] z-20 gap-32 w-max"
      >
        {/* Hero Section */}
        <div className="w-screen flex-shrink-0 flex flex-col justify-center px-12">
          <h1 className="text-[10vw] font-black uppercase leading-none tracking-[-0.05em]">H S B</h1>
          <p className="text-xl text-white/50 font-mono mt-4 tracking-[0.2em]">Horizontal Gallery v4</p>
          <div className="mt-12 flex items-center gap-4 text-sm text-white/30 font-mono tracking-widest">
            <span className="w-12 h-[1px] bg-white/30 block"></span>
            Scroll to explore
          </div>
        </div>

        {/* Project Gallery Portals */}
        <ProjectPortal title="Provident Portal" image="/Bingo.png" />
        <ProjectPortal title="Themeseed Toolkit" image="/themeseed.png" />
        <ProjectPortal title="Space Explorer" image="/Bingo.png" />

        {/* Footer/Contact Section */}
        <div className="w-screen flex-shrink-0 flex flex-col justify-center items-center pr-[20vw]">
          <h2 className="text-[6vw] font-black uppercase tracking-tight">Let's Connect</h2>
          <a href="mailto:hello@hsblabs.space" className="mt-8 px-12 py-6 bg-white text-black font-mono text-sm uppercase tracking-widest hover:bg-[#ff4444] hover:text-white transition-all duration-300">
            Get in touch
          </a>
        </div>
      </div>

      {/* Foreground Elements (Fast) */}
      <div 
        ref={foregroundRef}
        className="absolute top-0 left-0 h-full w-[300vw] pointer-events-none z-50 flex items-end pb-20 gap-[50vw]"
      >
        <div className="w-32 h-64 bg-black/80 backdrop-blur-xl border border-white/10 ml-[20vw] rounded-t-full shadow-2xl" />
        <div className="w-64 h-32 bg-black/80 backdrop-blur-xl border border-white/10 rounded-t-3xl shadow-2xl" />
        <div className="w-48 h-96 bg-black/80 backdrop-blur-xl border border-white/10 rounded-t-full shadow-2xl" />
      </div>

      {/* Progress HUD */}
      <div className="fixed bottom-8 right-8 z-[100] font-mono text-[10px] uppercase tracking-widest text-white/50 bg-black/50 px-4 py-2 border border-white/10 backdrop-blur-md">
        Progress: {(progress * 100).toFixed(0)}%
      </div>

    </div>
  );
}

function ProjectPortal({ title, image }: { title: string, image: string }) {
  const portalRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleZoom = () => {
    if (!wrapperRef.current || !portalRef.current) return;
    
    // GSAP Zoom-in Interaction
    const tl = gsap.timeline();
    
    // Get viewport center
    const rect = wrapperRef.current.getBoundingClientRect();
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Calculate distance to center
    const dx = centerX - (rect.left + rect.width / 2);
    const dy = centerY - (rect.top + rect.height / 2);

    tl.to(wrapperRef.current, {
      x: dx,
      y: dy,
      scale: 3.5,
      zIndex: 100, // bring to front
      duration: 1.2,
      ease: "expo.inOut",
      onComplete: () => {
        console.log(`Routed to ${title}`);
        // Reset for demo purposes
        setTimeout(() => {
          tl.reverse();
        }, 1000);
      }
    });
    
    // Fade out surrounding content (optional cinematic touch)
    gsap.to(".project-portal", {
      opacity: 0.1,
      duration: 1,
      stagger: 0.1
    });
    gsap.to(wrapperRef.current, {
      opacity: 1, // Keep clicked portal visible
      duration: 0
    });
  };

  return (
    <div className="project-portal w-[60vw] md:w-[40vw] h-[60vh] flex-shrink-0 flex items-center justify-center relative group perspective-[1000px]">
      <div 
        ref={wrapperRef}
        onClick={handleZoom}
        className="w-full h-full border-[1px] border-white/10 bg-black/60 backdrop-blur-md cursor-pointer transition-all duration-700 hover:border-white/40 hover:bg-black/80 relative overflow-hidden flex flex-col items-center justify-center shadow-2xl hover:shadow-[0_0_50px_rgba(255,255,255,0.05)] transform-style-3d group-hover:rotate-y-[-2deg] group-hover:rotate-x-[2deg]"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Portal "Artwork" / Image */}
        <div className="w-1/2 h-1/2 relative transform translate-z-12 group-hover:scale-110 transition-transform duration-1000 ease-out">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-contain opacity-40 group-hover:opacity-100 transition-opacity duration-700 filter grayscale group-hover:grayscale-0" 
          />
        </div>

        {/* Portal Metadata */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end transform translate-z-8">
          <div>
            <h3 className="text-xl md:text-3xl font-black uppercase tracking-widest">{title}</h3>
            <div className="h-[1px] w-0 bg-white group-hover:w-full transition-all duration-700 ease-out mt-4" />
          </div>
          <p className="text-white/40 font-mono text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
            [ Click to Enter ]
          </p>
        </div>
      </div>
    </div>
  );
}
