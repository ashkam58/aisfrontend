"use client";
import React from 'react';
import Link from 'next/link';

const JMCPolygonSidesExplainer = () => {

  const PolygonVisual = ({ sides }) => {
    let squares = [{ x: 0, y: 0 }];
    if (sides > 4) {
      for (let i = 0; i < (sides - 4) / 2; i++) {
        squares.push({ x: i + 1, y: 0 });
      }
    }

    const squareSize = 30;
    const padding = 10;
    const width = (squares.length * squareSize) + (2 * padding);
    const height = squareSize + (2 * padding);

    return (
      <svg width={width} height={height} className="mx-auto my-4 bg-gray-100 rounded-lg">
        {squares.map((sq, index) => (
          <rect
            key={index}
            x={padding + sq.x * squareSize}
            y={padding + sq.y * squareSize}
            width={squareSize}
            height={squareSize}
            className="fill-blue-300 stroke-blue-800 stroke-2"
          />
        ))}
      </svg>
    );
  };

  // INTERACTIVE SECTION
  const [numSquares, setNumSquares] = React.useState(1);
  const sides = 4 + 2 * (numSquares - 1);

  const handleChange = (e) => {
    const val = Math.max(1, Math.min(20, Number(e.target.value)));
    setNumSquares(val);
  };

  const InteractivePolygonVisual = () => {
    let squares = [{ x: 0, y: 0 }];
    for (let i = 1; i < numSquares; i++) {
      squares.push({ x: i, y: 0 });
    }
    const squareSize = 30;
    const padding = 10;
    const width = (squares.length * squareSize) + (2 * padding);
    const height = squareSize + (2 * padding);
    return (
      <svg width={width} height={height} className="mx-auto my-4 bg-gray-100 rounded-lg">
        {squares.map((sq, index) => (
          <rect
            key={index}
            x={padding + sq.x * squareSize}
            y={padding + sq.y * squareSize}
            width={squareSize}
            height={squareSize}
            className="fill-blue-300 stroke-blue-800 stroke-2"
          />
        ))}
      </svg>
    );
  };

  return (
    <div className="p-4 md:p-8 lg:p-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-2">The Polygon Problem</h1>
          <p className="text-lg text-gray-600">From the Junior Mathematical Olympiad</p>
        </div>

        <div className="prose lg:prose-xl max-w-none">
          <h2 className="text-2xl font-bold text-gray-800">The Question</h2>
          <p>
            A polygon is made by joining a number of unit squares edge to edge. What are all the possible numbers of sides such a polygon can have?
          </p>
          
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 my-6 rounded-r-lg">
            <p className="font-semibold">Key Information:</p>
            <ul className="list-disc list-inside">
              <li>The polygon is built from unit squares (squares with side length 1).</li>
              <li>The squares are joined "edge to edge".</li>
              <li>The sides of the polygon are the external sides of the squares.</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mt-10">The Solution: A Step-by-Step Explanation</h2>
          
          <h3 className="text-xl font-semibold text-blue-700">Step 1: The Simplest Case</h3>
          <p>
            The simplest possible polygon is a single unit square. It has <strong>4 sides</strong>.
          </p>
          <PolygonVisual sides={4} />

          <h3 className="text-xl font-semibold text-blue-700">Step 2: Adding a Second Square</h3>
          <p>
            Let's attach a second square to one side of the first. When we do this, one side from the original square and one side from the new square become internal. We lose 2 internal sides but gain 4 new external sides from the new square.
          </p>
          <p>
            The change in the number of sides is: <code className="bg-gray-200 p-1 rounded">- 2 (internal) + 4 (new) = +2 sides</code>.
          </p>
          <p>
            So, the new polygon has 4 + 2 = <strong>6 sides</strong>.
          </p>
          <PolygonVisual sides={6} />

          <h3 className="text-xl font-semibold text-blue-700">Step 3: The Pattern Emerges</h3>
          <p>
            Every time we attach a new square to the perimeter of our polygon, we always cover one existing side and introduce three new sides. (Or, in a more complex attachment, cover 'n' sides and introduce 'n+2' or 'n-2' etc., but the parity always changes by an even number). The simplest attachment method gives a net increase of 2 sides.
          </p>
          <p>
            4 sides → 6 sides → 8 sides → 10 sides ... and so on.
          </p>
          <PolygonVisual sides={8} />

          <h3 className="text-xl font-semibold text-blue-700">Step 4: The "Coloring" Proof (Parity)</h3>
          <p>
            There's a clever way to prove the number of sides must always be even. Imagine walking around the perimeter of the polygon.
          </p>
          <ul className="list-disc list-inside">
            <li>Every horizontal step to the right must eventually be balanced by a horizontal step to the left.</li>
            <li>Every vertical step up must eventually be balanced by a vertical step down.</li>
          </ul>
          <p>
            This means the number of "right" sides equals the number of "left" sides, so the total number of horizontal sides is even. Similarly, the total number of vertical sides is even.
          </p>
          <p>
            Total Sides = (Even number of horizontal sides) + (Even number of vertical sides) = <strong>Even Number</strong>.
          </p>

          <div className="bg-green-100 border-l-4 border-green-500 p-6 my-8 rounded-r-lg shadow-md">
            <h2 className="text-3xl font-bold text-green-800">Conclusion</h2>
            <p className="mt-2 text-lg">
              The number of sides must be an even number. We've shown we can construct polygons with 4, 6, 8, ... sides. A polygon cannot have 0 or 2 sides.
            </p>
            <p className="mt-4 font-bold text-xl text-center text-gray-800">
              Therefore, the possible number of sides is any even integer greater than or equal to 4.
            </p>
          </div>

          {/* INTERACTIVE SECTION */}
          <div className="mb-10 p-6 bg-blue-50 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-blue-700 mb-2">Explore: Build Your Own Polygon!</h2>
            <label className="block mb-2 text-lg font-semibold">Number of unit squares:
              <input type="number" min="1" max="20" value={numSquares} onChange={handleChange} className="ml-2 px-2 py-1 rounded border border-blue-300 w-16" />
            </label>
            <InteractivePolygonVisual />
            <p className="mt-2 text-lg">This polygon has <span className="font-bold text-blue-800">{sides}</span> sides.</p>
            <p className="text-sm text-gray-600">(Try different numbers! Each time you add a square, the number of sides increases by 2.)</p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/theory" className="text-blue-600 hover:text-blue-800 hover:underline font-semibold">
            &larr; Back to Theory
          </Link>
          <div className="mt-4 text-sm text-gray-600">Note: this JMC route has been archived; the JMC section was removed from navigation.</div>
        </div>
      </div>
    </div>
  );
};

export default JMCPolygonSidesExplainer;
