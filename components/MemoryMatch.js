'use client';
import { useEffect, useMemo, useState } from 'react';

const EMOJIS = ['🐶','🐱','🐭','🦊','🐼','🐨','🐯','🦁'];

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MemoryMatch() {
  const deck = useMemo(() => shuffle([...EMOJIS, ...EMOJIS].map((s, i) => ({ id: i+'-'+s, s }))), []);
  const [open, setOpen] = useState([]); // ids
  const [matched, setMatched] = useState(new Set());
  const [moves, setMoves] = useState(0);

  const click = (card) => {
    if (matched.has(card.s) || open.includes(card.id)) return;
    if (open.length === 0) setOpen([card.id]);
    else if (open.length === 1) {
      setOpen([open[0], card.id]);
      setMoves(m => m + 1);
    } else {
      setOpen([card.id]);
    }
  };

  useEffect(() => {
    if (open.length === 2) {
      const [a, b] = open;
      const sa = deck.find(c => c.id === a).s;
      const sb = deck.find(c => c.id === b).s;
      if (sa === sb) {
        setMatched(prev => new Set([...prev, sa]));
        setOpen([]);
      } else {
        const t = setTimeout(() => setOpen([]), 700);
        return () => clearTimeout(t);
      }
    }
  }, [open, deck]);

  const reset = () => {
    window.location.reload();
  };

  const won = matched.size === EMOJIS.length;

  return (
    <div className="rounded-2xl border border-slate-200 p-4 bg-white/80">
      <div className="flex items-center justify-between">
        <div className="text-sm">Moves: <span className="font-bold">{moves}</span></div>
        <button onClick={reset} className="px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700">New Game</button>
      </div>
      <div className="grid grid-cols-4 gap-3 mt-4">
        {deck.map(card => {
          const isOpen = open.includes(card.id) || matched.has(card.s);
          return (
            <button key={card.id}
              onClick={() => click(card)}
              className={`aspect-square rounded-2xl border text-3xl flex items-center justify-center transition-transform
                ${isOpen ? 'bg-emerald-100 border-emerald-300 scale-100' : 'bg-white hover:scale-105'}`}>
              {isOpen ? card.s : '❓'}
            </button>
          );
        })}
      </div>
      {won && <div className="mt-3 text-emerald-700 font-semibold">Victory! Brain unlocked 🔓🧠</div>}
    </div>
  );
}
