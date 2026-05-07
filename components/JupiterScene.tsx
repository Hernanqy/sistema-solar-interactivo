"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function JupiterPlanet() {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  const jupiterTexture = useLoader(
    THREE.TextureLoader,
    "/textures/jupiter_4k.png"
  );

  useEffect(() => {
    jupiterTexture.wrapS = THREE.RepeatWrapping;
    jupiterTexture.wrapT = THREE.ClampToEdgeWrapping;
    jupiterTexture.colorSpace = THREE.SRGBColorSpace;
    jupiterTexture.anisotropy = 8;
    jupiterTexture.minFilter = THREE.LinearMipmapLinearFilter;
    jupiterTexture.magFilter = THREE.LinearFilter;
    jupiterTexture.generateMipmaps = true;
    jupiterTexture.needsUpdate = true;
  }, [jupiterTexture]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (planetRef.current) {
      planetRef.current.rotation.y += 0.0019;
      planetRef.current.rotation.x = THREE.MathUtils.degToRad(-3);
    }

    if (atmosphereRef.current) {
      const pulse = 1 + Math.sin(t * 1.2) * 0.004;
      atmosphereRef.current.scale.set(pulse, pulse, pulse);
    }

    if (groupRef.current) {
      groupRef.current.rotation.z = THREE.MathUtils.degToRad(-8);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[2.12, 128, 128]} />
        <meshBasicMaterial
          color="#f5c77a"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={planetRef}>
        <sphereGeometry args={[1.96, 128, 128]} />
        <meshPhongMaterial
          map={jupiterTexture}
          shininess={12}
          specular={new THREE.Color("#6b4a2b")}
        />
      </mesh>
    </group>
  );
}

export default function JupiterScene() {
  return (
    <div className="h-[430px] w-full overflow-hidden rounded-[32px] border border-yellow-300/20 bg-black shadow-2xl shadow-yellow-500/20">
      <Canvas camera={{ position: [0, 0, 5.8], fov: 45 }}>
        <color attach="background" args={["#020617"]} />

        <ambientLight intensity={0.24} />

        <directionalLight
          position={[4, 2.5, 5]}
          intensity={3.1}
          color="#fff6e6"
        />

        <directionalLight
          position={[-4, -2, -3]}
          intensity={0.35}
          color="#f59e0b"
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

        <JupiterPlanet />

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