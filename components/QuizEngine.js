'use client';
import { useEffect, useState } from 'react';

// Hardcoded quiz data with various topics and grades
const QUIZ_DATA = {
  // Grade 1–2 Quizzes (your originals kept exactly)
  "grade1-counting": {
    id: "grade1-counting",
    title: "🔢 Count with Buddy Bear",
    grade: "Grade 1",
    subject: "Math",
    character: "🐻",
    color: "bg-gradient-to-br from-yellow-200 to-orange-300",
    questions: [
      { q: "How many apples are there? 🍎🍎🍎", choices: ["2", "3", "4", "5"], answer: 1, hint: "Count each apple one by one!", emoji: "🍎" },
      { q: "What comes after 4? 1, 2, 3, 4, ?", choices: ["3", "5", "6", "7"], answer: 1, hint: "Just count one more!", emoji: "🔢" },
      { q: "How many fingers on one hand? ✋", choices: ["4", "5", "6", "10"], answer: 1, hint: "Look at your hand!", emoji: "✋" }
    ]
  },

  "grade1-shapes": {
    id: "grade1-shapes",
    title: "🔺 Shapes Safari",
    grade: "Grade 1",
    subject: "Math",
    character: "🦁",
    color: "bg-gradient-to-br from-blue-200 to-purple-300",
    questions: [
      { q: "How many sides does a triangle have?", choices: ["2", "3", "4", "5"], answer: 1, hint: "Tri means three!", emoji: "🔺" },
      { q: "What shape is a ball?", choices: ["Square", "Triangle", "Circle", "Rectangle"], answer: 2, hint: "It rolls around!", emoji: "⚽" },
      { q: "How many sides does a square have?", choices: ["3", "4", "5", "6"], answer: 1, hint: "All sides are equal!", emoji: "⬜" }
    ]
  },

  // Grade 3–4 Quizzes (your originals kept + new)
  "grade3-addition": {
    id: "grade3-addition",
    title: "➕ Addition Adventure",
    grade: "Grade 3",
    subject: "Math",
    character: "🚀",
    color: "bg-gradient-to-br from-green-200 to-blue-300",
    questions: [
      { q: "What is 25 + 17?", choices: ["41", "42", "43", "44"], answer: 1, hint: "Break it: 20+10=30; 5+7=12; 30+12=?", emoji: "➕" },
      { q: "Sarah has 34 stickers. Her friend gives 28 more. Total?", choices: ["60", "61", "62", "63"], answer: 2, hint: "34 + 28 = ?", emoji: "⭐" },
      { q: "What is 99 + 1?", choices: ["99", "100", "101", "110"], answer: 1, hint: "Almost there!", emoji: "💯" }
    ]
  },

  "grade3-multiplication": {
    id: "grade3-multiplication",
    title: "✖️ Times Table Heroes",
    grade: "Grade 3",
    subject: "Math",
    character: "🦸‍♂️",
    color: "bg-gradient-to-br from-red-200 to-pink-300",
    questions: [
      { q: "What is 6 × 4?", choices: ["20", "22", "24", "26"], answer: 2, hint: "Skip by 6s: 6, 12, 18, 24.", emoji: "✖️" },
      { q: "3 boxes with 7 toys each. Total?", choices: ["19", "20", "21", "22"], answer: 2, hint: "3 × 7 = ?", emoji: "🧸" },
      { q: "What is 8 × 5?", choices: ["35", "40", "45", "50"], answer: 1, hint: "8×5 = 40", emoji: "🖐" }
    ]
  },

  "grade2-add-sub": {
    id: "grade2-add-sub",
    title: "➕➖ Fast Friends",
    grade: "Grade 2",
    subject: "Math",
    character: "🐣",
    color: "bg-gradient-to-br from-amber-200 to-lime-300",
    questions: [
      { q: "14 − 9 = ?", choices: ["3", "4", "5", "6"], answer: 2, hint: "Count up from 9 to 14.", emoji: "🧮" },
      { q: "7 + 8 = ?", choices: ["14", "15", "16", "17"], answer: 1, hint: "Make a ten: 7+3 +5.", emoji: "🔟" },
      { q: "12 + ___ = 20", choices: ["6", "7", "8", "9"], answer: 2, hint: "How far from 12 to 20?", emoji: "🧩" },
      { q: "Riya has 9 marbles and gets 6 more. Total?", choices: ["13", "14", "15", "16"], answer: 2, hint: "Add 9 and 6.", emoji: "🔵" }
    ]
  },

  "grade3-patterns": {
    id: "grade3-patterns",
    title: "🔁 Pattern Patrol",
    grade: "Grade 3",
    subject: "Math",
    character: "🐯",
    color: "bg-gradient-to-br from-cyan-200 to-indigo-300",
    questions: [
      { q: "Next: 4, 9, 14, 19, ...", choices: ["22", "23", "24", "25"], answer: 2, hint: "Add 5 each time.", emoji: "📈" },
      { q: "Next: 2, 5, 10, 17, ...", choices: ["23", "24", "25", "26"], answer: 3, hint: "Differences +3, +5, +7, then +9.", emoji: "🧠" },
      { q: "Skip count by 4: 12, 16, 20, __", choices: ["22", "24", "25", "28"], answer: 1, hint: "Add 4.", emoji: "4️⃣" },
      { q: "10 more than 47 is ...", choices: ["37", "57", "67", "47"], answer: 1, hint: "Add a ten.", emoji: "🔟" }
    ]
  },

  "grade4-fractions": {
    id: "grade4-fractions",
    title: "🧁 Fraction Funland",
    grade: "Grade 4",
    subject: "Fractions",
    character: "🐼",
    color: "bg-gradient-to-br from-fuchsia-200 to-rose-300",
    questions: [
      { q: "Which is greater?", choices: ["2/3", "3/5", "Equal", "Cannot tell"], answer: 0, hint: "Compare decimals: 0.67 vs 0.60.", emoji: "⚖️" },
      { q: "Equivalent to 3/4 is ...", choices: ["6/8", "8/12", "9/16", "12/20"], answer: 0, hint: "Multiply top & bottom by 2.", emoji: "🟰" },
      { q: "Simplify 18/24", choices: ["2/3", "3/4", "4/5", "5/6"], answer: 1, hint: "Divide by 6.", emoji: "✂️" },
      { q: "5/12 + 3/12 = ?", choices: ["2/3", "8/12", "3/4", "1/2"], answer: 0, hint: "Add then simplify.", emoji: "➕" },
      { q: "0.4 equals ...", choices: ["1/4", "2/5", "3/5", "2/3"], answer: 1, hint: "Think 40/100.", emoji: "🔢" }
    ]
  },

  "grade4-perimeter-area": {
    id: "grade4-perimeter-area",
    title: "📐 Shape Builders",
    grade: "Grade 4",
    subject: "Mensuration",
    character: "🐵",
    color: "bg-gradient-to-br from-emerald-200 to-teal-300",
    questions: [
      { q: "Perimeter of 8×5 rectangle?", choices: ["24", "26", "30", "40"], answer: 1, hint: "2(L+W).", emoji: "📏" },
      { q: "Area of 9×7 rectangle?", choices: ["56", "63", "72", "81"], answer: 1, hint: "L×W.", emoji: "🧱" },
      { q: "Area of square side 6 cm?", choices: ["24", "30", "36", "48"], answer: 2, hint: "a².", emoji: "🟩" },
      { q: "3000 m equals ... km", choices: ["0.3", "3", "30", "300"], answer: 1, hint: "1000 m = 1 km.", emoji: "🛣️" }
    ]
  },

  // Grade 5–6 Bridge & Packs we taught
  "grade5-fractions-decimals-bridge": {
    id: "grade5-fractions-decimals-bridge",
    title: "🔄 Fractions ↔ Decimals Bridge",
    grade: "Grade 5",
    subject: "Number",
    character: "🦉",
    color: "bg-gradient-to-br from-sky-200 to-violet-300",
    questions: [
      { q: "0.75 equals ...", choices: ["1/4", "2/3", "3/4", "4/5"], answer: 2, hint: "75/100 → simplify.", emoji: "🧮" },
      { q: "Which is greater: 5/8 or 0.6?", choices: ["5/8", "0.6", "Equal", "Cannot tell"], answer: 0, hint: "5/8 = 0.625.", emoji: "⚖️" },
      { q: "2/3 + 1/6 = ?", choices: ["1/2", "5/6", "1", "7/6"], answer: 1, hint: "LCD 6.", emoji: "➕" },
      { q: "3/20 as a decimal = ?", choices: ["0.12", "0.15", "0.18", "0.20"], answer: 1, hint: "3 ÷ 20.", emoji: "💡" },
      { q: "Equivalent to 7/9", choices: ["14/18", "21/30", "28/45", "7/18"], answer: 0, hint: "×2 top & bottom.", emoji: "🟰" }
    ]
  },

  "grade6-parallel-lines": {
    id: "grade6-parallel-lines",
    title: "↔️ Parallel Lines & Transversals",
    grade: "Grade 6",
    subject: "Geometry",
    character: "🦓",
    color: "bg-gradient-to-br from-purple-200 to-indigo-300",
    questions: [
      { q: "Corresponding angles are ...", choices: ["Equal", "Supplementary", "Complementary", "Always 90°"], answer: 0, hint: "Matching corners (C-rule).", emoji: "🧭" },
      { q: "Alternate interior angles are ...", choices: ["Equal", "Supplementary", "Complementary", "Right angles"], answer: 0, hint: "Z-pattern.", emoji: "🌀" },
      { q: "Co-interior angles always ...", choices: ["Add to 90°", "Add to 180°", "Are equal", "Are vertical angles"], answer: 1, hint: "U-pattern (straight line).", emoji: "🧩" },
      { q: "Vertically opposite angles are ...", choices: ["Equal", "Supplementary", "Complementary", "Unequal"], answer: 0, hint: "Face each other.", emoji: "🔁" },
      { q: "If ∠A = 70°, corresponding angle is ...", choices: ["110°", "70°", "20°", "90°"], answer: 1, hint: "Parallel ⇒ equal.", emoji: "🎯" }
    ]
  },

  "grade6-data-tally-bar": {
    id: "grade6-data-tally-bar",
    title: "📊 Tally & Bar Graphs",
    grade: "Grade 6",
    subject: "Data Handling",
    character: "🐧",
    color: "bg-gradient-to-br from-stone-200 to-slate-300",
    questions: [
      { q: "Tally group is 5. 3 groups and 2 tallies = ?", choices: ["15", "17", "18", "20"], answer: 1, hint: "3×5 + 2.", emoji: "✅" },
      { q: "Scale: 1 square = 2 students. Bar 9 squares high shows ...", choices: ["9", "18", "20", "16"], answer: 1, hint: "Multiply by scale.", emoji: "🧒" },
      { q: "Frequencies A:6, B:9, C:4, D:9. Mode(s)?", choices: ["B only", "D only", "B and D", "A, B, D"], answer: 2, hint: "Highest frequency.", emoji: "📈" },
      { q: "Which is true for a bar graph?", choices: ["Equal bar widths & spacing", "Bars should touch", "Start anywhere", "Change scale mid-graph"], answer: 0, hint: "Clarity rules.", emoji: "📏" },
      { q: "Mean of 4, 6, 10", choices: ["6", "6.5", "6.67", "7"], answer: 2, hint: "(4+6+10)/3.", emoji: "➗" }
    ]
  },

  "grade6-mensuration": {
    id: "grade6-mensuration",
    title: "📐 Mensuration Basics",
    grade: "Grade 6",
    subject: "Mensuration",
    character: "🐢",
    color: "bg-gradient-to-br from-lime-200 to-emerald-300",
    questions: [
      { q: "Area of 12 cm × 7 cm rectangle", choices: ["19 cm²", "84 cm²", "72 cm²", "90 cm²"], answer: 1, hint: "L×B.", emoji: "🧮" },
      { q: "Perimeter of square side 9 cm", choices: ["27 cm", "36 cm", "45 cm", "81 cm"], answer: 1, hint: "4a.", emoji: "🟪" },
      { q: "Area of triangle (b=10, h=6)", choices: ["16 cm²", "30 cm²", "36 cm²", "60 cm²"], answer: 1, hint: "½bh.", emoji: "🔺" },
      { q: "Convert 2500 cm² to m²", choices: ["0.025", "0.25", "2.5", "25"], answer: 1, hint: "1 m² = 10,000 cm².", emoji: "🔄" },
      { q: "Perimeter 50 m; L=15 m. Width?", choices: ["8", "10", "12", "20"], answer: 1, hint: "P=2(L+W).", emoji: "📏" }
    ]
  },

  "grade6-rates-percents": {
    id: "grade6-rates-percents",
    title: "⚡ Ratios, Rates & Percents",
    grade: "Grade 6",
    subject: "Number",
    character: "🦄",
    color: "bg-gradient-to-br from-rose-200 to-orange-300",
    questions: [
      { q: "25% of 240 = ?", choices: ["50", "60", "75", "80"], answer: 1, hint: "Quarter of 240.", emoji: "🎯" },
      { q: "Simplify 18:24", choices: ["2:3", "3:4", "4:3", "6:8"], answer: 1, hint: "÷6.", emoji: "🧮" },
      { q: "Speed for 150 km in 2.5 h", choices: ["50 km/h", "60 km/h", "65 km/h", "75 km/h"], answer: 1, hint: "D÷T.", emoji: "🚗" },
      { q: "₹180 for 12 notebooks: ₹ per notebook", choices: ["₹12", "₹13", "₹15", "₹18"], answer: 2, hint: "Divide cost by count.", emoji: "📒" },
      { q: "₹200 → ₹250. % increase?", choices: ["20%", "25%", "30%", "40%"], answer: 1, hint: "Change÷original×100.", emoji: "📈" }
    ]
  },

  "grade6-karting": {
    id: "grade6-karting",
    title: "🏎️ Karting Math — Speed & Laps",
    grade: "Grade 6",
    subject: "Applied Math",
    character: "🐱‍🏍",
    color: "bg-gradient-to-br from-slate-200 to-zinc-300",
    questions: [
      { q: "Lap=400 m. 3 laps in 6 min. Avg speed (m/s) ≈ ?", choices: ["2", "3", "3.33", "4"], answer: 2, hint: "1200 m / 360 s.", emoji: "⏱️" },
      { q: "Fuel: 0.5 L per 10 km. For 25 km you need ...", choices: ["1.0 L", "1.25 L", "1.5 L", "2.0 L"], answer: 1, hint: "Per km × distance.", emoji: "⛽" },
      { q: "Speed 24→30 km/h. % increase?", choices: ["15%", "20%", "25%", "30%"], answer: 2, hint: "(6/24)×100.", emoji: "📊" },
      { q: "Lap times: 80, 78, 82 s. Average?", choices: ["79", "80", "81", "82"], answer: 1, hint: "Sum÷3.", emoji: "🧠" },
      { q: "Track 1.5 km. Distance in 4 laps?", choices: ["5 km", "6 km", "7.5 km", "8 km"], answer: 1, hint: "1.5×4.", emoji: "🛞" }
    ]
  },

  // Grade 7 (our deep work)
  "grade7-integers": {
    id: "grade7-integers",
    title: "➕➖ Integers & Number Line",
    grade: "Grade 7",
    subject: "Number",
    character: "🤖",
    color: "bg-gradient-to-br from-blue-200 to-cyan-300",
    questions: [
      { q: "−7 + 12 = ?", choices: ["−19", "5", "−5", "7"], answer: 1, hint: "Move right from −7.", emoji: "➡️" },
      { q: "(−3) × (−5) = ?", choices: ["−15", "15", "8", "−8"], answer: 1, hint: "Neg × Neg = Pos.", emoji: "✖️" },
      { q: "Additive inverse of −9", choices: ["−9", "9", "0", "−1"], answer: 1, hint: "Makes sum 0.", emoji: "0️⃣" },
      { q: "Which is true?", choices: ["−3 > −1", "−1 > −3", "−5 > 0", "0 < −2"], answer: 1, hint: "Right is greater.", emoji: "📍" },
      { q: "14 + (−9) + (−6) = ?", choices: ["−1", "1", "−11", "11"], answer: 0, hint: "Combine negatives.", emoji: "🧮" }
    ]
  },

  "grade7-add-3-integers": {
    id: "grade7-add-3-integers",
    title: "🧠 Adding Three or More Integers",
    grade: "Grade 7",
    subject: "Number",
    character: "🦾",
    color: "bg-gradient-to-br from-indigo-200 to-purple-300",
    questions: [
      { q: "−12 + 7 + 9 = ?", choices: ["2", "4", "−4", "14"], answer: 1, hint: "Group positives first.", emoji: "🧩" },
      { q: "25 + (−18) + (−7) = ?", choices: ["−2", "0", "2", "4"], answer: 1, hint: "25−18−7.", emoji: "➖" },
      { q: "−3 + (−8) + 15 = ?", choices: ["−4", "0", "4", "6"], answer: 2, hint: "Combine negatives.", emoji: "🧮" },
      { q: "To reach 30: (−5) + 18 + x = 30. x = ?", choices: ["12", "15", "17", "20"], answer: 2, hint: "Solve for x.", emoji: "❓" },
      { q: "True/False: (−a) + (−b) = −(a + b)", choices: ["True", "False", "Sometimes", "Only if a,b>0"], answer: 0, hint: "Factor −1.", emoji: "📐" }
    ]
  },

  "grade7-ratio-proportion": {
    id: "grade7-ratio-proportion",
    title: "⚖️ Ratio, Proportion & Unitary",
    grade: "Grade 7",
    subject: "Ratio & Proportion",
    character: "🧠",
    color: "bg-gradient-to-br from-amber-200 to-red-300",
    questions: [
      { q: "Simplify 24:36", choices: ["3:2", "2:3", "4:5", "5:6"], answer: 1, hint: "÷12.", emoji: "🧮" },
      { q: "If 5 pencils cost ₹20, cost of 8 pencils = ?", choices: ["₹28", "₹30", "₹32", "₹36"], answer: 2, hint: "Unitary first.", emoji: "✏️" },
      { q: "a:b = 3:4, b:c = 6:5 ⇒ a:c = ?", choices: ["9:10", "10:9", "3:5", "5:3"], answer: 0, hint: "Equalize b.", emoji: "🔗" },
      { q: "Workers doubled, time halves. This is ...", choices: ["Direct", "Inverse", "No relation", "Exponential"], answer: 1, hint: "↑ one, ↓ the other.", emoji: "♻️" },
      { q: "Find x: 7/x = 21/24", choices: ["7", "8", "9", "10"], answer: 1, hint: "Cross-multiply.", emoji: "❎" },
      { q: "2 kg apples cost ₹150. Cost of 750 g = ?", choices: ["₹56.25", "₹60.00", "₹52.50", "₹62.50"], answer: 0, hint: "Per kg × 0.75.", emoji: "🍎" },
      { q: "Map scale 1:50,000. 2 cm = ?", choices: ["0.5 km", "1 km", "2 km", "5 km"], answer: 1, hint: "1 cm = 0.5 km.", emoji: "🗺️" },
      
  {
    "q": "Simplify 45:60",
    "choices": ["6:5", "3:4", "4:3", "5:6"],
    "answer": 1,
    "hint": "÷15.",
    "emoji": "🧮"
  },
  {
    "q": "If 3 notebooks cost ₹90, cost of 5 notebooks = ?",
    "choices": ["₹160", "₹150", "₹120", "₹130"],
    "answer": 1,
    "hint": "Unitary method.",
    "emoji": "📓"
  },
  {
    "q": "a:b = 2:5, b:c = 10:3 ⇒ a:c = ?",
    "choices": ["2:1", "1:3", "2:3", "4:3"],
    "answer": 3,
    "hint": "Equalize b.",
    "emoji": "🔗"
  },
  {
    "q": "Speed ↑, time ↓. This is ...",
    "choices": ["No relation", "Direct", "Inverse", "Linear"],
    "answer": 2,
    "hint": "↑ one, ↓ the other.",
    "emoji": "🚗"
  },
  {
    "q": "Find x: 5/x = 15/18",
    "choices": ["6", "8", "5", "7"],
    "answer": 0,
    "hint": "Cross-multiply.",
    "emoji": "❎"
  },
  {
    "q": "1.5 kg mangoes cost ₹120. Cost of 600 g = ?",
    "choices": ["₹52", "₹48", "₹54", "₹50"],
    "answer": 1,
    "hint": "Per kg × 0.6.",
    "emoji": "🥭"
  },
  {
    "q": "Map scale 1:25,000. 4 cm = ?",
    "choices": ["4 km", "0.5 km", "1 km", "2 km"],
    "answer": 2,
    "hint": "1 cm = 0.25 km.",
    "emoji": "🗺️"
  }
]


    
  },

  "grade7-divisibility": {
    id: "grade7-divisibility",
    title: "🧩 Number Sense & Divisibility",
    grade: "Grade 7",
    subject: "Number",
    character: "🦊",
    color: "bg-gradient-to-br from-yellow-200 to-emerald-300",
    questions: [
      { q: "Which is divisible by 3?", choices: ["145", "246", "701", "920"], answer: 1, hint: "Digits sum divisible by 3.", emoji: "3️⃣" },
      { q: "Divisible by 11: which number?", choices: ["594", "713", "802", "123"], answer: 0, hint: "Alt sum test.", emoji: "1️⃣1️⃣" },
      { q: "LCM of 12 and 18", choices: ["24", "30", "36", "48"], answer: 2, hint: "Prime factors.", emoji: "🔢" },
      { q: "HCF of 24 and 36", choices: ["6", "12", "18", "24"], answer: 1, hint: "Greatest common factor.", emoji: "🧱" },
      { q: "Number ends with 0 is divisible by ...", choices: ["Only 2", "Only 5", "2 and 5", "2, 5 and 10"], answer: 3, hint: "Tens place full.", emoji: "🔚" }
    ]
  },

  "grade7-warmup-mix": {
    id: "grade7-warmup-mix",
    title: "🔥 Grade 7 Warm-up Mix",
    grade: "Grade 7",
    subject: "Mixed",
    character: "🧪",
    color: "bg-gradient-to-br from-zinc-200 to-stone-300",
    questions: [
      { q: "8 + 12 ÷ 3 × 2 = ?", choices: ["12", "14", "16", "20"], answer: 2, hint: "BODMAS", emoji: "🧠" },
      { q: "If y/3 = 7, then y = ?", choices: ["18", "20", "21", "24"], answer: 2, hint: "×3.", emoji: "❎" },
      { q: "15% of 160 = ?", choices: ["16", "20", "24", "32"], answer: 2, hint: "10% + 5%.", emoji: "📊" },
      { q: "Angles on a straight line sum to ...", choices: ["90°", "120°", "180°", "360°"], answer: 2, hint: "Straight angle.", emoji: "📐" },
      { q: "Bag: 3 red, 2 blue, 1 green. P(red) = ?", choices: ["1/3", "1/2", "2/3", "3/4"], answer: 1, hint: "Favorable/Total.", emoji: "🎲" }
    ]
  },

  // Olympiad-style puzzle we practiced
  "grade7-olympiad-ferrets": {
    id: "grade7-olympiad-ferrets",
    title: "🦦 Olympiad Ratio — Ferret Weights",
    grade: "Grade 7",
    subject: "Olympiad",
    character: "🕵️‍♂️",
    color: "bg-gradient-to-br from-teal-200 to-cyan-300",
    questions: [
      { q: "40 furry = 50 fit; 45 fit = 54 friendly. How many friendly weigh same as 50 furry?", choices: ["60", "72", "75", "80"], answer: 2, hint: "Use fit to link furry→friendly.", emoji: "⚖️" }
    ]
  },

  "grade6-integers": {
    id: "grade6-integers",
    title: "➕➖✖️➗ Integer Operations",
    grade: "Grade 6",
    subject: "Math",
    character: "🤓",
    color: "bg-gradient-to-br from-indigo-200 to-purple-300",
    questions: [
      { q: "Add integers using counters: What is the sum of +3 and -5?", choices: ["-2", "+2", "+8", "-8"], answer: 0, hint: "Using counters, +3 and -5 combine to -2.", emoji: "➕" },
      { q: "Add integers using number lines: What is +4 + (-6)?", choices: ["-2", "+2", "+10", "-10"], answer: 0, hint: "On a number line, move 4 units right and 6 units left to reach -2.", emoji: "➕" },
      { q: "Add integers: What is -7 + (-3)?", choices: ["-10", "+10", "-4", "+4"], answer: 0, hint: "Adding two negatives results in -10.", emoji: "➕" },
      { q: "Subtract integers using counters: What is +5 - (+3)?", choices: ["+2", "-2", "+8", "-8"], answer: 0, hint: "Using counters, +5 minus +3 leaves +2.", emoji: "➖" },
      { q: "Subtract integers using number lines: What is -2 - (-4)?", choices: ["+2", "-2", "+6", "-6"], answer: 0, hint: "On a number line, move 2 units left and 4 units right to reach +2.", emoji: "➖" },
      { q: "Subtract integers: What is +6 - (-3)?", choices: ["+9", "-9", "+3", "-3"], answer: 0, hint: "Subtracting a negative is equivalent to addition: +6 + 3 = +9.", emoji: "➖" },
      { q: "Add and subtract integers: find the sign: What is the sign of -4 + (+2)?", choices: ["Negative", "Positive", "Zero", "Undefined"], answer: 0, hint: "The result is -2, which is negative.", emoji: "➕➖" },
      { q: "Add and subtract integers: word problems: If you owe $5 and earn $3, what is your balance?", choices: ["-2", "+2", "+8", "-8"], answer: 0, hint: "Owing $5 and earning $3 results in a balance of -2.", emoji: "💰" },
      { q: "Add and subtract integers: input/output tables: If input is -3 and output is +5, what is the operation?", choices: ["Addition", "Subtraction", "Multiplication", "Division"], answer: 0, hint: "Adding +8 to -3 results in +5.", emoji: "📊" },
      { q: "Add three or more integers: What is -2 + (+3) + (-4)?", choices: ["-3", "+3", "+7", "-7"], answer: 0, hint: "Adding -2, +3, and -4 results in -3.", emoji: "➕" },
      { q: "Understand multiplying by a negative integer using a number line: What is -3 × 2?", choices: ["-6", "+6", "-9", "+9"], answer: 0, hint: "On a number line, moving 3 units left twice results in -6.", emoji: "✖️" },
      { q: "Multiply integers: find the sign: What is the sign of -4 × (+2)?", choices: ["Negative", "Positive", "Zero", "Undefined"], answer: 0, hint: "The result is -8, which is negative.", emoji: "✖️" },
      { q: "Multiply integers: What is -7 × (-3)?", choices: ["+21", "-21", "+10", "-10"], answer: 0, hint: "Multiplying two negatives results in +21.", emoji: "✖️" },
      { q: "Divide integers: find the sign: What is the sign of -8 ÷ (+2)?", choices: ["Negative", "Positive", "Zero", "Undefined"], answer: 0, hint: "The result is -4, which is negative.", emoji: "➗" },
      { q: "Divide integers: What is +12 ÷ (-3)?", choices: ["-4", "+4", "-9", "+9"], answer: 0, hint: "Dividing a positive by a negative results in -4.", emoji: "➗" }
    ]
  },
};

