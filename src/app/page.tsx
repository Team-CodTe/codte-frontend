import { LandingHeader } from '@/features/landing/components/LandingHeader';
import { MemberTable } from '@/features/landing/components/table/MemberTable';
import { ProblemTable } from '@/features/landing/components/table/ProblemTable';
import { SolutionNoteTable } from '@/features/landing/components/table/SolutionNoteTable';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <LandingHeader />
      <div className="container mx-auto max-w-3xl space-y-16 p-4 py-24">
        <ProblemTable />
        <MemberTable />
        <SolutionNoteTable />
      </div>
    </div>
  );
};

export default LandingPage;
