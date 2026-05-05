"use client";
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { useTexture, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

const RefractionMaterial = shaderMaterial(
  {
    uTexture: new THREE.Texture(),
    uMouse: new THREE.Vector2(0.5, 0.5),
    uTime: 0,
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform sampler2D uTexture;
    uniform vec2 uMouse;
    uniform float uTime;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      
      // Calculate displacement based on mouse distance
      float dist = distance(uv, uMouse);
      float radius = 0.2;
      float strength = 0.04;
      
      if (dist < radius) {
        // Create a refractive "lens" effect
        float bulge = smoothstep(radius, 0.0, dist);
        // Distort UVs away from mouse
        vec2 displacement = normalize(uv - uMouse) * bulge * strength;
        uv -= displacement;
      }
      
      // Subtle constant wave for "liquid" feel
      uv.x += sin(uv.y * 10.0 + uTime) * 0.002;
      uv.y += cos(uv.x * 10.0 + uTime) * 0.002;
      
      vec4 color = texture2D(uTexture, uv);
      
      // Grayscale conversion
      float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
      vec3 finalColor = vec3(gray);
      
      // Boost contrast
      finalColor = (finalColor - 0.5) * 1.25 + 0.5;

      // Add a very subtle "chromatic aberration" on the edges of distortion
      if (dist < radius) {
          float edge = smoothstep(radius * 0.8, radius, dist);
          float r = texture2D(uTexture, uv + vec2(0.002, 0.0)).r;
          float g = color.g;
          float b = texture2D(uTexture, uv - vec2(0.002, 0.0)).b;
          vec3 chromColor = vec3(r, g, b);
          // Convert chromColor to grayscale too
          float chromGray = dot(chromColor, vec3(0.299, 0.587, 0.114));
          chromColor = vec3(chromGray);
          chromColor = (chromColor - 0.5) * 1.25 + 0.5;
          
          finalColor = mix(chromColor, finalColor, edge);
      }

      gl_FragColor = vec4(finalColor, color.a);
    }
  `
);

extend({ RefractionMaterial });

function BannerMesh({ src }: { src: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const texture = useTexture(src);
  const { viewport } = useThree();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      
      const targetX = (state.pointer.x + 1) / 2;
      const targetY = (state.pointer.y + 1) / 2;
      
      materialRef.current.uMouse.x = THREE.MathUtils.lerp(materialRef.current.uMouse.x, targetX, 0.1);
      materialRef.current.uMouse.y = THREE.MathUtils.lerp(materialRef.current.uMouse.y, targetY, 0.1);
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      {/* @ts-ignore */}
      <refractionMaterial 
        ref={materialRef} 
        uTexture={texture} 
        transparent 
      />
    </mesh>
  );
}

export default function InteractiveBanner({ src }: { src: string }) {
  return (
    <div className="w-full h-full cursor-none">
      <Canvas camera={{ position: [0, 0, 1], fov: 50 }}>
        <BannerMesh src={src} />
      </Canvas>
    </div>
  );
}
