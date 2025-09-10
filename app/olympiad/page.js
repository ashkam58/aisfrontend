'use client'
import { useState } from 'react';
import Link from 'next/link';

const olympiadTopics = {
  algebra: [
    {
      problem: "If x + y = 10 and xy = 21, find x² + y²",
      solution: "x² + y² = (x + y)² - 2xy = 10² - 2(21) = 100 - 42 = 58",
      difficulty: "Medium",
      category: "Algebra",
      emoji: "🔢"
    },
    {
      problem: "Solve for x: 2^x + 2^(x+1) = 12",
      solution: "2^x + 2·2^x = 12 → 3·2^x = 12 → 2^x = 4 → x = 2",
      difficulty: "Hard",
      category: "Algebra",
      emoji: "⚡"
    }
  ],
  geometry: [
    {
      problem: "In triangle ABC, if AB = 5, BC = 12, and AC = 13, what type of triangle is it?",
      solution: "Check: 5² + 12² = 25 + 144 = 169 = 13². Since a² + b² = c², it's a right triangle.",
      difficulty: "Easy",
      category: "Geometry",
      emoji: "📐"
    },
    {
      problem: "A circle has center O and radius 5. Point P is 13 units from O. Find the length of the tangent from P to the circle.",
      solution: "Using Pythagorean theorem: tangent² + radius² = distance². tangent² + 5² = 13² → tangent² = 169 - 25 = 144 → tangent = 12",
      difficulty: "Medium",
      category: "Geometry",
      emoji: "⭕"
    }
  ],
  number_theory: [
    {
      problem: "Find the remainder when 2^100 is divided by 7",
      solution: "Pattern: 2¹≡2, 2²≡4, 2³≡1 (mod 7). Period is 3. 100 = 3×33 + 1, so 2^100 ≡ 2¹ ≡ 2 (mod 7)",
      difficulty: "Hard",
      category: "Number Theory",
      emoji: "🔢"
    },
    {
      problem: "How many positive divisors does 2⁴ × 3² × 5¹ have?",
      solution: "Number of divisors = (4+1)(2+1)(1+1) = 5 × 3 × 2 = 30",
      difficulty: "Medium",
      category: "Number Theory",
      emoji: "💎"
    }
  ],
  combinatorics: [
    {
      problem: "In how many ways can 5 people sit around a circular table?",
      solution: "Circular arrangements = (n-1)! = (5-1)! = 4! = 24 ways",
      difficulty: "Easy",
      category: "Combinatorics",
      emoji: "🎯"
    },
    {
      problem: "How many 4-digit numbers can be formed using digits 1,2,3,4,5 without repetition?",
      solution: "First digit: 5 choices, second: 4 choices, third: 3 choices, fourth: 2 choices. Total = 5×4×3×2 = 120",
      difficulty: "Medium",
      category: "Combinatorics",
      emoji: "🎲"
    }
  ]
};

