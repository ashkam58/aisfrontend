import Link from 'next/link';
import MandalaBackground from '../../components/MandalaBackground';

const games = [
  { name: 'Memory Match', path: '/games/memory', grades: [1,2,3,4] },
  { name: 'Mandala Coloring', path: '/games/mandala', grades: [1,2,3,4,5,6] },
  { name: 'Math Quiz', path: '/games/math', grades: [1,2,3,4,5] },
  { name: 'Word Builder', path: '/games/words', grades: [2,3,4,5,6] },
];

export default function GamesMenu() {
  const [selectedGrade, setSelectedGrade] = React.useState('all');
  return (
    <>
      <MandalaBackground />
      <div className="relative z-10 max-w-3xl mx-auto mt-12 bg-white/80 rounded-cartoon shadow-lg p-8 backdrop-blur">
        <h2 className="text-3xl font-cartoon text-purple-700 mb-6 text-center">Choose Your Game</h2>
        <div className="flex justify-center gap-4 mb-8">
          <button className={`px-4 py-2 rounded-cartoon font-bold ${selectedGrade==='all'?'bg-purple-300':'bg-purple-100'}`} onClick={()=>setSelectedGrade('all')}>All Grades</button>
          {[1,2,3,4,5,6].map(grade => (
            <button key={grade} className={`px-4 py-2 rounded-cartoon font-bold ${selectedGrade===grade?'bg-purple-300':'bg-purple-100'}`} onClick={()=>setSelectedGrade(grade)}>
              Grade {grade}
            </button>
          ))}
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {games.filter(game => selectedGrade==='all' || game.grades.includes(selectedGrade)).map(game => (
            <li key={game.name} className="bg-purple-100 rounded-cartoon p-6 shadow text-center">
              <Link href={game.path} className="text-2xl font-cartoon text-purple-700 hover:underline">
                {game.name}
              </Link>
              <div className="mt-2 text-purple-500 text-sm">Grades: {game.grades.join(', ')}</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
