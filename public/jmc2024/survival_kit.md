# JMC 2024 — Formula + Theory Survival Kit (Pocket Spellbook)

A compact, class-ready reference with crisp formulas, tiny proofs, and playful mnemonics.

## Numbers & Arithmetic

- **BODMAS**: Brackets → Orders → Division/Multiplication → Addition/Subtraction.
- **Parity rules**: Odd + Odd = Even; Odd + Even = Odd; Even + Even = Even.  
  Odd × Odd = Odd; Odd × Even = Even; Even × Even = Even.
- **Remainders / Modular arithmetic**:  
  If an integer \(n\) leaves remainder \(r\) on division by \(m\), write \(n \equiv r \pmod m\).  
  Same remainder condition: \(n \equiv r \pmod a\) **and** \(n \equiv r \pmod b\) ⇒ \(n \equiv r \pmod{\mathrm{lcm}(a,b)}\).
- **Sum of consecutive integers** \(k, k+1, \dots, k+(n-1)\):  
  \(\text{Sum} = n \times \text{Average} = n \times \frac{(k) + (k+n-1)}{2}\).
- **Divisibility quickies**:  
  3 or 9 → digit sum; 4 → last two digits; 8 → last three digits; 11 → alternating sum.

## Geometry

- **Polygon interior angle sum** (n-gon): \((n-2)\times 180^\circ\).
- **Regular polygon interior angle**: \(\frac{(n-2)\times 180^\circ}{n}\). Exterior angle \(=\frac{360^\circ}{n}\).
- **Triangle area**: 
  - Base–height: \(A=\frac{1}{2}bh\)  
  - Heron: \(A=\sqrt{s(s-a)(s-b)(s-c)}\), \(s=\frac{a+b+c}{2}\).
- **Right-triangle Pythagoras**: \(a^2+b^2=c^2\).  
  Distance in the plane between \((x_1,y_1)\) and \((x_2,y_2)\): \(\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}\).
- **Rhombus properties**: all sides equal; diagonals bisect each other **at right angles**; diagonals are angle bisectors.  
  **Area** of rhombus: \(A=\frac{d_1 d_2}{2}\).
- **Square dissection tricks**: symmetry turns scary shapes into equal fractions. Look for: diagonals, midpoints, and reflections.

## Combinatorics & Probability

- **Counting paths on a grid** (from \((0,0)\) to \((a,b)\) with R/L/U/D restricted steps):  
  Ways \(=\binom{a+b}{a}=\binom{a+b}{b}\).
- **Permutations / Combinations**:  
  \(P(n,r)=\frac{n!}{(n-r)!}\), \(C(n,r)=\binom{n}{r}=\frac{n!}{r!(n-r)!}\).
- **Basic probability**:  
  \( \mathbb P(\text{event}) = \dfrac{\#\text{favourable}}{\#\text{total equally likely}} \).
- **Inclusion–Exclusion (2 sets)**:  
  \(|A\cup B|=|A|+|B|-|A\cap B|\).  
  (3 sets) \(|A\cup B\cup C|=\sum|A|-\sum|A\cap B|+|A\cap B\cap C|\).

## Logic

- **Knights/Knaves**: Assume one statement true, propagate consequences, check contradictions. Swap and repeat.  
  Truth tables and parity arguments (even # of lies vs truths) often collapse the casework.
- **Process of elimination**: When statements conflict, track impossibilities; the lone survivor is the answer.

## Word Problems / Ratio

- **Proportions**: \(a:b = c:d \Leftrightarrow ad = bc\).
- **Rate problems**: Distance = Rate × Time; set up equations where 'total work' remains invariant.
- **Fraction of a fraction**: \(\frac{2}{3} \text{ of } \frac{3}{4} = \frac{2}{3} \times \frac{3}{4} = \frac{6}{12} = \frac{1}{2}\).

---

## Micro-Drills (rapid-fire)

1. **Smallest n with n≡2(mod 3) and n≡2(mod 4)** → 2
2. **Shortest paths to (4,3)** → C(7,3)=35  
3. **Regular 12-gon interior/exterior angle** → 150°/30°
4. **Rhombus with diagonals 10, 24 → area** → 120
5. **Five consecutive integers → largest power of 5 dividing the product** → 5¹=5
6. **Bag 6R, 4B, 5G → P(not blue)** → 11/15
7. **|A|=30, |B|=22, |A∪B|=40 → |A∩B|** → 12
8. **Sum of integers 35 to 93 inclusive** → 59×64/2 = 3776
9. **5–12–13 triangle → height to hypotenuse** → 60/13
10. **Two liars on Tuesdays → parity of lies logic** → use contradiction

---

*Teacher flow (10–15 min)*: 2m warm-up parity & remainder lightning → 6m mini-tool demo (grid paths) + one inclusion–exclusion → 5m micro-drill randomizer → 2m exit ticket: unseen ratio + logic parity.
