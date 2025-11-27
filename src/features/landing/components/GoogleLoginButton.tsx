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
      className={`${robotoMedium.className} bg-[#F2F2F2] text-[#1F1F1F] hover:bg-[#F2F2F2]/70 dark:border-[#8E918F] dark:bg-[#131314]/70 dark:text-[#E3E3E3] dark:hover:bg-[#131314]`}>
      <FcGoogle />
      Google 계정으로 로그인
    </Button>
  );
};
