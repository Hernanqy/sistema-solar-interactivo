"use client";

import { useState } from "react";

import SunScene from "@/components/SunScene";
import MercuryScene from "@/components/MercuryScene";
import VenusScene from "@/components/VenusScene";
import EarthScene from "@/components/EarthScene";
import MarsScene from "@/components/MarsScene";
import JupiterScene from "@/components/JupiterScene";
import SaturnScene from "@/components/SaturnScene";
import UranusScene from "@/components/UranusScene";
import NeptuneScene from "@/components/NeptuneScene";

import SpaceBackground from "@/components/SpaceBackground";
import MissionIntro from "@/components/MissionIntro";

type Phase = "intro" | "observe" | "info" | "quiz" | "result" | "final";

type ColorKey =
  | "orange"
  | "stone"
  | "amber"
  | "blue"
  | "red"
  | "yellow"
  | "cyan"
  | "indigo";

type Astro = {
  id: string;
  name: string;
  icon: string;
  stop: string;
  badge: string;
  color: ColorKey;
  guideIcon: string;
  guideTitle: string;
  guideText: string;
  introText: string;
  strip: {
    icon: string;
    text: string;
  }[];
  infoParagraphs: string[];
  facts: string[];
  curiosity: string;
  question: string;
  options: string[];
  correctAnswer: string;
  correctPlainAnswer: string;
  explanation: string;
  achievement: string;
};

const COLOR_CLASSES: Record<
  ColorKey,
  {
    tag: string;
    button: string;
    card: string;
  }
> = {
  orange: {
    tag: "bg-orange-300/15 text-orange-200",
    button: "bg-orange-300 hover:bg-orange-200",
    card: "border-orange-300/20 bg-orange-300/10 text-orange-200",
  },
  stone: {
    tag: "bg-stone-300/15 text-stone-200",
    button: "bg-stone-300 hover:bg-stone-200",
    card: "border-stone-300/20 bg-stone-300/10 text-stone-200",
  },
  amber: {
    tag: "bg-amber-300/15 text-amber-200",
    button: "bg-amber-300 hover:bg-amber-200",
    card: "border-amber-300/20 bg-amber-300/10 text-amber-200",
  },
  blue: {
    tag: "bg-blue-300/15 text-blue-200",
    button: "bg-blue-300 hover:bg-blue-200",
    card: "border-blue-300/20 bg-blue-300/10 text-blue-200",
  },
  red: {
    tag: "bg-red-300/15 text-red-200",
    button: "bg-red-300 hover:bg-red-200",
    card: "border-red-300/20 bg-red-300/10 text-red-200",
  },
  yellow: {
    tag: "bg-yellow-300/15 text-yellow-200",
    button: "bg-yellow-300 hover:bg-yellow-200",
    card: "border-yellow-300/20 bg-yellow-300/10 text-yellow-200",
  },
  cyan: {
    tag: "bg-cyan-300/15 text-cyan-200",
    button: "bg-cyan-300 hover:bg-cyan-200",
    card: "border-cyan-300/20 bg-cyan-300/10 text-cyan-200",
  },
  indigo: {
    tag: "bg-indigo-300/15 text-indigo-200",
    button: "bg-indigo-300 hover:bg-indigo-200",
    card: "border-indigo-300/20 bg-indigo-300/10 text-indigo-200",
  },
};

