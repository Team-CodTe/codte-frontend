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
├── public/              # [정적 파일 담당] 정적 파일
├── src/
│   ├── app/             # [라우팅 담당] 페이지, 레이아웃, API 라우트
│   │   ├── (페이지 그룹)/  # Route Group (URL에 포함 안 됨)
│   │   ├── 실제 페이지/
│   │   │   └── page.tsx    # 실제 페이지
│   │   ├── api/         # 백엔드 API 라우트
│   │   ├── layout.tsx   # 루트 레이아웃
│   │   └── page.tsx     # 루트 페이지
│   │
│   ├── features/        # [기능 담당] 기능별 도메인 로직 분리
│   │   └── 실제 페이지/
│   │      ├── components/  # 해당 페이지에서만 쓰이는 컴포넌트
│   │      ├── hooks/       # 해당 페이지 전용 훅
│   │      ├── lib/         # 해당 페이지 전용 유틸리티
│   │      ├── api/         # 해당 페이지 API 호출 함수
│   │      └── types.ts     # 해당 페이지 타입 정의
│   │
│   ├── components/      # [UI 담당] 전역에서 재사용되는 UI 컴포넌트
│   │   ├── ui/          # 버튼, 인풋, 모달 등 (shadcn/ui 스타일)
│   │   └── layout/      # 헤더, 푸터, 사이드바 등
│   │
│   ├── lib/             # [유틸리티 담당] 외부 라이브러리 설정 및 유틸리티
│   │   └── utils.ts     # 단순 헬퍼 함수
│   │
│   ├── hooks/           # [훅 담당] 전역적으로 쓰이는 커스텀 훅
│   ├── types/           # [타입 담당] 전역 타입 정의
│   ├── styles/          # [스타일 담당] 전역 스타일 변수, 믹스인 등
│   └── constants/       # [상수 담당] 전역 상수
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
