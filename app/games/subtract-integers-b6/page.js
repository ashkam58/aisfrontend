'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';

/** ===== Utilities ===== */
const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Make token objects for a signed number
const makeCounters = (n) => {
  const sign = n >= 0 ? 1 : -1;
  const count = Math.abs(n);
  return Array.from({ length: count }, () => ({ id: uid(), sign, bornAt: Date.now() }));
};

// Problem generator scales with level
const pickProblem = (level = 1) => {
  const range = Math.min(4 + level * 2, 15);
  let a = rand(-range, range);
  let b = rand(-range, range);
  let op = Math.random() < 0.5 ? '+' : '-';
  // avoid trivial
  if (a === 0) a = 1;
  if (b === 0) b = -2;
  return { a, b, op };
};

// Tiny WebAudio blip (no external libs)
let _ctx;
function blip(freq = 600, dur = 0.07, gain = 0.04) {
  try {
    _ctx = _ctx || new (window.AudioContext || window.webkitAudioContext)();
    const o = _ctx.createOscillator();
    const g = _ctx.createGain();
    o.type = 'triangle';
    o.frequency.value = freq;
    g.gain.value = gain;
    o.connect(g);
    g.connect(_ctx.destination);
    o.start();
    o.stop(_ctx.currentTime + dur);
  } catch {}
}

/** ===== Confetti (simple DOM particles) ===== */
function useConfetti() {
  const [bits, setBits] = useState([]);
  const burst = (count = 20) => {
    const newBits = Array.from({ length: count }, () => ({
      id: uid(),
      x: Math.random() * 100,
      size: 6 + Math.random() * 10,
      rot: Math.random() * 360,
      hue: Math.floor(Math.random() * 360),
      lifetime: 800 + Math.random() * 900
    }));
    setBits((b) => [...b, ...newBits]);
    setTimeout(() => {
      setBits((b) => b.slice(count));
    }, 1200);
  };
  return { bits, burst };
}

/** ===== Token component ===== */
function Token({ sign, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        'relative mx-1 my-1 inline-flex items-center justify-center rounded-full',
        'w-12 h-12 md:w-14 md:h-14 text-2xl md:text-3xl font-black',
        'shadow-[0_6px_0_rgba(0,0,0,0.15)] border-2',
        'hover:scale-110 active:scale-95 transition-transform duration-150',
        sign === 1
          ? 'bg-blue-200/90 border-blue-500 text-blue-900'
          : 'bg-rose-200/90 border-rose-500 text-rose-900',
        'animate-wiggle'
      ].join(' ')}
      title={sign === 1 ? '+1' : '-1'}
      aria-label={sign === 1 ? 'plus token' : 'minus token'}
    >
      <span className="drop-shadow"> {sign === 1 ? '➕' : '➖'} </span>
      <span className="absolute -top-1 -right-1 text-xs rotate-12">✨</span>
    </button>
  );
}

/** ===== Progress hearts ===== */
function Hearts({ lives = 3 }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 3 }, (_, i) => (
        <span
          key={i}
          className={[
            'text-xl drop-shadow',
            i < lives ? 'opacity-100' : 'opacity-30'
          ].join(' ')}
        >
          ❤️
        </span>
      ))}
    </div>
  );
}

