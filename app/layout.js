import './globals.css';
import Link from 'next/link';
import SimpleBackground from '../components/SimpleBackground';

export const metadata = {
  title: 'Ultimate EdTech – Ashkam Studio',
  description: 'Whiteboard, theory, interactive visuals, quizzes & games – all in one.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-cartoon bg-white text-purple-700 rounded-cartoon">
        <SimpleBackground />
        <header className="w-full py-4 sm:py-6 md:py-8 flex flex-col items-center justify-center bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 rounded-cartoon shadow-lg mb-4 sm:mb-6 md:mb-8 border border-purple-200 mx-2 sm:mx-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-purple-700 drop-shadow-lg text-center px-2">
            ✨ Intelligent Studios Ultimate ✨
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-purple-600 mt-2 text-center px-2">
            📚 Learning is fun with mandalas, games, and quizzes 🎨
          </p>
        </header>
        <nav className="sticky top-0 z-50 bg-purple-200/80 backdrop-blur border-b border-purple-300 rounded-cartoon mx-2 sm:mx-4">
          <div className="max-w-6xl mx-auto px-2 sm:px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-bold text-sm sm:text-base md:text-xl text-purple-700">🌈 Intelligent Studios</Link>
            <div className="flex gap-1 sm:gap-2 md:gap-4 text-xs sm:text-sm md:text-lg overflow-x-auto">
              <Link href="/whiteboard" className="hover:underline text-purple-600 whitespace-nowrap">🎨 Board</Link>
              <Link href="/quiz" className="hover:underline text-purple-700 whitespace-nowrap">🧩 Quiz</Link>
              <Link href="/games" className="hover:underline text-purple-800 font-bold whitespace-nowrap">🎮 Games</Link>
              <Link href="/theory" className="hover:underline text-purple-900 font-bold whitespace-nowrap">📘 Theory</Link>
              <Link href="/jmc" className="hover:underline text-blue-600 font-bold whitespace-nowrap">🏆 JMC</Link>
            </div>
          </div>
        </nav>
        <main className="max-w-6xl mx-auto p-2 sm:p-4">{children}</main>
        <footer className="py-6 sm:py-8 md:py-10 text-center text-sm sm:text-base md:text-lg text-purple-600 px-2">
          🌟 Built for joyful learning. © {new Date().getFullYear()} 🌟
        </footer>
      </body>
    </html>
  );
}
