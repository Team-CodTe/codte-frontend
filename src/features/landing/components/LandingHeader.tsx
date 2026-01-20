'use client';

import { useEffect, useState } from 'react';

import { AppLogo } from '@/components/logos/AppLogo';
import { PATH } from '@/constants/path';
import { cn } from '@/lib/utils';
import Link from 'next/link';

import { ToLoginPageButton } from './ToLoginPageButton';

export const LandingHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/80 border-border border-b backdrop-blur-md'
          : 'bg-transparent',
      )}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href={PATH.LANDING} aria-label="홈으로 이동">
          <AppLogo className="h-9 w-auto" />
        </Link>

        <ToLoginPageButton />
      </div>
    </header>
  );
};
