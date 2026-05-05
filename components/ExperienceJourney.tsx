"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import BrandTitle from "./BrandTitle";

// ── CONTENT DATA ──────────────────────────────────────────────────────────────

const ABOUT_BIO =
  "Visual & Product Designer with 6+ years of experience crafting user-centered digital solutions across real estate, fintech, and SaaS. Known for blending data-driven UX with strong visual execution — and increasingly, building my own tools using AI. Comfortable owning design end-to-end, from strategy to shipping.";

const JOBS = [
  {
    company: "Provident Real Estate",
    role: "UI/UX Designer",
    period: "Apr 2025 — Present",
    points: [
      "Data-Driven Landing Page Design — leveraged Hotjar heatmaps, session recordings, and user behaviour insights alongside real market data to design and optimize high-converting landing pages, achieving ~30% improvement in conversion rates.",
      "Multi-Platform Digital Design — designed end-to-end web experiences across Provident's ecosystem including off-plan property pages, developer profiles, area guides, and roadshow pages, ensuring brand consistency.",
      "Real Estate Market-Informed UX — translated real market insights and property data into intuitive, visually compelling layouts that effectively communicate off-plan developments.",
      "AI-Accelerated Workflow — utilized Figma Make and other AI design tools to speed up production and iterate rapidly on campaign assets.",
    ],
  },
  {
    company: "Union Square House",
    role: "Visual Designer",
    period: "Mar 2025 — Present",
    points: [
      "UI/UX Design for Real Estate Campaigns — directed the creation of responsive landing pages for luxury real estate projects, ensuring high engagement and seamless user experience.",
      "Marketing-Focused Visual Content Creation — designed a wide range of digital assets including social media posts, reels, and paid ad creatives tailored for performance marketing.",
      "Cross-Functional Collaboration — worked closely with marketing, sales, and branding teams to ensure visual consistency and alignment.",
      "Performance-Driven Outcomes — contributed to lead generation success through optimized landing page designs that improved conversion rates.",
      "Creative Support for High-Value Deals — delivered impactful visuals and marketing collateral for major property deals.",
    ],
  },
  {
    company: "Aqary International Holding",
    role: "Product Designer",
    period: "Dec 2023 — Jan 2025",
    points: [
      "Strategic Digital Product Design & Leadership — directed the design of key in-house digital products including websites, mobile apps, and the Aqary dashboard.",
      "Collaborative Cross-Functional Execution — partnered effectively with diverse teams to maintain design consistency and achieve project goals.",
      "Complex Design Problem Solving — resolved intricate design challenges related to complex dashboards and websites.",
      "Award-Winning User-Centered Design — earned 'Designer of the Month' recognition for outstanding contributions.",
      "Stakeholder Management — managed stakeholder communication, design evaluation, and maintained high-quality standards.",
    ],
  },
  {
    company: "StratAgile",
    role: "Creative Designer",
    period: "Dec 2020 — Nov 2023",
    points: [
      "Multichannel Digital Asset Design — conceptualized and delivered engaging digital assets across diverse platforms.",
      "Strategic Creative Leadership — directed creative design processes for high-profile projects, ensuring alignment with client branding objectives.",
      "Business Development through Design — secured major contracts with Codashop (Malaysia, Philippines) demonstrating persuasive presentation capabilities.",
      "Cross-Functional Strategy Implementation — collaborated with teams to execute design strategies that supported marketing campaigns.",
      "Efficient Design Execution — delivered high-quality designs within tight deadlines, consistently exceeding client expectations.",
    ],
  },
  {
    company: "Freelance",
    role: "Creative Director",
    period: "Dec 2019 — 2020",
    points: [
      "Website & App Design — created intuitive and visually appealing website and app designs.",
      "Digital & Print Media — developed digital assets, company profiles, logos, posters, banners, and design patterns.",
      "Conceptualization & Execution — conceptualized visually compelling design ideas aligning with client goals and brand identity.",
      "User-Centric Approach — understood product specifications and user psychology to enhance user experience.",
      "Client Communication — effectively communicated with clients, incorporating feedback for successful project outcomes.",
    ],
  },
];

