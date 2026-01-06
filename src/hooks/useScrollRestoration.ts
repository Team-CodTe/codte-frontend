'use client';

import { useEffect, useRef } from 'react';

import { usePathname } from 'next/navigation';

/**
 * @param key 스토리지 저장 키
 * @param dependency 데이터 객체(이 값이 변경될 때마다 스크롤 복원 시도)
 */
export const useScrollRestoration = <T>(key: string, dependency: T) => {
  const pathname = usePathname();
  const storageKey = `scroll_pos_${key}_${pathname}`;
  const isRestored = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem(storageKey, window.scrollY.toString());
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [storageKey]);

  useEffect(() => {
    const savedPosition = sessionStorage.getItem(storageKey);
    const positionNum = savedPosition ? parseInt(savedPosition, 10) : 0;

    if (dependency && savedPosition && !isRestored.current) {
      const docHeight = document.documentElement.scrollHeight;

      if (docHeight >= positionNum) {
        window.scrollTo(0, positionNum);
        isRestored.current = true;
      }
    }
  }, [storageKey, dependency]);
};
