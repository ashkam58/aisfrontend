"use client";
import React, { useState, useEffect, useRef } from "react";

const WORDS = [
  "polygon", "olympiad", "subtraction", "geometry", "probability", "logic", "unit square", "parity", "consecutive", "fraction", "rhombus", "heron", "triangle", "integer", "modulo", "sum", "product", "liar", "truth", "side", "angle"
];

function getRandomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

const TypingGame = () => {
  const [currentWord, setCurrentWord] = useState(getRandomWord());
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [feedback, setFeedback] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentWord]);

  useEffect(() => {
    let timer;
    if (startTime) {
      timer = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 100);
    }
    return () => clearInterval(timer);
  }, [startTime]);

  const handleChange = (e) => {
    setUserInput(e.target.value);
    if (!startTime) setStartTime(Date.now());
    if (e.target.value === currentWord) {
      setScore(score + 1);
      setFeedback(`Great! Time: ${elapsed}s`);
      setTimeout(() => {
        setCurrentWord(getRandomWord());
        setUserInput("");
        setStartTime(null);
        setElapsed(0);
        setFeedback("");
      }, 800);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg text-center">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Typing Game</h2>
      <p className="mb-2 text-lg">Type the word below as fast as you can!</p>
      <div className="text-3xl font-mono mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        {currentWord}
      </div>
      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={handleChange}
        className="w-full px-4 py-2 text-xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        placeholder="Start typing..."
        autoComplete="off"
      />
      <div className="mb-2 text-green-700 font-semibold">{feedback}</div>
      <div className="flex justify-between text-lg mt-4">
        <span>Score: <span className="font-bold">{score}</span></span>
        <span>Time: <span className="font-bold">{elapsed}s</span></span>
      </div>
    </div>
  );
};

export default TypingGame;
