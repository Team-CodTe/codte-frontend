'use client';

import { useEffect, useRef } from 'react';

import { useSocialLoginMutation } from '@/api/auth/postSocialLogin/mutation';
import Loading from '@/app/loading';
import { PATH } from '@/constants/path';
import { FetchError } from '@/lib/fetchInstance';
import { showToast } from '@/lib/showToast';
import { type ApiErrorData } from '@/types/apiErrorData';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

const AuthCallbackPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const hasCalledApi = useRef(false);

  const { mutate: mutateSocialLogin } = useSocialLoginMutation({
    onSuccess: (data) => {
      if (data.isRegistered) {
        router.replace(PATH.DASHBOARD);
      } else {
        router.replace(PATH.SIGN_UP);
      }
    },
    onError: async (error) => {
      console.error('❌ 로그인 API 호출 실패', error);

      let toastMessage = '로그인에 실패했습니다. 다시 시도해주세요.';
      let toastType: 'error' | 'info' = 'error';

      if (error instanceof FetchError) {
        const { errorCode, message } = (error.data as ApiErrorData) || {};

        if (errorCode === 'INVALID_ACCESS_TOKEN' && message) {
          toastMessage = message;
          toastType = 'info';
        }
      }

      showToast({
        message: toastMessage,
        type: toastType,
      });

      await signOut({ redirect: false });

      router.replace(PATH.LOGIN);
    },
  });

  useEffect(() => {
    if (hasCalledApi.current || status === 'loading') {
      return;
    }

    if (status === 'unauthenticated') {
      router.replace(PATH.LOGIN);

      return;
    }

    if (session?.provider && session?.accessToken) {
      hasCalledApi.current = true;

      mutateSocialLogin({
        provider: session.provider,
        accessToken: session.accessToken,
      });
    }
  }, [status, session, router, mutateSocialLogin, hasCalledApi]);

  return <Loading />;
};

export default AuthCallbackPage;
