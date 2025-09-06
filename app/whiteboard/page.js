'use client';
import dynamic from 'next/dynamic';

const DimensionalMandala = dynamic(() => import('@/components/DimensionalMandala'), { ssr: false });
const EnhancedWhiteboard = dynamic(() => import('@/components/EnhancedWhiteboard'), { ssr: false });

export default function WhiteboardPage() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center bg-gradient-to-r from-purple-100 via-blue-100 to-green-100 rounded-2xl p-6 border border-purple-200">
        <h1 className="text-4xl font-cartoon text-purple-800 mb-2">🎨 Professional Teaching Whiteboard</h1>
        <p className="text-purple-700 text-lg">
          Perfect for online math & science tutoring through Zoom • Real-time collaboration • Geometry tools
        </p>
        <div className="flex justify-center gap-4 mt-4 text-sm text-purple-600">
          <span>📐 Geometry Templates</span>
          <span>📊 Coordinate Planes</span>
          <span>🔤 Math Annotations</span>
          <span>👥 Live Collaboration</span>
        </div>
      </div>

      {/* Enhanced Whiteboard */}
      <EnhancedWhiteboard />

      {/* Dimensional Mandala Art */}
      <div className="rounded-2xl border border-purple-200 p-4 bg-white/80">
        <h2 className="text-2xl font-cartoon text-purple-700 mb-2">� Dimensional Mandala Kaleidoscope</h2>
        <p className="text-sm text-purple-600 mb-4">
          Experience fourth-dimensional art through interactive fractal patterns, particle systems, and dynamic mathematics.
          A masterpiece of algorithmic beauty for the discerning art collector.
        </p>
        <DimensionalMandala />
      </div>

      {/* Teaching Tips */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-blue-200 bg-blue-50/80 p-4">
          <h3 className="font-cartoon text-blue-700 mb-2">📚 Math Teaching Tips</h3>
          <ul className="text-sm text-blue-600 space-y-1">
            <li>• Use coordinate plane template for graphing lessons</li>
            <li>• Insert unit circle for trigonometry explanations</li>
            <li>• Draw step-by-step geometric proofs with arrows</li>
            <li>• Toggle presentation mode for clean student view</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-green-200 bg-green-50/80 p-4">
          <h3 className="font-cartoon text-green-700 mb-2">🔬 Science Teaching Tips</h3>
          <ul className="text-sm text-green-600 space-y-1">
            <li>• Use grid for scale diagrams and experiments</li>
            <li>• Draw molecular structures with circles & lines</li>
            <li>• Annotate diagrams with text labels</li>
            <li>• Share screen in Zoom while students collaborate</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
