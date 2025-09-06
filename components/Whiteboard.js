'use client';
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { Stage, Layer, Line } from 'react-konva';

const SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000';
const ROOM_ID = 'classroom-1';

export default function Whiteboard() {
  const [socket, setSocket] = useState(null);
  const [lines, setLines] = useState([]); // { points: [], color, size }
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#111827'); // slate-900 default
  const [size, setSize] = useState(4);
  const stageRef = useRef(null);

  useEffect(() => {
    const s = io(SERVER_URL, { transports: ['websocket'] });
    setSocket(s);
    s.on('connect', () => s.emit('join-room', ROOM_ID));
    s.on('draw-line', ({ line }) => {
      setLines(prev => [...prev, line]);
    });
    s.on('clear-board', () => setLines([]));
    return () => s.disconnect();
  }, []);

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool: 'pen', points: [pos.x, pos.y], color, size }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
    socket?.emit('draw-line', { roomId: ROOM_ID, line: lastLine });
  };

  const handleMouseUp = () => setIsDrawing(false);

  const clearBoard = () => {
    setLines([]);
    socket?.emit('clear-board', { roomId: ROOM_ID });
  };

  return (
    <div className="rounded-2xl border border-slate-200 shadow bg-white/80">
      <div className="flex items-center gap-3 p-3 border-b border-slate-200">
        <label className="text-sm">Color</label>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)}
               className="w-8 h-8 rounded" />
        <label className="text-sm">Size</label>
        <input type="range" min="1" max="20" value={size} onChange={(e) => setSize(parseInt(e.target.value))} />
        <button onClick={clearBoard} className="ml-auto px-3 py-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700">
          Clear
        </button>
      </div>
      <div className="p-3">
        <Stage
          width={Math.min(1024, typeof window !== 'undefined' ? window.innerWidth - 64 : 1024)}
          height={480}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          ref={stageRef}
        >
          <Layer>
            {lines.map((l, i) => (
              <Line
                key={i}
                points={l.points}
                stroke={l.color}
                strokeWidth={l.size}
                tension={0.4}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={l.tool === 'eraser' ? 'destination-out' : 'source-over'}
              />
            ))}
          </Layer>
        </Stage>
        <p className="text-xs text-slate-500 mt-2">
          Pro tip: open this page on two tabs to test collaboration.
        </p>
      </div>
    </div>
  );
}
