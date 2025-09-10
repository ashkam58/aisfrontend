'use client'
import { useState, useCallback, useEffect, useRef } from 'react';
import InteractiveSubtraction from '../../components/InteractiveSubtraction';
import ParallelLinesTheory from '../../components/ParallelLinesTheory';
import DrawingOverlay from '../../components/DrawingOverlay';
import KartMath from '../../components/KartMath';
import Link from 'next/link';
import DoesXSatisfyEquationTheory from '../../theory/DoesXSatisfyEquation';
import AddingThreeOrMoreIntegersTheory from '../../components/AddingThreeOrMoreIntegersTheory';
import TwoDFiguresLab from '../../components/twoDimensionalFigures';

const theoryTopics = {
  1: [
    { name: 'Addition Basics', description: 'Learn to add numbers', component: 'addition' },
    { name: 'Subtraction Basics', description: 'Learn to subtract numbers', component: 'subtraction' },
    { name: 'Counting', description: 'Count objects and numbers', component: 'counting' },
    { name: 'Shapes', description: 'Identify basic shapes', component: 'shapes' },
  ],
  2: [
    { name: 'Two-digit Addition', description: 'Add larger numbers', component: 'addition2' },
    { name: 'Two-digit Subtraction', description: 'Subtract larger numbers', component: 'subtraction2' },
    { name: 'Time Telling', description: 'Read clocks and time', component: 'time' },
    { name: 'Money Basics', description: 'Count coins and bills', component: 'money' },
  ],
  3: [
    { name: 'Multiplication', description: 'Learn multiplication tables', component: 'multiplication' },
    { name: 'Division', description: 'Divide numbers evenly', component: 'division' },
    { name: 'Fractions', description: 'Understand parts of wholes', component: 'fractions' },
    { name: 'Measurement', description: 'Measure length and weight', component: 'measurement' },
  ],
  4: [
    { name: 'Long Division', description: 'Divide larger numbers', component: 'longdivision' },
    { name: 'Decimals', description: 'Work with decimal numbers', component: 'decimals' },
    { name: 'Area & Perimeter', description: 'Calculate area and perimeter', component: 'areaperim' },
    { name: 'Data & Graphs', description: 'Read and create graphs', component: 'graphs' },
  ],
  5: [
    { name: 'Advanced Fractions', description: 'Add and subtract fractions', component: 'advfractions' },
    { name: 'Percentages', description: 'Understand percentages', component: 'percentages' },
    { name: 'Volume', description: 'Calculate 3D space', component: 'volume' },
    { name: 'Coordinate Planes', description: 'Plot points on graphs', component: 'coordinates' },
  ],
  6: [
    { name: 'Ratios & Proportions', description: 'Compare quantities', component: 'ratios' },
    { name: 'Integers', description: 'Work with negative numbers', component: 'integers' },
    { name: 'Basic Algebra', description: 'Solve for unknowns', component: 'algebra' },
    { name: 'Does x Satisfy an Equation?', description: 'Learn how to check if x satisfies an equation', component: 'doesXSatisfyEquation' },
    { name: 'Parallel Lines', description: 'Learn about parallel lines and transversals', component: 'parallel' },
    { name: 'Statistics', description: 'Analyze data sets', component: 'statistics' },
  ],
  7: [
    { name: 'Two-dimensional Figures', description: 'Theory and interactive practice on polygons, triangles, quadrilaterals, circles', component: 'twoDimFigures' },
    { name: 'Adding Three or More Integers', description: 'Master adding multiple integers with properties and strategies', component: 'addingIntegers' },
    { name: 'Advanced Algebra', description: 'Solve complex equations', component: 'advancedalgebra' },
    { name: 'Geometry Proofs', description: 'Learn geometric reasoning', component: 'proofs' },
    { name: 'JMC Survival Kit', description: 'Olympiad math formulas and mini-tools', component: 'jmc' },
  ],
  8: [
    { name: 'Functions', description: 'Understand mathematical functions', component: 'functions' },
    { name: 'Quadratic Equations', description: 'Solve quadratic problems', component: 'quadratics' },
    { name: 'JMC Survival Kit', description: 'Olympiad math formulas and mini-tools', component: 'jmc' },
  ],
  9: [
    { name: 'Polynomials', description: 'Work with polynomial expressions', component: 'polynomials' },
    { name: 'Trigonometry Basics', description: 'Introduction to trig functions', component: 'trigonometry' },
    { name: 'JMC Survival Kit', description: 'Olympiad math formulas and mini-tools', component: 'jmc' },
  ],
};

