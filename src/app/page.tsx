import { BojProblemTable } from '@/features/ladning/components/BojProblemTable';
import { LandingHeader } from '@/features/ladning/components/LandingHeader';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <LandingHeader />
      <main className="container mx-auto max-w-5xl space-y-20 p-5 py-24">
        <BojProblemTable />
      </main>
    </div>
  );
};

export default LandingPage;
