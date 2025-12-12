'use client';

import type { PropsWithChildren } from 'react';
import { useState } from 'react';

import { AuthSessionSyncProvider } from '@/components/providers/AuthSessionSyncProvider';
import { Toaster } from '@/components/ui/Sonner';
import { TooltipProvider } from '@/components/ui/Tooltip';
import { makeQueryClient } from '@/lib/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

type Props = {
  session: Session | null;
};

export const Providers = ({ children, session }: PropsWithChildren<Props>) => {
  const [queryClient] = useState(makeQueryClient);

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <NextThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          enableColorScheme
          disableTransitionOnChange>
          <Toaster />
          <TooltipProvider>
            <AuthSessionSyncProvider>{children}</AuthSessionSyncProvider>
          </TooltipProvider>
        </NextThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
};
