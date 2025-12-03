import { Separator } from '@/components/ui/Separator';

export const LoginFooter = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      {/** @todo 도움받기 이메일 주소 추가 */}
      <div className="flex gap-1 text-center text-sm">
        도움이 필요하신가요?
        <a href="#" className="font-semibold">
          도움받기
        </a>
      </div>
      <Separator />
      {/** @todo 이용약관, 개인정보 처리방침 사이트 주소 추가 */}
      <div className="text-muted-foreground text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        로그인 시 <a href="#">서비스 이용약관</a> 및{' '}
        <a href="#">개인정보 처리방침</a>에 동의한 것으로 간주됩니다.
      </div>
    </div>
  );
};
