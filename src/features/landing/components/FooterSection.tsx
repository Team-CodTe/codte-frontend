'use client';

import { useInView } from 'react-intersection-observer';

import { AppLogo } from '@/components/logos/AppLogo';
import { Button } from '@/components/ui/Button';
import { PATH } from '@/constants/path';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export const FooterSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className="flex flex-col items-center justify-center gap-20 py-20">
      <div
        className={cn(
          'mx-auto max-w-2xl px-6 text-center transition-all duration-700',
          inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
        )}>
        <h2 className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl">
          오늘부터 바로, <span className="text-primary">성장</span>을 기록하세요
        </h2>
        <p className="text-muted-foreground mb-10 text-lg leading-relaxed">
          혼자서는 막막했던 코딩 테스트,
          <br />
          이제 스터디 멤버들과 함께 즐거운 습관으로 만들어보세요.
        </p>
        <Button asChild size="lg">
          <Link href={PATH.LOGIN}>1분 만에 스터디 만들기</Link>
        </Button>
      </div>

      <footer className="border-border mt-auto w-full border-t pt-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <AppLogo className="h-6 w-auto" />
          </div>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} CodTe. All rights reserved.
          </p>
        </div>
      </footer>
    </section>
  );
};
