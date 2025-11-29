'use client';

import { useEffect } from 'react';

import { useSession } from 'next-auth/react';

export const AuthTestLogger = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      console.log('✅ 로그인 성공!');
      console.log('👤 유저 정보:', session?.user);
      console.log('🔑 액세스 토큰:', session?.accessToken);
    } else if (status === 'unauthenticated') {
      console.log('❌ 로그인되지 않음');
    }
  }, [session, status]);

  return null;
};
