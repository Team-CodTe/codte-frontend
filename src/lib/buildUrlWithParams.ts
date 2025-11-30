type Params<PathParams, QueryParams> = {
  url: string;
  pathParams?: PathParams;
  queryParams?: QueryParams;
};

/**
 * pathParams 혹은 queryParams 를 사용해 URL 을 완성하는 유틸 함수
 * @param url - 파라미터를 넣기 전 원본 URL (예: `/info/{id}` 또는 `/list?sort=desc`)
 * @param pathParams - path parameter (예: `{ id: 1 }`)
 * @param queryParams - query parameter (예: `{ bojUsername: 'alsdn1360' }`)
 */
export function buildUrlWithParams<
  PathParams extends Record<string, string | number> = Record<
    string,
    string | number
  >,
  QueryParams extends Record<
    string,
    string | number | boolean | undefined | null
  > = Record<string, string | number | boolean | undefined | null>,
>({ url, pathParams, queryParams }: Params<PathParams, QueryParams>) {
  let newUrl = url;

  if (pathParams) {
    for (const [key, value] of Object.entries(pathParams)) {
      newUrl = newUrl.replaceAll(`{${key}}`, encodeURIComponent(String(value)));
    }
  }

  if (queryParams) {
    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    }

    const queryString = searchParams.toString();

    if (queryString) {
      const separator = newUrl.includes('?') ? '&' : '?';

      newUrl += `${separator}${queryString}`;
    }
  }

  return newUrl;
}
