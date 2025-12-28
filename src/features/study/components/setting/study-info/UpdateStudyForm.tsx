'use client';

import { TierBadge } from '@/components/common/TierBadge';
import { Button } from '@/components/ui/Button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/Field';
import { Input } from '@/components/ui/Input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/InputGroup';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Slider } from '@/components/ui/Slider';
import { Spinner } from '@/components/ui/Spinner';
import { useUpdateStudyForm } from '@/features/study/hooks/useUpdateStudyForm';
import { type StudyFormData } from '@/features/study/schemas/studyForm.schema';
import { STUDY_ROLE, type StudyRole } from '@/types/studyRole';

type Props = {
  initialData: StudyFormData;
  role: StudyRole;
};

export const UpdateStudyForm = ({ initialData, role }: Props) => {
  const { form, onReset, isSubmitting } = useUpdateStudyForm({
    initialData,
  });

  const isEditable = role === STUDY_ROLE.OWNER;

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: number | null) => void,
  ) => {
    const value = e.target.value;

    onChange(value === '' ? null : parseInt(value, 10));
  };

  return (
    <form
      id="update-study-form"
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault();

        if (isEditable) {
          form.handleSubmit();
        }
      }}>
      <FieldSet>
        <FieldGroup>
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>스터디 이름</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    inputMode="text"
                    placeholder="코딩테스트를 스터디하는 사람들 모임"
                    readOnly={!isEditable}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    data-invalid={isInvalid}
                    autoComplete="off"
                    className="md:max-w-[calc(50%-6px)]"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="description">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>스터디 소개</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      id={field.name}
                      name={field.name}
                      inputMode="text"
                      placeholder={
                        isEditable
                          ? '저희는 매일 3문제씩 풀어요.'
                          : '아직 스터디 소개가 등록되지 않았어요. 스터디장에게 스터디 소개를 요청해보세요!'
                      }
                      readOnly={!isEditable}
                      value={field.state.value ?? ''}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      data-invalid={isInvalid}
                      rows={6}
                      className="min-h-24 resize-none"
                      autoComplete="off"
                    />
                    {isEditable ? (
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="tabular-nums">
                          {field.state.value?.length ?? 0} / 200
                        </InputGroupText>
                      </InputGroupAddon>
                    ) : null}
                  </InputGroup>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="dailyProblemCount">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>추천 문제 개수</FieldLabel>
                  <Select
                    name={field.name}
                    value={field.state.value.toString()}
                    disabled={!isEditable}
                    onValueChange={(value) =>
                      field.handleChange(parseInt(value, 10))
                    }>
                    <SelectTrigger
                      id={field.name}
                      className="md:max-w-[calc(50%-6px)]">
                      <SelectValue placeholder="추천 문제 개수" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((count) => (
                        <SelectItem key={count} value={count.toString()}>
                          {count}개
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="tierMin">
            {(tierMinField) => (
              <form.Field name="tierMax">
                {(tierMaxField) => {
                  const tierMin = tierMinField.state.value;
                  const tierMax = tierMaxField.state.value;

                  return (
                    <Field>
                      <FieldLabel>목표 티어 범위</FieldLabel>
                      <div className="flex items-center justify-center gap-4">
                        <TierBadge level={tierMin} size={16} />
                        <span className="text-muted-foreground font-medium">
                          ~
                        </span>
                        <TierBadge level={tierMax} size={16} />
                      </div>
                      <Slider
                        min={0}
                        max={30}
                        step={1}
                        disabled={!isEditable}
                        value={[tierMin, tierMax]}
                        onValueChange={(values) => {
                          tierMinField.handleChange(values[0]);
                          tierMaxField.handleChange(values[1]);
                        }}
                      />
                    </Field>
                  );
                }}
              </form.Field>
            )}
          </form.Field>

          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <form.Field name="minSolved">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field>
                      <FieldLabel htmlFor="minSolved">
                        최소 맞힌 사람 수
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="number"
                        inputMode="numeric"
                        placeholder={isEditable ? '500' : '제한 없음'}
                        min={0}
                        readOnly={!isEditable}
                        value={field.state.value ?? ''}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          handleNumberChange(e, field.handleChange)
                        }
                        data-invalid={isInvalid}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="maxSolved">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field>
                      <FieldLabel htmlFor="maxSolved">
                        최대 맞힌 사람 수
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="number"
                        inputMode="numeric"
                        placeholder={isEditable ? '14000' : '제한 없음'}
                        min={0}
                        readOnly={!isEditable}
                        value={field.state.value ?? ''}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          handleNumberChange(e, field.handleChange)
                        }
                        data-invalid={isInvalid}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </div>

            {isEditable ? (
              <form.Subscribe
                selector={(state) => ({
                  min: state.values.minSolved,
                  max: state.values.maxSolved,
                  errors: state.errors,
                })}>
                {({ min, max }) => {
                  const hasRangeError =
                    min !== null && max !== null && min > max;

                  if (!hasRangeError)
                    return (
                      <div className="text-muted-foreground text-sm leading-normal font-normal">
                        비워두면 전체 범위로 설정돼요.
                      </div>
                    );

                  return (
                    <div className="text-destructive text-sm leading-normal font-normal">
                      맞힌 사람 수의 최소값은 최대값보다 작아야 합니다.
                    </div>
                  );
                }}
              </form.Subscribe>
            ) : null}
          </div>

          {isEditable ? (
            <form.Subscribe selector={(state) => state.isDirty}>
              {(isDirty) => (
                <Field orientation="responsive" className="justify-end">
                  <Button
                    type="submit"
                    className="order-1 @md/field-group:order-2"
                    disabled={!isDirty || isSubmitting}>
                    {isSubmitting ? <Spinner /> : null}
                    {isSubmitting ? '저장 중...' : '저장'}
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    className="order-2 @md/field-group:order-1"
                    onClick={() =>
                      confirm(
                        '작성 중인 내용이 초기화됩니다. 계속하시겠습니까?',
                      )
                        ? onReset()
                        : null
                    }
                    disabled={!isDirty || isSubmitting}>
                    초기화
                  </Button>
                </Field>
              )}
            </form.Subscribe>
          ) : null}
        </FieldGroup>
      </FieldSet>
    </form>
  );
};
