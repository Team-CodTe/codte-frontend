'use client';

import { useEffect } from 'react';

import { usePostSocialLoginMutation } from '@/api/auth/postSocialLogin/mutation';
import { showToast } from '@/lib/showToast';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

const AuthCallbackPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const socialLoginMutation = usePostSocialLoginMutation({
    onSuccess: (data) => {
      if (data.requires_registration) {
        router.replace('/sign-up');
      } else {
        router.replace('/welcome');
      }
    },
    onError: (error) => {
      console.error('❌ 로그인 API 호출 실패', error);

      showToast({
        message: '로그인에 실패했습니다. 다시 시도해주세요.',
        type: 'error',
      });

      signOut({ redirect: false });

      router.replace('/login');
    },
  });

  useEffect(() => {
    if (status === 'loading') {
      return;
    }

    if (status === 'unauthenticated') {
      router.replace('/login');

      return;
    }

    if (session?.provider && session?.accessToken) {
      socialLoginMutation.mutate({
        provider: session.provider,
        access_token: session.accessToken,
      });
    }
  }, [status, session, router, socialLoginMutation]);

  return null;
};

export default AuthCallbackPage;
