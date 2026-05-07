"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function NeptunePlanet() {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const hazeRef = useRef<THREE.Mesh>(null);

  const neptuneTexture = useLoader(
    THREE.TextureLoader,
    "/textures/neptune_4k.png"
  );

  useEffect(() => {
    neptuneTexture.wrapS = THREE.RepeatWrapping;
    neptuneTexture.wrapT = THREE.ClampToEdgeWrapping;
    neptuneTexture.colorSpace = THREE.SRGBColorSpace;
    neptuneTexture.anisotropy = 8;
    neptuneTexture.minFilter = THREE.LinearMipmapLinearFilter;
    neptuneTexture.magFilter = THREE.LinearFilter;
    neptuneTexture.generateMipmaps = true;
    neptuneTexture.needsUpdate = true;
  }, [neptuneTexture]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (planetRef.current) {
      planetRef.current.rotation.y += 0.0016;
      planetRef.current.rotation.x = THREE.MathUtils.degToRad(-2);
    }

    if (hazeRef.current) {
      hazeRef.current.rotation.y += 0.0022;
      const hazePulse = 1 + Math.sin(t * 1.3) * 0.004;
      hazeRef.current.scale.set(hazePulse, hazePulse, hazePulse);
    }

    if (atmosphereRef.current) {
      const pulse = 1 + Math.sin(t * 1.1) * 0.006;
      atmosphereRef.current.scale.set(pulse, pulse, pulse);
    }

    if (groupRef.current) {
      groupRef.current.rotation.z = THREE.MathUtils.degToRad(-28);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[2.12, 128, 128]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={planetRef}>
        <sphereGeometry args={[1.92, 128, 128]} />
        <meshPhongMaterial
          map={neptuneTexture}
          shininess={14}
          specular={new THREE.Color("#3b82f6")}
        />
      </mesh>

      <mesh ref={hazeRef}>
        <sphereGeometry args={[1.985, 128, 128]} />
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export default function NeptuneScene() {
  return (
    <div className="h-[430px] w-full overflow-hidden rounded-[32px] border border-indigo-300/20 bg-black shadow-2xl shadow-indigo-500/20">
      <Canvas camera={{ position: [0, 0, 5.8], fov: 45 }}>
        <color attach="background" args={["#020617"]} />

        <ambientLight intensity={0.22} />

        <directionalLight
          position={[4, 2.5, 5]}
          intensity={3.0}
          color="#e0f2fe"
        />

        <directionalLight
          position={[-4, -2, -3]}
          intensity={0.4}
          color="#2563eb"
        />

        <Stars
          radius={80}
          depth={40}
          count={3900}
          factor={4}
          saturation={0}
          fade
          speed={0.34}
        />

        <NeptunePlanet />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.2}
        />
      </Canvas>
    </div>
  );
}