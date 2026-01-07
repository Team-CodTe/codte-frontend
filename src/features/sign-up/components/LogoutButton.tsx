'use client';

import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { useAuth } from '@/hooks/useAuth';

export const LogoutButton = ({ className }: { className?: string }) => {
  const { handleLogout, isLoggingOut } = useAuth();

  return (
    <Button
      className={className}
      type="button"
      variant="outline"
      onClick={handleLogout}
      disabled={isLoggingOut}>
      {isLoggingOut ? <Spinner /> : null}
      {isLoggingOut ? '로그아웃 중...' : '로그아웃'}
    </Button>
  );
};
