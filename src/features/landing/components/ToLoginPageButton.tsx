'use client';

import { Button } from '@/components/ui/Button';
import { PATH } from '@/constants/path';
import { sendGAEvent } from '@next/third-parties/google';
import Link from 'next/link';

export const ToLoginPageButton = () => {
  const handleStartClick = () => {
    sendGAEvent('event', 'click_login_button', {
      event_category: 'auth',
      event_label: 'landing_page',
    });
  };

  return (
    <Button asChild>
      <Link
        id="login-link"
        aria-label="로그인 페이지로 이동"
        href={PATH.LOGIN}
        className="cursor-default"
        onClick={handleStartClick}>
        시작하기
      </Link>
    </Button>
  );
};
