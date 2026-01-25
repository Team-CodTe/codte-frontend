import '../styles/globals.css';

import type { PropsWithChildren } from 'react';

import { Providers } from '@/components/providers/Providers';
import { auth } from '@/lib/auth';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.codte.kr'),
  title: 'CodTe',
  description:
    '매일 스터디원에 딱 맞는 새로운 문제를 추천받고, 해결 방법과 풀이를 쉽게 공유할 수 있는 스터디 플랫폼입니다.',
  openGraph: {
    title: 'CodTe',
    description:
      '매일 스터디원에 딱 맞는 새로운 문제를 추천받고, 해결 방법과 풀이를 쉽게 공유할 수 있는 스터디 플랫폼입니다.',
    type: 'website',
    url: 'https://www.codte.kr',
    siteName: 'CodTe',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodTe',
    description:
      '매일 스터디원에 딱 맞는 새로운 문제를 추천받고, 해결 방법과 풀이를 쉽게 공유할 수 있는 스터디 플랫폼입니다.',
  },
};

const pretendard = localFont({
  src: '../assets/fonts/pretendard/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
  weight: '100 900',
});

const tossFace = localFont({
  src: '../assets/fonts/toss-face/TossFaceFontMac.ttf',
  display: 'swap',
  variable: '--font-toss-face',
});

/**
 * 서버에서 렌더링된 HTML과 클라이언트에서의 초기 렌더링이 정확히 일치하지 않을 수 있는 경우,
 * 이를 방지하기 위해 suppressHydrationWarning을 사용합니다.
 * @see https://ui.shadcn.com/docs/dark-mode/next
 */
const RootLayout = async ({ children }: PropsWithChildren) => {
  const session = await auth();

  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${pretendard.variable} ${tossFace.variable} antialiased`}>
        <Providers session={session}>{children}</Providers>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? ''} />
    </html>
  );
};

export default RootLayout;
