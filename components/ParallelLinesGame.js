'use client';
import { useState, useRef, useEffect, useCallback } from 'react';

export default function ParallelLinesGame() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('Tap/click on any parallel (purple) line!');
  const [level, setLevel] = useState(1);
  const [timer, setTimer] = useState(30);
  const [isOver, setIsOver] = useState(false);

  // --- Timer loop ---
  useEffect(() => {
    if (isOver) return;
    const id = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(id);
          setIsOver(true);
          setMessage('⏳ Time up! Press Restart.');
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [isOver]);

  // --- Drawing ---
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Logical pixel size
    canvas.width = 600;
    canvas.height = 400;

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Bg
    ctx.fillStyle = '#fffafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Title row
    ctx.fillStyle = '#6d28d9';
    ctx.font = '16px ui-sans-serif, system-ui, -apple-system, Segoe UI';
    ctx.fillText(`Level ${level} • Score ${score} • ${timer}s`, 16, 28);

    // Timer bar
    const pct = timer / 30;
    ctx.fillStyle = '#e9d5ff';
    ctx.fillRect(16, 36, 568, 10);
    ctx.fillStyle = '#8b5cf6';
    ctx.fillRect(16, 36, 568 * pct, 10);
    ctx.strokeStyle = '#a78bfa';
    ctx.strokeRect(16, 36, 568, 10);

    // Parallel lines (targets)
    const gap = Math.max(36, 60 - level * 2); // smaller gap as level rises
    const startY = 100;
    const count = Math.min(6, 2 + Math.floor(level / 2)); // more lines with levels
    ctx.strokeStyle = '#7c3aed';
    ctx.lineWidth = 4;
    for (let i = 0; i < count; i++) {
      const y = startY + i * gap;
      ctx.beginPath();
      ctx.moveTo(50, y);
      ctx.lineTo(550, y);
      ctx.stroke();
    }

    // Slanted distractors (red)
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 2;
    for (let i = 0; i < count; i++) {
      const y = startY - 30 + i * gap;
      ctx.beginPath();
      ctx.moveTo(80 + (i % 2) * 40, y);
      ctx.lineTo(520, y + 30 + (i % 2) * 20);
      ctx.stroke();
    }

    // Hint text
    ctx.fillStyle = '#6b21a8';
    ctx.font = '14px ui-sans-serif, system-ui';
    ctx.fillText('Hint: Parallel lines stay the same distance apart and never meet.', 16, canvas.height - 16);
  }, [level, score, timer]);

  useEffect(() => {
    draw();
  }, [draw, level, timer]);

  // --- Click detection with scaling fix ---
  const handleCanvasClick = (event) => {
    if (isOver) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    // Map CSS pixels -> canvas logical pixels
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    // Target lines Y positions
    const gap = Math.max(36, 60 - level * 2);
    const startY = 100;
    const count = Math.min(6, 2 + Math.floor(level / 2));
    const targets = Array.from({ length: count }, (_, i) => startY + i * gap);

    // Hitbox a bit tighter on higher levels
    const hit = 12 - Math.min(level, 8); // 12 → 4 px
    const isHit = targets.some((ly) => Math.abs(y - ly) <= hit);

    if (isHit) {
      setScore((s) => {
        const newScore = s + 1;
        setMessage('Great! That’s parallel thinking. ✨');
        // Level up every 5 hits
        if (newScore >= level * 5) {
          setLevel((lv) => lv + 1);
          setMessage('Level up! Lines are getting trickier…');
        }
        return newScore;
      });
    } else {
      setMessage('Not parallel—notice how the red ones tilt and would meet.');
    }
  };

  const restart = () => {
    setScore(0);
    setLevel(1);
    setTimer(30);
    setIsOver(false);
    setMessage('Tap/click on any parallel (purple) line!');
    draw();
  };

  return (
    <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200 shadow-md">
      <h3 className="text-2xl font-bold text-purple-700 mb-2 text-center">Parallel Lines Game</h3>
      <p className="text-purple-600 mb-3 text-center">{message}</p>
      <div className="flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="border border-purple-200 rounded-xl mb-4"
          // Make it responsive but preserve aspect ratio
          style={{ width: '100%', maxWidth: 720, height: 'auto', display: 'block' }}
          onClick={handleCanvasClick}
        />
      </div>
      <p className="text-purple-700 text-center">Level: {level} • Time: {timer}s • Score: {score}</p>
      <div className="flex justify-center mt-3">
        <button
          onClick={restart}
          className="px-4 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-60"
        >
          {isOver ? 'Restart' : 'Restart Round'}
        </button>
      </div>
    </div>
  );
}
