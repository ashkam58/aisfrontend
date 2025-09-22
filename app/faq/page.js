'use client';

const faqs = [
  {
    question: 'How is Ultimate EdTech different from generic math practice sites?',
    answer:
      'We combine synchronous teaching, asynchronous missions, and game mechanics built with educators. Each unit includes theory briefings, arcade style practice, and reflection prompts so students explain what happened, not just click answers.',
  },
  {
    question: 'What grade levels do you support right now?',
    answer:
      'The core platform focuses on grades 5 through 9. Geometry, algebra foundations, and problem solving tracks receive weekly content updates. Elementary enrichment and olympiad pathways are in open beta.',
  },
  {
    question: 'How do live classes connect with the games inside the app?',
    answer:
      'Teachers open the same interactive tools during Zoom sessions. Learners explore whiteboards, simulations, and quizzes while the instructor models thinking. After class, students replay missions to reinforce the exact moves used in the lesson.',
  },
  {
    question: 'Can parents track progress without juggling multiple dashboards?',
    answer:
      'Yes. Families receive one digest that includes quiz mastery, mission streaks, and upcoming goals. Parents can send encouragement notes directly from the digest to keep the routine motivating.',
  },
  {
    question: 'Do you support schools and micro schools?',
    answer:
      'We partner with small cohorts, pods, and schools. Each group gets a custom launch plan, onboarding webinars, and shared analytics so mentors can intervene early.',
  },
  {
    question: 'What devices work best with the platform?',
    answer:
      'Chromebooks, Windows laptops, Macs, and iPads all run the full experience in modern browsers. For the best drawing performance we recommend a stylus or pen enabled device, but every interaction also works with a mouse or touchpad.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Families can unlock three missions per unit and one live community class before choosing a membership. Educators can request a demo cohort with lesson plans and facilitator guides.',
  },
  {
    question: 'How do you keep learners safe online?',
    answer:
      'We collect minimal data, moderate all chat spaces, and follow strict privacy standards. Student accounts use nickname avatars. Parents control sharing permissions and can pause activity at any time.',
  },
];

// export const metadata = {
//   title: 'Ultimate EdTech FAQ',
//   description: 'Find answers about live classes, interactive math games, parent tools, school partnerships, and device support.',
// };

export default function FaqPage() {
  return (
    <main className="space-y-8">
      <section className="rounded-3xl border border-purple-200 bg-gradient-to-br from-emerald-100 via-white to-purple-100 p-6 text-center shadow">
        <p className="text-xs uppercase tracking-wide text-purple-600">Support Hub</p>
        <h1 className="text-4xl font-black text-purple-900">Frequently Asked Questions</h1>
        <p className="mx-auto mt-3 max-w-3xl text-sm text-purple-700">
          Need a quick answer about programs, pricing, or classroom setups? Browse our most common questions below. If you
          still need help, message the team through chat inside the dashboard.
        </p>
      </section>

      <section className="space-y-4">
        {faqs.map((item) => (
          <details key={item.question} className="rounded-3xl border border-purple-200 bg-white/85 p-5 shadow">
            <summary className="cursor-pointer text-lg font-semibold text-purple-900">{item.question}</summary>
            <p className="mt-2 text-sm text-purple-700">{item.answer}</p>
          </details>
        ))}
      </section>
    </main>
  );
}
