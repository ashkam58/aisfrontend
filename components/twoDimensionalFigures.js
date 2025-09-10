import React, { useMemo, useState, useEffect } from "react";

// Enhanced with kid-friendly features: memory aids, fun visuals, and interactive examples
// Includes gamified elements and real-world examples for better engagement

export default function TwoDFiguresLab() {
  const topics = [
    { id: "poly-id", title: "Identify & classify polygons", emoji: "🔷" },
    { id: "tri-class", title: "Classify triangles", emoji: "📐" },
    { id: "tri-ineq", title: "Triangle inequality", emoji: "🔢" },
    { id: "trap", title: "Identify trapezoids", emoji: "📏" },
    { id: "quad-angles", title: "Angles in quadrilaterals", emoji: "📊" },
    { id: "poly-angles", title: "Interior angles of polygons", emoji: "🧩" },
    { id: "tri-missing", title: "Find missing angles in triangles", emoji: "🔍" },
    { id: "circle-parts", title: "Parts of a circle", emoji: "⭕" },
    { id: "central-angles", title: "Central angles of circles", emoji: "🍕" },
    { id: "real-world", title: "Shapes in real life", emoji: "🏠" },
    { id: "quiz", title: "Mini Quiz Challenge!", emoji: "🎮" }
  ];

  const [tab, setTab] = useState(topics[0].id);
  const [points, setPoints] = useState(0);
  const [confetti, setConfetti] = useState(false);

  // Add points and trigger confetti animation when points increase
  const addPoints = (amount) => {
    setPoints(prev => prev + amount);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 3000);
  };

  return (
    <div style={styles.shell}>
      <div style={styles.header}>
        <h1 style={styles.h1}>Two‑Dimensional Figures — Shape Explorer</h1>
        <div style={styles.subHeader}>
          <p style={styles.tagline}>Learn, play, and discover the amazing world of 2D shapes!</p>
          <div style={styles.pointsDisplay}>
            <span style={styles.pointsBadge}>🏆 {points} points</span>
            {confetti && <div style={styles.confetti}>🎉 +5 points!</div>}
          </div>
        </div>
      </div>

      <div style={styles.grid}>
        <nav style={styles.nav}>
          {topics.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                ...styles.navBtn,
                ...(tab === t.id ? styles.navBtnActive : null)
              }}
            >
              <span style={styles.topicEmoji}>{t.emoji}</span> {t.title}
            </button>
          ))}
        </nav>

        <main style={styles.main}>
          {tab === "poly-id" && <PolygonsWidget addPoints={addPoints} />}
          {tab === "tri-class" && <TriangleClassifyWidget addPoints={addPoints} />}
          {tab === "tri-ineq" && <TriangleInequalityWidget addPoints={addPoints} />}
          {tab === "trap" && <TrapezoidTheory addPoints={addPoints} />}
          {tab === "quad-angles" && <QuadAnglesWidget addPoints={addPoints} />}
          {tab === "poly-angles" && <PolygonAnglesWidget addPoints={addPoints} />}
          {tab === "tri-missing" && <TriangleMissingAngleWidget addPoints={addPoints} />}
          {tab === "circle-parts" && <CirclePartsWidget addPoints={addPoints} />}
          {tab === "central-angles" && <CentralAnglesWidget addPoints={addPoints} />}
          {tab === "real-world" && <RealWorldShapesWidget addPoints={addPoints} />}
          {tab === "quiz" && <ShapesQuizWidget addPoints={addPoints} />}
        </main>
      </div>

      <footer style={styles.footer}>
        <div style={styles.achievementBanner}>
          <div style={styles.badgeWrapper}>
            <span style={styles.badge}>🔎 Explorer</span>
            <span style={styles.badge}>🧠 Shape Whiz</span>
            <span style={styles.badge}>🎯 Angle Master</span>
          </div>
          <div style={styles.progressBar}>
            <div 
              style={{...styles.progressFill, width: `${Math.min(100, points/5)}%`}} 
              title={`${points}/500 points to complete all challenges`}
            />
          </div>
        </div>
        <div style={styles.helpText}>
          Try different values in each section and answer questions to earn points!
        </div>
      </footer>
    </div>
  );
}

// ----------------------------------
// Widgets (JS only, no type syntax)
// ----------------------------------
function PolygonsWidget({ addPoints }) {
  const [n, setN] = useState(5);
  const [showQuiz, setShowQuiz] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);

  const info = useMemo(() => {
    const sum = (n - 2) * 180;
    const regular = sum / n;
    const exterior = 360 / n;
    return { sum, regular, exterior };
  }, [n]);

  const handleQuizAnswer = (isCorrect) => {
    setAnswered(true);
    setCorrect(isCorrect);
    if (isCorrect) {
      addPoints(5);
    }
  };

  return (
    <Section title="Identify & classify polygons">
      <p style={styles.lede}>
        A <b>polygon</b> is a closed figure made of straight segments. The name depends on the number of sides.
      </p>
      <div style={styles.row}>
        <div style={styles.card}>
          <label style={styles.label}>Sides: {n}</label>
          <input
            type="range"
            min={3}
            max={12}
            value={n}
            onChange={(e) => setN(parseInt(e.target.value, 10))}
            style={styles.slider}
          />
          <div style={styles.kvGrid}>
            <KV k="Name" v={polygonName(n)} />
            <KV k="Sum of interior angles" v={`${info.sum}°`} />
            <KV k="Regular interior" v={`${round(info.regular)}°`} />
            <KV k="Exterior (regular)" v={`${round(info.exterior)}°`} />
          </div>
          <div style={styles.memoryAid}>
            <span style={styles.memoryIcon}>💡</span> 
            <span>Memory tip: For polygon angles, remember <b>"(n-2) × 180"</b></span>
          </div>
        </div>
        <div>
          <PolygonPreview n={n} />
          <button 
            style={styles.quizButton} 
            onClick={() => setShowQuiz(true)}
            disabled={showQuiz}
          >
            Try a quiz question! 🎯
          </button>
        </div>
      </div>
      
      {showQuiz && (
        <div style={styles.quizCard}>
          <h3 style={styles.quizTitle}>Quick Quiz</h3>
          <p>What is the sum of interior angles in a hexagon?</p>
          <div style={styles.quizOptions}>
            <button 
              style={styles.quizOption} 
              onClick={() => handleQuizAnswer(false)}
              disabled={answered}
            >540°</button>
            <button 
              style={styles.quizOption} 
              onClick={() => handleQuizAnswer(true)}
              disabled={answered}
            >720°</button>
            <button 
              style={styles.quizOption} 
              onClick={() => handleQuizAnswer(false)}
              disabled={answered}
            >900°</button>
          </div>
          {answered && (
            <div style={correct ? styles.correctFeedback : styles.incorrectFeedback}>
              {correct ? "Correct! A hexagon has 6 sides, so (6-2) × 180° = 4 × 180° = 720°" : "Try again! Use the formula (n-2) × 180°"}
            </div>
          )}
        </div>
      )}
      
      <Details bullets={[
        "Sum of interiors: (n − 2) × 180°.",
        "A regular polygon has all equal sides and angles.",
        "Exterior angles of any polygon sum to 360°."
      ]}/>
    </Section>
  );
}

