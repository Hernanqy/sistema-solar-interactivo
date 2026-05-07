"use client";

import { useEffect, useState } from "react";

type Star = {
  id: number;
  size: number;
  top: number;
  left: number;
  duration: number;
  delay: number;
  opacity: number;
};

type Meteor = {
  id: number;
  top: number;
  left: number;
  delay: number;
  duration: number;
  length: number;
  angle: number;
  distance: number;
};

type Particle = {
  id: number;
  size: number;
  top: number;
  left: number;
  delay: number;
  duration: number;
};

export default function SpaceBackground() {
  const [smallStars, setSmallStars] = useState<Star[]>([]);
  const [brightStars, setBrightStars] = useState<Star[]>([]);
  const [meteors, setMeteors] = useState<Meteor[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setSmallStars(
      Array.from({ length: 180 }, (_, i) => ({
        id: i,
        size: Math.random() * 1.6 + 0.6,
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 6,
        opacity: Math.random() * 0.55 + 0.2,
      }))
    );

    setBrightStars(
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        size: Math.random() * 2.8 + 1.8,
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 8,
        opacity: Math.random() * 0.5 + 0.45,
      }))
    );

    const possibleAngles = [-35, -18, 24, 42, 135, 155, 205, 225];

    setMeteors(
      Array.from({ length: 4 }, (_, i) => ({
        id: i,
        top: Math.random() * 65 + 10,
        left: Math.random() * 75 + 10,
        delay: i * 7 + Math.random() * 4,
        duration: Math.random() * 1.4 + 1.8,
        length: Math.random() * 90 + 110,
        angle: possibleAngles[Math.floor(Math.random() * possibleAngles.length)],
        distance: Math.random() * 180 + 260,
      }))
    );

    setParticles(
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 2,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: Math.random() * 10 + 10,
      }))
    );
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(14,165,233,0.18),transparent_30%),radial-gradient(circle_at_80%_25%,rgba(168,85,247,0.20),transparent_35%),radial-gradient(circle_at_20%_80%,rgba(34,211,238,0.12),transparent_28%),linear-gradient(to_bottom,#020617,#030712_45%,#000000)]" />

      <div className="space-nebula-slow absolute -top-32 left-[8%] h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="space-nebula-medium absolute top-[15%] right-[5%] h-[520px] w-[520px] rounded-full bg-fuchsia-500/10 blur-3xl" />
      <div className="space-nebula-fast absolute bottom-[-10%] left-[25%] h-[460px] w-[460px] rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="space-distant-planet absolute right-[-120px] top-[12%] h-[260px] w-[260px] rounded-full opacity-40">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.55),rgba(96,165,250,0.32)_20%,rgba(30,64,175,0.25)_48%,rgba(0,0,0,0.95)_82%)] shadow-[0_0_80px_rgba(59,130,246,0.25)]" />
        <div className="absolute left-[-45px] top-[108px] h-[32px] w-[350px] rotate-[-14deg] rounded-full border border-cyan-200/20" />
      </div>

      <div className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/5" />
      <div className="absolute left-1/2 top-1/2 h-[860px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/5" />
      <div className="absolute left-1/2 top-1/2 h-[1120px] w-[1120px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/5" />

      {smallStars.map((star) => (
        <span
          key={`small-${star.id}`}
          className="space-star absolute rounded-full bg-white"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: `${star.top}%`,
            left: `${star.left}%`,
            opacity: star.opacity,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {brightStars.map((star) => (
        <span
          key={`bright-${star.id}`}
          className="space-bright-star absolute rounded-full bg-cyan-100"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: `${star.top}%`,
            left: `${star.left}%`,
            opacity: star.opacity,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {particles.map((particle) => (
        <span
          key={`particle-${particle.id}`}
          className="space-particle absolute rounded-full bg-cyan-200/30 blur-[1px]"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            top: `${particle.top}%`,
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}

      {meteors.map((meteor) => (
        <span
          key={`meteor-${meteor.id}`}
          className="meteor-object absolute"
          style={
            {
              top: `${meteor.top}%`,
              left: `${meteor.left}%`,
              width: `${meteor.length}px`,
              transform: `rotate(${meteor.angle}deg)`,
              animationDelay: `${meteor.delay}s`,
              animationDuration: `${meteor.duration}s`,
              "--meteor-distance": `${meteor.distance}px`,
            } as React.CSSProperties
          }
        >
          <span className="meteor-tail" />
          <span className="meteor-head" />
        </span>
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}