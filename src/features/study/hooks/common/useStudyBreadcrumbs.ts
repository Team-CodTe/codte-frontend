import { useParamInt } from '@/hooks/useParamInt';
import { usePathname } from 'next/navigation';

const BREADCRUMB_MAP = {
  setting: '스터디 설정',
  notes: '문제 풀이 글',
  template: '템플릿 수정',
  edit: '수정',
} as const;

type BreadcrumbKey = keyof typeof BREADCRUMB_MAP;

type BreadcrumbItem = {
  key: string;
  href: string;
  label: string;
  isLast: boolean;
};

export const useStudyBreadcrumbs = () => {
  const studyId = useParamInt('studyId');
  const pathname = usePathname();

  if (!studyId) {
    return [];
  }

  const pathSegments = pathname.split('/').filter(Boolean);
  const studyIdIndex = pathSegments.findIndex(
    (segment) => segment === String(studyId),
  );

  if (studyIdIndex === -1 || studyIdIndex === pathSegments.length - 1) {
    return [];
  }

  const basePath = '/' + pathSegments.slice(0, studyIdIndex + 1).join('/');

  const subPaths = pathSegments.slice(studyIdIndex + 1);

  const breadcrumbs = subPaths.reduce<BreadcrumbItem[]>(
    (acc, segment, index) => {
      const prevHref = acc.length > 0 ? acc[acc.length - 1].href : basePath;
      const currentHref = `${prevHref}/${segment}`;

      acc.push({
        key: currentHref,
        href: currentHref,
        label: BREADCRUMB_MAP[segment as BreadcrumbKey] || segment,
        isLast: index === subPaths.length - 1,
      });

      return acc;
    },
    [],
  );

  return breadcrumbs;
};
