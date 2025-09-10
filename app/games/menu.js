import Link from 'next/link';
import { useState } from 'react';
import SimpleBackground from '../../components/SimpleBackground';

const games = [
  { name: 'Memory Match', path: '/games/memory', grades: [1,2,3,4] },
  { name: 'Mandala Coloring', path: '/games/mandala', grades: [1,2,3,4,5,6] },
  { name: 'Math Quiz', path: '/games/math', grades: [1,2,3,4,5] },
  { name: 'Word Builder', path: '/games/words', grades: [2,3,4,5,6] },
];

export default function GamesMenu() {
  const [selectedGrade, setSelectedGrade] = useState('all');
  return (
    <>
      <SimpleBackground />
      <div className="relative z-10 max-w-4xl mx-auto mt-6 sm:mt-8 md:mt-12 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8 border-4 border-purple-200">
        <div className="text-center mb-6 sm:mb-8">
          <div className="text-6xl sm:text-7xl mb-4 animate-bounce">🎮</div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-800 mb-2" style={{fontFamily: 'Fredoka One, cursive'}}>
            Game Selection Hub
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-purple-600 font-medium">
            Choose your grade and discover amazing learning games! ✨
          </p>
        </div>
        
        <div className="flex justify-center flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8">
          <button 
            className={`px-4 py-2 rounded-3xl font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 ${
              selectedGrade==='all' 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                : 'bg-purple-100 hover:bg-purple-200 text-purple-700'
            }`} 
            onClick={()=>setSelectedGrade('all')}
            style={{fontFamily: 'Fredoka One, cursive'}}
          >
            🌟 All Grades
          </button>
          {[1,2,3,4,5,6].map(grade => (
            <button 
              key={grade} 
              className={`px-4 py-2 rounded-3xl font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 ${
                selectedGrade===grade 
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg' 
                  : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
              }`} 
              onClick={()=>setSelectedGrade(grade)}
              style={{fontFamily: 'Fredoka One, cursive'}}
            >
              🎓 Grade {grade}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {games.filter(game => selectedGrade==='all' || game.grades.includes(selectedGrade)).map(game => (
            <div key={game.name} className="group bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 hover:from-purple-100 hover:via-pink-100 hover:to-blue-100 rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-4 border-purple-100 hover:border-purple-300">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl mb-3 group-hover:animate-bounce transition-all duration-300">🎯</div>
                <Link 
                  href={game.path} 
                  className="text-xl sm:text-2xl font-bold text-purple-700 hover:text-purple-800 transition-colors block mb-3"
                  style={{fontFamily: 'Fredoka One, cursive'}}
                >
                  {game.name}
                </Link>
                <div className="inline-flex items-center text-xs sm:text-sm font-medium text-purple-600 bg-white/70 px-3 py-1 rounded-full">
                  🎓 Grades: {game.grades.join(', ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
