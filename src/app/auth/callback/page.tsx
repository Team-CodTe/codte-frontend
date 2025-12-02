'use client';

import { useEffect, useRef } from 'react';

import { useSocialLoginMutation } from '@/api/auth/postSocialLogin/mutation';
import Loading from '@/app/loading';
import { showToast } from '@/lib/showToast';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

type ApiErrorResponse = {
  error: {
    code: string;
    message: string;
  };
};

const AuthCallbackPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const hasCalledApi = useRef(false);

  const socialLoginMutation = useSocialLoginMutation({
    onSuccess: (data) => {
      if (data.requiresRegistration) {
        router.replace('/sign-up');
      } else {
        router.replace('/welcome');
      }
    },
    onError: (error) => {
      console.error('❌ 로그인 API 호출 실패', error);

      if (isAxiosError<ApiErrorResponse>(error)) {
        const errorCode = error.response?.data?.error?.code;
        const errorMessage = error.response?.data?.error?.message;

        if (errorCode === 'INVALID_ACCESS_TOKEN' && errorMessage) {
          showToast({
            message: errorMessage,
            type: 'info',
          });
        }
      } else {
        showToast({
          message: '로그인에 실패했습니다. 다시 시도해주세요.',
          type: 'error',
        });
      }

      signOut({ redirect: false });

      router.replace('/login');
    },
  });

  useEffect(() => {
    if (hasCalledApi.current || status === 'loading') {
      return;
    }

    if (status === 'unauthenticated') {
      router.replace('/login');

      return;
    }

    if (session?.provider && session?.accessToken) {
      hasCalledApi.current = true;

      socialLoginMutation.mutate({
        provider: session.provider,
        accessToken: session.accessToken,
      });
    }
  }, [status, session, router, socialLoginMutation, hasCalledApi]);

  return <Loading />;
};

export default AuthCallbackPage;