function TriangleClassifyWidget({ addPoints }) {
  const [a, setA] = useState(5);
  const [b, setB] = useState(5);
  const [c, setC] = useState(5);

  const valid = triangleInequality(a, b, c);
  const sideType = valid ? triangleBySides(a, b, c) : "—";
  const angleType = valid ? triangleByAngles(a, b, c) : "—";

  return (
    <Section title="Classify triangles">
      <p style={styles.lede}>Classify by <b>sides</b> (equilateral/isosceles/scalene) and by <b>angles</b> (acute/right/obtuse).</p>

      <div style={styles.row}>
        <div style={styles.card}>
          <div style={styles.inputsRow}>
            <Num label="a" value={a} setValue={setA} />
            <Num label="b" value={b} setValue={setB} />
            <Num label="c" value={c} setValue={setC} />
          </div>
          <div style={styles.kvGrid}>
            <KV k="Triangle valid?" v={valid ? "Yes" : "No"} />
            <KV k="By sides" v={sideType} />
            <KV k="By angles" v={angleType} />
          </div>
          <div style={styles.memoryAid}>
            <span style={styles.memoryIcon}>💡</span> 
            <span>Try different side lengths to see how triangles change!</span>
          </div>
        </div>
        <div>
          <TrianglePreview a={a} b={b} c={c} valid={valid} />
          <div style={styles.triangleInfo}>
            <h4 style={styles.previewTitle}>Triangle Preview</h4>
            <p style={styles.previewText}>
              {valid ? `This is a ${sideType.toLowerCase()} ${angleType.toLowerCase()} triangle` : "Not a valid triangle"}
            </p>
          </div>
        </div>
      </div>

      <Details bullets={[
        "Triangle inequality: a + b > c, b + c > a, c + a > b.",
        "Right triangle: satisfies a² + b² = c² for some side as hypotenuse.",
        "Obtuse if the longest side squared is greater than the sum of squares of the other two."
      ]}/>
    </Section>
  );
}

function TriangleInequalityWidget({ addPoints }) {
  const [a, setA] = useState(4);
  const [b, setB] = useState(7);
  const [c, setC] = useState(12);
  const valid = triangleInequality(a, b, c);

  return (
    <Section title="Triangle inequality checker">
      <p style={styles.lede}>A triangle exists iff each side is less than the sum of the other two.</p>
      <div style={styles.row}>
        <div style={styles.card}>
          <div style={styles.inputsRow}>
            <Num label="a" value={a} setValue={setA} />
            <Num label="b" value={b} setValue={setB} />
            <Num label="c" value={c} setValue={setC} />
          </div>
          <p style={{ marginTop: 8 }}>
            Valid? <b style={{color: valid ? "#16a34a" : "#dc2626"}}>{valid ? "Yes" : "No"}</b>
          </p>
          <div style={styles.inequalityCheck}>
            <div>a + b = {a} + {b} = {a + b} {a + b > c ? ">" : "≤"} {c} = c ✓</div>
            <div>b + c = {b} + {c} = {b + c} {b + c > a ? ">" : "≤"} {a} = a ✓</div>
            <div>c + a = {c} + {a} = {c + a} {c + a > b ? ">" : "≤"} {b} = b ✓</div>
          </div>
        </div>
        <div>
          <TrianglePreview a={a} b={b} c={c} valid={valid} />
          <div style={styles.triangleInfo}>
            <h4 style={styles.previewTitle}>Triangle Test</h4>
            <p style={styles.previewText}>
              {valid ? "All inequalities satisfied!" : "One or more inequalities fail"}
            </p>
          </div>
        </div>
      </div>
      <Details bullets={["If not valid, try reducing the longest side or increasing the others."]}/>
    </Section>
  );
}

function TrapezoidTheory({ addPoints }) {
  const [parallelPairs, setParallelPairs] = useState(1);
  return (
    <Section title="Identify trapezoids">
      <p style={styles.lede}>
        A <b>trapezoid</b> (US) / <b>trapezium</b> (UK) is a quadrilateral with <b>at least one</b> pair of parallel sides.
      </p>
      <div style={styles.row}>
        <div style={styles.card}>
          <label style={styles.label}>Parallel pairs: {parallelPairs}</label>
          <input type="range" min={0} max={2} value={parallelPairs} onChange={(e)=>setParallelPairs(parseInt(e.target.value,10))} style={styles.slider}/>
          <p style={{marginTop:8}}>
            {parallelPairs === 0 && "No pairs → just a general quadrilateral."}
            {parallelPairs === 1 && "Exactly one pair → trapezoid."}
            {parallelPairs === 2 && "Two pairs → parallelogram/rectangle/rhombus/square (not a trapezoid by strict definition)."}
          </p>
        </div>
        <div>
          <TrapezoidPreview parallelPairs={parallelPairs} />
          <div style={styles.triangleInfo}>
            <h4 style={styles.previewTitle}>Quadrilateral Type</h4>
            <p style={styles.previewText}>
              {parallelPairs === 0 && "General quadrilateral"}
              {parallelPairs === 1 && "Trapezoid"}
              {parallelPairs === 2 && "Parallelogram"}
            </p>
          </div>
        </div>
      </div>
      <Details bullets={[
        "Isosceles trapezoid: non‑parallel sides equal → base angles equal.",
        "Median of a trapezoid equals the average of the bases."
      ]}/>
    </Section>
  );
}

function QuadAnglesWidget() {
  const [a, setA] = useState(90);
  const [b, setB] = useState(120);
  const [c, setC] = useState(80);
  const fourth = 360 - (a + b + c);
  return (
    <Section title="Angles in quadrilaterals">
      <p style={styles.lede}>Interior angles of any quadrilateral sum to <b>360°</b>.</p>
      <div style={styles.card}>
        <div style={styles.inputsRow}>
          <Num label="∠A" value={a} setValue={setA}/>
          <Num label="∠B" value={b} setValue={setB}/>
          <Num label="∠C" value={c} setValue={setC}/>
        </div>
        <div style={{marginTop:8}}>Missing ∠D = <b>{fourth}°</b></div>
      </div>
    </Section>
  );
}

