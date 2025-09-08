'use client';
import { useState } from 'react';
import Link from 'next/link';
import SubtractionAdventure from '../../components/SubtractionAdventure';
import TypingGame from '../../components/TypingGame';
import KartMath from '../../components/KartMath';

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
			name: 'Subtraction Adventure',
			description:
				'Learn subtraction and find missing numbers with fun visuals!',
			component: <SubtractionAdventure />,
		},
	],
	6: [
		{
			name: 'Does x satisfy an equation?',
			description:
				'Does n satisfy the equation? Race to solve algebraic equations!',
			component: <KartMath />,
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
				<div className="relative z-10 max-w-4xl mx-auto mt-6 sm:mt-8 md:mt-12 bg-white rounded-cartoon shadow-lg p-4 sm:p-6 md:p-8">
					<div className="text-center mb-4 sm:mb-6">
						<h1 className="text-2xl sm:text-3xl md:text-4xl font-cartoon text-purple-800">
							🎮 Game Arcade
						</h1>
						<p className="text-purple-600 text-sm sm:text-base">
							Playful challenges to sharpen your skills!
						</p>
					</div>
					{/* Button to open Typing Game */}
					{!showTypingGame && (
						<div className="mb-8 text-center">
							<button
								className="bg-blue-500 text-white px-6 py-3 rounded-cartoon font-cartoon text-lg shadow hover:bg-blue-600 transition"
								onClick={() => setShowTypingGame(true)}
							>
								Play Typing Game 📝
							</button>
						</div>
					)}
					{showTypingGame && (
						<div className="mb-8">
							<h2 className="text-xl font-cartoon text-purple-700 mb-2 text-center">
								Typing Game
							</h2>
							<TypingGame />
							<div className="text-center mt-4">
								<button
									className="bg-purple-500 text-white px-4 py-2 rounded-cartoon font-cartoon hover:bg-purple-600 text-sm"
									onClick={() => setShowTypingGame(false)}
								>
									← Back to Game Arcade
								</button>
							</div>
						</div>
					)}
				</div>
			)}

			<div className="relative z-10 max-w-4xl mx-auto mt-6 sm:mt-8 md:mt-12 bg-white rounded-cartoon shadow-lg p-4 sm:p-6 md:p-8">
				{/* Grade selection or game display */}
				{!selectedGrade ? (
					<div>
						<h2 className="text-xl sm:text-2xl font-cartoon text-purple-700 mb-4 sm:mb-6 text-center">
							Select Your Grade ✨
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
							{availableGrades.map((grade) => (
								<button
									key={grade}
									className="bg-gradient-to-br from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 text-purple-700 font-cartoon text-lg sm:text-xl p-4 sm:p-6 rounded-cartoon transition shadow-md"
									onClick={() => setSelectedGrade(grade)}
								>
									Grade {grade} 🎈
								</button>
							))}
						</div>
					</div>
				) : !selectedGame ? (
					<div>
						<h2 className="text-xl sm:text-2xl font-cartoon text-purple-700 mb-4 sm:mb-6 text-center">
							Grade {selectedGrade} Games 🎯
						</h2>
						{Array.isArray(gamesTopics[selectedGrade]) &&
						gamesTopics[selectedGrade].length > 0 ? (
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
								{gamesTopics[selectedGrade].map((game) => (
									<div
										key={game.name}
										className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 sm:p-6 rounded-cartoon shadow-md hover:shadow-lg transition cursor-pointer border border-purple-200"
										onClick={() => setSelectedGame(game)}
									>
										<h3 className="text-lg sm:text-xl font-cartoon text-purple-700 mb-2">
											{game.name} 🕹️
										</h3>
										<p className="text-purple-600 text-sm sm:text-base">
											{game.description}
										</p>
									</div>
								))}
							</div>
						) : (
							<div className="text-center text-purple-600 text-sm sm:text-base">
								No games available for Grade {selectedGrade} yet.
							</div>
						)}
					</div>
				) : (
					<div>
						<h2 className="text-xl sm:text-2xl font-cartoon text-purple-700 mb-4 sm:mb-6 text-center">
							{selectedGame.name} 🧠
						</h2>
						<div className="mb-4">{selectedGame.component}</div>
						<div className="text-center">
							<button
								className="bg-purple-500 text-white px-3 sm:px-4 py-2 rounded-cartoon font-cartoon hover:bg-purple-600 text-sm sm:text-base"
								onClick={() => setSelectedGame(null)}
							>
								← Back to Games
							</button>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
