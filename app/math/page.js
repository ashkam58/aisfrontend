'use client'
import { useState } from 'react';
import Link from 'next/link';

const mathFormulas = {
  algebra: [
    {
      name: 'Linear Equations',
      formula: 'ax + b = 0',
      solution: 'x = -b/a',
      example: '2x + 6 = 0 → x = -3',
      emoji: '📐'
    },
    {
      name: 'Quadratic Formula',
      formula: 'ax² + bx + c = 0',
      solution: 'x = (-b ± √(b² - 4ac)) / 2a',
      example: 'x² - 5x + 6 = 0 → x = 2 or x = 3',
      emoji: '🔢'
    },
    {
      name: 'Distance Formula',
      formula: 'd = √[(x₂-x₁)² + (y₂-y₁)²]',
      solution: 'Find distance between two points',
      example: '(0,0) to (3,4) → d = 5',
      emoji: '📏'
    }
  ],
  geometry: [
    {
      name: 'Area of Circle',
      formula: 'A = πr²',
      solution: 'π ≈ 3.14159',
      example: 'r = 3 → A = 9π ≈ 28.27',
      emoji: '⭕'
    },
    {
      name: 'Pythagorean Theorem',
      formula: 'a² + b² = c²',
      solution: 'c = √(a² + b²)',
      example: 'a=3, b=4 → c = 5',
      emoji: '📐'
    },
    {
      name: 'Triangle Area',
      formula: 'A = ½ × base × height',
      solution: 'Height perpendicular to base',
      example: 'base=6, height=4 → A = 12',
      emoji: '🔺'
    }
  ],
  trigonometry: [
    {
      name: 'Sine Function',
      formula: 'sin(θ) = opposite/hypotenuse',
      solution: 'SOHCAHTOA',
      example: 'sin(30°) = 1/2',
      emoji: '📊'
    },
    {
      name: 'Cosine Function',
      formula: 'cos(θ) = adjacent/hypotenuse',
      solution: 'SOHCAHTOA',
      example: 'cos(60°) = 1/2',
      emoji: '📈'
    },
    {
      name: 'Tangent Function',
      formula: 'tan(θ) = opposite/adjacent',
      solution: 'SOHCAHTOA',
      example: 'tan(45°) = 1',
      emoji: '📉'
    }
  ],
  statistics: [
    {
      name: 'Mean (Average)',
      formula: 'μ = Σx/n',
      solution: 'Sum all values, divide by count',
      example: '(2+4+6)/3 = 4',
      emoji: '📊'
    },
    {
      name: 'Standard Deviation',
      formula: 'σ = √[Σ(x-μ)²/n]',
      solution: 'Measure of spread',
      example: 'Shows data variation',
      emoji: '📈'
    }
  ]
};