function PolygonAnglesWidget() {
  const [n, setN] = useState(8);
  const sum = (n - 2) * 180;
  const regular = sum / n;
  const exterior = 360 / n;
  return (
    <Section title="Interior angles of polygons">
      <p style={styles.lede}>Memorize: <b>Sum = (n − 2) × 180°</b>. Regular interior = Sum / n. Exterior (regular) = 360°/n.</p>
      <div style={styles.card}>
        <label style={styles.label}>Sides: {n}</label>
        <input type="range" min={3} max={20} value={n} onChange={(e)=>setN(parseInt(e.target.value,10))} style={styles.slider}/>
        <div style={styles.kvGrid}>
          <KV k="Sum of interiors" v={`${sum}°`}/>
          <KV k="Each interior (regular)" v={`${round(regular)}°`}/>
          <KV k="Each exterior (regular)" v={`${round(exterior)}°`}/>
        </div>
      </div>
    </Section>
  );
}

function TriangleMissingAngleWidget() {
  const [x, setX] = useState(60);
  const [y, setY] = useState(45);
  const z = 180 - (x + y);
  return (
    <Section title="Find missing angles in triangles">
      <p style={styles.lede}>Angles in a triangle sum to <b>180°</b>. Two known → the third is 180° minus their sum.</p>
      <div style={styles.card}>
        <div style={styles.inputsRow}>
          <Num label="∠1" value={x} setValue={setX}/>
          <Num label="∠2" value={y} setValue={setY}/>
        </div>
        <div style={{marginTop:8}}>Missing ∠3 = <b>{z}°</b></div>
      </div>
    </Section>
  );
}

function CirclePartsWidget({ addPoints }) {
  const [r, setR] = useState(5);
  const circumference = 2 * Math.PI * r;
  const area = Math.PI * r * r;
  
  return (
    <Section title="Parts of a circle">
      <p style={styles.lede}>Key parts: radius (r), diameter (2r), circumference (2πr), area (πr²), chord, arc, sector, central angle.</p>
      <div style={styles.row}>
        <div style={styles.card}>
          <label style={styles.label}>Radius r = {r}</label>
          <input type="range" min={1} max={15} value={r} onChange={(e)=>setR(parseInt(e.target.value,10))} style={styles.slider}/>
          <div style={styles.kvGrid}>
            <KV k="Diameter" v={`${2*r}`}/>
            <KV k="Circumference" v={round(circumference)} />
            <KV k="Area" v={round(area)} />
          </div>
          <div style={styles.memoryAid}>
            <span style={styles.memoryIcon}>💡</span> 
            <span>Remember: C = 2πr, A = πr²</span>
          </div>
        </div>
        <CirclePreview radius={r} />
      </div>
    </Section>
  );
}

function CirclePreview({ radius }) {
  const size = 200;
  const padding = 20;
  const maxRadius = (size - 2 * padding) / 2;
  const scaledRadius = Math.min(radius * 8, maxRadius);
  const cx = size / 2;
  const cy = size / 2;
  
  return (
    <div style={{...styles.card, display:"flex", flexDirection: "column", alignItems:"center", gap: 8}}>
      <div style={styles.previewHeader}>
        <h4 style={{...styles.previewTitle, color: "#8b5cf6"}}>Circle</h4>
        <p style={styles.previewSubtitle}>Radius = {radius} units</p>
      </div>
      
      <svg width={size} height={size} style={{border: "1px solid #e5e7eb", borderRadius: 8}}>
        <defs>
          <filter id="circleShadow" x="-20%" y="-20%" width="140%" height="140%">
            <dropShadow dx="2" dy="2" stdDeviation="2" floodColor="#00000020"/>
          </filter>
        </defs>
        
        {/* Circle */}
        <circle 
          cx={cx} 
          cy={cy} 
          r={scaledRadius} 
          fill="#f3e8ff40" 
          stroke="#8b5cf6" 
          strokeWidth={3}
          filter="url(#circleShadow)"
        />
        
        {/* Center point */}
        <circle cx={cx} cy={cy} r={3} fill="#8b5cf6"/>
        
        {/* Radius line */}
        <line 
          x1={cx} 
          y1={cy} 
          x2={cx + scaledRadius} 
          y2={cy} 
          stroke="#8b5cf6" 
          strokeWidth={2}
          strokeDasharray="3,2"
        />
        
        {/* Diameter line */}
        <line 
          x1={cx - scaledRadius} 
          y1={cy} 
          x2={cx + scaledRadius} 
          y2={cy} 
          stroke="#dc2626" 
          strokeWidth={2}
        />
        
        {/* Labels */}
        <text x={cx} y={cy-8} fontSize="10" fill="#8b5cf6" textAnchor="middle" fontWeight="bold">center</text>
        <text x={cx + scaledRadius/2} y={cy-5} fontSize="10" fill="#8b5cf6" textAnchor="middle" fontWeight="bold">r</text>
        <text x={cx} y={cy+scaledRadius+15} fontSize="10" fill="#dc2626" textAnchor="middle" fontWeight="bold">diameter = 2r</text>
        
        {/* Arc example */}
        <path 
          d={`M ${cx + scaledRadius * Math.cos(-Math.PI/4)} ${cy + scaledRadius * Math.sin(-Math.PI/4)} A ${scaledRadius} ${scaledRadius} 0 0 1 ${cx + scaledRadius * Math.cos(Math.PI/4)} ${cy + scaledRadius * Math.sin(Math.PI/4)}`}
          fill="none" 
          stroke="#f59e0b" 
          strokeWidth={4}
        />
        <text x={cx + scaledRadius + 10} y={cy} fontSize="10" fill="#f59e0b" fontWeight="bold">arc</text>
      </svg>
      
      <div style={styles.circleProperties}>
        <div style={styles.propertyRow}>
          <span style={styles.propertyLabel}>Circumference:</span>
          <span style={{...styles.propertyValue, color: "#8b5cf6"}}>{round(2 * Math.PI * radius, 2)}</span>
        </div>
        <div style={styles.propertyRow}>
          <span style={styles.propertyLabel}>Area:</span>
          <span style={{...styles.propertyValue, color: "#8b5cf6"}}>{round(Math.PI * radius * radius, 2)}</span>
        </div>
      </div>
    </div>
  );
}

