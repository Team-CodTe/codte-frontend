'use client';

import { useEffect, useRef } from 'react';

import { useSocialLoginMutation } from '@/api/auth/postSocialLogin/mutation';
import Loading from '@/app/loading';
import { FetchError } from '@/lib/fetchInstance';
import { showToast } from '@/lib/showToast';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

type ApiErrorData = {
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
      router.refresh();

      if (data.isRegistered) {
        router.replace('/welcome');
      } else {
        router.replace('/sign-up');
      }
    },
    onError: async (error) => {
      console.error('❌ 로그인 API 호출 실패', error);

      if (error instanceof FetchError) {
        const data = error.data as ApiErrorData | null;
        const errorCode = data?.error?.code;
        const errorMessage = data?.error?.message;

        if (errorCode === 'INVALID_ACCESS_TOKEN' && errorMessage) {
          showToast({
            message: errorMessage,
            type: 'info',
          });
        } else {
          showToast({
            message: '로그인에 실패했습니다. 다시 시도해주세요.',
            type: 'error',
          });
        }
      } else {
        showToast({
          message: '로그인에 실패했습니다. 다시 시도해주세요.',
          type: 'error',
        });
      }

      await signOut({ redirect: false });

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
