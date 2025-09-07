'use client';
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { Stage, Layer, Line, Circle, Rect, Text, Arrow } from 'react-konva';

const SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000';
const ROOM_ID = 'classroom-1';

// Math templates for quick insertion
const TEMPLATES = {
  'coordinate-plane': {
    name: '📊 Coordinate Plane',
    elements: [
      { type: 'line', points: [50, 250, 750, 250], stroke: '#000', strokeWidth: 2 }, // x-axis
      { type: 'line', points: [400, 50, 400, 450], stroke: '#000', strokeWidth: 2 }, // y-axis
      { type: 'text', x: 410, y: 60, text: 'y', fontSize: 16 },
      { type: 'text', x: 730, y: 260, text: 'x', fontSize: 16 },
      { type: 'text', x: 410, y: 260, text: '0', fontSize: 14 },
    ]
  },
  'unit-circle': {
    name: '⭕ Unit Circle',
    elements: [
      { type: 'circle', x: 400, y: 250, radius: 150, stroke: '#000', strokeWidth: 2 },
      { type: 'line', points: [250, 250, 550, 250], stroke: '#666', strokeWidth: 1 },
      { type: 'line', points: [400, 100, 400, 400], stroke: '#666', strokeWidth: 1 },
      { type: 'text', x: 405, y: 95, text: '90°', fontSize: 12 },
      { type: 'text', x: 555, y: 245, text: '0°', fontSize: 12 },
      { type: 'text', x: 375, y: 405, text: '270°', fontSize: 12 },
      { type: 'text', x: 235, y: 245, text: '180°', fontSize: 12 },
    ]
  },
  'triangle': {
    name: '🔺 Triangle Template',
    elements: [
      { type: 'line', points: [300, 350, 500, 350, 400, 200, 300, 350], stroke: '#000', strokeWidth: 2 },
      { type: 'text', x: 285, y: 360, text: 'A', fontSize: 16 },
      { type: 'text', x: 505, y: 360, text: 'B', fontSize: 16 },
      { type: 'text', x: 395, y: 180, text: 'C', fontSize: 16 },
    ]
  },
  'fraction-bar': {
    name: '➗ Fraction Bars',
    elements: [
      { type: 'rect', x: 200, y: 200, width: 400, height: 40, stroke: '#000', strokeWidth: 2 },
      { type: 'line', points: [400, 200, 400, 240], stroke: '#000', strokeWidth: 1 },
      { type: 'text', x: 290, y: 250, text: '1/2', fontSize: 16 },
      { type: 'text', x: 490, y: 250, text: '1/2', fontSize: 16 },
    ]
  },
  'grid': {
    name: '📋 Grid Paper',
    elements: []
  }
};

// Generate grid lines
TEMPLATES.grid.elements = [];
for (let i = 0; i <= 800; i += 25) {
  TEMPLATES.grid.elements.push(
    { type: 'line', points: [i, 0, i, 500], stroke: '#e5e7eb', strokeWidth: 1 },
    { type: 'line', points: [0, i, 800, i], stroke: '#e5e7eb', strokeWidth: 1 }
  );
}