const ASTROS: Astro[] = [
  {
    id: "sun",
    name: "El Sol",
    icon: "☀️",
    stop: "Primera parada",
    badge: "☀️ Estrella",
    color: "orange",
    guideIcon: "🧑‍🚀",
    guideTitle: "Guía de misión",
    guideText:
      "Observemos al Sol. Parece una bola de fuego, pero en realidad es una estrella enorme de gas caliente.",
    introText:
      "El Sol nos entrega luz, calor y energía. Sin él, la vida en la Tierra no existiría como la conocemos.",
    strip: [
      { icon: "☀️", text: "Es una estrella" },
      { icon: "🔥", text: "Muy caliente" },
      { icon: "🌍", text: "La Tierra gira a su alrededor" },
    ],
    infoParagraphs: [
      "El Sol es una enorme esfera de gas caliente.",
      "En su interior se produce energía que viaja por el espacio en forma de luz y calor.",
    ],
    facts: [
      "☀️ Es el centro del Sistema Solar.",
      "🌍 La Tierra gira alrededor del Sol.",
      "⏱️ Su luz tarda unos 8 minutos en llegar a nosotros.",
    ],
    curiosity:
      "Aunque muchas veces lo dibujamos amarillo, el Sol emite luz de muchos colores juntos.",
    question: "¿Qué es el Sol?",
    options: ["🌎 Un planeta", "☀️ Una estrella", "🌙 Una luna"],
    correctAnswer: "☀️ Una estrella",
    correctPlainAnswer: "Una estrella",
    explanation:
      "El Sol es una estrella: una enorme esfera de gas caliente que produce luz y calor.",
    achievement: "Explorador del Sol",
  },
  {
    id: "mercury",
    name: "Mercurio",
    icon: "☿",
    stop: "Segunda parada",
    badge: "☿ Planeta rocoso",
    color: "stone",
    guideIcon: "🤖",
    guideTitle: "Robot explorador",
    guideText:
      "Ahora visitamos Mercurio. Es pequeño, rocoso y está muy cerca del Sol.",
    introText:
      "Mercurio es el planeta más cercano al Sol. Su superficie está llena de cráteres, parecida a la Luna.",
    strip: [
      { icon: "🪨", text: "Rocoso" },
      { icon: "☀️", text: "Cercano al Sol" },
      { icon: "🌑", text: "Con cráteres" },
    ],
    infoParagraphs: [
      "Mercurio es un planeta rocoso.",
      "Como está muy cerca del Sol, tiene cambios extremos de temperatura.",
    ],
    facts: [
      "🪨 Es un planeta rocoso.",
      "☀️ Es el planeta más cercano al Sol.",
      "🌑 Tiene muchos cráteres en su superficie.",
    ],
    curiosity: "En Mercurio, un día solar dura más que un año mercuriano.",
    question: "¿Cuál es una característica de Mercurio?",
    options: [
      "☀️ Es el planeta más cercano al Sol",
      "🌊 Tiene grandes océanos",
      "☁️ Es un gigante gaseoso",
    ],
    correctAnswer: "☀️ Es el planeta más cercano al Sol",
    correctPlainAnswer: "Es el planeta más cercano al Sol",
    explanation:
      "Mercurio es el planeta más cercano al Sol y uno de los planetas rocosos del Sistema Solar.",
    achievement: "Explorador de Mercurio",
  },
  {
    id: "venus",
    name: "Venus",
    icon: "♀",
    stop: "Tercera parada",
    badge: "♀ Planeta caliente",
    color: "amber",
    guideIcon: "🛰️",
    guideTitle: "Guía de misión",
    guideText:
      "Llegamos a Venus. Aunque parece brillante y hermoso, es uno de los lugares más extremos del Sistema Solar.",
    introText:
      "Venus es un planeta rocoso cubierto por nubes muy densas. Su atmósfera atrapa muchísimo calor.",
    strip: [
      { icon: "☁️", text: "Nubes densas" },
      { icon: "🔥", text: "Muy caliente" },
      { icon: "♀", text: "Planeta rocoso" },
    ],
    infoParagraphs: [
      "Venus es parecido a la Tierra en tamaño, pero su ambiente es muy diferente.",
      "Su atmósfera es tan densa que atrapa el calor como una manta gigante.",
    ],
    facts: [
      "🔥 Es el planeta más caliente del Sistema Solar.",
      "☁️ Está cubierto por nubes muy densas.",
      "🌅 Puede verse muy brillante desde la Tierra.",
    ],
    curiosity:
      "A Venus muchas veces se lo llama el lucero, porque puede verse muy brillante al amanecer o al atardecer.",
    question: "¿Por qué Venus es tan caliente?",
    options: [
      "☁️ Porque su atmósfera atrapa mucho calor",
      "🌊 Porque tiene océanos hirviendo",
      "🧊 Porque está cubierto de hielo",
    ],
    correctAnswer: "☁️ Porque su atmósfera atrapa mucho calor",
    correctPlainAnswer: "Porque su atmósfera atrapa mucho calor",
    explanation:
      "Venus es tan caliente porque su atmósfera densa retiene muchísimo calor.",
    achievement: "Explorador de Venus",
  },
  {
    id: "earth",
    name: "La Tierra",
    icon: "🌍",
    stop: "Cuarta parada",
    badge: "🌍 Nuestro hogar",
    color: "blue",
    guideIcon: "🌎",
    guideTitle: "Planeta hogar",
    guideText:
      "Llegamos a la Tierra, el planeta donde vivimos. Tiene agua, aire y una gran variedad de seres vivos.",
    introText:
      "La Tierra es especial porque tiene agua líquida, una atmósfera protectora y condiciones que permiten la vida.",
    strip: [
      { icon: "💧", text: "Tiene agua" },
      { icon: "🌱", text: "Hay vida" },
      { icon: "🌙", text: "Tiene una Luna" },
    ],
    infoParagraphs: [
      "La Tierra es un planeta rocoso.",
      "Vista desde el espacio se ve azul por la gran cantidad de agua de sus océanos.",
    ],
    facts: [
      "💧 Tiene agua líquida en la superficie.",
      "🌬️ Su atmósfera nos protege.",
      "🌙 Tiene un satélite natural: la Luna.",
    ],
    curiosity:
      "Desde el espacio, la Tierra se ve como una esfera azul y blanca.",
    question: "¿Por qué la Tierra se ve azul desde el espacio?",
    options: [
      "💧 Por sus océanos",
      "🔥 Porque está muy caliente",
      "🪨 Porque está hecha de roca azul",
    ],
    correctAnswer: "💧 Por sus océanos",
    correctPlainAnswer: "Por sus océanos",
    explanation:
      "La Tierra se ve azul principalmente por el agua de sus océanos.",
    achievement: "Explorador de la Tierra",
  },
  {
    id: "mars",
    name: "Marte",
    icon: "♂",
    stop: "Quinta parada",
    badge: "♂ Planeta rojo",
    color: "red",
    guideIcon: "🚗",
    guideTitle: "Rover explorador",
    guideText:
      "Ahora vamos a Marte, el planeta rojo. Muchos robots lo han visitado para estudiar su superficie.",
    introText:
      "Marte es un planeta rocoso y rojizo. Su color viene del polvo con óxido de hierro.",
    strip: [
      { icon: "🔴", text: "Planeta rojo" },
      { icon: "🪨", text: "Rocoso" },
      { icon: "🤖", text: "Explorado por robots" },
    ],
    infoParagraphs: [
      "Marte es más frío que la Tierra y tiene una atmósfera muy delgada.",
      "En su superficie hay montañas, valles y antiguos cauces que parecen haber tenido agua.",
    ],
    facts: [
      "🔴 Se lo conoce como el planeta rojo.",
      "⛰️ Tiene montañas y volcanes enormes.",
      "🤖 Ha sido explorado por rovers.",
    ],
    curiosity:
      "Marte tiene el Monte Olimpo, uno de los volcanes más grandes conocidos del Sistema Solar.",
    question: "¿Por qué Marte se ve rojizo?",
    options: [
      "🪨 Por el óxido de hierro de su superficie",
      "🌊 Por sus océanos rojos",
      "☀️ Porque está muy cerca del Sol",
    ],
    correctAnswer: "🪨 Por el óxido de hierro de su superficie",
    correctPlainAnswer: "Por el óxido de hierro de su superficie",
    explanation:
      "El polvo rico en óxido de hierro le da a Marte su color rojizo.",
    achievement: "Explorador de Marte",
  },
  {
    id: "jupiter",
    name: "Júpiter",
    icon: "♃",
    stop: "Sexta parada",
    badge: "♃ Gigante gaseoso",
    color: "yellow",
    guideIcon: "🌪️",
    guideTitle: "Alerta de tormenta",
    guideText:
      "Júpiter es enorme. Es el planeta más grande y tiene tormentas gigantescas.",
    introText:
      "Júpiter es un gigante gaseoso. No tiene una superficie sólida como la Tierra.",
    strip: [
      { icon: "📏", text: "El más grande" },
      { icon: "☁️", text: "Gaseoso" },
      { icon: "🌪️", text: "Gran tormenta" },
    ],
    infoParagraphs: [
      "Júpiter es el planeta más grande del Sistema Solar.",
      "Tiene bandas de nubes y una tormenta famosa llamada Gran Mancha Roja.",
    ],
    facts: [
      "📏 Es el planeta más grande.",
      "☁️ Es un gigante gaseoso.",
      "🌪️ Tiene una gran tormenta llamada Gran Mancha Roja.",
    ],
    curiosity:
      "Júpiter es tan grande que muchos planetas Tierra podrían caber dentro de él.",
    question: "¿Qué tipo de planeta es Júpiter?",
    options: ["☁️ Gigante gaseoso", "🪨 Planeta rocoso pequeño", "🌙 Una luna"],
    correctAnswer: "☁️ Gigante gaseoso",
    correctPlainAnswer: "Gigante gaseoso",
    explanation:
      "Júpiter es un gigante gaseoso: está formado principalmente por gases.",
    achievement: "Explorador de Júpiter",
  },
  {
    id: "saturn",
    name: "Saturno",
    icon: "♄",
    stop: "Séptima parada",
    badge: "♄ Planeta con anillos",
    color: "yellow",
    guideIcon: "🪐",
    guideTitle: "Anillos a la vista",
    guideText:
      "Saturno es famoso por sus anillos. Son enormes y están formados por muchas partículas.",
    introText:
      "Saturno es un gigante gaseoso con anillos muy brillantes hechos de hielo y roca.",
    strip: [
      { icon: "🪐", text: "Tiene anillos" },
      { icon: "☁️", text: "Gaseoso" },
      { icon: "🧊", text: "Hielo y roca" },
    ],
    infoParagraphs: [
      "Saturno es uno de los planetas más reconocibles por sus anillos.",
      "Sus anillos están formados por muchísimas partículas de hielo y roca.",
    ],
    facts: [
      "🪐 Tiene anillos muy visibles.",
      "☁️ Es un gigante gaseoso.",
      "🧊 Sus anillos tienen hielo y roca.",
    ],
    curiosity:
      "Saturno es tan poco denso que, en una bañera imaginaria gigante, podría flotar.",
    question: "¿De qué están formados los anillos de Saturno?",
    options: ["🧊 Hielo y roca", "🔥 Fuego", "🌊 Agua líquida"],
    correctAnswer: "🧊 Hielo y roca",
    correctPlainAnswer: "Hielo y roca",
    explanation:
      "Los anillos de Saturno están formados por muchas partículas de hielo y roca.",
    achievement: "Explorador de Saturno",
  },
  {
    id: "uranus",
    name: "Urano",
    icon: "⛢",
    stop: "Octava parada",
    badge: "⛢ Gigante helado",
    color: "cyan",
    guideIcon: "🧊",
    guideTitle: "Planeta inclinado",
    guideText:
      "Urano es un gigante helado muy especial: parece girar de costado.",
    introText:
      "Urano tiene un color azul verdoso y gira muy inclinado, casi como si rodara por su órbita.",
    strip: [
      { icon: "🧊", text: "Gigante helado" },
      { icon: "↩️", text: "Muy inclinado" },
      { icon: "🔵", text: "Azul verdoso" },
    ],
    infoParagraphs: [
      "Urano es un gigante helado.",
      "Su eje está tan inclinado que parece girar acostado.",
    ],
    facts: [
      "🧊 Es un gigante helado.",
      "↩️ Gira muy inclinado.",
      "🔵 Tiene color azul verdoso.",
    ],
    curiosity:
      "Urano parece girar de lado, como si estuviera rodando alrededor del Sol.",
    question: "¿Qué característica especial tiene Urano?",
    options: [
      "↩️ Gira muy inclinado",
      "🔥 Es el planeta más caliente",
      "🪐 Tiene los anillos más brillantes",
    ],
    correctAnswer: "↩️ Gira muy inclinado",
    correctPlainAnswer: "Gira muy inclinado",
    explanation:
      "Urano tiene una inclinación extrema y parece girar casi de costado.",
    achievement: "Explorador de Urano",
  },
  {
    id: "neptune",
    name: "Neptuno",
    icon: "♆",
    stop: "Novena parada",
    badge: "♆ Gigante helado",
    color: "indigo",
    guideIcon: "💨",
    guideTitle: "Vientos lejanos",
    guideText:
      "Llegamos a Neptuno, uno de los planetas más lejanos del Sol y con vientos muy veloces.",
    introText:
      "Neptuno es un gigante helado de color azul intenso. Está muy lejos del Sol.",
    strip: [
      { icon: "🔵", text: "Azul intenso" },
      { icon: "💨", text: "Vientos veloces" },
      { icon: "🧊", text: "Gigante helado" },
    ],
    infoParagraphs: [
      "Neptuno es uno de los planetas más lejanos del Sol.",
      "Tiene un color azul intenso y vientos extremadamente veloces.",
    ],
    facts: [
      "🔵 Tiene color azul intenso.",
      "💨 Tiene vientos muy veloces.",
      "🧊 Es un gigante helado.",
    ],
    curiosity:
      "Neptuno fue descubierto gracias a cálculos matemáticos antes de observarse directamente con telescopio.",
    question: "¿Qué color caracteriza a Neptuno?",
    options: ["🔵 Azul intenso", "🔴 Rojo brillante", "🟢 Verde neón"],
    correctAnswer: "🔵 Azul intenso",
    correctPlainAnswer: "Azul intenso",
    explanation:
      "Neptuno se reconoce por su color azul intenso y por estar muy lejos del Sol.",
    achievement: "Explorador de Neptuno",
  },
];

