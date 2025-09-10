import React, { useState } from 'react';

export function RealWorldShapesWidget({ addPoints }) {
  const [selectedShape, setSelectedShape] = useState(null);
  const [answered, setAnswered] = useState(false);
  
  const realWorldExamples = [
    { shape: "Triangle", examples: ["Roof of a house", "Slice of pizza", "Traffic yield sign"], image: "📐" },
    { shape: "Square", examples: ["Chess board", "Window frame", "Sticky notes"], image: "⬛" },
    { shape: "Circle", examples: ["Clock", "Wheel", "Full moon"], image: "⭕" },
    { shape: "Rectangle", examples: ["Door", "Television screen", "Book cover"], image: "📱" },
    { shape: "Pentagon", examples: ["Soccer ball panels", "U.S. Pentagon building", "School crossing sign"], image: "🏠" },
    { shape: "Hexagon", examples: ["Honeycomb", "Nuts and bolts", "Pencil cross-section"], image: "🐝" },
    { shape: "Octagon", examples: ["Stop sign", "Umbrella top-view", "Some mirrors"], image: "🛑" }
  ];

  const handleSelectShape = (shape) => {
    setSelectedShape(shape);
    if (!answered) {
      setAnswered(true);
      addPoints(5);
    }
  };

  return (
    <Section title="Shapes in real life">
      <p style={styles.lede}>
        Shapes are all around us! Click on a shape to see where you can find it in the real world.
      </p>
      
      <div style={styles.shapeGrid}>
        {realWorldExamples.map(item => (
          <div 
            key={item.shape}
            style={{
              ...styles.shapeCard,
              ...(selectedShape === item.shape ? styles.shapeCardSelected : {})
            }}
            onClick={() => handleSelectShape(item.shape)}
          >
            <div style={styles.shapeEmoji}>{item.image}</div>
            <div style={styles.shapeName}>{item.shape}</div>
          </div>
        ))}
      </div>
      
      {selectedShape && (
        <div style={styles.examplesCard}>
          <h3 style={styles.examplesTitle}>Where to find {selectedShape}s:</h3>
          <ul style={styles.examplesList}>
            {realWorldExamples.find(item => item.shape === selectedShape).examples.map((example, i) => (
              <li key={i} style={styles.exampleItem}>🔍 {example}</li>
            ))}
          </ul>
          <div style={styles.challengePrompt}>
            <span style={styles.challengeIcon}>🌟</span> 
            <span>Challenge: Can you find 3 more examples of {selectedShape}s in your home or classroom?</span>
          </div>
        </div>
      )}
    </Section>
  );
}

export function ShapesQuizWidget({ addPoints }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);
  
  const questions = [
    {
      question: "Which shape has exactly 3 sides?",
      options: ["Square", "Triangle", "Pentagon", "Circle"],
      answer: "Triangle",
      explanation: "A triangle has exactly 3 sides and 3 angles."
    },
    {
      question: "What is the sum of interior angles of a pentagon?",
      options: ["360°", "540°", "720°", "900°"],
      answer: "540°",
      explanation: "For a pentagon with 5 sides: (5-2) × 180° = 3 × 180° = 540°"
    },
    {
      question: "Which quadrilateral has exactly one pair of parallel sides?",
      options: ["Square", "Rectangle", "Trapezoid", "Rhombus"],
      answer: "Trapezoid",
      explanation: "A trapezoid has exactly one pair of parallel sides."
    },
    {
      question: "What is the angle in a regular octagon?",
      options: ["120°", "135°", "144°", "150°"],
      answer: "135°",
      explanation: "In a regular octagon, each interior angle is (8-2) × 180° ÷ 8 = 6 × 180° ÷ 8 = 135°"
    },
    {
      question: "Which shape can have only right angles?",
      options: ["Triangle", "Rectangle", "Pentagon", "Hexagon"],
      answer: "Rectangle",
      explanation: "A rectangle has 4 right angles (90° each)."
    }
  ];
  
  const handleAnswer = (answer) => {
    if (answered) return;
    
    setSelectedAnswer(answer);
    setAnswered(true);
    
    if (answer === questions[currentQuestion].answer) {
      setScore(score + 1);
      addPoints(10);
    }
  };
  
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswered(false);
      setSelectedAnswer(null);
    } else {
      setQuizComplete(true);
      if (score >= 4) {
        addPoints(20); // Bonus for excellent score
      }
    }
  };
  
  return (
    <Section title="Shape Quiz Challenge">
      {!quizComplete ? (
        <>
          <div style={styles.quizProgress}>
            Question {currentQuestion + 1} of {questions.length}
            <div style={styles.progressBarQuiz}>
              <div style={{...styles.progressFillQuiz, width: `${(currentQuestion + 1) * 100 / questions.length}%`}}></div>
            </div>
          </div>
          
          <div style={styles.questionCard}>
            <h3 style={styles.questionText}>{questions[currentQuestion].question}</h3>
            
            <div style={styles.optionsGrid}>
              {questions[currentQuestion].options.map(option => (
                <button
                  key={option}
                  style={{
                    ...styles.optionButton,
                    ...(selectedAnswer === option 
                      ? option === questions[currentQuestion].answer 
                        ? styles.correctOption 
                        : styles.incorrectOption
                      : {}),
                    ...(answered && option === questions[currentQuestion].answer ? styles.correctOption : {})
                  }}
                  onClick={() => handleAnswer(option)}
                  disabled={answered}
                >
                  {option}
                </button>
              ))}
            </div>
            
            {answered && (
              <div style={styles.explanationBox}>
                {selectedAnswer === questions[currentQuestion].answer 
                  ? <div style={styles.correctHeader}>✅ Correct!</div>
                  : <div style={styles.incorrectHeader}>❌ Not quite.</div>
                }
                <p>{questions[currentQuestion].explanation}</p>
              </div>
            )}
            
            {answered && (
              <button 
                style={styles.nextButton}
                onClick={nextQuestion}
              >
                {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
              </button>
            )}
          </div>
        </>
      ) : (
        <div style={styles.resultsCard}>
          <h3 style={styles.resultsTitle}>Quiz Complete!</h3>
          <div style={styles.scoreDisplay}>
            Your score: {score} out of {questions.length}
          </div>
          
          <div style={score >= 4 ? styles.excellentResult : score >= 3 ? styles.goodResult : styles.needPracticeResult}>
            {score >= 4 ? "Excellent! You're a geometry master! 🏆" : 
             score >= 3 ? "Good job! Keep practicing! 🌟" :
             "Keep learning and try again! 📚"}
          </div>
          
          <button
            style={styles.restartButton}
            onClick={() => {
              setCurrentQuestion(0);
              setScore(0);
              setAnswered(false);
              setSelectedAnswer(null);
              setQuizComplete(false);
            }}
          >
            Try Again
          </button>
        </div>
      )}
    </Section>
  );
}

