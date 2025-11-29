import { HintTooltip } from '@/components/common/HintTooltip';
import { type LucideIcon } from 'lucide-react';

type Props = {
  icon: LucideIcon;
  label: string;
  tooltipContent: string;
};

export const TableLabel = ({ icon: Icon, label, tooltipContent }: Props) => {
  return (
    <HintTooltip content={tooltipContent}>
      <div className="text-muted-foreground flex shrink-0 items-center gap-2 text-sm font-semibold whitespace-nowrap">
        <Icon className="size-3.5" />
        <span>{label}</span>
      </div>
    </HintTooltip>
  );
};
