'use client';

import { useEffect, useTransition } from 'react';

import { useMyProfileQuery } from '@/api/user/getMyProfile/query';
import {
  getLocalStorageNumber,
  setLocalStorageNumber,
} from '@/lib/localStorageActions';
import { useRouter } from 'next/navigation';
import { parseAsInteger, useQueryState } from 'nuqs';

const STATISTICS_STUDY_ID_KEY = 'statistics_study_id';

export const useStatisticsParams = (
  defaultStudyId: number,
  validStudyIds: number[],
) => {
  const { data: myProfile } = useMyProfileQuery();
  const userId = myProfile?.id;
  const storageKey = userId
    ? `${userId}_${STATISTICS_STUDY_ID_KEY}`
    : undefined;

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [studyId, setStudyId] = useQueryState(
    'studyId',
    parseAsInteger.withDefault(defaultStudyId),
  );

  useEffect(() => {
    if (!storageKey) {
      return;
    }

    const storedId = getLocalStorageNumber(storageKey, 0);
    const params = new URLSearchParams(window.location.search);

    if (validStudyIds.length === 0) {
      return;
    }

    const isStoredValid = validStudyIds.includes(storedId);

    if (!params.has('studyId') && storedId > 0 && !isStoredValid) {
      if (storedId !== defaultStudyId) {
        setLocalStorageNumber(storageKey, defaultStudyId);
      }

      if (studyId !== defaultStudyId) {
        startTransition(async () => {
          await setStudyId(defaultStudyId);
          router.refresh();
        });
      }

      return;
    }

    if (storedId > 0 && !params.has('studyId') && storedId !== studyId) {
      startTransition(async () => {
        await setStudyId(storedId);
        router.refresh();
      });
    }
  }, [defaultStudyId, router, setStudyId, studyId, validStudyIds, storageKey]);

  const handleChangeStudyId = async (newId: number) => {
    if (newId === studyId) {
      return;
    }

    if (storageKey) {
      setLocalStorageNumber(storageKey, newId);
    }

    startTransition(async () => {
      await setStudyId(newId);
      router.refresh();
    });
  };

  return {
    studyId,
    handleChangeStudyId,
    isPending,
  };
};
