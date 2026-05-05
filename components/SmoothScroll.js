"use client";
import { ReactLenis, useLenis } from "lenis/react";
import 'lenis/dist/lenis.css';
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * Exposes the Lenis instance on window.__lenis and wires it into GSAP
 * ScrollTrigger. This keeps the hero's pinned section working while
 * the rest of the page uses CSS sticky + Framer Motion.
 */
function LenisBridge() {
    const lenis = useLenis(() => {
        ScrollTrigger.update();
    });

    useEffect(() => {
        if (!lenis) return;
        window.__lenis = lenis;

        const rafCb = (time) => lenis.raf(time * 1000);
        gsap.ticker.add(rafCb);
        gsap.ticker.lagSmoothing(0);

        const onLoad = () => ScrollTrigger.refresh();
        window.addEventListener("load", onLoad);
        const tid = setTimeout(() => ScrollTrigger.refresh(), 400);

        return () => {
            gsap.ticker.remove(rafCb);
            window.removeEventListener("load", onLoad);
            clearTimeout(tid);
            delete window.__lenis;
        };
    }, [lenis]);

    return null;
}

export default function SmoothScroll({ children }) {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.12,
                duration: 1.2,
                smoothWheel: true,
                wheelMultiplier: 0.9,
                touchMultiplier: 1.5,
                syncTouch: true,
                prevent: (node) => node.dataset.lenisPrevent !== undefined,
            }}
        >
            <LenisBridge />
            {children}
        </ReactLenis>
    );
}
