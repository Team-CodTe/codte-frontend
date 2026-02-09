import { getMyProfile } from '@/api/user/getMyProfile/fetch';
import { PATH } from '@/constants/path';
import { DashboardHeader } from '@/features/dashboard/components/DashboardHeader';
import { MyProfileSection } from '@/features/profile/components/MyProfileSection';
import { ProfileDangerZoneSection } from '@/features/profile/components/ProfileDangerZoneSection';
import { FetchError } from '@/lib/fetchInstance';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

const ProfilePage = async () => {
  let profile;

  try {
    profile = await getMyProfile();
  } catch (error) {
    if (error instanceof FetchError && error.status === 401) {
      redirect(PATH.LOGIN);
    }

    throw error;
  }

  return (
    <div className="flex min-h-screen w-screen flex-col items-center">
      <DashboardHeader />
      <main className="flex w-full flex-col items-start gap-8 p-5 pt-4 pb-8 md:mx-5 md:max-w-3xl md:gap-16 md:px-0 md:pt-4 md:pb-16">
        <MyProfileSection profile={profile} />
        <ProfileDangerZoneSection />
      </main>
    </div>
  );
};

export default ProfilePage;
