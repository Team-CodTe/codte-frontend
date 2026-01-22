import { getMyProfile } from '@/api/user/getMyProfile/fetch';
import { Separator } from '@/components/ui/Separator';
import { DashboardHeader } from '@/features/dashboard/components/DashboardHeader';
import { ProfileDeleteRow } from '@/features/profile/components/ProfileDeleteRow';
import { formatDate } from '@/lib/formatFunc';

const ProfilePage = async () => {
  const profile = await getMyProfile();

  return (
    <div className="flex min-h-screen w-screen flex-col items-center">
      <DashboardHeader />

      <main className="flex w-full flex-col items-start gap-8 p-5 pt-4 pb-8 md:mx-5 md:max-w-3xl md:gap-16 md:px-0 md:pt-4 md:pb-16">
        <div className="flex w-full flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex flex-row items-end justify-between">
              <h2 className="text-xl font-bold">내 프로필</h2>
              <div className="text-muted-foreground text-sm">
                가입일: {formatDate(profile.createdAt, { includeTime: false })}
              </div>
            </div>

            <Separator />
          </div>

          {/** 프로필 섹션 */}
        </div>

        <div className="flex w-full flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-bold">중요 설정</h2>
            <Separator />
          </div>
          <ProfileDeleteRow />
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