export default function Page() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [astroIndex, setAstroIndex] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);

  const astro = ASTROS[astroIndex];
  const isLastAstro = astroIndex === ASTROS.length - 1;
  const color = COLOR_CLASSES[astro.color];

  function goToPhase(nextPhase: Phase) {
    setAnswer(null);
    setPhase(nextPhase);
  }

  function goToNextAstro() {
    setAnswer(null);

    if (isLastAstro) {
      setPhase("final");
      return;
    }

    setAstroIndex((current) => current + 1);
    setPhase("observe");
  }

  function restartMission() {
    setAnswer(null);
    setAstroIndex(0);
    setPhase("intro");
  }

  if (phase === "intro") {
    return <MissionIntro onLaunch={() => setPhase("observe")} />;
  }

  if (phase === "final") {
    return (
      <main className="relative h-screen overflow-hidden bg-black text-white">
        <SpaceBackground />

        <section className="relative z-10 flex h-screen items-center justify-center px-6 text-center">
          <div className="max-w-4xl rounded-[36px] border border-white/15 bg-white/10 p-10 shadow-2xl backdrop-blur-md">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-cyan-300/20 text-6xl shadow-lg shadow-cyan-300/20">
              🏅
            </div>

            <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
              Misión completada
            </p>

            <h1 className="mb-6 text-5xl font-black md:text-7xl">
              ¡Exploradores del Sistema Solar!
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-xl text-slate-200">
              Visitamos el Sol y los principales planetas. Ahora el equipo puede
              conversar: ¿cuál fue el astro más sorprendente?
            </p>

            <button
              onClick={restartMission}
              className="rounded-2xl bg-cyan-300 px-8 py-4 text-lg font-black text-black transition hover:scale-105 hover:bg-cyan-200"
            >
              🔁 Reiniciar misión
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="relative h-screen overflow-hidden bg-black text-white">
      <SpaceBackground />

      <section className="relative z-10 mx-auto grid h-screen max-w-7xl items-center gap-8 px-8 py-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="min-h-0">
          <ProgressBar current={astroIndex} />

          <div className="mb-4 flex flex-wrap items-center gap-3">
            <p
              className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.25em] ${color.tag}`}
            >
              {astro.stop}
            </p>

            <p className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white">
              {astro.badge}
            </p>
          </div>

          <h1 className="mb-4 text-5xl font-black md:text-7xl">
            {astro.name}
          </h1>

          {phase === "observe" && (
            <>
              <GuideMessage
                icon={astro.guideIcon}
                title={astro.guideTitle}
                text={astro.guideText}
              />

              <p className="mb-5 text-xl text-slate-200">{astro.introText}</p>

              <InfoStrip items={astro.strip} />

              <button
                onClick={() => goToPhase("info")}
                className={`mt-6 rounded-2xl px-7 py-3 text-base font-black text-black transition hover:scale-105 ${color.button}`}
              >
                📘 Ver información
              </button>
            </>
          )}

          {phase === "info" && (
            <>
              <LearningCard
                title="Información importante"
                icon="📘"
                color={astro.color}
                paragraphs={astro.infoParagraphs}
                facts={astro.facts}
                curiosity={astro.curiosity}
              />

              <button
                onClick={() => goToPhase("quiz")}
                className={`mt-5 rounded-2xl px-7 py-3 text-base font-black text-black transition hover:scale-105 ${color.button}`}
              >
                ❓ Responder pregunta
              </button>
            </>
          )}

          {phase === "quiz" && (
            <QuizCard
              question={astro.question}
              options={astro.options}
              correctPlainAnswer={astro.correctPlainAnswer}
              onAnswer={(value) => {
                setAnswer(value);
                setPhase("result");
              }}
            />
          )}

          {phase === "result" && (
            <>
              <ResultCard
                answer={answer}
                correctAnswer={astro.correctAnswer}
                explanation={astro.explanation}
                achievement={astro.achievement}
              />

              <div className="mt-6 flex flex-wrap gap-4">
                <button
                  onClick={() => goToPhase("quiz")}
                  className="rounded-2xl bg-white px-7 py-3 text-base font-black text-black transition hover:scale-105"
                >
                  🔁 Repetir pregunta
                </button>

                <button
                  onClick={goToNextAstro}
                  className={`rounded-2xl px-7 py-3 text-base font-black text-black transition hover:scale-105 ${color.button}`}
                >
                  {isLastAstro
                    ? "🏁 Finalizar misión"
                    : `🪐 Ir a ${ASTROS[astroIndex + 1].name}`}
                </button>
              </div>
            </>
          )}
        </div>

        <div className="relative min-h-0">
          <div className="mb-3 rounded-3xl border border-white/10 bg-white/10 p-3 text-center backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-200">
              🔭 Ventana de observación
            </p>
          </div>

          <PlanetVisual astro={astro} />
        </div>
      </section>
    </main>
  );
}

function PlanetVisual({ astro }: { astro: Astro }) {
  if (astro.id === "sun") return <SunScene />;
  if (astro.id === "mercury") return <MercuryScene />;
  if (astro.id === "venus") return <VenusScene />;
  if (astro.id === "earth") return <EarthScene />;
  if (astro.id === "mars") return <MarsScene />;
  if (astro.id === "jupiter") return <JupiterScene />;
  if (astro.id === "saturn") return <SaturnScene />;
  if (astro.id === "uranus") return <UranusScene />;
  if (astro.id === "neptune") return <NeptuneScene />;

  return null;
}

function ProgressBar({ current }: { current: number }) {
  return (
    <div className="mb-5 rounded-3xl border border-white/10 bg-white/10 p-3 backdrop-blur">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-200">
        🚀 Ruta de la misión
      </p>

      <div className="flex items-center gap-2 overflow-hidden">
        {ASTROS.map((planet, index) => (
          <div key={planet.id} className="flex items-center gap-2">
            <div
              className={`flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-2xl border text-lg transition ${
                index === current
                  ? "border-cyan-300 bg-cyan-300 text-black shadow-lg shadow-cyan-300/30"
                  : index < current
                    ? "border-green-300/40 bg-green-300/15 text-green-100"
                    : "border-white/10 bg-white/5 text-white/70"
              }`}
              title={planet.name}
            >
              <span>{planet.icon}</span>
            </div>

            {index < ASTROS.length - 1 && (
              <div
                className={`h-1 w-4 rounded-full ${
                  index < current ? "bg-green-300" : "bg-white/15"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function GuideMessage({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="mb-5 flex gap-4 rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-4 backdrop-blur">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-300/20 text-3xl">
        {icon}
      </div>

      <div>
        <h2 className="mb-1 text-lg font-black text-cyan-100">{title}</h2>
        <p className="text-base text-slate-200">{text}</p>
      </div>
    </div>
  );
}

function InfoStrip({
  items,
}: {
  items: {
    icon: string;
    text: string;
  }[];
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.text}
          className="rounded-2xl border border-white/10 bg-white/10 p-3 text-center backdrop-blur"
        >
          <div className="mb-1 text-3xl">{item.icon}</div>
          <p className="text-sm font-bold text-slate-100">{item.text}</p>
        </div>
      ))}
    </div>
  );
}

