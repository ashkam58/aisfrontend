'use client';
import { useEffect, useState } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function QuizEngine() {
  const [quizzes, setQuizzes] = useState([]);
  const [sel, setSel] = useState(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState({}); // qIndex -> choiceIndex

  useEffect(() => {
    console.log('Fetching quizzes from:', `${API}/api/quizzes`);
    fetch(`${API}/api/quizzes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors'
    })
      .then(r => {
        console.log('Response status:', r.status);
        if (!r.ok) {
          throw new Error(`HTTP error! status: ${r.status}`);
        }
        return r.json();
      })
      .then(data => {
        console.log('Quiz data received:', data);
        setQuizzes(data.quizzes || []);
      })
      .catch(error => {
        console.error('Error fetching quizzes:', error);
        setQuizzes([]);
      });
  }, []);

  const chooseQuiz = (id) => {
    const q = quizzes.find(q => q.id === id) || null;
    setSel(q);
    setScore(0);
    setAnswered({});
  };

  const mark = (i, choiceIndex) => {
    if (!sel) return;
    if (answered[i] != null) return; // lock once answered
    const correct = sel.questions[i].answer;
    setAnswered({ ...answered, [i]: choiceIndex });
    if (choiceIndex === correct) setScore(s => s + 1);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      <div className="rounded-2xl border border-slate-200 p-3 sm:p-4 bg-white/80">
        <h2 className="font-semibold mb-2 text-sm sm:text-base">Pick a Quiz</h2>
        <div className="flex gap-2 flex-wrap">
          {quizzes.map(q => (
            <button key={q.id} onClick={() => chooseQuiz(q.id)}
              className={`px-2 sm:px-3 py-1.5 rounded-xl border text-xs sm:text-sm ${sel?.id===q.id?'bg-emerald-600 text-white border-emerald-700':'bg-white hover:bg-slate-50'}`}>
              {q.title}
            </button>
          ))}
        </div>
        {!quizzes.length && <p className="text-xs sm:text-sm text-slate-500 mt-2">Start the server to load quizzes.</p>}
        <div className="mt-4 text-xs sm:text-sm text-slate-600">
          <p>API: <code className="break-all">{API}/api/quizzes</code></p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 p-3 sm:p-4 bg-white/80">
        {!sel && <p className="text-slate-600 text-sm sm:text-base">Select a quiz to begin.</p>}
        {sel && (
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm sm:text-base">{sel.title}</h3>
              <div className="text-xs sm:text-sm">Score: <span className="font-bold">{score}</span> / {sel.questions.length}</div>
            </div>
            {sel.questions.map((q, i) => (
              <div key={i} className="rounded-xl border p-2 sm:p-3">
                <div className="font-medium text-sm sm:text-base">{i+1}. {q.q}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {q.choices.map((c, idx) => {
                    const chosen = answered[i] === idx;
                    const correct = idx === q.answer;
                    let cls = 'px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border bg-white hover:bg-slate-50 text-xs sm:text-sm text-left';
                    if (answered[i] != null) {
                      if (chosen && correct) cls = 'px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border bg-emerald-100 border-emerald-300 text-xs sm:text-sm text-left';
                      else if (chosen && !correct) cls = 'px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border bg-rose-100 border-rose-300 text-xs sm:text-sm text-left';
                      else if (correct) cls = 'px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border bg-emerald-50 border-emerald-200 text-xs sm:text-sm text-left';
                    }
                    return (
                      <button key={idx} className={cls} onClick={() => mark(i, idx)}>
                        {c}
                      </button>
                    );
                  })}
                </div>
                {answered[i] != null && !((answered[i]) === q.answer) && (
                  <div className="text-xs text-slate-500 mt-1">Hint: {q.hint}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
