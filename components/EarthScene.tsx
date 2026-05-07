"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function EarthPlanet() {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  const earthTexture = useLoader(
    THREE.TextureLoader,
    "/textures/earth_4k_texture.png"
  );

  const cloudsTexture = useLoader(
    THREE.TextureLoader,
    "/textures/earth_clouds_4k.png"
  );

  useEffect(() => {
    earthTexture.wrapS = THREE.RepeatWrapping;
    earthTexture.wrapT = THREE.ClampToEdgeWrapping;
    earthTexture.colorSpace = THREE.SRGBColorSpace;
    earthTexture.anisotropy = 8;
    earthTexture.minFilter = THREE.LinearMipmapLinearFilter;
    earthTexture.magFilter = THREE.LinearFilter;
    earthTexture.generateMipmaps = true;
    earthTexture.needsUpdate = true;

    cloudsTexture.wrapS = THREE.RepeatWrapping;
    cloudsTexture.wrapT = THREE.ClampToEdgeWrapping;
    cloudsTexture.anisotropy = 8;
    cloudsTexture.minFilter = THREE.LinearMipmapLinearFilter;
    cloudsTexture.magFilter = THREE.LinearFilter;
    cloudsTexture.generateMipmaps = true;
    cloudsTexture.needsUpdate = true;
  }, [earthTexture, cloudsTexture]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (planetRef.current) {
      planetRef.current.rotation.y += 0.0015;
    }

    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0021;
    }

    if (atmosphereRef.current) {
      const pulse = 1 + Math.sin(t * 1.2) * 0.004;
      atmosphereRef.current.scale.set(pulse, pulse, pulse);
    }

    if (groupRef.current) {
      groupRef.current.rotation.z = THREE.MathUtils.degToRad(-23.5);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[2.12, 128, 128]} />
        <meshBasicMaterial
          color="#4fc3ff"
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
          map={earthTexture}
          shininess={18}
          specular={new THREE.Color("#335577")}
        />
      </mesh>

      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.965, 128, 128]} />
        <meshPhongMaterial
          color="#ffffff"
          alphaMap={cloudsTexture}
          transparent
          opacity={0.55}
          alphaTest={0.05}
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </mesh>
    </group>
  );
}

export default function EarthScene() {
  return (
    <div className="h-[430px] w-full overflow-hidden rounded-[32px] border border-blue-300/20 bg-black shadow-2xl shadow-blue-500/20">
      <Canvas camera={{ position: [0, 0, 5.8], fov: 45 }}>
        <color attach="background" args={["#020617"]} />

        <ambientLight intensity={0.25} />

        <directionalLight
          position={[4, 2.5, 5]}
          intensity={3.1}
          color="#ffffff"
        />

        <directionalLight
          position={[-4, -2, -3]}
          intensity={0.38}
          color="#60a5fa"
        />

        <Stars
          radius={80}
          depth={40}
          count={4000}
          factor={4}
          saturation={0}
          fade
          speed={0.35}
        />

        <EarthPlanet />

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