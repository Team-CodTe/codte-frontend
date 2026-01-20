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

import { useJoinStudyForm } from '../../hooks/form/useJoinStudyForm';

export const JoinStudyForm = () => {
  const { form, handleQuit, isSubmitting } = useJoinStudyForm();

  return (
    <form
      id="join-study-form"
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}>
      <FieldSet>
        <FieldLegend>
          <div className="flex items-center gap-1">
            <h2 className="text-xl font-bold">스터디 멤버로 참여해봐요</h2>
            <span className="font-toss-face text-xl">😏</span>
          </div>
        </FieldLegend>
        <FieldDescription>
          초대 코드를 입력하고 스터디에 가입해보세요.
        </FieldDescription>

        <FieldGroup>
          <form.Field name="inviteCode">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>초대 코드</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    inputMode="text"
                    placeholder="XQ6A3CODTER8J4P"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    data-invalid={isInvalid}
                    autoComplete="off"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <Field orientation="responsive" className="justify-end">
            <Button
              variant="outline"
              type="button"
              className="order-2 @md/field-group:order-1"
              onClick={handleQuit}
              disabled={isSubmitting}>
              뒤로
            </Button>
            <Button
              type="submit"
              className="order-1 @md/field-group:order-2"
              disabled={isSubmitting}>
              {isSubmitting ? <Spinner /> : null}
              {isSubmitting ? '가입하는 중...' : '가입하기'}
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};
