'use client';
import { useEffect, useRef, useCallback } from 'react';

export default function MandalaBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);
  const particlesRef = useRef([]);

  // Initialize particles for subtle effects
  const initParticles = useCallback((canvas) => {
    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.3 + 0.1,
        hue: Math.random() * 60 + 200, // Blues and purples
        life: Math.random() * 1000,
        maxLife: Math.random() * 1000 + 500
      });
    }
    particlesRef.current = particles;
  }, []);

  // Draw a single mandala layer
  const drawMandalaLayer = useCallback((ctx, centerX, centerY, radius, petals, time, layer, mouseX, mouseY) => {
    const mouseInfluence = 0.0005;
    const mouseOffsetX = (mouseX - centerX) * mouseInfluence * (layer + 1);
    const mouseOffsetY = (mouseY - centerY) * mouseInfluence * (layer + 1);

    ctx.save();
    ctx.translate(centerX + mouseOffsetX, centerY + mouseOffsetY);

    // Breathing effect
    const breath = Math.sin(time * 0.003 + layer) * 0.1 + 0.9;
    ctx.scale(breath, breath);

    for (let i = 0; i < petals; i++) {
      const angle = (i / petals) * Math.PI * 2;
      const timeOffset = time * (0.001 + layer * 0.0005);
      const rotation = angle + Math.sin(timeOffset + i * 0.5) * 0.2;

      ctx.save();
      ctx.rotate(rotation);

      // Create petal shape with multiple curves
      ctx.beginPath();
      ctx.moveTo(0, 0);

      // Inner curve
      const innerRadius = radius * (0.2 + Math.sin(timeOffset * 2 + i) * 0.1);
      ctx.bezierCurveTo(
        innerRadius * 0.3, innerRadius * 0.3,
        innerRadius * 0.6, innerRadius * 0.6,
        innerRadius, 0
      );

      // Outer curve
      const outerRadius = radius * (0.8 + Math.sin(timeOffset * 1.5 + i * 0.7) * 0.15);
      ctx.bezierCurveTo(
        outerRadius * 0.7, outerRadius * 0.3,
        outerRadius * 0.9, outerRadius * 0.6,
        outerRadius, 0
      );

      // Dynamic color based on layer and time
      const hue = (layer * 30 + time * 0.05 + i * 10) % 360;
      const saturation = 70 + Math.sin(timeOffset + i) * 20;
      const lightness = 60 + Math.sin(timeOffset * 1.2 + i * 0.8) * 15;

      ctx.strokeStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      ctx.lineWidth = 3 + layer * 0.5;
      ctx.globalAlpha = (0.1 + layer * 0.05) * (0.5 + Math.sin(timeOffset + i) * 0.3);

      // Add glow effect
      ctx.shadowColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      ctx.shadowBlur = 10 + layer * 3;

      ctx.stroke();
      ctx.restore();
    }

    ctx.restore();
  }, []);

  // Draw particles
  const drawParticles = useCallback((ctx, canvas, time) => {
    particlesRef.current.forEach((particle, i) => {
      // Update particle physics
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life++;

      // Respawn particles
      if (particle.life > particle.maxLife || particle.x < 0 || particle.x > canvas.width ||
          particle.y < 0 || particle.y > canvas.height) {
        particle.x = Math.random() * canvas.width;
        particle.y = Math.random() * canvas.height;
        particle.life = 0;
      }

      // Draw particle with subtle glow
      ctx.save();
      ctx.globalAlpha = particle.alpha * (1 - particle.life / particle.maxLife);

      // Create gradient for particle
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 2
      );
      gradient.addColorStop(0, `hsla(${particle.hue}, 80%, 70%, ${particle.alpha})`);
      gradient.addColorStop(1, `hsla(${particle.hue}, 80%, 70%, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    });
  }, []);

  // Main animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const time = timeRef.current;
    const mouse = mouseRef.current;

    // Clear with very subtle fade
    ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw multiple mandala layers with different properties
    const layers = [
      { petals: 8, radius: Math.min(centerX, centerY) * 0.9, speed: 0.001 },
      { petals: 12, radius: Math.min(centerX, centerY) * 0.7, speed: 0.0015 },
      { petals: 16, radius: Math.min(centerX, centerY) * 0.5, speed: 0.002 },
      { petals: 6, radius: Math.min(centerX, centerY) * 0.3, speed: 0.0025 },
      { petals: 20, radius: Math.min(centerX, centerY) * 0.2, speed: 0.003 }
    ];

    layers.forEach((layer, index) => {
      drawMandalaLayer(
        ctx,
        centerX,
        centerY,
        layer.radius,
        layer.petals,
        time * (1 + layer.speed * 100),
        index,
        mouse.x,
        mouse.y
      );
    });

    // Draw particles
    drawParticles(ctx, canvas, time);

    // Add central energy core with breathing effect
    const coreRadius = 20 + Math.sin(time * 0.004) * 5;
    ctx.save();
    ctx.globalAlpha = 0.3 + Math.sin(time * 0.003) * 0.2;

    const coreGradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, coreRadius * 2
    );
    coreGradient.addColorStop(0, `hsla(${(time * 0.1) % 360}, 80%, 70%, 0.6)`);
    coreGradient.addColorStop(0.5, `hsla(${(time * 0.1 + 60) % 360}, 80%, 70%, 0.3)`);
    coreGradient.addColorStop(1, `hsla(${(time * 0.1 + 120) % 360}, 80%, 70%, 0)`);

    ctx.fillStyle = coreGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, coreRadius * 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    timeRef.current += 1;
    requestAnimationFrame(animate);
  }, [drawMandalaLayer, drawParticles]);

  // Mouse tracking
  const handleMouseMove = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }, []);

  // Touch tracking for mobile
  const handleTouchMove = useCallback((e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    }
  }, []);

  // Scroll effect
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Subtle parallax effect
    canvas.style.transform = `translateY(${scrollY * 0.1}px)`;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize
    initParticles(canvas);
    animate();

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [animate, handleMouseMove, handleTouchMove, handleScroll, initParticles]);

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
        background: 'radial-gradient(ellipse at center, rgba(243, 232, 255, 0.3) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 1) 100%)',
        mixBlendMode: 'multiply',
        opacity: 0.7,
      }}
      aria-hidden="true"
    />
  );
}
