'use client';

import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

const WelcomePage = () => {
  const { logout } = useAuth();

  return (
    <div>
      <Button onClick={logout}>로그아웃</Button>
    </div>
  );
};

export default WelcomePage;
