import { useCallback, useState } from 'react';

import { type SocialProvider } from '@/types/socialProvider';
import { signIn, signOut, useSession } from 'next-auth/react';

export const useAuth = () => {
  const { data: session, status } = useSession();
  const [loadingProvider, setLoadingProvider] = useState<SocialProvider | null>(
    null,
  );
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const login = useCallback(async (provider: SocialProvider) => {
    try {
      setLoadingProvider(provider);

      await signIn(provider, { callbackUrl: '/sign-up' });

      /** @todo 로그인이후 JWT 토큰 발급 API 호출 필요 */
    } catch (err) {
      console.error('로그인 실패', err);
      setLoadingProvider(null);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setIsLoggingOut(true);

      await signOut({ callbackUrl: '/' });

      /** @todo 로그아웃 API 호출 필요 */
    } catch (err) {
      console.error('로그아웃 실패', err);
      setIsLoggingOut(false);
    }
  }, []);

  return {
    session,
    isAuthenticated: status === 'authenticated',
    isSessionLoading: status === 'loading',
    loadingProvider,
    isLoggingOut,
    login,
    logout,
  };
};