function CentralAnglesWidget() {
  const [r, setR] = useState(6);
  const [theta, setTheta] = useState(60);
  const arc = 2 * Math.PI * r * (theta/360);
  const sector = Math.PI * r * r * (theta/360);
  return (
    <Section title="Central angles of circles">
      <p style={styles.lede}>A central angle of θ° cuts an arc and a sector that are θ/360 of the whole circle.</p>
      <div style={styles.card}>
        <div>
          <label style={styles.label}>Radius r = {r}</label>
          <input type="range" min={1} max={30} value={r} onChange={(e)=>setR(parseInt(e.target.value,10))} style={styles.slider}/>
        </div>
        <div>
          <label style={styles.label}>Angle θ = {theta}°</label>
          <input type="range" min={1} max={359} value={theta} onChange={(e)=>setTheta(parseInt(e.target.value,10))} style={styles.slider}/>
        </div>
        <div style={styles.kvGrid}>
          <KV k="Arc length" v={round(arc)} />
          <KV k="Sector area" v={round(sector)} />
          <KV k="Fraction of circle" v={`${round(theta/360, 3)}`} />
        </div>
      </div>
    </Section>
  );
}

// ----------------------------------
// Small presentational helpers
// ----------------------------------
function Section({ title, children }) {
  return (
    <section>
      <h2 style={styles.h2}>{title}</h2>
      {children}
    </section>
  );
}

