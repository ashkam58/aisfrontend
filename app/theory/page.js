'use client'
import { useState, useCallback, useEffect, useRef } from 'react';
import InteractiveSubtraction from '../../components/InteractiveSubtraction';
import ParallelLinesTheory from '../../components/ParallelLinesTheory';
import DrawingCanvas from '../../components/DrawingCanvas';

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
    { name: 'Parallel Lines', description: 'Learn about parallel lines and transversals', component: 'parallel' },
    { name: 'Statistics', description: 'Analyze data sets', component: 'statistics' },
  ],
};

export default function TheoryPage() {
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [canvasWidth, setCanvasWidth] = useState(50); // Percentage of container width
  const [isResizing, setIsResizing] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const containerRef = useRef(null);

  // Resize functionality
  const handleMouseDown = (e) => {
    setIsResizing(true);
    e.preventDefault();
  };

  const handleMouseMove = useCallback((e) => {
    if (!isResizing || !containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;

    // Constrain between 30% and 70%
    const constrainedPercentage = Math.max(30, Math.min(70, percentage));
    setCanvasWidth(constrainedPercentage);
  }, [isResizing]);

  // Touch support for resize
  const handleTouchStart = (e) => {
    setIsResizing(true);
    e.preventDefault();
  };

  const handleTouchMove = useCallback((e) => {
    if (!isResizing || !containerRef.current) return;

    const touch = e.touches[0];
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const percentage = (x / rect.width) * 100;

    // Constrain between 30% and 70%
    const constrainedPercentage = Math.max(30, Math.min(70, percentage));
    setCanvasWidth(constrainedPercentage);
  }, [isResizing]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsResizing(false);
  }, []);

  // Add global mouse and touch event listeners for resize
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  const renderTopicContent = () => {
    let topicComponent = null;

    if (selectedTopic?.component === 'subtraction') {
      topicComponent = <InteractiveSubtraction />;
    } else if (selectedTopic?.component === 'parallel') {
      topicComponent = <ParallelLinesTheory />;
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
        {/* Sticky Canvas Toggle Button */}
        <button
          onClick={() => setShowCanvas(!showCanvas)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          title={showCanvas ? 'Hide Drawing Canvas' : 'Show Drawing Canvas'}
        >
          {showCanvas ? '✕' : '🎨'}
        </button>

        {/* Main Content */}
        <div
          ref={containerRef}
          className={`transition-all duration-500 ease-in-out ${
            showCanvas ? 'flex gap-4' : 'block'
          }`}
          style={{ cursor: isResizing ? 'col-resize' : 'default' }}
        >
        {/* Topic Content */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            showCanvas ? '' : 'w-full'
          }`}
          style={showCanvas ? { width: `${100 - canvasWidth}%` } : {}}
        >
          {topicComponent}
        </div>

        {/* Canvas Section - Only show when toggled */}
        {showCanvas && (
          <>
            {/* Resize Handle */}
            <div
              className={`relative w-1 bg-gradient-to-b from-purple-300 to-blue-300 rounded-full cursor-col-resize transition-all duration-200 hover:w-2 group ${
                isResizing ? 'w-2 bg-purple-500' : ''
              }`}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              style={{ cursor: 'col-resize', touchAction: 'none' }}
            >
              {/* Resize indicator */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {Math.round(canvasWidth)}% Canvas
              </div>
              <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-px bg-white/50"></div>
            </div>

            {/* Drawing Area */}
            <div
              className="transition-all duration-500 ease-in-out"
              style={{ width: `${canvasWidth}%` }}
            >
              <DrawingCanvas
                topicName={selectedTopic?.name}
                grade={selectedGrade}
                width={canvasWidth}
              />
            </div>
          </>
        )}
        </div>
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
              {[1,2,3,4,5,6].map(grade => (
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
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <p className="text-blue-700 text-xs sm:text-sm">
                  📚 <strong>Learn & Draw:</strong> Study the topic and click the 🎨 button to open the drawing canvas!
                </p>
                <button
                  onClick={() => setCanvasWidth(50)}
                  className="px-2 sm:px-3 py-1 bg-blue-500 text-white text-xs sm:text-sm rounded hover:bg-blue-600 transition-colors whitespace-nowrap"
                >
                  ↔️ Reset Layout
                </button>
              </div>
            </div>
            {renderTopicContent()}
          </div>
        )}
      </div>
    </>
  );
}
