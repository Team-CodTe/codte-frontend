'use client';

import type { PropsWithChildren } from 'react';

import { TooltipProvider } from '@/components/ui/Tooltip';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      enableColorScheme
      disableTransitionOnChange>
      <TooltipProvider>{children}</TooltipProvider>
    </NextThemeProvider>
  );
};