function LearningCard({
  title,
  icon,
  color,
  paragraphs,
  facts,
  curiosity,
}: {
  title: string;
  icon: string;
  color: ColorKey;
  paragraphs: string[];
  facts: string[];
  curiosity: string;
}) {
  const colorClass = COLOR_CLASSES[color].card;

  return (
    <div className="space-y-3 rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl border text-3xl ${colorClass}`}
        >
          {icon}
        </div>

        <h2 className="text-2xl font-black">{title}</h2>
      </div>

      {paragraphs.map((paragraph) => (
        <p key={paragraph} className="text-lg leading-snug text-slate-200">
          {paragraph}
        </p>
      ))}

      <div className="grid gap-2">
        {facts.map((fact) => (
          <div
            key={fact}
            className="rounded-2xl border border-white/10 bg-black/25 p-3 text-base font-bold text-slate-100"
          >
            {fact}
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-yellow-300/20 bg-yellow-300/10 p-4">
        <h3 className="mb-1 text-lg font-black text-yellow-200">
          💡 Curiosidad
        </h3>
        <p className="text-base leading-snug text-slate-200">{curiosity}</p>
      </div>
    </div>
  );
}

function QuizCard({
  question,
  options,
  correctPlainAnswer,
  onAnswer,
}: {
  question: string;
  options: string[];
  correctPlainAnswer: string;
  onAnswer: (value: string) => void;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
      <div className="mb-5 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-300/20 text-3xl">
          ❓
        </div>

        <div>
          <h2 className="text-2xl font-black text-cyan-200">
            Pregunta para el auditorio
          </h2>
          <p className="text-sm text-slate-300">
            Elijan juntos la respuesta correcta.
          </p>
        </div>
      </div>

      <p className="mb-5 text-xl font-bold text-slate-100">{question}</p>

      <div className="grid gap-3">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onAnswer(option)}
            className="rounded-2xl border border-white/15 bg-white/10 p-4 text-left text-lg font-bold transition hover:scale-[1.02] hover:bg-white/20"
          >
            {option}
          </button>
        ))}
      </div>

      <p className="mt-4 text-xs text-slate-400">
        Pista para el docente: la respuesta correcta es “{correctPlainAnswer}”.
      </p>
    </div>
  );
}

