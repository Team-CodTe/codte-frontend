'use client';

import { useState } from 'react';

import { useForm } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';
import z from 'zod';

const CreateStudyFormSchema = z
  .object({
    name: z
      .string()
      .min(3, '3글자 이상 입력해주세요.')
      .max(50, '50글자 이하로 입력해주세요.'),
    description: z
      .string()
      .min(1, '스터디 설명을 입력해주세요.')
      .max(200, '200글자 이하로 입력해주세요.'),
    dailyProblemCount: z
      .number()
      .min(1, '오늘의 추천 문제는 최소 1개 이상이어야 해요.')
      .max(5, '오늘의 추천 문제는 최대 5개까지 설정할 수 있어요.'),
    tierMin: z.number().min(0).max(30),
    tierMax: z.number().min(0).max(30),
    minSolved: z
      .number()
      .min(0)
      .max(1000000, '100만 이하로 입력해주세요.')
      .nullable(),
    maxSolved: z
      .number()
      .min(0)
      .max(1000000, '100만 이하로 입력해주세요.')
      .nullable(),
  })
  .refine((data) => data.tierMin <= data.tierMax, {
    message: '최소 난이도가 최대 난이도보다 작거나 같아야 합니다.',
    path: ['tierMax'],
  })
  .refine(
    (data) => {
      if (data.minSolved !== null && data.maxSolved !== null) {
        return data.minSolved <= data.maxSolved;
      }

      return true;
    },
    {
      message: '최소 값은 최대 값보다 클 수 없습니다.',
      path: ['minSolved', 'maxSolved'],
    },
  );

type CreateStudyFormData = z.infer<typeof CreateStudyFormSchema>;

export const useCreateStudyForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
      dailyProblemCount: 1,
      tierMin: 0,
      tierMax: 30,
      minSolved: null,
      maxSolved: null,
    } satisfies CreateStudyFormData as CreateStudyFormData,
    validators: {
      onBlur: CreateStudyFormSchema,
      onSubmit: CreateStudyFormSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        setIsSubmitting(true);

        /**  @todo API 호출 로직 추가 */
        console.log(value);
      } catch (error) {
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const onQuit = async () => {
    form.reset();
    router.back();
  };

  return {
    form,
    onQuit,
    isSubmitting,
  };
};
