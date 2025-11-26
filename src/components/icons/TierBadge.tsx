import { solvedAcNumericTierIcons } from '@/assets/svg/tier';
import Image from 'next/image';

type Props = {
  level: number;
  size?: number;
};

export const TierBadge = ({ level, size = 12 }: Props) => {
  const iconSrc =
    solvedAcNumericTierIcons[level as keyof typeof solvedAcNumericTierIcons] ||
    solvedAcNumericTierIcons[0];

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
      <Image
        src={iconSrc}
        alt={`Solved.ac Tier ${level}`}
        width={size}
        height={0}
        style={{ width: size, height: 'auto' }}
      />
    </div>
  );
};
