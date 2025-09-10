// Interactive Theory: Two-dimensional Figures (Grade 7)
import React, { useState } from 'react';

const figures = [
  {
    title: 'Identify and classify polygons',
    question: 'Which of the following is a polygon?',
    options: ['Circle', 'Triangle', 'Ellipse', 'Line'],
    answer: 'Triangle',
    explanation: 'A polygon is a closed figure with straight sides. Triangle is a polygon.'
  },
  {
    title: 'Classify triangles',
    question: 'Which triangle has all sides equal?',
    options: ['Scalene', 'Isosceles', 'Equilateral', 'Right'],
    answer: 'Equilateral',
    explanation: 'An equilateral triangle has all sides equal.'
  },
  {
    title: 'Triangle inequality',
    question: 'Can a triangle have sides 2, 3, and 6 units?',
    options: ['Yes', 'No'],
    answer: 'No',
    explanation: 'The sum of any two sides must be greater than the third side.'
  },
  {
    title: 'Identify trapezoids',
    question: 'How many parallel sides does a trapezoid have?',
    options: ['1', '2', '3', '4'],
    answer: '1',
    explanation: 'A trapezoid has exactly one pair of parallel sides.'
  }
];

function InteractiveTheory() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const current = figures[step];

  function handleOption(option) {
    setSelected(option);
    setShowExplanation(true);
  }

  function nextStep() {
    setStep(step + 1);
    setSelected(null);
    setShowExplanation(false);
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Grade 7 Theory: Two-dimensional Figures</h2>
      <p className="mb-2 text-lg font-semibold">{current.title}</p>
      <p className="mb-4">{current.question}</p>
      <div className="mb-4">
        {current.options.map(option => (
          <button
            key={option}
            className={`mr-2 mb-2 px-4 py-2 rounded border ${selected === option ? 'bg-blue-200' : 'bg-gray-100'}`}
            onClick={() => handleOption(option)}
            disabled={showExplanation}
          >
            {option}
          </button>
        ))}
      </div>
      {showExplanation && (
        <div className="mb-4">
          <p className="font-semibold">Your answer: {selected}</p>
          <p className={selected === current.answer ? 'text-green-600' : 'text-red-600'}>
            {selected === current.answer ? 'Correct!' : 'Incorrect.'}
          </p>
          <p className="mt-2">{current.explanation}</p>
        </div>
      )}
      <button
        className="px-4 py-2 bg-green-500 text-white rounded"
        onClick={nextStep}
        disabled={step === figures.length - 1}
      >
        {step === figures.length - 1 ? 'End of Theory' : 'Next'}
      </button>
    </div>
  );
}

export default InteractiveTheory;
