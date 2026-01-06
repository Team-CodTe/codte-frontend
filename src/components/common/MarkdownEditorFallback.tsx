import { Field, FieldGroup } from '../ui/Field';
import { Skeleton } from '../ui/Skeleton';

export const MarkdownEditorFallback = () => {
  return (
    <div className="flex h-full w-full flex-col gap-4 md:grid md:grid-cols-2">
      <div className="flex min-h-0 flex-1 flex-col items-end gap-4">
        <div className="min-h-0 w-full flex-1 overflow-hidden rounded-md">
          <Skeleton className="h-full w-full" />
        </div>

        <FieldGroup>
          <Field orientation="responsive" className="justify-end">
            <Skeleton className="h-9 min-w-16" />
            <Skeleton className="h-9 min-w-16" />
          </Field>
        </FieldGroup>
      </div>

      {/* 프리뷰 영역*/}
      <div className="hidden h-full w-full rounded-md md:block">
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  );
};