// export default QUIZ_DATA; // optional


const CHARACTERS = {
  "🐻": { name: "Buddy Bear", saying: "Let's count together!" },
  "🦁": { name: "Leo Lion", saying: "Roar-some job!" },
  "🚀": { name: "Rocket Rob", saying: "Blast off to success!" },
  "🦸‍♂️": { name: "Math Hero", saying: "You're super!" },
  "🍕": { name: "Pizza Pete", saying: "Deliciously done!" },
  "📐": { name: "Geo Gary", saying: "Perfectly calculated!" },
  "🧙‍♂️": { name: "Word Wizard", saying: "Magically smart!" }
};

export default function QuizEngine() {
  const [quizzes] = useState(Object.values(QUIZ_DATA));
  const [sel, setSel] = useState(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState({}); // qIndex -> choiceIndex
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [streak, setStreak] = useState(0);
  const [confetti, setConfetti] = useState(false);

  const chooseQuiz = (id) => {
    const q = quizzes.find(q => q.id === id) || null;
    setSel(q);
    setScore(0);
    setAnswered({});
    setCurrentQuestion(0);
    setStreak(0);
    setShowCelebration(false);
  };

  const mark = (i, choiceIndex) => {
    if (!sel) return;
    if (answered[i] != null) return; // lock once answered
    
    const correct = sel.questions[i].answer;
    const isCorrect = choiceIndex === correct;
    
    setAnswered({ ...answered, [i]: choiceIndex });
    
    if (isCorrect) {
      setScore(s => s + 1);
      setStreak(s => s + 1);
      setConfetti(true);
      setTimeout(() => setConfetti(false), 2000);
      
      // Auto-advance to next question after correct answer
      setTimeout(() => {
        if (i < sel.questions.length - 1) {
          setCurrentQuestion(i + 1);
        } else {
          setShowCelebration(true);
        }
      }, 1500);
    } else {
      setStreak(0);
    }
  };

  const resetQuiz = () => {
    setScore(0);
    setAnswered({});
    setCurrentQuestion(0);
    setStreak(0);
    setShowCelebration(false);
  };

  const getGradeQuizzes = (grade) => {
    return quizzes.filter(q => q.grade === grade);
  };

  const getSubjectQuizzes = (subject) => {
    return quizzes.filter(q => q.subject === subject);
  };

  const ConfettiAnimation = () => (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-bounce text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${1 + Math.random()}s`
          }}
        >
          {['🎉', '⭐', '🌟', '✨', '🎊'][Math.floor(Math.random() * 5)]}
        </div>
      ))}
    </div>
  );

  const CharacterMessage = ({ character, message, isCorrect }) => (
    <div className={`flex items-center gap-3 p-4 rounded-2xl ${isCorrect ? 'bg-green-100 border-2 border-green-300' : 'bg-blue-100 border-2 border-blue-300'} animate-bounce`}>
      <div className="text-4xl">{character}</div>
      <div className="flex-1">
        <div className="font-bold text-lg">{CHARACTERS[character]?.name || "Quiz Buddy"}</div>
        <div className="text-sm">{message}</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-4">
      {confetti && <ConfettiAnimation />}
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800 mb-2">🎮 Super Quiz Adventure! 🎮</h1>
          <p className="text-lg text-purple-600">Choose your adventure and test your knowledge!</p>
        </div>

        {!sel ? (
          <div className="space-y-8">
            {/* Grade Selection */}
            {["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7"].map(grade => {
              const gradeQuizzes = getGradeQuizzes(grade);
              if (gradeQuizzes.length === 0) return null;
              
              return (
                <div key={grade} className="bg-white rounded-3xl p-6 shadow-xl">
                  <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">{grade} Adventures</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {gradeQuizzes.map(quiz => (
                      <button
                        key={quiz.id}
                        onClick={() => chooseQuiz(quiz.id)}
                        className={`${quiz.color} p-6 rounded-2xl border-4 border-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
                      >
                        <div className="text-center">
                          <div className="text-6xl mb-2">{quiz.character}</div>
                          <h3 className="font-bold text-lg text-gray-800">{quiz.title}</h3>
                          <p className="text-sm text-gray-600">{quiz.subject}</p>
                          <div className="mt-2 bg-white/50 rounded-full px-3 py-1 text-sm font-medium">
                            {quiz.questions.length} Questions
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Quiz Header */}
            <div className={`${sel.color} p-6 rounded-3xl shadow-xl`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-6xl">{sel.character}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{sel.title}</h2>
                    <p className="text-gray-600">{sel.grade} • {sel.subject}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-800">{score}/{sel.questions.length}</div>
                  <div className="text-sm text-gray-600">Score</div>
                  {streak > 0 && (
                    <div className="text-lg font-bold text-orange-600">🔥 {streak} streak!</div>
                  )}
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4 bg-white/30 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${(Object.keys(answered).length / sel.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Back Button */}
            <button
              onClick={() => setSel(null)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-2xl font-bold transition-colors"
            >
              ← Back to Quiz Selection
            </button>

            {/* Celebration Screen */}
            {showCelebration ? (
              <div className="bg-gradient-to-br from-yellow-200 to-orange-300 p-8 rounded-3xl shadow-xl text-center">
                <div className="text-8xl mb-4">🎉</div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Congratulations!</h2>
                <p className="text-xl text-gray-700 mb-6">
                  You scored {score} out of {sel.questions.length}!
                  {score === sel.questions.length && " Perfect score! 🌟"}
                  {score >= sel.questions.length * 0.8 && score < sel.questions.length && " Excellent work! 👏"}
                  {score >= sel.questions.length * 0.6 && score < sel.questions.length * 0.8 && " Good job! 👍"}
                </p>
                <CharacterMessage 
                  character={sel.character} 
                  message={score === sel.questions.length ? "Perfect! You're a superstar!" : CHARACTERS[sel.character]?.saying || "Great effort!"} 
                  isCorrect={true}
                />
                <div className="mt-6 space-x-4">
                  <button
                    onClick={resetQuiz}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold transition-colors"
                  >
                    🔄 Try Again
                  </button>
                  <button
                    onClick={() => setSel(null)}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-2xl font-bold transition-colors"
                  >
                    🎮 New Adventure
                  </button>
                </div>
              </div>
            ) : (
              /* Question Display */
              <div className="bg-white rounded-3xl p-6 shadow-xl">
                {sel.questions.map((q, i) => {
                  const isAnswered = answered[i] != null;
                  const isCurrentQuestion = i === currentQuestion;
                  
                  if (!isCurrentQuestion && !isAnswered) return null;
                  
                  return (
                    <div key={i} className={`${isCurrentQuestion ? 'block' : 'hidden'} space-y-6`}>
                      <div className="text-center">
                        <div className="text-6xl mb-4">{q.emoji}</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                          Question {i + 1} of {sel.questions.length}
                        </h3>
                        <p className="text-xl text-gray-700">{q.q}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {q.choices.map((choice, idx) => {
                          const chosen = answered[i] === idx;
                          const correct = idx === q.answer;
                          let buttonClass = 'p-4 rounded-2xl border-4 font-bold text-lg transition-all duration-300 transform hover:scale-105';
                          
                          if (isAnswered) {
                            if (chosen && correct) {
                              buttonClass += ' bg-green-200 border-green-400 text-green-800';
                            } else if (chosen && !correct) {
                              buttonClass += ' bg-red-200 border-red-400 text-red-800';
                            } else if (correct) {
                              buttonClass += ' bg-green-100 border-green-300 text-green-700';
                            } else {
                              buttonClass += ' bg-gray-100 border-gray-300 text-gray-600';
                            }
                          } else {
                            buttonClass += ' bg-white border-purple-300 hover:bg-purple-100 hover:border-purple-400 text-gray-800';
                          }

                          return (
                            <button
                              key={idx}
                              className={buttonClass}
                              onClick={() => mark(i, idx)}
                              disabled={isAnswered}
                            >
                              <div className="text-2xl mb-2">
                                {['🅰️', '🅱️', '🅲️', '🅳️'][idx]}
                              </div>
                              {choice}
                            </button>
                          );
                        })}
                      </div>

                      {isAnswered && (
                        <div className="space-y-4">
                          {answered[i] === q.answer ? (
                            <CharacterMessage 
                              character={sel.character} 
                              message="Fantastic! You got it right! 🎉" 
                              isCorrect={true}
                            />
                          ) : (
                            <div className="space-y-3">
                              <CharacterMessage 
                                character={sel.character} 
                                message="Oops! Let's learn from this mistake!" 
                                isCorrect={false}
                              />
                              <div className="bg-yellow-100 border-2 border-yellow-300 p-4 rounded-2xl">
                                <div className="font-bold text-yellow-800 mb-2">💡 Hint:</div>
                                <div className="text-yellow-700">{q.hint}</div>
                              </div>
                            </div>
                          )}
                          
                          {i < sel.questions.length - 1 && (
                            <div className="text-center">
                              <button
                                onClick={() => setCurrentQuestion(i + 1)}
                                className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-2xl font-bold transition-colors"
                              >
                                Next Question ➡️
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
