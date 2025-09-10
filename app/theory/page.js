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
    { name: 'Addition Basics', description: 'Learn to add numbers with fun visuals!', component: 'addition', emoji: '➕', color: 'from-red-200 to-pink-300' },
    { name: 'Subtraction Basics', description: 'Learn to subtract numbers with interactive games!', component: 'subtraction', emoji: '➖', color: 'from-blue-200 to-cyan-300' },
    { name: 'Counting', description: 'Count objects and numbers like a pro!', component: 'counting', emoji: '🔢', color: 'from-green-200 to-emerald-300' },
    { name: 'Shapes', description: 'Identify basic shapes in the world around you!', component: 'shapes', emoji: '🔺', color: 'from-yellow-200 to-orange-300' },
  ],
  2: [
    { name: 'Two-digit Addition', description: 'Add larger numbers with confidence!', component: 'addition2', emoji: '🧮', color: 'from-purple-200 to-violet-300' },
    { name: 'Two-digit Subtraction', description: 'Master subtracting larger numbers!', component: 'subtraction2', emoji: '📝', color: 'from-indigo-200 to-blue-300' },
    { name: 'Time Telling', description: 'Read clocks and understand time!', component: 'time', emoji: '⏰', color: 'from-teal-200 to-cyan-300' },
    { name: 'Money Basics', description: 'Count coins and bills like a banker!', component: 'money', emoji: '💰', color: 'from-lime-200 to-green-300' },
  ],
  3: [
    { name: 'Multiplication', description: 'Learn multiplication tables with tricks!', component: 'multiplication', emoji: '✖️', color: 'from-rose-200 to-pink-300' },
    { name: 'Division', description: 'Divide numbers evenly and fairly!', component: 'division', emoji: '➗', color: 'from-amber-200 to-yellow-300' },
    { name: 'Fractions', description: 'Understand parts of wholes with pizza!', component: 'fractions', emoji: '🍕', color: 'from-emerald-200 to-teal-300' },
    { name: 'Measurement', description: 'Measure length and weight like a scientist!', component: 'measurement', emoji: '📏', color: 'from-sky-200 to-blue-300' },
  ],
  4: [
    { name: 'Long Division', description: 'Divide larger numbers step by step!', component: 'longdivision', emoji: '📊', color: 'from-violet-200 to-purple-300' },
    { name: 'Decimals', description: 'Work with decimal numbers and points!', component: 'decimals', emoji: '🔸', color: 'from-fuchsia-200 to-pink-300' },
    { name: 'Area & Perimeter', description: 'Calculate space and borders!', component: 'areaperim', emoji: '📐', color: 'from-orange-200 to-red-300' },
    { name: 'Data & Graphs', description: 'Read and create amazing graphs!', component: 'graphs', emoji: '📈', color: 'from-cyan-200 to-teal-300' },
  ],
  5: [
    { name: 'Advanced Fractions', description: 'Add and subtract fractions like a chef!', component: 'advfractions', emoji: '🥧', color: 'from-pink-200 to-rose-300' },
    { name: 'Percentages', description: 'Understand percentages and discounts!', component: 'percentages', emoji: '💯', color: 'from-green-200 to-lime-300' },
    { name: 'Volume', description: 'Calculate 3D space and containers!', component: 'volume', emoji: '📦', color: 'from-blue-200 to-indigo-300' },
    { name: 'Coordinate Planes', description: 'Plot points on graphs like a navigator!', component: 'coordinates', emoji: '🗺️', color: 'from-yellow-200 to-amber-300' },
  ],
  6: [
    { name: 'Ratios & Proportions', description: 'Compare quantities and ratios!', component: 'ratios', emoji: '⚖️', color: 'from-teal-200 to-cyan-300' },
    { name: 'Integers', description: 'Work with negative numbers and zero!', component: 'integers', emoji: '🌡️', color: 'from-red-200 to-orange-300' },
    { name: 'Basic Algebra', description: 'Solve for unknowns and mysteries!', component: 'algebra', emoji: '🔍', color: 'from-purple-200 to-violet-300' },
    { name: 'Does x Satisfy an Equation?', description: 'Learn how to check if x satisfies an equation!', component: 'doesXSatisfyEquation', emoji: '❓', color: 'from-emerald-200 to-green-300' },
    { name: 'Parallel Lines', description: 'Learn about parallel lines and transversals!', component: 'parallel', emoji: '📏', color: 'from-blue-200 to-sky-300' },
    { name: 'Statistics', description: 'Analyze data sets like a detective!', component: 'statistics', emoji: '🕵️', color: 'from-pink-200 to-fuchsia-300' },
  ],
  7: [
    { name: 'Two-dimensional Figures', description: 'Theory and interactive practice on polygons, triangles, quadrilaterals, circles!', component: 'twoDimFigures', emoji: '🔷', color: 'from-indigo-200 to-purple-300' },
    { name: 'Adding Three or More Integers', description: 'Master adding multiple integers with properties and strategies!', component: 'addingIntegers', emoji: '🧠', color: 'from-cyan-200 to-blue-300' },
    { name: 'Advanced Algebra', description: 'Solve complex equations like a mathematician!', component: 'advancedalgebra', emoji: '🎯', color: 'from-rose-200 to-pink-300' },
    { name: 'Geometry Proofs', description: 'Learn geometric reasoning and proofs!', component: 'proofs', emoji: '📐', color: 'from-lime-200 to-green-300' },
    { name: 'JMC Survival Kit', description: 'Olympiad math formulas and mini-tools!', component: 'jmc', emoji: '🏆', color: 'from-amber-200 to-yellow-300' },
  ],
  8: [
    { name: 'Functions', description: 'Understand mathematical functions and graphs!', component: 'functions', emoji: '📊', color: 'from-emerald-200 to-teal-300' },
    { name: 'Quadratic Equations', description: 'Solve quadratic problems with confidence!', component: 'quadratics', emoji: '⚡', color: 'from-violet-200 to-purple-300' },
    { name: 'JMC Survival Kit', description: 'Olympiad math formulas and mini-tools!', component: 'jmc', emoji: '🏆', color: 'from-amber-200 to-yellow-300' },
  ],
  9: [
    { name: 'Polynomials', description: 'Work with polynomial expressions!', component: 'polynomials', emoji: '🌟', color: 'from-fuchsia-200 to-pink-300' },
    { name: 'Trigonometry Basics', description: 'Introduction to trig functions!', component: 'trigonometry', emoji: '📐', color: 'from-sky-200 to-blue-300' },
    { name: 'JMC Survival Kit', description: 'Olympiad math formulas and mini-tools!', component: 'jmc', emoji: '🏆', color: 'from-amber-200 to-yellow-300' },
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
        <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 rounded-3xl p-8 text-center border-4 border-purple-300 shadow-2xl">
          <div className="text-6xl mb-4 animate-bounce">🏆</div>
          <h4 className="text-3xl font-bold text-purple-800 mb-4" style={{fontFamily: 'Fredoka One, cursive'}}>JMC 2024 Survival Kit</h4>
          <p className="text-lg text-purple-600 mb-6">Complete Olympiad math toolkit with formulas, mini-tools, and practice drills!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/jmc" 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
              style={{fontFamily: 'Fredoka One, cursive'}}
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
    <div className="relative z-10 max-w-5xl mx-auto mt-2 sm:mt-4 md:mt-6 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border-4 border-purple-200">
    <div className="text-center mb-6 sm:mb-8">
      <div className="text-6xl sm:text-7xl md:text-8xl mb-4 animate-bounce">📘</div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-800 mb-2" style={{fontFamily: 'Fredoka One, cursive'}}>Learning Theory</h1>
      <p className="text-base sm:text-lg md:text-xl text-purple-600 font-medium">Choose your grade and topic to start your amazing learning journey! ✨</p>
    </div>
        
        {!selectedGrade ? (
          /* Grade Selection */
          <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-purple-700 mb-6 sm:mb-8 text-center" style={{fontFamily: 'Fredoka One, cursive'}}>
        🎓 Select Your Grade Level 🎓
      </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
              {[
                { grade: 1, emoji: '🌱', color: 'from-green-100 via-lime-100 to-emerald-100', hoverColor: 'hover:from-green-200 hover:via-lime-200 hover:to-emerald-200' },
                { grade: 2, emoji: '🌸', color: 'from-pink-100 via-rose-100 to-red-100', hoverColor: 'hover:from-pink-200 hover:via-rose-200 hover:to-red-200' },
                { grade: 3, emoji: '🌟', color: 'from-yellow-100 via-amber-100 to-orange-100', hoverColor: 'hover:from-yellow-200 hover:via-amber-200 hover:to-orange-200' },
                { grade: 4, emoji: '🚀', color: 'from-blue-100 via-sky-100 to-cyan-100', hoverColor: 'hover:from-blue-200 hover:via-sky-200 hover:to-cyan-200' },
                { grade: 5, emoji: '🎯', color: 'from-purple-100 via-violet-100 to-indigo-100', hoverColor: 'hover:from-purple-200 hover:via-violet-200 hover:to-indigo-200' },
                { grade: 6, emoji: '🏆', color: 'from-amber-100 via-yellow-100 to-lime-100', hoverColor: 'hover:from-amber-200 hover:via-yellow-200 hover:to-lime-200' },
                { grade: 7, emoji: '🧮', color: 'from-teal-100 via-cyan-100 to-blue-100', hoverColor: 'hover:from-teal-200 hover:via-cyan-200 hover:to-blue-200' },
                { grade: 8, emoji: '⚡', color: 'from-purple-100 via-fuchsia-100 to-pink-100', hoverColor: 'hover:from-purple-200 hover:via-fuchsia-200 hover:to-pink-200' },
                { grade: 9, emoji: '🎓', color: 'from-indigo-100 via-purple-100 to-violet-100', hoverColor: 'hover:from-indigo-200 hover:via-purple-200 hover:to-violet-200' }
              ].map(gradeData => (
                <button
                  key={gradeData.grade}
          className={`group bg-gradient-to-br ${gradeData.color} ${gradeData.hoverColor} text-purple-700 font-bold text-lg sm:text-xl p-6 sm:p-8 rounded-3xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1 shadow-lg hover:shadow-2xl border-4 border-purple-200 hover:border-purple-400`}
                  onClick={() => setSelectedGrade(gradeData.grade)}
          style={{fontFamily: 'Fredoka One, cursive'}}
                >
          <div className="text-4xl sm:text-5xl mb-2 group-hover:animate-bounce transition-all duration-300">{gradeData.emoji}</div>
          <div className="text-xl sm:text-2xl group-hover:text-purple-800 transition-colors">Grade {gradeData.grade}</div>
          <div className="text-xs sm:text-sm text-purple-500 mt-1 opacity-75 group-hover:opacity-100">Click to explore!</div>
                </button>
              ))}
            </div>
          </div>
        ) : !selectedTopic ? (
          /* Topic Selection */
          <div>
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-purple-700 text-center" style={{fontFamily: 'Fredoka One, cursive'}}>
          🌟 Grade {selectedGrade} Learning Adventures 🌟
        </h2>
              <button
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-3xl font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-lg"
          style={{fontFamily: 'Fredoka One, cursive'}}
                onClick={() => setSelectedGrade(null)}
              >
                ← Back to Grades
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {theoryTopics[selectedGrade].map(topic => (
                <div
                  key={topic.name}
          className={`group bg-gradient-to-br ${topic.color} p-6 sm:p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border-4 border-white hover:border-purple-300 transform hover:scale-105 hover:-rotate-1`}
                  onClick={() => setSelectedTopic(topic)}
                >
          <div className="flex items-start gap-4">
            <div className="text-4xl sm:text-5xl group-hover:animate-bounce transition-all duration-300 flex-shrink-0">
              {topic.emoji}
            </div>
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-800 transition-colors" style={{fontFamily: 'Fredoka One, cursive'}}>
                {topic.name}
              </h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed group-hover:text-gray-800 transition-colors">
                {topic.description}
              </p>
              <div className="mt-3 inline-flex items-center text-xs sm:text-sm font-medium text-purple-600 bg-white/70 px-3 py-1 rounded-full group-hover:bg-white group-hover:text-purple-700 transition-all">
                🚀 Start Learning
              </div>
            </div>
          </div>
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
