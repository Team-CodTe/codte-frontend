'use client';

import { Button } from '@/components/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { CheckCircle } from 'lucide-react';

import { useSignUpForm } from '../hooks/useSignUpForm';
import { type ValidationStatus } from '../types/validationStatus';
import { FormDescriptionWithError } from './FormDescriptionWithError';
import { LogoutButton } from './LogoutButton';

export const SignUpForm = () => {
  const {
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
  } = useSignUpForm();

  const getValidationButtonText = (status: ValidationStatus) => {
    switch (status) {
      case 'validating':
        return <Spinner />;
      case 'valid':
        return <CheckCircle className="text-success" />;

      default:
        return '확인';
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          <FormField
            aria-label="닉네임"
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="username">닉네임</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input
                      id="username"
                      type="text"
                      inputMode="text"
                      placeholder="파이썬조아"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        resetUsernameValidation();
                      }}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant={isUsernameValidated ? 'outline' : 'secondary'}
                    onClick={validateUsername}
                    size={
                      usernameValidation.status === 'validating' ||
                      isUsernameValidated
                        ? 'icon'
                        : 'default'
                    }
                    disabled={
                      usernameValidation.status === 'validating' ||
                      isUsernameValidated
                    }>
                    {getValidationButtonText(usernameValidation.status)}
                  </Button>
                </div>
                <FormDescriptionWithError message="스터디원들에게 보여질 닉네임이에요." />
              </FormItem>
            )}
          />

          <FormField
            aria-label="백준 계정"
            control={form.control}
            name="bojUsername"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="bojUsername">백준 계정</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input
                      id="bojUsername"
                      type="text"
                      inputMode="text"
                      placeholder="alsdn1360"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        resetBojValidation();
                      }}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant={isBojValidated ? 'outline' : 'secondary'}
                    onClick={validateBojUsername}
                    size={
                      bojValidation.status === 'validating' || isBojValidated
                        ? 'icon'
                        : 'default'
                    }
                    disabled={
                      bojValidation.status === 'validating' || isBojValidated
                    }>
                    {getValidationButtonText(bojValidation.status)}
                  </Button>
                </div>
                <FormDescriptionWithError message="문제 추천 쿼리 및 문제 풀이 상태 조회에 사용돼요." />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Button
            type="submit"
            className="w-full"
            disabled={!canSubmit || isSubmitting}>
            {isSubmitting ? <Spinner /> : null}
            {isSubmitting ? '등록 중...' : '회원가입'}
          </Button>
          <LogoutButton />
        </div>
      </form>
    </Form>
  );
};
