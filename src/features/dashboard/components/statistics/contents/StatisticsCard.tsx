type Props = {
  label: string;
  value: number;
  subValue?: string;
};

export const StatisticsCard = ({ label, value, subValue }: Props) => {
  return (
    <div className="border-border flex w-full flex-col gap-1 rounded-md border p-4">
      <span className="text-xs font-medium">{label}</span>
      {subValue ? (
        <div className="flex items-end justify-end gap-2">
          <span className="text-muted-foreground text-sm font-medium">
            {subValue}
          </span>
          <span className="text-3xl leading-none font-bold">{value}</span>
        </div>
      ) : (
        <span className="text-end text-3xl leading-none font-bold">
          {value}
        </span>
      )}
    </div>
  );
};
