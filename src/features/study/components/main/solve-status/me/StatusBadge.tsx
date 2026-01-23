import { Badge } from '@/components/ui/Badge';

type Props = {
  label: string;
  style: string;
  badgeClass: string;
};

export const StatusBadge = ({ config }: { config: Props }) => {
  return (
    <Badge variant="secondary" className={config.badgeClass}>
      <div className={`size-2 rounded-full ${config.style}`} />
      <span>{config.label}</span>
    </Badge>
  );
};
