'use client';
import { useState, useEffect } from 'react';

const THEMES = {
  fruits: {
    name: '🍎 Fruit Basket',
    items: ['🍎', '🍌', '🍊', '🍇', '🍓', '🥝', '🍑', '🍒'],
    colors: ['text-red-500', 'text-yellow-500', 'text-orange-500', 'text-purple-500', 'text-pink-500', 'text-green-500', 'text-orange-400', 'text-red-600']
  },
  animals: {
    name: '🐾 Animal Friends',
    items: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'],
    colors: ['text-brown-600', 'text-orange-500', 'text-gray-600', 'text-orange-400', 'text-pink-300', 'text-orange-600', 'text-amber-800', 'text-gray-800']
  },
  balloons: {
    name: '🎈 Balloon Party',
    items: ['🎈', '🎈', '🎈', '🎈', '🎈', '🎈', '🎈', '🎈'],
    colors: ['text-red-500', 'text-blue-500', 'text-green-500', 'text-yellow-500', 'text-purple-500', 'text-pink-500', 'text-orange-500', 'text-cyan-500']
  }
};

const generateProblem = (level, mode) => {
  if (mode === 'missing') {
    // Generate missing number problems
    const result = Math.floor(Math.random() * (level * 3 + 5)) + 1;
    const subtract = Math.floor(Math.random() * Math.min(result, level * 2 + 3)) + 1;
    const start = result + subtract;

    // Randomly choose which number is missing
    const missingType = Math.random() < 0.5 ? 'start' : 'subtract';

    if (missingType === 'start') {
      return {
        equation: '? - ' + subtract + ' = ' + result,
        missing: start,
        missingType: 'start',
        start: null,
        subtract,
        result,
        visualItems: Array.from({ length: start }, (_, i) => i < result ? 'visible' : 'hidden')
      };
    } else {
      return {
        equation: start + ' - ? = ' + result,
        missing: subtract,
        missingType: 'subtract',
        start,
        subtract: null,
        result,
        visualItems: Array.from({ length: start }, (_, i) => i < result ? 'visible' : 'hidden')
      };
    }
  } else {
    // Regular subtraction
    const start = Math.floor(Math.random() * (level * 3 + 8)) + 3;
    const subtract = Math.floor(Math.random() * Math.min(start - 1, level * 2 + 4)) + 1;
    const result = start - subtract;

    return {
      equation: start + ' - ' + subtract + ' = ?',
      missing: result,
      missingType: 'result',
      start,
      subtract,
      result: null,
      visualItems: Array.from({ length: start }, (_, i) => i < result ? 'visible' : 'hidden')
    };
  }
};

