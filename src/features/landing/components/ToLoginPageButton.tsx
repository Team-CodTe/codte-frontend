import { Button } from '@/components/ui/Button';
import { PATH } from '@/constants/path';
import Link from 'next/link';

export const ToLoginPageButton = () => {
  return (
    <Button asChild>
      <Link
        id="login-link"
        aria-label="로그인 페이지로 이동"
        href={PATH.LOGIN}
        className="cursor-default">
        시작하기
      </Link>
    </Button>
  );
};
