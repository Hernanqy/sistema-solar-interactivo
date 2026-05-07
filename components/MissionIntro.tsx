"use client";

import { useState } from "react";
import SpaceBackground from "@/components/SpaceBackground";

export default function MissionIntro({
  onLaunch,
}: {
  onLaunch: () => void;
}) {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [launching, setLaunching] = useState(false);

  function startLaunch() {
    if (launching) return;

    setLaunching(true);
    setCountdown(3);

    setTimeout(() => setCountdown(2), 900);
    setTimeout(() => setCountdown(1), 1800);
    setTimeout(() => setCountdown(0), 2700);
    setTimeout(() => onLaunch(), 3600);
  }

  return (
    <main className="relative h-screen overflow-hidden bg-black text-white">
      <SpaceBackground />

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black" />

      {launching && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="text-center">
            <div className="mb-6 text-8xl font-black text-cyan-200 drop-shadow-[0_0_35px_rgba(103,232,249,0.9)]">
              {countdown === 0 ? "🚀" : countdown}
            </div>

            <p className="text-2xl font-black uppercase tracking-[0.35em] text-cyan-200">
              {countdown === 0 ? "¡Despegando!" : "Preparando despegue"}
            </p>

            <div className="mx-auto mt-8 h-2 w-80 overflow-hidden rounded-full bg-white/10">
              <div className="launch-progress h-full rounded-full bg-cyan-300" />
            </div>
          </div>
        </div>
      )}

      <section className="relative z-10 grid h-screen grid-cols-1 items-center gap-8 px-8 py-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="mx-auto max-w-xl">
          <p className="mb-4 text-sm font-black uppercase tracking-[0.35em] text-cyan-300">
            Bienvenidos exploradores
          </p>

          <h1 className="mb-6 text-5xl font-black leading-tight md:text-7xl">
            Misión Sistema Solar
          </h1>

          <div className="mb-6 rounded-[32px] border border-cyan-300/20 bg-cyan-300/10 p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur-md">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-300/20 text-4xl">
                🤖
              </div>

              <div>
                <h2 className="text-2xl font-black text-cyan-100">
                  Hola, soy Orbit
                </h2>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
                  Guía de misión
                </p>
              </div>
            </div>

            <p className="text-xl leading-relaxed text-slate-100">
              Hoy viajaremos por el Sistema Solar. Observaremos astros en 3D,
              descubriremos curiosidades y responderemos preguntas como un
              verdadero equipo de exploradores espaciales.
            </p>
          </div>

          <div className="mb-7 grid gap-3 sm:grid-cols-3">
            <IntroBadge icon="🔭" text="Observar" />
            <IntroBadge icon="🧠" text="Pensar" />
            <IntroBadge icon="⭐" text="Lograr" />
          </div>

          <button
            onClick={startLaunch}
            disabled={launching}
            className="group relative overflow-hidden rounded-3xl bg-red-500 px-10 py-5 text-xl font-black text-white shadow-2xl shadow-red-500/30 transition hover:scale-105 hover:bg-red-400 disabled:opacity-60"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition group-hover:translate-x-full group-hover:opacity-100" />
            🔴 Accionar despegue
          </button>
        </div>

        <div className="relative mx-auto flex h-[520px] w-full max-w-xl items-center justify-center">
          <div className="absolute h-[360px] w-[360px] rounded-full border border-cyan-300/15" />
          <div className="absolute h-[460px] w-[460px] rounded-full border border-cyan-300/10" />
          <div className="absolute h-[560px] w-[560px] rounded-full border border-cyan-300/5" />

          <div className="robot-glow absolute h-[340px] w-[340px] rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="robot-float relative">
            <div className="relative mx-auto h-72 w-64 rounded-[48px] border border-cyan-200/25 bg-gradient-to-b from-cyan-200/25 via-slate-900/90 to-cyan-950/90 shadow-2xl shadow-cyan-500/25 backdrop-blur-md">
              <div className="absolute left-1/2 top-[-38px] h-16 w-16 -translate-x-1/2 rounded-full border border-cyan-200/30 bg-slate-950 shadow-lg shadow-cyan-400/30">
                <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_25px_rgba(103,232,249,1)]" />
              </div>

              <div className="absolute left-1/2 top-16 flex w-40 -translate-x-1/2 justify-between">
                <div className="robot-eye h-8 w-8 rounded-full bg-cyan-200 shadow-[0_0_20px_rgba(103,232,249,1)]" />
                <div className="robot-eye h-8 w-8 rounded-full bg-cyan-200 shadow-[0_0_20px_rgba(103,232,249,1)]" />
              </div>

              <div className="absolute left-1/2 top-32 h-6 w-28 -translate-x-1/2 rounded-full bg-cyan-300/20">
                <div className="robot-mouth mx-auto mt-2 h-2 w-16 rounded-full bg-cyan-200/80" />
              </div>

              <div className="absolute bottom-10 left-1/2 grid w-40 -translate-x-1/2 grid-cols-3 gap-3">
                <div className="h-5 rounded-full bg-cyan-300/25" />
                <div className="h-5 rounded-full bg-cyan-300/45" />
                <div className="h-5 rounded-full bg-cyan-300/25" />
              </div>

              <div className="absolute -left-12 top-24 h-24 w-10 rounded-full border border-cyan-200/20 bg-cyan-300/10" />
              <div className="absolute -right-12 top-24 h-24 w-10 rounded-full border border-cyan-200/20 bg-cyan-300/10" />
            </div>

            <div className="mx-auto mt-5 h-10 w-36 rounded-[100%] bg-cyan-300/15 blur-md" />
          </div>
        </div>
      </section>
    </main>
  );
}

function IntroBadge({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center backdrop-blur">
      <div className="mb-1 text-3xl">{icon}</div>
      <p className="font-black text-slate-100">{text}</p>
    </div>
  );
}