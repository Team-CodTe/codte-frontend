'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const SignUpFormSchema = z.object({
  username: z
    .string()
    .min(2, '닉네임은 최소 2글자 이상이어야 합니다.')
    .max(20, '닉네임은 최대 20글자 이하이어야 합니다.'),
  bojUsername: z.string().min(1, '백준 계정을 입력해주세요.'),
});

type SignUpFormData = z.infer<typeof SignUpFormSchema>;

export const useSignUpForm = () => {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      username: '',
      bojUsername: '',
    },
  });

  const onSubmit = (data: SignUpFormData) => {
    /** @todo 회원가입 폼 전송 API 추가 */
    console.log(data);
  };

  return {
    form,
    onSubmit,
  };
};
