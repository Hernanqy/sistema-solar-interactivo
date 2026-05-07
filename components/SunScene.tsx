"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const coronaFragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormal;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x)
         + (c - a) * u.y * (1.0 - u.x)
         + (d - b) * u.x * u.y;
  }

  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 6; i++) {
      value += amplitude * noise(st);
      st *= 2.0;
      amplitude *= 0.5;
    }

    return value;
  }

  void main() {
    vec2 uv = vUv * 7.0;
    uv.x += uTime * 0.03;
    uv.y -= uTime * 0.02;

    float n = fbm(uv);

    float fresnel = pow(
      1.0 - abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0))),
      1.8
    );

    vec3 color = vec3(1.0, 0.38, 0.05) * fresnel * (0.45 + n * 0.55);
    float alpha = fresnel * (0.08 + n * 0.12);

    gl_FragColor = vec4(color, alpha);
  }
`;

const plasmaRimFragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormal;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x)
         + (c - a) * u.y * (1.0 - u.x)
         + (d - b) * u.x * u.y;
  }

  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(st);
      st *= 2.0;
      amplitude *= 0.5;
    }

    return value;
  }

  void main() {
    vec2 uv = vUv * 10.0;
    uv.x += uTime * 0.05;
    uv.y += sin(vUv.x * 8.0 + uTime * 0.4) * 0.08;

    float n = fbm(uv);

    float fresnel = pow(
      1.0 - abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0))),
      2.3
    );

    float intensity = fresnel * (0.35 + n * 0.65);

    vec3 color = mix(
      vec3(1.0, 0.25, 0.02),
      vec3(1.0, 0.72, 0.25),
      n
    );

    float alpha = intensity * 0.18;

    gl_FragColor = vec4(color, alpha);
  }
`;

const outerGlowFragmentShader = `
  varying vec3 vNormal;

  void main() {
    float fresnel = pow(
      1.0 - abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0))),
      2.6
    );

    vec3 color = vec3(1.0, 0.30, 0.04) * fresnel;
    float alpha = fresnel * 0.16;

    gl_FragColor = vec4(color, alpha);
  }
`;

function SunObject() {
  const groupRef = useRef<THREE.Group>(null);
  const sunRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);
  const plasmaRimRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const coronaMatRef = useRef<THREE.ShaderMaterial>(null);
  const plasmaMatRef = useRef<THREE.ShaderMaterial>(null);

  const sunTexture = useLoader(THREE.TextureLoader, "/textures/sun_4k.png");

  useEffect(() => {
    sunTexture.wrapS = THREE.RepeatWrapping;
    sunTexture.wrapT = THREE.ClampToEdgeWrapping;
    sunTexture.colorSpace = THREE.SRGBColorSpace;
    sunTexture.anisotropy = 8;
    sunTexture.minFilter = THREE.LinearMipmapLinearFilter;
    sunTexture.magFilter = THREE.LinearFilter;
    sunTexture.generateMipmaps = true;
    sunTexture.needsUpdate = true;
  }, [sunTexture]);

  const coronaUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  const plasmaUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (coronaMatRef.current) {
      coronaMatRef.current.uniforms.uTime.value = t;
    }

    if (plasmaMatRef.current) {
      plasmaMatRef.current.uniforms.uTime.value = t;
    }

    if (sunRef.current) {
      sunRef.current.rotation.y += 0.0016;
      sunRef.current.rotation.x += 0.0002;
    }

    if (coronaRef.current) {
      coronaRef.current.rotation.y -= 0.0006;
      const pulse = 1 + Math.sin(t * 1.2) * 0.01;
      coronaRef.current.scale.set(pulse, pulse, pulse);
    }

    if (plasmaRimRef.current) {
      plasmaRimRef.current.rotation.y += 0.0008;
      const pulse = 1 + Math.sin(t * 1.6) * 0.012;
      plasmaRimRef.current.scale.set(pulse, pulse, pulse);
    }

    if (glowRef.current) {
      const pulse = 1 + Math.sin(t * 1.4) * 0.008;
      glowRef.current.scale.set(pulse, pulse, pulse);
    }

    if (groupRef.current) {
      groupRef.current.rotation.z = THREE.MathUtils.degToRad(-7);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.78, 128, 128]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={outerGlowFragmentShader}
          transparent
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={coronaRef}>
        <sphereGeometry args={[2.58, 128, 128]} />
        <shaderMaterial
          ref={coronaMatRef}
          vertexShader={vertexShader}
          fragmentShader={coronaFragmentShader}
          uniforms={coronaUniforms}
          transparent
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={plasmaRimRef}>
        <sphereGeometry args={[2.34, 128, 128]} />
        <shaderMaterial
          ref={plasmaMatRef}
          vertexShader={vertexShader}
          fragmentShader={plasmaRimFragmentShader}
          uniforms={plasmaUniforms}
          transparent
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={sunRef}>
        <sphereGeometry args={[2.12, 180, 180]} />
        <meshStandardMaterial
          map={sunTexture}
          emissiveMap={sunTexture}
          emissive={new THREE.Color("#ff6a00")}
          emissiveIntensity={0.85}
          roughness={0.75}
          metalness={0.0}
        />
      </mesh>
    </group>
  );
}

export default function SunScene() {
  return (
    <div className="h-[430px] w-full overflow-hidden rounded-[32px] border border-orange-300/20 bg-black shadow-2xl shadow-orange-500/20">
      <Canvas camera={{ position: [0, 0, 6.15], fov: 45 }}>
        <color attach="background" args={["#020617"]} />

        <ambientLight intensity={0.08} />

        <pointLight position={[0, 0, 0]} intensity={24} color="#ff7a00" />
        <pointLight position={[0, 0, 0]} intensity={10} color="#ffb347" />

        <directionalLight
          position={[4, 2.5, 5]}
          intensity={0.8}
          color="#fff1d6"
        />

        <Stars
          radius={80}
          depth={40}
          count={4200}
          factor={4}
          saturation={0}
          fade
          speed={0.35}
        />

        <SunObject />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.1}
        />
      </Canvas>
    </div>
  );
}