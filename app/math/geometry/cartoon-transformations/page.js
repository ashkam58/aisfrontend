import GradeNineGeometryGame from '../../../../components/GradeNineGeometryGame';
import RigidMotionTheory from '../../../../components/RigidMotionTheory';
import RigidMotionQuiz from '../../../../components/RigidMotionQuiz';

export const metadata = {
  title: 'Rigid Motion Rescue Game',
  description: 'Cartoon themed grade 9 geometry game covering rotations, translations, and dilations.',
};

export default function CartoonTransformationsPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-purple-200 bg-white/80 p-6 text-center shadow">
        <p className="text-xs uppercase tracking-wide text-purple-600">Geometry Lab</p>
        <h1 className="text-4xl font-black text-purple-900">Cartoon Transformations Playground</h1>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-purple-700">
          Rotate, translate, and dilate vibrant shapes while guiding the Prism Patrol through a set of grade 9 challenges.
          Match the glowing outline in each mission to prove the figures are congruent or similar.
        </p>
      </div>
      <GradeNineGeometryGame />
      <div className="grid gap-6 lg:grid-cols-2">
        <RigidMotionTheory />
        <RigidMotionQuiz />
      </div>
    </div>
  );
}
