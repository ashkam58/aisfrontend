

'use client';
import React, { useMemo, useState } from 'react';
import Link from 'next/link';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQuestion() {
  const a = getRandomInt(-10, 10);
  const b = getRandomInt(-10, 10);
  return { a, b, answer: a - b };
}

const POS = 'pos';
const NEG = 'neg';

function createTokensFromValue(val) {
  const type = val >= 0 ? POS : NEG;
  const n = Math.abs(val);
  const arr = [];
  for (let i = 0; i < n; i++) arr.push({ id: `${type}-${Date.now()}-${i}-${Math.random()}`, type });
  return arr;
}

function countType(tokens, type) {
  return tokens.reduce((acc, t) => acc + (t.type === type ? 1 : 0), 0);
}

function valueFromTokens(tokens) {
  return countType(tokens, POS) - countType(tokens, NEG);
}

function Token({ type, highlight, onClick }) {
  return (
    <span
      className={`token ${type} ${highlight ? 'highlight' : ''}`}
      onClick={onClick}
      role="button"
      aria-label={type === POS ? 'positive token' : 'negative token'}
      title={type === POS ? '+1' : '-1'}
    >
      {type === POS ? '🟦' : '🟥'}
    </span>
  );
}

export default function SubtractIntegersB6Playground() {
  const [question, setQuestion] = useState(generateQuestion());
  const [stage, setStage] = useState(1); // 1: setup, 2: make-enough, 3: remove, 4: result
  const [tokens, setTokens] = useState(() => createTokensFromValue(generateQuestion().a)); // will reset below
  const [toRemoveType, setToRemoveType] = useState(null);
  const [toRemoveCount, setToRemoveCount] = useState(0);
  const [removed, setRemoved] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  // Initialize when question changes
  React.useEffect(() => {
    setTokens(createTokensFromValue(question.a));
    setStage(1);
    setToRemoveType(question.b > 0 ? POS : question.b < 0 ? NEG : null);
    setToRemoveCount(Math.abs(question.b));
    setRemoved(0);
    setUserAnswer('');
    setFeedback('');
  }, [question]);

  const haveEnough = useMemo(() => {
    if (toRemoveCount === 0) return true;
    if (!toRemoveType) return true;
    return countType(tokens, toRemoveType) >= toRemoveCount;
  }, [tokens, toRemoveType, toRemoveCount]);

  function addZeroPair() {
    setTokens(prev => ([
      ...prev,
      { id: `pos-${Date.now()}-${Math.random()}`, type: POS },
      { id: `neg-${Date.now()}-${Math.random()}`, type: NEG },
    ]));
  }

  function removeOne() {
    if (!toRemoveType || toRemoveCount === 0) return;
    setTokens(prev => {
      const idx = prev.findIndex(t => t.type === toRemoveType);
      if (idx === -1) return prev;
      const next = prev.slice();
      next.splice(idx, 1);
      return next;
    });
    setRemoved(r => Math.min(r + 1, toRemoveCount));
  }

  React.useEffect(() => {
    if (stage === 3 && removed >= toRemoveCount) {
      // Finished removal → move to result
      const timer = setTimeout(() => setStage(4), 400);
      return () => clearTimeout(timer);
    }
  }, [removed, toRemoveCount, stage]);

  function handleCheck() {
    const val = parseInt(userAnswer, 10);
    if (!Number.isFinite(val)) {
      setFeedback('Enter a number, brave mathematician!');
      return;
    }
    if (val === question.answer) {
      setFeedback('🎉 Correct! Zero-pair ninjutsu mastered.');
      // After a short cheer, load new question
      setTimeout(() => {
        setQuestion(generateQuestion());
      }, 900);
    } else {
      setFeedback('😅 Not quite. Recount the counters or add/remove carefully.');
    }
  }

  function skipToResult() {
    // Quick compute just from tokens (useful if b = 0)
    setStage(4);
  }

  const currentValue = valueFromTokens(tokens);
  const needLabel = toRemoveType === POS ? '+1 (blue) counters' : '-1 (red) counters';

  return (
    <div className="wrap">
      <div className="card">
        <h1 className="title">🎮 Integer Subtraction Arena — B.6</h1>
        <p className="subtitle">
          Use <b>counters</b> and <b>zero pairs</b> to solve step by step. Blue = +1, Red = −1.
        </p>

        <div className="question">
          <div className="badge">Round</div>
          <div className="qtext">
            <span>Compute:</span>
            <code>{question.a} − ({question.b})</code>
          </div>
        </div>

        {/* STAGE 1: Setup */}
        {stage === 1 && (
          <div className="stage">
            <h2>Step 1 — Build the Start</h2>
            <p>
              Represent <b>{question.a}</b> using counters.
              {question.a === 0 ? ' (Zero means no counters… elegant!)' : ''}
            </p>
            <Board tokens={tokens} targetType={null} onTokenClick={null} />

            <div className="hint">
              {question.a >= 0
                ? 'Blue counters show positive ones.'
                : 'Red counters show negative ones.'}
            </div>

            <div className="actions">
              <button className="btn primary" onClick={() => setStage(2)}>
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STAGE 2: Make enough counters (via zero pairs) */}
        {stage === 2 && (
          <div className="stage">
            <h2>Step 2 — Prepare to Subtract</h2>
            {toRemoveCount === 0 ? (
              <>
                <p>We’re subtracting <b>0</b>. Nothing to remove — that’s a freebie!</p>
                <Board tokens={tokens} targetType={null} onTokenClick={null} />
                <div className="actions">
                  <button className="btn primary" onClick={skipToResult}>Skip to Result</button>
                </div>
              </>
            ) : (
              <>
                <p>
                  Subtracting <b>{question.b}</b> means we will{' '}
                  <b>remove {toRemoveCount} {needLabel}</b>.
                  {toRemoveType === POS
                    ? ' (Subtracting a positive → remove positives.)'
                    : ' (Subtracting a negative → remove negatives.)'}
                </p>

                <Board tokens={tokens} targetType={toRemoveType} onTokenClick={null} />

                <div className="status">
                  You have <b>{countType(tokens, toRemoveType)}</b> of the needed type.{' '}
                  {haveEnough ? 'Nice, that’s enough!' : 'Add zero pairs until you have enough.'}
                </div>

                <div className="actions">
                  <button className="btn ghost" onClick={addZeroPair}>
                    ➕ Add Zero Pair (+1 & −1)
                  </button>
                  <button
                    className="btn primary"
                    onClick={() => setStage(3)}
                    disabled={!haveEnough}
                    title={!haveEnough ? 'Add more zero pairs first' : 'Ready to remove'}
                  >
                    Next: Remove Counters
                  </button>
                </div>

                <p className="micro">
                  Why zero pairs? Because <b>+1 and −1 together = 0</b>. Adding a zero pair doesn’t
                  change the value, but gives you the “pieces” you need to remove.
                </p>
              </>
            )}
          </div>
        )}

        {/* STAGE 3: Remove required counters */}
        {stage === 3 && (
          <div className="stage">
            <h2>Step 3 — Remove {toRemoveCount} {toRemoveType === POS ? '+1 (blue)' : '−1 (red)'} counters</h2>
            <p>Tap “Remove One” or click a highlighted token to remove it.</p>

            <Board
              tokens={tokens}
              targetType={toRemoveType}
              onTokenClick={(id, type) => {
                if (type !== toRemoveType) return;
                setTokens(prev => prev.filter(t => t.id !== id));
                setRemoved(r => Math.min(r + 1, toRemoveCount));
              }}
            />

            <div className="progress">
              <div className="bar" style={{ width: `${(removed / Math.max(1, toRemoveCount)) * 100}%` }} />
            </div>
            <div className="status">
              Removed <b>{removed}</b> / <b>{toRemoveCount}</b>
            </div>

            <div className="actions">
              <button className="btn ghost" onClick={removeOne} disabled={removed >= toRemoveCount}>
                🧹 Remove One
              </button>
              <button
                className="btn primary"
                onClick={() => setStage(4)}
                disabled={removed < toRemoveCount}
              >
                See Result
              </button>
            </div>
          </div>
        )}

        {/* STAGE 4: Result + check */}
        {stage === 4 && (
          <div className="stage">
            <h2>Step 4 — Count What’s Left</h2>
            <p>
              Count remaining counters. Value = (blue count) − (red count).
            </p>

            <Board tokens={tokens} targetType={null} onTokenClick={null} />

            <div className="result">
              <div className="pill">
                Current counters value: <b>{currentValue}</b>
              </div>
            </div>

            <div className="answer">
              <label className="label">Your final answer</label>
              <div className="answerRow">
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="input"
                  placeholder="Type the result…"
                />
                <button className="btn primary" onClick={handleCheck}>Check</button>
              </div>
              {feedback && <div className="feedback">{feedback}</div>}
            </div>

            <div className="actions end">
              <button className="btn ghost" onClick={() => setQuestion(generateQuestion())}>
                🔁 New Question
              </button>
              <Link href="/theory/subtract-integers-b6" className="btn link">
                📚 Back to Theory
              </Link>
            </div>
          </div>
        )}
      </div>

      <Link href="/games/subtract-integers-b6" className="comic-link" style={{display:'block',margin:'18px auto',fontSize:'1.3rem',fontWeight:'bold',background:'#7c4dff',color:'#fff',padding:'12px 24px',borderRadius:'12px',boxShadow:'0 2px 8px #7c4dff44'}}>
        🎮 Play the game now
      </Link>

      <style jsx>{`
        .wrap {
          min-height: 100dvh;
          background: radial-gradient(1200px 600px at 10% -10%, #e0f2fe 0%, transparent 40%),
                      radial-gradient(1000px 500px at 100% 0%, #fde68a 0%, transparent 35%),
                      linear-gradient(180deg, #0f172a 0%, #111827 100%);
          display: grid;
          place-items: center;
          padding: 24px;
        }
        .card {
          width: 100%;
          max-width: 900px;
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 20px;
          padding: 20px;
          color: #f8fafc;
          box-shadow: 0 15px 40px rgba(0,0,0,0.35);
        }
        .title {
          margin: 0 0 6px 0;
          font-size: 28px;
          letter-spacing: 0.3px;
          text-shadow: 0 2px 10px rgba(0,0,0,0.35);
        }
        .subtitle {
          margin: 0 0 14px 0;
          color: #cbd5e1;
        }
        .question {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          padding: 10px 14px;
          border-radius: 14px;
          margin-bottom: 14px;
        }
        .badge {
          background: #22d3ee;
          color: #0b1324;
          font-weight: 700;
          padding: 6px 10px;
          border-radius: 999px;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .qtext {
          font-size: 18px;
        }
        .qtext code {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          background: rgba(0,0,0,0.25);
          padding: 4px 8px;
          border-radius: 8px;
          margin-left: 8px;
          font-size: 16px;
        }

        .stage h2 { margin: 8px 0 6px; font-size: 20px; }
        .hint { color: #cbd5e1; margin-top: 8px; }
        .status { margin: 10px 0; color: #e2e8f0; }
        .micro { color: #a7b3c6; font-size: 13px; margin-top: 8px; }

        .actions { display: flex; gap: 10px; margin-top: 10px; flex-wrap: wrap; }
        .actions.end { justify-content: space-between; }

        .btn {
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.08);
          color: #f8fafc;
          padding: 10px 14px;
          border-radius: 12px;
          cursor: pointer;
          transition: transform 0.06s ease, background 0.2s ease, border-color 0.2s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .btn:hover { transform: translateY(-1px); background: rgba(255,255,255,0.12); }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn.primary { background: #34d399; color: #052014; border-color: rgba(0,0,0,0.2); }
        .btn.primary:hover { background: #22c55e; }
        .btn.ghost { background: rgba(255,255,255,0.06); }
        .btn.link { background: transparent; border-color: transparent; color: #93c5fd; }
        .btn.link:hover { text-decoration: underline; }

        .board {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(36px, 1fr));
          gap: 6px;
          background: rgba(0,0,0,0.2);
          border: 1px dashed rgba(255,255,255,0.2);
          border-radius: 14px;
          padding: 12px;
          margin-top: 10px;
          min-height: 72px;
        }

        .token {
          display: grid;
          place-items: center;
          font-size: 26px;
          transition: transform 0.08s ease, filter 0.2s ease;
          user-select: none;
        }
        .token:hover { transform: translateY(-2px) scale(1.02); }
        .token.highlight { animation: pulse 1.2s infinite; }
        @keyframes pulse {
          0% { transform: scale(1); filter: drop-shadow(0 0 0px rgba(255,255,255,0.0)); }
          50% { transform: scale(1.08); filter: drop-shadow(0 0 6px rgba(255,255,255,0.35)); }
          100% { transform: scale(1); filter: drop-shadow(0 0 0px rgba(255,255,255,0.0)); }
        }

        .progress {
          width: 100%;
          height: 10px;
          background: rgba(255,255,255,0.08);
          border-radius: 999px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.12);
          margin-top: 10px;
        }
        .bar {
          height: 100%;
          background: linear-gradient(90deg, #86efac, #22c55e);
          transition: width 0.25s ease;
        }

        .result { margin-top: 10px; }
        .pill {
          display: inline-block;
          background: rgba(20, 184, 166, 0.2);
          border: 1px solid rgba(20, 184, 166, 0.6);
          color: #ccfbf1;
          padding: 6px 10px;
          border-radius: 999px;
        }

        .answer { margin-top: 10px; }
        .label { display: block; margin-bottom: 6px; color: #e2e8f0; }
        .answerRow { display: flex; gap: 8px; flex-wrap: wrap; }
        .input {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.18);
          color: #f8fafc;
          border-radius: 10px;
          padding: 8px 10px;
          min-width: 160px;
          outline: none;
        }
        .feedback { margin-top: 6px; color: #fde68a; }

        .comic-link {
          display: block;
          margin: 18px auto;
          font-size: 1.3rem;
          font-weight: bold;
          background: #7c4dff;
          color: #fff;
          padding: 12px 24px;
          border-radius: 12px;
          box-shadow: 0 2px 8px #7c4dff44;
          text-align: center;
          transition: background 0.3s ease;
        }
        .comic-link:hover {
          background: #6f37c1;
        }
      `}</style>
    </div>
  );
}

function Board({ tokens, targetType, onTokenClick }) {
  return (
    <div className="board">
      {tokens.length === 0 && (
        <span style={{ color: '#94a3b8', gridColumn: '1 / -1', fontStyle: 'italic' }}>
          (No counters here — that itself is a loud, philosophical zero.)
        </span>
      )}
      {tokens.map(t => (
        <Token
          key={t.id}
          type={t.type}
          highlight={targetType ? t.type === targetType : false}
          onClick={onTokenClick ? () => onTokenClick(t.id, t.type) : undefined}
        />
      ))}
    </div>
  );
}