export default function SubtractionAdventure() {
  const [currentTheme, setCurrentTheme] = useState('fruits');
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gameMode, setGameMode] = useState('regular'); // 'regular' or 'missing'
  const [currentProblem, setCurrentProblem] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const theme = THEMES[currentTheme];

  useEffect(() => {
    if (gameStarted) {
      setCurrentProblem(generateProblem(level, gameMode));
    }
  }, [level, gameMode, gameStarted]);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setStreak(0);
    setLevel(1);
    setCurrentProblem(generateProblem(1, gameMode));
  };

  const checkAnswer = (answer) => {
    if (showResult) return;

    const correct = answer === currentProblem.missing;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore((prev) => prev + level * 10);
      setStreak((prev) => prev + 1);

      if ((streak + 1) % 3 === 0 && level < 5) {
        setTimeout(() => {
          setLevel((prev) => prev + 1);
          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), 2000);
        }, 1000);
      }

      setTimeout(() => {
        setCurrentProblem(generateProblem(level, gameMode));
        setShowResult(false);
        setSelectedAnswer(null);
      }, 1500);
    } else {
      setStreak(0);
      setTimeout(() => {
        setShowResult(false);
        setSelectedAnswer(null);
      }, 2000);
    }
  };

  const generateAnswerOptions = () => {
    const correct = currentProblem.missing;
    const options = [correct];

    while (options.length < 4) {
      const randomNum = Math.max(1, correct + Math.floor(Math.random() * 6) - 3);
      if (!options.includes(randomNum)) {
        options.push(randomNum);
      }
    }

    return options.sort(() => Math.random() - 0.5);
  };

  if (!gameStarted) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 rounded-3xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-cartoon text-purple-800 mb-4">🧮 Subtraction Adventure! 🚀</h1>
          <p className="text-lg text-purple-700 mb-6">Help our friends learn subtraction and find missing numbers!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-cartoon text-green-700 mb-4">🎯 Game Modes</h3>
            <div className="space-y-3">
              <button
                onClick={() => setGameMode('regular')}
                className={`w-full p-4 rounded-xl text-left transition-all ${
                  gameMode === 'regular'
                    ? 'bg-green-200 border-2 border-green-400'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <div className="font-cartoon text-lg text-green-800">Regular Subtraction</div>
                <div className="text-sm text-green-600">Solve: 5 - 2 = ?</div>
              </button>
              <button
                onClick={() => setGameMode('missing')}
                className={`w-full p-4 rounded-xl text-left transition-all ${
                  gameMode === 'missing'
                    ? 'bg-blue-200 border-2 border-blue-400'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <div className="font-cartoon text-lg text-blue-800">Find Missing Numbers</div>
                <div className="text-sm text-blue-600">Solve: ? - 2 = 3 or 5 - ? = 2</div>
              </button>
            </div>
          </div>

          <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-cartoon text-purple-700 mb-4">🎨 Choose Theme</h3>
            <div className="grid grid-cols-1 gap-3">
              {Object.entries(THEMES).map(([key, themeData]) => (
                <button
                  key={key}
                  onClick={() => setCurrentTheme(key)}
                  className={`p-3 rounded-xl text-left transition-all ${
                    currentTheme === key
                      ? 'bg-purple-200 border-2 border-purple-400'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <div className="font-cartoon text-lg">{themeData.name}</div>
                  <div className="flex gap-1 mt-1">
                    {themeData.items.slice(0, 4).map((item, i) => (
                      <span key={i} className="text-2xl">{item}</span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={startGame}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-2xl text-2xl font-cartoon shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            🎮 Start Adventure!
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-4 mb-6 shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-cartoon">🧮 Subtraction Adventure</h1>
            <p className="text-purple-100">Level {level} • Score: {score} • Streak: {streak} 🔥</p>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-80">Theme: {theme.name}</div>
            <div className="text-sm opacity-80">Mode: {gameMode === 'regular' ? 'Regular' : 'Missing Numbers'}</div>
          </div>
        </div>
      </div>

      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white rounded-3xl p-8 text-center animate-bounce">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-cartoon text-purple-800 mb-2">Level Up!</h2>
            <p className="text-purple-600">You're getting amazing at subtraction!</p>
          </div>
        </div>
      )}

      {/* Main Game Area */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Visual Representation */}
        <div className="bg-white/90 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-cartoon text-purple-700 mb-4 text-center">Visual Helper</h3>

          <div className="text-center mb-4">
            <div className="text-3xl font-cartoon text-purple-800 mb-2">
              {currentProblem.equation}
            </div>
          </div>

          {/* Visual Items */}
          <div className="flex flex-wrap justify-center gap-2 mb-6 min-h-[120px] items-center">
            {currentProblem.visualItems.map((status, i) => (
              <div
                key={i}
                className={`text-4xl transition-all duration-300 ${
                  status === 'visible' ? 'opacity-100 scale-100' : 'opacity-30 scale-75'
                }`}
              >
                {theme.items[i % theme.items.length]}
              </div>
            ))}
          </div>
        </div>

        {/* Answer Section */}
        <div className="bg-white/90 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-cartoon text-purple-700 mb-4 text-center">
            {gameMode === 'regular' ? "What's the Answer?" : 'Find the Missing Number!'}
          </h3>

          {showResult ? (
            <div className="text-center">
              <div className={`text-6xl mb-4 ${isCorrect ? 'animate-bounce' : 'animate-pulse'}`}>
                {isCorrect ? '🎉' : '😅'}
              </div>
              <h4 className={`text-2xl font-cartoon mb-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {isCorrect ? 'Amazing!' : 'Try Again!'}
              </h4>
              <p className="text-purple-600">
                {isCorrect ? 'You got it right!' : `The answer was ${currentProblem.missing}`}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {generateAnswerOptions().map((num) => (
                <button
                  key={num}
                  onClick={() => checkAnswer(num)}
                  className="bg-gradient-to-br from-yellow-200 to-orange-200 p-4 rounded-xl text-center cursor-pointer hover:scale-105 transition-all shadow-md"
                >
                  <div className="text-3xl font-cartoon text-orange-800">{num}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Game Controls */}
      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={() => setGameStarted(false)}
          className="bg-gray-500 text-white px-6 py-3 rounded-xl font-cartoon hover:bg-gray-600 transition-colors"
        >
          🔄 Change Settings
        </button>
        <button
          onClick={() => setCurrentProblem(generateProblem(level, gameMode))}
          className="bg-blue-500 text-white px-6 py-3 rounded-xl font-cartoon hover:bg-blue-600 transition-colors"
        >
          ⏭️ Skip Question
        </button>
      </div>
    </div>
  );
}