export default function MathPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFormula, setSelectedFormula] = useState(null);

  const categories = [
    { key: 'algebra', name: 'Algebra', emoji: '🔢', color: 'from-blue-200 to-indigo-300' },
    { key: 'geometry', name: 'Geometry', emoji: '📐', color: 'from-green-200 to-emerald-300' },
    { key: 'trigonometry', name: 'Trigonometry', emoji: '📊', color: 'from-purple-200 to-violet-300' },
    { key: 'statistics', name: 'Statistics', emoji: '📈', color: 'from-orange-200 to-red-300' }
  ];

  return (
    <div className="relative z-10 max-w-5xl mx-auto mt-2 sm:mt-4 md:mt-6 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border-4 border-blue-200">
      <div className="text-center mb-6 sm:mb-8">
        <div className="text-6xl sm:text-7xl md:text-8xl mb-4 animate-bounce">🧮</div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-800 mb-2" style={{fontFamily: 'Fredoka One, cursive'}}>
          Math Formulas Hub
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-blue-600 font-medium">
          Master essential math formulas and solve problems like a pro! ✨
        </p>
      </div>

      {!selectedCategory ? (
        /* Category Selection */
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-6 sm:mb-8 text-center" style={{fontFamily: 'Fredoka One, cursive'}}>
            📚 Choose Your Math Topic 📚
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {categories.map(category => (
              <button
                key={category.key}
                className={`group bg-gradient-to-br ${category.color} hover:shadow-2xl text-blue-700 font-bold text-lg sm:text-xl p-6 sm:p-8 rounded-3xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1 shadow-lg border-4 border-white hover:border-blue-300`}
                onClick={() => setSelectedCategory(category.key)}
                style={{fontFamily: 'Fredoka One, cursive'}}
              >
                <div className="text-4xl sm:text-5xl mb-2 group-hover:animate-bounce transition-all duration-300">
                  {category.emoji}
                </div>
                <div className="text-xl sm:text-2xl group-hover:text-blue-800 transition-colors">
                  {category.name}
                </div>
                <div className="text-xs sm:text-sm text-blue-500 mt-1 opacity-75 group-hover:opacity-100">
                  Click to explore!
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : !selectedFormula ? (
        /* Formula Selection */
        <div>
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 text-center" style={{fontFamily: 'Fredoka One, cursive'}}>
              🌟 {categories.find(c => c.key === selectedCategory)?.name} Formulas 🌟
            </h2>
            <button
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-3 rounded-3xl font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-lg"
              style={{fontFamily: 'Fredoka One, cursive'}}
              onClick={() => setSelectedCategory(null)}
            >
              ← Back to Topics
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {mathFormulas[selectedCategory].map((formula, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-white via-blue-50 to-indigo-50 p-6 sm:p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border-4 border-blue-100 hover:border-blue-300 transform hover:scale-105"
                onClick={() => setSelectedFormula(formula)}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl sm:text-5xl group-hover:animate-bounce transition-all duration-300 flex-shrink-0">
                    {formula.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-800 transition-colors" style={{fontFamily: 'Fredoka One, cursive'}}>
                      {formula.name}
                    </h3>
                    <div className="bg-gray-100 p-3 rounded-xl mb-2 font-mono text-lg text-center">
                      {formula.formula}
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                      <strong>Solution:</strong> {formula.solution}
                    </p>
                    <p className="text-gray-600 text-sm">
                      <strong>Example:</strong> {formula.example}
                    </p>
                    <div className="mt-3 inline-flex items-center text-xs sm:text-sm font-medium text-blue-600 bg-white/70 px-3 py-1 rounded-full group-hover:bg-white group-hover:text-blue-700 transition-all">
                      🧮 View Details
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Formula Details */
        <div>
          <div className="text-center mb-6">
            <div className="text-5xl mb-4 animate-bounce">{selectedFormula.emoji}</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-4" style={{fontFamily: 'Fredoka One, cursive'}}>
              {selectedFormula.name}
            </h2>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 sm:p-8 border-4 border-blue-200 mb-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-blue-700 mb-4">Formula</h3>
              <div className="bg-white p-4 rounded-xl shadow-lg font-mono text-2xl text-center border-2 border-blue-300">
                {selectedFormula.formula}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-green-300">
                <h4 className="font-bold text-green-700 mb-2">Solution Method</h4>
                <p className="text-gray-700">{selectedFormula.solution}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-orange-300">
                <h4 className="font-bold text-orange-700 mb-2">Example</h4>
                <p className="text-gray-700 font-mono">{selectedFormula.example}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-3 rounded-3xl font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-lg"
              style={{fontFamily: 'Fredoka One, cursive'}}
              onClick={() => setSelectedFormula(null)}
            >
              ← Back to Formulas
            </button>
            <button
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-3xl font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-lg"
              style={{fontFamily: 'Fredoka One, cursive'}}
              onClick={() => {
                setSelectedFormula(null);
                setSelectedCategory(null);
              }}
            >
              📚 Back to Topics
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
