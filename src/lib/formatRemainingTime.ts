/**
 * 남은 시간을 반환해주는 함수
 * @param targetDate
 * @param baseDate
 * @returns 남은 시간 (분, 초 단위)
 */
export const formatRemainingTime = (
  targetDate: Date,
  baseDate = new Date(),
) => {
  const diffMS = targetDate.getTime() - baseDate.getTime();

  if (diffMS <= 0) return '';

  const minutes = Math.floor(diffMS / (1000 * 60));
  const seconds = Math.floor((diffMS % (1000 * 60)) / 1000);

  return minutes > 0 ? `${minutes}분 ${seconds}초` : `${seconds}초`;
};
