'use client';
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import './addingThreeorMoreInterger.css'; // Add custom styles for vibrant theme

// Since shadcn/ui components are not available, we'll create simple replacements
const Card = ({ className, children, ...props }) => (
  <div className={`bg-white rounded-lg border shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ className, children, ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ className, children, ...props }) => (
  <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

const CardContent = ({ className, children, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const Button = ({ variant = "default", className, children, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background min-h-[44px] min-w-[44px] touch-manipulation";
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-3 px-4",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 py-3 px-4",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground h-10 py-3 px-4"
  };
  
  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Slider = ({ value, min, max, step, onValueChange, className, ...props }) => (
  <input
    type="range"
    min={min}
    max={max}
    step={step}
    value={value[0]}
    onChange={(e) => onValueChange([parseInt(e.target.value)])}
    className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ${className}`}
    {...props}
  />
);

const Switch = ({ checked, onCheckedChange, className, ...props }) => (
  <label className={`relative inline-flex items-center cursor-pointer ${className}`} {...props}>
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      className="sr-only"
    />
    <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer ${checked ? 'bg-blue-600' : ''} after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${checked ? 'after:translate-x-full after:border-white' : ''}`}></div>
  </label>
);

const Input = ({ className, ...props }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const Tooltip = ({ children }) => children;
const TooltipTrigger = ({ children, asChild, ...props }) => (
  <div {...props}>{children}</div>
);
const TooltipContent = ({ children, className, ...props }) => (
  <div className={`z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 ${className}`} {...props}>
    {children}
  </div>
);

// Utility function for className merging
const cn = (...classes) => classes.filter(Boolean).join(' ');

// ---------- Helpers ----------
function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sum(arr) {
  return arr.reduce((acc, x) => acc + x, 0);
}

function makeExplanation(addends) {
  const positives = addends.filter((x) => x >= 0);
  const negatives = addends.filter((x) => x < 0);
  const pSum = sum(positives);
  const nSum = sum(negatives);
  const reordered = [...positives, ...negatives];
  const assoc = `(${addends[0]} + ${addends[1]}) + ${addends.slice(2).join(" + ")}`;
  const assoc2 = `${addends[0]} + (${addends[1]} + ${addends.slice(2).join(" + ")})`;
  return [
    `Group positives and negatives: positives = ${positives.join(" + ") || 0} = ${pSum}, negatives = ${negatives.join(" + ") || 0} = ${nSum}.`,
    `Commutative: reorder to ${reordered.join(" + ")}.`,
    `Associative: ${assoc} = ${assoc2}.`,
    `Net result = ${pSum} + (${nSum}) = ${pSum + nSum}.`,
  ].join("\n");
}

function uniqueChoices(correct, difficulty) {
  const choices = new Set();
  choices.add(correct);
  while (choices.size < 4) {
    // plausible distractors based on common slips: sign error, off-by-one, omit one addend
    const r = Math.random();
    let cand = correct;
    if (r < 0.33) cand = correct + (Math.random() < 0.5 ? -1 : 1) * (1 + Math.floor(Math.random() * 2));
    else if (r < 0.66) cand = -correct; // sign flip
    else cand = correct - (1 + Math.floor(Math.random() * (2 + difficulty)));
    choices.add(cand);
  }
  return shuffle([...choices]);
}

function generateQuestion(level) {
  // Level controls range, count of addends, and negativity
  const addendCount = clamp(3 + Math.floor(level / 2), 3, 5);
  const range = 5 + level * 3; // grows with level
  const allowNegatives = level >= 2; // negatives appear from level 2
  const addends = [];
  while (addends.length < addendCount) {
    let n = Math.floor(Math.random() * (2 * range + 1)) - range; // in [-range, range]
    if (!allowNegatives) n = Math.abs(n); // non-negative early
    if (n === 0) continue; // avoid zeros for richer thinking; we'll add occasionally below
    addends.push(n);
  }
  // 1-in-5 chance to include a zero to hint identity property
  if (Math.random() < 0.2 && addends.length < 6) addends.splice(Math.floor(Math.random() * addends.length), 0, 0);

  const answer = sum(addends);
  const choices = uniqueChoices(answer, level);
  const explanation = makeExplanation(addends);
  return { addends, answer, choices, explanation };
}

// Smart Score dynamics
function computeDelta(correct, level, seconds) {
  const timeBonus = seconds < 5 ? 1.2 : seconds < 10 ? 1.0 : seconds < 15 ? 0.8 : 0.6;
  if (correct) return Math.round((8 + level * 2) * timeBonus);
  return -Math.round(6 + level);
}

// ---------- Visual components ----------
const AuroraBg = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 0.7, x: [0, 40, -20, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -inset-20 bg-[radial-gradient(40%_40%_at_30%_20%,rgba(99,102,241,0.25),transparent),radial-gradient(40%_40%_at_70%_60%,rgba(16,185,129,0.25),transparent),radial-gradient(40%_40%_at_50%_80%,rgba(14,165,233,0.25),transparent)]"
      />
      {/* floating subtle glyphs */}
      {["+", "−", "=", "→", "(", ")"].map((g, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.15, 0.35, 0.2], y: [0, -20, 0] }}
          transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
          className="absolute text-5xl font-light text-white/60"
          style={{ left: `${10 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
        >
          {g}
        </motion.div>
      ))}
    </div>
  );
};

