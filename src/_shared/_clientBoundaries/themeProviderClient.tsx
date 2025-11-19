'use client';

import type { PropsWithChildren } from 'react';

import { ThemeProvider } from 'next-themes';

export const ThemeProviderClient = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      enableColorScheme
      disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
};
