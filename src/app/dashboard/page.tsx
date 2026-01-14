import { DashboardHeader } from '@/features/dashboard/components/DashboardHeader';
import { StudiesSection } from '@/features/dashboard/components/StudiesSection';
import { DashboardTitleSuspense } from '@/features/dashboard/suspenses/DashboardTitleSuspense';

const DashboardPage = () => {
  return (
    <div className="flex w-screen flex-col items-center">
      <DashboardHeader />

      <main className="flex w-full flex-col items-start gap-8 p-5 pt-4 pb-8 md:max-w-2xl md:gap-16 md:px-0 md:pt-4 md:pb-16">
        <DashboardTitleSuspense />
        <StudiesSection />
      </main>
    </div>
  );
};

export default DashboardPage;
