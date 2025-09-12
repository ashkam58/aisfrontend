"use client";

import { useMemo, useState, useEffect } from "react";
import {
  Leaf,
  TreePine,
  Sparkles,
  Play,
  Check,
  X,
  RotateCcw,
  HelpCircle,
  BarChart3,
  Wand2,
  Layers3,
  Rocket,
} from "lucide-react";

// ====== Utility helpers (no TS types — paste-safe) ======
function parseInput(str) {
  if (!str) return [];
  return str
    .split(/[^-\d]+/)
    .filter(Boolean)
    .map((s) => parseInt(s, 10))
    .filter((n) => !Number.isNaN(n))
    .sort((a, b) => a - b);
}

function buildStemLeaf(data, stemSize = 10) {
  const stems = {};
  data.forEach((n) => {
    const stem = Math.floor(n / stemSize);
    const leaf = Math.abs(n % stemSize); // handle negatives nicely
    if (!stems[stem]) stems[stem] = [];
    stems[stem].push(leaf);
  });
  // sort leaves in each stem
  Object.keys(stems).forEach((k) => stems[k].sort((a, b) => a - b));
  return stems;
}

function median(data) {
  if (!data.length) return null;
  const mid = Math.floor(data.length / 2);
  return data.length % 2 ? data[mid] : (data[mid - 1] + data[mid]) / 2;
}

function range(data) {
  if (!data.length) return null;
  return data[data.length - 1] - data[0];
}

function mode(data) {
  if (!data.length) return null;
  const freq = new Map();
  data.forEach((n) => freq.set(n, (freq.get(n) || 0) + 1));
  let best = null;
  let bestCount = -1;
  for (const [v, c] of freq.entries()) {
    if (c > bestCount || (c === bestCount && v < best)) {
      best = v;
      bestCount = c;
    }
  }
  return { value: best, count: bestCount };
}

const SAMPLE_SETS = {
  intro: "23, 25, 27, 32, 34",
  step2: "18, 24, 26, 31, 33, 37",
  step3: "23, 24, 27, 31, 31, 32, 34, 45, 45, 45, 46",
  step4: "12, 13, 15, 21, 22, 28, 30, 32",
  step5: "50, 54, 57, 61, 65, 70",
  before: "25, 26, 31, 34",
  after: "32, 37, 41",
};

const QUIZ = [
  {
    id: "q1",
    title: "Understanding Representation",
    prompt:
      "What does the leaf ‘7’ on the stem ‘4’ represent? (Assume stem = tens)",
    choices: ["7", "47", "407"],
    answer: 1,
    explain: "Stem is tens (4 → 40) and leaf is ones (7). Together: 47.",
  },
  {
    id: "q3",
    title: "Finding the Mode",
    prompt:
      "From this stem-and-leaf, what value is most frequent? 2 | 3 4 7   3 | 1 1 2 4   4 | 5 5 5 6",
    choices: ["31", "45", "46"],
    answer: 1,
    explain: "In the 40s row, leaves 5 5 5 → value 45 occurs thrice.",
  },
  {
    id: "q5",
    title: "Range & Spread",
    prompt:
      "What is the range for: 5 | 0 4 7   6 | 1 5   7 | 0 ?",
    choices: ["10", "15", "20"],
    answer: 2,
    explain: "Data = 50,54,57,61,65,70 → 70−50 = 20.",
  },
];

// ====== Animated background (looping parallax stars/nebula) ======
const Background = () => (
  <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    {/* Layered gradients */}
    <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_50%,rgba(99,102,241,0.15),transparent_70%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(40%_30%_at_20%_20%,rgba(56,189,248,0.15),transparent_70%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(30%_25%_at_80%_70%,rgba(16,185,129,0.15),transparent_70%)]" />

    {/* Moving starfield */}
    <div className="absolute inset-0 animate-slow-pan bg-[length:200%_200%] bg-[repeating-radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.6)_0,rgba(255,255,255,0.6)_1px,transparent_1px,transparent_4px)]" />
    <div className="absolute inset-0 animate-slower-pan bg-[length:250%_250%] bg-[repeating-radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.35)_0,rgba(255,255,255,0.35)_1px,transparent_1px,transparent_6px)]" />

    <style jsx>{`
      .animate-slow-pan { animation: pan 22s linear infinite; }
      .animate-slower-pan { animation: pan 38s linear infinite reverse; }
      @keyframes pan { from { background-position: 0% 0%; } to { background-position: 200% 200%; } }
    `}</style>
  </div>
);

