'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';

// Educational arcade game combining pattern recognition, memory, and mental math.
// - A sequence of colored tiles is shown.
// - The player must repeat the sequence.
// - Higher levels introduce simple math problems that must be solved after the sequence.
// - Scoring is based on speed and accuracy, with increasing difficulty.

// Tile configuration
const TILE_COLORS = [
  'bg-red-500 hover:bg-red-600',
  'bg-green-500 hover:bg-green-600',
  'bg-blue-500 hover:bg-blue-600',
  'bg-yellow-400 hover:bg-yellow-500',
];

const GameStatus = {
  WATCHING: 'WATCHING', // The game is showing the sequence
  REPEATING: 'REPEATING', // The player is repeating the sequence
  MATH_PROMPT: 'MATH_PROMPT', // The player needs to solve a math problem
  FEEDBACK: 'FEEDBACK', // Showing feedback (correct/incorrect) before the next round
};

export default function ArcadeBrainGame({ initialDifficulty = 1 }) {
  const [sequence, setSequence] = useState([]);
  const [playerInput, setPlayerInput] = useState([]);
  const [highlightedTile, setHighlightedTile] = useState(null);
  const [level, setLevel] = useState(initialDifficulty);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [gameStatus, setGameStatus] = useState(GameStatus.WATCHING);
  const [message, setMessage] =useState({ text: 'Get ready...', color: 'text-gray-600' });
  const [mathPrompt, setMathPrompt] = useState(null); // { question, answer }
  const [mathAnswer, setMathAnswer] = useState('');

  const mathInputRef = useRef(null);

  // Function to generate a new round's sequence and math prompt
  const generateRound = useCallback(() => {
    setMessage({ text: 'Watch carefully!', color: 'text-indigo-600' });
    setPlayerInput([]);
    setMathPrompt(null);
    setMathAnswer('');
    setGameStatus(GameStatus.WATCHING);

    const sequenceLength = Math.min(3 + level, 9);
    const newSequence = Array.from({ length: sequenceLength }, () =>
      Math.floor(Math.random() * TILE_COLORS.length)
    );
    setSequence(newSequence);

    // Occasionally inject a math prompt
    if (level >= 2 && Math.random() < 0.4) {
      const a = Math.floor(Math.random() * (5 + level * 2)) + 1;
      const b = Math.floor(Math.random() * (3 + level)) + 1;
      const question = `${a} + ${b}`;
      const answer = a + b;
      setMathPrompt({ question, answer });
    }

    // Show the sequence to the player
    showSequence(newSequence);
  }, [level]);

  // Effect to start a new round when the level or round number changes
  useEffect(() => {
    const timeoutId = setTimeout(generateRound, 800);
    return () => clearTimeout(timeoutId);
  }, [level, round, generateRound]);
  
  // Effect to focus the math input when it appears
  useEffect(() => {
    if (gameStatus === GameStatus.MATH_PROMPT && mathInputRef.current) {
      mathInputRef.current.focus();
    }
  }, [gameStatus]);


  // Async function to display the sequence visually
  const showSequence = async (seq) => {
    await pause(500); // Initial pause
    for (let i = 0; i < seq.length; i++) {
      setHighlightedTile(seq[i]);
      const highlightDuration = Math.max(150, 500 - level * 25);
      await pause(highlightDuration);
      setHighlightedTile(null);
      await pause(highlightDuration / 2);
    }
    setGameStatus(GameStatus.REPEATING);
    setMessage({ text: 'Your turn!', color: 'text-gray-800' });
  };

  const handleTileClick = (index) => {
    if (gameStatus !== GameStatus.REPEATING) return;

    const newPlayerInput = [...playerInput, index];
    setPlayerInput(newPlayerInput);

    const currentPosition = newPlayerInput.length - 1;

    // Check for mistake
    if (sequence[currentPosition] !== index) {
      handleIncorrect('Oops! Wrong sequence.');
      return;
    }

    // Check for sequence completion
    if (newPlayerInput.length === sequence.length) {
      if (mathPrompt) {
        setGameStatus(GameStatus.MATH_PROMPT);
        setMessage({ text: `Sequence correct! Now, solve: ${mathPrompt.question}`, color: 'text-purple-700' });
      } else {
        handleCorrect('Great job!', 10 + level * 2);
      }
    }
  };

  const handleMathSubmit = (e) => {
    e.preventDefault();
    if (gameStatus !== GameStatus.MATH_PROMPT) return;
    
    const playerAnswer = parseInt(mathAnswer, 10);
    if (playerAnswer === mathPrompt.answer) {
        handleCorrect('Perfect! Sequence and math correct!', 15 + level * 3);
    } else {
        handleIncorrect(`Math was incorrect. The answer was ${mathPrompt.answer}.`);
    }
  }

  const handleCorrect = (msg, points) => {
    setMessage({ text: msg, color: 'text-green-600' });
    setScore(score + points);
    setGameStatus(GameStatus.FEEDBACK);

    // Advance level every 3 successful rounds
    if ((round + 1) % 4 === 0) {
      setLevel(level + 1);
      setMessage({ text: 'Level up!', color: 'text-yellow-500' });
    }
    setRound(round + 1);
  };
  
  const handleIncorrect = (msg) => {
    setMessage({ text: msg, color: 'text-red-600' });
    setScore(Math.max(0, score - 5)); // Penalty
    setGameStatus(GameStatus.FEEDBACK);
    setRound(round + 1); // Still go to next round
  };

  const resetGame = () => {
    setLevel(initialDifficulty);
    setScore(0);
    setRound(1);
    setGameStatus(GameStatus.FEEDBACK); // This will trigger the useEffect to start a new game
  };

  const pause = (ms) => new Promise((res) => setTimeout(res, ms));

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen font-sans">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
        <header className="flex items-center justify-between mb-4 border-b pb-3">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Arcade Brain</h1>
            <p className="text-sm text-gray-500">Level {level} • Round {round}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Score</div>
            <div className="text-2xl font-bold text-indigo-600">{score}</div>
          </div>
        </header>

        <main>
          <div className="grid grid-cols-2 gap-4 mb-4 h-64">
            {TILE_COLORS.map((color, i) => (
              <button
                key={i}
                onClick={() => handleTileClick(i)}
                disabled={gameStatus !== GameStatus.REPEATING}
                className={`rounded-xl shadow-md transition-all duration-150 ease-in-out transform
                  ${color}
                  ${highlightedTile === i ? 'scale-110 ring-4 ring-offset-2 ring-indigo-400' : 'scale-100'}
                  ${gameStatus !== GameStatus.REPEATING ? 'cursor-not-allowed opacity-70' : ''}`}
              />
            ))}
          </div>

          <div className="h-20 flex flex-col items-center justify-center bg-gray-50 rounded-lg p-2 text-center">
            {gameStatus === GameStatus.MATH_PROMPT ? (
              <form onSubmit={handleMathSubmit} className="flex items-center gap-2">
                 <p className="font-semibold text-gray-700">{mathPrompt.question} = </p>
                 <input 
                    ref={mathInputRef}
                    type="number" 
                    value={mathAnswer}
                    onChange={(e) => setMathAnswer(e.target.value)}
                    className="w-20 text-center text-lg font-bold p-2 border-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                 />
                 <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-500 text-white font-semibold shadow-sm hover:bg-indigo-600">
                    Go
                 </button>
              </form>
            ) : (
                <p className={`text-lg font-semibold transition-colors duration-300 ${message.color}`}>
                  {message.text}
                </p>
            )}
          </div>
        </main>
        
        <footer className="mt-4 pt-4 border-t">
            <button
                onClick={resetGame}
                className="w-full px-4 py-2 rounded-xl bg-emerald-500 text-white font-bold shadow-md hover:bg-emerald-600 transition-colors"
            >
                Reset Game
            </button>
        </footer>
      </div>
    </div>
  );
}
