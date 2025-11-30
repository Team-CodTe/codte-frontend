import {
  isServer,
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

const DEFAULT_QUERY_CACHE_TIME = 1000 * 60 * 5;

const DEFAULT_STALE_TIME = 1000 * 60 * 1;

const DEFAULT_QUERY_OPTIONS: Options['queryOptions'] = {
  retry: false,
  gcTime: DEFAULT_QUERY_CACHE_TIME,
  staleTime: DEFAULT_STALE_TIME,
  refetchOnWindowFocus: false,
  throwOnError: true,
};

const DEFAULT_MUTATION_OPTIONS: Options['mutationOptions'] = {
  throwOnError: true,
};

/**
 * QueryClient 인스턴스를 생성하는 팩토리 함수
 */
const makeQueryClient = () => {
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

/** 브라우저 환경에서 QueryClient 인스턴스를 저장할 변수 */
let browserQueryClient: QueryClient | undefined = undefined;

/**
 * QueryClient 가져오기
 * - Server: 항상 새로운 인스턴스 반환 (요청 간 데이터 격리)
 * - Client: 최초 1회 생성 후 재사용 (캐시 유지)
 */
export const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }

    return browserQueryClient;
  }
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
