'use client';
import { useState } from 'react';
import Link from 'next/link';
import SubtractionAdventure from '../../components/SubtractionAdventure';
import TypingGame from '../../components/TypingGame';
import KartMath from '../../components/KartMath';
import SkipCountingGame from '../../components/SkipCountingGame';
import dynamic from 'next/dynamic';

// Dynamically import the game component to avoid SSR issues
const AddingThreeOrMoreIntegers = dynamic(() => import('../../components/addingThreeorMoreInterger'), { ssr: false });

const games = [
	{
		name: 'Memory Match',
		description: 'Match pairs of cards',
		grades: [1, 2, 3, 4],
		path: '/games/memory',
	},
	{
		name: 'Mandala Coloring',
		description: 'Color beautiful mandalas',
		grades: [1, 2, 3, 4, 5, 6],
		path: '/games/mandala',
	},
	{
		name: 'Math Quiz',
		description: 'Practice math problems',
		grades: [1, 2, 3, 4, 5],
		path: '/games/math',
	},
	{
		name: 'Word Builder',
		description: 'Build words from letters',
		grades: [2, 3, 4, 5, 6],
		path: '/games/words',
	},
	{
		name: 'Shape Sorter',
		description: 'Sort shapes by properties',
		grades: [1, 2, 3],
		path: '/games/shapes',
	},
	{
		name: 'Fraction Fun',
		description: 'Learn fractions visually',
		grades: [3, 4, 5, 6],
		path: '/games/fractions',
	},
	{
		name: 'JMC Survival Kit',
		description: 'Olympiad math formulas and mini-tools',
		grades: [6, 7, 8, 9],
		path: '/jmc',
	},
];

const gamesTopics = {
	1: [
		{
			name: 'Skip Counting Adventure',
			description: 'Learn to count by 2s, 5s, and 10s with fun patterns and visual helpers!',
			component: <SkipCountingGame />,
			emoji: '🦘',
			color: 'from-green-200 to-emerald-300'
		},
		{
			name: 'Subtraction Adventure',
			description: 'Learn subtraction and find missing numbers with fun visuals!',
			component: <SubtractionAdventure />,
			emoji: '🏴‍☠️',
			color: 'from-red-200 to-pink-300'
		},
	],
	6: [
		{
			name: 'Does x satisfy an equation?',
			description: 'Does n satisfy the equation? Race to solve algebraic equations!',
			component: <KartMath />,
			emoji: '🏎️',
			color: 'from-blue-200 to-cyan-300'
		},
	],
	7: [
		{
			name: 'Adding Three or More Integers',
			description: 'Master adding multiple integers with interactive practice and adaptive learning!',
			component: <AddingThreeOrMoreIntegers />,
			emoji: '🧮',
			color: 'from-purple-200 to-violet-300'
		},
	],
};

