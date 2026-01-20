'use client';

import { useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/AlertDialog';
import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Spinner } from '@/components/ui/Spinner';
import { useKickMember } from '@/features/study/hooks/member/useKickMember';
import { useTransferOwner } from '@/features/study/hooks/member/useTransferOwner';
import { MoreHorizontalIcon } from 'lucide-react';

const DIALOG_TYPE = {
  TRANSFER: 'transfer',
  KICK: 'kick',
} as const;

type DialogType = (typeof DIALOG_TYPE)[keyof typeof DIALOG_TYPE];

type Props = {
  memberId: number;
  memberName: string;
};

export const MemberActionCell = ({ memberId, memberName }: Props) => {
  const [dialogType, setDialogType] = useState<DialogType | null>(null);
  const { handleTransferOwner, isTransferring } = useTransferOwner({
    memberName,
    memberId,
  });
  const { handleKickMember, isKicking } = useKickMember({
    memberName,
    memberId,
  });

  const handleCloseDialog = () => setDialogType(null);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm">
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onSelect={() => setDialogType(DIALOG_TYPE.TRANSFER)}>
            스터디장 위임
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            variant="destructive"
            onSelect={() => setDialogType(DIALOG_TYPE.KICK)}>
            내보내기
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        open={dialogType === DIALOG_TYPE.TRANSFER}
        onOpenChange={(open) => !open && handleCloseDialog()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {memberName}님에게 스터디장을 위임하시겠습니까?
            </AlertDialogTitle>
            <AlertDialogDescription>
              <span className="font-semibold">
                {memberName}님이 새로운 스터디장
              </span>
              이 되며,{' '}
              <span className="font-semibold">본인은 일반 멤버로 전환</span>되어
              관리 권한이 사라집니다.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleTransferOwner();
                handleCloseDialog();
              }}
              disabled={isTransferring}>
              {isTransferring ? <Spinner className="mr-2" /> : null}
              {isTransferring ? '위임하는 중...' : '위임하기'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={dialogType === DIALOG_TYPE.KICK}
        onOpenChange={(open) => !open && handleCloseDialog()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {memberName}님을 내보내시겠습니까?
            </AlertDialogTitle>
            <AlertDialogDescription>
              <span className="text-destructive font-semibold">
                {memberName}님은 즉시 스터디에서 제외
              </span>
              되며, 다시 가입하기 전에는 스터디에 접근할 수 없게 됩니다.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={isKicking}
              onClick={() => {
                handleKickMember();
                handleCloseDialog();
              }}>
              {isKicking ? <Spinner className="mr-2" /> : null}
              {isKicking ? '내보내는 중...' : '내보내기'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
