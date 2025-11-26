import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import { type LucideIcon } from 'lucide-react';

type Props = {
  icon: LucideIcon;
  label: string;
  tooltipContent: string;
};

export const TableLabel = ({ icon: Icon, label, tooltipContent }: Props) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="text-muted-foreground flex items-center gap-2 text-sm font-semibold">
          <Icon className="size-3.5" />
          <p>{label}</p>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltipContent}</p>
      </TooltipContent>
    </Tooltip>
  );
};
