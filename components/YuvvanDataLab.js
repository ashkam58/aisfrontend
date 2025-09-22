'use client';

import { useState } from 'react';

const TABLET_SALES = [
  { label: 'Jun 2011', value: 1 },
  { label: 'Dec 2011', value: 2 },
  { label: 'Jun 2012', value: 3 },
  { label: 'Dec 2012', value: 3.5 },
  { label: 'Jun 2013', value: 4.2 },
  { label: 'Dec 2013', value: 5 }
];

const PC_SALES = [
  { label: 'Jun 2011', value: 38 },
  { label: 'Dec 2011', value: 40 },
  { label: 'Jun 2012', value: 37 },
  { label: 'Dec 2012', value: 36 },
  { label: 'Jun 2013', value: 34 },
  { label: 'Dec 2013', value: 32 }
];

const MUSIC_SINGLES = [
  { label: '2012', value: 78 },
  { label: '2013', value: 74 },
  { label: '2014', value: 71 },
  { label: '2015', value: 56 },
  { label: '2016', value: 51 },
  { label: '2017', value: 44 },
  { label: '2018', value: 31 }
];

const TREE_DATA = [
  { id: 'A', diameter: 6, height: 12 },
  { id: 'B', diameter: 8, height: 16 },
  { id: 'C', diameter: 10, height: 19 },
  { id: 'D', diameter: 12, height: 21 },
  { id: 'E', diameter: 14, height: 24 },
  { id: 'F', diameter: 16, height: 26 },
  { id: 'G', diameter: 18, height: 30 },
  { id: 'H', diameter: 20, height: 32 },
  { id: 'Q', diameter: 11, height: 6, flagged: true }
];

const GESTATION_ROWS = [
  { x: 'Baboon', y: '180 days, litter size 1' },
  { x: 'Dog', y: '62 days, litter size 4' },
  { x: 'Goat', y: '150 days, litter size 2' },
  { x: 'Hamster', y: '16 days, litter size 6.3' },
  { x: 'Hedgehog', y: '34 days, litter size 4.6' },
  { x: 'Raccoon', y: '64 days, litter size 3.5' },
  { x: 'Squirrel', y: '38 days, litter size 3' },
  { x: 'Tiger', y: '104 days, litter size 3' }
];

const PLAICE_ROWS = [
  { x: '1.6 deg C', y: '135 fish' },
  { x: '2.4 deg C', y: '70 fish' },
  { x: '2.9 deg C', y: '30 fish' },
  { x: '0.4 deg C', y: '225 fish' },
  { x: '1.2 deg C', y: '145 fish' },
  { x: '0.2 deg C', y: '290 fish' },
  { x: '1.0 deg C', y: '160 fish' },
  { x: '0.6 deg C', y: '250 fish' },
  { x: '2.2 deg C', y: '130 fish' },
  { x: '2.9 deg C', y: '45 fish' },
  { x: '1.7 deg C', y: '100 fish' },
  { x: '2.6 deg C', y: '75 fish' }
];

const TSHIRT_ROWS = [
  { x: 'GBP 12', y: 'Designer 420, TShirtsRUs 450' },
  { x: 'GBP 15', y: 'Designer 330, TShirtsRUs 300' },
  { x: 'GBP 20', y: 'Designer 510, TShirtsRUs 120' },
  { x: 'GBP 25', y: 'Designer 350, TShirtsRUs 80' },
  { x: 'GBP 30', y: 'Designer 420, TShirtsRUs 60' }
];

const ESSAY_ROWS = [
  { x: '165 cm', y: '1.4 pages' },
  { x: '157 cm', y: '0.7 pages' },
  { x: '168 cm', y: '1.6 pages' },
  { x: '177 cm', y: '2.3 pages' },
  { x: '173 cm', y: '2.1 pages' },
  { x: '171 cm', y: '1.8 pages' },
  { x: '154 cm', y: '0.9 pages' }
];

