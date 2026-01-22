import { getMyProfile } from '@/api/user/getMyProfile/fetch';
import { DashboardHeader } from '@/features/dashboard/components/DashboardHeader';
import { MyProfileSection } from '@/features/profile/components/MyProfileSection';
import { ProfileDangerZoneSection } from '@/features/profile/components/ProfileDangerZoneSection';

const ProfilePage = async () => {
  const profile = await getMyProfile();

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