// ── BRUTALIST PAGE STYLES ─────────────────────────────────────────────────────
const PAGE_BG: React.CSSProperties = {
  background: "#0a0a0a",
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
  backgroundSize: "40px 40px",
};

// ── SUB-COMPONENTS ────────────────────────────────────────────────────────────

function Scanlines() {
  return <div className="absolute inset-0 pointer-events-none brut-scanlines opacity-90" />;
}

function PageHeader({ tag, code }: { tag: string; code: string }) {
  return (
    <div className="flex items-center justify-between px-5 md:px-7 py-2 border-b border-white/15 bg-[#050505]">
      <span className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.35em] text-[var(--accent-red)]">
        {tag}
      </span>
      <span className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.35em] text-white/50">
        {code}
      </span>
    </div>
  );
}

function PageFooter({ left, right }: { left: string; right?: string }) {
  return (
    <div className="flex items-center justify-between px-5 md:px-7 py-2 border-t border-white/15 bg-[#050505] mt-auto">
      <span className="font-mono text-[8px] uppercase tracking-[0.35em] text-white/40">{left}</span>
      <span className="font-mono text-[8px] uppercase tracking-[0.35em] text-[var(--accent-red)]">
        {right || "▮"}
      </span>
    </div>
  );
}

// ── PAGE COMPONENTS ───────────────────────────────────────────────────────────

function PagePhoto() {
  return (
    <div className="w-full h-full flex flex-col relative" style={PAGE_BG}>
      <Scanlines />
      <PageHeader tag="ID_CARD" code="DOSSIER 0001" />
      <div className="relative z-10 flex-1 flex items-center justify-center p-5">
        {/* Brutalist ID frame */}
        <div className="relative w-[150px] md:w-[180px]">
          <div className="border border-[var(--accent-red)] bg-[#050505] p-2 brut-hardshadow">
            <div className="relative w-full aspect-[4/5] bg-[#111] overflow-hidden brut-scanlines">
              <Image src="/portrait.png" alt="Haseeb Hamza" fill className="object-cover grayscale contrast-125" />
              <div className="absolute inset-0 bg-[var(--accent-red)] mix-blend-multiply opacity-20" />
              {/* Corner ticks */}
              <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-[var(--accent-red)]" />
              <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-[var(--accent-red)]" />
              <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-[var(--accent-red)]" />
              <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-[var(--accent-red)]" />
            </div>
            <div className="mt-2 text-center font-mono text-[8px] uppercase tracking-[0.4em] text-white/70">
              HASEEB HAMZA
            </div>
            <div className="text-center font-mono text-[7px] uppercase tracking-[0.45em] text-[var(--accent-red)] mt-0.5">
              SUBJECT_ID 0001
            </div>
          </div>
        </div>
      </div>
      <PageFooter left="REGISTRY VOL_01" right="VERIFIED" />
    </div>
  );
}

