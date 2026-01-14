import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { type LucideIcon } from 'lucide-react';

type Props = {
  currentCount: number;
  totalCount: number;
  Icon: LucideIcon;
  label: string;
};

export const StatusSummaryBadge = ({
  currentCount,
  totalCount,
  Icon,
  label,
}: Props) => {
  const isAllCompleted = currentCount === totalCount;
  const isNoneCompleted = currentCount === 0;

  return (
    <Badge
      variant="outline"
      className={cn(
        'transition-colors',
        isAllCompleted && 'bg-success/10 border-success/30 text-success',
        isNoneCompleted && 'text-muted-foreground',
      )}>
      <Icon className="size-3" aria-label={label} />
      <span>
        {currentCount} / {totalCount}
      </span>
    </Badge>
  );
};