function MultiChoiceQuestion({ prompt, options, correctAnswers, explanation, allowMultiple = false, buttonLabel = 'Check answer' }) {
  const [selected, setSelected] = useState(allowMultiple ? [] : null);
  const [feedback, setFeedback] = useState(null);

  const toggleOption = (index) => {
    if (allowMultiple) {
      setSelected((prev) => {
        if (prev.includes(index)) {
          return prev.filter((value) => value !== index);
        }
        return [...prev, index];
      });
    } else {
      setSelected(index);
    }
  };

  const check = () => {
    if (allowMultiple) {
      const pick = [...selected].sort();
      const correct = [...correctAnswers].sort();
      const ok = pick.length === correct.length && pick.every((value, idx) => value === correct[idx]);
      setFeedback(ok ? { type: 'success', message: 'Great job! That matches the reasoning.' } : { type: 'error', message: 'Revisit the evidence before trying again.' });
    } else {
      const ok = correctAnswers.includes(selected);
      setFeedback(ok ? { type: 'success', message: 'Correct. You spotted what matters.' } : { type: 'error', message: 'Not yet. Compare the clues again.' });
    }
  };

  const reset = () => {
    setSelected(allowMultiple ? [] : null);
    setFeedback(null);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="mb-3 font-semibold text-slate-800">{prompt}</p>
      <div className="space-y-2">
        {options.map((option, index) => {
          const isActive = allowMultiple ? selected.includes(index) : selected === index;
          return (
            <button
              key={option}
              type="button"
              onClick={() => toggleOption(index)}
              className={`w-full rounded-xl border px-3 py-2 text-left text-sm transition ${
                isActive ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 bg-slate-50 hover:border-blue-200 hover:bg-blue-50'
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={check}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          {buttonLabel}
        </button>
        <button
          type="button"
          onClick={reset}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
        >
          Reset
        </button>
      </div>
      {feedback && (
        <div
          className={`mt-3 rounded-xl border px-3 py-2 text-sm ${
            feedback.type === 'success' ? 'border-green-200 bg-green-50 text-green-700' : 'border-amber-200 bg-amber-50 text-amber-700'
          }`}
        >
          <p className="font-semibold">{feedback.type === 'success' ? 'Well spotted!' : 'Keep refining.'}</p>
          <p>{feedback.message}</p>
          {explanation && <p className="mt-1 text-xs text-slate-600">Hint: {explanation}</p>}
        </div>
      )}
    </div>
  );
}

function SeriesBars({ title, data, axisStart, axisEnd, accent }) {
  const range = axisEnd - axisStart || 1;

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-2 flex items-baseline justify-between">
        <h4 className="font-semibold text-slate-800">{title}</h4>
        <p className="text-xs text-slate-500">Axis: {axisStart} to {axisEnd}</p>
      </div>
      <div className="space-y-2">
        {data.map((point) => {
          const width = Math.max(0, Math.min(100, ((point.value - axisStart) / range) * 100));
          return (
            <div key={point.label} className="flex items-center gap-3">
              <div className="w-24 text-xs font-semibold text-slate-600">{point.label}</div>
              <div className="h-4 flex-1 rounded-full bg-white">
                <div className="h-4 rounded-full" style={{ width: `${width}%`, backgroundColor: accent }} />
              </div>
              <div className="w-12 text-right text-xs font-medium text-slate-700">{point.value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ScatterTable({ title, xLabel, yLabel, rows }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h4 className="mb-3 font-semibold text-slate-800">{title}</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-3 py-2 text-left font-semibold text-slate-600">#</th>
              <th className="px-3 py-2 text-left font-semibold text-slate-600">{xLabel}</th>
              <th className="px-3 py-2 text-left font-semibold text-slate-600">{yLabel}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, index) => (
              <tr key={`${row.x}-${row.y}-${index}`} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <td className="px-3 py-2 text-slate-500">{index + 1}</td>
                <td className="px-3 py-2 font-medium text-slate-700">{row.x}</td>
                <td className="px-3 py-2 font-medium text-slate-700">{row.y}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function YuvvanDataLab({ onBack }) {
  const [lineAxisMode, setLineAxisMode] = useState('misleading');
  const [musicAxisMode, setMusicAxisMode] = useState('trimmed');
  const [selectedDiameter, setSelectedDiameter] = useState(6);

  const diameterMatch = TREE_DATA.find((item) => item.diameter === Number(selectedDiameter));
  const heightAtDiameter = diameterMatch ? `${diameterMatch.height} m` : '-';
  const diametersForTwentySix = TREE_DATA.filter((item) => item.height === 26).map((item) => item.diameter);
  const flaggedIndex = TREE_DATA.findIndex((item) => item.flagged);

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6">
        <h2 className="text-2xl font-bold text-blue-900">Yuvvan's Data Detective Lab</h2>
        <p className="mt-2 text-sm text-blue-800">Student: Yuvvan (Grade 8). These stations turn textbook prompts on misleading graphs and scatter graphs into interactive practice.</p>
        <p className="mt-1 text-sm text-blue-800">Switch the axes, test yourself, and craft headlines that match the evidence.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setLineAxisMode((prev) => (prev === 'misleading' ? 'aligned' : 'misleading'))}
            className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm hover:bg-blue-100"
          >
            Toggle line graph scales
          </button>
          <button
            type="button"
            onClick={() => setMusicAxisMode((prev) => (prev === 'trimmed' ? 'honest' : 'trimmed'))}
            className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm hover:bg-blue-100"
          >
            Toggle bar chart scales
          </button>
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="rounded-2xl border border-blue-300 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-white"
            >
              Back to formula hub
            </button>
          )}
        </div>
      </div>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900">1. Misleading line graphs</h3>
        <p className="text-sm text-slate-700">The companies used different vertical scales. Try both views to feel the shift in narrative.</p>
        <div className="grid gap-4 md:grid-cols-2">
          <SeriesBars title="Tablet sales (millions)" data={TABLET_SALES} axisStart={0} axisEnd={5} accent="#60a5fa" />
          <SeriesBars title="PC sales (millions)" data={PC_SALES} axisStart={lineAxisMode === 'misleading' ? 30 : 0} axisEnd={40} accent="#f97316" />
        </div>
        <p className="text-xs text-slate-500">Mode: {lineAxisMode === 'misleading' ? 'Original axis starting at 30 (misleading)' : 'Aligned axis starting at 0 (honest)'}.</p>
        <MultiChoiceQuestion
          prompt="Why are the paired line graphs misleading in the original article?"
          options={[
            'The tablet axis starts at zero but the PC axis starts at 30, exaggerating the drop.',
            'Both axes start at zero so there is no issue.',
            'The months do not match between the graphs.',
            'The PC data has too many points.'
          ]}
          correctAnswers={[0]}
          explanation="Set both scales to the same baseline to compare trends fairly."
        />
        <MultiChoiceQuestion
          prompt="What remains true after aligning both axes to zero?"
          options={[
            'PC sales still fall, but the change is modest relative to the full scale.',
            'PC sales now rise because the scale changed.',
            'Tablet sales collapse suddenly.',
            'Both lines become flat.'
          ]}
          correctAnswers={[0]}
          explanation="Changing the scale changes perception, not the underlying numbers."
        />
        <MultiChoiceQuestion
          prompt="Choose the best revised headline."
          options={[
            'Tablet sales keep rising while PC sales slip gently.',
            'PC market collapses overnight.',
            'Tablet crash wipes out the tech sector.',
            'Sales stay exactly the same.'
          ]}
          correctAnswers={[0]}
          explanation="The corrected graph shows steady tablet growth and a small PC decline."
        />
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900">2. Music download bar chart</h3>
        <p className="text-sm text-slate-700">Trimmed axes soften the fall. Flip the switch to restore the zero baseline.</p>
        <SeriesBars title="Music singles downloaded (millions)" data={MUSIC_SINGLES} axisStart={musicAxisMode === 'trimmed' ? 40 : 0} axisEnd={80} accent="#34d399" />
        <p className="text-xs text-slate-500">Mode: {musicAxisMode === 'trimmed' ? 'Trimmed axis 40 to 80 (misleading)' : 'Zero axis 0 to 80 (honest)'}.</p>
        <MultiChoiceQuestion
          prompt="Select the two reasons this trimmed bar chart is misleading."
          options={[
            'The y-axis starts high at 40, hiding the scale of the fall.',
            'The years are not in order.',
            'The scale jumps unevenly along the x-axis.',
            'Flat looking bars make a large drop feel tiny.'
          ]}
          allowMultiple
          correctAnswers={[0, 3]}
          explanation="Starting high compresses the decline and the flat bars underplay the change."
        />
        <MultiChoiceQuestion
          prompt="What should an accurate redraw emphasise?"
          options={[
            'A large drop from 78 million to 31 million downloads across the years.',
            'That sales hardly move.',
            'That 2018 spikes upward.',
            'That only one data point was recorded.'
          ]}
          correctAnswers={[0]}
          explanation="The true story is a steady decrease year after year."
        />
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900">3. Tree height versus trunk diameter</h3>
        <ScatterTable
          title="Tree measurements"
          xLabel="Trunk diameter (cm)"
          yLabel="Height (m)"
          rows={TREE_DATA.map((item) => ({ x: `${item.diameter} cm`, y: `${item.height} m${item.flagged ? ' *' : ''}` }))}
        />
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <label className="block text-sm font-semibold text-slate-700" htmlFor="diameter-select">Pick a trunk diameter to read its height</label>
          <select
            id="diameter-select"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-blue-400 focus:outline-none"
            value={selectedDiameter}
            onChange={(event) => setSelectedDiameter(Number(event.target.value))}
          >
            {TREE_DATA.map((item) => (
              <option key={item.id} value={item.diameter}>
                {item.diameter} cm
              </option>
            ))}
          </select>
          <p className="mt-3 text-sm text-slate-700">Height estimate: <span className="font-semibold">{heightAtDiameter}</span></p>
        </div>
        <MultiChoiceQuestion
          prompt="Describe the correlation in the scatter graph."
          options={[
            'Strong positive: thicker trunks tend to mean taller trees.',
            'Negative: taller trees have thinner trunks.',
            'No relationship.'
          ]}
          correctAnswers={[0]}
          explanation="The points rise together from left to right."
        />
        <p className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          Diameter 6 cm maps to about 12 m tall. The only tree near 26 m has trunk diameter {diametersForTwentySix.join(' cm, ')} cm. Outliers can appear if a tree is diseased or if a measurement slipped.
        </p>
        <MultiChoiceQuestion
          prompt="Which plotted point is likely incorrect?"
          options={TREE_DATA.map((item) => (item.flagged ? `${item.id}: diameter 11 cm, height 6 m` : `${item.id}: diameter ${item.diameter} cm, height ${item.height} m`))}
          correctAnswers={[flaggedIndex]}
          explanation="All other points follow the upward trend; the 11 cm trunk with a 6 m height does not."
        />
        <MultiChoiceQuestion
          prompt="Give another reason a point may not fit the pattern."
          options={[
            'The tree might be damaged or recently trimmed.',
            'Scatter graphs must form a perfect line.',
            'Diameters above 10 cm are impossible.',
            'Tall trees always grow alone.'
          ]}
          correctAnswers={[0]}
          explanation="Real data has variation from damage, age, or measurement error."
        />
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900">4. Gestation period versus litter size</h3>
        <ScatterTable title="Mammal data" xLabel="Mammal" yLabel="Gestation and litter" rows={GESTATION_ROWS} />
        <MultiChoiceQuestion
          prompt="What type of correlation appears between gestation length and litter size?"
          options={[
            'Negative: longer gestation links to smaller litters.',
            'Positive: longer gestation links to larger litters.',
            'None: the points are random.'
          ]}
          correctAnswers={[0]}
          explanation="Species with quick gestation often have many young; slow gestation species have few."
        />
        <MultiChoiceQuestion
          prompt="How strong is the correlation?"
          options={[
            'Fairly strong negative: the points track a clear downward line.',
            'Weak negative: very scattered.',
            'Strong positive.'
          ]}
          correctAnswers={[0]}
          explanation="Most points sit close to a downward trend line."
        />
        <MultiChoiceQuestion
          prompt="Complete the sentence."
          options={[
            'Mammals with longer gestation periods tend to have fewer offspring in each litter.',
            'Mammals with shorter gestation periods tend to have fewer offspring.',
            'Mammals with longer gestation periods tend to have more offspring.'
          ]}
          correctAnswers={[0]}
          explanation="Longer gestation is linked with smaller litter sizes."
        />
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900">5. Environment and market scatter challenges</h3>
        <ScatterTable title="Sea temperature versus plaice count" xLabel="Sea temperature" yLabel="Number of plaice" rows={PLAICE_ROWS} />
        <MultiChoiceQuestion
          prompt="Describe the correlation between temperature and plaice numbers."
          options={[
            'Negative: warmer seas link with fewer plaice.',
            'Positive: warmer seas link with more plaice.',
            'None: the pattern is random.'
          ]}
          correctAnswers={[0]}
          explanation="Higher temperatures correspond to lower fish counts throughout the table."
        />
        <p className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          If the average temperature rises by about 0.2 deg C, this downward trend warns that plaice numbers would likely keep falling. Yuvvan can explain that correlation does not prove cause, but it does flag a serious risk to explore.
        </p>
        <ScatterTable title="T-shirt price versus number sold" xLabel="Price" yLabel="Sales data" rows={TSHIRT_ROWS} />
        <MultiChoiceQuestion
          prompt="Before plotting, what correlation would you expect between price and number sold?"
          options={[
            'Negative: higher price means fewer sales.',
            'Positive: higher price means more sales.',
            'No clear relationship.'
          ]}
          correctAnswers={[0]}
          explanation="Demand usually falls as price rises."
        />
        <MultiChoiceQuestion
          prompt="What do the plotted points show for the two brands?"
          options={[
            'Both brands show a negative correlation, with different steepness.',
            'Designer shows a positive correlation while TShirtsRUs is negative.',
            'Designer has no correlation while TShirtsRUs is positive.'
          ]}
          correctAnswers={[0]}
          explanation="Both brands sell fewer shirts as price increases, but at different rates."
        />
        <ScatterTable title="Student height versus essay length" xLabel="Height" yLabel="Essay length" rows={ESSAY_ROWS} />
        <MultiChoiceQuestion
          prompt="What correlation appears between height and essay length?"
          options={[
            'Weak positive: taller students slightly tend to write longer essays.',
            'Strong negative: taller students write shorter essays.',
            'None at all.'
          ]}
          correctAnswers={[0]}
          explanation="There is a gentle upward trend, though not perfect."
        />
      </section>

      <section className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <h3 className="text-xl font-bold text-slate-900">Reflection for Yuvvan</h3>
        <p className="text-sm text-slate-700">
          Checklist: 1) Do axes start from the same baseline? 2) Are scales equally spaced? 3) Do outliers have a story (error, age, or real exception)? 4) Does correlation imply a sensible narrative?
        </p>
        <p className="text-sm text-slate-700">
          Summarise one insight in your own words, then challenge a friend to spot the trick in the first graph.
        </p>
      </section>
    </div>
  );
}
