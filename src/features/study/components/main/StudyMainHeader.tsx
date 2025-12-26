'use client';

import React from 'react';

import { type GetStudyDetailResponse } from '@/api/study/getStudyDetail/type';
import { AppLogo } from '@/components/logos/AppLogo';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { PATH } from '@/constants/path';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { SettingsIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { DropdownAvatar } from '../DropdownAvatar';

const BREADCRUMB_MAP: Record<string, string> = {
  setting: '스터디 설정',
  /** @todo 문제 풀이 글 목록 화면 같은거 만들어야 할 듯 함*/
  note: '문제 풀이 글',
  template: '템플릿',
  write: '글 작성',
};

type Props = {
  study: GetStudyDetailResponse;
};

export const StudyMainHeader = ({ study }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const pathSegments = pathname.split('/').filter((segment) => segment);

  const studyIdIndex = pathSegments.findIndex(
    (segment) => segment === String(study.id),
  );

  const subPaths =
    studyIdIndex !== -1 ? pathSegments.slice(studyIdIndex + 1) : [];

  const mainPageUrl = buildUrlWithParams({
    url: PATH.STUDY.MAIN,
    pathParams: { studyId: study.id },
  });

  const settingPageUrl = buildUrlWithParams({
    url: PATH.STUDY.SETTING,
    pathParams: { studyId: study.id },
  });

  const onClickSetting = () => {
    router.push(settingPageUrl);
  };

  return (
    <header className="bg-background sticky top-0 z-50 flex h-16 w-full items-center justify-between gap-4 px-5 lg:px-8">
      <Breadcrumb className="min-w-0 flex-1">
        <BreadcrumbList className="flex-nowrap">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={PATH.STUDY.HOME} replace>
                <AppLogo className="h-8 w-auto" />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem className="min-w-0">
            {subPaths.length > 0 ? (
              <BreadcrumbLink href={mainPageUrl} className="block truncate">
                {study.name}
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage className="block truncate">
                {study.name}
              </BreadcrumbPage>
            )}
          </BreadcrumbItem>

          {subPaths.map((segment, index) => {
            const currentPath = `/${pathSegments
              .slice(0, studyIdIndex + 1 + index + 1)
              .join('/')}`;

            const isLast = index === subPaths.length - 1;
            const displayName = BREADCRUMB_MAP[segment] || segment;

            return (
              <React.Fragment key={currentPath}>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem className="hidden md:block">
                  {isLast ? (
                    <BreadcrumbPage className="block truncate">
                      {displayName}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink
                      href={currentPath}
                      className="block truncate">
                      {displayName}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-row items-center gap-2">
        <Button variant="outline" size="icon-sm" onClick={onClickSetting}>
          <SettingsIcon />
        </Button>

        <DropdownAvatar />
      </div>
    </header>
  );
};
