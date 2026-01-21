## CodTe - Frontend

코딩 테스트를 함께 공부하기 위한 웹 플랫폼입니다. 조건에 따라 랜덤으로 문제를 추천하고, 해결 방식 혹은 스터디 멤버 간 생각을 쉽게 공유할 수 있습니다.

<br>

## ✨ 주요 기능

- **문제 추천**: 스터디 조건에 따라 랜덤으로 문제를 추천합니다.
- **해결 방식 공유**: 문제 해결 과정과 아이디어를 쉽게 공유할 수 있습니다.
- **스터디 멤버 간 소통**: 누가 문제를 풀었고, 풀이를 공유했는지 쉽게 확인할 수 있으며, 서로의 생각을 나눌 수 있습니다.

<br>

## 🛠 기술 스택

| 분야 | 기술 |
| :--- | :--- |
| **프레임워크 및 라이브러리** | Next.js 16.1 (App Router), React 19.2 |
| **언어** | TypeScript 5.x |
| **데이터 페칭** | TanStack Query 5.90 |
| **상태 관리** | Zustand 5.0, nuqs 2.8 (URL State) |
| **인증** | Auth.js 5.0 beta |
| **스타일링** | Tailwind CSS 4.x, Lucide React 0.554 |
| **UI 컴포넌트** | Radix UI, Shadcn/ui |
| **폼 관리** | Zod 4.1, TanStack Form 1.27 |
| **코드 품질** | ESLint 9.x, Prettier 3.8, Husky 9.1, lint-staged 16.2 |
| **컴파일러** | React Compiler 1.0 (Babel Plugin) |
| **분석** | Google Analytics (GA4) |
| **패키지 매니저** | pnpm 10.x |

<br>

## 📁 프로젝트 구조

```
├── public/              # 정적 파일
├── src/
│   ├── api/             # [API 담당] 서버 통신 중앙 관리 (fetch, query, mutation 등)
│   │   ├── auth/        # 도메인별 폴더 구성
│   │   ├── study/
│   │   └── ...
│   ├── app/             # [라우팅 담당] Next.js App Router
│   │   ├── auth/        # 로그인 콜백
│   │   ├── dashboard/   # 개인 대시보드
│   │   ├── study/       # 스터디 상세 및 활동 공간
│   │   ├── ...
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── assets/          # [공통 에셋 담당] fonts, svg, images
│   ├── components/      # [공통 UI 담당]
│   │   ├── common/      # 전역 공통 UI 컴포넌트 (Editor, Preview, Badge 등)
│   │   ├── logos/       # 서비스 로고 컴포넌트
│   │   ├── providers/   # Context API 및 Query Providers
│   │   └── ui/          # shadcn/ui 기반 저수준 컴포넌트
│   ├── constants/       # [상수 담당] 서비스 전역 상수 (path 등)
│   ├── features/        # 기능별 components, hooks, schemas, suspenses 관리
│   │   ├── dashboard/
│   │   ├── study/
│   │   └── ...  
│   ├── hoc/             # [HOC 담당] Higher-Order Components
│   ├── hooks/           # [공통 훅 담당] 재사용 가능한 전역 커스텀 훅
│   ├── lib/             # [공통 유틸 담당] fetchInstance, auth, utils 등
│   ├── styles/          # [스타일 담당] 글로벌 CSS 및 컴포넌트 스타일
│   └── types/           # [공통 타입 담당] 전역에서 참조되는 타입 정의
├── AGENTS.md            # AI 에이전트 가이드라인
├── next.config.js       # Next.js 설정
├── package.json         # 의존성 및 스크립트
└── tsconfig.json        # TypeScript 설정
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

# 빌드 및 실행
pnpm build
pnpm start

# 품질 도구
pnpm lint           # ESLint 린트 확인
pnpm lint:fix       # ESLint 자동 수정
pnpm format         # Prettier 포맷팅
```

<br>

## 🧑‍💻 규칙

1. 브랜치 전략

- `main`, `dev`는 항상 존재하며, 기능을 개발할 땐 `dev` 브랜치로부터 분기하여 `feat/기능명` 브랜치를 생성합니다.
- 기능 브랜치의 개발이 완료되면 PR을 통해 `dev` 브랜치로 **Squash and Merge** 합니다.
  - 이유: 기능 브랜치에서의 자잘한 커밋(오타 수정 등)을 없애고, dev에는 기능 단위로 깔끔하게 커밋이 쌓이게 하기 위함
- 프로덕션 배포 준비가 되면 `dev` 브랜치에서 PR을 통해 `main` 브랜치로 **Merge Commit**으로 merge 합니다.
  - 이유: 배포 이력을 명확히 남기고 브랜치 간 그래프를 연결하기 위함

2. 브랜치 컨벤션

- 형식: `태그/설명`
- 태그: feat, fix, docs, chore, design, refactor, cicd
- 예시:
  ```bash
  feat/user-auth-signup-login
  fix/web-header-layout-mobile
  ```

3. 커밋 컨벤션

- 형식: `태그: 요약`
- 태그: Init, Feat, Fix, Docs, Chore, Design, Refactor, CI/CD
- 가능한 작은 단위로 커밋하고, 변경 요약/의도/범위를 명확히 기술합니다.
- 예시:
  ```bash
  Feat: 로그인 기능 추가
  (엔터로 한 칸 띄우기)
  - 소셜 로그인 추가 및 서버로부터 JWT 발급 로직 구현
  - ...
  ```
