"use client";
import { useSyncExternalStore } from "react";

/**
 * Returns true on the client when window.innerWidth is below the given
 * breakpoint. SSR returns false (assume desktop), client hydrates with
 * the real value. Uses useSyncExternalStore so React 19's effect rules
 * stay happy — no setState-in-effect.
 *
 * Pass `subscribe = false` (default) to detect once on mount only.
 * Pass `subscribe = true` to also re-evaluate on resize.
 */
export function useIsBelow(breakpoint: number, subscribe = false): boolean {
    return useSyncExternalStore(
        subscribe
            ? (cb) => {
                window.addEventListener("resize", cb, { passive: true });
                return () => window.removeEventListener("resize", cb);
            }
            : () => () => {},
        () => window.innerWidth < breakpoint,
        () => false
    );
}

/**
 * True on devices with a real pointer (mouse/pen). SSR returns false.
 * Use to gate cursor-tracking effects, magnetic interactions, custom
 * cursors, etc. — anything that doesn't make sense on touch.
 */
export function useFinePointer(): boolean {
    return useSyncExternalStore(
        () => () => {},
        () => typeof window !== "undefined" &&
            window.matchMedia?.("(pointer: fine)").matches === true,
        () => false
    );
}
