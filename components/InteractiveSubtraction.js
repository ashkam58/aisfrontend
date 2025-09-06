import { useState } from 'react';

export default function InteractiveSubtraction() {
  const [apples, setApples] = useState(5);
  const [taken, setTaken] = useState(0);

  return (
    <div className="bg-cartoonYellow rounded-cartoon p-6 text-center">
      <h3 className="text-2xl font-cartoon text-cartoonGreen mb-2">How many apples are left?</h3>
      <div className="flex justify-center gap-2 mb-4">
        {[...Array(apples)].map((_, i) => (
          <span key={i} className="inline-block w-10 h-10 bg-cartoonRed rounded-full border-4 border-cartoonPink">🍎</span>
        ))}
      </div>
      <div className="mb-4">
        <label className="font-cartoon text-cartoonPurple mr-2">Take away:</label>
        <input
          type="number"
          min={0}
          max={apples}
          value={taken}
          onChange={e => setTaken(Math.max(0, Math.min(apples, Number(e.target.value))))}
          className="rounded-cartoon px-2 py-1 border border-cartoonPurple w-16 text-center font-cartoon"
        />
        <button
          className="ml-4 px-4 py-2 bg-cartoonGreen text-white rounded-cartoon font-cartoon shadow"
          onClick={() => setApples(apples - taken)}
          disabled={taken === 0}
        >
          Subtract
        </button>
      </div>
      <div className="text-xl font-cartoon text-cartoonBlue">
        {apples} apple{apples !== 1 ? 's' : ''} left!
      </div>
    </div>
  );
}
