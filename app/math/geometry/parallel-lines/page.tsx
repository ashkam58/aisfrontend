'use client';

import React, { useState, useEffect, useRef } from 'react';

// Utility functions
const normalizeAngle = (angle: number) => ((angle % 360) + 360) % 360;
const supplement = (angle: number) => 180 - angle;
const anglesEqual = (a: number, b: number, tolerance = 1) => Math.abs(a - b) < tolerance;

// Mock shadcn/ui components (replace with actual imports if available)
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white border rounded-lg shadow-md p-4 ${className}`}>{children}</div>
);

const Button = ({ children, onClick, className = '', variant = 'default' }: { children: React.ReactNode; onClick?: () => void; className?: string; variant?: string }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md font-medium transition-colors ${
      variant === 'outline' ? 'border border-gray-300 hover:bg-gray-50' : 'bg-blue-500 text-white hover:bg-blue-600'
    } ${className}`}
  >
    {children}
  </button>
);

const Tabs = ({ children }: { children: React.ReactNode }) => <div className="space-y-4">{children}</div>;
const TabsContent = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
const Accordion = ({ children }: { children: React.ReactNode }) => <div className="space-y-2">{children}</div>;
const AccordionItem = ({ children }: { children: React.ReactNode }) => <div className="border rounded">{children}</div>;
const AccordionTrigger = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <button onClick={onClick} className="w-full text-left p-4 font-medium hover:bg-gray-50">{children}</button>
);
const AccordionContent = ({ children }: { children: React.ReactNode }) => <div className="p-4 pt-0">{children}</div>;

// Interactive Components
interface DragTransversalPlaygroundProps {
  initialSlope: number;
  lineGap: number;
  showLabels: boolean;
  lockedParallel: boolean;
}

const DragTransversalPlayground: React.FC<DragTransversalPlaygroundProps> = ({
  initialSlope,
  lineGap,
  showLabels,
  lockedParallel
}) => {
  const [transversalSlope, setTransversalSlope] = useState(initialSlope);
  const [isDragging, setIsDragging] = useState(false);

  // Simplified angle calculation
  const angles = {
    corresponding: 45,
    alternateInterior: 45,
    coInterior: 135
  };

  return (
    <Card className="w-full max-w-2xl">
      <h3 className="text-lg font-bold mb-4">Drag Transversal Playground</h3>
      <div className="relative h-64 bg-gray-50 rounded border">
        <svg className="w-full h-full" viewBox="0 0 400 200">
          {/* Parallel lines */}
          <line x1="50" y1="50" x2="350" y2="50" stroke="blue" strokeWidth="2" />
          <line x1="50" y1="150" x2="350" y2="150" stroke="blue" strokeWidth="2" />
          
          {/* Transversal */}
          <line x1="100" y1="0" x2="300" y2="200" stroke="red" strokeWidth="2" />
          
          {/* Angle arcs */}
          <path d="M 100 50 A 20 20 0 0 1 120 70" fill="none" stroke="green" strokeWidth="2" />
          <text x="110" y="60" fontSize="12" fill="green">∠1</text>
        </svg>
      </div>
      <div className="mt-4 space-y-2">
        <p>Corresponding Angles: {angles.corresponding}°</p>
        <p>Alternate Interior: {angles.alternateInterior}°</p>
        <p>Co-Interior Sum: {angles.coInterior}°</p>
      </div>
    </Card>
  );
};

interface AngleFamilyInspectorProps {
  mode: 'practice' | 'exam';
  parallel: boolean;
}

const AngleFamilyInspector: React.FC<AngleFamilyInspectorProps> = ({ mode, parallel }) => {
  const [selectedAngles, setSelectedAngles] = useState<number[]>([]);
  const [relation, setRelation] = useState('');

  const handleAngleClick = (angleId: number) => {
    if (selectedAngles.includes(angleId)) {
      setSelectedAngles(selectedAngles.filter(id => id !== angleId));
    } else if (selectedAngles.length < 2) {
      setSelectedAngles([...selectedAngles, angleId]);
    }
  };

  useEffect(() => {
    if (selectedAngles.length === 2) {
      // Simplified relation detection
      setRelation('Alternate Interior — Equal when parallel');
    }
  }, [selectedAngles]);

  return (
    <Card className="w-full max-w-2xl">
      <h3 className="text-lg font-bold mb-4">Angle Family Inspector</h3>
      <div className="relative h-64 bg-gray-50 rounded border">
        <svg className="w-full h-full" viewBox="0 0 400 200">
          {/* Parallel lines */}
          <line x1="50" y1="50" x2="350" y2="50" stroke="blue" strokeWidth="2" />
          <line x1="50" y1="150" x2="350" y2="150" stroke="blue" strokeWidth="2" />
          <line x1="200" y1="0" x2="200" y2="200" stroke="red" strokeWidth="2" />
          
          {/* Angle markers */}
          {[1,2,3,4,5,6,7,8].map(id => (
            <circle
              key={id}
              cx={150 + (id % 4) * 50}
              cy={50 + Math.floor(id / 4) * 100}
              r="15"
              fill={selectedAngles.includes(id) ? 'yellow' : 'white'}
              stroke="black"
              onClick={() => handleAngleClick(id)}
              className="cursor-pointer"
            />
          ))}
        </svg>
      </div>
      {relation && <p className="mt-4 text-center font-medium">{relation}</p>}
    </Card>
  );
};

