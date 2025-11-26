import { BojProblemTable } from '@/features/ladning/components/BojProblemTable';
import { LandingHeader } from '@/features/ladning/components/LandingHeader';
import { MemberSolvingStatusTable } from '@/features/ladning/components/MemberSolvingStatusTable';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <LandingHeader />
      <main className="container mx-auto max-w-3xl space-y-20 p-5 py-24">
        <BojProblemTable />
        <MemberSolvingStatusTable />
      </main>
    </div>
  );
};

export default LandingPage;
