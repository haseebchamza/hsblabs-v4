// Lightweight audio module — preload click + brand sting once and
// play them efficiently. All effects respect a window-scoped mute flag
// (`window.__hsbMuted`) so the FloatingNav audio button can disable them.

let clickEl: HTMLAudioElement | null = null;
let stingEl: HTMLAudioElement | null = null;
let stingPlayed = false;

declare global {
    interface Window {
        __hsbMuted?: boolean;
        AudioContext: typeof AudioContext;
        webkitAudioContext?: typeof AudioContext;
    }
}

const isMuted = () =>
    typeof window !== "undefined" && window.__hsbMuted === true;

const ensureClick = () => {
    if (typeof window === "undefined") return null;
    if (!clickEl) {
        clickEl = new Audio("/click.mp3");
        clickEl.volume = 0.35;
        clickEl.preload = "auto";
    }
    return clickEl;
};

const ensureSting = () => {
    if (typeof window === "undefined") return null;
    if (!stingEl) {
        stingEl = new Audio("/brand-sting.mp3");
        stingEl.volume = 0.4;
        stingEl.preload = "auto";
    }
    return stingEl;
};

/** Soft synthesised hover blip — kept for backwards compatibility. */
export const playHoverSound = () => {
    if (typeof window === "undefined" || isMuted()) return;
    try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return;
        const ctx = new Ctx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    } catch {
        /* ignore — autoplay policy */
    }
};

/** Crisp brutalist click — fires on every interactive click. */
export const playClick = () => {
    if (isMuted()) return;
    const el = ensureClick();
    if (!el) return;
    try {
        // Restart from the top so back-to-back clicks each get a hit
        el.currentTime = 0;
        const p = el.play();
        if (p && typeof p.catch === "function") p.catch(() => undefined);
    } catch {
        /* ignore */
    }
};

/** One-shot brand sting — fires once after first user gesture. */
export const playBrandSting = () => {
    if (stingPlayed || isMuted()) return;
    const el = ensureSting();
    if (!el) return;
    try {
        const p = el.play();
        if (p && typeof p.catch === "function") {
            p.then(() => {
                stingPlayed = true;
            }).catch(() => undefined);
        } else {
            stingPlayed = true;
        }
    } catch {
        /* ignore */
    }
};

/** Has the brand sting already played this session? */
export const stingHasPlayed = () => stingPlayed;
