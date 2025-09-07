import React from "react";
import TypingGame from "../../components/TypingGame";

export default function JmcSurvivalKit() {
  const zipUrl = "/jmc2024_survival_kit.zip"; // Place the zip at your public/ folder or route it via API

  const Card: React.FC<{title:string, children:React.ReactNode}> = ({title, children}) => (
    <div className="rounded-2xl border shadow-sm p-4 md:p-6 bg-white">
      <h3 className="font-semibold text-lg md:text-xl mb-3">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );

  const Bullet: React.FC<{children:React.ReactNode}> = ({children}) => (
    <li className="pl-2">• {children}</li>
  );

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 md:py-12 font-[system-ui] min-h-screen bg-gray-50">
      <header className="mb-8">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">JMC 2024 — Survival Kit</h1>
        <p className="text-slate-600 mt-2">Pocket spellbook for Olympiad-style math: formulas, tiny proofs, drills, and a mini-game.</p>
        <div className="mt-4 flex gap-3">
          <a href={zipUrl} download className="inline-flex items-center rounded-xl border px-4 py-2 hover:bg-slate-50 bg-white">
            ⬇️ Download ZIP
          </a>
          <a href="/jmc2024/index.html" className="inline-flex items-center rounded-xl border px-4 py-2 hover:bg-slate-50 bg-white">
            ▶️ Open Mini-Tool
          </a>
        </div>
      </header>

      <section className="grid gap-4 md:gap-6 md:grid-cols-2">
        <Card title="Numbers & Arithmetic">
          <ul className="space-y-1">
            <Bullet><b>BODMAS</b>: Brackets → Orders → Div/Mul → Add/Sub.</Bullet>
            <Bullet><b>Parity</b>: Odd+Odd=Even; Odd+Even=Odd; Even+Even=Even.</Bullet>
            <Bullet><b>Remainders</b>: same remainder ⇒ same modulo class.</Bullet>
            <Bullet><b>Consecutive sum</b>: Average × Count.</Bullet>
          </ul>
        </Card>

        <Card title="Geometry">
          <ul className="space-y-1">
            <Bullet>Interior sum (n-gon): (n−2)×180°</Bullet>
            <Bullet>Regular interior: ((n−2)×180°)/n</Bullet>
            <Bullet>Triangle area: ½bh; Heron √(s(s−a)(s−b)(s−c))</Bullet>
            <Bullet>Rhombus: equal sides; diagonals ⟂ and bisect; A=d₁d₂/2</Bullet>
          </ul>
        </Card>

        <Card title="Combinatorics & Probability">
          <ul className="space-y-1">
            <Bullet>Grid paths to (a,b): C(a+b, a)</Bullet>
            <Bullet>P(event) = favourable / total</Bullet>
            <Bullet>|A∪B|=|A|+|B|−|A∩B|</Bullet>
          </ul>
        </Card>

        <Card title="Logic & Word Problems">
          <ul className="space-y-1">
            <Bullet>Knights/Knaves: assume truth, push consequences, kill contradictions.</Bullet>
            <Bullet>Proportions: a/b=c/d ⇒ ad=bc.</Bullet>
            <Bullet>Fraction of a fraction: multiply numerators and denominators.</Bullet>
          </ul>
        </Card>
      </section>

      <section className="mt-8">
        <Card title="Micro-Drills">
          <p>Use these for rapid-fire practice. Pro-tip: project and randomize in class.</p>
          <ol className="list-decimal ml-5 space-y-1">
            <li>Smallest n with n≡2(mod 3) and n≡2(mod 4)</li>
            <li>Shortest paths to (4,3)</li>
            <li>Regular 12-gon interior/exterior angle</li>
            <li>Rhombus with diagonals 10, 24 → area</li>
            <li>Five consecutive integers → largest power of 5 dividing the product</li>
            <li>Bag 6R, 4B, 5G → P(not blue)</li>
            <li>|A|=30, |B|=22, |A∪B|=40 → |A∩B|</li>
            <li>Sum of integers 35 to 93 inclusive</li>
            <li>5–12–13 triangle → height to hypotenuse</li>
            <li>Two liars on Tuesdays → parity of lies logic</li>
          </ol>
        </Card>
      </section>

      <section className="mt-8">
        <Card title="Polygon Sides — Olympiad Explainer">
          <p>
            How many sides can a polygon made from unit squares have? <br/>
            <a href="/jmc/polygon-sides" className="text-blue-600 hover:underline font-semibold">Read the full explanation &rarr;</a>
          </p>
        </Card>
      </section>

      <section className="mt-8">
        <Card title="Typing Game">
          <TypingGame />
        </Card>
      </section>
    </main>
  );
}
