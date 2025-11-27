import { LandingHeader } from '@/features/landing/components/LandingHeader';
import { MemberTable } from '@/features/landing/components/table/MemberTable';
import { ProblemTable } from '@/features/landing/components/table/ProblemTable';
import { SolutionNoteTable } from '@/features/landing/components/table/SolutionNoteTable';

const LandingPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center lg:h-screen lg:overflow-hidden">
      <LandingHeader />
      <main className="grid min-h-0 w-full flex-1 grid-cols-1 gap-8 p-5 lg:max-w-4/5 lg:grid-cols-2 lg:grid-rows-1 lg:py-6">
        <div className="flex min-h-0 flex-col gap-8 lg:h-full">
          <ProblemTable />
          <MemberTable />
        </div>

        <div className="h-full min-h-0">
          <SolutionNoteTable />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
