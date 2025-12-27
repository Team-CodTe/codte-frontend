import { type GetMyProfileResponse } from '@/api/user/getMyProfile/type';

type Props = {
  user: GetMyProfileResponse;
};

export const StudyHomeTitle = ({ user }: Props) => {
  return (
    <div className="leading-relaxed">
      <div className="flex items-center gap-1 text-xl">
        <h2 className="font-bold">
          {user?.username ?? '사용자'}님, 안녕하세요
        </h2>
        <span className="font-toss-face">🙌🏻</span>
      </div>
      <span className="text-muted-foreground font-semibold">
        오늘도 한 걸음 나아가는 모습, 멋있어요!
      </span>
    </div>
  );
};
