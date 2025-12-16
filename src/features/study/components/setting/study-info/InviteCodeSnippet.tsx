'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { showToast } from '@/lib/showToast';
import { ClipboardCheckIcon, ClipboardIcon } from 'lucide-react';

type Props = {
  inviteCode: string;
};

export const InviteCodeSnippet = ({ inviteCode }: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyInviteCode = async () => {
    if (isCopied) {
      return;
    }

    await navigator.clipboard.writeText(inviteCode);

    setIsCopied(true);

    showToast({
      message: '초대 코드가 복사되었습니다.',
    });

    setTimeout(() => {
      setIsCopied(false);
    }, 5000);
  };

  return (
    <div className="flex max-w-[calc(50%-6px)] flex-col gap-3">
      <Label htmlFor="inviteCode">초대 코드</Label>
      <div className="relative">
        <Input
          id="inviteCode"
          name="inviteCode"
          readOnly
          value={inviteCode}
          className="pr-9"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopyInviteCode}
          className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent">
          {isCopied ? (
            <ClipboardCheckIcon className="text-success" />
          ) : (
            <ClipboardIcon />
          )}
          <span className="sr-only">초대 코드 복사</span>
        </Button>
      </div>
    </div>
  );
};
