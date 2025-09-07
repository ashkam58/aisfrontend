"use client";
import React, { useState } from 'react';

const InteractiveSubtractionGuide = () => {
  const [step, setStep] = useState(0);
  const [userAnswer, setUserAnswer] = useState({ tens: '', ones: '' });
  const [feedback, setFeedback] = useState('');

  const problem = {
    minuend: 52,
    subtrahend: 28,
    difference: 24,
  };

  const steps = [
    {
      explanation: `Let's solve ${problem.minuend} - ${problem.subtrahend}. We start with the ones column: 2 - 8.`,
      visual: (
        <div className="grid grid-cols-2 gap-x-2 text-right">
          <span>5</span><span>2</span>
          <span>- 2</span><span>8</span>
        </div>
      )
    },
    {
      explanation: "Since 2 is smaller than 8, we can't subtract 8 from 2 directly. We need to 'borrow' from the tens place.",
      visual: (
        <div className="grid grid-cols-2 gap-x-2 text-right">
          <span className="text-red-500">5</span><span>2</span>
          <span>- 2</span><span>8</span>
        </div>
      )
    },
    {
      explanation: "We take 1 ten from the 5 tens, which leaves 4 tens. The 1 ten (10 ones) is added to the 2 ones, making it 12.",
      visual: (
        <div className="grid grid-cols-2 gap-x-2 text-right">
          <span><span className="text-red-500 line-through">5</span> <span className="text-green-500">4</span></span><span><span className="text-red-500 line-through">2</span> <span className="text-green-500">12</span></span>
          <span>- 2</span><span>8</span>
        </div>
      )
    },
    {
      explanation: "Now we can subtract the ones: 12 - 8 = 4.",
      visual: (
        <div className="grid grid-cols-2 gap-x-2 text-right">
          <span><span className="text-red-500 line-through">5</span> <span className="text-green-500">4</span></span><span><span className="text-green-500">12</span></span>
          <span>- 2</span><span>8</span>
          <div className="col-span-2 border-t border-black"></div>
          <span></span><span className="text-blue-600 font-bold">4</span>
        </div>
      )
    },
    {
      explanation: "Next, we subtract the tens: 4 - 2 = 2.",
      visual: (
        <div className="grid grid-cols-2 gap-x-2 text-right">
          <span><span className="text-red-500 line-through">5</span> <span className="text-green-500">4</span></span><span><span className="text-green-500">12</span></span>
          <span>- 2</span><span>8</span>
          <div className="col-span-2 border-t border-black"></div>
          <span className="text-blue-600 font-bold">2</span><span className="text-blue-600 font-bold">4</span>
        </div>
      )
    },
    {
      explanation: `So, ${problem.minuend} - ${problem.subtrahend} = ${problem.difference}. You've solved it!`,
      visual: (
        <div className="grid grid-cols-2 gap-x-2 text-right">
          <span>5</span><span>2</span>
          <span>- 2</span><span>8</span>
          <div className="col-span-2 border-t border-black"></div>
          <span className="font-bold text-green-600">{problem.difference.toString()[0]}</span><span className="font-bold text-green-600">{problem.difference.toString()[1]}</span>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-2xl p-8 mt-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Interactive Subtraction</h2>
      <div className="flex justify-center items-center bg-gray-100 p-6 rounded-lg mb-6">
        <div className="text-6xl font-mono">
          {steps[step].visual}
        </div>
      </div>
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6 min-h-[100px]">
        <p className="text-lg text-blue-800">{steps[step].explanation}</p>
      </div>
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          disabled={step === 0}
          className="px-6 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 transition-all"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={step === steps.length - 1}
          className="px-6 py-2 font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 disabled:bg-gray-300 transition-all"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InteractiveSubtractionGuide;