function PageBio() {
  return (
    <div className="w-full h-full flex flex-col relative" style={PAGE_BG}>
      <Scanlines />
      <PageHeader tag="BIO_DOSSIER" code="0002" />
      <div className="relative z-10 flex-1 flex flex-col gap-3 px-5 md:px-7 py-5 overflow-hidden">
        <h3 className="font-black text-2xl md:text-[1.7rem] uppercase tracking-tighter leading-[0.95] text-white">
          ABOUT THE<br />
          <span className="text-[var(--accent-red)]">SUBJECT</span>
        </h3>
        <p className="font-mono text-[10px] md:text-[11px] text-white/65 leading-relaxed">{ABOUT_BIO}</p>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {["UI/UX", "PRODUCT", "VISUAL", "FIGMA", "AI_TOOLS", "REAL_ESTATE"].map((t) => (
            <span
              key={t}
              className="px-1.5 py-0.5 border border-white/20 font-mono text-[8px] uppercase tracking-[0.3em] text-white/65"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <PageFooter left="STATUS: ACTIVE" right="● LIVE" />
    </div>
  );
}

function PageJob({ job, index }: { job: typeof JOBS[0]; index: number }) {
  const code = String(index + 1).padStart(4, "0");
  return (
    <div className="w-full h-full flex flex-col relative" style={PAGE_BG}>
      <Scanlines />
      <PageHeader tag="JOB_RECORD" code={code} />
      <div className="px-5 md:px-7 pt-4 pb-2 border-b border-white/10 shrink-0 relative z-10">
        <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-[var(--accent-red)]">
          {job.period}
        </span>
        <h3 className="font-black uppercase tracking-tighter leading-[0.9] text-xl md:text-[1.5rem] text-white mt-1">
          {job.company}
        </h3>
        <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.35em] text-white/55 mt-0.5">
          ROLE / {job.role}
        </p>
      </div>
      <div
        className="relative z-10 flex-1 overflow-y-auto px-5 md:px-7 py-3"
        style={{ scrollbarWidth: "none" }}
      >
        <ul className="space-y-2">
          {job.points.map((pt, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="font-mono text-[9px] tracking-[0.3em] text-[var(--accent-red)] pt-[2px] shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-mono text-[9.5px] md:text-[10.5px] text-white/65 leading-snug">{pt}</p>
            </li>
          ))}
        </ul>
      </div>
      <PageFooter left={`ENTRIES // ${job.points.length}`} right="● ARCHIVED" />
    </div>
  );
}

function PageCta() {
  return (
    <div className="w-full h-full flex flex-col relative" style={PAGE_BG}>
      <Scanlines />
      <PageHeader tag="FINAL_PAGE" code="EOF" />
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-5 md:px-7 py-5 gap-4">
        <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-white/45">
          NEXT_CHAPTER
        </span>
        <h2 className="font-black text-2xl md:text-[1.9rem] uppercase tracking-tighter leading-[0.85] text-white">
          LET&apos;S BUILD<br />
          <span className="text-[var(--accent-red)]">VOL_02</span>
        </h2>
        <p className="font-mono text-[10px] md:text-[11px] text-white/55 leading-relaxed max-w-[220px]">
          Open to new collaborations, full-time, and contract.
        </p>
        <a
          href="mailto:haseebc1999@gmail.com"
          onClick={(e) => e.stopPropagation()}
          className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-[var(--accent-red)] text-black font-mono text-[9px] uppercase tracking-[0.35em] hover:bg-white transition-colors pointer-events-auto brut-hardshadow-white"
          style={{ boxShadow: "4px 4px 0 0 #ffffff" }}
        >
          haseebc1999@gmail.com
        </a>
      </div>
      <PageFooter left="UPLINK_READY" right="● OPEN" />
    </div>
  );
}

function BlankPage() {
  return (
    <div className="w-full h-full flex items-center justify-center relative opacity-40" style={PAGE_BG}>
      <Scanlines />
      <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-white/20">PAGE_INTENTIONALLY_BLANK</span>
    </div>
  );
}

// ── BOOK SHEETS ──────────────────────────────────────────────────────────────
const SHEETS = [
  // Sheet 0: Cover (front) → Photo (back, inside left)
  {
    isCover: true,
    front: (
      <div
        className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[#050505] border border-[var(--accent-red)] brut-noise"
        style={{ boxShadow: "inset 0 0 60px rgba(0,0,0,0.8)" }}
      >
        <div className="absolute inset-3 border border-white/15" />
        <div className="absolute inset-0 brut-scanlines pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center gap-3">
          <BrandTitle
            kicker="CLASSIFIED ARCHIVE"
            primary="EXPERIENCE"
            accent="REGISTRY"
            accentFilled
            size="mid"
            align="center"
          />
          <div className="w-10 h-[2px] bg-[var(--accent-red)] my-2" />
          <p className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.45em] text-white/55">
            VOL_01 // 2019 — 2026
          </p>
          <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-[var(--accent-red)] mt-3 brut-blink">
            ▮ TAP TO OPEN
          </p>
        </div>
      </div>
    ),
    back: <PagePhoto />,
  },
  // Sheet 1: Bio → Job 0
  { front: <PageBio />, back: <PageJob job={JOBS[0]} index={0} /> },
  // Sheet 2: Job 1 → Job 2
  { front: <PageJob job={JOBS[1]} index={1} />, back: <PageJob job={JOBS[2]} index={2} /> },
  // Sheet 3: Job 3 → Job 4
  { front: <PageJob job={JOBS[3]} index={3} />, back: <PageJob job={JOBS[4]} index={4} /> },
  // Sheet 4: Final CTA
  { front: <PageCta />, back: <BlankPage /> },
];

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────────
interface ExperienceJourneyProps {
  isFramed?: boolean;
  onClose?: () => void;
}

export default function ExperienceJourney({ isFramed = false }: ExperienceJourneyProps) {
  const [currentFlip, setCurrentFlip] = useState(0);
  const maxFlips = SHEETS.length - 1;
  const isOpen = currentFlip > 0;

  const nextFlip = () => setCurrentFlip((p) => Math.min(p + 1, maxFlips));
  const prevFlip = () => setCurrentFlip((p) => Math.max(p - 1, 0));

  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center select-none ${
        isFramed ? "pointer-events-none scale-[0.6]" : "pointer-events-auto"
      }`}
    >
      {/* Click outside to close */}
      {!isFramed && isOpen && (
        <div
          className="absolute inset-[-3000px] z-0 pointer-events-auto"
          onPointerDown={() => setCurrentFlip(0)}
        />
      )}

      <div className="relative z-10 flex items-end gap-6 md:gap-14">
        <motion.div
          className="relative pointer-events-auto"
          style={{ perspective: "2500px" }}
          animate={{ scale: isOpen ? 1.05 : 1, y: isOpen ? 25 : 0, rotateZ: isOpen ? 0 : -2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div className="relative w-[78vw] md:w-[45vw] max-w-[300px] md:max-w-[400px] h-[62vh] md:h-[68vh] max-h-[600px]">

            {/* Stack of sheets */}
            {SHEETS.map((sheet, index) => {
              const isFlipped = currentFlip > index;
              const targetZIndex = isFlipped ? index : 100 - index;

              return (
                <motion.div
                  key={index}
                  className="absolute inset-0 cursor-pointer origin-left"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isFlipped) prevFlip();
                    else nextFlip();
                  }}
                  initial={false}
                  animate={{ rotateY: isFlipped ? -179.9 : 0, zIndex: targetZIndex }}
                  transition={{
                    duration: 1.0,
                    ease: [0.645, 0.045, 0.355, 1],
                    zIndex: { delay: isFlipped ? 0.35 : 0.6, duration: 0.01 },
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* FRONT */}
                  <div
                    className="absolute inset-0 border border-white/10"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      boxShadow: isFlipped ? "none" : "-2px 0 12px rgba(0,0,0,0.6)",
                    }}
                  >
                    {sheet.front}
                    {/* Spine bend */}
                    {!sheet.isCover && (
                      <div className="absolute top-0 left-0 bottom-0 w-5 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />
                    )}
                  </div>

                  {/* BACK */}
                  <div
                    className="absolute inset-0 border border-white/10"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      boxShadow: isFlipped ? "2px 0 12px rgba(0,0,0,0.6)" : "none",
                    }}
                  >
                    {sheet.back}
                    <div className="absolute top-0 right-0 bottom-0 w-5 bg-gradient-to-l from-black/40 to-transparent pointer-events-none" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Page indicator */}
      <div className="mt-8 flex flex-col items-center gap-2 pointer-events-none">
        <p className="font-mono text-[9px] uppercase tracking-[0.45em] text-white/55">
          {isOpen ? `SPREAD ${currentFlip} / ${maxFlips}` : "▮ TAP COVER TO OPEN"}
        </p>
        {isOpen && (
          <div className="flex gap-2">
            {Array.from({ length: maxFlips }, (_, i) => (
              <div
                key={i}
                className="transition-all duration-300"
                style={{
                  width: i + 1 === currentFlip ? 20 : 6,
                  height: 3,
                  background:
                    i + 1 === currentFlip ? "var(--accent-red)" : "rgba(255,255,255,0.18)",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
