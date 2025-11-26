import { type LucideIcon } from 'lucide-react';

type Props = {
  icon: LucideIcon;
  label: string;
};

export const TableLabel = ({ icon: Icon, label }: Props) => {
  return (
    <div className="text-muted-foreground flex items-center gap-2 text-sm font-semibold">
      <Icon className="size-3.5" />
      <p>{label}</p>
    </div>
  );
};
