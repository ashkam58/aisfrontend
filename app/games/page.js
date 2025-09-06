'use client';
import { useState } from 'react';
import Link from 'next/link';
import ParallelLinesGame from '../../components/ParallelLinesGame';
import SubtractionAdventure from '../../components/SubtractionAdventure';

const games = [
  { name: 'Memory Match', description: 'Match pairs of cards', grades: [1,2,3,4], path: '/games/memory' },
  { name: 'Mandala Coloring', description: 'Color beautiful mandalas', grades: [1,2,3,4,5,6], path: '/games/mandala' },
  { name: 'Math Quiz', description: 'Practice math problems', grades: [1,2,3,4,5], path: '/games/math' },
  { name: 'Word Builder', description: 'Build words from letters', grades: [2,3,4,5,6], path: '/games/words' },
  { name: 'Shape Sorter', description: 'Sort shapes by properties', grades: [1,2,3], path: '/games/shapes' },
  { name: 'Fraction Fun', description: 'Learn fractions visually', grades: [3,4,5,6], path: '/games/fractions' },
];

const gamesTopics = {
  1: [
    { name: 'Subtraction Adventure', description: 'Learn subtraction and find missing numbers with fun visuals!', component: <SubtractionAdventure /> },
  ],
  6: [
    { name: 'Parallel Lines Game', description: 'Identify parallel lines and solve challenges!', component: <ParallelLinesGame /> },
  ],
};

export default function GamesPage() {
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const availableGrades = Object.keys(gamesTopics).map(Number);

  return (
    <>
  <div className="relative z-10 max-w-4xl mx-auto mt-12 bg-white/90 rounded-cartoon shadow-lg p-8 backdrop-blur">
    <div className="text-center mb-6">
      <h1 className="text-3xl md:text-4xl font-cartoon text-purple-800">🎮 Game Arcade</h1>
      <p className="text-purple-600">Playful challenges to sharpen your skills!</p>
    </div>
        {!selectedGrade ? (
          <div>
    <h2 className="text-2xl font-cartoon text-purple-700 mb-6 text-center">Select Your Grade ✨</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {availableGrades.map((grade) => (
                <button
                  key={grade}
      className="bg-gradient-to-br from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 text-purple-700 font-cartoon text-xl p-6 rounded-cartoon transition shadow-md"
                  onClick={() => setSelectedGrade(grade)}
                >
      Grade {grade} 🎈
                </button>
              ))}
            </div>
          </div>
        ) : !selectedGame ? (
          <div>
    <h2 className="text-2xl font-cartoon text-purple-700 mb-6 text-center">Grade {selectedGrade} Games 🎯</h2>
            {Array.isArray(gamesTopics[selectedGrade]) && gamesTopics[selectedGrade].length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gamesTopics[selectedGrade].map((game) => (
                  <div
                    key={game.name}
        className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-cartoon shadow-md hover:shadow-lg transition cursor-pointer border border-purple-200"
                    onClick={() => setSelectedGame(game)}
                  >
        <h3 className="text-xl font-cartoon text-purple-700 mb-2">{game.name} 🕹️</h3>
        <p className="text-purple-600">{game.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-purple-600">No games available for Grade {selectedGrade} yet.</div>
            )}
          </div>
        ) : (
          <div>
    <h2 className="text-2xl font-cartoon text-purple-700 mb-6 text-center">{selectedGame.name} 🧠</h2>
            {selectedGame.component}
            <button
      className="bg-purple-500 text-white px-4 py-2 rounded-cartoon font-cartoon hover:bg-purple-600"
              onClick={() => setSelectedGame(null)}
            >
      ← Back to Games
            </button>
          </div>
        )}
      </div>
    </>
  );
}
