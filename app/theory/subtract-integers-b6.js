import React from 'react';
import Link from 'next/link';

const SubtractIntegersTheoryB6 = () => (
  <div className="comic-theory-container">
    <h1 className="comic-title">🦸‍♂️ Subtracting Integers (IXL B.6)</h1>
    <p className="comic-desc">Welcome to the world of integer subtraction! Here, superheroes use counters to solve problems and save the day. Let's learn how to subtract integers using fun, colorful counters and comic-style tips!</p>
    <div className="comic-section">
      <h2 className="comic-subtitle">How to Subtract Integers</h2>
      <ul className="comic-list">
        <li>Use counters: Red for negatives, blue for positives.</li>
        <li>Subtracting a positive means removing blue counters.</li>
        <li>Subtracting a negative means adding red counters.</li>
        <li>Combine counters to find the answer!</li>
      </ul>
      <div className="comic-example">
        <strong>Example:</strong> What is 5 - (-3)?<br/>
        <span>Start with 5 blue counters. Subtracting -3 means adding 3 red counters. Final answer: 8!</span>
      </div>
    </div>
    <Link href="/games/subtract-integers-b6" className="comic-link">🎮 Play the Subtract Integers Game!</Link>
  </div>
);

export default SubtractIntegersTheoryB6;
