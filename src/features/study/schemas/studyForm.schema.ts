import z from 'zod';

export const StudyFormSchema = z
  .object({
    name: z
      .string()
      .min(3, '3글자 이상 입력해주세요.')
      .max(50, '50글자 이하로 입력해주세요.')
      .regex(
        /^[\uAC00-\uD7A3a-zA-Z0-9 _-]+$/,
        '한글, 영문, 숫자, _, -만 입력 가능합니다.',
      ),
    description: z
      .string()
      .max(200, '200글자 이하로 입력해주세요.')
      .optional()
      .or(z.literal('')),
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

export type StudyFormData = z.infer<typeof StudyFormSchema>;
