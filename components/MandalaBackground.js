'use client'
import { useEffect, useRef } from 'react';

export default function MandalaBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let t = 0;

    function drawMandala() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = Math.min(cx, cy) * 0.8;
      const petals = 12;
      for (let i = 0; i < petals; i++) {
        const angle = (i / petals) * Math.PI * 2 + Math.sin(t + i) * 0.2;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(30, 30, 60, 60, radius, 0);
        ctx.strokeStyle = `hsl(${(i * 30 + t * 20) % 360}, 80%, 60%)`;
        ctx.lineWidth = 8;
        ctx.globalAlpha = 0.7;
        ctx.stroke();
        ctx.restore();
      }
      t += 0.02;
      animationFrameId = requestAnimationFrame(drawMandala);
    }

    drawMandala();
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        background: 'radial-gradient(circle, #f3e8ff 0%, #fff 100%)',
      }}
      aria-hidden="true"
    />
  );
}
