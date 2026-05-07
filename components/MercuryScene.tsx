"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function MercuryPlanet() {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  const mercuryTexture = useLoader(
    THREE.TextureLoader,
    "/textures/mercury_4k.png"
  );

  useEffect(() => {
    mercuryTexture.wrapS = THREE.RepeatWrapping;
    mercuryTexture.wrapT = THREE.ClampToEdgeWrapping;
    mercuryTexture.colorSpace = THREE.SRGBColorSpace;
    mercuryTexture.anisotropy = 8;
    mercuryTexture.minFilter = THREE.LinearMipmapLinearFilter;
    mercuryTexture.magFilter = THREE.LinearFilter;
    mercuryTexture.generateMipmaps = true;
    mercuryTexture.needsUpdate = true;
  }, [mercuryTexture]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (planetRef.current) {
      planetRef.current.rotation.y += 0.0014;
      planetRef.current.rotation.x = THREE.MathUtils.degToRad(-2);
    }

    if (atmosphereRef.current) {
      const pulse = 1 + Math.sin(t * 1.1) * 0.003;
      atmosphereRef.current.scale.set(pulse, pulse, pulse);
    }

    if (groupRef.current) {
      groupRef.current.rotation.z = THREE.MathUtils.degToRad(-6);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[2.03, 128, 128]} />
        <meshBasicMaterial
          color="#c7b8a2"
          transparent
          opacity={0.045}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={planetRef}>
        <sphereGeometry args={[1.88, 128, 128]} />
        <meshPhongMaterial
          map={mercuryTexture}
          shininess={5}
          specular={new THREE.Color("#2f2a25")}
        />
      </mesh>
    </group>
  );
}

export default function MercuryScene() {
  return (
    <div className="h-[430px] w-full overflow-hidden rounded-[32px] border border-stone-300/20 bg-black shadow-2xl shadow-stone-500/20">
      <Canvas camera={{ position: [0, 0, 5.8], fov: 45 }}>
        <color attach="background" args={["#020617"]} />

        <ambientLight intensity={0.2} />

        <directionalLight
          position={[4, 2.5, 5]}
          intensity={3.1}
          color="#fff4e6"
        />

        <directionalLight
          position={[-4, -2, -3]}
          intensity={0.28}
          color="#93c5fd"
        />

        <Stars
          radius={80}
          depth={40}
          count={3600}
          factor={4}
          saturation={0}
          fade
          speed={0.32}
        />

        <MercuryPlanet />

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