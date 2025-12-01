import {
  type MutationObserverOptions,
  QueryClient,
  type QueryObserverOptions,
  type UseMutationOptions,
  type UseQueryOptions,
  type UseSuspenseQueryOptions,
} from '@tanstack/react-query';

type Options = {
  queryOptions?: Omit<QueryObserverOptions, 'queryKey'>;
  mutationOptions?: MutationObserverOptions<unknown, unknown, unknown, unknown>;
};

const DEFAULT_QUERY_GC_TIME = 1000 * 60 * 5;

const DEFAULT_STALE_TIME = 1000 * 60 * 1;

const DEFAULT_QUERY_OPTIONS: Options['queryOptions'] = {
  retry: false,
  gcTime: DEFAULT_QUERY_GC_TIME,
  staleTime: DEFAULT_STALE_TIME,
  refetchOnWindowFocus: false,
  throwOnError: true,
};

const DEFAULT_MUTATION_OPTIONS: Options['mutationOptions'] = {
  throwOnError: true,
};

export const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        ...DEFAULT_QUERY_OPTIONS,
      },
      mutations: {
        ...DEFAULT_MUTATION_OPTIONS,
      },
    },
  });
};

/** queryKey 와 queryFn 이 생략된 UseQueryOptions 타입 */
export type OmittedQueryOptions<TData = unknown> = Omit<
  UseQueryOptions<TData>,
  'queryKey' | 'queryFn'
>;

/** queryKey 와 queryFn 이 생략된 UseSuspenseQueryOptions 타입 */
export type OmittedSuspenseQueryOptions<TData = unknown> = Omit<
  UseSuspenseQueryOptions<TData>,
  'queryKey' | 'queryFn'
>;

/** mutationFn 이 생략된 UseMutationOptions 타입 */
export type OmittedMutationOptions<TData = unknown> = Omit<
  UseMutationOptions<TData>,
  'mutationFn'
>;
