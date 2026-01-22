import { PATH } from '@/constants/path';
import Link from 'next/link';

export const LoginFooter = () => {
  const termsOfServicePath = PATH.TERMS_OF_SERVICE;
  const privacyPolicyPath = PATH.PRIVACY_POLICY;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 leading-relaxed">
      <div className="text-muted-foreground text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        로그인 시{' '}
        <Link href={termsOfServicePath} target="_blank">
          서비스 이용약관
        </Link>{' '}
        및{' '}
        <Link href={privacyPolicyPath} target="_blank">
          개인정보 처리방침
        </Link>
        에 동의한 것으로 간주됩니다.
      </div>
      <p className="text-muted-foreground text-xs">
        본 서비스는 <strong>Solved.ac의 리소스(티어 이미지, API 등)</strong>를
        활용하고 있습니다.
      </p>
    </div>
  );
};
