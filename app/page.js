'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import RegisterForm from '@/components/RegisterForm';
import LoginForm from '@/components/LoginForm';
import PaymentWrapper from '@/components/PaymentForm';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

// Conversion focused landing page for Ultimate EdTech
export default function HomePage() {
  const wa = 'https://wa.me/918002416363';

  const courses = [
    {
      title: 'Python + DSA (Grades 6-9 & Beginners)',
      blurb: 'Master problem-solving with clean Python, data structures, and algorithms. Gamified drills plus projects.',
      chip: 'Project-based',
    },
    {
      title: 'MERN / Next.js Full-Stack',
      blurb: 'From REST and auth to dashboards and deployments. Real products, not toy todos. Interview ready.',
      chip: 'Job-oriented',
    },
    {
      title: 'Math Olympiad (Grades 5-8)',
      blurb: 'Concept first, tricks second. Visual proofs, contest patterns, and smart heuristics with joy.',
      chip: 'Competition',
    },
    {
      title: 'Scratch for Kids (10 Day Bootcamp)',
      blurb: 'Cartoon themed coding adventures. Make games, stories, and logic come alive with zero prior code.',
      chip: 'Beginner',
    },
    {
      title: 'Typing and Mental Math Lab',
      blurb: 'Rapid accuracy training with playful races, mandala keyboard drills, and speed music sessions.',
      chip: 'Fluency',
    },
    {
      title: 'Public Speaking for Kids',
      blurb: 'Stage safe frameworks, debate games, and confidence drills. Record, reflect, improve.',
      chip: 'Communication',
    },
    {
      title: 'Chess Growth Track',
      blurb: 'Tactics to plans: model games, mini endgames, and Tal style puzzles to sharpen calculation.',
      chip: 'Strategic',
    },
    {
      title: 'Salesforce Admin (Career Switch)',
      blurb: 'Trailhead to projects: data, security, automation, and interview prep for a fast start.',
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
      a: 'Yes. Join a 30 minute demo to experience the tools and teaching style before enrolling.',
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
  const [authMode, setAuthMode] = useState('register');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('/user', { headers: { Authorization: Bearer  } })
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

  const userId = 'exampleUserId';

  return (
    <main className="relative overflow-x-clip">
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="pointer-events-none fixed inset-0 -z-10"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(1200px 600px at 20% 10%, rgba(168, 85, 247,0.20), transparent 60%), radial-gradient(1000px 500px at 80% 20%, rgba(56,189,248,0.18), transparent 60%), radial-gradient(1000px 600px at 50% 90%, rgba(251,113,133,0.18), transparent 60%)',
          }}
        />
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
        <svg className="absolute -bottom-24 left-0 w-[160%] rotate-[2deg] opacity-20" viewBox="0 0 1200 200" fill="none">
          <path d="M0,120 C200,60 300,180 500,120 C700,60 900,180 1200,120" stroke="#a78bfa" strokeWidth="24" strokeLinecap="round" />
        </svg>
      </motion.div>

      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-purple-200/40">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <Link href="#top" className="flex items-center gap-2 font-extrabold text-purple-800">
            <span className="text-2xl">UE</span>
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
              WhatsApp: 80024 16363
            </Link>
          </div>
        </div>
      </header>

      <section id="top" className="mx-auto max-w-7xl px-4 pt-14 pb-10 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-5">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-black leading-[1.05] text-purple-900"
          >
            One joyful classroom for whiteboards, theory, quizzes, and games.
          </motion.h1>
          <p className="text-lg text-purple-800/90">
            Built with care for kids and beginners. Fast, colorful, and rigorous. Parents get clear progress. Learners get flow.
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
              See interactive demos
            </Link>
          </div>
          <div className="rounded-2xl border border-purple-200 bg-white/80 shadow p-4">
            <p className="text-sm text-purple-700/80">Crafted background art stays visible as you scroll because joy is part of pedagogy.</p>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <div className="day-night-card rounded-3xl border border-purple-200 bg-white/70 shadow-xl p-6 space-y-4">
            <div className="toggle-header flex items-center justify-between">
              <div>
                <p className="text-xs uppercase text-purple-500">Create your vibe</p>
                <p className="text-xl font-semibold text-purple-900">Day and Night Mode</p>
              </div>
              <span className="text-xs rounded-full bg-purple-100 px-2 py-1 text-purple-700">Interactive demo</span>
            </div>
            <div className="toggle-stage">
              <input id="hero-day-night" type="checkbox" className="toggle-input" />
              <label htmlFor="hero-day-night" className="toggle-surface">
                <span className="toggle-sky">
                  <span className="sun"></span>
                  <span className="moon"></span>
                  <span className="cloud cloud-left"></span>
                  <span className="cloud cloud-right"></span>
                  <span className="stars star-a"></span>
                  <span className="stars star-b"></span>
                  <span className="stars star-c"></span>
                </span>
                <span className="toggle-ground">
                  <span className="hill"></span>
                  <span className="house"></span>
                  <span className="tree tree-left"></span>
                  <span className="tree tree-right"></span>
                </span>
              </label>
            </div>
            <div className="toggle-caption space-y-2">
              <p className="toggle-title text-sm font-semibold text-purple-900">Flip the switch to watch sunrise fade into a calm study night.</p>
              <p className="toggle-subtitle text-xs text-purple-700">We design every mission to flow with student energy: upbeat workshops by day, reflective reviews by night.</p>
            </div>
          </div>
          <style jsx>{`
            .day-night-card { position: relative; overflow: hidden; }
            .toggle-stage { position: relative; padding: 8px 0; }
            .toggle-input { position: absolute; opacity: 0; pointer-events: none; }
            .toggle-surface { display: block; width: 260px; height: 140px; margin: 0 auto; border-radius: 120px; background: linear-gradient(135deg, #bae6fd 0%, #fef9c3 100%); box-shadow: 0 18px 36px rgba(168, 85, 247, 0.25); position: relative; overflow: hidden; transition: background 0.8s ease, box-shadow 0.8s ease; cursor: pointer; }
            .toggle-surface .toggle-sky, .toggle-surface .toggle-ground { position: absolute; left: 0; right: 0; }
            .toggle-surface .toggle-sky { top: 0; height: 90px; background: linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%); }
            .toggle-surface .toggle-ground { bottom: 0; height: 54px; background: linear-gradient(180deg, #bef264 0%, #86efac 100%); transition: background 0.8s ease; }
            .sun { position: absolute; top: 28px; left: 32px; width: 68px; height: 68px; border-radius: 50%; background: radial-gradient(circle at 30% 30%, #fde68a 0%, #facc15 45%, #f97316 100%); box-shadow: 0 0 18px rgba(250, 204, 21, 0.65); transition: transform 0.8s ease, opacity 0.8s ease; }
            .moon { position: absolute; top: 32px; left: 160px; width: 56px; height: 56px; border-radius: 50%; background: radial-gradient(circle at 30% 30%, #f4f4f5 0%, #e2e8f0 60%, #94a3b8 100%); box-shadow: 0 0 14px rgba(148, 163, 184, 0.45); opacity: 0; transform: translateY(24px); transition: transform 0.8s ease, opacity 0.8s ease; }
            .cloud { position: absolute; width: 74px; height: 24px; background: rgba(255, 255, 255, 0.85); border-radius: 999px; top: 50px; filter: blur(0.2px); transition: opacity 0.6s ease, transform 0.6s ease; }
            .cloud::after, .cloud::before { content: ''; position: absolute; background: inherit; border-radius: inherit; }
            .cloud::after { width: 40px; height: 24px; top: -12px; left: 12px; }
            .cloud::before { width: 32px; height: 20px; top: -8px; right: 10px; }
            .cloud-left { left: 22px; }
            .cloud-right { right: 26px; }
            .stars { position: absolute; width: 6px; height: 6px; border-radius: 50%; background: #fef9c3; opacity: 0; transition: opacity 0.8s ease; }
            .star-a { top: 24px; left: 90px; }
            .star-b { top: 18px; right: 72px; }
            .star-c { top: 44px; right: 40px; }
            .hill { position: absolute; left: 50%; bottom: -60px; width: 220px; height: 180px; border-radius: 50%; background: radial-gradient(circle at center, rgba(74, 222, 128, 0.9) 0%, rgba(34, 197, 94, 0.9) 60%, rgba(22, 163, 74, 0.9) 100%); transform: translateX(-50%); transition: background 0.8s ease; }
            .house { position: absolute; bottom: 8px; left: 108px; width: 36px; height: 26px; background: #fbbf24; border-radius: 6px; transition: background 0.8s ease; }
            .house::before { content: ''; position: absolute; left: -6px; top: -18px; width: 48px; height: 24px; background: #f97316; clip-path: polygon(50% 0%, 0% 100%, 100% 100%); }
            .tree { position: absolute; bottom: 6px; width: 16px; height: 50px; }
            .tree::before, .tree::after { content: ''; position: absolute; left: 50%; transform: translateX(-50%); }
            .tree::before { bottom: 0; width: 6px; height: 26px; background: #78350f; border-radius: 3px; }
            .tree::after { bottom: 18px; width: 36px; height: 36px; background: #22c55e; border-radius: 50%; box-shadow: 0 0 0 6px rgba(34, 197, 94, 0.25); transition: background 0.8s ease, box-shadow 0.8s ease; }
            .tree-left { left: 38px; }
            .tree-right { right: 46px; }
            .toggle-caption { text-align: left; }
            .toggle-input:checked + .toggle-surface { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); box-shadow: 0 18px 38px rgba(59, 130, 246, 0.35); }
            .toggle-input:checked + .toggle-surface .toggle-ground { background: linear-gradient(180deg, #1e3a8a 0%, #0f172a 100%); }
            .toggle-input:checked + .toggle-surface .sun { transform: translate(120px, -56px) scale(0.4); opacity: 0; }
            .toggle-input:checked + .toggle-surface .moon { opacity: 1; transform: translateY(0); }
            .toggle-input:checked + .toggle-surface .cloud { opacity: 0; transform: translateY(-20px); }
            .toggle-input:checked + .toggle-surface .stars { opacity: 1; }
            @keyframes twinkle { 0% { transform: scale(0.8); opacity: 0.8; } 50% { transform: scale(1); opacity: 1; } 100% { transform: scale(0.8); opacity: 0.8; } }
            .toggle-input:checked + .toggle-surface .star-a { animation: twinkle 1.4s linear infinite; }
            .toggle-input:checked + .toggle-surface .star-b { animation: twinkle 1.8s linear infinite 0.4s; }
            .toggle-input:checked + .toggle-surface .star-c { animation: twinkle 1.6s linear infinite 0.8s; }
            .toggle-input:checked + .toggle-surface .hill { background: radial-gradient(circle at center, rgba(59, 130, 246, 0.9) 0%, rgba(30, 64, 175, 0.9) 60%, rgba(15, 23, 42, 0.9) 100%); }
            .toggle-input:checked + .toggle-surface .house { background: #1d4ed8; }
            .toggle-input:checked + .toggle-surface .tree::after { background: #38bdf8; box-shadow: 0 0 0 6px rgba(59, 130, 246, 0.25); }
          `}</style>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-6">
        <div className="grid md:grid-cols-4 gap-3">
          {['Kid-safe design', 'Live quizzes', 'Replay access', 'Parent reports'].map((t) => (
            <div key={t} className="rounded-xl border border-purple-200/60 bg-white/70 p-3 text-center text-sm text-purple-800 shadow">
              {t}
            </div>
          ))}
        </div>
      </section>

      <section id="outcomes" className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold text-purple-900">Outcomes you can measure</h2>
            <ul className="list-disc pl-5 text-purple-900/90 space-y-2">
              <li>Confidence: learners explain ideas back using visuals and examples.</li>
              <li>Fluency: quick quizzes and games build speed without anxiety.</li>
              <li>Depth: we connect concepts across math, coding, and logic.</li>
              <li>Evidence: weekly summaries, milestones, and simple progress charts.</li>
            </ul>
            <div className="flex gap-3 pt-2">
              <Link href={wa} target="_blank" className="rounded-xl px-4 py-2 bg-green-500 text-white hover:bg-green-600 shadow">Talk to Ashkam</Link>
              <Link href="#pricing" className="rounded-xl px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 shadow">View plans</Link>
            </div>
          </div>
          <div className="rounded-3xl border border-purple-200 bg-white/70 shadow-xl p-4">
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="rounded-xl bg-white/80 border border-purple-200 p-4">
                <div className="text-3xl font-black text-purple-900">95%</div>
                <div className="text-sm text-purple-700">Parents report higher confidence</div>
              </div>
              <div className="rounded-xl bg-white/80 border border-purple-200 p-4">
                <div className="text-3xl font-black text-purple-900">3x</div>
                <div className="text-sm text-purple-700">Faster quiz improvement</div>
              </div>
              <div className="rounded-xl bg-white/80 border border-purple-200 p-4">
                <div className="text-3xl font-black text-purple-900">100%</div>
                <div className="text-sm text-purple-700">Live, interactive sessions</div>
              </div>
              <div className="rounded-xl bg-white/80 border border-purple-200 p-4">
                <div className="text-3xl font-black text-purple-900">Unlimited</div>
                <div className="text-sm text-purple-700">Curiosity loops and projects</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="courses" className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-purple-900">Courses</h2>
        <p className="text-purple-900/80 mt-1">Hand crafted tracks for different goals. Pick one to start; we can blend paths later.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {courses.map((c) => (
            <div key={c.title} className="group rounded-2xl border border-purple-200 bg-white/80 shadow hover:shadow-lg transition p-5 flex flex-col">
              <div className="text-xs inline-flex w-fit px-2 py-1 rounded-full bg-purple-100 text-purple-700 border border-purple-200">{c.chip}</div>
              <h3 className="text-lg font-bold text-purple-900 mt-2">{c.title}</h3>
              <p className="text-sm text-purple-800/90 mt-1 flex-1">{c.blurb}</p>
              <div className="mt-4 flex gap-2">
                <Link href={wa} target="_blank" className="rounded-lg px-3 py-2 bg-green-500 text-white hover:bg-green-600 text-sm">Enroll on WhatsApp</Link>
                <Link href="#demos" className="rounded-lg px-3 py-2 bg-purple-600 text-white hover:bg-purple-700 text-sm">Try a demo</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="demos" className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="rounded-3xl border border-purple-200 bg-white/70 shadow-xl p-4">
            <div className="grid grid-cols-3 gap-3 text-4xl">
              <div className="aspect-video rounded-xl bg-white/80 border border-purple-200 flex items-center justify-center text-purple-600 font-bold">Chart</div>
              <div className="aspect-video rounded-xl bg-white/80 border border-purple-200 flex items-center justify-center text-purple-600 font-bold">Logic</div>
              <div className="aspect-video rounded-xl bg-white/80 border border-purple-200 flex items-center justify-center text-purple-600 font-bold">Lab</div>
            </div>
            <p className="text-xs text-center text-purple-700 mt-3">Interactive concept playgrounds for fractions, graphs, and simulations.</p>
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold text-purple-900">See it, touch it, remember it</h2>
            <p className="text-purple-900/90">We convert tricky ideas into sliders, canvases, and small games. Kids tinker; concepts click. Demos run in the browser with no installs.</p>
            <div className="flex gap-3 pt-1">
              <Link href={wa} target="_blank" className="rounded-xl px-4 py-2 bg-green-500 text-white hover:bg-green-600 shadow">Get demo link</Link>
              <Link href="#courses" className="rounded-xl px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 shadow">Pick a track</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-purple-900">Designed for joyful learning</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {[
            ['Collaborative whiteboard', 'Ultra low latency strokes, symmetry mandalas, and laser pointer.'],
            ['Auto graded quizzes', 'Instant feedback with hints, streaks, and smart review.'],
            ['Kid friendly UI', 'Big buttons, high contrast, gentle motion, and no dark patterns.'],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-purple-200 bg-white/80 p-5 shadow">
              <h3 className="font-bold text-purple-900">{t}</h3>
              <p className="text-sm text-purple-800/90 mt-1">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-purple-900">Parents and learners</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {[
            ['"My son explains math at dinner now."', 'Parent, Grade 6'],
            ['"I built my first website and it felt like magic."', 'Student, MERN cohort'],
            ['"Friendly, fast, and deeply thoughtful."', 'Parent, Grade 3'],
          ].map(([quote, by]) => (
            <div key={quote} className="rounded-2xl border border-purple-200 bg-white/80 p-5 shadow">
              <p className="text-purple-900">{quote}</p>
              <p className="text-xs text-purple-700 mt-2">{by}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-purple-900">Simple pricing</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {[
            ['Starter', '1 live class each week', 'Best for curious beginners', 'Rs 1799 per class'],
            ['Standard', '2 live classes each week', 'Ideal for steady progress', 'Rs 1699 per class'],
            ['Intensive', '3 live classes each week', 'Fast track with projects', 'Rs 1649 per class'],
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

      <footer className="mx-auto max-w-7xl px-4 py-10">
        <div className="rounded-3xl border border-purple-200 bg-white/70 p-6 shadow text-center">
          <div className="text-purple-900 font-semibold">Built for joyful learning. (c) 2025 - Ashkam</div>
          <div className="mt-2 text-purple-800/90 text-sm">Questions? Message on WhatsApp: <a className="underline" href={wa} target="_blank">80024 16363</a></div>
        </div>
      </footer>

      <Link
        href={wa}
        target="_blank"
        className="fixed bottom-6 right-6 z-50 rounded-full p-4 bg-green-500 text-white shadow-xl hover:bg-green-600"
        aria-label="Chat on WhatsApp"
      >
        Chat
      </Link>
    </main>
  );
}
