import { type PropsWithChildren } from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/Tooltip';

type Props = {
  content: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
};

export const HintTooltip = ({
  children,
  content,
  side,
}: PropsWithChildren<Props>) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side}>{content}</TooltipContent>
    </Tooltip>
  );
};
