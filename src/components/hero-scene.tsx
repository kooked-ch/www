"use client";

import { Line } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import type * as THREE from "three";

const NODE_COUNT = 9;
const RADIUS = 2.4;

function useNodePositions(count: number, radius: number) {
  return useMemo(() => {
    const golden = Math.PI * (3 - Math.sqrt(5));
    return Array.from({ length: count }, (_, i) => {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      return [Math.cos(theta) * r * radius, y * radius * 0.85, Math.sin(theta) * r * radius] as [
        number,
        number,
        number,
      ];
    });
  }, [count, radius]);
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = () => setReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function Node({ position, delay, reduced }: { position: [number, number, number]; delay: number; reduced: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (reduced || !meshRef.current || !glowRef.current) return;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.4 + delay) * 0.18;
    meshRef.current.scale.setScalar(pulse);
    glowRef.current.scale.setScalar(pulse * 1.8);
  });

  return (
    <group position={position}>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshBasicMaterial color="#ffb238" transparent opacity={0.15} />
      </mesh>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#ffb238" />
      </mesh>
    </group>
  );
}

function Graph() {
  const positions = useNodePositions(NODE_COUNT, RADIUS);
  const groupRef = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (reduced) return;
    function onPointerMove(e: PointerEvent) {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    }
    window.addEventListener("pointermove", onPointerMove);
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [reduced]);

  useFrame((_, delta) => {
    if (reduced || !groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.08;
    groupRef.current.rotation.x += (pointer.current.y * 0.15 - groupRef.current.rotation.x) * 0.03;
    groupRef.current.rotation.z += (pointer.current.x * -0.08 - groupRef.current.rotation.z) * 0.03;
  });

  return (
    <group ref={groupRef} position={[2.3, 0, 0]}>
      <mesh>
        <sphereGeometry args={[0.1, 20, 20]} />
        <meshBasicMaterial color="#ededef" />
      </mesh>
      {positions.map((position, i) => (
        <group key={`edge-group-${position.join(",")}`}>
          <Line points={[[0, 0, 0], position]} color="#5a5a62" lineWidth={1} transparent opacity={0.4} />
          <Node position={position} delay={i * 1.1} reduced={reduced} />
        </group>
      ))}
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 6.5], fov: 45 }}
      className="!absolute inset-0"
    >
      <Graph />
    </Canvas>
  );
}
