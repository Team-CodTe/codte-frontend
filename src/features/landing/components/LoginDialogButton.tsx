import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';

import { GitHubLoginButton } from './GitHubLoginButton';
import { GoogleLoginButton } from './GoogleLoginButton';

export const LoginDropdownButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>시작하기</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>다음 계정으로 시작하기</DropdownMenuLabel>
        <DropdownMenuItem className="focus:bg-transparent focus:outline-none">
          <GitHubLoginButton />
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-transparent focus:outline-none">
          <GoogleLoginButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
