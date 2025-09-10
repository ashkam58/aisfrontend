'use client'
import React, { useEffect, useRef, useState, useCallback } from 'react';

export default function GeometryTeachingComponent({ isActive = false, onClose = () => {} }) {
  const canvasRef = useRef(null);
  const pointerIdRef = useRef(null);

  const [shapes, setShapes] = useState([]);
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);
  const [tool, setTool] = useState('select');
  const [gridSize, setGridSize] = useState(20);
  const [gridSnap, setGridSnap] = useState(true);

  const uid = () => Date.now().toString(36) + Math.floor(Math.random() * 1000).toString(36);
  const snap = (v) => (gridSnap ? Math.round(v / gridSize) * gridSize : v);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const rect = canvas.getBoundingClientRect(); const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(300, Math.floor(rect.width * dpr)); canvas.height = Math.max(150, Math.floor(rect.height * dpr));
    canvas.style.width = rect.width + 'px'; canvas.style.height = rect.height + 'px';
  }, []);

  const render = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext('2d'); const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(dpr,0,0,dpr,0,0); const w = canvas.width / dpr; const h = canvas.height / dpr; ctx.clearRect(0,0,w,h);
    ctx.fillStyle = '#fff'; ctx.fillRect(0,0,w,h);
    ctx.save(); ctx.strokeStyle='rgba(0,0,0,0.06)'; ctx.lineWidth =1; for(let x=0;x<w;x+=gridSize){ctx.beginPath();ctx.moveTo(x+0.5,0);ctx.lineTo(x+0.5,h);ctx.stroke();} for(let y=0;y<h;y+=gridSize){ctx.beginPath();ctx.moveTo(0,y+0.5);ctx.lineTo(w,y+0.5);ctx.stroke();} ctx.restore();
    shapes.forEach(s => { ctx.strokeStyle = s.meta?.color || '#2563EB'; ctx.lineWidth = s.meta?.stroke || 2; ctx.fillStyle = s.meta?.fill || 'transparent';
      if (s.type === 'point') { const [x,y]=s.points[0]; ctx.beginPath(); ctx.arc(x,y,4,0,Math.PI*2); ctx.fill(); ctx.stroke(); }
      else if (s.type === 'line') { ctx.beginPath(); ctx.moveTo(...s.points[0]); ctx.lineTo(...s.points[1]); ctx.stroke(); }
      else if (s.type === 'freehand') { ctx.beginPath(); s.points.forEach((p,i)=> i===0?ctx.moveTo(...p):ctx.lineTo(...p)); ctx.stroke(); }
      else if (s.type === 'circle') { const [cx,cy]=s.points[0]; const r=s.points[1]; ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.stroke(); ctx.fill(); ctx.fillStyle='#111'; ctx.font='12px sans-serif'; ctx.fillText(`r=${r.toFixed(0)}`, cx + r + 6, cy); }
    });
  }, [shapes, gridSize]);

  useEffect(() => { resizeCanvas(); render(); }, [render, resizeCanvas]);
  useEffect(() => { window.addEventListener('resize', resizeCanvas); return () => window.removeEventListener('resize', resizeCanvas); }, [resizeCanvas]);

  const pushHistory = (next) => { setHistory(h => [...h, shapes]); setShapes(next); setFuture([]); };
  const undo = () => { setHistory(h => { if (h.length===0) return h; const prev = h[h.length-1]; setFuture(f => [shapes, ...f]); setShapes(prev); return h.slice(0,-1); }); };
  const redo = () => { setFuture(f => { if (f.length===0) return f; const next = f[0]; setHistory(h => [...h, shapes]); setShapes(next); return f.slice(1); }); };

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return; const rect = () => canvas.getBoundingClientRect(); let current = null;
    const toLocal = (ev) => { const r = rect(); const x = ev.clientX - r.left; const y = ev.clientY - r.top; return { x: snap(x), y: snap(y) }; };

    const onDown = (ev) => { ev.preventDefault?.(); const p = toLocal(ev); try { if (canvas.setPointerCapture) canvas.setPointerCapture(ev.pointerId); pointerIdRef.current = ev.pointerId; } catch(e) {}
      if (tool === 'point') { const newShape = { id: uid(), type:'point', points:[[p.x,p.y]], meta:{color:'#111827'} }; pushHistory([...shapes,newShape]); }
      else if (tool === 'line' || tool === 'measure') { current = { id: uid(), type:'line', points:[[p.x,p.y],[p.x,p.y]], meta:{color: tool==='measure' ? '#F59E0B' : '#2563EB'} }; setShapes(s=>[...s,current]); }
      else if (tool === 'freehand') { current = { id: uid(), type:'freehand', points:[[p.x,p.y]], meta:{color:'#6D28D9'} }; setShapes(s=>[...s,current]); }
    };

    const onMove = (ev) => { ev.preventDefault?.(); const p = toLocal(ev); if (!current) return; if (current.type==='line') setShapes(s=>s.map(sh=>sh.id===current.id?{...sh,points:[sh.points[0],[p.x,p.y]]}:sh)); else if (current.type==='freehand') setShapes(s=>s.map(sh=>sh.id===current.id?{...sh,points:[...sh.points,[p.x,p.y]]}:sh)); };

    const onUp = (ev) => { ev.preventDefault?.(); const p = toLocal(ev); try { if (canvas.releasePointerCapture && pointerIdRef.current) canvas.releasePointerCapture(pointerIdRef.current); } catch(e) {} pointerIdRef.current = null; if (current) { pushHistory(shapes.map(sh=>sh.id===current.id?{...sh,points: current.type==='line' ? [current.points[0],[p.x,p.y]] : sh.points }:sh)); current=null; } };

    canvas.addEventListener('pointerdown', onDown); window.addEventListener('pointermove', onMove); window.addEventListener('pointerup', onUp);
    return () => { canvas.removeEventListener('pointerdown', onDown); window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp); };
  }, [tool, shapes, gridSize, gridSnap]);

  const exportPNG = () => { const canvas = canvasRef.current; if(!canvas) return; const url = canvas.toDataURL('image/png'); const a = document.createElement('a'); a.href = url; a.download = 'geometry.png'; a.click(); };
  const exportJSON = () => { const data = JSON.stringify(shapes,null,2); const blob = new Blob([data],{type:'application/json'}); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'geometry.json'; a.click(); URL.revokeObjectURL(url); };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 flex items-start justify-center p-4 overflow-auto">
      <div className="mt-6 bg-white rounded-2xl shadow-xl w-full max-w-5xl max-h-[calc(100vh-6rem)] overflow-hidden border-2 border-blue-200">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-bold">📐 Geometry Calculator & Studio</h3>
          <div className="flex items-center gap-2">
            <button onClick={exportPNG} className="px-3 py-1 bg-gray-100 rounded">Export PNG</button>
            <button onClick={exportJSON} className="px-3 py-1 bg-gray-100 rounded">Export JSON</button>
            <button onClick={onClose} className="px-3 py-1 bg-red-100 rounded">Close</button>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-72 p-4 bg-blue-50 overflow-y-auto border-r">
            <h4 className="font-bold mb-2">Tools</h4>
            <div className="flex flex-col gap-2">
              <button onClick={() => setTool('select')} className={`text-left px-3 py-2 rounded ${tool==='select'?'bg-white shadow':'bg-transparent'}`}>Select/Move</button>
              <button onClick={() => setTool('point')} className={`text-left px-3 py-2 rounded ${tool==='point'?'bg-white shadow':'bg-transparent'}`}>Point</button>
              <button onClick={() => setTool('line')} className={`text-left px-3 py-2 rounded ${tool==='line'?'bg-white shadow':'bg-transparent'}`}>Line</button>
              <button onClick={() => setTool('freehand')} className={`text-left px-3 py-2 rounded ${tool==='freehand'?'bg-white shadow':'bg-transparent'}`}>Freehand</button>
              <button onClick={() => setTool('measure')} className={`text-left px-3 py-2 rounded ${tool==='measure'?'bg-white shadow':'bg-transparent'}`}>Measure</button>
              <div className="pt-2 border-t mt-2">
                <h5 className="font-semibold">Actions</h5>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => { setShapes([]); setHistory([]); setFuture([]); }} className="px-3 py-1 bg-red-50 rounded">Clear</button>
                  <button onClick={undo} className="px-3 py-1 bg-gray-100 rounded">Undo</button>
                  <button onClick={redo} className="px-3 py-1 bg-gray-100 rounded">Redo</button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-hidden">
            <div className="bg-gray-50 rounded p-2 mb-3">
              <canvas ref={canvasRef} className="w-full h-64 border rounded bg-white" style={{ touchAction: 'none', userSelect: 'none' }} />
            </div>

            <div className="overflow-x-auto py-2 -mx-2 px-2 scrollbar-hide">
              <div className="flex items-center space-x-2">
                <button onClick={() => { setShapes(s=>[...s, {id:uid(), type:'triangle', points:[[100,200],[200,80],[300,200]], meta:{color:'#2563EB', stroke:2}}]); }} className="flex-shrink-0 px-3 py-2 bg-blue-500 text-white rounded">Triangle</button>
                <button onClick={() => { setShapes(s=>[...s, {id:uid(), type:'square', points:[[120,120],[240,120],[240,240],[120,240]], meta:{color:'#16A34A', stroke:2}}]); }} className="flex-shrink-0 px-3 py-2 bg-green-500 text-white rounded">Square</button>
                <button onClick={() => { setShapes(s=>[...s, {id:uid(), type:'circle', points:[[220,160],60], meta:{color:'#F59E0B', stroke:2}}]); }} className="flex-shrink-0 px-3 py-2 bg-amber-500 text-white rounded">Circle</button>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-bold mb-2">Info</h4>
              <p className="text-sm text-gray-600">Shapes: {shapes.length}</p>
              <p className="text-sm text-gray-600">Grid: {gridSnap ? `on (${gridSize}px)` : 'off'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}