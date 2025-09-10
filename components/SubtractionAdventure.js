'use client';
import { useState, useEffect } from 'react';

const THEMES = {
  fruits: {
    name: '🍎 Fruit Garden',
    items: ['🍎', '🍌', '🍊', '🍇', '🍓', '🥝', '🍑', '🥭'],
    bgColor: 'bg-gradient-to-br from-green-100 to-yellow-100',
    description: 'Count delicious fruits!'
  },
  animals: {
    name: '🐾 Animal Farm',
    items: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'],
    bgColor: 'bg-gradient-to-br from-orange-100 to-pink-100',
    description: 'Count cute animals!'
  },
  toys: {
    name: '🧸 Toy Box',
    items: ['🧸', '🚗', '🎾', '🏀', '⚽', '🎲', '🎸', '🪀'],
    bgColor: 'bg-gradient-to-br from-pink-100 to-purple-100',
    description: 'Count fun toys!'
  },
  shapes: {
    name: '🔴 Shape World',
    items: ['🔴', '🔵', '🟡', '🟢', '🟠', '🟣', '⭐', '❤️'],
    bgColor: 'bg-gradient-to-br from-blue-100 to-indigo-100',
    description: 'Count colorful shapes!'
  }
};

const DIFFICULTY_LEVELS = {
  beginner: {
    name: 'Beginner',
    maxStart: 5,
    description: 'Numbers 1-5',
    emoji: '🌱'
  },
  easy: {
    name: 'Easy',
    maxStart: 10,
    description: 'Numbers 1-10',
    emoji: '⭐'
  },
  medium: {
    name: 'Medium',
    maxStart: 15,
    description: 'Numbers 1-15',
    emoji: '🚀'
  }
};

const generateProblem = (difficulty, mode) => {
  const maxStart = DIFFICULTY_LEVELS[difficulty].maxStart;
  let start, subtract, result, question, options, correctAnswer, explanation;

  if (mode === 'basic') {
    // Basic subtraction: a - b = ?
    start = Math.floor(Math.random() * maxStart) + 2; // Ensure we have at least 2
    subtract = Math.floor(Math.random() * (start - 1)) + 1; // Can't subtract more than we have
    result = start - subtract;
    
    question = `${start} - ${subtract} = ?`;
    correctAnswer = result;
    explanation = `We start with ${start} items. When we take away ${subtract} items, we have ${start} - ${subtract} = ${result} items left.`;
  } else if (mode === 'missing_start') {
    // Missing start number: ? - b = c
    result = Math.floor(Math.random() * (maxStart - 3)) + 1;
    subtract = Math.floor(Math.random() * 3) + 1;
    start = result + subtract;
    
    question = `? - ${subtract} = ${result}`;
    correctAnswer = start;
    explanation = `If we take away ${subtract} and have ${result} left, we must have started with ${result} + ${subtract} = ${start}.`;
  } else {
    // Missing subtract number: a - ? = c
    result = Math.floor(Math.random() * (maxStart - 3)) + 1;
    subtract = Math.floor(Math.random() * 3) + 1;
    start = result + subtract;
    
    question = `${start} - ? = ${result}`;
    correctAnswer = subtract;
    explanation = `We started with ${start} and ended with ${result}, so we took away ${start} - ${result} = ${subtract}.`;
  }

  // Generate options
  options = [correctAnswer];
  while (options.length < 4) {
    let wrongAnswer;
    if (Math.random() < 0.5) {
      wrongAnswer = correctAnswer + Math.floor(Math.random() * 3) + 1;
    } else {
      wrongAnswer = Math.max(0, correctAnswer - Math.floor(Math.random() * 3) - 1);
    }
    if (!options.includes(wrongAnswer) && wrongAnswer <= maxStart) {
      options.push(wrongAnswer);
    }
  }

  return {
    start,
    subtract,
    result,
    question,
    options: options.sort(() => Math.random() - 0.5),
    correctAnswer,
    explanation,
    visualStart: start,
    visualSubtract: subtract,
    visualResult: result
  };
};

