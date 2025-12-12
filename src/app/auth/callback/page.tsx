'use client';

import { useEffect, useRef } from 'react';

import { useSocialLoginMutation } from '@/api/auth/postSocialLogin/mutation';
import { getMyProfile } from '@/api/user/getMyProfile/fetch';
import Loading from '@/app/loading';
import { PATH } from '@/constants/path';
import { FetchError } from '@/lib/fetchInstance';
import { showToast } from '@/lib/showToast';
import { type ApiErrorData } from '@/types/apiErrorData';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

const AuthCallbackPage = () => {
  const { data: session, update: updateSession, status } = useSession();
  const router = useRouter();
  const hasCalledApi = useRef(false);

  const { mutate: mutateSocialLogin, isPending: isLoggingIn } =
    useSocialLoginMutation({
      onSuccess: async (data) => {
        router.refresh();

        if (data.isRegistered) {
          try {
            const profile = await getMyProfile();

            await updateSession({
              user: {
                id: String(profile.id),
                provider: profile.provider,
                email: profile.email,
                username: profile.username,
                bojUsername: profile.bojUsername,
                profileImgUrl: profile.profileImgUrl,
                createdAt: profile.createdAt,
              },
            });

            router.replace(PATH.STUDY.HOME);
          } catch (error) {
            console.error('❌ 유저 세션 업데이트 실패:', error);

            showToast({
              message:
                '회원 정보를 불러오는데 실패했습니다. 다시 로그인해주세요.',
              type: 'error',
            });

            signOut({ redirect: false });

            router.replace(PATH.LOGIN);
          }
        } else {
          router.replace(PATH.SIGN_UP);
        }
      },
      onError: async (error) => {
        console.error('❌ 로그인 API 호출 실패', error);

        if (error instanceof FetchError) {
          const data = error.data as ApiErrorData | null;
          const errorCode = data?.error?.code;
          const errorMessage = data?.error?.message;

          if (errorCode === 'INVALID_ACCESS_TOKEN' && errorMessage) {
            showToast({
              message: errorMessage,
              type: 'info',
            });
          } else {
            showToast({
              message: '로그인에 실패했습니다. 다시 시도해주세요.',
              type: 'error',
            });
          }
        } else {
          showToast({
            message: '로그인에 실패했습니다. 다시 시도해주세요.',
            type: 'error',
          });
        }

        await signOut({ redirect: false });

        router.replace(PATH.LOGIN);
      },
    });

  useEffect(() => {
    if (hasCalledApi.current || status === 'loading') {
      return;
    }

    if (status === 'unauthenticated') {
      router.replace(PATH.LOGIN);

      return;
    }

    if (session?.provider && session?.accessToken) {
      hasCalledApi.current = true;

      mutateSocialLogin({
        provider: session.provider,
        accessToken: session.accessToken,
      });
    }
  }, [status, session, router, mutateSocialLogin, isLoggingIn, hasCalledApi]);

  return <Loading />;
};

export default AuthCallbackPage;
