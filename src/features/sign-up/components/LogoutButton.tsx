'use client';

import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { useAuth } from '@/hooks/useAuth';

export const LogoutButton = () => {
  const { logout, isLogoutPending } = useAuth();

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={logout}
      disabled={isLogoutPending}>
      {isLogoutPending ? <Spinner /> : null}
      {isLogoutPending ? '로그아웃 중...' : '로그아웃'}
    </Button>
  );
};