export default function EnhancedWhiteboard() {
  const [socket, setSocket] = useState(null);
  const [elements, setElements] = useState([]); // All drawn elements
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pen');
  const [color, setColor] = useState('#111827');
  const [size, setSize] = useState(4);
  const [showGrid, setShowGrid] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [presentationMode, setPresentationMode] = useState(false);
  
  const stageRef = useRef(null);
  const [startPos, setStartPos] = useState(null);

  useEffect(() => {
    const s = io(SERVER_URL, { transports: ['websocket'] });
    setSocket(s);
    s.on('connect', () => s.emit('join-room', ROOM_ID));
    s.on('draw-element', ({ element }) => {
      setElements(prev => [...prev, element]);
    });
    s.on('clear-board', () => setElements([]));
    return () => s.disconnect();
  }, []);

  const handleMouseDown = (e) => {
    if (presentationMode) return;
    
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    setStartPos(pos);

    if (tool === 'pen' || tool === 'eraser') {
      const newElement = { 
        type: 'line', 
        tool,
        points: [pos.x, pos.y], 
        color: tool === 'eraser' ? '#fff' : color, 
        size,
        id: Date.now()
      };
      setElements(prev => [...prev, newElement]);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || presentationMode) return;
    
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    if (tool === 'pen' || tool === 'eraser') {
      setElements(prev => {
        const newElements = [...prev];
        const lastElement = newElements[newElements.length - 1];
        if (lastElement && lastElement.type === 'line') {
          lastElement.points = lastElement.points.concat([point.x, point.y]);
        }
        return newElements;
      });
    }
  };

  const handleMouseUp = (e) => {
    if (!isDrawing || presentationMode) return;
    
    setIsDrawing(false);
    const pos = e.target.getStage().getPointerPosition();

    // For geometric shapes
    if (tool === 'circle' && startPos) {
      const radius = Math.sqrt(Math.pow(pos.x - startPos.x, 2) + Math.pow(pos.y - startPos.y, 2));
      const newElement = {
        type: 'circle',
        x: startPos.x,
        y: startPos.y,
        radius,
        stroke: color,
        strokeWidth: size,
        id: Date.now()
      };
      setElements(prev => [...prev, newElement]);
      socket?.emit('draw-element', { roomId: ROOM_ID, element: newElement });
    } else if (tool === 'rect' && startPos) {
      const newElement = {
        type: 'rect',
        x: Math.min(startPos.x, pos.x),
        y: Math.min(startPos.y, pos.y),
        width: Math.abs(pos.x - startPos.x),
        height: Math.abs(pos.y - startPos.y),
        stroke: color,
        strokeWidth: size,
        id: Date.now()
      };
      setElements(prev => [...prev, newElement]);
      socket?.emit('draw-element', { roomId: ROOM_ID, element: newElement });
    } else if (tool === 'line' && startPos) {
      const newElement = {
        type: 'line',
        points: [startPos.x, startPos.y, pos.x, pos.y],
        stroke: color,
        strokeWidth: size,
        id: Date.now()
      };
      setElements(prev => [...prev, newElement]);
      socket?.emit('draw-element', { roomId: ROOM_ID, element: newElement });
    } else if (tool === 'arrow' && startPos) {
      const newElement = {
        type: 'arrow',
        points: [startPos.x, startPos.y, pos.x, pos.y],
        stroke: color,
        strokeWidth: size,
        id: Date.now()
      };
      setElements(prev => [...prev, newElement]);
      socket?.emit('draw-element', { roomId: ROOM_ID, element: newElement });
    } else if ((tool === 'pen' || tool === 'eraser') && elements.length > 0) {
      const lastElement = elements[elements.length - 1];
      socket?.emit('draw-element', { roomId: ROOM_ID, element: lastElement });
    }

    setStartPos(null);
  };

  const clearBoard = () => {
    setElements([]);
    socket?.emit('clear-board', { roomId: ROOM_ID });
  };

  const addTemplate = (templateKey) => {
    const template = TEMPLATES[templateKey];
    if (!template) return;

    const newElements = template.elements.map(el => ({
      ...el,
      id: Date.now() + Math.random()
    }));

    setElements(prev => [...prev, ...newElements]);
    newElements.forEach(element => {
      socket?.emit('draw-element', { roomId: ROOM_ID, element });
    });
  };

  const addText = () => {
    const text = prompt('Enter text:');
    if (!text) return;

    const newElement = {
      type: 'text',
      x: 100,
      y: 100,
      text,
      fontSize: 18,
      fill: color,
      draggable: true,
      id: Date.now()
    };

    setElements(prev => [...prev, newElement]);
    socket?.emit('draw-element', { roomId: ROOM_ID, element: newElement });
  };

  const renderElement = (element, index) => {
    const key = element.id || index;
    
    switch (element.type) {
      case 'line':
        return (
          <Line
            key={key}
            points={element.points}
            stroke={element.color || element.stroke}
            strokeWidth={element.size || element.strokeWidth}
            tension={0.4}
            lineCap="round"
            lineJoin="round"
            globalCompositeOperation={element.tool === 'eraser' ? 'destination-out' : 'source-over'}
          />
        );
      case 'circle':
        return (
          <Circle
            key={key}
            x={element.x}
            y={element.y}
            radius={element.radius}
            stroke={element.stroke}
            strokeWidth={element.strokeWidth}
            fill={element.fill}
          />
        );
      case 'rect':
        return (
          <Rect
            key={key}
            x={element.x}
            y={element.y}
            width={element.width}
            height={element.height}
            stroke={element.stroke}
            strokeWidth={element.strokeWidth}
            fill={element.fill}
          />
        );
      case 'text':
        return (
          <Text
            key={key}
            x={element.x}
            y={element.y}
            text={element.text}
            fontSize={element.fontSize}
            fill={element.fill}
            draggable={element.draggable && !presentationMode}
          />
        );
      case 'arrow':
        return (
          <Arrow
            key={key}
            points={element.points}
            stroke={element.stroke}
            strokeWidth={element.strokeWidth}
            fill={element.stroke}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="rounded-2xl border border-purple-200 shadow bg-white/90">
      {/* Enhanced Toolbar */}
      <div className="p-3 sm:p-4 border-b border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
          <h3 className="font-cartoon text-base sm:text-lg text-purple-700">🎨 Teaching Whiteboard</h3>
          <button
            onClick={() => setPresentationMode(!presentationMode)}
            className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium ${
              presentationMode 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {presentationMode ? '👁️ Presentation ON' : '✏️ Edit Mode'}
          </button>
        </div>

        {!presentationMode && (
          <>
            {/* Drawing Tools */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs sm:text-sm font-medium text-purple-700">Tools:</span>
              {[
                { id: 'pen', label: '✏️ Pen', desc: 'Free drawing' },
                { id: 'eraser', label: '🧽 Eraser', desc: 'Erase content' },
                { id: 'line', label: '📏 Line', desc: 'Straight line' },
                { id: 'arrow', label: '➡️ Arrow', desc: 'Pointing arrow' },
                { id: 'rect', label: '⬜ Rectangle', desc: 'Rectangle shape' },
                { id: 'circle', label: '⭕ Circle', desc: 'Circle shape' },
              ].map(({ id, label, desc }) => (
                <button
                  key={id}
                  title={desc}
                  onClick={() => setTool(id)}
                  className={`px-1.5 sm:px-2 py-1 rounded text-xs sm:text-sm ${
                    tool === id 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-white border border-purple-200 hover:bg-purple-50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Color and Size */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3">
              <div className="flex items-center gap-2">
                <label className="text-xs sm:text-sm font-medium text-purple-700">Color:</label>
                <input 
                  type="color" 
                  value={color} 
                  onChange={(e) => setColor(e.target.value)}
                  className="w-8 h-8 rounded border border-purple-200" 
                />
                <div className="flex gap-1">
                  {['#000000', '#dc2626', '#2563eb', '#16a34a', '#ca8a04'].map(c => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className="w-6 h-6 rounded border border-gray-300"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <label className="text-xs sm:text-sm font-medium text-purple-700">Size:</label>
                <input 
                  type="range" 
                  min="1" 
                  max="20" 
                  value={size} 
                  onChange={(e) => setSize(parseInt(e.target.value))}
                  className="w-16 sm:w-20"
                />
                <span className="text-xs sm:text-sm text-purple-600">{size}px</span>
              </div>
            </div>

            {/* Templates */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs sm:text-sm font-medium text-purple-700">Templates:</span>
              {Object.entries(TEMPLATES).map(([key, template]) => (
                <button
                  key={key}
                  onClick={() => addTemplate(key)}
                  className="px-1.5 sm:px-2 py-1 rounded text-xs sm:text-sm bg-blue-100 hover:bg-blue-200 border border-blue-300"
                  title={`Insert ${template.name}`}
                >
                  {template.name}
                </button>
              ))}
            </div>

            {/* Utility Tools */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={addText}
                className="px-2 sm:px-3 py-1.5 rounded bg-green-100 hover:bg-green-200 border border-green-300 text-xs sm:text-sm"
              >
                📝 Add Text
              </button>
              <button
                onClick={() => setShowGrid(!showGrid)}
                className={`px-2 sm:px-3 py-1.5 rounded text-xs sm:text-sm ${
                  showGrid 
                    ? 'bg-yellow-200 border-yellow-400' 
                    : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
                } border`}
              >
                {showGrid ? '📋 Hide Grid' : '📋 Show Grid'}
              </button>
              <button
                onClick={clearBoard}
                className="px-2 sm:px-3 py-1.5 rounded bg-rose-100 hover:bg-rose-200 border border-rose-300 text-xs sm:text-sm"
              >
                🗑️ Clear All
              </button>
            </div>
          </>
        )}
      </div>

      {/* Canvas */}
      <div className="p-2 sm:p-4 overflow-x-auto">
        <Stage
          width={Math.min(800, typeof window !== 'undefined' ? window.innerWidth - 32 : 800)}
          height={Math.min(500, typeof window !== 'undefined' ? window.innerHeight * 0.6 : 500)}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          ref={stageRef}
          className="border border-gray-200 rounded bg-white cursor-crosshair"
        >
          <Layer>
            {/* Grid Background */}
            {showGrid && TEMPLATES.grid.elements.map((line, i) => (
              <Line
                key={`grid-${i}`}
                points={line.points}
                stroke={line.stroke}
                strokeWidth={line.strokeWidth}
              />
            ))}
            
            {/* All drawn elements */}
            {elements.map(renderElement)}
          </Layer>
        </Stage>

        <div className="mt-3 text-xs text-purple-600 space-y-1">
          <p>
            <strong>💡 Teaching Tips:</strong> Use templates for quick setup, presentation mode for clean student view
          </p>
          <p>
            <strong>🔗 Collaboration:</strong> Students can join the same room to see your drawings in real-time
          </p>
          <p>
            <strong>📐 Geometry Tools:</strong> Perfect circles, straight lines, and arrows for precise illustrations
          </p>
        </div>
      </div>
    </div>
  );
}
