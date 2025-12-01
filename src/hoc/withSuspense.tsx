import { type ComponentType, type ReactNode, Suspense } from 'react';

type AsyncComponent<P> = (props: P) => Promise<ReactNode>;

type ComponentProps<P> = ComponentType<P> | AsyncComponent<P>;

/**
 * 컴포넌트를 Suspense 로 감싸는 HOC
 * - Client Component와 Server Component(async)를 모두 지원합니다.
 * - React.lazy로 불러온 컴포넌트도 지원합니다.
 */
export const withSuspense = <P extends object>(
  WrappedComponent: ComponentProps<P>,
  options?: { fallback: ReactNode },
) => {
  const WithSuspense = (props: P) => {
    return (
      <Suspense fallback={options?.fallback}>
        <WrappedComponent {...props} />
      </Suspense>
    );
  };

  return WithSuspense;
};
