'use client';

import { useEffect, useRef } from 'react';

import { useSocialLoginMutation } from '@/api/auth/postSocialLogin/mutation';
import Loading from '@/app/loading';
import { PATH } from '@/constants/path';
import { handleApiError } from '@/lib/handleApiError';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

const AuthCallbackPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const hasCalledApi = useRef(false);

  const { mutate } = useSocialLoginMutation({
    onSuccess: (data) => {
      if (data.isRegistered) {
        router.replace(PATH.DASHBOARD);
      } else {
        router.replace(PATH.SIGN_UP);
      }
    },
    onError: async (error) => {
      await signOut({ redirect: false });

      handleApiError({
        error,
        defaultMessage: '로그인에 실패했습니다. 다시 시도해주세요.',
        errorMapping: {
          INVALID_ACCESS_TOKEN: (message) => ({ message, type: 'info' }),
        },
      });

      router.replace(PATH.LOGIN);
    },
  });

  const provider = session?.provider;
  const accessToken = session?.accessToken;

  useEffect(() => {
    if (hasCalledApi.current || status === 'loading') {
      return;
    }

    if (status === 'unauthenticated') {
      router.replace(PATH.LOGIN);

      return;
    }

    if (provider && accessToken) {
      hasCalledApi.current = true;

      mutate({
        provider,
        accessToken,
      });
    }
  }, [status, provider, accessToken, router, mutate]);

  return <Loading />;
};

export default AuthCallbackPage;
