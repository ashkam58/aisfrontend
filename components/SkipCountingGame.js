'use client';
import { useState, useEffect } from 'react';

const COUNTING_PATTERNS = {
  twos: {
    name: 'Count by 2s',
    pattern: 2,
    emoji: '👟',
    color: 'bg-blue-100',
    borderColor: 'border-blue-300',
    buttonColor: 'bg-blue-500 hover:bg-blue-600'
  },
  fives: {
    name: 'Count by 5s',
    pattern: 5,
    emoji: '✋',
    color: 'bg-green-100',
    borderColor: 'border-green-300',
    buttonColor: 'bg-green-500 hover:bg-green-600'
  },
  tens: {
    name: 'Count by 10s',
    pattern: 10,
    emoji: '🔟',
    color: 'bg-purple-100',
    borderColor: 'border-purple-300',
    buttonColor: 'bg-purple-500 hover:bg-purple-600'
  }
};

const generateSequence = (pattern, start = 0, length = 6) => {
  const sequence = [];
  for (let i = 0; i < length; i++) {
    sequence.push(start + (pattern * i));
  }
  return sequence;
};

const generateQuestion = (pattern, difficulty) => {
  const length = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 6 : 8;
  const start = difficulty === 'easy' ? 0 : Math.floor(Math.random() * 3) * pattern;
  const sequence = generateSequence(pattern, start, length);
  const missingIndex = Math.floor(Math.random() * (sequence.length - 1)) + 1; // Don't make first one missing
  const correctAnswer = sequence[missingIndex];
  const sequenceWithMissing = [...sequence];
  sequenceWithMissing[missingIndex] = '?';
  
  // Generate wrong answers
  const wrongAnswers = [];
  wrongAnswers.push(correctAnswer + pattern); // One step ahead
  wrongAnswers.push(correctAnswer - pattern); // One step behind
  wrongAnswers.push(correctAnswer + 1); // Off by one
  
  // Remove duplicates and filter out negative numbers for Grade 1
  const options = [correctAnswer, ...wrongAnswers.filter(n => n >= 0 && n !== correctAnswer)]
    .slice(0, 4)
    .sort(() => Math.random() - 0.5);
    
  return {
    sequence: sequenceWithMissing,
    correctAnswer,
    options,
    missingIndex,
    pattern
  };
};

