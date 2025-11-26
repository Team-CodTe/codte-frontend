import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { SquareCheckIcon, UserRoundCogIcon } from 'lucide-react';

export const MemberSolvingStatusTable = () => {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex flex-row items-center justify-between">
        <div className="text-muted-foreground ml-4 flex items-center gap-2 text-sm font-semibold">
          <SquareCheckIcon className="size-3.5" />
          <p>스터디 문제 풀이 상태</p>
        </div>
        {/** @todo 스터디 회장만 보이도록 변경 */}
        <Button variant="secondary" size="sm">
          <UserRoundCogIcon />
          <span className="hidden md:inline">스터디원 관리</span>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-28 min-w-24">멤버</TableHead>
              <TableHead className="w-36 min-w-32">문제 풀이</TableHead>
              <TableHead className="w-36 min-w-32">문제 풀이 글 작성</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-center">강동우</TableCell>
              <TableCell>
                <div className="flex flex-row items-center justify-center gap-2">
                  <Badge
                    variant="outline"
                    className="h-4 w-4 rounded-full px-1"
                  />
                  <Badge
                    variant="outline"
                    className="h-4 w-4 rounded-full px-1"
                  />
                  <Badge
                    variant="outline"
                    className="h-4 w-4 rounded-full p-0"
                  />
                  <Badge variant="outline" className="h-4 w-4 rounded-full p-0">
                    <Badge
                      variant="default"
                      className="bg-success h-3 w-3 rounded-full p-1"
                    />
                  </Badge>
                  <Badge
                    variant="outline"
                    className="h-4 w-4 rounded-full px-1"
                  />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-row items-center justify-center gap-2">
                  <Badge
                    variant="outline"
                    className="h-4 w-4 rounded-full px-1"
                  />
                  <Badge
                    variant="outline"
                    className="h-4 w-4 rounded-full px-1"
                  />
                  <Badge
                    variant="outline"
                    className="h-4 w-4 rounded-full px-1"
                  />
                  <Badge variant="outline" className="h-4 w-4 rounded-full p-0">
                    <Badge
                      variant="default"
                      className="bg-success h-3 w-3 rounded-full p-1"
                    />
                  </Badge>
                  <Badge
                    variant="outline"
                    className="h-4 w-4 rounded-full px-1"
                  />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
