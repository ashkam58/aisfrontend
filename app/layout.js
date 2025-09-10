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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className="min-h-screen font-cartoon text-purple-700 rounded-cartoon">
        <div className="galaxy-stars-bg" />
        {/* Parallax scroll effect for stars */}
        <script dangerouslySetInnerHTML={{__html:`
          window.addEventListener('scroll', function() {
            var starsBg = document.querySelector('.galaxy-stars-bg');
            if (starsBg) {
              var y = window.scrollY;
              starsBg.style.backgroundPosition = '0px ' + (y * 0.3) + 'px';
            }
          });
        `}} />
        <header className="w-full py-3 sm:py-4 md:py-6 flex flex-col items-center justify-center bg-white/80 backdrop-blur rounded-cartoon shadow-lg mb-3 sm:mb-4 md:mb-6 border border-purple-200 mx-1 sm:mx-2">
          <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-purple-700 drop-shadow-lg text-center px-2">
            ✨ Intelligent Studios Ultimate ✨
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-purple-600 mt-1 sm:mt-2 text-center px-2">
            📚 Learning is fun with mandalas, games, and quizzes 🎨
          </p>
        </header>
        <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-purple-300 rounded-cartoon mx-1 sm:mx-2">
          <div className="max-w-6xl mx-auto px-2 sm:px-4 py-2 sm:py-3">
            <div className="flex items-center justify-between">
              <Link href="/" className="font-bold text-xs sm:text-sm md:text-lg text-purple-700 truncate">🌈 Intelligent Studios</Link>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex gap-2 lg:gap-4 text-sm lg:text-base">
                <Link href="/whiteboard" className="hover:underline text-purple-600 whitespace-nowrap min-h-[44px] flex items-center px-2">🎨 Board</Link>
                <Link href="/quiz" className="hover:underline text-purple-700 whitespace-nowrap min-h-[44px] flex items-center px-2">🧩 Quiz</Link>
                <Link href="/games" className="hover:underline text-purple-800 font-bold whitespace-nowrap min-h-[44px] flex items-center px-2">🎮 Games</Link>
                <Link href="/theory" className="hover:underline text-purple-900 font-bold whitespace-nowrap min-h-[44px] flex items-center px-2">📘 Theory</Link>
                <Link href="/math" className="hover:underline text-blue-600 font-bold whitespace-nowrap min-h-[44px] flex items-center px-2">🧮 Math</Link>
                <Link href="/olympiad" className="hover:underline text-yellow-600 font-bold whitespace-nowrap min-h-[44px] flex items-center px-2">🏆 Olympiad</Link>
                <Link href="/jmc" className="hover:underline text-green-600 font-bold whitespace-nowrap min-h-[44px] flex items-center px-2">🎯 JMC</Link>
              </div>

              {/* Mobile Navigation - Horizontal Scroll */}
              <div className="md:hidden flex gap-1 text-xs overflow-x-auto scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                <Link href="/whiteboard" className="hover:bg-purple-100 text-purple-600 whitespace-nowrap min-h-[44px] min-w-[44px] flex items-center justify-center px-1 rounded-lg transition-colors">🎨</Link>
                <Link href="/quiz" className="hover:bg-purple-100 text-purple-700 whitespace-nowrap min-h-[44px] min-w-[44px] flex items-center justify-center px-1 rounded-lg transition-colors">🧩</Link>
                <Link href="/games" className="hover:bg-purple-100 text-purple-800 font-bold whitespace-nowrap min-h-[44px] min-w-[44px] flex items-center justify-center px-1 rounded-lg transition-colors">🎮</Link>
                <Link href="/theory" className="hover:bg-purple-100 text-purple-900 font-bold whitespace-nowrap min-h-[44px] min-w-[44px] flex items-center justify-center px-1 rounded-lg transition-colors">📘</Link>
                <Link href="/math" className="hover:bg-blue-100 text-blue-600 font-bold whitespace-nowrap min-h-[44px] min-w-[44px] flex items-center justify-center px-1 rounded-lg transition-colors">🧮</Link>
                <Link href="/olympiad" className="hover:bg-yellow-100 text-yellow-600 font-bold whitespace-nowrap min-h-[44px] min-w-[44px] flex items-center justify-center px-1 rounded-lg transition-colors">🏆</Link>
                <Link href="/jmc" className="hover:bg-green-100 text-green-600 font-bold whitespace-nowrap min-h-[44px] min-w-[44px] flex items-center justify-center px-1 rounded-lg transition-colors">🎯</Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-6xl mx-auto p-1 sm:p-2 md:p-4">{children}</main>
        <footer className="py-4 sm:py-6 md:py-8 text-center text-xs sm:text-sm md:text-base text-purple-600 px-2">
          🌟 Built for joyful learning. © {new Date().getFullYear()} 🌟
        </footer>
      </body>
    </html>
  );
}
