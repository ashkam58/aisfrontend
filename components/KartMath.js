'use client';
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Does x satisfy an equation? — Grade 6 "Does x satisfy the equation?" game
 * Theme: Go-kart racing. Each correct answer moves the kart forward.
 * Built to be dropped into a Next.js/React page. Tailwind for styling.
 */

// Types
// Utility: random in range inclusive
const rand = (a, b) => a + Math.floor(Math.random() * (b - a + 1));

// Generate a question in the *same style* but with varied equation forms
function generateQuestion() {
  // Choose template
  const template = rand(1, 6);

  // We'll keep values friendly for Grade 6
  let nVal = 0;
  let equation = "";
  let truth = false;
  let explain = "";

  // To mimic the screenshot: "2 = n / 142" with a given n
  if (template === 1) {
    const k = rand(2, 12) * rand(2, 12); // composite-ish so not always 1
    const d = rand(1, 12);

    // Choose a candidate n that is either correct or off by a small tweak
    const correctN = d * k;
    const makeTrue = Math.random() < 0.5;
    nVal = makeTrue ? correctN : correctN + rand(1, 3);

    equation = `${d} = n / ${k}`;
    truth = nVal / k === d;
    explain = `Plug n = ${nVal}: ${nVal} / ${k} = ${nVal / k}. The left side is ${d}. ${nVal / k === d ? "They match" : "They do not match"}.`;
  }

  // n / c = d
  else if (template === 2) {
    const c = rand(2, 15);
    const d = rand(1, 12);
    const correctN = c * d;
    const makeTrue = Math.random() < 0.5;
    nVal = makeTrue ? correctN : correctN - rand(1, Math.min(3, correctN - 1));

    equation = `n / ${c} = ${d}`;
    truth = nVal / c === d;
    explain = `If n / ${c} = ${d}, then n must be ${c}×${d} = ${correctN}. We tried n = ${nVal}.`;
  }

  // k * n = d
  else if (template === 3) {
    const k = rand(2, 12);
    const d = rand(10, 120);
    const correctN = d / k;
    const makeTrue = Math.random() < 0.5 && Number.isInteger(correctN);
    nVal = makeTrue ? correctN : rand(1, 20);

    equation = `${k}n = ${d}`;
    truth = k * nVal === d;
    explain = `${k}×${nVal} = ${k * nVal} ${k * nVal === d ? "equals" : "does not equal"} ${d}.`;
  }

  // n + c = d
  else if (template === 4) {
    const c = rand(2, 50);
    const d = rand(20, 120);
    const correctN = d - c;
    const makeTrue = Math.random() < 0.5;
    nVal = makeTrue ? correctN : correctN + rand(1, 4);

    equation = `n + ${c} = ${d}`;
    truth = nVal + c === d;
    explain = `If n + ${c} = ${d}, then n should be ${d} − ${c} = ${correctN}. We tried n = ${nVal}.`;
  }

  // n − c = d
  else if (template === 5) {
    const c = rand(2, 50);
    const d = rand(1, 80);
    const correctN = d + c;
    const makeTrue = Math.random() < 0.5;
    nVal = makeTrue ? correctN : correctN - rand(1, 4);

    equation = `n − ${c} = ${d}`;
    truth = nVal - c === d;
    explain = `If n − ${c} = ${d}, then n should be ${d} + ${c} = ${correctN}. We tried n = ${nVal}.`;
  }

  // d = k / n (avoid 0 and ensure integers)
  else {
    const nCandidates = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12];
    const nPick = nCandidates[rand(0, nCandidates.length - 1)];
    // choose k as a multiple of nPick so k / nPick is integer
    const m = rand(2, 10);
    const d = m; // so that (k / nPick) = m is true if n = nPick and k = m*nPick
    const k = m * nPick;
    const makeTrue = Math.random() < 0.5;
    nVal = makeTrue ? nPick : nPick + rand(1, 3);

    equation = `${d} = ${k} / n`;
    truth = k / nVal === d;
    explain = `With n = ${nVal}, ${k} / ${nVal} = ${k / nVal}. Left side is ${d}.`;
  }

  return {
    prompt: `Is x = ${nVal} a solution to this equation?`,
    equation,
    isSolution: truth,
    explain,
  };
}

