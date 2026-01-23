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
import { PATH } from '@/constants/path';
import { useAuth } from '@/hooks/useAuth';
import { useThemeAction } from '@/hooks/useThemeAction';
import Link from 'next/link';

export const UserMenu = () => {
  const { handleLogout, isLoggingOut } = useAuth();
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
            <span className="text-xs">{user?.bojUsername}</span>
            <span className="text-muted-foreground text-xs">{user?.email}</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link id="profile-link" aria-label="내 프로필" href={PATH.PROFILE}>
            내 프로필
          </Link>
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
          onClick={handleLogout}
          disabled={isLoggingOut}>
          {isLoggingOut ? <span>로그아웃 중...</span> : <span>로그아웃</span>}
          {isLoggingOut ? <Spinner /> : null}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
