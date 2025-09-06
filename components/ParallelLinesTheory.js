"use client";

import { useMemo, useState, useCallback } from "react";

// Parallel Lines Theory — Interactive Lab (SVG based, no external deps)
// Modes:
// - Explore: toggle angle families to highlight relationships
// - Challenge: click two angles that are equal (or co‑interior summing to 180°)

const families = {
  corresponding: {
    label: "Corresponding (equal)",
    color: "#7c3aed",
    pairs: [
      [1, 5],
      [2, 6],
      [3, 7],
      [4, 8],
    ],
    rule: "Matching corners at each intersection with the transversal.",
  },
  alternateInterior: {
    label: "Alternate Interior (equal)",
    color: "#16a34a",
    pairs: [
      [3, 6],
      [4, 5],
    ],
    rule: "Inside the parallels on opposite sides of the transversal.",
  },
  alternateExterior: {
    label: "Alternate Exterior (equal)",
    color: "#06b6d4",
    pairs: [
      [1, 8],
      [2, 7],
    ],
    rule: "Outside the parallels on opposite sides of the transversal.",
  },
  coInterior: {
    label: "Co‑Interior (sum 180°)",
    color: "#f59e0b",
    pairs: [
      [3, 5],
      [4, 6],
    ],
    rule: "Inside the parallels on the same side of the transversal.",
  },
};

// Layout constants
const W = 640;
const H = 400;
const topY = 120;
const bottomY = 280;
const transStart = { x: 200, y: 40 };
const transEnd = { x: 440, y: 360 };
const topInt = { x: 280, y: topY };
const botInt = { x: 360, y: bottomY };

// Angle label positions around the intersections
const anglePositions = {
  1: { x: topInt.x + 26, y: topInt.y - 18 },
  2: { x: topInt.x - 28, y: topInt.y - 18 },
  3: { x: topInt.x - 26, y: topInt.y + 22 },
  4: { x: topInt.x + 26, y: topInt.y + 22 },
  5: { x: botInt.x + 26, y: botInt.y - 20 },
  6: { x: botInt.x - 26, y: botInt.y - 20 },
  7: { x: botInt.x - 26, y: botInt.y + 20 },
  8: { x: botInt.x + 26, y: botInt.y + 20 },
};

const allPairsEqualWhenParallel = [
  ...families.corresponding.pairs,
  ...families.alternateInterior.pairs,
  ...families.alternateExterior.pairs,
];

const includesPairUnordered = (pairs, a, b) =>
  pairs.some(([x, y]) => (x === a && y === b) || (x === b && y === a));

