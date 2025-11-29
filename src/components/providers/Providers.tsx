'use client';

import type { PropsWithChildren } from 'react';

import { TooltipProvider } from '@/components/ui/Tooltip';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

interface Props extends PropsWithChildren {
  session: Session | null;
}

export const Providers = ({ children, session }: Props) => {
  return (
    <SessionProvider session={session}>
      <NextThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        enableColorScheme
        disableTransitionOnChange>
        <TooltipProvider>{children}</TooltipProvider>
      </NextThemeProvider>
    </SessionProvider>
  );
};
