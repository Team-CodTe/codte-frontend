'use client';

import type { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

import { cn } from '@/lib/utils';
import Image from 'next/image';

type ImageItem = {
  src: string;
  alt: string;
};

interface FeatureSectionProps {
  id?: string;
  title: string;
  description: ReactNode;
  images: ImageItem[];
  reverse?: boolean;
}

export const FeatureSection = ({
  id,
  title,
  description,
  images,
  reverse = false,
}: FeatureSectionProps) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section
      id={id}
      ref={ref}
      className="flex min-h-screen items-center justify-center px-6 py-20">
      <div
        className={cn(
          'mx-auto grid max-w-6xl items-center gap-10 lg:gap-12',
          reverse
            ? 'lg:grid-cols-[3fr_2fr] lg:[&>*:first-child]:order-2'
            : 'lg:grid-cols-[2fr_3fr]',
        )}>
        <div
          className={cn(
            'transition-all delay-100 duration-700',
            inView
              ? 'translate-x-0 opacity-100'
              : reverse
                ? 'translate-x-10 opacity-0'
                : '-translate-x-10 opacity-0',
          )}>
          <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
            {title}
          </h2>
          <div className="text-muted-foreground text-base leading-relaxed">
            {description}
          </div>
        </div>

        <div
          className={cn(
            'transition-all delay-300 duration-700',
            inView
              ? 'translate-x-0 opacity-100'
              : reverse
                ? '-translate-x-10 opacity-0'
                : 'translate-x-10 opacity-0',
          )}>
          <div
            className={cn(
              'flex gap-4',
              images.length > 1 &&
                'scrollbar-thin snap-x snap-mandatory overflow-x-auto pb-4',
            )}>
            {images.map((image) => (
              <div
                key={image.src}
                className={cn(
                  'shrink-0 overflow-hidden bg-transparent',
                  images.length > 1 ? 'w-[85%] snap-center' : 'w-full',
                )}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={0}
                  height={0}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-auto w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
