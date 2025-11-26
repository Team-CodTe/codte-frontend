import { type StudyResponse } from '../types/studyDto';
import { MOCK_USER_1 } from './mockUser';

export const MOCK_STUDY: StudyResponse = {
  id: 1,
  owner: MOCK_USER_1,
  name: 'Gold 문제 가볍게 풀기위한 사람들 모임',
  description: '매일 빡세게 5문제씩 풀 수 있는 사람들을 모았습니다.',
  inviteCode: 'aiwnlaki2319dnalk2',
  dailyProblemCount: 5,
  targetTier: 'gold',
  templateContent:
    '## 문제 풀이\n\n### 1. 문제 분석\n### 2. 접근 방식\n### 3. 코드 구현\n\n### 추가 메모',
  createdAt: '2025-01-01',
};
