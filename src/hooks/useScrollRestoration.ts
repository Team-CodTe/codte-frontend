'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { usePathname } from 'next/navigation';

/**
 * 스크롤 위치를 저장하고 복원하는 훅
 * @param key 스토리지 저장 키
 * @param dependency 데이터 객체(이 값이 변경될 때마다 스크롤 복원 시도)
 * @returns scrollRef - 스크롤 대상 요소에 연결할 callback ref (없으면 window 스크롤 사용)
 */
export const useScrollRestoration = <T>(key: string, dependency: T) => {
  const pathname = usePathname();
  const storageKey = `scroll_pos_${key}_${pathname}`;
  const isRestored = useRef(false);
  const [scrollElement, setScrollElement] = useState<HTMLElement | null>(null);

  const scrollRef = useCallback((node: HTMLElement | null) => {
    setScrollElement(node);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollElement) {
        sessionStorage.setItem(storageKey, scrollElement.scrollTop.toString());
      } else {
        sessionStorage.setItem(storageKey, window.scrollY.toString());
      }
    };

    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
    } else {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [storageKey, scrollElement]);

  useEffect(() => {
    const savedPosition = sessionStorage.getItem(storageKey);
    const positionNum = savedPosition ? parseInt(savedPosition, 10) : 0;

    if (dependency && savedPosition && !isRestored.current) {
      if (scrollElement) {
        if (scrollElement.scrollHeight >= positionNum) {
          scrollElement.scrollTo(0, positionNum);
          isRestored.current = true;
        }
      } else {
        const docHeight = document.documentElement.scrollHeight;

        if (docHeight >= positionNum) {
          window.scrollTo(0, positionNum);
          isRestored.current = true;
        }
      }
    }
  }, [storageKey, dependency, scrollElement]);

  return { scrollRef };
};
