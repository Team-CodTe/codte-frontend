'use client';

import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';

import { setSessionUpdateCallback } from '@/lib/authSessionSync';
import { useSession } from 'next-auth/react';

export const AuthSessionSyncProvider = ({ children }: PropsWithChildren) => {
  const { update } = useSession();

  useEffect(() => {
    setSessionUpdateCallback(async () => {
      await update();
    });

    return () => {
      setSessionUpdateCallback(null);
    };
  }, [update]);

  return children;
};