export default function TheoryPage() {
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showDrawingOverlay, setShowDrawingOverlay] = useState(false);
  const containerRef = useRef(null);

  const renderTopicContent = () => {
    let topicComponent = null;

    if (selectedTopic?.component === 'subtraction') {
      topicComponent = <InteractiveSubtraction />;
    } else if (selectedTopic?.component === 'parallel') {
      topicComponent = <ParallelLinesTheory />;
    } else if (selectedTopic?.component === 'kartmath') {
      topicComponent = <KartMath />;
    } else if (selectedTopic?.component === 'addingIntegers') {
      topicComponent = <AddingThreeOrMoreIntegersTheory />;
    } else if (selectedTopic?.component === 'twoDimFigures') {
      topicComponent = <TwoDFiguresLab />;
    } else if (selectedTopic?.component === 'jmc') {
      topicComponent = (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-cartoon p-6 text-center">
          <h4 className="text-2xl font-cartoon text-purple-700 mb-4">🏆 JMC 2024 Survival Kit</h4>
          <p className="text-purple-600 mb-6">Complete Olympiad math toolkit with formulas, mini-tools, and practice drills!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/jmc" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-lg"
            >
              🚀 Open Full Survival Kit
            </Link>
            <Link 
              href="/jmc2024/index.html" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-lg"
            >
              🧮 Mini Calculator Tool
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            <div className="bg-white/80 rounded-lg p-4">
              <h5 className="font-bold text-purple-700 mb-2">📐 Geometry</h5>
              <p className="text-sm text-purple-600">Interior angles, area formulas, Pythagoras</p>
            </div>
            <div className="bg-white/80 rounded-lg p-4">
              <h5 className="font-bold text-purple-700 mb-2">🔢 Numbers</h5>
              <p className="text-sm text-purple-600">BODMAS, parity, remainders, divisibility</p>
            </div>
            <div className="bg-white/80 rounded-lg p-4">
              <h5 className="font-bold text-purple-700 mb-2">🎯 Combinatorics</h5>
              <p className="text-sm text-purple-600">Grid paths, probability, inclusion-exclusion</p>
            </div>
            <div className="bg-white/80 rounded-lg p-4">
              <h5 className="font-bold text-purple-700 mb-2">🧠 Logic</h5>
              <p className="text-sm text-purple-600">Knights/Knaves, word problems, ratios</p>
            </div>
          </div>
        </div>
      );
    } else if (selectedTopic?.component === 'doesXSatisfyEquation') {
      topicComponent = <DoesXSatisfyEquationTheory />;
    } else {
      topicComponent = (
        <div className="bg-purple-50 rounded-cartoon p-6 text-center">
          <h4 className="text-xl font-cartoon text-purple-700 mb-4">{selectedTopic?.name}</h4>
          <p className="text-purple-600 mb-4">{selectedTopic?.description}</p>
          <p className="text-purple-500">Interactive content for this topic coming soon!</p>
        </div>
      );
    }

    return (
      <div className="relative">
        {/* Sticky Drawing Toggle Button */}
        <button
          onClick={() => setShowDrawingOverlay(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          title="Open Drawing Overlay"
        >
          🎨
        </button>

        {/* Main Content */}
        <div className="w-full">
          {topicComponent}
        </div>

        {/* Drawing Overlay */}
        <DrawingOverlay
          isOpen={showDrawingOverlay}
          onClose={() => setShowDrawingOverlay(false)}
          topicName={selectedTopic?.name}
        />
      </div>
    );
  };

  return (
    <>
    <div className="relative z-10 max-w-4xl mx-auto mt-6 sm:mt-8 md:mt-12 bg-white/90 rounded-cartoon shadow-lg p-4 sm:p-6 md:p-8 backdrop-blur">
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-cartoon text-purple-800 mb-1 text-center">📘 Learning Theory</h1>
    <p className="text-sm sm:text-base md:text-lg text-purple-600 mb-6 sm:mb-8 text-center">Choose your grade and topic to start learning! ✨</p>
        
        {!selectedGrade ? (
          /* Grade Selection */
          <div>
      <h2 className="text-xl sm:text-2xl font-cartoon text-purple-700 mb-4 sm:mb-6 text-center">Select Your Grade 🎓</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {[1,2,3,4,5,6,7,8,9].map(grade => (
                <button
                  key={grade}
          className="bg-gradient-to-br from-purple-100 to-blue-100 hover:from-purple-200 hover:to-blue-200 text-purple-700 font-cartoon text-lg sm:text-xl p-4 sm:p-6 rounded-cartoon transition shadow-md"
                  onClick={() => setSelectedGrade(grade)}
                >
          Grade {grade} 🎈
                </button>
              ))}
            </div>
          </div>
        ) : !selectedTopic ? (
          /* Topic Selection */
          <div>
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 gap-3">
        <h2 className="text-xl sm:text-2xl font-cartoon text-purple-700">Grade {selectedGrade} Topics ✏️</h2>
              <button
                className="bg-purple-500 text-white px-3 sm:px-4 py-2 rounded-cartoon font-cartoon hover:bg-purple-600 text-sm sm:text-base"
                onClick={() => setSelectedGrade(null)}
              >
                ← Back to Grades
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              {theoryTopics[selectedGrade].map(topic => (
                <div
                  key={topic.name}
          className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 sm:p-6 rounded-cartoon shadow-md hover:shadow-lg transition cursor-pointer border border-purple-200"
                  onClick={() => setSelectedTopic(topic)}
                >
          <h3 className="text-lg sm:text-xl font-cartoon text-purple-700 mb-2">{topic.name} 📚</h3>
          <p className="text-purple-600 text-sm sm:text-base">{topic.description}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Topic Content */
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3">
        <h2 className="text-lg sm:text-xl md:text-2xl font-cartoon text-purple-700">Grade {selectedGrade}: {selectedTopic.name} 🔍</h2>
              <button
                className="bg-purple-500 text-white px-3 sm:px-4 py-2 rounded-cartoon font-cartoon hover:bg-purple-600 text-sm sm:text-base"
                onClick={() => setSelectedTopic(null)}
              >
                ← Back to Topics
              </button>
            </div>
            <div className="mb-4 p-3 bg-blue-50 rounded-cartoon border border-blue-200">
              <p className="text-blue-700 text-xs sm:text-sm">
                📚 <strong>Learn & Draw:</strong> Study the topic and click the 🎨 button to open the drawing overlay for taking notes!
              </p>
            </div>
            {renderTopicContent()}
          </div>
        )}
      </div>
    </>
  );
}
