"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export const PROJECTS = [
    {
        id: "cognicor",
        title: "Cognicor",
        category: "01 / Tech",
        image: "/Project Thumbnails/Cognicor.png",
        img: "/Project Thumbnails/Cognicor.png",
        overview: "A next-generation AI platform for financial services, built with spatial UX principles and real-time data visualisation.",
        challenge: "Translate complex institutional workflows into a frictionless conversational interface accessible to non-technical users.",
        solution: "Designed a modular AI assistant layer with contextual card stacks, inline visualisations, and a drag-based data pipeline builder.",
        tech: ["React", "Three.js", "Python", "WebSockets"],
        stats: { Conversion: "+34%", Load_Time: "0.8s", Users: "12K+", Score: "98" },
        behance: "https://www.behance.net/gallery/215389845/Homepage-Design-Cognicor-Website-Revamp-2024"
    },
    {
        id: "haladin",
        title: "Haladin",
        category: "02 / App",
        image: "/Project Thumbnails/haladin.png",
        img: "/Project Thumbnails/haladin.png",
        overview: "A premium lifestyle app bridging curated local experiences with an elegant, swipe-first mobile interface.",
        challenge: "Make discovery feel effortless - reducing the average time-to-booking from 8 minutes to under 90 seconds.",
        solution: "Introduced a gesture-driven content grid, contextual micro-animations, and a smart geo-personalisation engine.",
        tech: ["React Native", "Expo", "Supabase", "Mapbox"],
        stats: { Retention: "+52%", Booking_Time: "88s", Rating: "4.9★", Downloads: "50K" },
        behance: "https://www.behance.net/gallery/201843891/Haladin-Halal-Shopping-App-UIUX-Case-Study-2020"
    },
    {
        id: "freeze-fusion",
        title: "Freeze Fusion",
        category: "03 / Agency",
        image: "/Project Thumbnails/Freeze fusion food.png",
        img: "/Project Thumbnails/Freeze fusion food.png",
        overview: "Brand identity and digital presence for an artisan ice cream label expanding across Southeast Asia.",
        challenge: "Stand out in a saturated F&B market while communicating craft, quality, and playful energy simultaneously.",
        solution: "Developed a warm-cool duotone brand system, illustrated ingredient iconography, and a scroll-driven product showcase.",
        tech: ["Figma", "Next.js", "GSAP", "Lottie"],
        stats: { Brand_Recall: "+41%", Dwell_Time: "3.2min", Regions: "4", Revenue: "+28%" },
        behance: "https://www.behance.net/gallery/204723251/Freeze-Fusion-Foods-Ecommerce-Project"
    },
    {
        id: "comfort-king",
        title: "Comfort King",
        category: "04 / E-com",
        image: "/Project Thumbnails/Comfortking.png",
        img: "/Project Thumbnails/Comfortking.png",
        overview: "A premium direct-to-consumer furniture brand with an immersive 3D product configurator.",
        challenge: "Reduce return rates caused by customers being unable to visualise how furniture fits their real space.",
        solution: "Built an AR-integrated product viewer with room-scale placement, material swatching and a live price calculator.",
        tech: ["Three.js", "AR.js", "Shopify", "Tailwind"],
        stats: { Return_Rate: "-62%", Avg_Order: "+$180", Conversion: "+19%", Reviews: "4.8★" },
        behance: "https://www.behance.net/gallery/208357177/Comfort-King-Sleep-Craft-Logo-and-Branding"
    },
    {
        id: "qbikes",
        title: "Qbikes",
        category: "05 / Mobility",
        image: "/Project Thumbnails/Qbikes.png",
        img: "/Project Thumbnails/Qbikes.png",
        overview: "A smart urban micro-mobility platform connecting riders with real-time e-bike availability across Dubai.",
        challenge: "Design a zero-friction booking experience that works seamlessly in high-heat, high-glare outdoor conditions.",
        solution: "Created a bold high-contrast UI system, glanceable map layer, and a one-tap reserve-and-ride flow optimised for single-thumb use.",
        tech: ["Flutter", "Firebase", "Google Maps API", "Node.js"],
        stats: { Daily_Rides: "8K+", Booking_Time: "22s", NPS: "72", Fleet_Util: "89%" },
        behance: "https://www.behance.net/gallery/201615287/Q-Bikes"
    }
];

interface WorkSectionProps {
    onProjectOpen?: (projectId: string) => void;
}

export default function WorkSection({ onProjectOpen }: WorkSectionProps) {
    return (
        <div className="flex items-stretch gap-8 md:gap-12 h-full pb-4">
            {PROJECTS.map((project, i) => (
                <ProjectFrame
                    key={project.id}
                    project={project}
                    index={i}
                    onOpen={() => onProjectOpen?.(project.id)}
                />
            ))}
        </div>
    );
}

type Project = (typeof PROJECTS)[number];

function ProjectFrame({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
    const fileNo = String(index + 1).padStart(2, "0");

    return (
        <motion.button
            type="button"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            onClick={onOpen}
            className="group relative shrink-0 w-[78vw] md:w-[26vw] max-w-[360px] flex flex-col text-left bg-[#0a0a0a] border border-white/15 hover:border-[var(--accent-red)] transition-colors duration-500 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)]"
            style={{ boxShadow: "8px 8px 0 0 #ff3333" }}
        >
            {/* Brutalist top tag */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/15 bg-[#050505]">
                <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[var(--accent-red)]">
                    FILE_{fileNo}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/55">
                    {project.category}
                </span>
            </div>

            {/* Image plate with scanlines + corner ticks */}
            <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#111] brut-scanlines">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    draggable={false}
                    className="object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
                {/* Red duotone wash on hover */}
                <div className="absolute inset-0 bg-[var(--accent-red)] mix-blend-multiply opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                {/* Bottom gradient for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />

                {/* Corner ticks */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[var(--accent-red)]" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[var(--accent-red)]" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[var(--accent-red)]" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[var(--accent-red)]" />

                {/* Title block */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-1">
                    <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/55">
                        [ {project.tech.slice(0, 2).join(" / ")} ]
                    </span>
                    <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-[0.9] text-white">
                        {project.title}
                    </h3>
                </div>

                {/* Hover badge */}
                <div className="absolute top-4 right-4 px-2 py-1 bg-[var(--accent-red)] text-black font-mono text-[8px] uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    OPEN ▸
                </div>
            </div>

            {/* Bottom data strip */}
            <div className="relative px-3 py-2.5 flex items-center justify-between gap-3 border-t border-white/15 bg-[#050505]">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/55 truncate">
                    {Object.entries(project.stats)[0]?.[0].replace(/_/g, " ")}: <span className="text-white">{Object.entries(project.stats)[0]?.[1]}</span>
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--accent-red)]">
                    READ_CASE ▸
                </span>
            </div>
        </motion.button>
    );
}