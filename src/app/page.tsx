import { LandingHeader } from '@/features/ladning/components/LandingHeader';
import { MemberTable } from '@/features/ladning/components/MemberTable';
import { ProblemTable } from '@/features/ladning/components/ProblemTable';
import { SolutionNoteTable } from '@/features/ladning/components/SolutionNoteTable';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <LandingHeader />
      <div className="container mx-auto max-w-3xl space-y-15 p-5 py-24">
        <ProblemTable />
        <MemberTable />
        <SolutionNoteTable />
      </div>
    </div>
  );
};

export default LandingPage;
