'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Spinner } from '@/components/ui/Spinner';
import { useAuth } from '@/hooks/useAuth';
import { useThemeAction } from '@/hooks/useThemeAction';

export const DropdownAvatar = () => {
  const { session, logout, isLogoutPending } = useAuth();
  const { handleToggleTheme, ThemeIcon } = useThemeAction();

  const user = session?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.profileImgUrl} alt={user?.id} />
          <AvatarFallback>
            {user?.username?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44">
        <DropdownMenuItem className="focus:bg-transparent">
          <div className="flex flex-col">
            <span className="font-medium">{user?.username}</span>
            <span className="text-muted-foreground text-xs">{user?.email}</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuGroup>
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
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="justify-between"
          onClick={logout}
          disabled={isLogoutPending}>
          {isLogoutPending ? (
            <span>로그아웃 중...</span>
          ) : (
            <span>로그아웃</span>
          )}
          {isLogoutPending ? <Spinner /> : null}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
