import React, { useState } from 'react';
import Link from 'next/link';
import './subtract-integers-b6.css';

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function generateQuestion() {
  const a = getRandomInt(-10, 10);
  const b = getRandomInt(-10, 10);
  return { a, b, answer: a - b };
}

const SubtractIntegersGameB6 = () => {
  const [question, setQuestion] = useState(generateQuestion());
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showCounters, setShowCounters] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(userAnswer) === question.answer) {
      setFeedback('🎉 Correct! You are a subtraction superhero!');
      setTimeout(() => {
        setQuestion(generateQuestion());
        setUserAnswer('');
        setFeedback('');
        setShowCounters(false);
      }, 1500);
    } else {
      setFeedback('😅 Oops! Try again. Use the counters for help!');
      setShowCounters(true);
    }
  };

  return (
    <div className="comic-game-container">
      <h1 className="comic-title">🎮 Subtract Integers Game (IXL B.6)</h1>
      <p className="comic-desc">Subtract with integers using counters! Enter your answer and use the counter tool for help.</p>
      <form onSubmit={handleSubmit} className="comic-form">
        <div className="comic-question">
          <span className="comic-question-text">What is {question.a} - ({question.b})?</span>
        </div>
        <input
          type="number"
          value={userAnswer}
          onChange={e => setUserAnswer(e.target.value)}
          className="comic-input"
          placeholder="Your answer..."
        />
        <button type="submit" className="comic-btn">Submit</button>
      </form>
      {feedback && <div className="comic-feedback">{feedback}</div>}
      {showCounters && (
        <div className="comic-counters">
          <h2 className="comic-subtitle">Counter Tool</h2>
          <div className="counters-row">
            <span>Start: {question.a >= 0 ? `${question.a} 🟦` : `${-question.a} 🟥`}</span>
            <span>Subtract: {question.b >= 0 ? `${question.b} 🟦 removed` : `${-question.b} 🟥 added`}</span>
            <span>Result: {question.answer >= 0 ? `${question.answer} 🟦` : `${-question.answer} 🟥`}</span>
          </div>
        </div>
      )}
      <Link href="/theory/subtract-integers-b6" className="comic-link">📚 Back to Theory</Link>
    </div>
  );
};

export default SubtractIntegersGameB6;
