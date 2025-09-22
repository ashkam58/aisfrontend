"use client";

import { useMemo, useState } from "react";

const QUESTIONS = [
  {
    prompt: "Which sequence can prove triangle ABC is congruent to triangle A'B'C' when the figures share the same size but face different directions?",
    options: [
      "Translate ABC until point A sits on A' then rotate around A' to match the other vertices.",
      "Dilate ABC from the origin with scale factor 0.5 then reflect over the y-axis.",
      "Rotate ABC 45 degrees then dilate by scale factor 2 around B.",
    ],
    answerIndex: 0,
    explanation:
      "Translations and rotations are rigid motions. A dilation changes size, so option 1 is the valid congruence sequence.",
  },
  {
    prompt: "A dilation with center (2, -1) and scale factor 3 is applied to point P(4, 1). What is the image P'?",
    options: [
      "(6, 2)",
      "(8, 4)",
      "(8, 5)",
    ],
    answerIndex: 2,
    explanation:
      "Vector from the center to P is (2, 2). Multiply by 3 to get (6, 6) and add to the center to obtain (8, 5).",
  },
  {
    prompt: "During a mission you rotate a quadrilateral 180 degrees about the origin. Which property must remain true?",
    options: [
      "Side lengths double.",
      "Orientation reverses and distances change.",
      "Each vertex is mapped to (-x, -y).",
    ],
    answerIndex: 2,
    explanation:
      "A 180 degree rotation around the origin sends (x, y) to (-x, -y) and keeps lengths the same.",
  },
  {
    prompt: "Triangle JKL is mapped to J'K'L' by a composition of a rotation followed by a dilation with scale factor 4. What can you conclude?",
    options: [
      "Triangles are congruent because dilations preserve side lengths.",
      "Triangles are similar because angles stay equal and sides scale by 4.",
      "Triangles are neither congruent nor similar.",
    ],
    answerIndex: 1,
    explanation:
      "The rotation preserves shape while the dilation multiplies every side length by 4, producing a similar triangle.",
  },
];

export default function RigidMotionQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const currentQuestion = useMemo(() => QUESTIONS[currentIndex], [currentIndex]);

  const handleSelect = (index) => {
    setSelected(index);
    setFeedback("");
  };

  const handleSubmit = () => {
    if (selected === null) {
      setFeedback("Pick an answer before checking.");
      return;
    }
    const isCorrect = selected === currentQuestion.answerIndex;
    setFeedback(
      isCorrect ? "Great job! You applied the transformation rules correctly." : "Not quite. Review the explanation and adjust."
    );
    if (isCorrect) {
      setScore((value) => (value < currentIndex + 1 ? value + 1 : value));
    }
  };

  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((value) => value + 1);
      setSelected(null);
      setFeedback("");
    } else {
      setFeedback("Mission complete! You have seen every quiz card.");
    }
  };

  return (
    <div className="space-y-4 rounded-3xl border border-purple-200 bg-white/80 p-6 shadow">
      <header className="space-y-1 text-center">
        <p className="text-xs uppercase tracking-wide text-purple-600">Quiz Bay</p>
        <h2 className="text-2xl font-bold text-purple-900">Rigid Motion Challenge</h2>
        <p className="text-sm text-purple-700">Answer the multiple choice prompts to verify your mastery of rotations, translations, and dilations.</p>
        <div className="inline-flex gap-3 rounded-xl border border-purple-300 bg-white/70 px-4 py-1 text-xs font-semibold text-purple-800">
          <span>Card {currentIndex + 1} / {QUESTIONS.length}</span>
          <span>Score: {score}</span>
        </div>
      </header>

      <article className="space-y-3 rounded-2xl border border-purple-200 bg-purple-50/60 p-4">
        <h3 className="text-lg font-semibold text-purple-900">{currentQuestion.prompt}</h3>
        <ul className="space-y-2">
          {currentQuestion.options.map((option, index) => (
            <li key={option}>
              <button
                type="button"
                onClick={() => handleSelect(index)}
                className={`w-full rounded-xl border px-3 py-2 text-left text-sm font-medium transition-colors ${
                  selected === index
                    ? "border-purple-600 bg-purple-100 text-purple-900"
                    : "border-purple-200 bg-white text-purple-700 hover:bg-purple-100"
                }`}
              >
                {String.fromCharCode(65 + index)}. {option}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          <button onClick={handleSubmit} className="rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-purple-700">
            Check answer
          </button>
          <button onClick={handleNext} className="rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-sky-600">
            Next card
          </button>
        </div>
        {feedback && (
          <div className="rounded-xl border border-purple-200 bg-white p-3 text-sm text-purple-800">
            <p>{feedback}</p>
            {selected !== null && (
              <p className="mt-2 text-sm text-purple-700">{currentQuestion.explanation}</p>
            )}
          </div>
        )}
      </article>
    </div>
  );
}
