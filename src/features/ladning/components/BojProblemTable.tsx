import { TierBadge } from '@/components/icons/TierBadge';
import { Button } from '@/components/ui/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { CodeXmlIcon, KeyboardIcon, PlusIcon } from 'lucide-react';

export const BojProblemTable = () => {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex flex-row items-center justify-between">
        <div className="text-muted-foreground ml-4 flex items-center gap-2 text-sm font-semibold">
          <CodeXmlIcon className="size-3.5" />
          <p>오늘의 추천 문제 리스트</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">
            <PlusIcon />
            <span className="hidden md:inline">문제 수동 추가</span>
          </Button>
          <Button variant="secondary" size="sm">
            <KeyboardIcon />
            <span className="hidden md:inline">추천 쿼리 변경</span>
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-36 min-w-32">#</TableHead>
              <TableHead>제목</TableHead>
              <TableHead className="w-36 min-w-32">문제 풀이 글</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="flex items-center gap-2">
                <TierBadge level={13} />
                2708
              </TableCell>
              <TableCell>폴리큐브의 겉넓이</TableCell>
              <TableCell className="flex items-center justify-center">
                <button className="cursor-pointer underline-offset-4 hover:underline">
                  작성하기
                </button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2">
                <TierBadge level={14} />
                2931
              </TableCell>
              <TableCell>가스관</TableCell>
              <TableCell className="flex items-center justify-center">
                <button className="cursor-pointer underline-offset-4 hover:underline">
                  작성하기
                </button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2">
                <TierBadge level={13} />
                34156
              </TableCell>
              <TableCell>테토와 바게트</TableCell>
              <TableCell className="flex items-center justify-center">
                <button className="cursor-pointer underline-offset-4 hover:underline">
                  작성하기
                </button>
              </TableCell>
            </TableRow>
            <TableRow className="text-muted-foreground">
              <TableCell className="flex items-center gap-2">
                <TierBadge level={8} />
                11727
              </TableCell>
              <TableCell>2xn 타일링 2</TableCell>
              <TableCell className="flex items-center justify-center">
                <button className="cursor-pointer underline-offset-4 hover:underline">
                  작성하기
                </button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2">
                <TierBadge level={10} />
                10844
              </TableCell>
              <TableCell>쉬운 계단 수</TableCell>
              <TableCell className="flex items-center justify-center">
                <button className="cursor-pointer underline-offset-4 hover:underline">
                  작성하기
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="text-muted-foreground flex flex-col items-end justify-end gap-1 text-xs">
        <p className="text-right">
          {new Date().toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}{' '}
          00:00 기준
        </p>
        <button className="cursor-pointer underline-offset-4 hover:underline">
          추천 문제 강제 갱신
        </button>
      </div>
    </div>
  );
};
