"use client";
import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * AmbientTerrain — a procedural wireframe hill landscape that drifts slowly
 * behind the entire journey. Provides cinematic depth & atmosphere without
 * fighting any of the foreground content.
 *
 *  - Built from a PlaneGeometry whose vertices are displaced by layered
 *    sine waves (no noise libs).
 *  - Renders in red wireframe with fog so the silhouette fades into black.
 *  - Camera drifts gently sideways on a sine, plus subtle pitch breathing.
 *  - Mouse parallax: tilts a few degrees toward the cursor for life.
 *  - Mounted as a fixed full-screen canvas at z:0 — sections sit above it.
 */

function Terrain({ rows = 70, cols = 70 }: { rows?: number; cols?: number }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const tiltRef = useRef({ x: 0, y: 0 });

    // Build a displaced plane with layered sine displacement
    const geometry = useMemo(() => {
        const geo = new THREE.PlaneGeometry(50, 50, cols, rows);
        const positions = geo.attributes.position;
        for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i);
            const z =
                Math.sin(x * 0.4) * Math.cos(y * 0.4) * 1.6 +
                Math.sin(x * 0.18 + y * 0.22) * 1.0 +
                Math.cos(y * 0.55) * 0.5;
            positions.setZ(i, z);
        }
        positions.needsUpdate = true;
        geo.computeVertexNormals();
        return geo;
    }, [rows, cols]);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (!meshRef.current) return;

        // Slow drift so ridges crawl across the viewport
        meshRef.current.rotation.z = t * 0.015;

        // Mouse parallax
        const mx = state.pointer.x;
        const my = state.pointer.y;
        tiltRef.current.x = THREE.MathUtils.lerp(tiltRef.current.x, mx * 0.2, 0.03);
        tiltRef.current.y = THREE.MathUtils.lerp(tiltRef.current.y, my * 0.12, 0.03);

        meshRef.current.rotation.x = -Math.PI / 2.6 + tiltRef.current.y * 0.08;
        meshRef.current.position.x = tiltRef.current.x * 1.4;
    });

    return (
        <mesh
            ref={meshRef}
            rotation={[-Math.PI / 2.6, 0, 0]}
            position={[0, -2.4, 0]}
            geometry={geometry}
        >
            <meshBasicMaterial
                color={0xff3333}
                wireframe
                transparent
                opacity={0.55}
            />
        </mesh>
    );
}

function CameraDrift() {
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        // Slow lateral camera sway — adds drama
        state.camera.position.x = Math.sin(t * 0.08) * 0.6;
        state.camera.position.y = 1.6 + Math.sin(t * 0.05) * 0.15;
        state.camera.lookAt(0, 0.2, -2);
    });
    return null;
}

export default function AmbientTerrain() {
    return (
        <div
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 0 }}
            aria-hidden
        >
            <Canvas
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
                camera={{ position: [0, 1.6, 5], fov: 65, near: 0.1, far: 40 }}
                style={{ background: "transparent" }}
            >
                {/* Fog pushed back so more of the terrain is visible */}
                <fog attach="fog" args={[0x050505, 14, 32]} />
                <ambientLight intensity={0.3} />
                <Terrain />
                <CameraDrift />
            </Canvas>

            {/* Soft red glow at horizon */}
            <div
                className="absolute inset-x-0 bottom-0 h-[55vh] pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at 50% 100%, rgba(255,51,51,0.18) 0%, rgba(255,51,51,0.06) 35%, transparent 75%)",
                }}
            />

            {/* Subtle vignette */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.55) 100%)",
                }}
            />
        </div>
    );
}