export default function SkipCountingGame() {
  const [selectedPattern, setSelectedPattern] = useState('twos');
  const [difficulty, setDifficulty] = useState('easy');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [celebration, setCelebration] = useState(false);

  const patternData = COUNTING_PATTERNS[selectedPattern];

  useEffect(() => {
    if (gameStarted && !currentQuestion) {
      generateNewQuestion();
    }
  }, [gameStarted, selectedPattern, difficulty]);

  const generateNewQuestion = () => {
    const question = generateQuestion(patternData.pattern, difficulty);
    setCurrentQuestion(question);
    setShowResult(false);
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setLives(3);
    generateNewQuestion();
  };

  const checkAnswer = (answer) => {
    if (showResult) return;

    const correct = answer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore(prev => prev + 10);
      setCelebration(true);
      setTimeout(() => setCelebration(false), 1000);
    } else {
      setLives(prev => prev - 1);
    }

    setTimeout(() => {
      if (!correct && lives <= 1) {
        setGameStarted(false);
      } else {
        generateNewQuestion();
      }
    }, 2000);
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentQuestion(null);
    setShowResult(false);
    setScore(0);
    setLives(3);
  };

  if (!gameStarted) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-orange-800 mb-4">🔢 Skip Counting Adventure!</h1>
          <p className="text-xl text-orange-700 mb-6">Learn to count by 2s, 5s, and 10s with fun patterns!</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {Object.entries(COUNTING_PATTERNS).map(([key, pattern]) => (
            <button
              key={key}
              onClick={() => setSelectedPattern(key)}
              className={`p-6 rounded-2xl border-2 transition-all transform hover:scale-105 ${
                selectedPattern === key
                  ? `${pattern.color} ${pattern.borderColor} shadow-lg`
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="text-center">
                <div className="text-4xl mb-3">{pattern.emoji}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{pattern.name}</h3>
                <div className="flex justify-center gap-2">
                  {generateSequence(pattern.pattern, 0, 5).map((num, i) => (
                    <span key={i} className="text-lg font-semibold text-gray-600">
                      {num}{i < 4 ? ',' : '...'}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Choose Difficulty</h3>
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { key: 'easy', name: 'Easy', desc: '4 numbers' },
              { key: 'medium', name: 'Medium', desc: '6 numbers' },
              { key: 'hard', name: 'Hard', desc: '8 numbers' }
            ].map((diff) => (
              <button
                key={diff.key}
                onClick={() => setDifficulty(diff.key)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  difficulty === diff.key
                    ? 'bg-yellow-200 border-yellow-400 shadow-lg'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="text-center">
                  <div className="font-bold text-lg text-gray-800">{diff.name}</div>
                  <div className="text-sm text-gray-600">{diff.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={startGame}
            className={`px-8 py-4 rounded-2xl text-2xl font-bold text-white shadow-lg transform hover:scale-105 transition-all ${patternData.buttonColor}`}
          >
            🎮 Start Counting Adventure!
          </button>
        </div>
      </div>
    );
  }

  if (lives <= 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-3xl shadow-2xl text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Game Over! 😢</h2>
        <p className="text-xl text-gray-700 mb-4">Final Score: {score} points</p>
        <p className="text-lg text-gray-600 mb-6">Great job practicing skip counting! Keep learning!</p>
        <button
          onClick={resetGame}
          className="bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-600 transition-colors"
        >
          Try Again 🔄
        </button>
      </div>
    );
  }

  return (
    <div className={`max-w-6xl mx-auto p-6 ${patternData.color} min-h-screen`}>
      {/* Celebration Animation */}
      {celebration && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="text-8xl animate-bounce">🎉</div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white/90 rounded-2xl p-4 mb-6 shadow-lg">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              {patternData.emoji} {patternData.name}
            </h1>
            <p className="text-gray-600">Find the missing number in the pattern!</p>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-sm text-gray-500">Score</div>
              <div className="text-xl font-bold text-blue-600">{score}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Lives</div>
              <div className="text-xl font-bold text-red-600">
                {'❤️'.repeat(lives)}{'🤍'.repeat(3 - lives)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="bg-white/90 rounded-2xl p-8 shadow-lg mb-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          What number is missing? 🤔
        </h2>

        {/* Number Sequence Display */}
        <div className="flex justify-center items-center gap-4 mb-8 flex-wrap">
          {currentQuestion?.sequence.map((num, index) => (
            <div
              key={index}
              className={`w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold border-2 ${
                num === '?' 
                  ? 'bg-yellow-200 border-yellow-400 animate-pulse' 
                  : 'bg-blue-100 border-blue-300'
              }`}
            >
              {num === '?' ? (
                <span className="text-yellow-600">?</span>
              ) : (
                <span className="text-blue-800">{num}</span>
              )}
            </div>
          ))}
        </div>

        {/* Visual Helper */}
        <div className="mb-8 p-6 bg-gray-50 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
            Visual Helper: Count by {patternData.pattern}s
          </h3>
          <div className="flex justify-center flex-wrap gap-2">
            {Array.from({ length: Math.min(currentQuestion?.correctAnswer || 10, 20) }, (_, i) => i + 1).map((num) => (
              <div
                key={num}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  num % patternData.pattern === 0 
                    ? 'bg-green-200 text-green-800 border-2 border-green-400' 
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {num}
              </div>
            ))}
          </div>
        </div>

        {/* Answer Options */}
        {!showResult ? (
          <div>
            <h3 className="text-xl font-semibold text-center text-gray-700 mb-6">
              Choose the missing number:
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {currentQuestion?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => checkAnswer(option)}
                  className={`p-6 rounded-xl font-bold text-2xl transition-all transform hover:scale-105 shadow-md ${patternData.buttonColor} text-white`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className={`text-6xl mb-4 ${isCorrect ? 'animate-bounce' : ''}`}>
              {isCorrect ? '🎉' : '💪'}
            </div>
            <h3 className={`text-2xl font-bold mb-4 ${isCorrect ? 'text-green-600' : 'text-orange-600'}`}>
              {isCorrect ? 'Excellent!' : 'Good try!'}
            </h3>
            <p className="text-lg text-gray-700">
              {isCorrect 
                ? `Correct! The missing number is ${currentQuestion.correctAnswer}` 
                : `The correct answer was ${currentQuestion.correctAnswer}`
              }
            </p>
            <div className="mt-4 text-gray-600">
              Pattern: {currentQuestion.sequence.map(n => n === '?' ? currentQuestion.correctAnswer : n).join(' → ')}
            </div>
          </div>
        )}
      </div>

      {/* Game Controls */}
      <div className="text-center">
        <button
          onClick={resetGame}
          className="bg-gray-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-600 transition-colors"
        >
          🔄 New Game
        </button>
      </div>
    </div>
  );
}
