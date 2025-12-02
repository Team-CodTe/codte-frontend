'use client';

import { useEffect, useRef } from 'react';

import { useSocialLoginMutation } from '@/api/auth/postSocialLogin/mutation';
import { Spinner } from '@/components/ui/Spinner';
import { showToast } from '@/lib/showToast';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

const AuthCallbackPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const hasCalledApi = useRef(false);

  const socialLoginMutation = useSocialLoginMutation({
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
        access_token: session.accessToken,
      });
    }
  }, [status, session, router, socialLoginMutation, hasCalledApi]);

  return (
    <div className="flex min-h-screen w-screen items-center justify-center">
      <Spinner className="text-muted-foreground size-6" />
    </div>
  );
};

export default AuthCallbackPage;
