"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";

/** True on devices with a real pointer (mouse/pen). Server returns false. */
function useFinePointer() {
    return useSyncExternalStore(
        () => () => {},
        () => typeof window !== "undefined" &&
            window.matchMedia &&
            window.matchMedia("(pointer: fine)").matches,
        () => false
    );
}

/**
 * Brutalist reticle cursor — replaces native cursor with a crosshair built
 * from corner ticks + crosshair lines + an instant red lead dot.
 *
 *   ┌      ┐
 *      ╳        ← center crosshair + red dot
 *   └      ┘
 *
 * Default state: white corner brackets, faint cross lines, red center dot.
 * Hover state (over any clickable / role=button / cursor:pointer):
 *   brackets bloom outward and turn red, "OPEN" label slides in beside
 *   the cursor, crosshair lines fade out (target acquired).
 */
export default function Cursor() {
    const dotRef = useRef(null);
    const reticleRef = useRef(null);
    const labelRef = useRef(null);
    const [hidden, setHidden] = useState(true);
    const enabled = useFinePointer();

    useEffect(() => {
        if (!enabled) return;
        const dot = dotRef.current;
        const reticle = reticleRef.current;
        const label = labelRef.current;

        document.body.style.cursor = "none";
        // Also hide on inputs/textareas so the reticle doesn't fight a text caret
        const hideOn = ["a", "button", "input", "textarea", "select"];
        const hideStyle = document.createElement("style");
        hideStyle.textContent = `*, ${hideOn.join(",")} { cursor: none !important; }`;
        document.head.appendChild(hideStyle);

        const moveCursor = (e) => {
            // Lead dot — instant
            gsap.set(dot, { x: e.clientX, y: e.clientY });
            // Reticle — damped follow
            gsap.to(reticle, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.35,
                ease: "power3.out",
            });
            // Label — also damped, but offset to the lower-right of cursor
            gsap.to(label, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
                ease: "power3.out",
            });
            if (hidden) setHidden(false);
        };

        const ACTIVE_LINES = "[data-cursor-line]";
        const ACTIVE_LABEL_ATTR = "data-cursor-label";

        let currentLabel = "";
        const handleHover = (e) => {
            const target = e.target;
            const clickable =
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a, button, [role='button']") ||
                window.getComputedStyle(target).cursor === "pointer";

            if (clickable) {
                // Find the deepest element with a label override
                const labeled = target.closest(`[${ACTIVE_LABEL_ATTR}]`);
                const newLabel = labeled?.getAttribute(ACTIVE_LABEL_ATTR) || "OPEN";
                if (newLabel !== currentLabel && label) {
                    const txt = label.querySelector("[data-cursor-label-text]");
                    if (txt) txt.textContent = newLabel;
                    currentLabel = newLabel;
                }

                gsap.to(reticle, {
                    scale: 1.6,
                    duration: 0.35,
                    ease: "expo.out",
                });
                gsap.to(reticle.querySelectorAll("[data-tick]"), {
                    backgroundColor: "var(--accent-red)",
                    duration: 0.25,
                });
                gsap.to(reticle.querySelectorAll(ACTIVE_LINES), {
                    opacity: 0,
                    duration: 0.25,
                });
                gsap.to(label, {
                    opacity: 1,
                    duration: 0.25,
                });
            } else {
                gsap.to(reticle, {
                    scale: 1,
                    duration: 0.35,
                    ease: "expo.out",
                });
                gsap.to(reticle.querySelectorAll("[data-tick]"), {
                    backgroundColor: "rgba(255,255,255,0.85)",
                    duration: 0.25,
                });
                gsap.to(reticle.querySelectorAll(ACTIVE_LINES), {
                    opacity: 0.45,
                    duration: 0.25,
                });
                gsap.to(label, {
                    opacity: 0,
                    duration: 0.2,
                });
                currentLabel = "";
            }
        };

        const handleClick = () => {
            // Quick red flash on click
            gsap.fromTo(
                reticle.querySelectorAll("[data-tick]"),
                { backgroundColor: "var(--accent-red)" },
                { backgroundColor: "var(--accent-red)", duration: 0.05 }
            );
            gsap.fromTo(
                reticle,
                { scale: 0.7 },
                { scale: 1, duration: 0.4, ease: "back.out(2)" }
            );
        };

        const handleLeave = () => setHidden(true);

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleHover);
        window.addEventListener("mousedown", handleClick);
        window.addEventListener("mouseleave", handleLeave);
        window.addEventListener("blur", handleLeave);

        return () => {
            document.body.style.cursor = "auto";
            hideStyle.remove();
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleHover);
            window.removeEventListener("mousedown", handleClick);
            window.removeEventListener("mouseleave", handleLeave);
            window.removeEventListener("blur", handleLeave);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enabled]);

    // Touch / coarse-pointer device → render nothing at all.
    if (!enabled) return null;

    return (
        <div
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999] mix-blend-difference"
            style={{ opacity: hidden ? 0 : 1, transition: "opacity 0.2s" }}
        >
            {/* RETICLE — corner brackets + crosshair lines (damped) */}
            <div
                ref={reticleRef}
                className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"
                style={{ willChange: "transform" }}
            >
                <div className="relative w-9 h-9">
                    {/* Corner brackets — 4 little ticks */}
                    <span
                        data-tick
                        className="absolute top-0 left-0 w-[8px] h-[2px]"
                        style={{ backgroundColor: "rgba(255,255,255,0.85)" }}
                    />
                    <span
                        data-tick
                        className="absolute top-0 left-0 w-[2px] h-[8px]"
                        style={{ backgroundColor: "rgba(255,255,255,0.85)" }}
                    />
                    <span
                        data-tick
                        className="absolute top-0 right-0 w-[8px] h-[2px]"
                        style={{ backgroundColor: "rgba(255,255,255,0.85)" }}
                    />
                    <span
                        data-tick
                        className="absolute top-0 right-0 w-[2px] h-[8px]"
                        style={{ backgroundColor: "rgba(255,255,255,0.85)" }}
                    />
                    <span
                        data-tick
                        className="absolute bottom-0 left-0 w-[8px] h-[2px]"
                        style={{ backgroundColor: "rgba(255,255,255,0.85)" }}
                    />
                    <span
                        data-tick
                        className="absolute bottom-0 left-0 w-[2px] h-[8px]"
                        style={{ backgroundColor: "rgba(255,255,255,0.85)" }}
                    />
                    <span
                        data-tick
                        className="absolute bottom-0 right-0 w-[8px] h-[2px]"
                        style={{ backgroundColor: "rgba(255,255,255,0.85)" }}
                    />
                    <span
                        data-tick
                        className="absolute bottom-0 right-0 w-[2px] h-[8px]"
                        style={{ backgroundColor: "rgba(255,255,255,0.85)" }}
                    />

                    {/* Crosshair lines — fade out on hover */}
                    <div
                        data-cursor-line
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-px bg-white"
                        style={{ opacity: 0.45 }}
                    />
                    <div
                        data-cursor-line
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-px bg-white"
                        style={{ opacity: 0.45 }}
                    />
                </div>
            </div>

            {/* INSTANT RED LEAD DOT */}
            <div
                ref={dotRef}
                className="absolute top-0 left-0 w-[5px] h-[5px] -translate-x-1/2 -translate-y-1/2"
                style={{
                    backgroundColor: "var(--accent-red)",
                    boxShadow: "0 0 6px rgba(255,51,51,0.6)",
                }}
            />

            {/* HOVER LABEL — outer wrapper tracks cursor, inner span is the
                static offset so the label sits to the lower-right of the
                reticle. textContent is rewritten on hover. */}
            <div
                ref={labelRef}
                className="absolute top-0 left-0 font-mono uppercase pointer-events-none"
                style={{
                    fontSize: "9px",
                    letterSpacing: "0.4em",
                    color: "var(--accent-red)",
                    opacity: 0,
                    willChange: "transform, opacity",
                }}
            >
                <span style={{ display: "inline-block", transform: "translate(18px, 12px)", whiteSpace: "nowrap" }}>
                    <span style={{ marginRight: 6 }}>▮</span>
                    <span data-cursor-label-text>OPEN</span>
                </span>
            </div>
        </div>
    );
}
