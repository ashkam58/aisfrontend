'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import RegisterForm from '@/components/RegisterForm';
import LoginForm from '@/components/LoginForm';
import PaymentWrapper from '@/components/PaymentForm';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

/**
 * Ultimate EdTech — Conversion‑Focused Landing Page
 * - Next.js app router compatible page component
 * - TailwindCSS for styling; Framer Motion for micro‑animations
 * - Sticky header, floating WhatsApp CTA, parallax background art that stays visible while scrolling
 * - Sections: Hero, Trust, Outcomes, Courses, Live Demos, Features, Testimonials, Pricing, FAQ, Footer
 * - Replace placeholder images with real screenshots later
 * - WhatsApp: +91 80024 16363 (clickable)
 */
export default function HomePage() {
  const wa = 'https://wa.me/918002416363';

  const courses = [
    {
      title: 'Python + DSA (Grades 6–9 & Beginners)',
      blurb:
        'Master problem‑solving with clean Python, data structures, and algorithms. Gamified drills + projects.',
      chip: 'Project‑based',
    },
    {
      title: 'MERN / Next.js Full‑Stack',
      blurb:
        'From REST & auth to dashboards and deployments. Real products, not toy todos. Interview‑ready.',
      chip: 'Job‑oriented',
    },
    {
      title: 'Math Olympiad (Grades 5–8)',
      blurb:
        'Concept first, tricks second. Visual proofs, contest patterns, and smart heuristics with joy.',
      chip: 'Competition',
    },
    {
      title: 'Scratch for Kids (10 Days Bootcamp)',
      blurb:
        'Cartoon‑themed coding adventures. Make games, stories, and logic come alive—no prior coding needed.',
      chip: 'Beginner',
    },
    {
      title: 'Typing & Mental Math Lab',
      blurb:
        'Rapid accuracy training with playful races, mandala keyboard drills, and speed music sessions.',
      chip: 'Fluency',
    },
    {
      title: 'Public Speaking for Kids',
      blurb:
        'Stage‑safe frameworks, debate games, and confidence drills. Record, reflect, improve.',
      chip: 'Communication',
    },
    {
      title: 'Chess Growth Track',
      blurb:
        'Tactics to plans: model games, mini‑endgames, and Tal‑style puzzles to sharpen calculation.',
      chip: 'Strategic',
    },
    {
      title: 'Salesforce Admin (Career Switch)',
      blurb:
        'Trailhead to projects: data, security, automation, and interview prep for a fast start.',
      chip: 'Career',
    },
  ];

  const faqs = [
    {
      q: 'How are classes delivered?',
      a: 'Live on Zoom with an interactive whiteboard, concept playgrounds, and instant quizzes. Replays provided for revision.',
    },
    {
      q: 'Do you offer a free demo?',
      a: 'Yes. Join a 30‑minute demo to experience the tools and teaching style before enrolling.',
    },
    {
      q: 'What makes this different for kids?',
      a: 'Design matters. We use color, motion, and game loops to keep curiosity high while teaching rigorous thinking.',
    },
    {
      q: 'Can you personalize for my child?',
      a: 'Absolutely. We map strengths, set weekly goals, and adapt difficulty. Parents get simple, honest progress reports.',
    },
  ];

  const [user, setUser] = useState(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState('inactive');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('/user', { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          setUser(response.data.user);
          setSubscriptionStatus(response.data.user.subscriptionStatus);
        })
        .catch(() => {
          setUser(null);
          setSubscriptionStatus('inactive');
        });
    }
  }, []);

  const userId = 'exampleUserId'; // Replace with actual user ID logic

  return (
    <main className="relative overflow-x-clip">
      {/* --- Background Art (persistent + parallax) --- */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="pointer-events-none fixed inset-0 -z-10"
      >
        {/* Layer 1: gentle radial gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(1200px 600px at 20% 10%, rgba(168, 85, 247,0.20), transparent 60%), radial-gradient(1000px 500px at 80% 20%, rgba(56,189,248,0.18), transparent 60%), radial-gradient(1000px 600px at 50% 90%, rgba(251,113,133,0.18), transparent 60%)',
          }}
        />
        {/* Layer 2: subtle dotted pattern that scrolls */}
        <motion.div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(124,58,237,0.20) 1px, transparent 1px)',
            backgroundSize: '18px 18px',
          }}
          animate={{ backgroundPositionY: ['0%', '100%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        {/* Layer 3: decorative squiggle */}
        <svg className="absolute -bottom-24 left-0 w-[160%] rotate-[2deg] opacity-20" viewBox="0 0 1200 200" fill="none">
          <path d="M0,120 C200,60 300,180 500,120 C700,60 900,180 1200,120" stroke="#a78bfa" strokeWidth="24" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* --- Sticky Header --- */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-purple-200/40">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <Link href="#top" className="flex items-center gap-2 font-extrabold text-purple-800">
            <span className="text-2xl">🌈</span>
            <span className="text-lg tracking-tight">Ultimate EdTech</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-purple-800/80">
            <a href="#courses" className="hover:text-purple-900">Courses</a>
            <a href="#outcomes" className="hover:text-purple-900">Outcomes</a>
            <a href="#demos" className="hover:text-purple-900">Live Demos</a>
            <a href="#pricing" className="hover:text-purple-900">Pricing</a>
            <a href="#faq" className="hover:text-purple-900">FAQ</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href={wa}
              target="_blank"
              className="rounded-xl px-4 py-2 bg-green-500 text-white shadow hover:bg-green-600"
            >
              WhatsApp: 80024 16363
            </Link>
          </div>
        </div>
      </header>

      {/* --- Hero --- */}
      <section id="top" className="mx-auto max-w-7xl px-4 pt-14 pb-10 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-5">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-black leading-[1.05] text-purple-900"
          >
            One joyful classroom for whiteboards, theory, quizzes & games.
          </motion.h1>
          <p className="text-lg text-purple-800/90">
            Built with care for kids and beginners—fast, colorful, and rigorous. Parents get clear progress. Learners get flow.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={wa}
              target="_blank"
              className="rounded-2xl px-5 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg hover:from-emerald-600 hover:to-green-600"
            >
              Chat on WhatsApp
            </Link>
            <Link
              href="#demos"
              className="rounded-2xl px-5 py-3 bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white shadow-lg hover:from-fuchsia-600 hover:to-pink-600"
            >
              Join Free Demo
            </Link>
            <Link
              href="#courses"
              className="rounded-2xl px-5 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg hover:from-blue-600 hover:to-cyan-600"
            >
              Explore Courses
            </Link>
          </div>
          <p className="text-sm text-purple-700/80">Crafted background art stays visible as you scroll—because joy is part of pedagogy.</p>
        </div>
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-purple-200 bg-white/70 shadow-xl p-4"
        >
          <div className="grid grid-cols-3 gap-3 text-4xl">
            <div className="aspect-video rounded-xl bg-white/80 border border-purple-200 flex items-center justify-center">🎨</div>
            <div className="aspect-video rounded-xl bg-white/80 border border-purple-200 flex items-center justify-center">🧠</div>
            <div className="aspect-video rounded-xl bg-white/80 border border-purple-200 flex items-center justify-center">🎲</div>
          </div>
          <p className="text-xs text-center text-purple-700 mt-3">Swap these with real screenshots or a short intro video later.</p>
        </motion.div>
      </section>

      {/* --- Trust / Badges --- */}
      <section className="mx-auto max-w-7xl px-4 pb-6">
        <div className="grid md:grid-cols-4 gap-3">
          {['Kid‑safe Design','Live Quizzes','Replay Access','Parent Reports'].map((t) => (
            <div key={t} className="rounded-xl border border-purple-200/60 bg-white/70 p-3 text-center text-sm text-purple-800 shadow">
              {t}
            </div>
          ))}
        </div>
      </section>

      {/* --- Outcomes --- */}
      <section id="outcomes" className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold text-purple-900">Outcomes you can measure</h2>
            <ul className="list-disc pl-5 text-purple-900/90 space-y-2">
              <li>Confidence: kids explain ideas back using visuals and examples.</li>
              <li>Fluency: quick quizzes and games build speed without anxiety.</li>
              <li>Depth: we connect concepts across math, coding, and logic.</li>
              <li>Evidence: weekly summaries, milestones, and simple progress charts.</li>
            </ul>
            <div className="flex gap-3 pt-2">
              <Link href={wa} target="_blank" className="rounded-xl px-4 py-2 bg-green-500 text-white hover:bg-green-600 shadow">Talk to Ashkam</Link>
              <Link href="#pricing" className="rounded-xl px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 shadow">View Plans</Link>
            </div>
          </div>
          <div className="rounded-3xl border border-purple-200 bg-white/70 shadow-xl p-4">
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="rounded-xl bg-white/80 border border-purple-200 p-4">
                <div className="text-3xl font-black text-purple-900">95%</div>
                <div className="text-sm text-purple-700">Parents report higher confidence</div>
              </div>
              <div className="rounded-xl bg-white/80 border border-purple-200 p-4">
                <div className="text-3xl font-black text-purple-900">3×</div>
                <div className="text-sm text-purple-700">Faster quiz improvement</div>
              </div>
              <div className="rounded-xl bg-white/80 border border-purple-200 p-4">
                <div className="text-3xl font-black text-purple-900">100%</div>
                <div className="text-sm text-purple-700">Live, interactive sessions</div>
              </div>
              <div className="rounded-xl bg-white/80 border border-purple-200 p-4">
                <div className="text-3xl font-black text-purple-900">∞</div>
                <div className="text-sm text-purple-700">Curiosity loops & projects</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Courses --- */}
      <section id="courses" className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-purple-900">Courses</h2>
        <p className="text-purple-900/80 mt-1">Hand‑crafted tracks for different goals. Pick one to start; we can blend paths later.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {courses.map((c) => (
            <div key={c.title} className="group rounded-2xl border border-purple-200 bg-white/80 shadow hover:shadow-lg transition p-5 flex flex-col">
              <div className="text-xs inline-flex w-fit px-2 py-1 rounded-full bg-purple-100 text-purple-700 border border-purple-200">{c.chip}</div>
              <h3 className="text-lg font-bold text-purple-900 mt-2">{c.title}</h3>
              <p className="text-sm text-purple-800/90 mt-1 flex-1">{c.blurb}</p>
              <div className="mt-4 flex gap-2">
                <Link href={wa} target="_blank" className="rounded-lg px-3 py-2 bg-green-500 text-white hover:bg-green-600 text-sm">Enroll on WhatsApp</Link>
                <Link href="#demos" className="rounded-lg px-3 py-2 bg-purple-600 text-white hover:bg-purple-700 text-sm">Try a Demo</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Live Demos / Concept Playground --- */}
      <section id="demos" className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="rounded-3xl border border-purple-200 bg-white/70 shadow-xl p-4">
            <div className="grid grid-cols-3 gap-3 text-4xl">
              <div className="aspect-video rounded-xl bg-white/80 border border-purple-200 flex items-center justify-center">📈</div>
              <div className="aspect-video rounded-xl bg-white/80 border border-purple-200 flex items-center justify-center">➗</div>
              <div className="aspect-video rounded-xl bg-white/80 border border-purple-200 flex items-center justify-center">🧮</div>
            </div>
            <p className="text-xs text-center text-purple-700 mt-3">Interactive concept playgrounds—fractions, graphs, simulations.</p>
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold text-purple-900">See it, touch it, remember it</h2>
            <p className="text-purple-900/90">We convert tricky ideas into sliders, canvases, and small games. Kids tinker; concepts click. Demos run in the browser—no installs.</p>
            <div className="flex gap-3 pt-1">
              <Link href={wa} target="_blank" className="rounded-xl px-4 py-2 bg-green-500 text-white hover:bg-green-600 shadow">Get Demo Link</Link>
              <Link href="#courses" className="rounded-xl px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 shadow">Pick a Track</Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- Features --- */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-purple-900">Designed for joyful learning</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {[
            ['Collaborative Whiteboard', 'Ultra‑low latency strokes, symmetry mandalas, and laser pointer.'],
            ['Auto‑graded Quizzes', 'Instant feedback with hints, streaks, and smart review.'],
            ['Kid‑friendly UI', 'Big buttons, high contrast, gentle motion, and no dark patterns.'],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-purple-200 bg-white/80 p-5 shadow">
              <h3 className="font-bold text-purple-900">{t}</h3>
              <p className="text-sm text-purple-800/90 mt-1">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Testimonials --- */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-purple-900">Parents & learners</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {[
            ['“My son explains math at dinner now.”', 'Parent, Grade 6'],
            ['“I built my first website—felt like magic.”', 'Student, MERN'],
            ['“Friendly, fast, and deeply thoughtful.”', 'Parent, Grade 3'],
          ].map(([quote, by]) => (
            <div key={quote} className="rounded-2xl border border-purple-200 bg-white/80 p-5 shadow">
              <p className="text-purple-900">{quote}</p>
              <p className="text-xs text-purple-700 mt-2">{by}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Pricing --- */}
      <section id="pricing" className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-purple-900">Simple pricing</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {[
            ['Starter', '1 live class / week', 'Best for curious beginners', '₹799 / class'],
            ['Standard', '2 live classes / week', 'Ideal for steady progress', '₹699 / class'],
            ['Intensive', '3 live classes / week', 'Fast‑track with projects', '₹649 / class'],
          ].map(([name, freq, desc, price]) => (
            <div key={name} className="rounded-2xl border border-purple-200 bg-white/80 p-6 shadow flex flex-col">
              <h3 className="text-xl font-bold text-purple-900">{name}</h3>
              <p className="text-sm text-purple-700">{freq}</p>
              <p className="text-sm text-purple-800/90 mt-1 flex-1">{desc}</p>
              <div className="text-3xl font-black text-purple-900 mt-3">{price}</div>
              <Link href={wa} target="_blank" className="mt-4 rounded-xl px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 shadow text-center">Enroll via WhatsApp</Link>
            </div>
          ))}
        </div>
      </section>

      {/* --- FAQ --- */}
      <section id="faq" className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-purple-900">FAQ</h2>
        <div className="mt-6 space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-purple-200 bg-white/80 p-4 shadow">
              <summary className="cursor-pointer font-semibold text-purple-900">{f.q}</summary>
              <p className="mt-2 text-purple-800/90">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="mx-auto max-w-7xl px-4 py-10">
        <div className="rounded-3xl border border-purple-200 bg-white/70 p-6 shadow text-center">
          <div className="text-purple-900 font-semibold">Built for joyful learning. © 2025 • Ashkam</div>
          <div className="mt-2 text-purple-800/90 text-sm">Questions? Message on WhatsApp: <a className="underline" href={wa} target="_blank">80024 16363</a></div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <Link
        href={wa}
        target="_blank"
        className="fixed bottom-6 right-6 z-50 rounded-full p-4 bg-green-500 text-white shadow-xl hover:bg-green-600"
        aria-label="Chat on WhatsApp"
      >
        💬
      </Link>

      {/* --- Registration, Login, and Payment Forms --- */}
      <div className="main-page mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-purple-900 mb-6">Welcome to Intelligent Studios</h1>
        <div className="forms space-y-6">
          {!user ? (
            <div className="content">
              <h2>Explore Our Features</h2>
              <p>Enjoy access to most of our content for free!</p>
              <div className="partial-content">
                <p>Here are some amazing features you can try:</p>
                <ul>
                  <li>Interactive quizzes</li>
                  <li>Educational games</li>
                  <li>Math tutorials</li>
                </ul>
                <p>Sign up to unlock advanced features like personalized dashboards and premium content!</p>
              </div>
              <div className="forms">
                <RegisterForm />
                <LoginForm />
              </div>
            </div>
          ) : subscriptionStatus === 'active' ? (
            <div className="content">
              <h2>Full Access</h2>
              <p>You have access to all features!</p>
            </div>
          ) : (
            <div className="content">
              <h2>Partial Access</h2>
              <p>Subscribe to unlock full features.</p>
              <PaymentWrapper userId={user._id} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
