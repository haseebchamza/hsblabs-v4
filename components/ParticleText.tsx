"use client";
import React, { useEffect, useRef, useState } from "react";
import { useIsBelow } from "../lib/useViewport";

/** Pixel width below which we skip the particle canvas entirely and just
 *  render plain text. Mobile + tablet portrait fall under this. */
const PARTICLE_BREAKPOINT = 1024;

export default function ParticleText({ text = "© HBC" }: { text?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // Tracks client-side mount. Lazy initialiser is true on the client
  // and false during SSR — avoids both hydration mismatch and the
  // React 19 "setState in effect" lint rule.
  const [mounted] = useState<boolean>(() => typeof window !== "undefined");
  // Skip canvas entirely on mobile / tablet → plain text.
  const isSmall = useIsBelow(PARTICLE_BREAKPOINT);
  const useParticles = mounted && !isSmall;

  useEffect(() => {
    if (!mounted || !useParticles) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    type Particle = {
      x: number; y: number;
      originX: number; originY: number;
      vx: number; vy: number;
    };
    let particles: Particle[] = [];
    const mouse = { x: -9000, y: -9000 };
    let animationFrameId: number;
    let cancelled = false;

    const W = 2500; // Increased width to prevent clipping
    const H = 800;  // Increased height to prevent clipping

    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    ctx.scale(dpr, dpr);

    const initParticles = () => {
      particles = [];
      ctx.clearRect(0, 0, W, H);

      ctx.fillStyle = "white";
      const baseSize = window.innerWidth < 768 ? 250 : 650;
      const lengthFactor = Math.min(1, 10 / text.length);
      const fontSize = baseSize * lengthFactor;

      // Neue Machina Black — falls back to Arial Black if the woff2 hasn't loaded
      ctx.font = `900 ${fontSize}px "Neue Machina", "Arial Black", Arial, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, W / 2, H / 2);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      const gap = 30; // Reduced gap for more refined but still chunky dots
      const scaledGap = Math.floor(gap * dpr);

      for (let y = 0; y < canvas.height; y += scaledGap) {
        for (let x = 0; x < canvas.width; x += scaledGap) {
          const index = (y * canvas.width + x) * 4;
          const alpha = data[index + 3];

          if (alpha > 128) {
            particles.push({
              x: (x / dpr) + (Math.random() - 0.5) * 5,
              y: (y / dpr) + (Math.random() - 0.5) * 5,
              originX: x / dpr,
              originY: y / dpr,
              vx: 0,
              vy: 0,
            });
          }
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const r_normal = 8; // Reduced dot size to prevent blob-like overlap

      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.beginPath();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 120;

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          p.vx -= (dx / dist) * force * 5;
          p.vy -= (dy / dist) * force * 5;
        }

        p.vx += (p.originX - p.x) * 0.04;
        p.vy += (p.originY - p.y) * 0.04;
        p.vx *= 0.88;
        p.vy *= 0.88;
        p.x += p.vx;
        p.y += p.vy;

        const dx_origin = p.originX - p.x;
        const dy_origin = p.originY - p.y;
        const distFromOrigin = Math.sqrt(dx_origin * dx_origin + dy_origin * dy_origin);

        if (distFromOrigin < 2) {
          ctx.moveTo(p.x + r_normal, p.y);
          ctx.arc(p.x, p.y, r_normal, 0, Math.PI * 2);
        }
      }
      ctx.fill();

      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx_origin = p.originX - p.x;
        const dy_origin = p.originY - p.y;
        const distFromOrigin = Math.sqrt(dx_origin * dx_origin + dy_origin * dy_origin);

        if (distFromOrigin >= 2) {
          ctx.moveTo(p.x + r_normal, p.y);
          ctx.arc(p.x, p.y, r_normal, 0, Math.PI * 2);
        }
      }
      ctx.fill();
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) * (W / rect.width);
      mouse.y = (e.clientY - rect.top) * (H / rect.height);
    };

    const handleResize = () => {
      initParticles();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Wait for the @font-face Neue Machina Black to be ready BEFORE
    // rasterising — otherwise canvas falls back to Arial and the dots are
    // shaped from the wrong glyphs.
    const start = () => {
      initParticles();
      draw();
    };
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts
        .load(`900 16px "Neue Machina"`)
        .then(() => {
          if (!cancelled) start();
        })
        .catch(() => {
          if (!cancelled) start();
        });
    } else {
      start();
    }

    return () => {
      cancelled = true;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted, useParticles, text]);

  if (!mounted) return <div className="w-full h-full" />;

  // Mobile / tablet → static styled text, no canvas, no rAF, no listeners.
  if (!useParticles) {
    return (
      <div className="w-full h-full flex items-center justify-center pointer-events-none">
        <span
          className="leading-none"
          style={{
            fontFamily: '"Neue Machina", "Arial Black", Arial, sans-serif',
            fontWeight: 900,
            fontSize: "inherit",
            letterSpacing: "-0.02em",
            color: "white",
          }}
        >
          {text}
        </span>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center pointer-events-auto">
      <canvas
        ref={canvasRef}
        className="w-full max-w-[2500px] h-auto outline-none drop-shadow-md"
        style={{ touchAction: 'none' }}
      />
    </div>
  );
}