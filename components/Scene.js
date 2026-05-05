"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center, Environment } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect, useSyncExternalStore } from "react";
import * as THREE from "three";

/** Below this width we ship a lighter-weight Scene: smaller DPR, no HDR env,
 *  cheaper lighting. Keeps the 3D logo on mobile (since it's brand) while
 *  cutting GPU + bandwidth dramatically. */
const SCENE_LIGHT_BREAKPOINT = 1024;

function useIsLightScene() {
    return useSyncExternalStore(
        () => () => {},
        () => typeof window !== "undefined" && window.innerWidth < SCENE_LIGHT_BREAKPOINT,
        () => false
    );
}

function Model({ url, scale, autoRotate = false }) {
    const pivot = useRef(null); // This is the group we rotate
    const { scene } = useGLTF(url);
    
    // State for drag rotation
    const [isDragging, setIsDragging] = useState(false);
    const lastMouseX = useRef(0);
    const rotationVelocity = useRef(0);
    const targetRotation = useRef(0);

    const cloned = useMemo(() => {
        if (!scene) return null;
        const c = scene.clone();
        c.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshPhysicalMaterial({
                    color: 0xffffff,
                    metalness: 0.9,
                    roughness: 0.1,
                    transmission: 0.5,
                    thickness: 1.0,
                    iridescence: 1.0,
                    iridescenceIOR: 1.5,
                });
            }
        });
        return c;
    }, [scene]);

    useEffect(() => {
        if (autoRotate) return;

        const handleMouseDown = (e) => {
            setIsDragging(true);
            lastMouseX.current = e.clientX;
        };

        const handleMouseMove = (e) => {
            if (!isDragging) return;
            const deltaX = e.clientX - lastMouseX.current;
            lastMouseX.current = e.clientX;
            rotationVelocity.current = deltaX * 0.01;
        };

        const handleMouseUp = () => setIsDragging(false);

        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        
        const handleTouchStart = (e) => {
            setIsDragging(true);
            lastMouseX.current = e.touches[0].clientX;
        };
        const handleTouchMove = (e) => {
            if (!isDragging) return;
            const deltaX = e.touches[0].clientX - lastMouseX.current;
            lastMouseX.current = e.touches[0].clientX;
            rotationVelocity.current = deltaX * 0.01;
        };
        const handleTouchEnd = () => setIsDragging(false);

        window.addEventListener("touchstart", handleTouchStart);
        window.addEventListener("touchmove", handleTouchMove);
        window.addEventListener("touchend", handleTouchEnd);

        return () => {
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, [isDragging, autoRotate]);

    useFrame((state, delta) => {
        if (!pivot.current) return;

        if (autoRotate) {
            pivot.current.rotation.y += delta * 1.5;
            pivot.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
            return;
        }

        // ── DRAG-DRIVEN ROTATION (preserves user-set drag UX) ───────────
        targetRotation.current += rotationVelocity.current;
        pivot.current.rotation.y = THREE.MathUtils.lerp(
            pivot.current.rotation.y,
            targetRotation.current,
            0.1
        );

        if (!isDragging) {
            rotationVelocity.current *= 0.95;
        } else {
            rotationVelocity.current *= 0.8;
        }

        // ── AMBIENT IDLE MOTION ────────────────────────────────────────
        // When the user isn't dragging and there's no residual velocity,
        // apply gentle sway/bob so the cursor breathes on its own.
        // Cuts off the moment the user grabs and drags it.
        const t = state.clock.getElapsedTime();
        const idleAmount = isDragging ? 0 : Math.min(1, 1 - Math.min(1, Math.abs(rotationVelocity.current) * 30));

        // Subtle pitch + roll, scaled by idleAmount so drags take over cleanly
        const idleX = Math.sin(t * 0.4 + 1.2) * 0.10 * idleAmount;
        const idleZ = Math.cos(t * 0.3) * 0.06 * idleAmount;
        pivot.current.rotation.x = THREE.MathUtils.lerp(pivot.current.rotation.x, idleX, 0.05);
        pivot.current.rotation.z = THREE.MathUtils.lerp(pivot.current.rotation.z, idleZ, 0.05);

        // Soft vertical bob via position
        const bobTarget = Math.sin(t * 0.7) * 0.06 * idleAmount;
        pivot.current.position.y = THREE.MathUtils.lerp(pivot.current.position.y, bobTarget, 0.06);
    });

    if (!cloned) return null;

    return (
        <group ref={pivot}>
            <Center>
                {/* 
                  * ADJUST AXIS HERE:
                  * The pivot group is at [0,0,0]. 
                  * The 'Center' component puts the model's geometric center at [0,0,0].
                  * Change the position [x, y, z] below to offset the model RELATIVE to the pivot.
                  * e.g. [0, 0, -0.2] moves the model back, making the axis appear in front.
                  * e.g. [0, 0, 0.2] moves the model forward, making the axis appear behind.
                */}
                <primitive 
                    object={cloned} 
                    scale={scale} 
                    position={[0, 0, 0]} 
                />
            </Center>
        </group>
    );
}

export default function Scene({
    className = "absolute inset-0 z-10 flex items-center justify-center",
    scale = 0.3,
    autoRotate = false
}) {
    const light = useIsLightScene();

    return (
        <div className={className}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 35 }}
                dpr={light ? [1, 1.25] : [1, 2]}
                gl={{ antialias: !light, alpha: true, powerPreference: "low-power" }}
                style={{ pointerEvents: autoRotate ? 'none' : 'auto' }}
            >
                <ambientLight intensity={light ? 0.9 : 0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                {!light && <pointLight position={[-6, -4, -8]} intensity={0.6} color="#ffd0d0" />}
                <Model url="/models/pointer.glb" scale={scale} autoRotate={autoRotate} />
                {/* Skip the 1MB HDR on mobile — fall back to plain lighting. */}
                {!light && <Environment files="/hdri/ferndale_studio_07_1k.hdr" />}
            </Canvas>
        </div>
    );
}