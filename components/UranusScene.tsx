"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function UranusPlanet() {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  const texture = useLoader(THREE.TextureLoader, "/textures/uranus_4k.jpg");

  useEffect(() => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    texture.needsUpdate = true;
  }, [texture]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (planetRef.current) {
      planetRef.current.rotation.y += 0.0014;
    }

    if (atmosphereRef.current) {
      const pulse = 1 + Math.sin(t * 1.1) * 0.004;
      atmosphereRef.current.scale.set(pulse, pulse, pulse);
    }

    if (groupRef.current) {
      groupRef.current.rotation.z = THREE.MathUtils.degToRad(98);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[2.08, 128, 128]} />
        <meshBasicMaterial
          color="#9be7ef"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={planetRef}>
        <sphereGeometry args={[1.92, 128, 128]} />
        <meshPhongMaterial
          map={texture}
          shininess={10}
          specular={new THREE.Color("#8feef5")}
        />
      </mesh>
    </group>
  );
}

export default function UranusScene() {
  return (
    <div className="h-[430px] w-full overflow-hidden rounded-[32px] border border-cyan-300/20 bg-black shadow-2xl shadow-cyan-500/20">
      <Canvas camera={{ position: [0, 0, 5.8], fov: 45 }}>
        <color attach="background" args={["#020617"]} />

        <ambientLight intensity={0.28} />

        <directionalLight
          position={[4, 2.5, 5]}
          intensity={2.8}
          color="#f0fdff"
        />

        <directionalLight
          position={[-4, -2, -3]}
          intensity={0.35}
          color="#67e8f9"
        />

        <Stars
          radius={80}
          depth={40}
          count={3800}
          factor={4}
          saturation={0}
          fade
          speed={0.35}
        />

        <UranusPlanet />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.16}
        />
      </Canvas>
    </div>
  );
}