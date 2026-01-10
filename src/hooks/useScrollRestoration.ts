'use client';

import { useLayoutEffect, useRef } from 'react';

import { throttle } from 'es-toolkit';
import { usePathname } from 'next/navigation';

export const useScrollRestoration = <T>(key: string, dependency: T) => {
  const pathname = usePathname();
  const scrollElementRef = useRef<HTMLElement | null>(null);
  const isRestoredRef = useRef(false);

  const storageKey = `scroll_pos_${key}_${pathname}`;
  const throttledSaveScrollRef = useRef<(() => void) | null>(null);

  const handleScroll = () => {
    if (!throttledSaveScrollRef.current) {
      throttledSaveScrollRef.current = throttle(() => {
        if (scrollElementRef.current) {
          sessionStorage.setItem(
            storageKey,
            scrollElementRef.current.scrollTop.toString(),
          );
        }
      }, 100);
    }

    throttledSaveScrollRef.current();
  };

  const scrollToTop = () => {
    if (scrollElementRef.current) {
      scrollElementRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollRef = (node: HTMLElement | null) => {
    if (node) {
      scrollElementRef.current = node;
      node.addEventListener('scroll', handleScroll);

      const savedPosition = sessionStorage.getItem(storageKey);

      if (savedPosition) {
        requestAnimationFrame(() => {
          node.scrollTo(0, parseInt(savedPosition, 10));
        });
      }
    } else {
      scrollElementRef.current?.removeEventListener('scroll', handleScroll);
      scrollElementRef.current = null;
    }
  };

  useLayoutEffect(() => {
    if (!scrollElementRef.current) return;

    const savedPosition = sessionStorage.getItem(storageKey);
    const positionNum = savedPosition ? parseInt(savedPosition, 10) : 0;

    if (positionNum > 0 && !isRestoredRef.current) {
      const element = scrollElementRef.current;

      if (element.scrollHeight >= positionNum) {
        element.scrollTo(0, positionNum);

        if (Math.abs(element.scrollTop - positionNum) < 10) {
          isRestoredRef.current = true;
        }
      }
    }
  }, [dependency, storageKey]);

  return { scrollRef, scrollToTop };
};
