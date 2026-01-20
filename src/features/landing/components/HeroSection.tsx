'use client';

import { useInView } from 'react-intersection-observer';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export const HeroSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');

    featuresSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center px-6 pt-16">
      <div
        className={cn(
          'mx-auto max-w-4xl text-center transition-all duration-1000',
          inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
        )}>
        <h1 className="mb-6 text-4xl leading-tight font-bold tracking-tight sm:text-5xl md:text-6xl">
          <span className="text-primary">코딩 테스트,</span> 혼자면 막막하지만
          <br />
          함께라면 <span className="text-primary">습관</span>이 됩니다
        </h1>

        <p className="text-muted-foreground mx-auto mb-10 max-w-2xl text-lg leading-relaxed sm:text-xl">
          작심삼일로 끝나는 스터디는 이제 그만.
          <br className="hidden sm:block" />
          매일 도착하는 맞춤 문제와 히트맵으로 성장의 즐거움을 느껴보세요.
        </p>

        <div className="flex flex-col items-center justify-center">
          <Button variant="outline" size="lg" onClick={scrollToFeatures}>
            더 알아보기
          </Button>
        </div>
      </div>

      <button
        onClick={scrollToFeatures}
        className="text-muted-foreground hover:text-foreground absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce transition-colors"
        aria-label="아래로 스크롤">
        <ChevronDown className="size-8" />
      </button>
    </section>
  );
};
