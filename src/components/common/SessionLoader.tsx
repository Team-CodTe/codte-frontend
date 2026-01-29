import { type PropsWithChildren } from 'react';

import { Providers } from '@/components/providers/Providers';
import { auth } from '@/lib/auth';

export const SessionLoader = async ({ children }: PropsWithChildren) => {
  const session = await auth();

  return <Providers session={session}>{children}</Providers>;
};
