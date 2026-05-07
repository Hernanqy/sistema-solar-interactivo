"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

function SaturnRings() {
  const ringRef = useRef<THREE.Mesh>(null);

  const ringTexture = useMemo(() => {
    const size = 1024;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return new THREE.CanvasTexture(canvas);
    }

    const center = size / 2;

    for (let r = 0; r < center; r++) {
      const normalized = r / center;

      let alpha = 0;

      if (normalized > 0.43 && normalized < 0.96) {
        alpha = 0.55;

        if (normalized > 0.54 && normalized < 0.58) alpha = 0.22;
        if (normalized > 0.66 && normalized < 0.69) alpha = 0.12;
        if (normalized > 0.78 && normalized < 0.82) alpha = 0.32;
        if (normalized > 0.89 && normalized < 0.92) alpha = 0.2;
      }

      const variation =
        Math.sin(normalized * 180.0) * 18 +
        Math.sin(normalized * 73.0) * 12 +
        Math.sin(normalized * 31.0) * 10;

      const red = 210 + variation;
      const green = 188 + variation * 0.75;
      const blue = 132 + variation * 0.45;

      ctx.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
      ctx.beginPath();
      ctx.arc(center, center, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    texture.needsUpdate = true;

    return texture;
  }, []);

  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.00045;
    }
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2.12, 0.08, 0]}>
      <ringGeometry args={[2.28, 3.75, 320]} />
      <meshBasicMaterial
        map={ringTexture}
        transparent
        opacity={0.92}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

function SaturnPlanet() {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  const saturnTexture = useLoader(
    THREE.TextureLoader,
    "/textures/saturn_4k.png"
  );

  useEffect(() => {
    saturnTexture.wrapS = THREE.RepeatWrapping;
    saturnTexture.wrapT = THREE.ClampToEdgeWrapping;
    saturnTexture.colorSpace = THREE.SRGBColorSpace;
    saturnTexture.anisotropy = 8;
    saturnTexture.minFilter = THREE.LinearMipmapLinearFilter;
    saturnTexture.magFilter = THREE.LinearFilter;
    saturnTexture.generateMipmaps = true;
    saturnTexture.needsUpdate = true;
  }, [saturnTexture]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (planetRef.current) {
      planetRef.current.rotation.y += 0.0016;
      planetRef.current.rotation.x = THREE.MathUtils.degToRad(-3);
    }

    if (atmosphereRef.current) {
      const pulse = 1 + Math.sin(t * 1.1) * 0.004;
      atmosphereRef.current.scale.set(pulse, pulse, pulse);
    }

    if (groupRef.current) {
      groupRef.current.rotation.z = THREE.MathUtils.degToRad(-26.7);
    }
  });

  return (
    <group ref={groupRef}>
      <SaturnRings />

      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[2.02, 128, 128]} />
        <meshBasicMaterial
          color="#facc15"
          transparent
          opacity={0.07}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={planetRef}>
        <sphereGeometry args={[1.78, 128, 128]} />
        <meshPhongMaterial
          map={saturnTexture}
          shininess={10}
          specular={new THREE.Color("#6b5a35")}
        />
      </mesh>
    </group>
  );
}

export default function SaturnScene() {
  return (
    <div className="h-[430px] w-full overflow-hidden rounded-[32px] border border-yellow-300/20 bg-black shadow-2xl shadow-yellow-500/20">
      <Canvas camera={{ position: [0, 0, 6.8], fov: 45 }}>
        <color attach="background" args={["#020617"]} />

        <ambientLight intensity={0.22} />

        <directionalLight
          position={[4, 2.5, 5]}
          intensity={3.0}
          color="#fff6dd"
        />

        <directionalLight
          position={[-4, -2, -3]}
          intensity={0.35}
          color="#facc15"
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

        <SaturnPlanet />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.17}
        />
      </Canvas>
    </div>
  );
}