function StemLeafTable({ stems, stemSize }) {
  const keys = useMemo(() => Object.keys(stems).map(Number).sort((a, b) => a - b), [stems]);
  if (!keys.length) return (
    <div className="text-sm text-muted-foreground italic">No data yet — add numbers, then press Build.</div>
  );
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-y-2">
        <thead>
          <tr>
            <th className="text-left px-3 py-1 text-xs uppercase tracking-wider text-slate-500">Stem ({stemSize}s)</th>
            <th className="text-left px-3 py-1 text-xs uppercase tracking-wider text-slate-500">Leaves</th>
          </tr>
        </thead>
        <tbody>
          {keys.map((k) => (
            <tr key={k} className="">
              <td className="align-top px-3 py-2 font-semibold text-slate-800 dark:text-slate-100">
                <div className="flex items-center gap-2">
                  <TreePine className="h-4 w-4 opacity-70" />
                  <span>{k}</span>
                </div>
              </td>
              <td className="px-3 py-2">
                <div className="flex flex-wrap gap-2">
                  {stems[k].map((leaf, i) => (
                    <span
                      key={k + "-" + i}
                      className="inline-flex items-center gap-1 rounded-xl border border-slate-200/60 bg-white/60 px-2 py-1 text-slate-800 shadow-sm backdrop-blur dark:border-slate-700/60 dark:bg-slate-800/50 dark:text-slate-100"
                    >
                      <Leaf className="h-3.5 w-3.5" />
                      {leaf}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatBadge({ label, value, icon: Icon }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-slate-200/60 bg-white/60 px-3 py-2 text-sm shadow-sm backdrop-blur dark:border-slate-700/60 dark:bg-slate-800/50">
      <Icon className="h-4 w-4" />
      <span className="font-medium">{label}:</span>
      <span>{value ?? "–"}</span>
    </div>
  );
}

function QuizCard({ q, onAnswer }) {
  const [picked, setPicked] = useState(null);
  const [result, setResult] = useState(null);

  function check() {
    if (picked === null) return;
    const correct = picked === q.answer;
    setResult(correct);
    if (onAnswer) onAnswer(correct);
  }

  function reset() {
    setPicked(null);
    setResult(null);
  }

  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-4 shadow-lg backdrop-blur dark:border-slate-700/60 dark:bg-slate-800/60">
      <div className="mb-2 flex items-center gap-2">
        <Layers3 className="h-4 w-4" />
        <h4 className="font-semibold">{q.title}</h4>
      </div>
      <p className="mb-3 text-slate-700 dark:text-slate-200">{q.prompt}</p>
      <div className="mb-4 grid gap-2 sm:grid-cols-3">
        {q.choices.map((c, idx) => (
          <button
            key={idx}
            onClick={() => setPicked(idx)}
            className={`rounded-xl border px-3 py-2 text-left transition ${
              picked === idx
                ? "border-indigo-500 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-900/30"
                : "border-slate-200 bg-white/70 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800/60 dark:hover:bg-slate-800"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <button onClick={check} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-3 py-2 text-white shadow hover:brightness-110">
          <Play className="h-4 w-4" /> Check
        </button>
        <button onClick={reset} className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2 hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800">
          <RotateCcw className="h-4 w-4" /> Reset
        </button>
        {result === true && (
          <span className="ml-2 inline-flex items-center gap-1 rounded-xl bg-green-100 px-2 py-1 text-green-800 dark:bg-green-900/30 dark:text-green-200">
            <Check className="h-4 w-4" /> Correct
          </span>
        )}
        {result === false && (
          <span className="ml-2 inline-flex items-center gap-1 rounded-xl bg-red-100 px-2 py-1 text-red-800 dark:bg-red-900/30 dark:text-red-200">
            <X className="h-4 w-4" /> Try again
          </span>
        )}
      </div>
      {result === false && (
        <div className="mt-3 flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
          <HelpCircle className="mt-0.5 h-4 w-4" />
          <p>{q.explain}</p>
        </div>
      )}
      {result === true && (
        <div className="mt-3 flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
          <Sparkles className="mt-0.5 h-4 w-4" />
          <p>Nice! Onward to the next challenge.</p>
        </div>
      )}
    </div>
  );
}

export default function StemLeaf() {
  const [input, setInput] = useState(SAMPLE_SETS.intro);
  const [stemSize, setStemSize] = useState(10); // tens by default
  const data = useMemo(() => parseInput(input), [input]);
  const stems = useMemo(() => buildStemLeaf(data, stemSize), [data, stemSize]);
  const med = useMemo(() => median(data), [data]);
  const rng = useMemo(() => range(data), [data]);
  const md = useMemo(() => mode(data), [data]);

  const [score, setScore] = useState(0);
  function bump(correct) {
    setScore((s) => s + (correct ? 10 : 0));
  }

  // subtle entrance sparkle
  useEffect(() => {
    const t = setTimeout(() => {}, 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="relative mx-auto min-h-screen max-w-6xl px-4 py-8 text-slate-900 dark:text-slate-100">
      <Background />

      {/* Header */}
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/60 bg-white/60 px-4 py-3 shadow-lg backdrop-blur dark:border-slate-700/60 dark:bg-slate-800/50">
        <div className="flex items-center gap-3">
          <Rocket className="h-6 w-6" />
          <h1 className="text-xl font-extrabold sm:text-2xl">3.3 Stem‑and‑Leaf: Mini‑Course</h1>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="rounded-xl border border-slate-300/70 bg-white/70 px-3 py-1 shadow-sm dark:border-slate-600/60 dark:bg-slate-800/60">
            Score: <b>{score}</b>
          </span>
          <span className="rounded-xl border border-slate-300/70 bg-white/70 px-3 py-1 shadow-sm dark:border-slate-600/60 dark:bg-slate-800/60">
            Stem = {stemSize === 10 ? "tens" : `${stemSize}s`}
          </span>
        </div>
      </header>

      {/* Hero blurb */}
      <section className="mb-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-5 shadow-lg backdrop-blur dark:border-slate-700/60 dark:bg-slate-800/60">
          <div className="mb-3 flex items-center gap-2">
            <Wand2 className="h-5 w-5" />
            <h2 className="text-lg font-bold">Core Concept</h2>
          </div>
          <p className="leading-relaxed">
            A <b>stem</b> is the higher place value (usually tens). A <b>leaf</b> is the ones digit. Together they encode the exact number while keeping the data sorted and visible.
          </p>
          <div className="mt-4 rounded-xl bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 p-4">
            <code className="text-sm">Data: 23, 25, 27, 32, 34</code>
            <div className="mt-2 text-sm">
              <span className="font-mono">2 | 3 5 7</span>
              <span className="mx-3">&nbsp;&nbsp;</span>
              <span className="font-mono">3 | 2 4</span>
            </div>
            <div className="mt-2 text-xs opacity-80">“2 | 3” means 23; “3 | 4” means 34.</div>
          </div>
        </div>

        {/* Live Builder */}
        <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-5 shadow-lg backdrop-blur dark:border-slate-700/60 dark:bg-slate-800/60">
          <div className="mb-3 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            <h2 className="text-lg font-bold">Build Your Stem‑and‑Leaf</h2>
          </div>
          <label className="mb-2 block text-sm">Enter numbers (comma/space/newline separated):</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-slate-300 bg-white/80 p-3 text-sm shadow-inner outline-none focus:border-indigo-500 dark:border-slate-600 dark:bg-slate-800/70"
          />
          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            <button
              onClick={() => setStemSize(10)}
              className={`rounded-xl px-3 py-1.5 ${stemSize === 10 ? "bg-indigo-600 text-white" : "border border-slate-300 bg-white/70 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800/60"}`}
            >
              Tens (10)
            </button>
            <button
              onClick={() => setStemSize(5)}
              className={`rounded-xl px-3 py-1.5 ${stemSize === 5 ? "bg-indigo-600 text-white" : "border border-slate-300 bg-white/70 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800/60"}`}
            >
              Fives (5)
            </button>
            <button
              onClick={() => setStemSize(1)}
              className={`rounded-xl px-3 py-1.5 ${stemSize === 1 ? "bg-indigo-600 text-white" : "border border-slate-300 bg-white/70 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800/60"}`}
            >
              Ones (1)
            </button>
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={() => setInput(SAMPLE_SETS.step2)}
                className="rounded-xl border border-slate-300 bg-white/70 px-3 py-1.5 text-slate-800 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800/60"
              >
                Load Example (Step 2)
              </button>
              <button
                onClick={() => setInput("")}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-1.5 hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800"
              >
                <RotateCcw className="h-4 w-4" /> Clear
              </button>
            </div>
          </div>
          <div className="mt-4">
            <StemLeafTable stems={stems} stemSize={stemSize} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <StatBadge label="Count" value={data.length} icon={Layers3} />
            <StatBadge label="Median" value={med} icon={HelpCircle} />
            <StatBadge label="Range" value={rng} icon={BarChart3} />
            <StatBadge label="Mode" value={md ? `${md.value} (${md.count}×)` : "–"} icon={Sparkles} />
          </div>
        </div>
      </section>

      {/* Guided Steps */}
      <section className="mb-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-5 shadow-lg backdrop-blur dark:border-slate-700/60 dark:bg-slate-800/60">
          <h3 className="mb-3 text-lg font-bold">🪜 Stepping‑Stones</h3>
          <div className="space-y-3 text-sm">
            <div className="rounded-xl border border-slate-200/60 bg-white/70 p-3 dark:border-slate-700/60 dark:bg-slate-900/30">
              <b>Step 1 — Representation:</b> A leaf of 7 on stem 4 means <b>47</b>.
            </div>
            <div className="rounded-xl border border-slate-200/60 bg-white/70 p-3 dark:border-slate-700/60 dark:bg-slate-900/30">
              <b>Step 2 — Construct:</b> Try data <code>{SAMPLE_SETS.step2}</code> and press <i>Build</i> above.
            </div>
            <div className="rounded-xl border border-slate-200/60 bg-white/70 p-3 dark:border-slate-700/60 dark:bg-slate-900/30">
              <b>Step 3 — Mode:</b> Look for the row with repeating leaves.
            </div>
            <div className="rounded-xl border border-slate-200/60 bg-white/70 p-3 dark:border-slate-700/60 dark:bg-slate-900/30">
              <b>Step 4 — Median:</b> Find the middle value(s) after sorting.
            </div>
            <div className="rounded-xl border border-slate-200/60 bg-white/70 p-3 dark:border-slate-700/60 dark:bg-slate-900/30">
              <b>Step 5 — Range:</b> Max − Min.
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-5 shadow-lg backdrop-blur dark:border-slate-700/60 dark:bg-slate-800/60">
          <h3 className="mb-3 text-lg font-bold">🧪 Quick Quiz</h3>
          <div className="space-y-4">
            {QUIZ.map((q) => (
              <QuizCard key={q.id} q={q} onAnswer={bump} />
            ))}
          </div>
        </div>
      </section>

      {/* Before vs After comparison */}
      <section className="mb-10 rounded-2xl border border-slate-200/60 bg-white/70 p-5 shadow-lg backdrop-blur dark:border-slate-700/60 dark:bg-slate-800/60">
        <h3 className="mb-3 text-lg font-bold">📈 Comparison: Before vs After</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="mb-2 text-sm">Before: <code>2 | 5 6 &nbsp;&nbsp; 3 | 1 4</code></div>
            <div className="rounded-xl bg-gradient-to-r from-fuchsia-500/10 to-rose-500/10 p-3 text-sm">Data: {SAMPLE_SETS.before}</div>
          </div>
          <div>
            <div className="mb-2 text-sm">After: <code>3 | 2 7 &nbsp;&nbsp; 4 | 1</code></div>
            <div className="rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 p-3 text-sm">Data: {SAMPLE_SETS.after}</div>
          </div>
        </div>
        <div className="mt-3 text-sm">
          Median Before = <b>26</b> &nbsp;•&nbsp; Median After = <b>37</b> — students improved.
        </div>
      </section>

      {/* Program view: show the algorithm visually */}
      <section className="mb-16 rounded-2xl border border-slate-200/60 bg-white/70 p-5 shadow-lg backdrop-blur dark:border-slate-700/60 dark:bg-slate-800/60">
        <h3 className="mb-4 text-lg font-bold">🧠 Program View — How the Builder Works</h3>
        <ol className="list-inside list-decimal space-y-2 text-sm leading-relaxed">
          <li>Parse the text into numbers, ignore stray characters, and sort ascending.</li>
          <li>For each value <code>n</code>, compute <code>stem = floor(n / stemSize)</code> and <code>leaf = abs(n % stemSize)</code>.</li>
          <li>Group leaves under their stems; sort leaves within each stem.</li>
          <li>Compute summary stats: <i>median</i>, <i>range</i>, and <i>mode</i>.</li>
        </ol>
        <div className="mt-4 rounded-xl bg-slate-900/80 p-4 font-mono text-[13px] text-slate-100 shadow-inner">
{`// Pseudocode (language-agnostic)
nums = parse(input).sort()
stems = {}
for n in nums:
  stem = floor(n / stemSize)
  leaf = abs(n % stemSize)
  stems[stem].append(leaf)
// stats
med = median(nums)
rng = nums.last - nums.first
md  = argmax_value_count(nums)`}
        </div>
      </section>

      {/* Reflective Tricks */}
      <footer className="mb-16 rounded-2xl border border-slate-200/60 bg-white/70 p-5 shadow-lg backdrop-blur text-sm dark:border-slate-700/60 dark:bg-slate-800/60">
        <h3 className="mb-2 text-lg font-bold">🧩 Reflective Tricks</h3>
        <ul className="list-disc pl-5 leading-7">
          <li>Think of a <b>number forest</b>: stems are trunks; leaves are branches.</li>
          <li><b>Median</b>: stand in the middle of the sorted path.</li>
          <li><b>Range</b>: tallest vs smallest tree.</li>
          <li><b>Mode</b>: the branch with the most leaves.</li>
        </ul>
      </footer>
    </main>
  );
}
