"use client";
import React from "react";

/**
 * BrandTitle — single source of truth for section headings.
 * All sections (Skills, Services, Selected Works, Archive, Uplink, dividers)
 * use this so weight/scale/tracking/accent treatment stay consistent.
 *
 * Usage:
 *   <BrandTitle kicker="<services.offer />" size="large"
 *               primary="SERVICES" accent="RENDERED" />
 */

type Size = "mega" | "large" | "mid" | "small";

interface BrandTitleProps {
    /** Mono kicker rendered above the title (optional) */
    kicker?: string;
    /** First line of the title */
    primary: string;
    /** Optional second word/line styled with the red outline accent */
    accent?: string;
    /** Render the accent on the same line as primary (default: new line) */
    inline?: boolean;
    /** Solid red instead of outlined red */
    accentFilled?: boolean;
    /** Visual size tier */
    size?: Size;
    /** Glitch the primary word */
    glitchPrimary?: boolean;
    /** Glitch the accent word */
    glitchAccent?: boolean;
    /** Right-side mono meta string (e.g. counter / index) */
    meta?: string;
    /** Optional alignment override */
    align?: "left" | "center";
    className?: string;
}

export default function BrandTitle({
    kicker,
    primary,
    accent,
    inline = false,
    accentFilled = false,
    size = "large",
    glitchPrimary = false,
    glitchAccent = false,
    meta,
    align = "left",
    className = "",
}: BrandTitleProps) {
    const sizeClass = `brand-title--${size}`;
    const accentCls = `brand-title__accent${accentFilled ? " brand-title__accent--filled" : ""}`;

    return (
        <div
            className={`flex flex-col gap-2 ${align === "center" ? "items-center text-center" : "items-start"} ${className}`}
        >
            {(kicker || meta) && (
                <div
                    className={`flex w-full ${
                        align === "center" ? "justify-center" : "justify-between"
                    } items-baseline gap-3`}
                >
                    {kicker && <span className="brand-kicker">{kicker}</span>}
                    {meta && (
                        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">
                            {meta}
                        </span>
                    )}
                </div>
            )}
            <h2 className={`brand-title ${sizeClass}`}>
                {glitchPrimary ? (
                    <span className="brut-glitch" data-text={primary}>
                        {primary}
                    </span>
                ) : (
                    primary
                )}
                {accent &&
                    (inline ? (
                        <>
                            {" "}
                            {glitchAccent ? (
                                <span className={`brut-glitch ${accentCls}`} data-text={accent}>
                                    {accent}
                                </span>
                            ) : (
                                <span className={accentCls}>{accent}</span>
                            )}
                        </>
                    ) : (
                        <>
                            <br />
                            {glitchAccent ? (
                                <span className={`brut-glitch ${accentCls}`} data-text={accent}>
                                    {accent}
                                </span>
                            ) : (
                                <span className={accentCls}>{accent}</span>
                            )}
                        </>
                    ))}
            </h2>
        </div>
    );
}
