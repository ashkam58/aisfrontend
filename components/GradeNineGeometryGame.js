"use client";

import { useMemo, useState } from "react";

const LEVELS = [
  {
    id: 1,
    title: "Triangle Twirl",
    mascot: "Prism Patrol",
    description: "Rotate the hero triangle and slide it into the neon goal zone.",
    baseShape: "triangle",
    target: {
      rotation: -60,
      scale: 1,
      translateX: 140,
      translateY: -30,
    },
  },
  {
    id: 2,
    title: "Quad Squad Boost",
    mascot: "Captain Parallelogram",
    description: "Dilate the shape, then line it up with the checkerboard landing pad.",
    baseShape: "parallelogram",
    target: {
      rotation: 25,
      scale: 1.4,
      translateX: 110,
      translateY: 45,
    },
  },
  {
    id: 3,
    title: "Starship Stretch",
    mascot: "Galaxy Kite",
    description: "You need both rotation and dilation to dock with the space beacon.",
    baseShape: "kite",
    target: {
      rotation: 120,
      scale: 0.8,
      translateX: 10,
      translateY: 65,
    },
  },
];

const BASE_POINTS = {
  triangle: [
    { x: -40, y: 40 },
    { x: 40, y: 40 },
    { x: 0, y: -40 },
  ],
  parallelogram: [
    { x: -50, y: 35 },
    { x: 15, y: 35 },
    { x: 50, y: -35 },
    { x: -15, y: -35 },
  ],
  kite: [
    { x: 0, y: -60 },
    { x: 45, y: 0 },
    { x: 0, y: 40 },
    { x: -45, y: 0 },
  ],
};

const defaultControls = {
  rotation: 0,
  scale: 1,
  translateX: 0,
  translateY: 0,
};

function toPath(points) {
  return points.map((p) => `${p.x},${p.y}`).join(" ");
}

