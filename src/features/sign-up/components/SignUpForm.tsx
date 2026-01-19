'use client';

import { Button } from '@/components/ui/Button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/Field';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { CheckCircle } from 'lucide-react';

import { useSignUpForm } from '../hooks/useSignUpForm';
import { type ValidationStatus } from '../types/validationStatus';
import { LogoutButton } from './LogoutButton';

export const SignUpForm = () => {
  const {
    form,
    validateUsername,
    validateBojUsername,
    resetUsernameValidation,
    resetBojValidation,
    usernameValidation,
    bojValidation,
    usernameApiError,
    bojApiError,
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
    <form
      id="sign-up-form"
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}>
      <FieldSet>
        <FieldLegend>
          <div className="flex items-center gap-1">
            <h2 className="text-xl font-bold">처음 오셨네요! 반가워요</h2>
            <span className="font-toss-face text-xl">👋🏻</span>
          </div>
        </FieldLegend>
        <FieldDescription>
          서비스 이용을 위해 딱 두 가지만 알려주세요.
        </FieldDescription>

        <FieldGroup>
          <form.Field name="username">
            {(field) => {
              const hasSchemaError =
                field.state.meta.isTouched && !field.state.meta.isValid;
              const hasApiError =
                usernameValidation.status === 'invalid' && usernameApiError;
              const isInvalid = hasSchemaError || hasApiError;
              const isUsernameValidated =
                usernameValidation.status === 'valid' &&
                usernameValidation.validatedValue === field.state.value;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>닉네임</FieldLabel>
                  <div className="flex gap-2">
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      inputMode="text"
                      placeholder="파이썬조아"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                        resetUsernameValidation();
                      }}
                      data-invalid={isInvalid}
                      autoComplete="off"
                    />
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
                  {hasSchemaError ? (
                    <FieldError errors={field.state.meta.errors} />
                  ) : hasApiError ? (
                    <FieldError>{usernameApiError}</FieldError>
                  ) : (
                    <FieldDescription>
                      스터디원들에게 보여질 닉네임입니다.
                    </FieldDescription>
                  )}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="bojUsername">
            {(field) => {
              const hasSchemaError =
                field.state.meta.isTouched && !field.state.meta.isValid;
              const hasApiError =
                bojValidation.status === 'invalid' && bojApiError;
              const isInvalid = hasSchemaError || hasApiError;
              const isBojValidated =
                bojValidation.status === 'valid' &&
                bojValidation.validatedValue === field.state.value;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>백준 계정</FieldLabel>
                  <div className="flex gap-2">
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      inputMode="text"
                      placeholder="alsdn1360"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                        resetBojValidation();
                      }}
                      data-invalid={isInvalid}
                      autoComplete="off"
                    />
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
                  {hasSchemaError ? (
                    <FieldError errors={field.state.meta.errors} />
                  ) : hasApiError ? (
                    <FieldError>{bojApiError}</FieldError>
                  ) : (
                    <FieldDescription>
                      문제 추천 및 풀이 현황 연동을 위해 백준 계정이 필요합니다.
                      <br />
                      가입 후에는 변경이 어려우니 반드시 본인의 아이디를
                      입력해주세요.
                    </FieldDescription>
                  )}
                </Field>
              );
            }}
          </form.Field>

          <Field orientation="responsive" className="justify-end">
            <LogoutButton className="order-2 @md/field-group:order-1" />
            <form.Subscribe
              selector={(state) => ({
                username: state.values.username,
                bojUsername: state.values.bojUsername,
                canSubmit: state.canSubmit,
              })}>
              {({ username, bojUsername, canSubmit }) => {
                const isUsernameValidated =
                  usernameValidation.status === 'valid' &&
                  usernameValidation.validatedValue === username;
                const isBojValidated =
                  bojValidation.status === 'valid' &&
                  bojValidation.validatedValue === bojUsername;
                const isFormValid =
                  canSubmit && isUsernameValidated && isBojValidated;

                return (
                  <Button
                    type="submit"
                    className="order-1 @md/field-group:order-2"
                    disabled={!isFormValid || isSubmitting}>
                    {isSubmitting ? <Spinner /> : null}
                    {isSubmitting ? '등록 중...' : '회원가입'}
                  </Button>
                );
              }}
            </form.Subscribe>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};
