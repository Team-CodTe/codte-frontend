import { MOCK_STUDY } from '@/api/mock/mockStudy';
import { MOCK_STUDY_MEMBERS } from '@/api/mock/mockStudyMember';
import { type StudyMemberResponse } from '@/api/types/studyDto';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/formatDate';
import { STUDY_ROLE, type StudyRole } from '@/types/studyRole';
import { type ColumnDef } from '@tanstack/react-table';

/** @todo 실제 API 연동 시 이렇게 내가 가입한 스터디 목록을 조회해서 가져오게 하기 */
const CURRENT_USER_ID = 1;

const ROLE_LABEL: Record<StudyRole, string> = {
  [STUDY_ROLE.OWNER]: '스터디장',
  [STUDY_ROLE.MEMBER]: '멤버',
};

// studyId로 멤버 수 계산
const getMemberCount = (studyId: number) => {
  return MOCK_STUDY_MEMBERS.filter((m) => m.studyId === studyId).length;
};

// studyId로 스터디 이름 조회
const getStudyName = (studyId: number) => {
  // TODO: MOCK_STUDIES 배열로 변경 시 find 사용
  return MOCK_STUDY.find((s) => s.id === studyId)?.name || `Study ${studyId}`;
};

// 현재 유저의 스터디 멤버십 정보 필터링
export const currentUserMemberships = MOCK_STUDY_MEMBERS.filter(
  (m) => m.userId === CURRENT_USER_ID,
);

export const studyListTableColumns: ColumnDef<StudyMemberResponse>[] = [
  {
    accessorKey: 'studyName',
    header: '스터디 이름',
    meta: { className: 'w-[40%]' },
    cell: ({ row }) => {
      const studyId = row.original.studyId;
      const studyName = getStudyName(studyId);

      return (
        <div className="max-w-64 truncate" title={studyName}>
          {studyName}
        </div>
      );
    },
  },
  {
    accessorKey: 'memberCount',
    header: '스터디원 수',
    meta: { className: 'w-[20%]' },
    cell: ({ row }) => {
      const studyId = row.original.studyId;

      return `${getMemberCount(studyId)}명`;
    },
  },
  {
    accessorKey: 'role',
    header: '역할',
    meta: { className: 'w-[20%]' },
    cell: ({ row }) => {
      const role = ROLE_LABEL[row.original.role];

      return (
        <Badge
          variant={
            row.original.role === STUDY_ROLE.OWNER ? 'default' : 'secondary'
          }>
          {role}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'joinedAt',
    header: '가입일',
    meta: { className: 'w-[20%]' },
    cell: ({ row }) =>
      formatDate(row.original.joinedAt, { includeTime: false }),
  },
];