export default function OlympiadPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [showSolution, setShowSolution] = useState(false);

  const categories = [
    { key: 'algebra', name: 'Algebra', emoji: '🔢', color: 'from-blue-200 to-indigo-300' },
    { key: 'geometry', name: 'Geometry', emoji: '📐', color: 'from-green-200 to-emerald-300' },
    { key: 'number_theory', name: 'Number Theory', emoji: '💎', color: 'from-purple-200 to-violet-300' },
    { key: 'combinatorics', name: 'Combinatorics', emoji: '🎯', color: 'from-orange-200 to-red-300' }
  ];

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700 border-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'Hard': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="relative z-10 max-w-5xl mx-auto mt-2 sm:mt-4 md:mt-6 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border-4 border-gold-200" style={{borderColor: '#FFD700'}}>
      <div className="text-center mb-6 sm:mb-8">
        <div className="text-6xl sm:text-7xl md:text-8xl mb-4 animate-bounce">🏆</div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-600 mb-2" style={{fontFamily: 'Fredoka One, cursive'}}>
          Math Olympiad Arena
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-yellow-500 font-medium">
          Challenge yourself with competition-level math problems! 🥇
        </p>
      </div>

      {!selectedCategory ? (
        /* Category Selection */
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-yellow-600 mb-6 sm:mb-8 text-center" style={{fontFamily: 'Fredoka One, cursive'}}>
            🎯 Choose Your Challenge 🎯
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {categories.map(category => (
              <button
                key={category.key}
                className={`group bg-gradient-to-br ${category.color} hover:shadow-2xl text-yellow-700 font-bold text-lg sm:text-xl p-6 sm:p-8 rounded-3xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1 shadow-lg border-4 border-white hover:border-yellow-300`}
                onClick={() => setSelectedCategory(category.key)}
                style={{fontFamily: 'Fredoka One, cursive'}}
              >
                <div className="text-4xl sm:text-5xl mb-2 group-hover:animate-bounce transition-all duration-300">
                  {category.emoji}
                </div>
                <div className="text-xl sm:text-2xl group-hover:text-yellow-800 transition-colors">
                  {category.name}
                </div>
                <div className="text-xs sm:text-sm text-yellow-500 mt-1 opacity-75 group-hover:opacity-100">
                  {olympiadTopics[category.key].length} problems available
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : !selectedProblem ? (
        /* Problem Selection */
        <div>
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-yellow-600 text-center" style={{fontFamily: 'Fredoka One, cursive'}}>
              🌟 {categories.find(c => c.key === selectedCategory)?.name} Problems 🌟
            </h2>
            <button
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3 rounded-3xl font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-lg"
              style={{fontFamily: 'Fredoka One, cursive'}}
              onClick={() => setSelectedCategory(null)}
            >
              ← Back to Categories
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {olympiadTopics[selectedCategory].map((problem, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-white via-yellow-50 to-orange-50 p-6 sm:p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border-4 border-yellow-100 hover:border-yellow-300 transform hover:scale-102"
                onClick={() => {
                  setSelectedProblem(problem);
                  setShowSolution(false);
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl sm:text-5xl group-hover:animate-bounce transition-all duration-300 flex-shrink-0">
                    {problem.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                      <span className="text-sm text-gray-500">Problem #{index + 1}</span>
                    </div>
                    <p className="text-gray-800 text-base sm:text-lg leading-relaxed mb-3">
                      {problem.problem}
                    </p>
                    <div className="inline-flex items-center text-xs sm:text-sm font-medium text-yellow-600 bg-white/70 px-3 py-1 rounded-full group-hover:bg-white group-hover:text-yellow-700 transition-all">
                      🧠 Solve Problem
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Problem Solving Interface */
        <div>
          <div className="text-center mb-6">
            <div className="text-5xl mb-4 animate-bounce">{selectedProblem.emoji}</div>
            <div className="flex justify-center mb-4">
              <span className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${getDifficultyColor(selectedProblem.difficulty)}`}>
                {selectedProblem.difficulty} • {selectedProblem.category}
              </span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-6 sm:p-8 border-4 border-yellow-200 mb-6">
            <h3 className="text-xl font-bold text-yellow-700 mb-4 text-center">Problem Statement</h3>
            <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-yellow-300 text-center">
              <p className="text-gray-800 text-lg leading-relaxed">{selectedProblem.problem}</p>
            </div>
          </div>

          {showSolution && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 sm:p-8 border-4 border-green-200 mb-6">
              <h3 className="text-xl font-bold text-green-700 mb-4 text-center">💡 Solution</h3>
              <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-green-300">
                <p className="text-gray-800 text-base leading-relaxed font-mono">{selectedProblem.solution}</p>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            {!showSolution ? (
              <button
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 rounded-3xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                style={{fontFamily: 'Fredoka One, cursive'}}
                onClick={() => setShowSolution(true)}
              >
                💡 Show Solution
              </button>
            ) : (
              <button
                className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-6 py-3 rounded-3xl font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-lg"
                style={{fontFamily: 'Fredoka One, cursive'}}
                onClick={() => setShowSolution(false)}
              >
                🙈 Hide Solution
              </button>
            )}
            <button
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3 rounded-3xl font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-lg"
              style={{fontFamily: 'Fredoka One, cursive'}}
              onClick={() => {
                setSelectedProblem(null);
                setShowSolution(false);
              }}
            >
              ← Back to Problems
            </button>
            <button
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-3 rounded-3xl font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-lg"
              style={{fontFamily: 'Fredoka One, cursive'}}
              onClick={() => {
                setSelectedProblem(null);
                setSelectedCategory(null);
                setShowSolution(false);
              }}
            >
              🏆 Back to Categories
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
