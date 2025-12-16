'use client';

import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { useAuth } from '@/hooks/useAuth';

export const LogoutButton = ({ className }: { className?: string }) => {
  const { logout, isLoggingOut } = useAuth();

  return (
    <Button
      className={className}
      type="button"
      variant="outline"
      onClick={logout}
      disabled={isLoggingOut}>
      {isLoggingOut ? <Spinner /> : null}
      {isLoggingOut ? '로그아웃 중...' : '로그아웃'}
    </Button>
  );
};
