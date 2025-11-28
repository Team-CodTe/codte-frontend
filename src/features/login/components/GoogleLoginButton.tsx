'use client';

import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/Button';
import { Roboto } from 'next/font/google';

const robotoMedium = Roboto({
  weight: '500',
});

export const GoogleLoginButton = () => {
  return (
    <Button
      variant="secondary"
      className={robotoMedium.className}
      onClick={() => {
        console.log('Login with Google');
      }}>
      <FcGoogle />
      Google 계정으로 로그인
    </Button>
  );
};
