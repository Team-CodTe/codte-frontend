'use client';

import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useValidateBojMutation } from '@/api/user/postValidateBoj/mutation';
import { useValidateUsernameMutation } from '@/api/user/postValidateUsername/mutation';
import { showToast } from '@/lib/showToast';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { type ValidationStatus } from '../types/validationStatus';

const SignUpFormSchema = z.object({
  username: z
    .string()
    .min(2, '2글자 이상 입력해주세요.')
    .max(20, '20글자 이하로 입력해주세요.')
    .regex(
      /^[\uAC00-\uD7A3a-zA-Z0-9_-]+$/,
      '한글, 영문, 숫자, _, -만 입력 가능해요.',
    ),
  bojUsername: z
    .string()
    .min(3, '3글자 이상 입력해주세요.')
    .max(50, '50글자 이하로 입력해주세요.')
    .regex(/^[a-zA-Z0-9]+$/, '영문, 숫자만 입력 가능해요.'),
});

type SignUpFormData = z.infer<typeof SignUpFormSchema>;

export const useSignUpForm = () => {
  const [usernameValidation, setUsernameValidation] = useState<{
    status: ValidationStatus;
    validatedValue: string;
  }>({ status: 'idle', validatedValue: '' });

  const [bojValidation, setBojValidation] = useState<{
    status: ValidationStatus;
    validatedValue: string;
  }>({ status: 'idle', validatedValue: '' });

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpFormSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      bojUsername: '',
    },
  });

  const validateUsernameMutation = useValidateUsernameMutation({
    onSuccess: () => {
      setUsernameValidation({
        status: 'valid',
        validatedValue: form.getValues('username'),
      });
    },
    onError: () => {
      setUsernameValidation((prev) => ({
        ...prev,
        status: 'invalid',
      }));

      showToast({ message: '이미 사용 중인 닉네임이에요.', type: 'error' });
    },
  });

  const validateBojMutation = useValidateBojMutation({
    onSuccess: () => {
      setBojValidation({
        status: 'valid',
        validatedValue: form.getValues('bojUsername'),
      });
    },
    onError: () => {
      setBojValidation((prev) => ({
        ...prev,
        status: 'invalid',
      }));

      showToast({ message: '존재하지 않는 백준 계정이에요.', type: 'error' });
    },
  });

  const validateUsername = useCallback(async () => {
    const username = form.getValues('username');
    const isValid = await form.trigger('username');

    if (!isValid) {
      return;
    }

    setUsernameValidation({ status: 'validating', validatedValue: '' });

    validateUsernameMutation.mutate({ username });
  }, [form, validateUsernameMutation]);

  const validateBojUsername = useCallback(async () => {
    const bojUsername = form.getValues('bojUsername');
    const isValid = await form.trigger('bojUsername');

    if (!isValid) {
      return;
    }

    setBojValidation({ status: 'validating', validatedValue: '' });

    validateBojMutation.mutate({ boj_username: bojUsername });
  }, [form, validateBojMutation]);

  const resetUsernameValidation = useCallback(() => {
    setUsernameValidation({ status: 'idle', validatedValue: '' });
  }, []);

  const resetBojValidation = useCallback(() => {
    setBojValidation({ status: 'idle', validatedValue: '' });
  }, []);

  // eslint-disable-next-line react-hooks/incompatible-library
  const watchedUsername = form.watch('username');
  const watchedBojUsername = form.watch('bojUsername');

  const isUsernameValidated =
    usernameValidation.status === 'valid' &&
    usernameValidation.validatedValue === watchedUsername;

  const isBojValidated =
    bojValidation.status === 'valid' &&
    bojValidation.validatedValue === watchedBojUsername;

  const canSubmit = isUsernameValidated && isBojValidated;

  const onSubmit = (data: SignUpFormData) => {
    if (!canSubmit) return;

    /** @todo 회원가입 폼 전송 API 추가 */
    console.log(data);
  };

  return {
    form,
    onSubmit,
    validateUsername,
    validateBojUsername,
    resetUsernameValidation,
    resetBojValidation,
    usernameValidation,
    bojValidation,
    isUsernameValidated,
    isBojValidated,
    canSubmit,
  };
};
