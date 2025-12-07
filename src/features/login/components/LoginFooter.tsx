export const LoginFooter = () => {
  return (
    <div className="flex w-full items-center justify-center">
      {/** @todo 이용약관, 개인정보 처리방침 사이트 주소 추가 */}
      <div className="text-muted-foreground text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        로그인 시 <a href="#">서비스 이용약관</a> 및{' '}
        <a href="#">개인정보 처리방침</a>에 동의한 것으로 간주됩니다.
      </div>
    </div>
  );
};
