'use client';

import { getMyProfile } from '@/api/user/getMyProfile/fetch';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

const WelcomePage = () => {
  const { logout } = useAuth();

  const handleGetMyProfile = async () => {
    try {
      const data = await getMyProfile();

      console.log('내 정보:', data);
    } catch (error) {
      console.error('내 정보 가져오기 실패:', error);
    }
  };

  return (
    <div>
      <Button onClick={logout}>로그아웃</Button>
      <Button onClick={handleGetMyProfile}>내 정보 받아오기 테스트</Button>
    </div>
  );
};

export default WelcomePage;
