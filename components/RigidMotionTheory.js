"use client";

import { useMemo, useState } from "react";

const TABS = [
  {
    id: "mission",
    title: "Mission Brief",
    summary: "Why rigid motions and dilations matter in grade 9 geometry.",
  },
  {
    id: "rotation",
    title: "Rotation",
    summary: "Spin the shape around a point while keeping distance from the center fixed.",
  },
  {
    id: "translation",
    title: "Translation",
    summary: "Slide the figure so every point travels the same vector.",
  },
  {
    id: "dilation",
    title: "Dilation",
    summary: "Stretch or shrink the figure from a center using a scale factor.",
  },
];

const VOCAB = [
  {
    term: "Rigid Motion",
    meaning: "Transformation that preserves length and angle measure (rotation, translation, reflection).",
  },
  {
    term: "Image",
    meaning: "Resulting figure after a transformation is applied to the pre-image.",
  },
  {
    term: "Scale Factor",
    meaning: "Number that multiplies distances from the dilation center to resize a figure.",
  },
  {
    term: "Composition",
    meaning: "Carrying out several transformations in sequence to achieve a final image.",
  },
];

const TRANSFORMATION_STAGES = [
  {
    label: "Stage 1",
    description: "Start with the pre-image. Sketch reference points (A, B, C) and set axes on the grid.",
    tip: "Always note coordinates before moving anything.",
  },
  {
    label: "Stage 2",
    description: "Apply a rotation or translation. Track how each vertex moves step by step.",
    tip: "Arrows on your drawing should show the direction and distance.",
  },
  {
    label: "Stage 3",
    description: "If the goal is similar, use dilation with the given scale factor from the chosen center.",
    tip: "Multiply distances from the center, then reconnect the vertices.",
  },
  {
    label: "Stage 4",
    description: "Compare the image with the target. Check orientation, side lengths, and angle matches.",
    tip: "Congruent figures share equal sides and angles. Similar figures have proportional sides and equal angles.",
  },
];

export default function RigidMotionTheory() {
  const [activeTab, setActiveTab] = useState("mission");
  const [stageIndex, setStageIndex] = useState(0);
  const activeStage = useMemo(() => TRANSFORMATION_STAGES[stageIndex], [stageIndex]);

  return (
    <div className="space-y-6 rounded-3xl border border-purple-200 bg-white/80 p-6 shadow">
      <header className="space-y-1 text-center">
        <p className="text-xs uppercase tracking-wide text-purple-600">Theory Station</p>
        <h2 className="text-2xl font-bold text-purple-900">Rigid Motions and Dilations Playbook</h2>
        <p className="text-sm text-purple-700">
          Explore the moves behind the Rigid Motion Rescue missions. Switch tabs, study vocabulary, and walk through the
          transformation stages to build intuition.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-[1.2fr_1fr]">
        <section className="space-y-4 rounded-2xl border border-purple-200 bg-purple-50/60 p-4">
          <nav className="flex flex-wrap gap-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                  activeTab === tab.id
                    ? "bg-purple-600 text-white shadow"
                    : "bg-white text-purple-700 hover:bg-purple-100"
                }`}
              >
                {tab.title}
              </button>
            ))}
          </nav>

          <article className="space-y-3 rounded-2xl border border-purple-200 bg-white p-4 text-sm text-purple-800">
            {activeTab === "mission" && (
              <>
                <h3 className="text-lg font-semibold text-purple-900">Mission Brief</h3>
                <p>
                  In grade 9 geometry, you explain why two figures are congruent or similar by citing rigid motions and
                  dilations. A congruence proof might use a rotation followed by a translation, while a similarity proof adds
                  a dilation. The key is matching every vertex from pre-image to image with justified moves.
                </p>
                <p>
                  When you can describe the sequence precisely, you have connected the coordinate plane picture to the
                  formal transformation rules.
                </p>
              </>
            )}
            {activeTab === "rotation" && (
              <>
                <h3 className="text-lg font-semibold text-purple-900">Rotation Focus</h3>
                <p>
                  Rotations spin a figure about a center point. Each vertex stays the same distance from the center, while
                  angles measured from the center change by the rotation amount. Counterclockwise is positive in the plane.
                </p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>State the center, angle, and direction.</li>
                  <li>Use slope triangles or the rotation matrix to compute new coordinates.</li>
                  <li>Check that orientation is preserved (no reflections sneak in).</li>
                </ul>
              </>
            )}
            {activeTab === "translation" && (
              <>
                <h3 className="text-lg font-semibold text-purple-900">Translation Focus</h3>
                <p>
                  Translations slide every point the same distance in the same direction. In coordinate form you add a vector
                  (a, b) to each vertex, producing (x + a, y + b). Side lengths and angles stay the same, so the image is
                  congruent to the pre-image.
                </p>
                <p>
                  Combining a rotation with a translation is often enough to overlap two congruent triangles.
                </p>
              </>
            )}
            {activeTab === "dilation" && (
              <>
                <h3 className="text-lg font-semibold text-purple-900">Dilation Focus</h3>
                <p>
                  Dilations adjust size while keeping the shape. Choose a center P and scale factor k. Multiply the vector
                  from P to each vertex by k to get the image. If k is greater than 1 the figure expands; if 0 &lt; k &lt; 1 it
                  shrinks. When you combine a dilation with a rigid motion you can prove similarity statements.
                </p>
                <p>
                  Remember that when k is negative the image appears on the opposite side of the center, so note orientation.
                </p>
              </>
            )}
          </article>
        </section>

        <section className="space-y-4">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
            <h3 className="text-lg font-semibold text-emerald-900">Transformation Checklist</h3>
            <label className="mt-2 block text-xs font-semibold uppercase text-emerald-700">
              Stage index: {stageIndex + 1}
            </label>
            <input
              type="range"
              min={0}
              max={TRANSFORMATION_STAGES.length - 1}
              value={stageIndex}
              onChange={(event) => setStageIndex(Number(event.target.value))}
              className="w-full accent-emerald-600"
            />
            <div className="mt-3 rounded-xl border border-emerald-200 bg-white p-3">
              <p className="text-sm font-semibold text-emerald-900">{activeStage.label}</p>
              <p className="mt-1 text-sm">{activeStage.description}</p>
              <p className="mt-2 text-xs font-semibold uppercase text-emerald-700">Coach tip</p>
              <p className="text-sm">{activeStage.tip}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-900">
            <h3 className="text-lg font-semibold text-sky-900">Vocabulary Vault</h3>
            <ul className="mt-2 space-y-2">
              {VOCAB.map((item) => (
                <li key={item.term} className="rounded-xl border border-sky-200 bg-white p-3">
                  <div className="text-sm font-semibold text-sky-900">{item.term}</div>
                  <p className="text-sm text-sky-700">{item.meaning}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
