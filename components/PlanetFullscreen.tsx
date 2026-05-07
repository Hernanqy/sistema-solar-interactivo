"use client";

import { useEffect } from "react";

import SunScene from "@/components/SunScene";
import MercuryScene from "@/components/MercuryScene";
import VenusScene from "@/components/VenusScene";
import EarthScene from "@/components/EarthScene";
import MarsScene from "@/components/MarsScene";
import JupiterScene from "@/components/JupiterScene";
import SaturnScene from "@/components/SaturnScene";
import UranusScene from "@/components/UranusScene";
import NeptuneScene from "@/components/NeptuneScene";

type FullscreenAstro = {
  id: string;
  name: string;
  icon: string;
  badge: string;
};

export default function PlanetFullscreen({
  astro,
  onClose,
}: {
  astro: FullscreenAstro;
  onClose: () => void;
}) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-3 text-white backdrop-blur-xl sm:p-5"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(34,211,238,0.16),transparent_35%),radial-gradient(circle_at_80%_25%,rgba(168,85,247,0.13),transparent_32%),linear-gradient(to_bottom,#020617,#000000)]" />

      <div
        className="relative z-10 flex h-full w-full max-w-7xl flex-col"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="mb-3 flex items-center justify-between gap-3 rounded-3xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-200">
              🔭 Modo observación ampliada
            </p>

            <h2 className="text-2xl font-black sm:text-4xl">
              {astro.icon} {astro.name}
            </h2>

            <p className="text-sm font-bold text-slate-300">{astro.badge}</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-2xl bg-white px-5 py-3 text-base font-black text-black transition hover:scale-105 hover:bg-cyan-100"
          >
            ✕ Cerrar
          </button>
        </header>

        <div className="min-h-0 flex-1 rounded-[32px] border border-white/10 bg-black/40 p-2 shadow-2xl backdrop-blur-md">
          <div className="[&>div]:h-[72vh] [&>div]:w-full [&>div]:rounded-[28px] sm:[&>div]:h-[76vh] lg:[&>div]:h-[80vh]">
            <FullscreenVisual astroId={astro.id} />
          </div>
        </div>

        <p className="mt-3 text-center text-xs font-bold uppercase tracking-[0.25em] text-white/50">
          Tocá fuera del panel o presioná ESC para volver
        </p>
      </div>
    </div>
  );
}

function FullscreenVisual({ astroId }: { astroId: string }) {
  if (astroId === "sun") return <SunScene />;
  if (astroId === "mercury") return <MercuryScene />;
  if (astroId === "venus") return <VenusScene />;
  if (astroId === "earth") return <EarthScene />;
  if (astroId === "mars") return <MarsScene />;
  if (astroId === "jupiter") return <JupiterScene />;
  if (astroId === "saturn") return <SaturnScene />;
  if (astroId === "uranus") return <UranusScene />;
  if (astroId === "neptune") return <NeptuneScene />;

  return null;
}