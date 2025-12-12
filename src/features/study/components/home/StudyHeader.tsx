'use client';

import { AppLogo } from '@/components/logos/AppLogo';
import { Avatar, AvatarImage } from '@/components/ui/Avatar';
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
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';
import { type Session } from 'next-auth';
import { useTheme } from 'next-themes';

type Props = {
  session: Session | null;
};

export const StudyHeader = ({ session }: Props) => {
  const { logout, isLoggingOut } = useAuth();
  const { theme = 'system', setTheme } = useTheme();

  const handleToggleTheme = () => {
    const nextTheme =
      theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';

    setTheme(nextTheme);
  };

  const ThemeIcon =
    theme === 'light' ? SunIcon : theme === 'dark' ? MoonIcon : MonitorIcon;

  return (
    <header className="flex h-16 w-full items-center justify-between px-5 py-4 lg:px-6">
      <AppLogo className="h-8 w-auto" />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage
              src={session?.user?.profileImgUrl}
              alt={session?.user.id}
            />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="focus:bg-transparent">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={session?.user?.profileImgUrl}
                  alt={session?.user.id}
                />
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">{session?.user?.username}</span>
                <span className="text-muted-foreground text-xs">
                  {session?.user?.email}
                </span>
              </div>
            </div>
          </DropdownMenuItem>

          <DropdownMenuGroup>
            <DropdownMenuItem>
              <span>프로필 설정</span>
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
            disabled={isLoggingOut}>
            {isLoggingOut ? <span>로그아웃 중...</span> : <span>로그아웃</span>}
            {isLoggingOut ? <Spinner /> : null}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
