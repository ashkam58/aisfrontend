'use client';
import { useState } from 'react';

export default function AddingThreeOrMoreIntegersTheory() {
  const [activeSection, setActiveSection] = useState('introduction');
  const [showExample, setShowExample] = useState(null);

  const sections = [
    { id: 'introduction', title: '📚 Introduction', emoji: '🎯' },
    { id: 'properties', title: '🔧 Properties of Addition', emoji: '⚙️' },
    { id: 'strategies', title: '💡 Strategies', emoji: '🧠' },
    { id: 'examples', title: '📝 Worked Examples', emoji: '✏️' },
    { id: 'practice', title: '🎮 Practice Tips', emoji: '🏆' }
  ];

  const examples = [
    {
      title: "Basic Addition (All Positive)",
      problem: "5 + 3 + 7 + 2",
      steps: [
        "Start with: 5 + 3 + 7 + 2",
        "Group in pairs: (5 + 3) + (7 + 2)",
        "Calculate pairs: 8 + 9",
        "Final answer: 17"
      ],
      strategy: "Group numbers that are easy to add mentally"
    },
    {
      title: "Mixed Integers (Positive and Negative)",
      problem: "8 + (-3) + 5 + (-2)",
      steps: [
        "Start with: 8 + (-3) + 5 + (-2)",
        "Group positives and negatives: (8 + 5) + [(-3) + (-2)]",
        "Calculate groups: 13 + (-5)",
        "Final answer: 8"
      ],
      strategy: "Separate positive and negative numbers first"
    },
    {
      title: "Four or More Integers",
      problem: "-4 + 7 + (-1) + 3 + (-5)",
      steps: [
        "Start with: -4 + 7 + (-1) + 3 + (-5)",
        "Group positives: 7 + 3 = 10",
        "Group negatives: (-4) + (-1) + (-5) = -10",
        "Combine: 10 + (-10) = 0"
      ],
      strategy: "Use grouping strategy for efficiency"
    },
    {
      title: "Using Zero Property",
      problem: "6 + 0 + (-2) + 4",
      steps: [
        "Start with: 6 + 0 + (-2) + 4",
        "Notice zero: 0 doesn't change the sum",
        "Simplify to: 6 + (-2) + 4",
        "Calculate: 4 + 4 = 8"
      ],
      strategy: "Zero is the additive identity"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-purple-800 mb-4">
          🧮 Adding Three or More Integers
        </h1>
        <p className="text-xl text-purple-600 mb-2">Grade 7 Mathematics Theory</p>
        <p className="text-gray-600">Master the art of adding multiple integers efficiently</p>
      </div>

      {/* Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeSection === section.id
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-purple-600 hover:bg-purple-100'
            }`}
          >
            {section.emoji} {section.title}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        
        {/* Introduction */}
        {activeSection === 'introduction' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">🎯 What Are We Learning?</h2>
            
            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">Key Concepts:</h3>
              <ul className="space-y-2 text-blue-800">
                <li>• <strong>Integer:</strong> Whole numbers including positives, negatives, and zero (...-2, -1, 0, 1, 2...)</li>
                <li>• <strong>Sum:</strong> The result when adding numbers together</li>
                <li>• <strong>Addends:</strong> The numbers being added together</li>
                <li>• <strong>Grouping:</strong> Organizing numbers to make calculations easier</li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-green-700 mb-3">Why Is This Important? 🤔</h3>
                <ul className="space-y-2 text-green-800">
                  <li>• Builds foundation for algebra</li>
                  <li>• Develops mental math skills</li>
                  <li>• Used in real-world calculations</li>
                  <li>• Prepares for more complex operations</li>
                </ul>
              </div>

              <div className="bg-orange-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-orange-700 mb-3">Real-World Examples 🌍</h3>
                <ul className="space-y-2 text-orange-800">
                  <li>• Temperature changes over a week</li>
                  <li>• Bank account transactions</li>
                  <li>• Sports score calculations</li>
                  <li>• Elevation changes on a hike</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Properties */}
        {activeSection === 'properties' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">⚙️ Properties of Addition</h2>
            
            <div className="grid gap-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                <h3 className="text-2xl font-semibold text-blue-700 mb-3">1️⃣ Commutative Property</h3>
                <p className="text-blue-800 mb-3"><strong>Rule:</strong> The order of addends doesn't change the sum</p>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-mono text-lg">a + b = b + a</p>
                  <p className="text-gray-600 mt-2">Example: 3 + 5 + 2 = 5 + 2 + 3 = 2 + 3 + 5 = 10</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                <h3 className="text-2xl font-semibold text-green-700 mb-3">2️⃣ Associative Property</h3>
                <p className="text-green-800 mb-3"><strong>Rule:</strong> How we group addends doesn't change the sum</p>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-mono text-lg">(a + b) + c = a + (b + c)</p>
                  <p className="text-gray-600 mt-2">Example: (2 + 3) + 4 = 2 + (3 + 4) = 9</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                <h3 className="text-2xl font-semibold text-purple-700 mb-3">3️⃣ Identity Property</h3>
                <p className="text-purple-800 mb-3"><strong>Rule:</strong> Adding zero doesn't change the value</p>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-mono text-lg">a + 0 = a</p>
                  <p className="text-gray-600 mt-2">Example: 5 + 0 + 3 + 0 = 5 + 3 = 8</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-xl border border-red-200">
                <h3 className="text-2xl font-semibold text-red-700 mb-3">4️⃣ Inverse Property</h3>
                <p className="text-red-800 mb-3"><strong>Rule:</strong> A number and its opposite add to zero</p>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-mono text-lg">a + (-a) = 0</p>
                  <p className="text-gray-600 mt-2">Example: 7 + (-7) + 5 = 0 + 5 = 5</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Strategies */}
        {activeSection === 'strategies' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">🧠 Smart Strategies</h2>
            
            <div className="grid gap-6">
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl">
                <h3 className="text-2xl font-semibold text-orange-700 mb-4">Strategy 1: Group by Sign 📊</h3>
                <div className="space-y-4">
                  <p className="text-orange-800">Separate positive and negative numbers, then combine each group.</p>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold">Example: -3 + 8 + (-5) + 2</p>
                    <p className="text-gray-600">Step 1: Positives: 8 + 2 = 10</p>
                    <p className="text-gray-600">Step 2: Negatives: (-3) + (-5) = -8</p>
                    <p className="text-gray-600">Step 3: Combine: 10 + (-8) = 2</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-xl">
                <h3 className="text-2xl font-semibold text-teal-700 mb-4">Strategy 2: Look for Pairs 👥</h3>
                <div className="space-y-4">
                  <p className="text-teal-800">Find numbers that add to 10, 0, or other friendly numbers.</p>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold">Example: 7 + 3 + (-4) + 4 + 6</p>
                    <p className="text-gray-600">Step 1: Find pairs: 7 + 3 = 10, (-4) + 4 = 0</p>
                    <p className="text-gray-600">Step 2: Simplify: 10 + 0 + 6 = 16</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
                <h3 className="text-2xl font-semibold text-pink-700 mb-4">Strategy 3: Left to Right with Running Total 🏃</h3>
                <div className="space-y-4">
                  <p className="text-pink-800">Add numbers one by one, keeping track of the running total.</p>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold">Example: 5 + (-2) + 3 + (-1)</p>
                    <p className="text-gray-600">5 → 5 + (-2) = 3 → 3 + 3 = 6 → 6 + (-1) = 5</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl">
                <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Strategy 4: Number Line Visualization 📏</h3>
                <div className="space-y-4">
                  <p className="text-indigo-800">Imagine moving along a number line: right for positive, left for negative.</p>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold">Example: 2 + 3 + (-5)</p>
                    <p className="text-gray-600">Start at 2 → move right 3 spaces (to 5) → move left 5 spaces (to 0)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Examples */}
        {activeSection === 'examples' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">✏️ Worked Examples</h2>
            
            <div className="grid gap-6">
              {examples.map((example, index) => (
                <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">{example.title}</h3>
                    <button
                      onClick={() => setShowExample(showExample === index ? null : index)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      {showExample === index ? 'Hide Steps' : 'Show Steps'}
                    </button>
                  </div>
                  
                  <div className="text-2xl font-bold text-center mb-4 bg-white p-4 rounded-lg">
                    {example.problem}
                  </div>

                  {showExample === index && (
                    <div className="space-y-3">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="font-semibold text-blue-700 mb-2">Strategy: {example.strategy}</p>
                      </div>
                      {example.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="bg-white p-3 rounded-lg border-l-4 border-blue-400">
                          <span className="font-semibold text-blue-600">Step {stepIndex + 1}:</span> {step}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Practice Tips */}
        {activeSection === 'practice' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">🏆 Practice Tips & Common Mistakes</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                  <h3 className="text-xl font-semibold text-green-700 mb-3">✅ Do This:</h3>
                  <ul className="space-y-2 text-green-800">
                    <li>• Use parentheses to group numbers clearly</li>
                    <li>• Check your work by adding in different orders</li>
                    <li>• Look for patterns and shortcuts</li>
                    <li>• Practice mental math with small numbers first</li>
                    <li>• Use the number line for visualization</li>
                    <li>• Group positive and negative numbers separately</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <h3 className="text-xl font-semibold text-blue-700 mb-3">💡 Pro Tips:</h3>
                  <ul className="space-y-2 text-blue-800">
                    <li>• Start with easier combinations (numbers that add to 10)</li>
                    <li>• Use the associative property to your advantage</li>
                    <li>• Remember: order doesn't matter!</li>
                    <li>• Look for opposites that cancel out</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                  <h3 className="text-xl font-semibold text-red-700 mb-3">❌ Avoid These Mistakes:</h3>
                  <ul className="space-y-2 text-red-800">
                    <li>• Forgetting to include negative signs</li>
                    <li>• Adding absolute values instead of considering signs</li>
                    <li>• Rushing through without double-checking</li>
                    <li>• Not using grouping strategies for efficiency</li>
                    <li>• Mixing up positive and negative results</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                  <h3 className="text-xl font-semibold text-yellow-700 mb-3">⚠️ Watch Out For:</h3>
                  <ul className="space-y-2 text-yellow-800">
                    <li>• Double negatives: -(-5) = +5</li>
                    <li>• Zero doesn't change the sum</li>
                    <li>• Order of operations in complex expressions</li>
                    <li>• Keeping track of signs when regrouping</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
              <h3 className="text-xl font-semibold text-purple-700 mb-3">🎯 Quick Self-Check Questions:</h3>
              <div className="space-y-2 text-purple-800">
                <p>1. Can you add these numbers in a different order and get the same answer?</p>
                <p>2. Did you group positive and negative numbers correctly?</p>
                <p>3. Does your final answer make sense?</p>
                <p>4. Can you solve it using a different strategy?</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation to Game */}
      <div className="mt-8 text-center">
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold mb-2">Ready to Practice? 🎮</h3>
          <p className="mb-4">Test your understanding with our interactive game!</p>
          <button
            onClick={() => window.location.href = '/games'}
            className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
          >
            Go to Adding Integers Game →
          </button>
        </div>
      </div>
    </div>
  );
}