const Gauge = ({ value }) => {
  const r = 48;
  const c = 2 * Math.PI * r;
  const pct = clamp(value, 0, 100) / 100;
  return (
    <svg viewBox="0 0 120 120" className="w-28 h-28">
      <circle cx="60" cy="60" r={r} stroke="hsl(215 20% 80%)" strokeWidth="10" fill="none" />
      <motion.circle
        cx="60"
        cy="60"
        r={r}
        stroke="hsl(222.2 84% 60.2%)"
        strokeWidth="10"
        fill="none"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - pct)}
        strokeLinecap="round"
        initial={false}
        animate={{ strokeDashoffset: c * (1 - pct) }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      />
      <text x="60" y="64" textAnchor="middle" className="fill-slate-700 font-semibold text-xl">
        {Math.round(value)}
      </text>
      <text x="60" y="90" textAnchor="middle" className="fill-slate-500 text-xs">Smart Score</text>
    </svg>
  );
};

const NumberLine = ({ addends }) => {
  const points = useMemo(() => {
    const pts = [0];
    addends.reduce((acc, v) => {
      const next = acc + v;
      pts.push(next);
      return next;
    }, 0);
    return pts;
  }, [addends]);

  const [min, max] = useMemo(() => {
    const allValues = [...points];
    let minVal = Math.min(...allValues);
    let maxVal = Math.max(...allValues);
    const range = Math.max(10, maxVal - minVal);
    // Add 10% padding
    minVal -= range * 0.1;
    maxVal += range * 0.1;
    return [minVal, maxVal];
  }, [points]);

  const ticks = useMemo(() => {
    const range = max - min;
    if (range <= 0) return [min];
    const numTicks = 10;

    const rawStep = range / numTicks;
    const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
    const a = rawStep / magnitude;

    let niceStep;
    if (a < 1.5) niceStep = 1 * magnitude;
    else if (a < 3) niceStep = 2 * magnitude;
    else if (a < 7) niceStep = 5 * magnitude;
    else niceStep = 10 * magnitude;

    const start = Math.floor(min / niceStep) * niceStep;
    const end = Math.ceil(max / niceStep) * niceStep;
    
    const tickValues = [];
    for (let t = start; t <= end; t += niceStep) {
        tickValues.push(t);
    }
    return tickValues;
  }, [min, max]);

  const span = max - min;

  return (
    <div className="w-full">
      <div className="relative h-24">
        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-slate-300" />
        {ticks.map((t) => (
          <div key={t} className="absolute -translate-x-1/2 text-xs text-slate-600"
               style={{ left: `${((t - min) / span) * 100}%`, top: "50%" }}>
            <div className="w-0.5 h-3 bg-slate-400 -translate-y-1/2" />
            <div className="mt-1">{Math.round(t)}</div>
          </div>
        ))}
        <AnimatePresence>
          {points.map((p, i) => (
            <motion.div
              key={`${p}-${i}`}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: i * 0.06 }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${((p - min) / span) * 100}%`, top: "50%" }}
            >
              <div className="w-3 h-3 rounded-full bg-emerald-500 shadow" />
              {i < points.length - 1 && (
                <div className="absolute left-1/2 top-1/2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(Math.abs(addends[i]) / span) * 100}%` }}
                    transition={{ duration: 0.5 }}
                    className={cn("h-0.5 origin-left", addends[i] >= 0 ? "bg-emerald-400" : "bg-rose-400")}
                    style={{ transform: `scaleX(${addends[i] >= 0 ? 1 : -1})` }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="text-center text-sm text-slate-500">Number line walk: start at 0, hop through each addend.</div>
    </div>
  );
};

// ---------- Main App ----------
export default function SumLab() {
  const [level, setLevel] = useState(() => Number(localStorage.getItem("sumlab_level")) || 1);
  const [smart, setSmart] = useState(() => Number(localStorage.getItem("sumlab_smart")) || 0);
  const [q, setQ] = useState(() => generateQuestion(level));
  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(null);
  const [showExplain, setShowExplain] = useState(false);
  const [showCheat, setShowCheat] = useState(true);
  const [seconds, setSeconds] = useState(0);
  // history: Array<{ ok: boolean, secs: number, lvl: number }>
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem("sumlab_hist") || "[]"); } catch { return []; }
  });
  const [typedMode, setTypedMode] = useState(false);
  const [typedAnswer, setTypedAnswer] = useState("");

  const timerRef = useRef(null);
  const startRef = useRef(Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setSeconds(Math.floor((Date.now() - startRef.current) / 1000)), 250);
    timerRef.current = id;
    return () => window.clearInterval(id);
  }, [q]);

  useEffect(() => {
    localStorage.setItem("sumlab_smart", String(smart));
    localStorage.setItem("sumlab_level", String(level));
    localStorage.setItem("sumlab_hist", JSON.stringify(history));
  }, [smart, level, history]);

  function nextQuestion(nextLevel) {
    const L = clamp(nextLevel ?? level, 1, 12);
    setLevel(L);
    const nq = generateQuestion(L);
    setQ(nq);
    setSelected(null);
    setCorrect(null);
    setSeconds(0);
    setShowExplain(false);
    setTypedAnswer("");
    startRef.current = Date.now();
  }

  function adapt(ok, secs) {
    const recent = [...history.slice(-5), { ok, secs, lvl: level }];
    const acc = recent.filter((r) => r.ok).length / recent.length;
    const speed = recent.reduce((a, r) => a + r.secs, 0) / recent.length;
    if (ok && acc >= 0.8 && speed <= 9) return level + 1;
    if (!ok && (acc < 0.6 || secs > 14)) return level - 1;
    return level;
  }

  function submit(answer) {
    if (correct !== null) return;
    const ok = answer === q.answer;
    const delta = computeDelta(ok, level, seconds);
    const nextSmart = clamp(smart + delta, 0, 100);
    setSmart(nextSmart);
    setCorrect(ok);
    setHistory((h) => [...h, { ok, secs: seconds, lvl: level }].slice(-60));
    const L = adapt(ok, seconds);
    setTimeout(() => nextQuestion(L), 900);
  }

  const accuracy = useMemo(() => {
    const k = Math.max(1, history.length);
    return Math.round((history.filter((h) => h.ok).length / k) * 100);
  }, [history]);

  return (
    // <TooltipProvider>
      <div className="relative min-h-screen bg-gradient-to-b from-sky-50 via-indigo-50 to-emerald-50 text-slate-800">
        <AuroraBg />
        <div className="relative max-w-6xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
          <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="w-full sm:w-auto">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">SumLab · Add 3+ Integers</h1>
              <p className="text-slate-600 text-sm sm:text-base">Grade 7 • Adaptive practice • Calm visuals • Number-line reasoning</p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full sm:w-auto">
              <div className="flex items-center gap-4">
                <Gauge value={smart} />
                <div className="text-sm text-slate-600">
                  <div><span className="font-semibold">Level:</span> {level}</div>
                  <div><span className="font-semibold">Accuracy:</span> {accuracy}%</div>
                  <div><span className="font-semibold">Time:</span> {seconds}s</div>
                </div>
              </div>
            </div>
          </header>

          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6">
            <Card className="backdrop-blur bg-white/70 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Problem</span>
                  <div className="flex items-center gap-3">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700">Smart Score grows with accuracy, speed & level</div>
                      </TooltipTrigger>
                      <TooltipContent>Correct + faster answers at higher levels give bigger boosts.</TooltipContent>
                    </Tooltip>
                    <div className="flex items-center gap-2 text-sm">
                      <span>Typed</span>
                      <Switch checked={typedMode} onCheckedChange={setTypedMode} />
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <motion.div layout className="text-2xl md:text-3xl font-semibold text-slate-800">
                    {q.addends.map((n, i) => (
                      <span key={i} className="inline-flex items-center">
                        <motion.span
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: i * 0.06 }}
                          className={cn("px-2 py-1 rounded-xl mx-1", n >= 0 ? "bg-emerald-100" : "bg-rose-100")}
                        >
                          {n}
                        </motion.span>
                        {i < q.addends.length - 1 && <span className="mx-1">+</span>}
                      </span>
                    ))}
                    <span className="mx-2">= ?</span>
                  </motion.div>

                  <NumberLine addends={q.addends} />

                  {!typedMode ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {q.choices.map((c, i) => {
                        const isSelected = selected === c;
                        const isCorrect = correct !== null && c === q.answer;
                        return (
                          <motion.button
                            key={i}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => { setSelected(c); submit(c); }}
                            className={cn(
                              "w-full rounded-2xl px-4 py-4 text-lg sm:text-xl border transition min-h-[54px] touch-manipulation",
                              isCorrect ? "bg-emerald-100 border-emerald-300" :
                              correct === false && isSelected ? "bg-rose-100 border-rose-300" :
                              "bg-white/70 hover:bg-slate-50 border-slate-200"
                            )}
                          >
                            {c}
                          </motion.button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                      <Input 
                        inputMode="numeric" 
                        value={typedAnswer} 
                        onChange={(e) => setTypedAnswer(e.target.value)} 
                        placeholder="Type your answer" 
                        className="text-lg min-h-[48px]" 
                      />
                      <Button 
                        onClick={() => submit(Number(typedAnswer))} 
                        className="text-lg min-h-[48px] px-6"
                      >
                        Submit
                      </Button>
                    </div>
                  )}

                  <AnimatePresence>
                    {correct !== null && (
                      <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="pt-2">
                        <div className={cn("px-3 py-2 rounded-xl inline-block text-sm",
                          correct ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800")}
                        >
                          {correct ? "Nice! Keep that tempo." : "Close. Check the signs and grouping."}
                        </div>
                        <div className="mt-2">
                          <Button variant="secondary" onClick={() => setShowExplain((s) => !s)}>{showExplain ? "Hide" : "Show"} explanation</Button>
                        </div>
                        <AnimatePresence>
                          {showExplain && (
                            <motion.pre initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                              className="mt-3 whitespace-pre-wrap text-sm bg-slate-50 rounded-xl p-3 border border-slate-200">
                              {q.explanation}
                            </motion.pre>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="backdrop-blur bg-white/70 shadow-lg">
                <CardHeader>
                  <CardTitle>Cheat Sheet · CAI</CardTitle>
                </CardHeader>
                <CardContent>
                  <AnimatePresence>
                    {showCheat && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm text-slate-700 space-y-2">
                        <div><span className="font-semibold">Commutative</span>: a + b = b + a (reorder for easier groups)</div>
                        <div><span className="font-semibold">Associative</span>: (a + b) + c = a + (b + c) (regroup to pair positives/negatives)</div>
                        <div><span className="font-semibold">Identity</span>: a + 0 = a (zeros don’t change the sum)</div>
                        <div className="text-slate-600">Strategy: group all positives together and all negatives together, then combine.</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="mt-3 flex items-center gap-3">
                    <Switch checked={showCheat} onCheckedChange={setShowCheat} />
                    <span className="text-sm text-slate-600">Show cheat sheet</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur bg-white/70 shadow-lg">
                <CardHeader>
                  <CardTitle>Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Level (1–12)</div>
                    <Slider value={[level]} min={1} max={12} step={1} onValueChange={(v) => nextQuestion(v[0])} />
                  </div>
                  <div className="flex gap-3">
                    <Button variant="secondary" onClick={() => nextQuestion()}>New question</Button>
                    <Button variant="outline" onClick={() => { setSmart(0); setHistory([]); localStorage.removeItem("sumlab_hist"); }}>Reset smart score</Button>
                  </div>
                  <div className="text-xs text-slate-500">Adaptive engine looks at your last 5 answers to speed up or dial back the challenge.</div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur bg-white/70 shadow-lg">
                <CardHeader>
                  <CardTitle>Recent Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  {history.length === 0 ? (
                    <div className="text-slate-500 text-sm">No attempts yet. Answer a few to see your trail.</div>
                  ) : (
                    <ul className="space-y-1 text-sm">
                      {[...history].slice(-8).reverse().map((h, i) => (
                        <li key={i} className="flex items-center justify-between">
                          <span className={cn("px-2 py-0.5 rounded-full", h.ok ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800")}>{h.ok ? "Correct" : "Miss"}</span>
                          <span className="text-slate-600">{h.secs}s</span>
                          <span className="text-slate-600">L{h.lvl}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          <footer className="mt-8 text-center text-xs text-slate-500">
            Built for calm focus. Pro tip: use the cheat sheet, then try without it.
          </footer>
        </div>
      </div>
    // </TooltipProvider>
  );
}