// Style definitions to enhance the two-dimensional figures interactive component

export const additionalStyles = {
  shapeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
    gap: 12,
    marginBottom: 16
  },
  shapeCard: {
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: 12,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
  },
  shapeCardSelected: {
    borderColor: "#4f46e5",
    boxShadow: "0 0 0 2px rgba(79, 70, 229, 0.3)",
    transform: "translateY(-2px)"
  },
  shapeEmoji: {
    fontSize: 32,
    marginBottom: 8
  },
  shapeName: {
    fontWeight: "bold",
    color: "#334155"
  },
  examplesCard: {
    background: "#f8fafc",
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    border: "1px solid #e2e8f0"
  },
  examplesTitle: {
    margin: "0 0 12px",
    color: "#4338ca",
    fontSize: 18
  },
  examplesList: {
    margin: 0,
    padding: "0 0 0 12px"
  },
  exampleItem: {
    marginBottom: 8
  },
  challengePrompt: {
    marginTop: 16,
    padding: 12,
    background: "#e0f2fe",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    gap: 8
  },
  challengeIcon: {
    fontSize: 20
  },
  
  // Quiz styles
  quizProgress: {
    marginBottom: 16,
    color: "#4338ca",
    fontWeight: "bold"
  },
  progressBarQuiz: {
    height: 8,
    background: "#f1f5f9",
    borderRadius: 4,
    marginTop: 8,
    overflow: "hidden"
  },
  progressFillQuiz: {
    height: "100%",
    background: "linear-gradient(90deg, #4338ca, #3b82f6)",
    transition: "width 0.3s ease"
  },
  questionCard: {
    background: "white",
    borderRadius: 12,
    padding: 20,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    border: "1px solid #e2e8f0"
  },
  questionText: {
    fontSize: 20,
    margin: "0 0 20px",
    color: "#1e293b"
  },
  optionsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12
  },
  optionButton: {
    padding: "12px 16px",
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    fontSize: 16,
    cursor: "pointer",
    textAlign: "center",
    transition: "all 0.2s"
  },
  correctOption: {
    background: "#dcfce7",
    borderColor: "#10b981",
    color: "#166534"
  },
  incorrectOption: {
    background: "#fee2e2",
    borderColor: "#ef4444",
    color: "#991b1b"
  },
  explanationBox: {
    marginTop: 20,
    padding: 16,
    background: "#f8fafc",
    borderRadius: 8,
    border: "1px solid #e2e8f0"
  },
  correctHeader: {
    color: "#16a34a",
    fontWeight: "bold",
    marginBottom: 8
  },
  incorrectHeader: {
    color: "#dc2626",
    fontWeight: "bold",
    marginBottom: 8
  },
  nextButton: {
    marginTop: 20,
    padding: "12px 24px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer",
    display: "block",
    width: "100%"
  },
  resultsCard: {
    background: "white",
    borderRadius: 12,
    padding: 24,
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    border: "1px solid #e2e8f0"
  },
  resultsTitle: {
    fontSize: 24,
    margin: "0 0 16px",
    color: "#4338ca"
  },
  scoreDisplay: {
    fontSize: 20,
    fontWeight: "bold",
    margin: "0 0 24px",
    color: "#1e293b"
  },
  excellentResult: {
    padding: 16,
    background: "#dcfce7",
    color: "#166534",
    borderRadius: 8,
    marginBottom: 24
  },
  goodResult: {
    padding: 16,
    background: "#fef9c3",
    color: "#854d0e",
    borderRadius: 8,
    marginBottom: 24
  },
  needPracticeResult: {
    padding: 16,
    background: "#fee2e2",
    color: "#991b1b",
    borderRadius: 8,
    marginBottom: 24
  },
  restartButton: {
    padding: "12px 24px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer"
  }
};
