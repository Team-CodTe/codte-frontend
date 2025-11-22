import '../styles/globals.css';

import type { PropsWithChildren } from 'react';

import { ThemeProvider } from '@/components/providers/themeProvider';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

export const metadata: Metadata = {
  title: 'CodTe - 코딩 테스트 스터디 플랫폼',
  description:
    '매일 랜덤으로 주어지는 코딩 테스트 문제를 함께 풀고 쉽게 공유할 수 있는 스터디 플랫폼입니다.',
};

const pretendard = localFont({
  src: '../styles/fonts/pretendard/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
  weight: '100 900',
});

/**
 * 서버에서 렌더링된 HTML과 클라이언트에서의 초기 렌더링이 정확히 일치하지 않을 수 있는 경우,
 * 이를 방지하기 위해 suppressHydrationWarning을 사용합니다.
 * @see https://ui.shadcn.com/docs/dark-mode/next
 */
const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${pretendard.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