/** ===== Main Game Component ===== */
export default function SubtractIntegersB6Page() {
  // screens: start, play, over
  const [screen, setScreen] = useState('start');

  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [problemsLeft, setProblemsLeft] = useState(3);

  const [problem, setProblem] = useState(() => pickProblem(1));
  const { a, b, op } = problem;
  const expected = useMemo(() => (op === '+' ? a + b : a - b), [a, b, op]);

  const [workspace, setWorkspace] = useState(() => makeCounters(a));
  const [msg, setMsg] = useState('Use tokens & zero pairs to match the target!');
  const [streak, setStreak] = useState(0);
  const [zappers, setZappers] = useState(2);

  const [timeLeft, setTimeLeft] = useState(45);
  const timerRef = useRef(null);

  const { bits, burst } = useConfetti();

  // derived
  const plus = workspace.filter((c) => c.sign === 1).length;
  const minus = workspace.filter((c) => c.sign === -1).length;
  const value = plus - minus;
  const canCancel = Math.min(plus, minus);

  /** ===== timers ===== */
  useEffect(() => {
    if (screen !== 'play') return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          // time over = lose a life & next problem or game over
          blip(120, 0.08, 0.07);
          setLives((L) => {
            const left = L - 1;
            if (left <= 0) {
              setScreen('over');
            } else {
              softNextProblem(false); // failed
            }
            return left;
          });
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [screen, level, problemsLeft]);

  /** ===== helpers ===== */
  const resetWorkspace = (newA) => {
    setWorkspace(makeCounters(newA));
  };

  const softNextProblem = (won) => {
    // if won: reduce problemsLeft; if 0 -> next level
    setProblemsLeft((k) => {
      const nextK = won ? k - 1 : k;
      if (won && nextK <= 0) {
        // level up
        blip(880, 0.09, 0.06);
        setLevel((lv) => lv + 1);
        setProblemsLeft(3 + Math.floor((level + 1) / 2));
        setTimeLeft(45 - Math.min(level * 2, 20));
        const np = pickProblem(level + 1);
        setProblem(np);
        resetWorkspace(np.a);
        setMsg('Level up! New challenges unlocked! 🎉');
        return 3 + Math.floor((level + 1) / 2);
      } else {
        // same level, next problem
        const np = pickProblem(level);
        setProblem(np);
        resetWorkspace(np.a);
        setMsg(won ? 'Sweet! New puzzle…' : 'Keep going. New puzzle!');
        setTimeLeft((t) => 35 + Math.max(0, 10 - level)); // slight refill
        return won ? nextK : k;
      }
    });
  };

  const startGame = () => {
    setScreen('play');
    setLevel(1);
    setScore(0);
    setLives(3);
    setProblemsLeft(3);
    const np = pickProblem(1);
    setProblem(np);
    resetWorkspace(np.a);
    setTimeLeft(45);
    setStreak(0);
    setZappers(2);
    setMsg('Build the target value using tokens & zero pairs!');
    blip(600);
  };

  /** ===== actions ===== */
  const addPlus = () => {
    setWorkspace((w) => [...w, { id: uid(), sign: 1, bornAt: Date.now() }]);
    blip(720);
  };
  const addMinus = () => {
    setWorkspace((w) => [...w, { id: uid(), sign: -1, bornAt: Date.now() }]);
    blip(420);
  };
  const addZeroPair = () => {
    setWorkspace((w) => [
      ...w,
      { id: uid(), sign: 1, bornAt: Date.now() },
      { id: uid(), sign: -1, bornAt: Date.now() }
    ]);
    blip(540);
  };
  const cancelOnePair = () => {
    setWorkspace((w) => {
      const ip = w.findIndex((t) => t.sign === 1);
      const im = w.findIndex((t) => t.sign === -1);
      if (ip === -1 || im === -1) return w;
      blip(260, 0.06, 0.06);
      return w.filter((_, idx) => idx !== ip && idx !== im);
    });
  };
  const cancelAllPairs = () => {
    if (!canCancel) return;
    blip(260, 0.07, 0.08);
    setWorkspace((w) => {
      let p = 0, m = 0;
      const P = w.filter((x) => x.sign === 1).length;
      const M = w.filter((x) => x.sign === -1).length;
      const n = Math.min(P, M);
      return w.filter((x) => {
        if (x.sign === 1) {
          if (p < n) { p++; return false; }
          return true;
        } else {
          if (m < n) { m++; return false; }
          return true;
        }
      });
    });
  };
  const zapAllPairs = () => {
    if (zappers <= 0) return;
    setZappers((z) => z - 1);
    cancelAllPairs();
    setMsg('Zero-Pair Zapper: *poof!* ⚡');
    burst(28);
  };

  const removeToken = (id) => {
    setWorkspace((w) => w.filter((t) => t.id !== id));
    blip(300, 0.05, 0.05);
  };

  const check = () => {
    const correct = value === expected;
    if (correct) {
      burst(36);
      blip(900, 0.09, 0.06);
      setStreak((s) => s + 1);
      const bonus = Math.max(1, Math.floor(timeLeft / 3)) * Math.max(1, streak + 1);
      setScore((sc) => sc + 10 + bonus);
      setMsg(`Nice! +${10 + bonus} points (⏱️ ${Math.floor(timeLeft / 3)} • 🔥 x${streak + 1})`);
      softNextProblem(true);
    } else {
      if (navigator.vibrate) navigator.vibrate(80);
      blip(150, 0.08, 0.08);
      setStreak(0);
      setLives((L) => {
        const left = L - 1;
        if (left <= 0) {
          setScreen('over');
        } else {
          setMsg('Not yet. Try canceling zero pairs or adding/removing tokens.');
        }
        return left;
      });
    }
  };

  /** ===== UI bits ===== */
  const Header = () => (
    <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/60 backdrop-blur-md shadow-xl p-4 md:p-6">
      <div className="absolute -top-4 -left-4 text-6xl opacity-20 rotate-12">🎪</div>
      <div className="absolute -bottom-6 -right-6 text-7xl opacity-20 -rotate-12">🌈</div>
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div className="flex items-center gap-3">
          <div className="text-3xl md:text-4xl">🦉</div>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-800">
              Integer Carnival — Zero Pair Arena
            </h1>
            <p className="text-slate-600 text-sm">Make {a} {op} {b} by sculpting counters.</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Hearts lives={lives} />
          <div className="px-3 py-1 rounded-full bg-amber-200/80 font-bold">Level {level}</div>
          <div className="px-3 py-1 rounded-full bg-sky-200/80 font-bold">Score {score}</div>
          <div className="px-3 py-1 rounded-full bg-emerald-200/80 font-bold">⏱ {timeLeft}s</div>
          <div className="px-3 py-1 rounded-full bg-fuchsia-200/90 font-bold">Zappers ⚡ {zappers}</div>
        </div>
      </div>
    </div>
  );

  const StatsBar = () => (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
      <div className="rounded-full bg-blue-200/80 px-3 py-1 font-semibold text-blue-900">+ Tokens: {plus}</div>
      <div className="rounded-full bg-rose-200/80 px-3 py-1 font-semibold text-rose-900">− Tokens: {minus}</div>
      <div className="rounded-full bg-violet-200/80 px-3 py-1 font-semibold text-violet-900">Zero Pairs: {canCancel}</div>
      <div className="rounded-full bg-lime-200/80 px-3 py-1 font-semibold text-lime-900">Value: {value}</div>
    </div>
  );

  return (
    <div className="relative min-h-[100dvh] overflow-hidden">
      {/* Navigation */}
      <div className="absolute top-4 left-4 z-10">
        <Link 
          href="/theory/subtract-integers-b6" 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 text-slate-800 font-semibold"
        >
          📚 Learn Theory
        </Link>
      </div>

      {/* Animated candy sky */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-amber-100 via-sky-100 to-emerald-100" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="absolute w-[120vmax] h-[120vmax] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.6),transparent_60%)] animate-slow-spin rounded-full -left-1/3 -top-1/3" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22><circle cx=%225%22 cy=%225%22 r=%222%22 fill=%22%23ffffff44%22/></svg>')] animate-star-drift" />
      </div>

      <style jsx>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        .animate-wiggle { animation: wiggle 1.2s ease-in-out infinite; }

        @keyframes slowSpin {
          0% { transform: rotate(0deg) }
          100% { transform: rotate(360deg) }
        }
        .animate-slow-spin { animation: slowSpin 60s linear infinite; }

        @keyframes starDrift {
          0% { background-position: 0 0; }
          100% { background-position: 200px 120px; }
        }
        .animate-star-drift { animation: starDrift 20s linear infinite; }

        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-40px) scale(0.9); opacity: 0; }
        }
        .confetti {
          position: absolute;
          bottom: 20%;
          left: 50%;
          animation: floatUp 1.1s ease-out forwards;
        }
      `}</style>

      <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
        {/* Start Screen */}
        {screen === 'start' && (
          <div className="text-center">
            <div className="rounded-3xl bg-white/60 backdrop-blur-md shadow-2xl border border-white/50 p-8">
              <div className="text-6xl">🎉</div>
              <h1 className="mt-2 text-3xl md:text-4xl font-extrabold text-slate-800">Integer Carnival</h1>
              <p className="mt-2 text-slate-700">
                Add & subtract with <span className="font-semibold">zero-pair magic</span>.
                Bop tokens, zap pairs, beat the timer, rack up combos.
              </p>
              <button
                onClick={startGame}
                className="mt-6 px-6 py-3 rounded-2xl bg-gradient-to-r from-fuchsia-400 to-amber-400 text-white font-extrabold shadow hover:scale-105 transition"
              >
                ▶️ Start
              </button>
            </div>
          </div>
        )}

        {/* Game Screen */}
        {screen === 'play' && (
          <div className="space-y-4">
            <Header />
            <div className="rounded-3xl bg-white/70 backdrop-blur-md border border-white/50 shadow-xl p-4 md:p-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Controls */}
                <div className="md:w-64 shrink-0">
                  <h2 className="font-extrabold text-slate-800 text-lg mb-2">Controls</h2>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={addPlus} className="rounded-xl bg-blue-300 px-3 py-2 font-bold text-blue-900 shadow hover:scale-105">
                      ➕ +1
                    </button>
                    <button onClick={addMinus} className="rounded-xl bg-rose-300 px-3 py-2 font-bold text-rose-900 shadow hover:scale-105">
                      ➖ −1
                    </button>
                    <button onClick={addZeroPair} className="col-span-2 rounded-xl bg-violet-300 px-3 py-2 font-bold text-violet-900 shadow hover:scale-105">
                      ⚖️ Add Zero Pair
                    </button>
                    <button onClick={cancelOnePair} className="rounded-xl bg-teal-300 px-3 py-2 font-bold text-teal-900 shadow hover:scale-105">
                      🧲 Cancel 1 Pair
                    </button>
                    <button onClick={cancelAllPairs} className="rounded-xl bg-teal-400 px-3 py-2 font-bold text-teal-950 shadow hover:scale-105">
                      🧹 Cancel ALL
                    </button>
                    <button
                      onClick={zapAllPairs}
                      disabled={zappers <= 0}
                      className={[
                        'col-span-2 rounded-xl px-3 py-2 font-extrabold shadow hover:scale-105',
                        zappers > 0
                          ? 'bg-gradient-to-r from-fuchsia-400 to-amber-400 text-white'
                          : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                      ].join(' ')}
                    >
                      ⚡ Zero-Pair Zapper ({zappers})
                    </button>
                    <button onClick={check} className="col-span-2 rounded-xl bg-amber-300 px-3 py-2 font-bold text-amber-900 shadow hover:scale-105">
                      ✅ Check
                    </button>
                  </div>

                  <div className="mt-3">
                    <StatsBar />
                    <p className="mt-2 text-slate-700 text-sm">
                      Tip: Zero pair = (+1, −1) = 0. Add/remove freely to reshape without changing value.
                    </p>
                  </div>
                </div>

                {/* Arena */}
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="rounded-2xl bg-amber-200/80 px-4 py-2 font-extrabold">
                      Target: <span className="ml-1">{a} {op} {b}</span>
                    </div>
                    <div className="rounded-2xl bg-emerald-200/80 px-4 py-2 font-extrabold">
                      Your Value: <span className="ml-1">{value}</span>
                    </div>
                    <div className="rounded-2xl bg-pink-200/80 px-4 py-2 font-extrabold">
                      To clear level: <span className="ml-1">{problemsLeft}</span>
                    </div>
                  </div>

                  <div className="mt-3 rounded-3xl border-2 border-dashed border-slate-300 bg-white/80 p-3 md:p-4 min-h-[220px]">
                    {workspace.length === 0 && (
                      <div className="text-slate-400 italic">Add tokens to start the sculpting! ✨</div>
                    )}
                    <div className="flex flex-wrap">
                      {workspace.map((t) => (
                        <Token key={t.id} sign={t.sign} onClick={() => removeToken(t.id)} />
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 rounded-2xl bg-white/80 border border-white/60 p-3">
                    <p className="text-slate-800"><span className="mr-1">🧠</span>{msg}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Game Over */}
        {screen === 'over' && (
          <div className="text-center">
            <div className="rounded-3xl bg-white/60 backdrop-blur-md shadow-2xl border border-white/50 p-8">
              <div className="text-6xl">🏁</div>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-800">Game Over</h2>
              <p className="mt-2 text-slate-700">Final Score: <span className="font-extrabold">{score}</span> • Level Reached: <span className="font-extrabold">{level}</span></p>
              <button
                onClick={startGame}
                className="mt-6 px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-400 to-emerald-400 text-white font-extrabold shadow hover:scale-105 transition"
              >
                🔁 Play Again
              </button>
            </div>
          </div>
        )}

        {/* Confetti bits */}
        {bits.map((b) => (
          <div
            key={b.id}
            className="confetti"
            style={{
              left: `calc(50% + ${(b.x - 50) * 2}px)`,
              width: b.size,
              height: b.size,
              background: `hsl(${b.hue} 90% 60%)`,
              transform: `rotate(${b.rot}deg)`
            }}
          />
        ))}
      </div>
    </div>
  );
}
