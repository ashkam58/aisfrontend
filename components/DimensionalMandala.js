'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

const PRESETS = {
  cosmic: {
    name: '🌌 Cosmic Nebula',
    colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8'],
    particleCount: 50, // Reduced from 200
    layers: 3, // Reduced from 5
    symmetry: 8, // Reduced from 12
    speed: 0.01, // Reduced from 0.02
    scale: 1.0, // Reduced from 1.2
    glow: false, // Disabled glow for performance
    particles: true
  },
  aurora: {
    name: '🌈 Aurora Borealis',
    colors: ['#00ff87', '#60efff', '#ff006e', '#8338ec', '#3a86ff', '#06ffa5'],
    particleCount: 40, // Reduced from 150
    layers: 2, // Reduced from 4
    symmetry: 6, // Reduced from 8
    speed: 0.008, // Reduced from 0.015
    scale: 0.9, // Reduced from 1.0
    glow: false, // Disabled glow for performance
    particles: true
  },
  quantum: {
    name: '⚛️ Quantum Field',
    colors: ['#ff0080', '#00ff80', '#8000ff', '#ff8000', '#0080ff', '#80ff00'],
    particleCount: 60, // Reduced from 300
    layers: 3, // Reduced from 6
    symmetry: 10, // Reduced from 16
    speed: 0.012, // Reduced from 0.025
    scale: 1.1, // Reduced from 1.5
    glow: false, // Disabled glow for performance
    particles: true
  },
  zen: {
    name: '🧘 Zen Garden',
    colors: ['#2d5016', '#4a7c59', '#6b8f7d', '#8fa68e', '#b8c5b0'],
    particleCount: 20, // Reduced from 80
    layers: 2, // Reduced from 3
    symmetry: 4, // Reduced from 6
    speed: 0.005, // Reduced from 0.01
    scale: 0.7, // Reduced from 0.8
    glow: false, // Already false
    particles: false // Already false
  },
  cyberpunk: {
    name: '🤖 Cyberpunk',
    colors: ['#ff073a', '#39ff14', '#ff6600', '#00ffff', '#ff00ff', '#ffff00'],
    particleCount: 45, // Reduced from 250
    layers: 3, // Reduced from 7
    symmetry: 8, // Reduced from 20
    speed: 0.015, // Reduced from 0.03
    scale: 1.0, // Reduced from 1.3
    glow: false, // Disabled glow for performance
    particles: true
  }
};

