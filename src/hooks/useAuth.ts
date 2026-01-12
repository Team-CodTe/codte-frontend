import { useState } from 'react';

import { useLogoutMutation } from '@/api/auth/postLogout/mutation';
import { PATH } from '@/constants/path';
import { showToast } from '@/lib/showToast';
import { type SocialProvider } from '@/types/socialProvider';
import { signIn, signOut, useSession } from 'next-auth/react';

export const useAuth = () => {
  const { data: session, update: updateSession } = useSession();
  const [loadingProvider, setLoadingProvider] = useState<SocialProvider | null>(
    null,
  );

  const handleLogin = async (provider: SocialProvider) => {
    try {
      setLoadingProvider(provider);

      await signIn(provider, { callbackUrl: PATH.AUTH_CALLBACK });
    } catch (err) {
      console.error('❌ 로그인 실패', err);

      showToast({
        message: '로그인 페이지로 이동할 수 없습니다.',
        type: 'error',
      });

      setLoadingProvider(null);
    }
  };

  const { mutate: mutateLogout, isPending: isLoggingOut } = useLogoutMutation({
    onSuccess: async () => {
      await signOut({ callbackUrl: PATH.LANDING });
    },
    onError: (error) => {
      console.error('❌ 로그아웃 API 호출 실패', error);

      showToast({
        message: '로그아웃에 실패했습니다. 다시 시도해주세요.',
        type: 'error',
      });
    },
  });

  const handleLogout = async () => {
    if (isLoggingOut) {
      return;
    }

    mutateLogout();
  };

  return {
    session,
    loadingProvider,
    isLoggingOut,
    handleLogin,
    handleLogout,
    updateSession,
  };
};
