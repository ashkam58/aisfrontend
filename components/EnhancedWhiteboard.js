'use client';
import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { Move, RotateCw, ZoomIn, ZoomOut, Square, Circle, Triangle, Ruler, Hand, MousePointer, Trash2, Download, Upload, Undo, Redo, Grid, Eye, EyeOff, Palette, Calculator, Home, Menu, X } from 'lucide-react';

export default function AdvancedGeometryTool() {
  // Core state
  const [tool, setTool] = useState('select');
  const [shapes, setShapes] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Canvas state
  const [viewTransform, setViewTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [gridVisible, setGridVisible] = useState(true);
  const [gridSize, setGridSize] = useState(40);
  const [snapToGrid, setSnapToGrid] = useState(true);
  
  // Style state
  const [currentColor, setCurrentColor] = useState('#FF6B6B');
  const [currentFill, setCurrentFill] = useState('rgba(255, 107, 107, 0.2)');
  const [strokeWidth, setStrokeWidth] = useState(3);
  
  // Calculator state
  const [calcVisible, setCalcVisible] = useState(false);
  const [calcShape, setCalcShape] = useState('circle');
  const [calcParams, setCalcParams] = useState({
    radius: 50, width: 100, height: 80, side: 60, base: 80, height2: 60, a: 60, b: 80, h: 50
  });

  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState([]);

  // Utility functions
  const uid = () => Date.now().toString(36) + Math.floor(Math.random() * 1000).toString(36);
  const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  
  const screenToWorld = useCallback((x, y) => [
    (x - viewTransform.x) / viewTransform.scale,
    (y - viewTransform.y) / viewTransform.scale
  ], [viewTransform]);

  const worldToScreen = useCallback((x, y) => [
    x * viewTransform.scale + viewTransform.x,
    y * viewTransform.scale + viewTransform.y
  ], [viewTransform]);

  const snapPoint = useCallback((point) => {
    if (!snapToGrid) return point;
    const [x, y] = point;
    return [
      Math.round(x / gridSize) * gridSize,
      Math.round(y / gridSize) * gridSize
    ];
  }, [snapToGrid, gridSize]);

  // History management
  const saveToHistory = useCallback((newShapes = shapes) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(newShapes)));
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setShapes(newShapes);
  }, [shapes, history, historyIndex]);

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setShapes(JSON.parse(JSON.stringify(history[historyIndex - 1])));
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setShapes(JSON.parse(JSON.stringify(history[historyIndex + 1])));
    }
  };

  // Shape creation functions
  const createShape = useCallback((type, points, meta = {}) => ({
    id: uid(),
    type,
    points: points.map(p => snapPoint(p)),
    meta: {
      color: currentColor,
      fill: currentFill,
      strokeWidth,
      ...meta
    }
  }), [currentColor, currentFill, strokeWidth, snapPoint]);

  // Canvas rendering
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Clear canvas with cartoon-style background
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0, '#FF9A8B');
    gradient.addColorStop(0.5, '#A8E6CF');
    gradient.addColorStop(1, '#88D8C0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    // Draw grid
    if (gridVisible) {
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 2]);
      
      const gridWorldSize = gridSize;
      const startX = Math.floor((-viewTransform.x) / (gridWorldSize * viewTransform.scale)) * gridWorldSize;
      const startY = Math.floor((-viewTransform.y) / (gridWorldSize * viewTransform.scale)) * gridWorldSize;
      
      for (let x = startX; x * viewTransform.scale + viewTransform.x < w; x += gridWorldSize) {
        const screenX = x * viewTransform.scale + viewTransform.x;
        ctx.beginPath();
        ctx.moveTo(screenX, 0);
        ctx.lineTo(screenX, h);
        ctx.stroke();
      }
      
      for (let y = startY; y * viewTransform.scale + viewTransform.y < h; y += gridWorldSize) {
        const screenY = y * viewTransform.scale + viewTransform.y;
        ctx.beginPath();
        ctx.moveTo(0, screenY);
        ctx.lineTo(w, screenY);
        ctx.stroke();
      }
      
      ctx.restore();
    }

    // Draw shapes
    shapes.forEach(shape => {
      ctx.save();
      
      const isSelected = selectedIds.includes(shape.id);
      ctx.strokeStyle = shape.meta.color || currentColor;
      ctx.fillStyle = shape.meta.fill || currentFill;
      ctx.lineWidth = (shape.meta.strokeWidth || strokeWidth) * (isSelected ? 1.5 : 1);
      
      if (isSelected) {
        ctx.shadowColor = shape.meta.color || currentColor;
        ctx.shadowBlur = 10;
        ctx.setLineDash([5, 5]);
      }

      if (shape.type === 'point') {
        const [x, y] = worldToScreen(...shape.points[0]);
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Add cute emoji
        ctx.font = '16px Arial';
        ctx.fillText('●', x - 4, y + 4);
      }
      
      else if (shape.type === 'line') {
        const [x1, y1] = worldToScreen(...shape.points[0]);
        const [x2, y2] = worldToScreen(...shape.points[1]);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        
        // Add arrowhead
        const angle = Math.atan2(y2 - y1, x2 - x1);
        const arrowLength = 15;
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2 - arrowLength * Math.cos(angle - Math.PI / 6), y2 - arrowLength * Math.sin(angle - Math.PI / 6));
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2 - arrowLength * Math.cos(angle + Math.PI / 6), y2 - arrowLength * Math.sin(angle + Math.PI / 6));
        ctx.stroke();
      }
      
      else if (shape.type === 'circle') {
        const [cx, cy] = worldToScreen(...shape.points[0]);
        const radius = shape.points[1] * viewTransform.scale;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Add radius label
        ctx.fillStyle = '#333';
        ctx.font = 'bold 14px Comic Sans MS, cursive';
        ctx.fillText(`r = ${shape.points[1].toFixed(1)}`, cx + radius + 10, cy - 10);
      }
      
      else if (shape.type === 'rectangle') {
        const points = shape.points.map(p => worldToScreen(...p));
        ctx.beginPath();
        ctx.moveTo(...points[0]);
        points.slice(1).forEach(p => ctx.lineTo(...p));
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
      
      else if (shape.type === 'triangle') {
        const points = shape.points.map(p => worldToScreen(...p));
        ctx.beginPath();
        ctx.moveTo(...points[0]);
        points.slice(1).forEach(p => ctx.lineTo(...p));
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
      
      else if (shape.type === 'polygon') {
        const points = shape.points.map(p => worldToScreen(...p));
        ctx.beginPath();
        ctx.moveTo(...points[0]);
        points.slice(1).forEach(p => ctx.lineTo(...p));
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
      
      else if (shape.type === 'freehand') {
        const points = shape.points.map(p => worldToScreen(...p));
        if (points.length > 1) {
          ctx.beginPath();
          ctx.moveTo(...points[0]);
          for (let i = 1; i < points.length; i++) {
            const xc = (points[i][0] + points[i - 1][0]) / 2;
            const yc = (points[i][1] + points[i - 1][1]) / 2;
            ctx.quadraticCurveTo(points[i - 1][0], points[i - 1][1], xc, yc);
          }
          ctx.stroke();
        }
      }

      // Draw control points for selected shapes
      if (isSelected && shape.type !== 'freehand') {
        shape.points.forEach(point => {
          const [x, y] = worldToScreen(...point);
          ctx.save();
          ctx.fillStyle = '#FFD93D';
          ctx.strokeStyle = '#333';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(x, y, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.restore();
        });
      }
      
      ctx.restore();
    });

    // Draw current path while drawing
    if (isDrawing && currentPath.length > 0) {
      ctx.save();
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = strokeWidth;
      ctx.setLineDash([3, 3]);
      
      if (tool === 'freehand') {
        const points = currentPath.map(p => worldToScreen(...p));
        ctx.beginPath();
        ctx.moveTo(...points[0]);
        points.slice(1).forEach(p => ctx.lineTo(...p));
        ctx.stroke();
      }
      
      ctx.restore();
    }
  }, [shapes, selectedIds, viewTransform, gridVisible, gridSize, currentColor, currentFill, strokeWidth, worldToScreen, isDrawing, currentPath, tool]);

  // Handle pointer events
  const handlePointerDown = useCallback((e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const worldPos = screenToWorld(x, y);
    const snappedPos = snapPoint(worldPos);

    if (tool === 'pan') {
      setIsDragging(true);
      setDragStart([x, y]);
    }
    else if (tool === 'select') {
      // Find clicked shape
      const clickedShape = shapes.find(shape => {
        if (shape.type === 'point') {
          const [sx, sy] = worldToScreen(...shape.points[0]);
          return dist([sx, sy], [x, y]) < 15;
        } else if (shape.type === 'circle') {
          const [cx, cy] = worldToScreen(...shape.points[0]);
          const radius = shape.points[1] * viewTransform.scale;
          const distToCenter = dist([cx, cy], [x, y]);
          return Math.abs(distToCenter - radius) < 10;
        }
        // Add more shape selection logic here
        return false;
      });

      if (clickedShape) {
        if (e.shiftKey) {
          setSelectedIds(prev => 
            prev.includes(clickedShape.id) 
              ? prev.filter(id => id !== clickedShape.id)
              : [...prev, clickedShape.id]
          );
        } else {
          setSelectedIds([clickedShape.id]);
        }
      } else {
        setSelectedIds([]);
      }
    }
    else if (tool === 'point') {
      const newShape = createShape('point', [snappedPos]);
      saveToHistory([...shapes, newShape]);
    }
    else if (tool === 'line') {
      setIsDrawing(true);
      setCurrentPath([snappedPos, snappedPos]);
    }
    else if (tool === 'circle') {
      setIsDrawing(true);
      setCurrentPath([snappedPos]);
    }
    else if (tool === 'freehand') {
      setIsDrawing(true);
      setCurrentPath([snappedPos]);
    }
  }, [tool, shapes, screenToWorld, snapPoint, worldToScreen, viewTransform.scale, createShape, saveToHistory]);

  const handlePointerMove = useCallback((e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const worldPos = screenToWorld(x, y);
    const snappedPos = snapPoint(worldPos);

    if (isDragging && tool === 'pan') {
      const dx = x - dragStart[0];
      const dy = y - dragStart[1];
      setViewTransform(prev => ({
        ...prev,
        x: prev.x + dx,
        y: prev.y + dy
      }));
      setDragStart([x, y]);
    }
    else if (isDrawing) {
      if (tool === 'line') {
        setCurrentPath(prev => [prev[0], snappedPos]);
      }
      else if (tool === 'circle') {
        const radius = dist(currentPath[0], worldPos);
        setCurrentPath([currentPath[0], radius]);
      }
      else if (tool === 'freehand') {
        setCurrentPath(prev => [...prev, snappedPos]);
      }
    }
  }, [isDragging, isDrawing, tool, dragStart, screenToWorld, snapPoint, currentPath]);

  const handlePointerUp = useCallback((e) => {
    if (isDragging) {
      setIsDragging(false);
      setDragStart(null);
    }
    
    if (isDrawing) {
      let newShape = null;
      
      if (tool === 'line' && currentPath.length === 2) {
        newShape = createShape('line', currentPath);
      }
      else if (tool === 'circle' && currentPath.length === 2) {
        newShape = createShape('circle', currentPath);
      }
      else if (tool === 'freehand' && currentPath.length > 1) {
        newShape = createShape('freehand', currentPath);
      }
      
      if (newShape) {
        saveToHistory([...shapes, newShape]);
      }
      
      setIsDrawing(false);
      setCurrentPath([]);
    }
  }, [isDragging, isDrawing, tool, currentPath, createShape, shapes, saveToHistory]);

  // Zoom functions
  const zoom = useCallback((factor, centerX, centerY) => {
    setViewTransform(prev => {
      const newScale = Math.max(0.1, Math.min(5, prev.scale * factor));
      const scaleChange = newScale / prev.scale;
      return {
        scale: newScale,
        x: centerX - (centerX - prev.x) * scaleChange,
        y: centerY - (centerY - prev.y) * scaleChange
      };
    });
  }, []);

  const resetView = () => {
    setViewTransform({ x: 0, y: 0, scale: 1 });
  };

  // Calculator functions
  const calculateArea = () => {
    const p = calcParams;
    let result = {};
    
    switch (calcShape) {
      case 'circle':
        result = {
          area: Math.PI * p.radius * p.radius,
          perimeter: 2 * Math.PI * p.radius
        };
        break;
      case 'rectangle':
        result = {
          area: p.width * p.height,
          perimeter: 2 * (p.width + p.height)
        };
        break;
      case 'triangle':
        result = {
          area: 0.5 * p.base * p.height2
        };
        break;
      default:
        result = { area: 0, perimeter: 0 };
    }
    
    return result;
  };

  const drawCalculatedShape = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const centerScreen = [rect.width / 2, rect.height / 2];
    const centerWorld = screenToWorld(...centerScreen);
    
    let newShape = null;
    const p = calcParams;
    
    if (calcShape === 'circle') {
      newShape = createShape('circle', [centerWorld, p.radius]);
    } else if (calcShape === 'rectangle') {
      const hw = p.width / 2;
      const hh = p.height / 2;
      const points = [
        [centerWorld[0] - hw, centerWorld[1] - hh],
        [centerWorld[0] + hw, centerWorld[1] - hh],
        [centerWorld[0] + hw, centerWorld[1] + hh],
        [centerWorld[0] - hw, centerWorld[1] + hh]
      ];
      newShape = createShape('rectangle', points);
    } else if (calcShape === 'triangle') {
      const points = [
        [centerWorld[0], centerWorld[1] - p.height2 / 2],
        [centerWorld[0] - p.base / 2, centerWorld[1] + p.height2 / 2],
        [centerWorld[0] + p.base / 2, centerWorld[1] + p.height2 / 2]
      ];
      newShape = createShape('triangle', points);
    }
    
    if (newShape) {
      saveToHistory([...shapes, newShape]);
    }
  };

  // Event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleWheel = (e) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const centerX = e.clientX - rect.left;
      const centerY = e.clientY - rect.top;
      zoom(e.deltaY > 0 ? 0.9 : 1.1, centerX, centerY);
    };

    canvas.addEventListener('wheel', handleWheel, { passive: false });
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerup', handlePointerUp);

    return () => {
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerup', handlePointerUp);
    };
  }, [handlePointerDown, handlePointerMove, handlePointerUp, zoom]);

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  // Color palette
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 flex flex-col">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg border-b-4 border-yellow-400">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl bg-yellow-400 text-white hover:bg-yellow-500 transition-colors"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              🎨 Geometry Playground
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={undo}
              disabled={historyIndex <= 0}
              className="p-2 rounded-xl bg-blue-500 text-white disabled:opacity-50 hover:bg-blue-600 transition-colors"
            >
              <Undo size={18} />
            </button>
            <button
              onClick={redo}
              disabled={historyIndex >= history.length - 1}
              className="p-2 rounded-xl bg-blue-500 text-white disabled:opacity-50 hover:bg-blue-600 transition-colors"
            >
              <Redo size={18} />
            </button>
            <button
              onClick={resetView}
              className="p-2 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-colors"
            >
              <Home size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-40 w-80 bg-white/95 backdrop-blur-sm shadow-2xl transition-transform duration-300 h-full overflow-y-auto`}>
          <div className="p-4 space-y-6">
            {/* Tools */}
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-4">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                🛠️ Tools
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: 'select', icon: MousePointer, label: 'Select', color: 'bg-blue-500' },
                  { key: 'pan', icon: Hand, label: 'Pan', color: 'bg-green-500' },
                  { key: 'point', icon: Circle, label: 'Point', color: 'bg-red-500' },
                  { key: 'line', icon: Ruler, label: 'Line', color: 'bg-purple-500' },
                  { key: 'circle', icon: Circle, label: 'Circle', color: 'bg-pink-500' },
                  { key: 'freehand', icon: Move, label: 'Draw', color: 'bg-yellow-500' }
                ].map(({ key, icon: Icon, label, color }) => (
                  <button
                    key={key}
                    onClick={() => setTool(key)}
                    className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all transform hover:scale-105 ${
                      tool === key 
                        ? `${color} text-white shadow-lg` 
                        : 'bg-white hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="text-xs font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette */}
            <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-4">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                🎨 Colors
              </h3>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {colors.map(color => (
                  <button
                    key={color}
                    onClick={() => {
                      setCurrentColor(color);
                      setCurrentFill(color + '40');
                    }}
                    className={`w-12 h-12 rounded-xl transition-all transform hover:scale-110 ${
                      currentColor === color ? 'ring-4 ring-white ring-offset-2' : ''
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Stroke Width</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={strokeWidth}
                  onChange={(e) => setStrokeWidth(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            {/* View Controls */}
            <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl p-4">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                👁️ View
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Grid</span>
                  <button
                    onClick={() => setGridVisible(!gridVisible)}
                    className={`p-2 rounded-lg ${gridVisible ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                  >
                    {gridVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Snap to Grid</span>
                  <button
                    onClick={() => setSnapToGrid(!snapToGrid)}
                    className={`w-12 h-6 rounded-full ${snapToGrid ? 'bg-green-500' : 'bg-gray-300'} relative transition-colors`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${snapToGrid ? 'translate-x-6' : 'translate-x-0.5'}`} />
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => zoom(1.2, 400, 300)}
                    className="flex-1 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <ZoomIn size={16} className="mx-auto" />
                  </button>
                  <button
                    onClick={() => zoom(0.8, 400, 300)}
                    className="flex-1 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <ZoomOut size={16} className="mx-auto" />
                  </button>
                </div>
              </div>
            </div>

            {/* Calculator */}
            <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-2xl p-4">
              <button
                onClick={() => setCalcVisible(!calcVisible)}
                className="w-full flex items-center justify-between font-bold text-lg mb-3"
              >
                <span className="flex items-center gap-2">🧮 Calculator</span>
                <Calculator size={20} />
              </button>
              
              {calcVisible && (
                <div className="space-y-3">
                  <select
                    value={calcShape}
                    onChange={(e) => setCalcShape(e.target.value)}
                    className="w-full p-2 rounded-lg border-2 border-gray-200"
                  >
                    <option value="circle">Circle</option>
                    <option value="rectangle">Rectangle</option>
                    <option value="triangle">Triangle</option>
                  </select>
                  
                  <div className="space-y-2">
                    {calcShape === 'circle' && (
                      <div>
                        <label className="block text-sm font-medium">Radius</label>
                        <input
                          type="number"
                          value={calcParams.radius}
                          onChange={(e) => setCalcParams(prev => ({ ...prev, radius: Number(e.target.value) }))}
                          className="w-full p-2 rounded-lg border-2 border-gray-200"
                        />
                      </div>
                    )}
                    
                    {calcShape === 'rectangle' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium">Width</label>
                          <input
                            type="number"
                            value={calcParams.width}
                            onChange={(e) => setCalcParams(prev => ({ ...prev, width: Number(e.target.value) }))}
                            className="w-full p-2 rounded-lg border-2 border-gray-200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Height</label>
                          <input
                            type="number"
                            value={calcParams.height}
                            onChange={(e) => setCalcParams(prev => ({ ...prev, height: Number(e.target.value) }))}
                            className="w-full p-2 rounded-lg border-2 border-gray-200"
                          />
                        </div>
                      </>
                    )}
                    
                    {calcShape === 'triangle' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium">Base</label>
                          <input
                            type="number"
                            value={calcParams.base}
                            onChange={(e) => setCalcParams(prev => ({ ...prev, base: Number(e.target.value) }))}
                            className="w-full p-2 rounded-lg border-2 border-gray-200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Height</label>
                          <input
                            type="number"
                            value={calcParams.height2}
                            onChange={(e) => setCalcParams(prev => ({ ...prev, height2: Number(e.target.value) }))}
                            className="w-full p-2 rounded-lg border-2 border-gray-200"
                          />
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const result = calculateArea();
                        alert(`Area: ${result.area?.toFixed(2) || 'N/A'}\nPerimeter: ${result.perimeter?.toFixed(2) || 'N/A'}`);
                      }}
                      className="flex-1 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Calculate
                    </button>
                    <button
                      onClick={drawCalculatedShape}
                      className="flex-1 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Draw
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Shape List */}
            <div className="bg-gradient-to-r from-indigo-100 to-blue-100 rounded-2xl p-4">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                📋 Shapes ({shapes.length})
              </h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {shapes.map((shape, index) => (
                  <div
                    key={shape.id}
                    className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                      selectedIds.includes(shape.id) ? 'bg-blue-200' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: shape.meta.color }}
                      />
                      <span className="text-sm font-medium">
                        {shape.type} #{index + 1}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        const newShapes = shapes.filter(s => s.id !== shape.id);
                        saveToHistory(newShapes);
                        setSelectedIds(prev => prev.filter(id => id !== shape.id));
                      }}
                      className="p-1 text-red-500 hover:bg-red-100 rounded"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                {shapes.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    No shapes yet. Start drawing! 🎨
                  </div>
                )}
              </div>
              {shapes.length > 0 && (
                <button
                  onClick={() => {
                    saveToHistory([]);
                    setSelectedIds([]);
                  }}
                  className="w-full mt-3 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </aside>

        {/* Main Canvas Area */}
        <main className="flex-1 relative overflow-hidden">
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-crosshair"
            style={{ touchAction: 'none' }}
          />
          
          {/* Tool Indicator */}
          <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span className="text-sm font-medium">
                Tool: {tool} | Zoom: {(viewTransform.scale * 100).toFixed(0)}%
              </span>
            </div>
          </div>

          {/* Instructions */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg max-w-sm">
            <h4 className="font-bold text-sm mb-2">🎯 Quick Tips</h4>
            <ul className="text-xs space-y-1 text-gray-600">
              <li>• Use mouse wheel to zoom in/out</li>
              <li>• Select Pan tool to move around</li>
              <li>• Hold Shift while selecting for multi-select</li>
              <li>• Grid snap helps align shapes perfectly</li>
              <li>• Try the calculator to create precise shapes!</li>
            </ul>
          </div>
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}