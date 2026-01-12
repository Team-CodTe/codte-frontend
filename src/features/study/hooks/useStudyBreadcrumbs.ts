import { usePathname } from 'next/navigation';

const BREADCRUMB_MAP = {
  setting: '스터디 설정',
  note: '문제 풀이 글',
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

type Props = {
  studyId?: number;
};

export const useStudyBreadcrumbs = ({ studyId }: Props) => {
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

  const subPaths = pathSegments.slice(studyIdIndex + 1);

  const breadcrumbs: BreadcrumbItem[] = subPaths.map((segment, index) => {
    const href = `/${pathSegments
      .slice(0, studyIdIndex + 1 + index + 1)
      .join('/')}`;

    return {
      key: href,
      href,
      label: BREADCRUMB_MAP[segment as BreadcrumbKey] || segment,
      isLast: index === subPaths.length - 1,
    };
  });

  return breadcrumbs;
};
