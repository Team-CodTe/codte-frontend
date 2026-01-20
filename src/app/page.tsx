import { FeatureSection } from '@/features/landing/components/FeatureSection';
import { FooterSection } from '@/features/landing/components/FooterSection';
import { HeroSection } from '@/features/landing/components/HeroSection';
import { LandingHeader } from '@/features/landing/components/LandingHeader';

type ImageItem = {
  src: string;
  alt: string;
};

type Feature = {
  id?: string;
  title: string;
  description: React.ReactNode;
  images: ImageItem[];
  reverse?: boolean;
};

const FEATURES: Feature[] = [
  // 1. 스터디 생성
  {
    id: 'features',
    title: '목표에 딱 맞는 스터디를 개설하세요',
    description: (
      <>
        <p className="mb-4">
          복잡한 규칙 정하기는 그만. 몇 번의 클릭으로 우리 팀만의 스터디 공간이
          완성됩니다.
        </p>
        <p>
          목표 티어와 하루 문제 수를 설정하고 초대 코드를 공유하세요. 나머지는
          CodTe가 알아서 관리해 드립니다.
        </p>
      </>
    ),
    images: [
      { src: '/landing/create-study.png', alt: '스터디 생성 화면' },
      { src: '/landing/join-study.png', alt: '스터디 가입 화면' },
    ],
  },
  // 2. 문제 추천 (핵심)
  {
    title: '매일 아침, 내 티어에 맞는 문제가 도착합니다',
    description: (
      <>
        <p className="mb-4">
          오늘은 무슨 문제를 풀지 고민하지 마세요. 설정한 난이도 범위 내에서
          최적의 문제가 매일 자동으로 추천됩니다.
        </p>
        <p>
          물론 원하는 문제를 직접 추가할 수도 있습니다. 팀원들의 풀이 현황도
          실시간으로 확인해보세요.
        </p>
      </>
    ),
    images: [
      { src: '/landing/study-space.png', alt: '스터디 메인 화면' },
      { src: '/landing/add-problem.png', alt: '문제 추가 화면' },
    ],
    reverse: true,
  },
  // 3. 풀이 기록 (에디터)
  {
    title: '개발자에게 최적화된 풀이 기록 경험',
    description: (
      <>
        <p className="mb-4">
          단순한 텍스트가 아닙니다. 마크다운 에디터로 접근 방법, 코드, 회고를
          기술 블로그처럼 깔끔하게 정리하세요.
        </p>
      </>
    ),
    images: [
      { src: '/landing/note-detail.png', alt: '풀이 글 상세 화면' },
      { src: '/landing/add-note.png', alt: '풀이 글 추가 화면' },
    ],
  },
  // 4. 팀원 풀이 (상호작용)
  {
    title: '서로의 코드를 비교해보세요',
    description: (
      <>
        <p className="mb-4">
          같은 문제라도 접근 방식은 다를 수 있습니다. 팀원들의 풀이를 한곳에서
          모아보고 내 코드와 비교해보세요.
        </p>
        <p>
          문제 번호나 특정 팀원의 풀이만 빠르게 필터링하여 찾아볼 수 있어 코드
          리뷰와 스터디 회고가 쉬워집니다.
        </p>
      </>
    ),
    images: [{ src: '/landing/note-list.png', alt: '풀이 글 목록 화면' }],
    reverse: true,
  },
  // 5. 대시보드 (동기부여)
  {
    title: '꾸준한 노력을 시각적으로 확인하세요',
    description: (
      <>
        <p className="mb-4">
          대시보드에서 나의 학습 통계를 한눈에 파악할 수 있습니다.
        </p>
        <p>
          매일 문제를 풀며 채워지는 히트맵은 스터디를 지속하게 하는 가장 강력한
          동기부여가 됩니다.
        </p>
      </>
    ),
    images: [{ src: '/landing/dashboard.png', alt: '대시보드 화면' }],
  },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <LandingHeader />
      <HeroSection />

      {FEATURES.map((feature, index) => (
        <FeatureSection
          key={index}
          id={feature.id}
          title={feature.title}
          description={feature.description}
          images={feature.images}
          reverse={feature.reverse}
        />
      ))}

      <FooterSection />
    </div>
  );
};

export default LandingPage;