function transformPoints(points, { rotation, scale, translateX, translateY }) {
  const rad = (rotation * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  return points.map((point) => {
    const x = point.x * scale;
    const y = point.y * scale;
    const rx = x * cos - y * sin;
    const ry = x * sin + y * cos;
    return {
      x: Math.round(rx + translateX + 200),
      y: Math.round(ry + translateY + 160),
    };
  });
}

function withinTolerance(current, target, tolerance = 4) {
  return Math.abs(current - target) <= tolerance;
}

function checkMatch(current, target) {
  return (
    withinTolerance(current.rotation, target.rotation, 6) &&
    withinTolerance(current.scale, target.scale, 0.08) &&
    withinTolerance(current.translateX, target.translateX, 10) &&
    withinTolerance(current.translateY, target.translateY, 10)
  );
}

export default function GradeNineGeometryGame() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [controls, setControls] = useState(defaultControls);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("Use the sliders and buttons to transform the shape.");
  const [showHint, setShowHint] = useState(false);

  const level = LEVELS[levelIndex];
  const basePoints = BASE_POINTS[level.baseShape];

  const playerShape = useMemo(
    () => transformPoints(basePoints, controls),
    [basePoints, controls]
  );

  const targetShape = useMemo(
    () => transformPoints(basePoints, level.target),
    [basePoints, level]
  );

  const playerPath = toPath(playerShape);
  const targetPath = toPath(targetShape);

  const handleSlider = (key) => (event) => {
    const value = Number(event.target.value);
    setControls((prev) => ({ ...prev, [key]: value }));
  };

  const nudge = (axis, amount) => () => {
    setControls((prev) => ({ ...prev, [axis]: prev[axis] + amount }));
  };

  const resetControls = () => {
    setControls(defaultControls);
    setFeedback("Reset. Try a fresh approach.");
  };

  const handleCheck = () => {
    const isMatch = checkMatch(controls, level.target);
    if (isMatch) {
      setFeedback("Nice! Your rigid motions and dilation nailed it.");
      setScore((value) => Math.max(value, levelIndex + 1));
    } else {
      setFeedback("Not yet. Tweak the rotation or translation and try again.");
    }
  };

  const handleNext = () => {
    if (levelIndex < LEVELS.length - 1) {
      setLevelIndex(levelIndex + 1);
      setControls(defaultControls);
      setShowHint(false);
      setFeedback("New mission loaded. Study the goal outline and transform the shape.");
    } else {
      setFeedback("You cleared every mission! Replay any level to reinforce the moves.");
    }
  };

  return (
    <div className="space-y-6 rounded-3xl border border-purple-200 bg-gradient-to-br from-purple-100 via-sky-100 to-emerald-100 p-6 shadow-2xl">
      <header className="space-y-2 text-center">
        <p className="text-xs uppercase tracking-wide text-purple-700">Grade 9 Geometry Cartoon Lab</p>
        <h1 className="text-3xl font-black text-purple-900">Rigid Motion Rescue</h1>
        <p className="mx-auto max-w-2xl text-sm text-purple-800">
          Help the cartoon transformation squad navigate each level with precise rotations, translations, and dilations.
          Match the glowing outline by tuning the controls, then check your move.
        </p>
        <div className="inline-flex items-center gap-4 rounded-2xl border border-purple-300 bg-white/80 px-4 py-2 text-sm font-semibold text-purple-800 shadow">
          <span>Mission: {level.title}</span>
          <span>Squad Mate: {level.mascot}</span>
          <span>Levels cleared: {score} / {LEVELS.length}</span>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-3xl border border-purple-200 bg-white/70 p-4 shadow-inner">
          <div className="relative h-[360px] rounded-2xl bg-gradient-to-br from-sky-50 via-white to-emerald-50">
            <svg viewBox="0 0 400 320" className="absolute inset-0 h-full w-full">
              <defs>
                <linearGradient id="targetFill" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fcd34d" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#f97316" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="playerFill" x1="1" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="400" height="320" fill="#f0f9ff" rx="24" />
              <g stroke="#bae6fd" strokeWidth="1">
                {Array.from({ length: 16 }).map((_, idx) => (
                  <line key={`v-${idx}`} x1={idx * 25} y1={0} x2={idx * 25} y2={320} strokeDasharray="6 6" />
                ))}
                {Array.from({ length: 13 }).map((_, idx) => (
                  <line key={`h-${idx}`} x1={0} y1={idx * 25} x2={400} y2={idx * 25} strokeDasharray="6 6" />
                ))}
              </g>
              <polygon points={targetPath} fill="url(#targetFill)" stroke="#fb923c" strokeDasharray="8 6" strokeWidth="4" />
              <polygon points={playerPath} fill="url(#playerFill)" stroke="#1e3a8a" strokeWidth="5" opacity="0.92" />
            </svg>
            <div className="pointer-events-none absolute inset-0 flex items-end justify-between p-3 text-xs font-semibold text-purple-700">
              <span>Goal outline</span>
              <span>Active shape</span>
            </div>
          </div>
        </div>

        <aside className="space-y-4 rounded-3xl border border-purple-200 bg-white/80 p-5 shadow">
          <h2 className="text-xl font-bold text-purple-900">Control Deck</h2>
          <p className="text-sm text-purple-700">{level.description}</p>

          <div className="space-y-3">
            <label className="block">
              <span className="text-xs font-semibold uppercase text-purple-600">Rotation (degrees)</span>
              <input
                type="range"
                min="-180"
                max="180"
                value={controls.rotation}
                onChange={handleSlider("rotation")}
                className="w-full accent-purple-600"
              />
              <span className="text-sm text-purple-800">{controls.rotation} deg</span>
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase text-purple-600">Dilation scale</span>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.01"
                value={controls.scale}
                onChange={handleSlider("scale")}
                className="w-full accent-emerald-600"
              />
              <span className="text-sm text-purple-800">x {controls.scale.toFixed(2)}</span>
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase text-purple-600">Translate X</span>
              <input
                type="range"
                min="-160"
                max="160"
                value={controls.translateX}
                onChange={handleSlider("translateX")}
                className="w-full accent-sky-600"
              />
              <span className="text-sm text-purple-800">{controls.translateX.toFixed(0)} units</span>
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase text-purple-600">Translate Y</span>
              <input
                type="range"
                min="-160"
                max="160"
                value={controls.translateY}
                onChange={handleSlider("translateY")}
                className="w-full accent-sky-600"
              />
              <span className="text-sm text-purple-800">{controls.translateY.toFixed(0)} units</span>
            </label>
          </div>

          <div className="grid grid-cols-4 gap-2 text-sm text-purple-700">
            <button onClick={nudge("translateY", -5)} className="rounded-lg bg-purple-100 px-2 py-1 font-semibold hover:bg-purple-200">Up</button>
            <button onClick={nudge("translateX", 5)} className="rounded-lg bg-purple-100 px-2 py-1 font-semibold hover:bg-purple-200">Right</button>
            <button onClick={nudge("translateY", 5)} className="rounded-lg bg-purple-100 px-2 py-1 font-semibold hover:bg-purple-200">Down</button>
            <button onClick={nudge("translateX", -5)} className="rounded-lg bg-purple-100 px-2 py-1 font-semibold hover:bg-purple-200">Left</button>
          </div>

          <div className="flex flex-wrap gap-2">
            <button onClick={handleCheck} className="rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-purple-700">Check alignment</button>
            <button onClick={resetControls} className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-purple-700 shadow hover:bg-purple-100">Reset</button>
            <button onClick={() => setShowHint((value) => !value)} className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-600">{showHint ? "Hide hint" : "Show hint"}</button>
            <button onClick={handleNext} className="rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-sky-600">Next mission</button>
          </div>

          {showHint && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
              <p className="font-semibold">Hint control checklist</p>
              <ul className="list-disc pl-5">
                <li>Match the outline orientation first using rotation.</li>
                <li>Scale the figure until the lengths line up with the glowing outline.</li>
                <li>Translate along X and Y until every vertex sits inside the goal.</li>
              </ul>
            </div>
          )}

          <div className="rounded-2xl border border-purple-200 bg-purple-50 p-3 text-sm text-purple-800">
            {feedback}
          </div>
        </aside>
      </section>
    </div>
  );
}
