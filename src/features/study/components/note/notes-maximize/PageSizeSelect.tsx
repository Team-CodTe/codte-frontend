import { Label } from '@/components/ui/Label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { PAGE_SIZE_OPTIONS } from '@/features/study/constants/notesFilterOptions';

type Props = {
  pageSize: number;
  onPageSizeChange: (pageSize: number) => void;
};

export const PageSizeSelect = ({ pageSize, onPageSizeChange }: Props) => {
  return (
    <div className="flex items-center gap-3">
      <Label htmlFor="page-size-select">페이지당 풀이 글 개수</Label>
      <Select
        value={String(pageSize)}
        onValueChange={(value) => onPageSizeChange(Number(value))}>
        <SelectTrigger id="page-size-select" className="w-20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {PAGE_SIZE_OPTIONS.map((size) => (
            <SelectItem key={size} value={String(size)}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
