'use client';

const posts = [
  {
    title: 'Why Interactive Geometry Boosts Grade 9 Confidence',
    slug: 'interactive-geometry-confidence',
    summary:
      'Discover how hands-on rigid motion games help teenagers connect proofs, coordinate moves, and visual intuition.',
    targetKeywords: ['grade 9 geometry', 'rigid motion practice', 'interactive learning'],
    body: [
      'Rigid motion proofs can feel abstract at first. When students manipulate shapes with rotations, translations, and dilations, they see angle and side relationships come alive.',
      'A structured game board reinforces precision. Learners describe each move, match vertices, and justify why every transformation preserves or scales measurements.',
      'The result is stronger proof writing. Students move from guessing to citing the exact transformation sequence that maps one triangle to another.',
    ],
    callToAction: 'Launch the Rigid Motion Rescue mission to try the full sequence of transformations.',
  },
  {
    title: 'Design Principles Behind Our Cartoon Math Arcade',
    slug: 'cartoon-math-arcade-design',
    summary:
      'Peek behind the curtain to see how color, motion, and storytelling turn complex topics into joyful practice sessions.',
    targetKeywords: ['cartoon math games', 'student engagement', 'STEM storytelling'],
    body: [
      'Every scene begins with a narrative hook. Students join the Prism Patrol, a group of geometry explorers who rescue shapes stuck in confusing coordinate zones.',
      'We favor high contrast palettes and responsive controls. The interface guides learners to focus on the most important measurement cues while still feeling playful.',
      'Mission recaps include reflection prompts. Players explain what each slider changed and how that relates to the definition of congruence or similarity.',
    ],
    callToAction: 'Plan a learning sprint that mixes arcade play with notebook reflections for deeper retention.',
  },
  {
    title: 'Building a Home Math Lab That Supports Daily Practice',
    slug: 'home-math-lab-setup',
    summary:
      'Set up a simple routine that blends quick quizzes, family check ins, and long term project tracking.',
    targetKeywords: ['math routine', 'family learning', 'study habits'],
    body: [
      'Pick a consistent time block. Ten minutes before dinner or after school gives teens a predictable slot for math warmups.',
      'Combine online games with analog tools. A small whiteboard or sketchbook helps learners draw figures before testing them inside the app.',
      'Celebrate micro goals. When a student masters translations, post the certificate on the fridge and preview the next challenge together.',
    ],
    callToAction: 'Download the free Math Lab checklist inside the game dashboard to get started.',
  },
];

// export const metadata = {
//   title: 'Ultimate EdTech Blog',
//   description:
//     'Read actionable advice on grade 9 geometry, interactive math games, and learning routines for families and educators.',
// };

export default function BlogPage() {
  return (
    <main className="space-y-8">
      <section className="rounded-3xl border border-purple-200 bg-gradient-to-br from-purple-100 via-white to-sky-100 p-6 text-center shadow">
        <p className="text-xs uppercase tracking-wide text-purple-600">Learning Insights</p>
        <h1 className="text-4xl font-black text-purple-900">Ultimate EdTech Blog</h1>
        <p className="mx-auto mt-3 max-w-3xl text-sm text-purple-700">
          We publish weekly strategies for teachers, families, and students who want joyful math mastery. Explore
          classroom-ready ideas, routines that stick, and deep dives into the design of our interactive experiences.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug} className="flex flex-col gap-4 rounded-3xl border border-purple-200 bg-white/85 p-5 shadow">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-purple-900">{post.title}</h2>
              <p className="text-sm text-purple-700">{post.summary}</p>
              <div className="flex flex-wrap gap-1 text-xs text-purple-500">
                {post.targetKeywords.map((keyword) => (
                  <span key={keyword} className="rounded-full border border-purple-200 px-2 py-1">#{keyword}</span>
                ))}
              </div>
            </div>
            <ul className="flex-1 space-y-2 text-sm text-purple-800">
              {post.body.map((paragraph, index) => (
                <li key={index} className="rounded-2xl bg-purple-50/60 p-3">
                  {paragraph}
                </li>
              ))}
            </ul>
            <p className="text-sm font-semibold text-emerald-700">{post.callToAction}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
