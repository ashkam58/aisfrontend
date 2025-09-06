import './globals.css';
import Link from 'next/link';
import MasterfulMandalaBackground from '../components/MasterfulMandalaBackground';

export const metadata = {
  title: 'Ultimate EdTech – Ashkam Studio',
  description: 'Whiteboard, theory, interactive visuals, quizzes & games – all in one.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-cartoon bg-white text-purple-700 rounded-cartoon">
        <MasterfulMandalaBackground />
        <header className="w-full py-8 flex flex-col items-center justify-center bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 rounded-cartoon shadow-lg mb-8 border border-purple-200">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-700 drop-shadow-lg text-center">
            ✨ Intelligent Studios Ultimate ✨
          </h1>
          <p className="text-lg md:text-xl text-purple-600 mt-2 text-center">
            📚 Learning is fun with mandalas, games, and quizzes 🎨
          </p>
        </header>
        <nav className="sticky top-0 z-50 bg-purple-200/80 backdrop-blur border-b border-purple-300 rounded-cartoon">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-bold text-xl text-purple-700">🌈 Intelligent Studios</Link>
            <div className="flex gap-4 text-lg">
              <Link href="/whiteboard" className="hover:underline text-purple-600">🎨 Whiteboard</Link>
              <Link href="/quiz" className="hover:underline text-purple-700">🧩 Quizzes</Link>
              <Link href="/games" className="hover:underline text-purple-800 font-bold">🎮 Games</Link>
              <Link href="/theory" className="hover:underline text-purple-900 font-bold">📘 Theory</Link>
            </div>
          </div>
        </nav>
        <main className="max-w-6xl mx-auto p-4">{children}</main>
        <footer className="py-10 text-center text-lg text-purple-600">
          🌟 Built for joyful learning. © {new Date().getFullYear()} 🌟
        </footer>
      </body>
    </html>
  );
}
