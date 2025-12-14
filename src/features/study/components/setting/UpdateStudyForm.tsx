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
import { STUDY_ROLE, type StudyRole } from '@/types/studyRole';

import { useUpdateStudyForm } from '../../hooks/useUpdateStudyForm';
import { type StudyFormData } from '../../schemas/studyForm.schema';

type Props = {
  id: string;
  initialData: StudyFormData;
  role: StudyRole;
};

export const UpdateStudyForm = ({ id, initialData, role }: Props) => {
  const { form, onReset, isSubmitting } = useUpdateStudyForm({
    id,
    initialData,
  });

  const canEdit = role !== STUDY_ROLE.MEMBER;

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

        if (canEdit) {
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
                    readOnly={!canEdit}
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
                      placeholder="저희는 매일 3문제씩 풀어요."
                      readOnly={!canEdit}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      data-invalid={isInvalid}
                      rows={6}
                      className="min-h-24 resize-none md:min-h-16"
                      autoComplete="off"
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.state.value.length} / 200
                      </InputGroupText>
                    </InputGroupAddon>
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
                    disabled={!canEdit}
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
                        disabled={!canEdit}
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
                        placeholder="500"
                        min={0}
                        readOnly={!canEdit}
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
                        placeholder="14000"
                        min={0}
                        readOnly={!canEdit}
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

            {canEdit ? (
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
        </FieldGroup>

        {canEdit ? (
          <form.Subscribe selector={(state) => state.isDirty}>
            {(isDirty) => (
              <Field orientation="horizontal" className="flex justify-end">
                <Button
                  variant="outline"
                  type="button"
                  onClick={onReset}
                  disabled={isSubmitting || !isDirty}>
                  초기화
                </Button>
                <Button type="submit" disabled={isSubmitting || !isDirty}>
                  {isSubmitting ? <Spinner /> : null}
                  {isSubmitting ? '저장 중...' : '저장'}
                </Button>
              </Field>
            )}
          </form.Subscribe>
        ) : null}
      </FieldSet>
    </form>
  );
};
