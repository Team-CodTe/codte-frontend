import { type GetMyProfileResponse } from '@/api/user/getMyProfile/type';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/Field';
import { Separator } from '@/components/ui/Separator';
import { formatDate } from '@/lib/formatFunc';

import { UsernameUpdateDialog } from './UsernameUpdateDialog';

type Props = {
  profile: GetMyProfileResponse;
};

export const MyProfileSection = ({ profile }: Props) => {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-end justify-between">
          <h2 className="text-xl font-bold">프로필 정보</h2>
          <div className="text-muted-foreground text-sm">
            가입일: {formatDate(profile.createdAt, { includeTime: false })}
          </div>
        </div>

        <Separator />
      </div>

      <div className="flex flex-col gap-6">
        <FieldGroup>
          <Field orientation="responsive">
            <FieldContent>
              <FieldLabel>프로필 이미지</FieldLabel>
              <Avatar className="size-32 rounded-3xl">
                <AvatarImage
                  src={profile.profileImgUrl}
                  alt={profile.username}
                />
                <AvatarFallback aria-label="프로필 사진 없음">
                  {profile.username
                    ? profile.username.charAt(0).toUpperCase()
                    : undefined}
                </AvatarFallback>
              </Avatar>
            </FieldContent>
          </Field>
        </FieldGroup>

        <FieldGroup>
          <Field orientation="responsive">
            <FieldContent>
              <FieldLabel>닉네임</FieldLabel>
              <FieldDescription>{profile.username}</FieldDescription>
            </FieldContent>

            <UsernameUpdateDialog initialUsername={profile.username} />
          </Field>
        </FieldGroup>

        <FieldGroup>
          <Field orientation="responsive">
            <FieldContent>
              <FieldLabel>백준 계정</FieldLabel>
              <FieldDescription>{profile.bojUsername}</FieldDescription>
            </FieldContent>
          </Field>
        </FieldGroup>

        <FieldGroup>
          <Field orientation="responsive">
            <FieldContent>
              <FieldLabel>로그인 계정</FieldLabel>
              <FieldDescription>{profile.email}</FieldDescription>
            </FieldContent>
          </Field>
        </FieldGroup>
      </div>
    </div>
  );
};
