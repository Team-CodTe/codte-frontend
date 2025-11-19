## CodTe - Coding Study Group Platform

코딩 테스트를 함께 공부하기 위한 웹 플랫폼입니다. 조건에 따라 랜덤으로 문제를 추천하고, 해결 방식 혹은 스터디 멤버 간 생각을 쉽게 공유할 수 있습니다.

<br>

## ✨ 주요 기능

- **문제 추천**: 스터디 조건에 따라 랜덤으로 문제를 추천합니다.
- **해결 방식 공유**: 문제 해결 과정과 아이디어를 쉽게 공유할 수 있습니다.
- **스터디 멤버 간 소통**: 누가 문제를 풀었고, 풀이를 공유했는지 쉽게 확인할 수 있으며, 서로의 생각을 나눌 수 있습니다.

<br>

## 🛠 기술 스택

| 분야           | 기술                                  |
| -------------- | ------------------------------------- |
| **프레임워크** | Next.js                               |
| **언어**       | TypeScript                            |
| **스타일링**   | Tailwind CSS, Shadcn/ui, Lucide React |
| **코드 품질**  | ESLint, Prettier                      |
| **컴파일러**   | Babel (React Compiler)                |

<br>

## 📁 프로젝트 구조

```
src/
├── _shared/
│   ├── _clientBoundaries/   # 공통 클라이언트 컴포넌트 (파일 최상단에 'use client' 지시자 사용)
│   ├── _components/         # 공통 컴포넌트
│   └── _helper/
│       ├── constants/       # 공통 상수
│       ├── hooks/           # 공통 커스텀 훅
│       └── utils/           # 공통 유틸리티 함수
│
├── app/
│   ├── layout.tsx           # 루트 레이아웃
│   ├── page.tsx             # 메인 페이지
│   └── [PageName 폴더]/
│       ├── _clientBoundaries/   # 페이지별 클라이언트 컴포넌트 (파일 최상단에 'use client' 지시자 사용)
│       ├── _components/         # 페이지별 컴포넌트
│       ├── _helper/
│       │   ├── constants/       # 페이지별 상수
│       │   ├── hooks/           # 페이지별 커스텀 훅
│       │   └── utils/           # 페이지별 유틸리티 함수
│       └── page.tsx             # 페이지 파일
│
└── styles/                  # 스타일 파일
    ├── globals.css          # 전역 스타일
    └── fonts/               # 폰트 파일
```

- 기본 `page.tsx`, `layout.tsx` 파일 등은 `const Page = () => {}, export default Page` 형식으로 작성됩니다.
- 컴포넌트나 함수 등은 `export const Component = () => {}` 형식으로 작성됩니다.

<br>

## 🚀 빠른 시작

### 사전 요구사항

- Node.js 18 이상
- pnpm 8 이상

### 설치 방법

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 품질 도구
pnpm lint           # ESLint 린트 확인
pnpm lint:fix       # ESLint 자동 수정
pnpm format         # Prettier 포맷팅
```

<br>

## 🧑‍💻 규칙

1. 브랜치 전략

- 네이밍: `태그/설명` (예: `feat/user-auth-signup-login`, `fix/web-header-layout-mobile`)
- 태그: feat, fix, docs, chore, design, refactor, cicd

2. 커밋 컨벤션

- 형식: `Tag: 요약` (예: `Feat: 로그인 기능 추가`)
- Tag: Init, Feat, Fix, Docs, Chore, Design, Refactor, CI/CD
- 가능한 작은 단위로 커밋하고, 변경 요약/의도/범위를 명확히 기술합니다.
