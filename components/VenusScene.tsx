"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function VenusPlanet() {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const hazeRef = useRef<THREE.Mesh>(null);

  const venusTexture = useLoader(THREE.TextureLoader, "/textures/venus_4k.png");

  useEffect(() => {
    venusTexture.wrapS = THREE.RepeatWrapping;
    venusTexture.wrapT = THREE.ClampToEdgeWrapping;
    venusTexture.colorSpace = THREE.SRGBColorSpace;
    venusTexture.anisotropy = 8;
    venusTexture.minFilter = THREE.LinearMipmapLinearFilter;
    venusTexture.magFilter = THREE.LinearFilter;
    venusTexture.generateMipmaps = true;
    venusTexture.needsUpdate = true;
  }, [venusTexture]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (planetRef.current) {
      planetRef.current.rotation.y += 0.0012;
      planetRef.current.rotation.x = THREE.MathUtils.degToRad(-3);
    }

    if (atmosphereRef.current) {
      const pulse = 1 + Math.sin(t * 1.15) * 0.006;
      atmosphereRef.current.scale.set(pulse, pulse, pulse);
    }

    if (hazeRef.current) {
      hazeRef.current.rotation.y += 0.0018;
      const pulse = 1 + Math.sin(t * 1.4) * 0.004;
      hazeRef.current.scale.set(pulse, pulse, pulse);
    }

    if (groupRef.current) {
      groupRef.current.rotation.z = THREE.MathUtils.degToRad(-177);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[2.13, 128, 128]} />
        <meshBasicMaterial
          color="#ffb347"
          transparent
          opacity={0.09}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={planetRef}>
        <sphereGeometry args={[1.92, 128, 128]} />
        <meshPhongMaterial
          map={venusTexture}
          shininess={12}
          specular={new THREE.Color("#6b3f10")}
        />
      </mesh>

      <mesh ref={hazeRef}>
        <sphereGeometry args={[1.98, 128, 128]} />
        <meshBasicMaterial
          color="#ffd27a"
          transparent
          opacity={0.13}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export default function VenusScene() {
  return (
    <div className="h-[430px] w-full overflow-hidden rounded-[32px] border border-amber-300/20 bg-black shadow-2xl shadow-amber-500/20">
      <Canvas camera={{ position: [0, 0, 5.8], fov: 45 }}>
        <color attach="background" args={["#020617"]} />

        <ambientLight intensity={0.24} />

        <directionalLight
          position={[4, 2.5, 5]}
          intensity={3.2}
          color="#fff1d6"
        />

        <directionalLight
          position={[-4, -2, -3]}
          intensity={0.4}
          color="#f59e0b"
        />

        <Stars
          radius={80}
          depth={40}
          count={3800}
          factor={4}
          saturation={0}
          fade
          speed={0.34}
        />

        <VenusPlanet />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.18}
        />
      </Canvas>
    </div>
  );
}