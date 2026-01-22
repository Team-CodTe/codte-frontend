import { useTransition } from 'react';

import { useDeleteMyProfileMutation } from '@/api/user/deleteMyProfile/mutation';
import { useMyProfileSuspenseQuery } from '@/api/user/getMyProfile/query';
import { PATH } from '@/constants/path';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { handleApiError } from '@/lib/handleApiError';
import { useRouter } from 'next/navigation';

export const useDeleteProfile = () => {
  const router = useRouter();
  const [isNavigating, startTransition] = useTransition();
  const { data: profile } = useMyProfileSuspenseQuery();

  const { mutate, isPending } = useDeleteMyProfileMutation({
    onSuccess: () => {
      const goodbyePath = buildUrlWithParams({
        url: PATH.GOODBYE,
        queryParams: { username: profile?.username },
      });

      startTransition(() => {
        router.replace(goodbyePath);
      });
    },
    onError: (error) => {
      handleApiError({
        error,
        defaultMessage: '오류가 발생했습니다. 다시 시도해주세요.',
        errorMapping: {
          STUDY_OWNER_CANNOT_DELETE: (message) => ({ message }),
        },
      });
    },
  });

  const isDeleting = isPending || isNavigating;

  const handleDeleteProfile = () => {
    if (isDeleting) {
      return;
    }

    mutate();
  };

  return { handleDeleteProfile, isDeleting };
};