function Details({ bullets }) {
  return (
    <div style={{...styles.card, marginTop: 12}}>
      <b>Remember:</b>
      <ul style={{marginTop: 8, paddingLeft: 18}}>
        {bullets.map((b, i) => (
          <li key={i} style={{marginBottom: 4}}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

function KV({ k, v }) {
  return (
    <div style={{display: "contents"}}>
      <div style={styles.k}>{k}</div>
      <div style={styles.v}>{v}</div>
    </div>
  );
}

function Num({ label, value, setValue }) {
  return (
    <label style={styles.numWrap}>
      <span style={styles.numLabel}>{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e)=> setValue(Number(e.target.value))}
        style={styles.input}
      />
    </label>
  );
}

// Simple polygon preview using SVG (regular polygon)
function PolygonPreview({ n=5 }) {
  const size = 200; 
  const r = 70; 
  const cx = size/2; 
  const cy = size/2;
  const pts = [];
  
  for (let i = 0; i < n; i++) {
    const ang = (Math.PI * 2 * i) / n - Math.PI/2;
    const x = cx + r * Math.cos(ang);
    const y = cy + r * Math.sin(ang);
    pts.push(`${x},${y}`);
  }
  
  // Generate a pleasing color based on number of sides
  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4'];
  const fillColor = colors[(n-3) % colors.length];
  const strokeColor = fillColor.replace(/[0-9]/g, (d) => Math.max(0, parseInt(d) - 2));
  
  return (
    <div style={{...styles.card, display:"flex", flexDirection: "column", alignItems:"center", gap: 8}}>
      <div style={styles.previewHeader}>
        <h4 style={styles.previewTitle}>{polygonName(n)}</h4>
        <p style={styles.previewSubtitle}>{n} sides</p>
      </div>
      <svg width={size} height={size} style={{border: "1px solid #e5e7eb", borderRadius: 8}}>
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <dropShadow dx="2" dy="2" stdDeviation="2" floodColor="#00000020"/>
          </filter>
        </defs>
        <polygon 
          points={pts.join(" ")} 
          fill={fillColor + "40"} 
          stroke={fillColor} 
          strokeWidth={3}
          filter="url(#shadow)"
        />
        {/* Add vertex labels */}
        {pts.map((pt, i) => {
          const [x, y] = pt.split(',').map(Number);
          return (
            <g key={i}>
              <circle cx={x} cy={y} r={4} fill={fillColor} stroke="white" strokeWidth={2}/>
              <text x={x} y={y-12} fontSize="12" fill={fillColor} textAnchor="middle" fontWeight="bold">
                {String.fromCharCode(65 + i)}
              </text>
            </g>
          );
        })}
      </svg>
      <div style={styles.shapeStats}>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>Interior Angle:</span>
          <span style={styles.statValue}>{Math.round(((n-2) * 180) / n)}°</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>Total Angles:</span>
          <span style={styles.statValue}>{(n-2) * 180}°</span>
        </div>
      </div>
    </div>
  );
}

// Enhanced triangle preview with better visualization
function TrianglePreview({ a, b, c, valid }) {
  const size = 240; 
  const padding = 20;
  const maxBase = size - 2 * padding;
  
  if (!valid) {
    return (
      <div style={{...styles.card, display:"flex", flexDirection: "column", alignItems:"center", gap: 8}}>
        <div style={styles.previewHeader}>
          <h4 style={{...styles.previewTitle, color: "#dc2626"}}>Invalid Triangle</h4>
          <p style={styles.previewSubtitle}>Check triangle inequality</p>
        </div>
        <div style={styles.invalidTriangle}>
          <div style={styles.invalidIcon}>⚠️</div>
          <p style={styles.invalidText}>
            Triangle inequality not satisfied:<br/>
            Each side must be less than<br/>
            the sum of the other two sides
          </p>
        </div>
      </div>
    );
  }
  
  // Calculate triangle coordinates using law of cosines
  const scale = Math.min(maxBase / Math.max(a, b, c), 60);
  const scaledA = a * scale;
  const scaledB = b * scale;
  const scaledC = c * scale;
  
  // Place triangle with base c at bottom
  const A = [padding, size - padding - 20];
  const B = [padding + scaledC, size - padding - 20];
  
  // Calculate third vertex using law of cosines
  const cosA = (scaledB*scaledB + scaledC*scaledC - scaledA*scaledA) / (2*scaledB*scaledC);
  const angleA = Math.acos(Math.max(-1, Math.min(1, cosA)));
  const Cx = A[0] + scaledB * Math.cos(angleA);
  const Cy = A[1] - scaledB * Math.sin(angleA);
  const C = [Cx, Cy];
  
  // Determine triangle type for coloring
  const sideType = triangleBySides(a, b, c);
  const angleType = triangleByAngles(a, b, c);
  
  const getTriangleColor = () => {
    if (angleType === "Right") return "#10b981"; // Green for right
    if (angleType === "Obtuse") return "#f59e0b"; // Orange for obtuse  
    if (sideType === "Equilateral") return "#8b5cf6"; // Purple for equilateral
    if (sideType === "Isosceles") return "#3b82f6"; // Blue for isosceles
    return "#6b7280"; // Gray for scalene acute
  };
  
  const triangleColor = getTriangleColor();
  
  return (
    <div style={{...styles.card, display:"flex", flexDirection: "column", alignItems:"center", gap: 8}}>
      <div style={styles.previewHeader}>
        <h4 style={{...styles.previewTitle, color: triangleColor}}>
          {sideType} {angleType} Triangle
        </h4>
        <p style={styles.previewSubtitle}>Sides: {a}, {b}, {c}</p>
      </div>
      
      <svg width={size} height={size} style={{border: "1px solid #e5e7eb", borderRadius: 8}}>
        <defs>
          <filter id="triangleShadow" x="-20%" y="-20%" width="140%" height="140%">
            <dropShadow dx="2" dy="2" stdDeviation="2" floodColor="#00000020"/>
          </filter>
        </defs>
        
        {/* Triangle fill and stroke */}
        <polygon 
          points={`${A[0]},${A[1]} ${B[0]},${B[1]} ${C[0]},${C[1]}`} 
          fill={triangleColor + "30"} 
          stroke={triangleColor} 
          strokeWidth={3}
          filter="url(#triangleShadow)"
        />
        
        {/* Vertices */}
        <circle cx={A[0]} cy={A[1]} r={4} fill={triangleColor} stroke="white" strokeWidth={2}/>
        <circle cx={B[0]} cy={B[1]} r={4} fill={triangleColor} stroke="white" strokeWidth={2}/>
        <circle cx={C[0]} cy={C[1]} r={4} fill={triangleColor} stroke="white" strokeWidth={2}/>
        
        {/* Vertex labels */}
        <text x={A[0]-12} y={A[1]+5} fontSize="14" fill={triangleColor} fontWeight="bold">A</text>
        <text x={B[0]+8} y={B[1]+5} fontSize="14" fill={triangleColor} fontWeight="bold">B</text>
        <text x={C[0]} y={C[1]-8} fontSize="14" fill={triangleColor} fontWeight="bold" textAnchor="middle">C</text>
        
        {/* Side labels */}
        <text x={(A[0]+B[0])/2} y={A[1]+18} fontSize="12" fill={triangleColor} textAnchor="middle" fontWeight="bold">
          {c}
        </text>
        <text x={(A[0]+C[0])/2-15} y={(A[1]+C[1])/2+5} fontSize="12" fill={triangleColor} fontWeight="bold">
          {b}
        </text>
        <text x={(B[0]+C[0])/2+15} y={(B[1]+C[1])/2+5} fontSize="12" fill={triangleColor} fontWeight="bold">
          {a}
        </text>
        
        {/* Right angle indicator if applicable */}
        {angleType === "Right" && (
          <rect x={A[0]} y={A[1]-15} width={15} height={15} fill="none" stroke={triangleColor} strokeWidth={2}/>
        )}
      </svg>
      
      <div style={styles.triangleProperties}>
        <div style={styles.propertyRow}>
          <span style={styles.propertyLabel}>Type by sides:</span>
          <span style={{...styles.propertyValue, color: triangleColor}}>{sideType}</span>
        </div>
        <div style={styles.propertyRow}>
          <span style={styles.propertyLabel}>Type by angles:</span>
          <span style={{...styles.propertyValue, color: triangleColor}}>{angleType}</span>
        </div>
      </div>
    </div>
  );
}

// Enhanced trapezoid preview
function TrapezoidPreview({ parallelPairs }) {
  const size = 200;
  const padding = 20;
  
  let shape, color, strokeColor, title, description;
  
  if (parallelPairs === 0) {
    // General quadrilateral - irregular shape
    shape = `${padding+20},${padding+20} ${size-padding-10},${padding+30} ${size-padding-20},${size-padding-30} ${padding+30},${size-padding-20}`;
    color = "#f3f4f6";
    strokeColor = "#6b7280";
    title = "General Quadrilateral";
    description = "No parallel sides";
  } else if (parallelPairs === 1) {
    // Trapezoid - one pair of parallel sides
    shape = `${padding+30},${padding+20} ${size-padding-30},${padding+20} ${size-padding-10},${size-padding-20} ${padding+10},${size-padding-20}`;
    color = "#dbeafe";
    strokeColor = "#3b82f6";
    title = "Trapezoid";
    description = "One pair of parallel sides";
  } else {
    // Parallelogram - two pairs of parallel sides
    shape = `${padding+20},${padding+20} ${size-padding-40},${padding+20} ${size-padding-20},${size-padding-20} ${padding+40},${size-padding-20}`;
    color = "#dcfce7";
    strokeColor = "#16a34a";
    title = "Parallelogram";
    description = "Two pairs of parallel sides";
  }
  
  return (
    <div style={{...styles.card, display:"flex", flexDirection: "column", alignItems:"center", gap: 8}}>
      <div style={styles.previewHeader}>
        <h4 style={{...styles.previewTitle, color: strokeColor}}>{title}</h4>
        <p style={styles.previewSubtitle}>{description}</p>
      </div>
      
      <svg width={size} height={size} style={{border: "1px solid #e5e7eb", borderRadius: 8}}>
        <defs>
          <filter id="quadShadow" x="-20%" y="-20%" width="140%" height="140%">
            <dropShadow dx="2" dy="2" stdDeviation="2" floodColor="#00000020"/>
          </filter>
        </defs>
        
        {/* Main quadrilateral */}
        <polygon 
          points={shape} 
          fill={color} 
          stroke={strokeColor} 
          strokeWidth={3}
          filter="url(#quadShadow)"
        />
        
        {/* Parallel line indicators */}
        {parallelPairs >= 1 && (
          <>
            {/* Top parallel line indicator */}
            <line 
              x1={padding+25} y1={padding+10} 
              x2={size-padding-35} y2={padding+10} 
              stroke={strokeColor} 
              strokeWidth={2} 
              strokeDasharray="5,3"
            />
            {/* Bottom parallel line indicator */}
            <line 
              x1={padding+5} y1={size-padding-10} 
              x2={size-padding-15} y2={size-padding-10} 
              stroke={strokeColor} 
              strokeWidth={2} 
              strokeDasharray="5,3"
            />
            {/* Parallel symbol */}
            <text x={size/2} y={padding+35} fontSize="16" fill={strokeColor} textAnchor="middle">∥</text>
          </>
        )}
        
        {parallelPairs === 2 && (
          <>
            {/* Left parallel line indicator */}
            <line 
              x1={padding+10} y1={padding+30} 
              x2={padding+30} y2={size-padding-30} 
              stroke={strokeColor} 
              strokeWidth={2} 
              strokeDasharray="5,3"
            />
            {/* Right parallel line indicator */}
            <line 
              x1={size-padding-50} y1={padding+30} 
              x2={size-padding-30} y2={size-padding-30} 
              stroke={strokeColor} 
              strokeWidth={2} 
              strokeDasharray="5,3"
            />
            {/* Second parallel symbol */}
            <text x={padding+50} y={size/2} fontSize="16" fill={strokeColor} textAnchor="middle">∥</text>
          </>
        )}
        
        {/* Vertices */}
        <circle cx={padding+30} cy={padding+20} r={3} fill={strokeColor} stroke="white" strokeWidth={1}/>
        <circle cx={size-padding-30} cy={padding+20} r={3} fill={strokeColor} stroke="white" strokeWidth={1}/>
        <circle cx={size-padding-10} cy={size-padding-20} r={3} fill={strokeColor} stroke="white" strokeWidth={1}/>
        <circle cx={padding+10} cy={size-padding-20} r={3} fill={strokeColor} stroke="white" strokeWidth={1}/>
      </svg>
      
      <div style={styles.quadrilateralInfo}>
        <div style={styles.infoItem}>
          <span style={styles.infoLabel}>Parallel pairs:</span>
          <span style={{...styles.infoValue, color: strokeColor}}>{parallelPairs}</span>
        </div>
        <div style={styles.infoItem}>
          <span style={styles.infoLabel}>Interior angles sum:</span>
          <span style={{...styles.infoValue, color: strokeColor}}>360°</span>
        </div>
      </div>
    </div>
  );
}

function RealWorldShapesWidget({ addPoints }) {
  const [selectedShape, setSelectedShape] = useState(null);
  const [answered, setAnswered] = useState(false);
  
  const realWorldExamples = [
    { shape: "Triangle", examples: ["Roof of a house", "Slice of pizza", "Traffic yield sign"], image: "📐" },
    { shape: "Square", examples: ["Chess board", "Window frame", "Sticky notes"], image: "⬛" },
    { shape: "Circle", examples: ["Clock", "Wheel", "Full moon"], image: "⭕" },
    { shape: "Rectangle", examples: ["Door", "Television screen", "Book cover"], image: "📱" },
    { shape: "Pentagon", examples: ["Soccer ball panels", "U.S. Pentagon building", "School crossing sign"], image: "🏠" },
    { shape: "Hexagon", examples: ["Honeycomb", "Nuts and bolts", "Pencil cross-section"], image: "🐝" },
    { shape: "Octagon", examples: ["Stop sign", "Umbrella top-view", "Some mirrors"], image: "🛑" }
  ];

  const handleSelectShape = (shape) => {
    setSelectedShape(shape);
    if (!answered) {
      setAnswered(true);
      addPoints(5);
    }
  };

  return (
    <Section title="Shapes in real life">
      <p style={styles.lede}>
        Shapes are all around us! Click on a shape to see where you can find it in the real world.
      </p>
      
      <div style={styles.shapeGrid}>
        {realWorldExamples.map(item => (
          <div 
            key={item.shape}
            style={{
              ...styles.shapeCard,
              ...(selectedShape === item.shape ? styles.shapeCardSelected : {})
            }}
            onClick={() => handleSelectShape(item.shape)}
          >
            <div style={styles.shapeEmoji}>{item.image}</div>
            <div style={styles.shapeName}>{item.shape}</div>
          </div>
        ))}
      </div>
      
      {selectedShape && (
        <div style={styles.examplesCard}>
          <h3 style={styles.examplesTitle}>Where to find {selectedShape}s:</h3>
          <ul style={styles.examplesList}>
            {realWorldExamples.find(item => item.shape === selectedShape).examples.map((example, i) => (
              <li key={i} style={styles.exampleItem}>🔍 {example}</li>
            ))}
          </ul>
          <div style={styles.challengePrompt}>
            <span style={styles.challengeIcon}>🌟</span> 
            <span>Challenge: Can you find 3 more examples of {selectedShape}s in your home or classroom?</span>
          </div>
        </div>
      )}
    </Section>
  );
}

function ShapesQuizWidget({ addPoints }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);
  
  const questions = [
    {
      question: "Which shape has exactly 3 sides?",
      options: ["Square", "Triangle", "Pentagon", "Circle"],
      answer: "Triangle",
      explanation: "A triangle has exactly 3 sides and 3 angles."
    },
    {
      question: "What is the sum of interior angles of a pentagon?",
      options: ["360°", "540°", "720°", "900°"],
      answer: "540°",
      explanation: "For a pentagon with 5 sides: (5-2) × 180° = 3 × 180° = 540°"
    },
    {
      question: "Which quadrilateral has exactly one pair of parallel sides?",
      options: ["Square", "Rectangle", "Trapezoid", "Rhombus"],
      answer: "Trapezoid",
      explanation: "A trapezoid has exactly one pair of parallel sides."
    },
    {
      question: "What is the angle in a regular octagon?",
      options: ["120°", "135°", "144°", "150°"],
      answer: "135°",
      explanation: "In a regular octagon, each interior angle is (8-2) × 180° ÷ 8 = 6 × 180° ÷ 8 = 135°"
    },
    {
      question: "Which shape can have only right angles?",
      options: ["Triangle", "Rectangle", "Pentagon", "Hexagon"],
      answer: "Rectangle",
      explanation: "A rectangle has 4 right angles (90° each)."
    }
  ];
  
  const handleAnswer = (answer) => {
    if (answered) return;
    
    setSelectedAnswer(answer);
    setAnswered(true);
    
    if (answer === questions[currentQuestion].answer) {
      setScore(score + 1);
      addPoints(10);
    }
  };
  
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswered(false);
      setSelectedAnswer(null);
    } else {
      setQuizComplete(true);
      if (score >= 4) {
        addPoints(20); // Bonus for excellent score
      }
    }
  };
  
  return (
    <Section title="Shape Quiz Challenge">
      {!quizComplete ? (
        <>
          <div style={styles.quizProgress}>
            Question {currentQuestion + 1} of {questions.length}
            <div style={styles.progressBarQuiz}>
              <div style={{...styles.progressFillQuiz, width: `${(currentQuestion + 1) * 100 / questions.length}%`}}></div>
            </div>
          </div>
          
          <div style={styles.questionCard}>
            <h3 style={styles.questionText}>{questions[currentQuestion].question}</h3>
            
            <div style={styles.optionsGrid}>
              {questions[currentQuestion].options.map(option => (
                <button
                  key={option}
                  style={{
                    ...styles.optionButton,
                    ...(selectedAnswer === option 
                      ? option === questions[currentQuestion].answer 
                        ? styles.correctOption 
                        : styles.incorrectOption
                      : {}),
                    ...(answered && option === questions[currentQuestion].answer ? styles.correctOption : {})
                  }}
                  onClick={() => handleAnswer(option)}
                  disabled={answered}
                >
                  {option}
                </button>
              ))}
            </div>
            
            {answered && (
              <div style={styles.explanationBox}>
                {selectedAnswer === questions[currentQuestion].answer 
                  ? <div style={styles.correctHeader}>✅ Correct!</div>
                  : <div style={styles.incorrectHeader}>❌ Not quite.</div>
                }
                <p>{questions[currentQuestion].explanation}</p>
              </div>
            )}
            
            {answered && (
              <button 
                style={styles.nextButton}
                onClick={nextQuestion}
              >
                {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
              </button>
            )}
          </div>
        </>
      ) : (
        <div style={styles.resultsCard}>
          <h3 style={styles.resultsTitle}>Quiz Complete!</h3>
          <div style={styles.scoreDisplay}>
            Your score: {score} out of {questions.length}
          </div>
          
          <div style={score >= 4 ? styles.excellentResult : score >= 3 ? styles.goodResult : styles.needPracticeResult}>
            {score >= 4 ? "Excellent! You're a geometry master! 🏆" : 
             score >= 3 ? "Good job! Keep practicing! 🌟" :
             "Keep learning and try again! 📚"}
          </div>
          
          <button
            style={styles.restartButton}
            onClick={() => {
              setCurrentQuestion(0);
              setScore(0);
              setAnswered(false);
              setSelectedAnswer(null);
              setQuizComplete(false);
            }}
          >
            Try Again
          </button>
        </div>
      )}
    </Section>
  );
}

// ----------------------------------
// Math helpers (JS)
// ----------------------------------
function triangleInequality(a,b,c){
  return a + b > c && b + c > a && c + a > b && a>0 && b>0 && c>0;
}

function triangleBySides(a,b,c){
  if (almostEqual(a,b) && almostEqual(b,c)) return "Equilateral";
  if (almostEqual(a,b) || almostEqual(b,c) || almostEqual(c,a)) return "Isosceles";
  return "Scalene";
}

function triangleByAngles(a,b,c){
  // Use converse of Pythagoras on the longest side
  const sides = [a,b,c].sort((x,y)=>x-y);
  const [x,y,z] = sides;
  const lhs = x*x + y*y;
  const rhs = z*z;
  if (almostEqual(lhs, rhs)) return "Right";
  if (lhs > rhs) return "Acute";
  return "Obtuse";
}

function polygonName(n){
  const names = {
    3: "Triangle", 4: "Quadrilateral", 5: "Pentagon", 6: "Hexagon",
    7: "Heptagon", 8: "Octagon", 9: "Nonagon", 10: "Decagon",
    11: "Hendecagon", 12: "Dodecagon", 13: "Triskaidecagon", 14: "Tetradecagon",
    15: "Pentadecagon", 16: "Hexadecagon", 17: "Heptadecagon", 18: "Octadecagon",
    19: "Enneadecagon", 20: "Icosagon"
  };
  return names[n] || `${n}-gon`;
}

function round(x, d=2){
  const p = Math.pow(10, d);
  return Math.round(x * p) / p;
}
function almostEqual(x,y,eps=1e-6){
  return Math.abs(x-y) < eps;
}

// ----------------------------------
// Styles (inline objects)
// ----------------------------------
const styles = {
  shell: { fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif", color: "#0f172a", background: "linear-gradient(180deg,#f8fafc,#eef2ff)", minHeight: "100vh", padding: 24 },
  header: { marginBottom: 16 },
  h1: { margin: 0, fontSize: 28, fontWeight: 800, background: "linear-gradient(90deg, #4338ca, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  h2: { margin: "8px 0 12px", fontSize: 20, color: "#4338ca" },
  muted: { color: "#475569" },
  grid: { display: "grid", gridTemplateColumns: "260px 1fr", gap: 16 },
  nav: { display: "flex", flexDirection: "column", gap: 8 },
  navBtn: { textAlign: "left", background: "white", border: "1px solid #e2e8f0", padding: "10px 12px", borderRadius: 12, cursor: "pointer", transition: "all 0.2s ease" },
  navBtnActive: { borderColor: "#22c55e", boxShadow: "0 0 0 2px #86efac inset" },
  main: { background: "white", border: "1px solid #e2e8f0", borderRadius: 16, padding: 16, maxHeight: "700px", overflowY: "auto" },
  footer: { marginTop: 16 },
  
  subHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 },
  tagline: { color: "#6366f1", margin: 0, fontStyle: "italic" },
  pointsDisplay: { position: "relative" },
  pointsBadge: { background: "linear-gradient(90deg, #4338ca, #3b82f6)", color: "white", padding: "4px 12px", borderRadius: 20, fontWeight: "bold" },
  confetti: { position: "absolute", top: "-20px", right: "0", animation: "fadeUp 2s forwards", color: "#10b981", fontWeight: "bold" },
  
  "@keyframes fadeUp": {
    "0%": { opacity: 0, transform: "translateY(0)" },
    "20%": { opacity: 1 },
    "80%": { opacity: 1 },
    "100%": { opacity: 0, transform: "translateY(-20px)" }
  },
  
  topicEmoji: { marginRight: 8, fontSize: "1.2em" },
  
  lede: { marginTop: 0, fontSize: 16, lineHeight: 1.6 },
  row: { display: "grid", gridTemplateColumns: "1fr 260px", gap: 12 },
  card: { background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 12, boxShadow: "0 2px 4px rgba(0,0,0,0.05)" },
  kvGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 12, rowGap: 8, marginTop: 8 },
  k: { color: "#475569" },
  v: { fontWeight: 700, color: "#4338ca" },
  inputsRow: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" },
  numWrap: { display: "grid", gridTemplateColumns: "24px 1fr", gap: 6, alignItems: "center" },
  numLabel: { fontWeight: 700, color: "#4338ca" },
  input: { border: "1px solid #e2e8f0", borderRadius: 8, padding: "6px 8px", width: 96 },
  label: { display: "block", marginBottom: 4, color: "#334155" },
  slider: { width: "100%", accentColor: "#4f46e5" },
  
  memoryAid: { marginTop: 12, padding: 8, background: "#f8fafc", borderRadius: 8, display: "flex", alignItems: "center", gap: 8 },
  memoryIcon: { fontSize: 20 },
  
  triangleInfo: { marginTop: 8, textAlign: "center" },
  previewTitle: { margin: "8px 0 4px", fontSize: 14, color: "#4338ca" },
  previewText: { margin: 0, fontSize: 12, color: "#6b7280" },
  
  // Enhanced preview styles
  previewHeader: { textAlign: "center", marginBottom: 4 },
  previewSubtitle: { margin: 0, fontSize: 11, color: "#6b7280", fontStyle: "italic" },
  
  shapeStats: { display: "flex", gap: 16, marginTop: 8 },
  statItem: { textAlign: "center" },
  statLabel: { display: "block", fontSize: 10, color: "#6b7280", marginBottom: 2 },
  statValue: { display: "block", fontSize: 14, fontWeight: "bold", color: "#4338ca" },
  
  triangleProperties: { width: "100%", marginTop: 8 },
  propertyRow: { display: "flex", justifyContent: "space-between", marginBottom: 4 },
  propertyLabel: { fontSize: 11, color: "#6b7280" },
  propertyValue: { fontSize: 11, fontWeight: "bold" },
  
  invalidTriangle: { 
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center", 
    padding: 16, 
    background: "#fef2f2", 
    borderRadius: 8, 
    border: "1px solid #fecaca" 
  },
  invalidIcon: { fontSize: 32, marginBottom: 8 },
  invalidText: { 
    textAlign: "center", 
    fontSize: 12, 
    color: "#991b1b", 
    lineHeight: 1.4, 
    margin: 0 
  },
  
  quadrilateralInfo: { width: "100%", marginTop: 8 },
  infoItem: { display: "flex", justifyContent: "space-between", marginBottom: 4 },
  infoLabel: { fontSize: 11, color: "#6b7280" },
  infoValue: { fontSize: 11, fontWeight: "bold" },
  
  circleProperties: { width: "100%", marginTop: 8 },
  
  inequalityCheck: { marginTop: 12, padding: 8, background: "#f8fafc", borderRadius: 8, fontSize: 12 },
  
  quizButton: { 
    marginTop: 12, 
    width: "100%", 
    background: "#4f46e5", 
    color: "white", 
    border: "none", 
    padding: "8px", 
    borderRadius: 8, 
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.2s ease"
  },
  quizCard: { 
    background: "#f8fafc", 
    padding: 16, 
    borderRadius: 12, 
    marginTop: 16, 
    border: "1px solid #e2e8f0" 
  },
  quizTitle: { 
    marginTop: 0,
    marginBottom: 12,
    fontSize: 18,
    color: "#4338ca"
  },
  quizOptions: { 
    display: "flex", 
    gap: 8, 
    marginTop: 12 
  },
  quizOption: { 
    padding: "8px 16px", 
    background: "white", 
    border: "1px solid #e2e8f0", 
    borderRadius: 8, 
    cursor: "pointer",
    flex: 1,
    transition: "all 0.2s ease"
  },
  correctFeedback: { 
    marginTop: 12, 
    padding: 8, 
    background: "#dcfce7", 
    color: "#166534", 
    borderRadius: 8 
  },
  incorrectFeedback: { 
    marginTop: 12, 
    padding: 8, 
    background: "#fee2e2", 
    color: "#991b1b", 
    borderRadius: 8 
  },
  
  achievementBanner: { 
    background: "white", 
    padding: 12, 
    borderRadius: 12, 
    border: "1px solid #e2e8f0",
    marginBottom: 12
  },
  badgeWrapper: { 
    display: "flex", 
    gap: 8, 
    marginBottom: 8 
  },
  badge: { 
    background: "#f1f5f9", 
    padding: "4px 10px", 
    borderRadius: 16, 
    fontSize: 14, 
    fontWeight: "bold", 
    color: "#334155" 
  },
  progressBar: { 
    height: 8, 
    background: "#f1f5f9", 
    borderRadius: 4, 
    overflow: "hidden" 
  },
  progressFill: { 
    height: "100%", 
    background: "linear-gradient(90deg, #4338ca, #3b82f6)", 
    borderRadius: 4,
    transition: "width 0.5s ease"
  },
  helpText: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: 14,
    marginTop: 8
  },

  // Real world shapes styles
  shapeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
    gap: 12,
    marginBottom: 16
  },
  shapeCard: {
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: 12,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
  },
  shapeCardSelected: {
    borderColor: "#4f46e5",
    boxShadow: "0 0 0 2px rgba(79, 70, 229, 0.3)",
    transform: "translateY(-2px)"
  },
  shapeEmoji: {
    fontSize: 32,
    marginBottom: 8
  },
  shapeName: {
    fontWeight: "bold",
    color: "#334155"
  },
  examplesCard: {
    background: "#f8fafc",
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    border: "1px solid #e2e8f0"
  },
  examplesTitle: {
    margin: "0 0 12px",
    color: "#4338ca",
    fontSize: 18
  },
  examplesList: {
    margin: 0,
    padding: "0 0 0 12px"
  },
  exampleItem: {
    marginBottom: 8
  },
  challengePrompt: {
    marginTop: 16,
    padding: 12,
    background: "#e0f2fe",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    gap: 8
  },
  challengeIcon: {
    fontSize: 20
  },
  
  // Quiz styles
  quizProgress: {
    marginBottom: 16,
    color: "#4338ca",
    fontWeight: "bold"
  },
  progressBarQuiz: {
    height: 8,
    background: "#f1f5f9",
    borderRadius: 4,
    marginTop: 8,
    overflow: "hidden"
  },
  progressFillQuiz: {
    height: "100%",
    background: "linear-gradient(90deg, #4338ca, #3b82f6)",
    transition: "width 0.3s ease"
  },
  questionCard: {
    background: "white",
    borderRadius: 12,
    padding: 20,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    border: "1px solid #e2e8f0"
  },
  questionText: {
    fontSize: 20,
    margin: "0 0 20px",
    color: "#1e293b"
  },
  optionsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12
  },
  optionButton: {
    padding: "12px 16px",
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    fontSize: 16,
    cursor: "pointer",
    textAlign: "center",
    transition: "all 0.2s"
  },
  correctOption: {
    background: "#dcfce7",
    borderColor: "#10b981",
    color: "#166534"
  },
  incorrectOption: {
    background: "#fee2e2",
    borderColor: "#ef4444",
    color: "#991b1b"
  },
  explanationBox: {
    marginTop: 20,
    padding: 16,
    background: "#f8fafc",
    borderRadius: 8,
    border: "1px solid #e2e8f0"
  },
  correctHeader: {
    color: "#16a34a",
    fontWeight: "bold",
    marginBottom: 8
  },
  incorrectHeader: {
    color: "#dc2626",
    fontWeight: "bold",
    marginBottom: 8
  },
  nextButton: {
    marginTop: 20,
    padding: "12px 24px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer",
    display: "block",
    width: "100%"
  },
  resultsCard: {
    background: "white",
    borderRadius: 12,
    padding: 24,
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    border: "1px solid #e2e8f0"
  },
  resultsTitle: {
    fontSize: 24,
    margin: "0 0 16px",
    color: "#4338ca"
  },
  scoreDisplay: {
    fontSize: 20,
    fontWeight: "bold",
    margin: "0 0 24px",
    color: "#1e293b"
  },
  excellentResult: {
    padding: 16,
    background: "#dcfce7",
    color: "#166534",
    borderRadius: 8,
    marginBottom: 24
  },
  goodResult: {
    padding: 16,
    background: "#fef9c3",
    color: "#854d0e",
    borderRadius: 8,
    marginBottom: 24
  },
  needPracticeResult: {
    padding: 16,
    background: "#fee2e2",
    color: "#991b1b",
    borderRadius: 8,
    marginBottom: 24
  },
  restartButton: {
    padding: "12px 24px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer"
  }
};