export default function ParallelLinesTheory() {
  const [showTransversal, setShowTransversal] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [selectedFamily, setSelectedFamily] = useState(null); // key from families
  const [selectedAngles, setSelectedAngles] = useState([]); // for challenge
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [mode, setMode] = useState("explore");

  const currentPairs = useMemo(() => {
    if (!selectedFamily) return [];
    return families[selectedFamily].pairs;
  }, [selectedFamily]);

  const onAngleClick = useCallback(
    (id) => {
      if (mode !== "challenge") return;
      setFeedback("");
      setSelectedAngles((prev) => {
        if (prev.includes(id)) return prev;
        if (prev.length === 0) return [id];
        if (prev.length === 1) {
          const [a] = prev;
          const b = id;
          const isEqual = includesPairUnordered(allPairsEqualWhenParallel, a, b);
          const isCoInterior = includesPairUnordered(families.coInterior.pairs, a, b);
          if (isEqual || isCoInterior) {
            setScore((s) => s + 1);
            setFeedback(
              isEqual
                ? "Nice! Those are equal when the lines are parallel."
                : "Correct! Co‑interior angles add up to 180°."
            );
          } else {
            setFeedback("Not quite. Try C‑corners, Z‑zig‑zag, or U‑shape hints.");
          }
          return [a, b];
        }
        return [id];
      });
    },
    [mode]
  );

  const nextRound = () => {
    setSelectedAngles([]);
    setFeedback("");
    setRound((r) => r + 1);
  };

  return (
    <div className="bg-white/90 rounded-cartoon p-6 shadow-md">
      {/* Header */}
      <div className="text-center mb-4">
        <h3 className="text-2xl font-cartoon text-purple-700">Parallel Lines Lab</h3>
        <p className="text-purple-600 text-sm">Explore angle families, then switch to Challenge mode.</p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2 justify-center mb-4">
        <button
          className={`px-3 py-2 rounded-cartoon font-cartoon text-sm ${
            showTransversal ? "bg-red-500 text-white" : "bg-red-100 text-red-700 hover:bg-red-200"
          }`}
          onClick={() => setShowTransversal((v) => !v)}
        >
          {showTransversal ? "Hide" : "Show"} Transversal
        </button>
        <button
          className={`px-3 py-2 rounded-cartoon font-cartoon text-sm ${
            showLabels ? "bg-green-500 text-white" : "bg-green-100 text-green-700 hover:bg-green-200"
          }`}
          onClick={() => setShowLabels((v) => !v)}
        >
          {showLabels ? "Hide" : "Show"} Labels
        </button>
        <div className="hidden sm:block w-px h-6 bg-purple-200" />
        {Object.entries(families).map(([key, f]) => (
          <button
            key={key}
            className={`px-3 py-2 rounded-cartoon text-sm border ${
              selectedFamily === key ? "bg-purple-600 text-white" : "bg-purple-50 text-purple-700 hover:bg-purple-100"
            }`}
            onClick={() => setSelectedFamily(selectedFamily === key ? null : key)}
            title={f.rule}
          >
            {f.label}
          </button>
        ))}
        <div className="hidden sm:block w-px h-6 bg-purple-200" />
        <button
          className={`px-3 py-2 rounded-cartoon text-sm ${
            mode === "explore" ? "bg-blue-100 text-blue-700" : "bg-blue-500 text-white"
          }`}
          onClick={() => setMode(mode === "explore" ? "challenge" : "explore")}
        >
          {mode === "explore" ? "Start Challenge" : "Back to Explore"}
        </button>
      </div>

      {/* Diagram */}
      <div className="relative mx-auto max-w-3xl">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto bg-purple-50 rounded-cartoon border">
          {/* Grid */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#ede9fe" strokeWidth="1" />
            </pattern>
          </defs>
          <rect x="0" y="0" width={W} height={H} fill="url(#grid)" />

          {/* Parallel lines */}
          <line x1="40" y1={topY} x2={W - 40} y2={topY} stroke="#7c3aed" strokeWidth="4" />
          <line x1="40" y1={bottomY} x2={W - 40} y2={bottomY} stroke="#7c3aed" strokeWidth="4" />

          {/* Transversal */}
          {showTransversal && (
            <g>
              <line x1={transStart.x} y1={transStart.y} x2={transEnd.x} y2={transEnd.y} stroke="#ef4444" strokeWidth="3" />
              <circle cx={topInt.x} cy={topY} r="5" fill="#ef4444" />
              <circle cx={botInt.x} cy={bottomY} r="5" fill="#ef4444" />
            </g>
          )}

          {/* Highlights for selected family */}
          {selectedFamily &&
            currentPairs.map(([a, b]) => {
              const color = families[selectedFamily].color;
              const pA = anglePositions[a];
              const pB = anglePositions[b];
              return (
                <g key={`${a}-${b}`}>
                  <circle cx={pA.x} cy={pA.y} r="16" fill={color} opacity="0.18" />
                  <circle cx={pB.x} cy={pB.y} r="16" fill={color} opacity="0.18" />
                  <line x1={pA.x} y1={pA.y} x2={pB.x} y2={pB.y} stroke={color} strokeDasharray="6 4" />
                </g>
              );
            })}

          {/* Angle markers (clickable in challenge) */}
          {Object.entries(anglePositions).map(([id, p]) => (
            <g key={id} className={mode === "challenge" ? "cursor-pointer" : ""} onClick={() => onAngleClick(Number(id))}>
              <circle
                cx={p.x}
                cy={p.y}
                r="14"
                fill={selectedAngles.includes(Number(id)) ? "#a78bfa" : "#ffffff"}
                stroke="#7c3aed"
                strokeWidth="2"
              />
              {showLabels && (
                <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="12" fill="#6b21a8" fontWeight="700">
                  {id}
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* Feedback & Score */}
      <div className="mt-4 text-center">
        {mode === "challenge" ? (
          <>
            <p className="text-purple-700 font-cartoon mb-2">Round {round} — Click two angles that are equal (or a co‑interior pair).</p>
            {feedback && <p className="mb-3 text-sm text-purple-600">{feedback}</p>}
            <div className="flex items-center justify-center gap-3">
              <button
                className="bg-purple-500 text-white px-4 py-2 rounded-cartoon font-cartoon hover:bg-purple-600"
                onClick={nextRound}
              >
                Next
              </button>
              <span className="text-purple-700">Score: {score}</span>
            </div>
            <div className="mt-3 text-xs text-purple-500">Hints: C → Corresponding, Z → Alternate, U → Co‑Interior</div>
          </>
        ) : (
          <div className="text-sm text-center text-purple-600">
            {selectedFamily ? (
              <p>
                {families[selectedFamily].label}: {families[selectedFamily].rule}
              </p>
            ) : (
              <p>Tip: Toggle a family to learn the pattern, then switch to Challenge!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