export default function DimensionalMandala() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const timeRef = useRef(0);
  const lastFrameTimeRef = useRef(0);
  const frameCountRef = useRef(0);
  const fpsRef = useRef(60);

  const [currentPreset, setCurrentPreset] = useState('zen'); // Start with low-performance preset
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [performanceMode, setPerformanceMode] = useState(false);
  const [fps, setFps] = useState(60);
  const [customSettings, setCustomSettings] = useState(PRESETS['zen']); // Initialize with zen preset

  const preset = PRESETS[currentPreset];

  // Initialize particles
  const initParticles = useCallback(() => {
    const particles = [];
    const canvas = canvasRef.current;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < preset.particleCount; i++) {
      particles.push({
        x: centerX + (Math.random() - 0.5) * 400,
        y: centerY + (Math.random() - 0.5) * 400,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        color: preset.colors[Math.floor(Math.random() * preset.colors.length)],
        life: Math.random() * 1000,
        maxLife: Math.random() * 1000 + 500,
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * 200 + 50
      });
    }
    particlesRef.current = particles;
  }, [preset]);

  // Draw mandala layer
  const drawMandalaLayer = useCallback((ctx, layer, time, symmetry, scale, colors) => {
    const canvas = canvasRef.current;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.8 * scale;

    ctx.save();
    ctx.translate(centerX, centerY);

    for (let s = 0; s < symmetry; s++) {
      ctx.save();
      ctx.rotate((s / symmetry) * Math.PI * 2);

      // Draw intricate patterns
      const points = 50 + layer * 10;
      ctx.beginPath();

      for (let i = 0; i <= points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const r = radius * (0.3 + 0.4 * Math.sin(angle * (layer + 1) + time * preset.speed) +
                           0.2 * Math.sin(angle * (layer + 2) * 2 + time * preset.speed * 1.5) +
                           0.1 * Math.sin(angle * (layer + 3) * 3 + time * preset.speed * 2));

        const x = r * Math.cos(angle);
        const y = r * Math.sin(angle);

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.closePath();

      // Dynamic color based on layer and time
      const colorIndex = (layer + Math.floor(time * 0.1)) % colors.length;
      ctx.strokeStyle = colors[colorIndex];
      ctx.lineWidth = 2 + layer * 0.5;
      ctx.globalAlpha = 0.7 + 0.3 * Math.sin(time * preset.speed + layer);

      if (preset.glow) {
        ctx.shadowColor = colors[colorIndex];
        ctx.shadowBlur = 10 + layer * 5;
      }

      ctx.stroke();
      ctx.restore();
    }

    ctx.restore();
  }, [preset]);

  // Draw particles
  const drawParticles = useCallback((ctx, time, maxParticles = null) => {
    if (!preset.particles) return;

    const particleLimit = maxParticles || particlesRef.current.length;
    const particlesToDraw = particlesRef.current.slice(0, particleLimit);

    particlesToDraw.forEach((particle, i) => {
      // Update particle physics
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.angle += 0.02;
      particle.life++;

      // Respawn particles
      if (particle.life > particle.maxLife) {
        const canvas = canvasRef.current;
        particle.x = canvas.width / 2 + (Math.random() - 0.5) * 400;
        particle.y = canvas.height / 2 + (Math.random() - 0.5) * 400;
        particle.life = 0;
      }

      // Draw particle with conditional glow
      ctx.save();
      ctx.globalAlpha = 1 - (particle.life / particle.maxLife);

      if (!performanceMode && preset.glow) {
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 15;
      }

      // Draw main particle
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();

      // Draw orbiting elements (reduced in performance mode)
      const orbitCount = performanceMode ? 2 : 3;
      for (let j = 0; j < orbitCount; j++) {
        const orbitAngle = particle.angle + (j * Math.PI * 2 / orbitCount);
        const orbitX = particle.x + Math.cos(orbitAngle) * (particle.size * 3);
        const orbitY = particle.y + Math.sin(orbitAngle) * (particle.size * 3);

        ctx.beginPath();
        ctx.arc(orbitX, orbitY, particle.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    });
  }, [preset, performanceMode]);

  // Main animation loop with performance optimizations
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const time = timeRef.current;
    const now = Date.now();

    // Performance monitoring
    frameCountRef.current++;
    if (now - lastFrameTimeRef.current >= 1000) {
      const currentFps = Math.round((frameCountRef.current * 1000) / (now - lastFrameTimeRef.current));
      setFps(currentFps);

      // Adaptive performance mode
      if (currentFps < 30 && !performanceMode) {
        setPerformanceMode(true);
      } else if (currentFps > 50 && performanceMode) {
        setPerformanceMode(false);
      }

      frameCountRef.current = 0;
      lastFrameTimeRef.current = now;
    }

    // Frame rate limiting
    const targetFps = performanceMode ? 30 : 60;
    const frameInterval = 1000 / targetFps;
    const elapsed = now - lastFrameTimeRef.current;
    if (elapsed < frameInterval) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }
    lastFrameTimeRef.current = now;

    // Optimized clear with conditional fade
    if (performanceMode) {
      // Simple clear in performance mode
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    } else {
      // Fade effect for normal mode
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Draw mandala layers with performance considerations
    const layersToDraw = performanceMode ? Math.min(preset.layers, 2) : preset.layers;
    for (let layer = 0; layer < layersToDraw; layer++) {
      drawMandalaLayer(ctx, layer, time, preset.symmetry, preset.scale, preset.colors);
    }

    // Draw particles with reduced count in performance mode
    const particleCount = performanceMode ? Math.floor(preset.particleCount * 0.5) : preset.particleCount;
    drawParticles(ctx, time, particleCount);

    // Add central energy core with conditional glow
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const coreRadius = 30 + 10 * Math.sin(time * 0.05);

    ctx.save();
    ctx.globalAlpha = performanceMode ? 0.6 : 0.8;
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreRadius);
    gradient.addColorStop(0, preset.colors[0]);
    gradient.addColorStop(0.5, preset.colors[1]);
    gradient.addColorStop(1, preset.colors[2]);

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
    ctx.fill();

    // Conditional glow effect
    if (!performanceMode && preset.glow) {
      ctx.shadowColor = preset.colors[0];
      ctx.shadowBlur = 15;
      ctx.fill();
    }
    ctx.restore();

    // Adaptive time increment based on performance
    const timeIncrement = performanceMode ? 0.5 : 1;
    timeRef.current += timeIncrement;

    if (isPlaying) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [preset, isPlaying, drawMandalaLayer, drawParticles, performanceMode]);

  // Initialize canvas and start animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 1200;
    canvas.height = 800;

    initParticles();
    timeRef.current = 0;

    if (isPlaying) {
      animate();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [preset, isPlaying, animate, initParticles]);

  // Handle preset change
  const handlePresetChange = (newPreset) => {
    setCurrentPreset(newPreset);
    setCustomSettings(PRESETS[newPreset]);
  };

  // Export canvas as image
  const exportArt = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `mandala-${currentPreset}-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Main Canvas */}
      <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
        <canvas
          ref={canvasRef}
          className="w-full h-auto block"
          style={{ aspectRatio: '3/2' }}
        />

        {/* Overlay Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div className="bg-black/50 backdrop-blur rounded-lg p-3">
            <h2 className="text-white text-xl font-bold mb-2">🌌 Dimensional Mandala</h2>
            <p className="text-white/80 text-sm">{preset.name}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-white/20 backdrop-blur rounded-lg p-2 text-white hover:bg-white/30 transition-colors"
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            <button
              onClick={() => setPerformanceMode(!performanceMode)}
              className={`backdrop-blur rounded-lg p-2 text-white hover:bg-white/30 transition-colors ${
                performanceMode ? 'bg-yellow-500/20' : 'bg-white/20'
              }`}
              title={performanceMode ? 'Disable Performance Mode' : 'Enable Performance Mode'}
            >
              ⚡
            </button>
            <button
              onClick={() => setShowControls(!showControls)}
              className="bg-white/20 backdrop-blur rounded-lg p-2 text-white hover:bg-white/30 transition-colors"
            >
              ⚙️
            </button>
            <button
              onClick={exportArt}
              className="bg-white/20 backdrop-blur rounded-lg p-2 text-white hover:bg-white/30 transition-colors"
            >
              💾
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Controls Panel */}
      {showControls && (
        <div className="mt-6 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 rounded-2xl p-6 text-white">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            🎛️ Advanced Controls
          </h3>

          {/* Preset Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Presets</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {Object.entries(PRESETS).map(([key, presetData]) => (
                <button
                  key={key}
                  onClick={() => handlePresetChange(key)}
                  className={`p-3 rounded-lg text-sm font-medium transition-all ${
                    currentPreset === key
                      ? 'bg-white text-black shadow-lg scale-105'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  {presetData.name}
                </button>
              ))}
            </div>
          </div>

          {/* Real-time Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Animation Speed</label>
              <input
                type="range"
                min="0.005"
                max="0.05"
                step="0.005"
                value={customSettings.speed}
                onChange={(e) => setCustomSettings(prev => ({ ...prev, speed: parseFloat(e.target.value) }))}
                className="w-full"
              />
              <div className="text-xs text-white/60 mt-1">{customSettings.speed.toFixed(3)}</div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Scale</label>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.1"
                value={customSettings.scale}
                onChange={(e) => setCustomSettings(prev => ({ ...prev, scale: parseFloat(e.target.value) }))}
                className="w-full"
              />
              <div className="text-xs text-white/60 mt-1">{customSettings.scale.toFixed(1)}x</div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Symmetry</label>
              <input
                type="range"
                min="4"
                max="24"
                step="2"
                value={customSettings.symmetry}
                onChange={(e) => setCustomSettings(prev => ({ ...prev, symmetry: parseInt(e.target.value) }))}
                className="w-full"
              />
              <div className="text-xs text-white/60 mt-1">{customSettings.symmetry} sides</div>
            </div>
          </div>

          {/* Performance Stats */}
          <div className="mt-6 pt-4 border-t border-white/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{performanceMode ? Math.min(preset.layers, 2) : preset.layers}</div>
                <div className="text-xs text-white/60">Layers</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{performanceMode ? Math.floor(preset.particleCount * 0.5) : preset.particleCount}</div>
                <div className="text-xs text-white/60">Particles</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{preset.symmetry}</div>
                <div className="text-xs text-white/60">Symmetry</div>
              </div>
              <div>
                <div className={`text-2xl font-bold ${fps < 30 ? 'text-red-400' : fps < 50 ? 'text-yellow-400' : 'text-green-400'}`}>
                  {isPlaying ? fps : '0'}
                </div>
                <div className="text-xs text-white/60">
                  FPS {performanceMode && <span className="text-yellow-400">(Perf Mode)</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-4 text-center text-gray-600 text-sm">
        <p>🎨 <strong>Interactive Mandala Kaleidoscope</strong> - Experience fourth-dimensional art through mathematics and motion</p>
        <p className="mt-1">💫 Each preset creates unique fractal patterns with particle systems and dynamic lighting</p>
      </div>
    </div>
  );
}
