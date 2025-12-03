'use client';

import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { getMyProfile } from '@/api/user/getMyProfile/fetch';
import { useValidateBojMutation } from '@/api/user/postValidateBoj/mutation';
import { useValidateUsernameMutation } from '@/api/user/postValidateUsername/mutation';
import { useRegisterProfileMutation } from '@/api/user/putRegisterProfile/mutation';
import { PATH } from '@/constants/path';
import { showToast } from '@/lib/showToast';
import { zodResolver } from '@hookform/resolvers/zod';
import { type AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { z } from 'zod';

import { type ValidationStatus } from '../types/validationStatus';

const SignUpFormSchema = z.object({
  username: z
    .string()
    .min(2, '2글자 이상 입력해주세요.')
    .max(20, '20글자 이하로 입력해주세요.')
    .regex(
      /^[\uAC00-\uD7A3a-zA-Z0-9_-]+$/,
      '한글, 영문, 숫자, _, -만 입력 가능합니다.',
    ),
  bojUsername: z
    .string()
    .min(3, '3글자 이상 입력해주세요.')
    .max(50, '50글자 이하로 입력해주세요.')
    .regex(/^[a-zA-Z0-9]+$/, '영문, 숫자만 입력 가능합니다.'),
});

type SignUpFormData = z.infer<typeof SignUpFormSchema>;

type ApiErrorResponse = {
  message: string;
};

export const useSignUpForm = () => {
  const router = useRouter();
  const { update: updateSession } = useSession();

  const [isSubmitting, setIsSubmitting] = useState(false);

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
    onSuccess: (_, variables) => {
      setUsernameValidation({
        status: 'valid',
        validatedValue: variables.username,
      });
    },
    onError: (error) => {
      setUsernameValidation((prev) => ({
        ...prev,
        status: 'invalid',
      }));

      const errorResponse = error as AxiosError<ApiErrorResponse>;

      form.setError('username', {
        type: 'manual',
        message:
          errorResponse.response?.data.message ||
          '오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      });
    },
  });

  const validateBojMutation = useValidateBojMutation({
    onSuccess: (_, variables) => {
      setBojValidation({
        status: 'valid',
        validatedValue: variables.bojUsername,
      });
    },
    onError: (error) => {
      setBojValidation((prev) => ({
        ...prev,
        status: 'invalid',
      }));

      const errorResponse = error as AxiosError<ApiErrorResponse>;

      form.setError('bojUsername', {
        type: 'manual',
        message:
          errorResponse.response?.data.message ||
          '오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      });
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

    validateBojMutation.mutate({ bojUsername });
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

  const registerProfileMutation = useRegisterProfileMutation({
    onSuccess: async () => {
      try {
        const profile = await getMyProfile();

        await updateSession({
          user: {
            id: String(profile.id),
            provider: profile.provider,
            email: profile.email,
            username: profile.username,
            bojUsername: profile.bojUsername,
            profileImgUrl: profile.profileImgUrl,
            createdAt: profile.createdAt,
          },
        });

        showToast({ message: '회원가입이 완료되었습니다.', type: 'success' });

        resetUsernameValidation();
        resetBojValidation();

        router.replace(PATH.STUDY);
      } catch (error) {
        console.error('❌ 유저 세션 업데이트 실패:', error);

        showToast({
          message: '회원 정보를 불러오는데 실패했습니다. 다시 로그인해주세요.',
          type: 'error',
        });

        signOut({ redirect: false });

        router.replace(PATH.LOGIN);
      }
    },
    onError: () => {
      showToast({
        message: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        type: 'error',
      });

      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: SignUpFormData) => {
    if (!canSubmit) {
      return;
    }

    setIsSubmitting(true);

    registerProfileMutation.mutate({
      username: data.username,
      bojUsername: data.bojUsername,
    });
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
    isSubmitting,
  };
};
