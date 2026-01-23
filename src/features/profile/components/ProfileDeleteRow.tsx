'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/AlertDialog';
import { Button } from '@/components/ui/Button';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/Field';
import { Spinner } from '@/components/ui/Spinner';

import { useDeleteProfile } from '../hooks/useDeleteProfile';

export const ProfileDeleteRow = () => {
  const { handleDeleteProfile, isDeleting } = useDeleteProfile();

  return (
    <FieldGroup>
      <Field orientation="responsive">
        <FieldContent>
          <FieldLabel>서비스 회원 탈퇴</FieldLabel>
          <FieldDescription>
            계정과 관련된 모든 개인 정보와 활동 기록이 삭제됩니다.
          </FieldDescription>
        </FieldContent>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full md:w-auto">
              회원 탈퇴
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>정말 탈퇴하시겠습니까?</AlertDialogTitle>
              <AlertDialogDescription>
                탈퇴 시 작성하신 스터디 기록과 개인 정보는 모두 삭제되며
                <span className="text-destructive font-semibold">
                  {' '}
                  복구할 수 없습니다.
                </span>
                <br />
                재가입은 가능하지만,{' '}
                <span className="font-semibold">
                  잦은 탈퇴와 가입 반복 시 서비스 이용이 제한
                </span>
                될 수 있음을 알려드립니다.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>취소</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                onClick={handleDeleteProfile}
                disabled={isDeleting}>
                {isDeleting ? <Spinner /> : null}
                {isDeleting ? '탈퇴 처리 중...' : '탈퇴하기'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Field>
    </FieldGroup>
  );
};
