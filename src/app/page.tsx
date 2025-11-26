import { BojProblemTable } from '@/features/ladning/components/BojProblemTable';
import { LandingHeader } from '@/features/ladning/components/LandingHeader';
import { MemberSolvingStatusTable } from '@/features/ladning/components/MemberSolvingStatusTable';
import { SolutionNoteTable } from '@/features/ladning/components/SolutionNoteTable';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <LandingHeader />
      <main className="container mx-auto max-w-3xl space-y-15 p-5 py-24">
        <BojProblemTable />
        <MemberSolvingStatusTable />
        <SolutionNoteTable />
      </main>
    </div>
  );
};

export default LandingPage;
