import { SOLVED_AC_NUMERIC_TIER_ICONS } from '@/assets/svg/tier';
import Image from 'next/image';

type Props = {
  level: number;
  size?: number;
};

const DEFAULT_TIER_BADGE_SIZE = 12;

export const TierBadge = ({ level, size = DEFAULT_TIER_BADGE_SIZE }: Props) => {
  const iconSrc =
    SOLVED_AC_NUMERIC_TIER_ICONS[
      level as keyof typeof SOLVED_AC_NUMERIC_TIER_ICONS
    ] || SOLVED_AC_NUMERIC_TIER_ICONS[0];

  return (
    <div className="inline-flex items-center">
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
