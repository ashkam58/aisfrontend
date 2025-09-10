'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const DimensionalMandala = dynamic(() => import('@/components/DimensionalMandala'), { ssr: false });
const GeometryTeachingComponent = dynamic(() => import('@/components/GeometryTeachingComponent'), { ssr: false });

export default function WhiteboardPage() {
  const [showGeometryTeaching, setShowGeometryTeaching] = useState(false);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Hero Section */}
      <div className="text-center bg-gradient-to-r from-purple-100 via-blue-100 to-green-100 rounded-2xl p-4 sm:p-6 border border-purple-200">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-cartoon text-purple-800 mb-2">🎨 Professional Teaching Whiteboard</h1>
        <p className="text-purple-700 text-sm sm:text-base md:text-lg">
          Perfect for online math & science tutoring through Zoom • Real-time collaboration • Geometry tools
        </p>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-4 text-xs sm:text-sm text-purple-600">
          <span>📐 Geometry Templates</span>
          <span>📊 Coordinate Planes</span>
          <span>🔤 Math Annotations</span>
          <span>👥 Live Collaboration</span>
          <span>🧮 Geometry Teaching</span>
        </div>
      </div>

      {/* Quick Access Tools */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border-2 border-purple-200">
        <h3 className="text-lg font-bold text-purple-700 mb-3" style={{fontFamily: 'Fredoka One, cursive'}}>
          🛠️ Quick Teaching Tools
        </h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowGeometryTeaching(true)}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-4 py-2 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{fontFamily: 'Fredoka One, cursive'}}
          >
            📐 Geometry Studio
          </button>
          <button
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-2 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{fontFamily: 'Fredoka One, cursive'}}
          >
            📊 Coordinate Plane
          </button>
          <button
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{fontFamily: 'Fredoka One, cursive'}}
          >
            🔢 Math Symbols
          </button>
        </div>
      </div>

  {/* Enhanced Whiteboard removed - using Geometry Teaching Studio only */}

      {/* Dimensional Mandala Art */}
      <div className="rounded-2xl border border-purple-200 p-4 bg-white">
        <h2 className="text-2xl font-cartoon text-purple-700 mb-2">� Dimensional Mandala Kaleidoscope</h2>
        <p className="text-sm text-purple-600 mb-4">
          Experience fourth-dimensional art through interactive fractal patterns, particle systems, and dynamic mathematics.
          A masterpiece of algorithmic beauty for the discerning art collector.
        </p>
        <DimensionalMandala />
      </div>

      {/* Teaching Tips */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-blue-200 bg-blue-50/80 p-4">
          <h3 className="font-cartoon text-blue-700 mb-2 text-sm sm:text-base">📚 Math Teaching Tips</h3>
          <ul className="text-xs sm:text-sm text-blue-600 space-y-1">
            <li>• Use coordinate plane template for graphing lessons</li>
            <li>• Insert unit circle for trigonometry explanations</li>
            <li>• Draw step-by-step geometric proofs with arrows</li>
            <li>• Toggle presentation mode for clean student view</li>
            <li>• Use Geometry Studio for interactive shape teaching</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-green-200 bg-green-50/80 p-4">
          <h3 className="font-cartoon text-green-700 mb-2 text-sm sm:text-base">🔬 Science Teaching Tips</h3>
          <ul className="text-xs sm:text-sm text-green-600 space-y-1">
            <li>• Use grid for scale diagrams and experiments</li>
            <li>• Draw molecular structures with circles & lines</li>
            <li>• Annotate diagrams with text labels</li>
            <li>• Share screen in Zoom while students collaborate</li>
          </ul>
        </div>
      </div>

      {/* Geometry Teaching Component */}
      <GeometryTeachingComponent
        isActive={showGeometryTeaching}
        onClose={() => setShowGeometryTeaching(false)}
      />
    </div>
  );
}
