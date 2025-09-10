import React from 'react';

const DoesXSatisfyEquationTheory = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold text-purple-700 mb-4">Does x Satisfy an Equation?</h1>
      <p className="text-lg text-gray-700 mb-4">
        Welcome to the world of equations! Today, we're going to explore how to check if a value for <code>x</code> satisfies an equation. Don't worry, it's easier than you think. Let's dive in!
      </p>

      <h2 className="text-2xl font-semibold text-purple-600 mb-3">What Does It Mean?</h2>
      <p className="text-gray-700 mb-4">
        When we ask, "Does <code>x</code> satisfy an equation?", we're simply checking if the equation is true when we substitute a specific value for <code>x</code>. If the left-hand side equals the right-hand side after substitution, then <code>x</code> satisfies the equation. Otherwise, it doesn't.
      </p>

      <h2 className="text-2xl font-semibold text-purple-600 mb-3">Let's See an Example</h2>
      <p className="text-gray-700 mb-4">
        Imagine we have the equation:
      </p>
      <div className="bg-gray-100 p-4 rounded-md text-gray-800 mb-4 font-mono text-xl text-center">
        2x + 3 = 11
      </div>
      <p className="text-gray-700 mb-4">
        Now, let's check if <code>x = 4</code> satisfies this equation. To do this, we substitute <code>4</code> for <code>x</code>:
      </p>
      <div className="bg-gray-100 p-4 rounded-md text-gray-800 mb-4 font-mono text-xl text-center">
        2(4) + 3 = 8 + 3 = 11
      </div>
      <p className="text-gray-700 mb-4">
        The left-hand side equals the right-hand side, so <code>x = 4</code> satisfies the equation. 🎉
      </p>

      <h2 className="text-2xl font-semibold text-purple-600 mb-3">Another Example</h2>
      <p className="text-gray-700 mb-4">
        Let's try another one. Does <code>x = 3</code> satisfy the equation <code>x + 5 = 7</code>?
      </p>
      <div className="bg-gray-100 p-4 rounded-md text-gray-800 mb-4 font-mono text-xl text-center">
        3 + 5 = 8
      </div>
      <p className="text-gray-700 mb-4">
        The left-hand side gives us 8, but the right-hand side is 7. Since 8 ≠ 7, <code>x = 3</code> does NOT satisfy this equation.
      </p>

      <h2 className="text-2xl font-semibold text-purple-600 mb-3">Step-by-Step Process</h2>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="font-bold text-blue-800 mb-2">Step 1: Substitute</h3>
          <p className="text-blue-700 text-sm">Replace the variable with the given number in the equation.</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="font-bold text-green-800 mb-2">Step 2: Simplify</h3>
          <p className="text-green-700 text-sm">Calculate the value of each side of the equation separately.</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h3 className="font-bold text-purple-800 mb-2">Step 3: Compare</h3>
          <p className="text-purple-700 text-sm">Check if both sides are equal. If yes, the value satisfies the equation!</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-purple-600 mb-3">Try It Yourself!</h2>
      <p className="text-gray-700 mb-4">
        Here's an equation for you to practice with:
      </p>
      <div className="bg-yellow-100 p-4 rounded-md text-gray-800 mb-4 font-mono text-xl text-center border border-yellow-300">
        3x - 5 = 10
      </div>
      <p className="text-gray-700 mb-4">
        Does <code>x = 5</code> satisfy this equation? Follow the steps and find out! 
      </p>
      <details className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
        <summary className="cursor-pointer font-semibold text-green-800">Click to see the solution</summary>
        <div className="mt-3 text-green-700">
          <p><strong>Step 1:</strong> Substitute x = 5: 3(5) - 5 = 10</p>
          <p><strong>Step 2:</strong> Simplify: 15 - 5 = 10</p>
          <p><strong>Step 3:</strong> Compare: 10 = 10 ✓</p>
          <p className="font-bold">Yes! x = 5 satisfies the equation.</p>
        </div>
      </details>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="text-blue-800">
          <strong>Remember:</strong> Equations are like puzzles, and you're the solver. Keep practicing, and soon you'll be a pro at figuring out if <code>x</code> satisfies an equation. 🚀
        </p>
      </div>
    </div>
  );
};

export default DoesXSatisfyEquationTheory;