interface ParallelismTesterProps {
  randomize: boolean;
  acceptTolerance: number;
}

const ParallelismTester: React.FC<ParallelismTesterProps> = ({ randomize, acceptTolerance }) => {
  const [angles, setAngles] = useState({ A: 45, B: 45, C: 135, D: 45 });
  const [result, setResult] = useState('');

  const testParallel = () => {
    if (angles.A === angles.B) {
      setResult('Parallel (by Corresponding)');
    } else if (angles.A + angles.C === 180) {
      setResult('Parallel (by Co-Interior)');
    } else {
      setResult('Not guaranteed');
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <h3 className="text-lg font-bold mb-4">Parallelism Tester</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {Object.entries(angles).map(([key, value]) => (
          <div key={key}>
            <label className="block text-sm font-medium">∠{key}</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setAngles({...angles, [key]: Number(e.target.value)})}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
      </div>
      <Button onClick={testParallel}>Test Parallel?</Button>
      {result && <p className="mt-4 text-center font-medium">{result}</p>}
    </Card>
  );
};

// Main Component
const ParallelLinesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('theory');
  const [quizScore, setQuizScore] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Parallel Lines — Always Equidistant, Forever Apart
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Transversals cut across; angles begin to rhyme.
          </p>
          <div className="flex justify-center gap-4">
            <Button>Try a Drag-Transversal</Button>
            <Button variant="outline">Angle-Chase Lab</Button>
            <Button variant="outline">Proof Trainer</Button>
          </div>
        </div>

        {/* Concept Warm-Up */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Concept Warm-Up</h2>
          <div className="space-y-4">
            <p><strong>Definition:</strong> Two lines are parallel if they never meet; through a point not on a line, exactly one parallel exists.</p>
            <p><strong>Transversal:</strong> A line intersecting two or more others.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Angle Types:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Corresponding — Equal when parallel</li>
                  <li>Alternate Interior — Equal</li>
                  <li>Alternate Exterior — Equal</li>
                  <li>Co-Interior — Sum to 180°</li>
                  <li>Vertically Opposite — Always equal</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Converse Tests:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Equal corresponding → Parallel</li>
                  <li>Equal alternate interior → Parallel</li>
                  <li>Co-interior sum 180° → Parallel</li>
                </ul>
              </div>
            </div>
            <div className="bg-yellow-100 p-4 rounded">
              <h3 className="font-semibold">Mnemonics:</h3>
              <p>"C" for Corresponding (Corners match) → Equal</p>
              <p>"Z" for Alternate (zig-zag "Z") → Equal</p>
              <p>"U" for Co-Interior (arches like "U") → Add to 180°</p>
            </div>
          </div>
        </Card>

        {/* Euclid-Lite Proofs */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Euclid-Lite Proofs</h2>
          <Accordion>
            <AccordionItem>
              <AccordionTrigger>Why corresponding angles equal if parallel?</AccordionTrigger>
              <AccordionContent>
                <p>Use Parallel Postulate: Draw auxiliary line parallel to one line through intersection point.</p>
                <svg className="w-full h-32" viewBox="0 0 300 100">
                  <line x1="50" y1="30" x2="250" y2="30" stroke="blue" />
                  <line x1="50" y1="70" x2="250" y2="70" stroke="blue" />
                  <line x1="150" y1="10" x2="150" y2="90" stroke="red" />
                  <text x="140" y="25" fontSize="12">∠1</text>
                  <text x="160" y="75" fontSize="12">∠2</text>
                </svg>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

        {/* Interactive Components */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <DragTransversalPlayground initialSlope={0.5} lineGap={100} showLabels={true} lockedParallel={true} />
          <AngleFamilyInspector mode="practice" parallel={true} />
          <ParallelismTester randomize={false} acceptTolerance={1} />
        </div>

        {/* Practice & Assessment */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Practice Drills</h2>
          <div className="space-y-4">
            <div>
              <p className="font-medium">Identify: Which pair is alternate interior?</p>
              <div className="flex gap-2 mt-2">
                <Button variant="outline">∠1 and ∠3</Button>
                <Button variant="outline">∠2 and ∠4</Button>
                <Button>∠1 and ∠4</Button>
              </div>
            </div>
            <div>
              <p className="font-medium">Decide Parallel: If ∠A = ∠B, are lines parallel?</p>
              <div className="flex gap-2 mt-2">
                <Button>Yes (Corresponding)</Button>
                <Button variant="outline">No</Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Cheat Sheets */}
        <Tabs>
          <TabsContent>
            <Card>
              <h2 className="text-2xl font-bold mb-4">Rules at a Glance</h2>
              <ul className="space-y-2">
                <li>Corresponding =, Alternate Interior =, Alternate Exterior =, Co-Interior sum 180°</li>
                <li>Vertically Opposite always equal</li>
              </ul>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ParallelLinesPage;