function ResultCard({
  answer,
  correctAnswer,
  explanation,
  achievement,
}: {
  answer: string | null;
  correctAnswer: string;
  explanation: string;
  achievement: string;
}) {
  const isCorrect = answer === correctAnswer;

  return (
    <div
      className={`rounded-3xl border p-5 backdrop-blur ${
        isCorrect
          ? "border-green-300/30 bg-green-300/10"
          : "border-red-300/30 bg-red-300/10"
      }`}
    >
      <div className="mb-4 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 text-4xl">
          {isCorrect ? "🏅" : "💡"}
        </div>

        <div>
          <h2 className="text-2xl font-black">
            {isCorrect ? "¡Respuesta correcta!" : "Buen intento"}
          </h2>
          <p className="text-base text-slate-300">
            {isCorrect
              ? `Logro desbloqueado: ${achievement}`
              : "Aprender también es probar otra vez."}
          </p>
        </div>
      </div>

      <p className="mb-3 text-lg text-slate-200">
        Tu respuesta: <strong>{answer}</strong>
      </p>

      {!isCorrect && (
        <p className="mb-3 text-lg text-slate-200">
          Respuesta correcta: <strong>{correctAnswer}</strong>
        </p>
      )}

      <p className="text-lg leading-snug text-slate-200">{explanation}</p>
    </div>
  );
}