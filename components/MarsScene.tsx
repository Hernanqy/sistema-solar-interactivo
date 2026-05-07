"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function MarsPlanet() {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  const marsTexture = useLoader(THREE.TextureLoader, "/textures/mars_4k.png");

  useEffect(() => {
    marsTexture.wrapS = THREE.RepeatWrapping;
    marsTexture.wrapT = THREE.ClampToEdgeWrapping;
    marsTexture.colorSpace = THREE.SRGBColorSpace;
    marsTexture.anisotropy = 8;
    marsTexture.minFilter = THREE.LinearMipmapLinearFilter;
    marsTexture.magFilter = THREE.LinearFilter;
    marsTexture.generateMipmaps = true;
    marsTexture.needsUpdate = true;
  }, [marsTexture]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (planetRef.current) {
      planetRef.current.rotation.y += 0.0017;
      planetRef.current.rotation.x = THREE.MathUtils.degToRad(-4);
    }

    if (atmosphereRef.current) {
      const pulse = 1 + Math.sin(t * 1.2) * 0.005;
      atmosphereRef.current.scale.set(pulse, pulse, pulse);
    }

    if (groupRef.current) {
      groupRef.current.rotation.z = THREE.MathUtils.degToRad(-25);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[2.08, 128, 128]} />
        <meshBasicMaterial
          color="#ff6b35"
          transparent
          opacity={0.07}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={planetRef}>
        <sphereGeometry args={[1.92, 128, 128]} />
        <meshPhongMaterial
          map={marsTexture}
          shininess={8}
          specular={new THREE.Color("#3a170d")}
        />
      </mesh>
    </group>
  );
}

export default function MarsScene() {
  return (
    <div className="h-[430px] w-full overflow-hidden rounded-[32px] border border-red-300/20 bg-black shadow-2xl shadow-red-500/20">
      <Canvas camera={{ position: [0, 0, 5.8], fov: 45 }}>
        <color attach="background" args={["#020617"]} />

        <ambientLight intensity={0.22} />

        <directionalLight
          position={[4, 2.5, 5]}
          intensity={3.0}
          color="#fff2e5"
        />

        <directionalLight
          position={[-4, -2, -3]}
          intensity={0.35}
          color="#fb7185"
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

        <MarsPlanet />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.22}
        />
      </Canvas>
    </div>
  );
}