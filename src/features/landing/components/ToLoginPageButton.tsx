import { Button } from '@/components/ui/Button';
import { PATH } from '@/constants/path';
import Link from 'next/link';

export const ToLoginPageButton = () => {
  return (
    <Button size="sm" asChild>
      <Link id="login-link" aria-label="로그인 페이지로 이동" href={PATH.LOGIN}>
        로그인
      </Link>
    </Button>
  );
};
