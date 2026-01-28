# CodTe AGENTS.md

## 🚨 IMPORTANT

**All answers and explanations must be written in Korean.**
**Answers should be concise and direct.**

## 🛠 Commands

- **Dev Server**: `pnpm dev` (Port 3100)
- **Build**: `pnpm build`
- **Start**: `pnpm start`
- **Lint**: `pnpm lint`
- **Fix Lint**: `pnpm lint:fix`
- **Format**: `pnpm format`
- **Test**: No test runner currently configured.

## 🏗 Project Architecture

- **Framework**: Next.js 16 (App Router), React 19, TypeScript 5
- **State**: Zustand (global), TanStack Query (server), nuqs (URL)
- **Styling**: Tailwind CSS 4, Radix UI, Shadcn UI, Lucide React
- **Structure**:
  - `src/features/**`: Domain-specific components, hooks, stores.
  - `src/components/ui`: Generic UI components (Shadcn).
  - `src/components/common`: Shared app components.
  - `src/app`: Routes only. Delegate logic to features.
  - `src/lib`: Utilities (auth, utils).

## 📝 Code Style & Conventions

- **Imports**: Use aliases (`@/components`, `@/features`, `@/lib`, etc.)
- **Naming**:
  - Components: `PascalCase.tsx`
  - Functions/Vars: `camelCase`
  - Constants: `UPPER_SNAKE_CASE`
  - Types: `PascalCase`
- **Components**:
  - **Server Components** by default. Use `'use client'` only when necessary.
  - **Named Exports**: `export const MyComponent = ...`
  - **Props**: Explicit interface `MyComponentProps`. Destructure props.
- **Styling**:
  - Use Tailwind CSS. Avoid inline styles.
  - Use `cn()` for class merging: `className={cn("base-class", className)}`.
- **Types**:
  - No `any`. Strict mode is on.
  - Return types explicit for public functions/hooks.

## 🤝 Git & Process Rules

- **Branch Strategy**:
  - `dev` -> `feat/feature-name` (Work here) -> PR to `dev` (Squash & Merge).
  - Production release: `dev` -> `main` (Merge Commit).
- **Commit Convention**: `Tag: Summary`
  - Importants: The summary must be written in Korean.
  - Tags: `Feat`, `Fix`, `Docs`, `Chore`, `Design`, `Refactor`, `CI/CD`
  - Example: `Feat: 로그인 페이지 구현`
- **PRs**: Description must summarize changes and link issues.

## 💎 Core Principles

1. **Readability**:
   - No magic numbers -> `const ANIMATION_DURATION = 300`.
   - Colocate logic -> Keep related styles/logic near usage.
   - Simplify conditionals -> Early returns over nested ternaries.
2. **Predictability**:
   - SRP -> Functions do one thing. `fetchBalance` should not log side effects.
   - Consistent Returns -> `useUser` returns `UseQueryResult`.
3. **Cohesion & Coupling**:
   - **Feature Folders**: Keep everything related to a feature (ui, logic, state) in `src/features/xxx`.
   - **Composition**: Prefer composing components over prop drilling.
4. **Performance**:
   - Use `next/image` and `next/font`.
   - Optimize Re-renders: Use `useMemo`/`useCallback` reasonably, but don't over-optimize prematurely.

## 🧪 Testing

- Ensure linting passes (`pnpm lint`) before confirming tasks.
- Verify UI changes visually if possible or describe expected behavior.
