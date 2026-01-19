'use client';

import { TierBadge } from '@/components/common/TierBadge';
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
import { formatNumberWithComma, parseNumberWithComma } from '@/lib/formatFunc';

import { useCreateStudyForm } from '../../hooks/form/useCreateStudyForm';

export const CreateStudyForm = () => {
  const { form, handleQuit, isSubmitting } = useCreateStudyForm();

  const handleChangeNumberWithComma = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: number | null) => void,
  ) => {
    const parsedValue = parseNumberWithComma(e.target.value);

    onChange(parsedValue);
  };

  return (
    <form
      id="create-study-form"
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}>
      <FieldSet>
        <FieldLegend>
          <div className="flex items-center gap-1">
            <h2 className="text-xl font-bold">스터디장이 되어봐요</h2>
            <span className="font-toss-face text-xl">😎</span>
          </div>
        </FieldLegend>
        <FieldDescription>
          스터디를 등록하고 멤버들을 모집해보세요.
        </FieldDescription>

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
                    value={field.state.value ?? ''}
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
                      value={field.state.value ?? ''}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      data-invalid={isInvalid}
                      rows={6}
                      className="min-h-24 resize-none"
                      autoComplete="off"
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.state.value?.length ?? 0} / 200
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
                    value={field.state.value?.toString() ?? ''}
                    onValueChange={(value) =>
                      field.handleChange(parseInt(value, 10))
                    }>
                    <SelectTrigger id={field.name}>
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
                        value={[tierMin, tierMax]}
                        onValueChange={(values) => {
                          tierMinField.handleChange(values[0]);
                          tierMaxField.handleChange(values[1]);
                        }}
                      />
                      <FieldDescription>
                        설정한 티어 범위 안의 문제만 추천됩니다.
                      </FieldDescription>
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
                        type="text"
                        inputMode="numeric"
                        placeholder="500"
                        maxLength={10}
                        value={formatNumberWithComma(field.state.value)}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          handleChangeNumberWithComma(e, field.handleChange)
                        }
                        data-invalid={isInvalid}
                        autoComplete="off"
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
                        type="text"
                        inputMode="numeric"
                        placeholder="14,000"
                        value={formatNumberWithComma(field.state.value)}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          handleChangeNumberWithComma(e, field.handleChange)
                        }
                        data-invalid={isInvalid}
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </div>

            <form.Subscribe
              selector={(state) => ({
                min: state.values.minSolved,
                max: state.values.maxSolved,
                errors: state.errors,
              })}>
              {({ min, max }) => {
                const hasRangeError = min !== null && max !== null && min > max;

                if (!hasRangeError)
                  return (
                    <div className="text-muted-foreground text-sm leading-normal font-normal">
                      비워두면 전체 범위로 설정됩니다.
                    </div>
                  );

                return (
                  <div className="text-destructive text-sm leading-normal font-normal">
                    맞힌 사람 수의 최소값은 최대값보다 작아야 합니다.
                  </div>
                );
              }}
            </form.Subscribe>
          </div>

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
              {isSubmitting ? '생성 중...' : '스터디 생성'}
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};
