'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/AlertDialog';
import { Button } from '@/components/ui/Button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/Field';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import {
  VALIDATION_STATUS,
  type ValidationStatus,
} from '@/features/sign-up/types/validationStatus';
import { CheckCircle } from 'lucide-react';

import { useUpdateUsernameForm } from '../hooks/useUpdateUsernameForm';

type Props = {
  initialUsername: string;
};

export const UsernameUpdateDialog = ({ initialUsername }: Props) => {
  const {
    form,
    usernameValidator,
    handleValidate,
    isSubmitting,
    open,
    handleChangeOpen,
  } = useUpdateUsernameForm({ initialUsername });

  const getValidationButtonText = (status: ValidationStatus) => {
    switch (status) {
      case VALIDATION_STATUS.VALIDATING:
        return <Spinner />;
      case VALIDATION_STATUS.VALID:
        return <CheckCircle className="text-success" />;

      default:
        return '확인';
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={handleChangeOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="w-full md:w-auto">
          닉네임 변경
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>닉네임 변경</AlertDialogTitle>
          <AlertDialogDescription>
            변경하고자 하는 닉네임을 아래에 입력해주세요.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form
          id="sign-up-form"
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}>
          <FieldGroup className="gap-4">
            <form.Field name="username">
              {(field) => {
                const hasSchemaError =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                const hasApiError =
                  usernameValidator.status === VALIDATION_STATUS.INVALID &&
                  usernameValidator.errorMessage;
                const isInvalid = hasSchemaError || !!hasApiError;

                const isUsernameValidated =
                  usernameValidator.status === VALIDATION_STATUS.VALID &&
                  usernameValidator.validatedValue === field.state.value;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>닉네임</FieldLabel>
                    <div className="flex gap-2">
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        inputMode="text"
                        placeholder={initialUsername}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => {
                          field.handleChange(e.target.value);
                          usernameValidator.reset();
                        }}
                        data-invalid={isInvalid}
                        autoComplete="off"
                      />
                      <Button
                        type="button"
                        variant={isUsernameValidated ? 'outline' : 'secondary'}
                        onClick={handleValidate}
                        size={
                          usernameValidator.status ===
                            VALIDATION_STATUS.VALIDATING || isUsernameValidated
                            ? 'icon'
                            : 'default'
                        }
                        disabled={
                          usernameValidator.status ===
                            VALIDATION_STATUS.VALIDATING || isUsernameValidated
                        }>
                        {getValidationButtonText(usernameValidator.status)}
                      </Button>
                    </div>
                    {hasSchemaError ? (
                      <FieldError errors={field.state.meta.errors} />
                    ) : (
                      hasApiError && (
                        <FieldError>
                          {usernameValidator.errorMessage}
                        </FieldError>
                      )
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <Field orientation="responsive" className="justify-end">
              <AlertDialogCancel
                type="button"
                disabled={isSubmitting}
                className="order-2 @md/field-group:order-1">
                취소
              </AlertDialogCancel>
              <form.Subscribe
                selector={(state) => ({
                  values: state.values,
                  canSubmit: state.canSubmit,
                })}>
                {({ values, canSubmit }) => {
                  const isFormValid =
                    canSubmit &&
                    usernameValidator.isValid &&
                    usernameValidator.validatedValue === values.username;

                  return (
                    <Button
                      type="submit"
                      className="order-1 @md/field-group:order-2"
                      disabled={!isFormValid || isSubmitting}>
                      {isSubmitting ? <Spinner /> : null}
                      {isSubmitting ? '변경하는 중...' : '변경하기'}
                    </Button>
                  );
                }}
              </form.Subscribe>
            </Field>
          </FieldGroup>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
