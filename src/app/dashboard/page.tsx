import { DashboardHeader } from '@/features/dashboard/components/DashboardHeader';
import { StatisticsSection } from '@/features/dashboard/components/StatisticsSection';
import { StudiesSection } from '@/features/dashboard/components/StudiesSection';
import { DashboardTitleSuspense } from '@/features/dashboard/suspenses/DashboardTitleSuspense';
import { safeParseInt } from '@/lib/parseParam';

type Props = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

const DashboardPage = async ({ searchParams }: Props) => {
  const studyId = safeParseInt((await searchParams).studyId);

  return (
    <div className="flex min-h-screen w-screen flex-col items-center">
      <DashboardHeader />

      <main className="flex w-full flex-col items-start gap-8 p-5 pt-4 pb-8 md:mx-5 md:max-w-3xl md:gap-16 md:px-0 md:pt-4 md:pb-16">
        <DashboardTitleSuspense />
        <StudiesSection />
        <StatisticsSection studyId={studyId} />
      </main>
    </div>
  );
};

export default DashboardPage;
