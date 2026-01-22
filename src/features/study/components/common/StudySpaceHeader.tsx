'use client';

import React from 'react';

import { useStudyDetailQuery } from '@/api/study/getStudyDetail/query';
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
import { Skeleton } from '@/components/ui/Skeleton';
import { PATH } from '@/constants/path';
import { useStudyBreadcrumbs } from '@/features/study/hooks/common/useStudyBreadcrumbs';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { SettingsIcon } from 'lucide-react';
import Link from 'next/link';

import { UserMenu } from '../../../../components/common/UserMenu';
import { useCurrentNoteDetail } from '../../hooks/note/useCurrentNoteDetail';
import { SelectAssignmentBreadcrumbItem } from '../note/write/SelectAssignmentBreadcrumbItem';

type Props = {
  studyId: number;
  initialData: GetStudyDetailResponse;
};

export const StudySpaceHeader = ({ studyId, initialData }: Props) => {
  const { data: study } = useStudyDetailQuery(studyId, {
    initialData,
  });

  const breadcrumbItems = useStudyBreadcrumbs();
  const { noteId, note, isLoading } = useCurrentNoteDetail();

  if (!study) {
    return null;
  }

  const mainPageUrl = buildUrlWithParams({
    url: PATH.STUDY.SPACE,
    pathParams: { studyId: study.id },
  });

  const settingPageUrl = buildUrlWithParams({
    url: PATH.STUDY.SETTING,
    pathParams: { studyId: study.id },
  });

  return (
    <header className="bg-background sticky top-0 z-50 flex h-16 w-full items-center justify-between gap-4 px-5 lg:px-8">
      <Breadcrumb className="min-w-0 flex-1">
        <BreadcrumbList className="flex-nowrap">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={PATH.DASHBOARD} replace>
                <AppLogo className="h-8 w-auto" />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem className="min-w-0">
            {breadcrumbItems.length > 0 ? (
              <BreadcrumbLink asChild className="block truncate">
                <Link href={mainPageUrl}>{study.name}</Link>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage className="block truncate">
                {study.name}
              </BreadcrumbPage>
            )}
          </BreadcrumbItem>

          {breadcrumbItems.map((item) => {
            const isWriteSegment = item.href.endsWith('/write');
            const isNoteIdSegment =
              noteId !== undefined && item.href.endsWith(`/notes/${noteId}`);

            let displayLabel: React.ReactNode = item.label;

            if (isNoteIdSegment) {
              if (isLoading || !note) {
                displayLabel = <Skeleton className="block h-5 w-24" />;
              } else {
                displayLabel = note.problemTitle;
              }
            }

            return (
              <React.Fragment key={item.key}>
                <BreadcrumbSeparator className="xs:block hidden" />
                <BreadcrumbItem className="xs:block hidden min-w-0">
                  {isWriteSegment ? (
                    <SelectAssignmentBreadcrumbItem studyId={studyId} />
                  ) : item.isLast ? (
                    <BreadcrumbPage className="block truncate">
                      {displayLabel}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild className="block truncate">
                      <Link href={item.href}>{displayLabel}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-row items-center gap-2">
        <Button variant="outline" size="icon-sm" asChild>
          <Link
            id="study-setting-link"
            aria-label="스터디 설정"
            href={settingPageUrl}>
            <SettingsIcon className="h-4 w-4" />
          </Link>
        </Button>

        <UserMenu />
      </div>
    </header>
  );
};