export default function SubtractionAdventure() {
  const [currentTheme, setCurrentTheme] = useState('fruits');
  const [difficulty, setDifficulty] = useState('beginner');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameMode, setGameMode] = useState('basic');
  const [currentProblem, setCurrentProblem] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const theme = THEMES[currentTheme];
  const difficultyData = DIFFICULTY_LEVELS[difficulty];

  useEffect(() => {
    if (gameStarted) {
      setCurrentProblem(generateProblem(difficulty, gameMode));
    }
  }, [difficulty, gameMode, gameStarted]);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setStreak(0);
    setLives(3);
    setCurrentProblem(generateProblem(difficulty, gameMode));
  };

  const checkAnswer = (answer) => {
    if (showResult) return;

    setSelectedAnswer(answer);
    const correct = answer === currentProblem.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      const points = difficulty === 'beginner' ? 10 : difficulty === 'easy' ? 15 : 20;
      setScore(prev => prev + points + (streak * 2));
      setStreak(prev => prev + 1);

      // Show celebration for streaks
      if ((streak + 1) % 3 === 0) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 2000);
      }
    } else {
      setStreak(0);
      setLives(prev => prev - 1);
      
      if (lives <= 1) {
        setTimeout(() => {
          setGameStarted(false);
        }, 2500);
        return;
      }
    }

    setTimeout(() => {
      nextQuestion();
    }, 3000);
  };

  const nextQuestion = () => {
    setCurrentProblem(generateProblem(difficulty, gameMode));
    setShowResult(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setShowHint(false);
  };

  const getHint = () => {
    setShowHint(true);
  };

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  if (!gameStarted) {
    return (
      <div className={`max-w-5xl mx-auto p-6 ${theme.bgColor} rounded-3xl shadow-2xl`}>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800 mb-4">
            🧮 Subtraction Adventure! 
          </h1>
          <p className="text-lg text-purple-700 mb-6">
            Learn subtraction with colorful visuals and fun themes!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Theme Selection */}
          <div className="bg-white/90 rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-purple-700 mb-4 text-center">
              🎨 Choose Your Theme
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(THEMES).map(([key, themeData]) => (
                <button
                  key={key}
                  onClick={() => setCurrentTheme(key)}
                  className={`p-4 rounded-xl text-left transition-all transform hover:scale-105 ${
                    currentTheme === key
                      ? 'bg-purple-200 border-2 border-purple-400 shadow-lg'
                      : 'bg-gray-100 hover:bg-gray-200 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{themeData.items[0]}</div>
                    <div>
                      <div className="font-bold text-lg text-gray-800">{themeData.name}</div>
                      <div className="text-sm text-gray-600">{themeData.description}</div>
                    </div>
                  </div>
                  <div className="flex gap-1 mt-2">
                    {themeData.items.slice(1, 5).map((item, i) => (
                      <span key={i} className="text-xl">{item}</span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="space-y-6">
            {/* Difficulty Selection */}
            <div className="bg-white/90 rounded-2xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-green-700 mb-4 text-center">
                📊 Choose Difficulty
              </h3>
              <div className="space-y-3">
                {Object.entries(DIFFICULTY_LEVELS).map(([key, diffData]) => (
                  <button
                    key={key}
                    onClick={() => setDifficulty(key)}
                    className={`w-full p-4 rounded-xl text-left transition-all transform hover:scale-105 ${
                      difficulty === key
                        ? 'bg-green-200 border-2 border-green-400 shadow-lg'
                        : 'bg-gray-100 hover:bg-gray-200 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{diffData.emoji}</span>
                      <div>
                        <div className="font-bold text-lg text-gray-800">{diffData.name}</div>
                        <div className="text-sm text-gray-600">{diffData.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Game Mode Selection */}
            <div className="bg-white/90 rounded-2xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-blue-700 mb-4 text-center">
                🎯 Choose Game Mode
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => setGameMode('basic')}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    gameMode === 'basic'
                      ? 'bg-blue-200 border-2 border-blue-400 shadow-lg'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <div className="font-bold text-lg text-blue-800">Basic Subtraction</div>
                  <div className="text-sm text-blue-600">Solve: 8 - 3 = ?</div>
                </button>
                <button
                  onClick={() => setGameMode('missing_start')}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    gameMode === 'missing_start'
                      ? 'bg-orange-200 border-2 border-orange-400 shadow-lg'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <div className="font-bold text-lg text-orange-800">Find Starting Number</div>
                  <div className="text-sm text-orange-600">Solve: ? - 3 = 5</div>
                </button>
                <button
                  onClick={() => setGameMode('missing_subtract')}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    gameMode === 'missing_subtract'
                      ? 'bg-pink-200 border-2 border-pink-400 shadow-lg'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <div className="font-bold text-lg text-pink-800">Find What Was Taken</div>
                  <div className="text-sm text-pink-600">Solve: 8 - ? = 5</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={startGame}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-2xl text-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            🎮 Start Subtraction Adventure!
          </button>
        </div>
      </div>
    );
  }

  if (lives <= 0) {
    return (
      <div className={`max-w-4xl mx-auto p-6 ${theme.bgColor} rounded-3xl shadow-2xl text-center`}>
        <h2 className="text-4xl font-bold text-red-600 mb-4">Game Over! 😅</h2>
        <div className="text-6xl mb-4">🏆</div>
        <p className="text-2xl text-gray-700 mb-4">Final Score: <span className="font-bold text-blue-600">{score}</span> points</p>
        <p className="text-lg text-gray-600 mb-6">Great job practicing subtraction! Every try makes you stronger! 💪</p>
        <button
          onClick={() => setGameStarted(false)}
          className="bg-blue-500 text-white px-8 py-4 rounded-2xl text-xl font-bold hover:bg-blue-600 transition-colors shadow-lg"
        >
          🔄 Play Again
        </button>
      </div>
    );
  }

  return (
    <div className={`max-w-6xl mx-auto p-6 ${theme.bgColor} min-h-screen`}>
      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20">
          <div className="bg-white rounded-3xl p-8 text-center animate-bounce shadow-2xl">
            <div className="text-8xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-purple-800 mb-2">Amazing Streak!</h2>
            <p className="text-purple-600 text-lg">You're on fire! 🔥</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white/90 rounded-2xl p-6 mb-6 shadow-lg">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-purple-800 flex items-center gap-2">
              {theme.items[0]} Subtraction Adventure
            </h1>
            <p className="text-purple-600">
              {difficultyData.emoji} {difficultyData.name} • {gameMode.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </p>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-sm text-gray-500">Score</div>
              <div className="text-2xl font-bold text-blue-600">{score}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Streak</div>
              <div className="text-2xl font-bold text-green-600">{streak} 🔥</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Lives</div>
              <div className="text-2xl font-bold text-red-600">
                {'❤️'.repeat(lives)}{'🤍'.repeat(3 - lives)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Visual Representation */}
        <div className="bg-white/90 rounded-2xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold text-purple-700 mb-6 text-center">
            👀 Visual Helper
          </h3>
          
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-purple-800 mb-4 p-4 bg-purple-50 rounded-xl">
              {currentProblem?.question}
            </div>
          </div>

          {/* Visual Items */}
          <div className="space-y-4">
            <div className="text-lg text-gray-700 font-semibold">Starting items:</div>
            <div className="flex flex-wrap gap-2 p-4 bg-blue-50 rounded-xl min-h-[100px] items-center justify-center">
              {Array.from({ length: currentProblem?.visualStart || 0 }, (_, i) => (
                <span key={i} className="text-4xl animate-pulse" style={{animationDelay: `${i * 100}ms`}}>
                  {theme.items[i % theme.items.length]}
                </span>
              ))}
            </div>

            {gameMode === 'basic' && (
              <>
                <div className="text-lg text-gray-700 font-semibold">Taking away {currentProblem?.subtract} items:</div>
                <div className="flex flex-wrap gap-2 p-4 bg-red-50 rounded-xl min-h-[80px] items-center justify-center">
                  {Array.from({ length: currentProblem?.visualSubtract || 0 }, (_, i) => (
                    <span key={i} className="text-4xl opacity-50 line-through decoration-4 decoration-red-500">
                      {theme.items[i % theme.items.length]}
                    </span>
                  ))}
                </div>
                <div className="text-lg text-gray-700 font-semibold">Items remaining:</div>
                <div className="flex flex-wrap gap-2 p-4 bg-green-50 rounded-xl min-h-[80px] items-center justify-center">
                  {Array.from({ length: currentProblem?.visualResult || 0 }, (_, i) => (
                    <span key={i} className="text-4xl animate-bounce" style={{animationDelay: `${i * 150}ms`}}>
                      {theme.items[i % theme.items.length]}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Answer Section */}
        <div className="bg-white/90 rounded-2xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold text-purple-700 mb-6 text-center">
            🤔 Choose Your Answer!
          </h3>

          {showResult ? (
            <div className="text-center">
              <div className={`text-8xl mb-6 ${isCorrect ? 'animate-bounce' : 'animate-pulse'}`}>
                {isCorrect ? '🎉' : '💪'}
              </div>
              <h4 className={`text-3xl font-bold mb-4 ${isCorrect ? 'text-green-600' : 'text-orange-600'}`}>
                {isCorrect ? 'Fantastic!' : 'Keep Trying!'}
              </h4>
              <p className="text-xl text-gray-700 mb-6">
                {isCorrect 
                  ? `Correct! The answer is ${currentProblem?.correctAnswer}` 
                  : `The correct answer was ${currentProblem?.correctAnswer}`
                }
              </p>
              
              <button
                onClick={toggleExplanation}
                className="mb-6 bg-blue-500 text-white px-6 py-3 rounded-xl text-lg font-bold hover:bg-blue-600 transition-colors shadow-lg"
              >
                {showExplanation ? 'Hide' : 'Show'} Explanation 📖
              </button>

              {showExplanation && (
                <div className="bg-blue-50 p-6 rounded-xl mb-6 text-left">
                  <p className="text-blue-800 text-lg">{currentProblem?.explanation}</p>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {currentProblem?.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => checkAnswer(option)}
                    className="bg-gradient-to-br from-yellow-200 to-orange-200 hover:from-yellow-300 hover:to-orange-300 p-8 rounded-xl text-center cursor-pointer transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <div className="text-5xl font-bold text-orange-800">{option}</div>
                  </button>
                ))}
              </div>

              {!showHint && (
                <div className="text-center">
                  <button
                    onClick={getHint}
                    className="bg-yellow-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-yellow-600 transition-colors"
                  >
                    💡 Need a Hint?
                  </button>
                </div>
              )}

              {showHint && (
                <div className="bg-yellow-50 p-4 rounded-xl border-2 border-yellow-300">
                  <p className="text-yellow-800 font-semibold text-center">
                    💡 Hint: {gameMode === 'basic' ? 'Count what\'s left after taking some away!' : 
                             gameMode === 'missing_start' ? 'Add what you took away to what\'s left!' :
                             'Count how many you took away!'}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Game Controls */}
      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={() => setGameStarted(false)}
          className="bg-gray-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-600 transition-colors"
        >
          🔄 New Game
        </button>
        <button
          onClick={nextQuestion}
          className="bg-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-600 transition-colors"
        >
          ⏭️ Skip Question
        </button>
      </div>
    </div>
  );
}
