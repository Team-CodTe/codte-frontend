'use client';

import { HintTooltip } from '@/components/common/HintTooltip';
import { AppLogo } from '@/components/logos/AppLogo';
import { Button } from '@/components/ui/Button';
import { PATH } from '@/constants/path';
import { showToast } from '@/lib/showToast';
import { ClipboardIcon, EllipsisIcon } from 'lucide-react';
import Link from 'next/link';

import { DropdownAvatar } from '../DropdownAvatar';

type Props = {
  studyName: string;
  inviteCode: string;
};

export const StudyMainHeader = ({ studyName, inviteCode }: Props) => {
  const handleCopyInviteCode = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode);

      showToast({ message: '초대 코드가 복사되었습니다.', type: 'success' });
    } catch {
      showToast({ message: '초대 코드 복사에 실패했습니다.', type: 'error' });
    }
  };

  return (
    <header className="relative flex h-16 w-full items-center justify-between px-5 py-4 lg:px-6">
      <Link href={PATH.STUDY.HOME} replace>
        <AppLogo className="h-8 w-auto" />
      </Link>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <span className="hidden font-medium sm:block">{studyName}</span>
      </div>

      <div className="flex gap-2">
        <HintTooltip content="초대 코드 복사">
          <Button
            variant="outline"
            size="icon-sm"
            onClick={handleCopyInviteCode}>
            <ClipboardIcon />
          </Button>
        </HintTooltip>
        <HintTooltip content="스터디 정보">
          <Button variant="outline" size="icon-sm">
            <EllipsisIcon />
          </Button>
        </HintTooltip>

        <DropdownAvatar />
      </div>
    </header>
  );
};