export default function DoesXSatisfyEquation() {
  const [q, setQ] = useState(() => generateQuestion());
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [time, setTime] = useState(600); // 60-second race
  const [showExplain, setShowExplain] = useState(null);
  const [flash, setFlash] = useState(null);
  const [kartPosition, setKartPosition] = useState(0);

  // Race progress: 0 -> 100 (%) based on score
  const progress = Math.min(100, score * 5); // 20 correct = finish line

  // Timer
  useEffect(() => {
    if (time > 0) {
      const t = setInterval(() => setTime((s) => (s > 0 ? s - 1 : 0)), 1000);
      return () => clearInterval(t);
    }
  }, [time]);

  // Animate kart based on progress
  useEffect(() => {
    setKartPosition(progress);
  }, [progress]);

  function answer(choice) {
    if (time === 0) return;

    const correct = choice === q.isSolution;
    setFlash(correct ? "good" : "bad");
    setShowExplain(q.explain);

    if (correct) {
      setScore((s) => s + 1);
      setStreak((k) => k + 1);
    } else {
      setStreak(0);
    }

    // Next question after a short pause
    setTimeout(() => {
      setQ(generateQuestion());
      setShowExplain(null);
      setFlash(null);
    }, 900);
  }

  function resetRace() {
    setScore(0);
    setStreak(0);
    setTime(60);
    setQ(generateQuestion());
    setShowExplain(null);
    setFlash(null);
  }

  const bgPulse = flash === "good" ? "ring-4 ring-green-300" : flash === "bad" ? "ring-4 ring-red-300" : "";

  return (
    <div className={`min-h-screen w-full bg-gradient-to-br from-sky-50 via-emerald-50 to-yellow-50 p-4 md:p-8 ${bgPulse} transition-all`}> 
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
            🏁 Does x satisfy an equation?
          </h1>
          <button onClick={resetRace} className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 active:scale-95">
            Reset Race
          </button>
        </div>

        {/* HUD */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="card p-4 rounded-2xl bg-white shadow">
            <div className="text-xs text-slate-500">Score</div>
            <div className="text-2xl font-bold">{score}</div>
          </div>
          <div className="card p-4 rounded-2xl bg-white shadow">
            <div className="text-xs text-slate-500">Streak</div>
            <div className="text-2xl font-bold">{streak}</div>
          </div>
          <div className="card p-4 rounded-2xl bg-white shadow">
            <div className="text-xs text-slate-500">Time</div>
            <div className={`text-2xl font-bold ${time <= 10 ? "text-red-600" : ""}`}>{time}s</div>
          </div>
          <div className="card p-4 rounded-2xl bg-white shadow">
            <div className="text-xs text-slate-500">Finish at</div>
            <div className="text-2xl font-bold">20 correct</div>
          </div>
        </div>

        {/* Track */}
        <div className="relative w-full h-40 md:h-48 rounded-3xl bg-gradient-to-r from-emerald-200 to-amber-200 overflow-hidden mb-6 border border-emerald-300">
          {/* Lane stripes */}
          <div className="absolute inset-0 opacity-40">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="absolute top-1/2 -translate-y-1/2 h-2 w-20 bg-white rounded-full" style={{ left: `${i * 12}%` }} />
            ))}
          </div>

          {/* Finish flag */}
          <div className="absolute right-4 top-4 text-2xl">🏁</div>

          {/* Kart (emoji) */}
          <motion.div
            className="absolute bottom-4 left-4 text-5xl select-none"
            animate={{ x: `${kartPosition}%` }}
            transition={{ type: "spring", stiffness: 70, damping: 12 }}
          >
            🏎️
          </motion.div>

          {/* Progress bar */}
          <div className="absolute bottom-2 left-4 right-4 h-2 bg-emerald-100 rounded-full">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Question card */}
        <div className="bg-white shadow-lg rounded-3xl p-6 md:p-8 border border-slate-100">
          <p className="text-lg text-slate-700 mb-2">{q.prompt}</p>
          <p className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            {q.equation}
          </p>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => answer(true)}
              className="px-6 py-3 rounded-2xl bg-emerald-600 text-white text-lg font-semibold hover:bg-emerald-700 active:scale-95"
              disabled={time === 0}
            >
              Yes
            </button>
            <button
              onClick={() => answer(false)}
              className="px-6 py-3 rounded-2xl bg-rose-600 text-white text-lg font-semibold hover:bg-rose-700 active:scale-95"
              disabled={time === 0}
            >
              No
            </button>
          </div>

          <AnimatePresence>
            {showExplain && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className={`mt-4 p-4 rounded-2xl text-sm ${
                  flash === "good" ? "bg-emerald-50 text-emerald-900" : "bg-rose-50 text-rose-900"
                }`}
              >
                <b>{flash === "good" ? "Correct!" : "Not quite."}</b> {showExplain}
              </motion.div>
            )}
          </AnimatePresence>

          {time === 0 && (
            <div className="mt-6 p-4 rounded-2xl bg-indigo-50 text-indigo-900">
              <div className="font-bold">Time! Final score: {score}</div>
              <div>Press <i>Reset Race</i> to try again and beat your best streak.</div>
            </div>
          )}
        </div>

        {/* Teacher Tips */}
        <div className="mt-6 text-sm text-slate-600">
          <details className="bg-white/70 p-4 rounded-2xl shadow border border-slate-100">
            <summary className="cursor-pointer font-semibold">Teacher Tips & Variants</summary>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Ask students to justify answers aloud: "Substitute n and evaluate both sides."</li>
              <li>Switch to a <b>no-timer</b> mode by setting the initial <code>time</code> to <code>0</code> and removing the interval.</li>
              <li>Make it harder: widen ranges or include negatives/fractions.</li>
              <li>Quick check for the demo screenshot: if the game shows <code>2 = n / 142</code> with <code>n = 142</code>, the answer is <b>no</b> because 142/142 = 1.</li>
            </ul>
          </details>
        </div>
      </div>
    </div>
  );
}
