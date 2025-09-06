'use client'
import { useState, useRef, useEffect, useCallback } from 'react';

export default function DrawingCanvas({ topicName, grade, width }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 400 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(3);
  const [tool, setTool] = useState('pen'); // pen, eraser
  const [isSaved, setIsSaved] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [canvasPreset, setCanvasPreset] = useState('default');

  const storageKey = `drawing-canvas-${grade}-${topicName.replace(/\s+/g, '-').toLowerCase()}`;

  const canvasPresets = {
    small: { width: 400, height: 300 },
    default: { width: 600, height: 400 },
    large: { width: 800, height: 600 },
    xl: { width: 1000, height: 700 }
  };

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      const newWidth = Math.max(400, rect.width - 32); // Account for padding
      const newHeight = Math.max(300, newWidth * 0.6); // Maintain aspect ratio

      setCanvasSize({ width: newWidth, height: newHeight });

      // Update canvas dimensions
      canvas.width = newWidth;
      canvas.height = newHeight;

      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Redraw saved content if exists
      const savedDrawing = localStorage.getItem(storageKey);
      if (savedDrawing) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, newWidth, newHeight);
        };
        img.src = savedDrawing;
      }
    };

    updateCanvasSize();

    // Add resize observer
    const resizeObserver = new ResizeObserver(updateCanvasSize);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [storageKey, width]);

  // Auto-save drawing
  const saveDrawing = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataURL = canvas.toDataURL();
    localStorage.setItem(storageKey, dataURL);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  }, [storageKey]);

  const handlePresetChange = (preset) => {
    setCanvasPreset(preset);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const size = canvasPresets[preset];
    setCanvasSize(size);

    canvas.width = size.width;
    canvas.height = size.height;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Redraw saved content
    const savedDrawing = localStorage.getItem(storageKey);
    if (savedDrawing) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, size.width, size.height);
      };
      img.src = savedDrawing;
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Drawing functions
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);

    // Set drawing properties
    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = brushSize * 2;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
    }
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveDrawing();
    }
  };

  // Touch events for tablet support
  const handleTouchStart = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    startDrawing(mouseEvent);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    draw(mouseEvent);
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    stopDrawing();
  };

  const clearCanvas = () => {
    if (window.confirm('Are you sure you want to clear the entire canvas? This cannot be undone.')) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      localStorage.removeItem(storageKey);
    }
  };

  const exportDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `drawing-${topicName.replace(/\s+/g, '-')}-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className={`bg-white rounded-cartoon shadow-md p-4 ${isFullscreen ? 'fixed inset-4 z-50 bg-white' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-cartoon text-purple-700">🎨 Drawing Canvas</h3>
        {isFullscreen && (
          <button
            onClick={toggleFullscreen}
            className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
          >
            ✕ Close
          </button>
        )}
        {isSaved && (
          <span className="text-green-600 text-sm font-medium">💾 Saved!</span>
        )}
      </div>

      {/* Drawing Tools */}
      {!isFullscreen && (
        <div className="flex flex-wrap items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
          {/* Tool Selection */}
          <div className="flex gap-2">
            <button
              onClick={() => setTool('pen')}
              className={`px-3 py-1 rounded text-sm font-medium ${
                tool === 'pen'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white text-purple-600 border border-purple-300'
              }`}
            >
              ✏️ Pen
            </button>
            <button
              onClick={() => setTool('eraser')}
              className={`px-3 py-1 rounded text-sm font-medium ${
                tool === 'eraser'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white text-purple-600 border border-purple-300'
              }`}
            >
              🧽 Eraser
            </button>
          </div>

          {/* Color Picker */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Color:</span>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
            />
          </div>

          {/* Brush Size */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Size:</span>
            <input
              type="range"
              min="1"
              max="20"
              value={brushSize}
              onChange={(e) => setBrushSize(parseInt(e.target.value))}
              className="w-20"
            />
            <span className="text-sm text-gray-600 w-6">{brushSize}</span>
          </div>

          {/* Canvas Size Presets */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Size:</span>
            <div className="flex gap-1">
              {Object.entries(canvasPresets).map(([key, size]) => (
                <button
                  key={key}
                  onClick={() => handlePresetChange(key)}
                  className={`px-2 py-1 text-xs rounded ${
                    canvasPreset === key
                      ? 'bg-purple-500 text-white'
                      : 'bg-white text-purple-600 border border-purple-300'
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 ml-auto">
            <button
              onClick={toggleFullscreen}
              className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
            >
              🗖 Full
            </button>
            <button
              onClick={clearCanvas}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
            >
              🗑️ Clear
            </button>
            <button
              onClick={exportDrawing}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            >
              💾 Export
            </button>
          </div>
        </div>
      )}

      {/* Drawing Canvas */}
      <div ref={containerRef} className="border-2 border-gray-300 rounded-lg overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          className="block cursor-crosshair touch-none"
          style={{
            width: '100%',
            height: 'auto',
            maxWidth: '100%'
          }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      </div>

      {/* Instructions */}
      <div className="mt-3 text-sm text-gray-600 text-center">
        💡 <strong>Draw anywhere:</strong> Use your mouse, tablet pen, or touchscreen to write and draw while learning!
      </div>
    </div>
  );
}
