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
├── public/              # 정적 파일
├── src/
│   ├── app/             # [라우팅 담당]
│   │   ├── (auth)/      # Route Group 예시
│   │   ├── api/         # Next.js Route Handlers (백엔드 프록시 역할 필요 시)
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── api/             # [API 담당] 서버 통신 중앙 관리
│   │   ├── config/      # Axios/Fetch 인스턴스, 인터셉터 설정
│   │   │   └── instance.ts
│   │   ├── endpoints/   # 도메인별 실제 API 호출 함수 (features와 매칭)
│   │   │   ├── auth.ts
│   │   │   ├── board.ts
│   │   │   └── user.ts
│   │   └── types/       # API 요청/응답 데이터 타입 (DTO)
│   │       ├── authDto.ts
│   │       └── boardDto.ts
│   │
│   ├── features/        # [기능 담당] UI + 비즈니스 로직
│   │   └── board/       # 예: 게시판 기능
│   │      ├── components/  # 게시판 전용 UI 컴포넌트
│   │      ├── hooks/       # React Query 등 훅 (여기서 src/api 함수 호출)
│   │      ├── lib/         # 게시판 전용 유틸 (데이터 가공 등)
│   │      └── types.ts     # UI 전용 타입 (컴포넌트 Props, 상태 타입 등)
│   │
│   ├── components/      # [공통 UI 담당]
│   │   ├── ui/          # shadcn/ui 등 아토믹 컴포넌트
│   │   └── layout/      # Header, Sidebar 등
│   │
│   ├── lib/             # [공통 유틸 담당]
│   │   └── utils.ts     # cn 등 전역 헬퍼
│   │
│   ├── hooks/           # [공통 훅 담당] (useScroll, useInput 등)
│   ├── types/           # [공통 타입 담당] (전역 상태 타입, 환경변수 타입 등)
│   ├── styles/          # [스타일 담당]
│   └── constants/       # [상수 담당]
│
├── next.config.js
├── package.json
└── tsconfig.json
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
