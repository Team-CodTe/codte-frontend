'use client';

import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export const ToLoginPageButton = () => {
  const router = useRouter();

  return <Button onClick={() => router.push('/login')}>스터디 시작하기</Button>;
};
