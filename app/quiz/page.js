'use client';
import QuizEngine from '@/components/QuizEngine';

export default function QuizPage() {
  return (
    <>
      <main className="relative z-10 min-h-[80vh] flex items-start md:items-center justify-center py-12">
        <div className="w-full max-w-5xl px-4">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-cartoon text-purple-700">🧩 Quizzes</h1>
            <p className="text-purple-600">Instant feedback MCQs with hints. Data comes from the server API.</p>
          </div>
          <div className="rounded-cartoon shadow-lg p-6 md:p-8 backdrop-blur bg-white/85">
            <QuizEngine />
          </div>
        </div>
      </main>
    </>
  );
}
