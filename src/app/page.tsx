import { LandingHeader } from '@/features/landing/components/LandingHeader';
import { DailyAssignmentSection } from '@/features/landing/components/section/daily-assignment/DailyAssignmentSection';
import { MemberSection } from '@/features/landing/components/section/member/MemberSection';
import { SolutionNoteSection } from '@/features/landing/components/section/solution-note/SolutionNoteSection';

const LandingPage = () => {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center lg:h-screen lg:overflow-hidden">
      <LandingHeader />
      <main className="grid min-h-0 w-full flex-1 grid-cols-1 gap-8 p-5 lg:max-w-4/5 lg:grid-cols-2 lg:grid-rows-1 lg:py-6">
        <div className="flex min-h-0 flex-col gap-8 lg:h-full">
          <DailyAssignmentSection />
          <MemberSection />
        </div>

        <div className="h-full min-h-0">
          <SolutionNoteSection />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
