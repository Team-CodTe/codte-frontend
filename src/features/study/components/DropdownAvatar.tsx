'use client';

import { useMyProfileSuspenseQuery } from '@/api/user/getMyProfile/query';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Spinner } from '@/components/ui/Spinner';
import { useAuth } from '@/hooks/useAuth';
import { useThemeAction } from '@/hooks/useThemeAction';

export const DropdownAvatar = () => {
  const { logout, isLoggingOut } = useAuth();
  const { handleToggleTheme, ThemeIcon } = useThemeAction();

  const { data: user } = useMyProfileSuspenseQuery();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.profileImgUrl} alt={String(user?.id)} />
          <AvatarFallback aria-label="프로필 사진 없음">
            {user?.username ? user.username.charAt(0).toUpperCase() : undefined}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-48">
        <DropdownMenuItem className="focus:bg-transparent">
          <div className="flex flex-col">
            <span className="font-medium">{user?.username}</span>
            <span className="text-muted-foreground text-xs">{user?.email}</span>
          </div>
        </DropdownMenuItem>

        {/** @todo 내 프로필 설정 페이지 이동 기능 추가 */}
        <DropdownMenuItem>
          <span>내 프로필</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="justify-between"
          onSelect={(event) => {
            event.preventDefault();
            handleToggleTheme();
          }}>
          <span>테마 변경</span>
          <ThemeIcon />
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="justify-between"
          onClick={logout}
          disabled={isLoggingOut}>
          {isLoggingOut ? <span>로그아웃 중...</span> : <span>로그아웃</span>}
          {isLoggingOut ? <Spinner /> : null}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