export default function GamesPage() {
	const [selectedGrade, setSelectedGrade] = useState(null);
	const [selectedGame, setSelectedGame] = useState(null);
	const [showTypingGame, setShowTypingGame] = useState(false);
	const availableGrades = Object.keys(gamesTopics).map(Number);

	return (
		<>
			{/* Hide Game Arcade header and options when a specific game is selected */}
			{!selectedGame && (
				<div className="relative z-10 max-w-4xl mx-auto mt-2 sm:mt-4 md:mt-6 bg-white/90 backdrop-blur rounded-2xl sm:rounded-3xl shadow-2xl p-3 sm:p-4 md:p-6 border-2 sm:border-4 border-purple-200">
					<div className="text-center mb-3 sm:mb-4 md:mb-6">
						<div className="text-4xl sm:text-5xl md:text-6xl mb-2 sm:mb-4 animate-bounce">🎮</div>
						<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-purple-800 mb-1 sm:mb-2" style={{fontFamily: 'Fredoka One, cursive'}}>
							Game Arcade
						</h1>
						<p className="text-base sm:text-lg text-purple-600 font-medium">
							🌟 Playful challenges to sharpen your skills! 🌟
						</p>
					</div>
					{/* Button to open Typing Game */}
					{!showTypingGame && (
						<div className="mb-6 sm:mb-8 text-center">
							<button
								className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl sm:rounded-3xl font-bold text-base sm:text-lg shadow-lg transform transition-all duration-300 hover:scale-105 min-h-[48px]"
								style={{fontFamily: 'Fredoka One, cursive'}}
								onClick={() => setShowTypingGame(true)}
							>
								📝 Play Typing Game
							</button>
						</div>
					)}
					{showTypingGame && (
						<div className="mb-6 sm:mb-8 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border-2 sm:border-4 border-blue-300 shadow-xl">
							<h2 className="text-xl sm:text-2xl font-bold text-blue-800 mb-3 sm:mb-4 text-center" style={{fontFamily: 'Fredoka One, cursive'}}>
								⌨️ Typing Game
							</h2>
							<TypingGame />
							<div className="text-center mt-3 sm:mt-4">
								<button
									className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-2xl sm:rounded-3xl font-bold transform transition-all duration-300 hover:scale-105 min-h-[48px]"
									style={{fontFamily: 'Fredoka One, cursive'}}
									onClick={() => setShowTypingGame(false)}
								>
									← Back to Game Arcade
								</button>
							</div>
						</div>
					)}
				</div>
			)}

			<div className="relative z-10 max-w-4xl mx-auto mt-2 sm:mt-4 md:mt-6 bg-white/90 backdrop-blur rounded-2xl sm:rounded-3xl shadow-2xl p-3 sm:p-4 md:p-6 border-2 sm:border-4 border-green-200">
				{/* Grade selection or game display */}
				{!selectedGrade ? (
					<div>
						<div className="text-center mb-6 sm:mb-8">
							<div className="text-6xl sm:text-7xl md:text-8xl mb-4 animate-bounce">�</div>
							<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-800 mb-2" style={{fontFamily: 'Fredoka One, cursive'}}>
								🎯 Select Your Grade Level 🎯
							</h2>
							<p className="text-base sm:text-lg md:text-xl text-green-600 font-medium">Choose your grade to play amazing learning games! ✨</p>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
							{[
								{ grade: 1, emoji: '🌱', color: 'from-green-100 via-lime-100 to-emerald-100', hoverColor: 'hover:from-green-200 hover:via-lime-200 hover:to-emerald-200' },
								{ grade: 6, emoji: '🏆', color: 'from-amber-100 via-yellow-100 to-lime-100', hoverColor: 'hover:from-amber-200 hover:via-yellow-200 hover:to-lime-200' },
								{ grade: 7, emoji: '🧮', color: 'from-teal-100 via-cyan-100 to-blue-100', hoverColor: 'hover:from-teal-200 hover:via-cyan-200 hover:to-blue-200' }
							].filter(gradeData => availableGrades.includes(gradeData.grade)).map((gradeData) => (
								<button
									key={gradeData.grade}
									className={`group bg-gradient-to-br ${gradeData.color} ${gradeData.hoverColor} text-green-700 font-bold text-lg sm:text-xl p-6 sm:p-8 rounded-3xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1 shadow-lg hover:shadow-2xl border-4 border-green-200 hover:border-green-400 min-h-[120px] touch-manipulation`}
									onClick={() => setSelectedGrade(gradeData.grade)}
									style={{fontFamily: 'Fredoka One, cursive'}}
								>
									<div className="text-4xl sm:text-5xl mb-2 group-hover:animate-bounce transition-all duration-300">{gradeData.emoji}</div>
									<div className="text-xl sm:text-2xl group-hover:text-green-800 transition-colors">Grade {gradeData.grade}</div>
									<div className="text-xs sm:text-sm text-green-500 mt-1 opacity-75 group-hover:opacity-100">Click to play!</div>
								</button>
							))}
						</div>
					</div>
				) : !selectedGame ? (
					<div>
						<div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-4">
							<h2 className="text-2xl sm:text-3xl font-bold text-green-700 text-center" style={{fontFamily: 'Fredoka One, cursive'}}>
								🎮 Grade {selectedGrade} Game Zone �
							</h2>
							<button
								className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-3xl font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-lg"
								style={{fontFamily: 'Fredoka One, cursive'}}
								onClick={() => setSelectedGrade(null)}
							>
								← Back to Grades
							</button>
						</div>
						{Array.isArray(gamesTopics[selectedGrade]) &&
						gamesTopics[selectedGrade].length > 0 ? (
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
								{gamesTopics[selectedGrade].map((game) => (
									<div
										key={game.name}
										className={`group bg-gradient-to-br ${game.color} p-6 sm:p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border-4 border-white hover:border-green-300 transform hover:scale-105 hover:-rotate-1`}
										onClick={() => setSelectedGame(game)}
									>
										<div className="flex items-start gap-4">
											<div className="text-4xl sm:text-5xl group-hover:animate-bounce transition-all duration-300 flex-shrink-0">
												{game.emoji}
											</div>
											<div className="flex-1">
												<h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 group-hover:text-green-800 transition-colors" style={{fontFamily: 'Fredoka One, cursive'}}>
													{game.name}
												</h3>
												<p className="text-gray-700 text-sm sm:text-base leading-relaxed group-hover:text-gray-800 transition-colors">
													{game.description}
												</p>
												<div className="mt-3 inline-flex items-center text-xs sm:text-sm font-medium text-green-600 bg-white/70 px-3 py-1 rounded-full group-hover:bg-white group-hover:text-green-700 transition-all">
													🎮 Start Playing
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						) : (
							<div className="text-center bg-gradient-to-br from-yellow-100 to-orange-100 p-8 rounded-3xl border-4 border-yellow-200">
								<div className="text-6xl mb-4">🚧</div>
								<h3 className="text-xl font-bold text-yellow-800 mb-2" style={{fontFamily: 'Fredoka One, cursive'}}>Coming Soon!</h3>
								<p className="text-yellow-600">Exciting games for Grade {selectedGrade} are being prepared! Check back soon for awesome learning adventures! 🌟</p>
							</div>
						)}
					</div>
				) : (
					<div>
						<div className="text-center mb-6">
							<div className="text-5xl mb-4 animate-bounce">{selectedGame.emoji}</div>
							<h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-4" style={{fontFamily: 'Fredoka One, cursive'}}>
								{selectedGame.name}
							</h2>
							<p className="text-green-600 text-lg mb-6">{selectedGame.description}</p>
						</div>
						<div className="mb-6 bg-gradient-to-br from-white/90 to-gray-50/90 rounded-3xl p-4 border-4 border-green-200">
							{selectedGame.component}
						</div>
						<div className="flex flex-col sm:flex-row justify-center items-center gap-4">
							<button
								className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-3xl font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-lg"
								style={{fontFamily: 'Fredoka One, cursive'}}
								onClick={() => setSelectedGame(null)}
							>
								← Back to Games
							</button>
							<button
								className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-3xl font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-lg"
								style={{fontFamily: 'Fredoka One, cursive'}}
								onClick={() => {
									setSelectedGame(null);
									setSelectedGrade(null);
								}}
							>
								🎓 Back to Grade Selection
							</button>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
