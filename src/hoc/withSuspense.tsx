import { type ComponentType, type ReactNode, Suspense } from 'react';

type AsyncComponent<P> = (props: P) => Promise<ReactNode>;

type ComponentProps<P> = ComponentType<P> | AsyncComponent<P>;

/**
 * 컴포넌트를 Suspense 로 감싸는 HOC
 * @param WrappedComponent 감싸질 컴포넌트
 * @param options suspense fallback 옵션
 * @returns Suspense로 감싼 컴포넌트
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
