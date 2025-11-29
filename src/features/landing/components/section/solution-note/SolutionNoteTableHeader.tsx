import { HintTooltip } from '@/components/common/HintTooltip';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  CircleXIcon,
  FileCog2Icon,
  LibraryIcon,
  SquarePenIcon,
} from 'lucide-react';

import { TableLabel } from '../../TableLabel';

type Props = {
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
  onClearSearch: () => void;
};

export const SolutionNoteTableHeader = ({
  searchKeyword,
  setSearchKeyword,
  onClearSearch,
}: Props) => {
  return (
    <div className="flex flex-row items-center justify-between gap-3">
      <TableLabel
        icon={LibraryIcon}
        label="문제 풀이 글"
        tooltipContent="스터디원들이 작성한 문제 풀이 글을 볼 수 있어요."
      />
      <div className="flex gap-2">
        <div className="relative w-full">
          <Input
            id="search"
            type="text"
            inputMode="search"
            placeholder="검색..."
            value={searchKeyword}
            className="h-8 pr-8"
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          {searchKeyword && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClearSearch}
              className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 h-8 rounded-l-none hover:bg-transparent">
              <CircleXIcon />
              <span className="sr-only">검색어 초기화</span>
            </Button>
          )}
        </div>
        {/** @todo 스터디 회장만 보이도록 변경 */}
        <HintTooltip content="문제 풀이 글에 대한 템플릿을 변경하거나 선택할 수 있어요.">
          <Button variant="secondary" size="sm">
            <FileCog2Icon />
            <span className="hidden sm:inline">템플릿 관리</span>
          </Button>
        </HintTooltip>
        <Button variant="secondary" size="sm">
          <SquarePenIcon />
          <span className="hidden sm:inline">글 작성</span>
        </Button>
      </div>
    </div>
  );
};
