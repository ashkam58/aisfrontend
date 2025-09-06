'use client';
import { useEffect, useRef, useState } from 'react';

export default function MandalaCanvas() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [segments, setSegments] = useState(8);
  const [size, setSize] = useState(2);
  const [color, setColor] = useState('#0ea5e9');

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGuides(ctx, canvas);
  }, [segments]);

  const drawGuides = (ctx, canvas) => {
    ctx.save();
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    const cx = canvas.width / 2, cy = canvas.height / 2, r = Math.min(cx, cy) - 10;
    for (let i = 0; i < segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
      ctx.stroke();
    }
    ctx.restore();
  };

  const handlePointer = (type, e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.nativeEvent.offsetX ?? e.clientX - rect.left;
    const y = e.nativeEvent.offsetY ?? e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    const cx = canvas.width / 2, cy = canvas.height / 2;
    if (type === 'down') setIsDrawing(true);
    if (type === 'up') setIsDrawing(false);
    if (type === 'move' && isDrawing) {
      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const rx = (x - cx) * Math.cos(angle) - (y - cy) * Math.sin(angle) + cx;
        const ry = (x - cx) * Math.sin(angle) + (y - cy) * Math.cos(angle) + cy;
        ctx.beginPath();
        ctx.arc(rx, ry, size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }
    }
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGuides(ctx, canvas);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <label className="text-sm">Segments</label>
        <input type="range" min="4" max="24" value={segments} onChange={e => setSegments(parseInt(e.target.value))} />
        <label className="text-sm">Brush</label>
        <input type="range" min="1" max="10" value={size} onChange={e => setSize(parseInt(e.target.value))} />
        <input type="color" value={color} onChange={e => setColor(e.target.value)} />
        <button onClick={clear} className="ml-auto px-3 py-1.5 rounded-lg bg-slate-800 text-white hover:bg-slate-900">Clear</button>
      </div>
      <canvas
        ref={canvasRef}
        width={900}
        height={300}
        className="w-full border border-slate-200 rounded-xl bg-white shadow"
        onMouseDown={(e) => handlePointer('down', e)}
        onMouseUp={(e) => handlePointer('up', e)}
        onMouseMove={(e) => handlePointer('move', e)}
        onMouseLeave={(e) => handlePointer('up', e)}
      />
    </div>
  );
}
