'use client';

import { type GetStudyDetailResponse } from '@/api/study/getStudyDetail/type';
import { AppLogo } from '@/components/logos/AppLogo';
import { Button } from '@/components/ui/Button';
import { PATH } from '@/constants/path';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { SettingsIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { DropdownAvatar } from '../DropdownAvatar';

type Props = {
  study: GetStudyDetailResponse;
};

export const StudyMainHeader = ({ study }: Props) => {
  const router = useRouter();

  const onClickSetting = () => {
    router.push(
      buildUrlWithParams({
        url: PATH.STUDY.SETTING,
        pathParams: { studyId: study.id },
      }),
    );
  };

  return (
    <header className="bg-background sticky top-0 z-50 flex h-16 w-full items-center justify-between px-5 lg:px-8">
      <Link href={PATH.STUDY.HOME} replace>
        <AppLogo className="h-8 w-auto" />
      </Link>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <span className="hidden font-medium sm:block">{study.name}</span>
      </div>

      <div className="flex flex-row items-center gap-2">
        <Button variant="outline" size="sm" onClick={onClickSetting}>
          <SettingsIcon />
          <span className="hidden sm:inline">스터디 정보</span>
        </Button>

        <DropdownAvatar />
      </div>
    </header>
  );
};
