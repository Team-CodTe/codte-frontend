import type { SolutionNoteResponse } from '../types/solutionDto';
import { mockDailyAssignment } from './mockDailyAssignment';
import { mockStudy } from './mockStudy';
import { mockUser1, mockUser2, mockUser3, mockUser4 } from './mockUser';

const getProblem = (index: number) => mockDailyAssignment[index].problem;

export const mockSolutionNotes: SolutionNoteResponse[] = [
  // 1. 폴리큐브의 겉넓이 (4명 풀이)
  {
    id: 1,
    study: mockStudy,
    user: mockUser1,
    problem: getProblem(0),
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\n폴리큐브는 1x1x1 큐브가 면끼리 접해있는 도형입니다. 주어진 큐브들의 좌표를 통해 겉넓이를 구해야 합니다.\n\n### 2. 접근 방식\n3차원 배열을 사용하여 큐브가 존재하는 위치를 마킹합니다. 각 큐브의 6면을 검사하여 인접한 칸이 비어있으면 겉넓이에 추가하는 방식으로 해결했습니다.\n\n### 3. 코드 구현\n`visited` 3차원 배열과 6방향 델타 탐색을 활용하여 구현했습니다.\n\n### 추가 메모\n좌표 범위가 작아서 배열로 충분히 가능했습니다.',
    createdAt: '2025-11-26 14:00:00',
    updatedAt: '2025-11-26 14:00:00',
  },
  {
    id: 2,
    study: mockStudy,
    user: mockUser2,
    problem: getProblem(0),
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\nN개의 큐브가 주어질 때 전체 겉넓이를 구하는 문제입니다. 겹치는 면은 겉넓이에서 제외됩니다.\n\n### 2. 접근 방식\n단순하게 모든 큐브의 면(6*N)에서 서로 맞닿아 있는 면의 개수 * 2를 빼는 방식으로 접근했습니다.\n\n### 3. 코드 구현\nSet 자료구조를 사용하여 큐브의 존재 여부를 빠르게 확인했습니다.\n\n### 추가 메모\n좌표 압축은 필요 없었습니다.',
    createdAt: '2025-11-26 15:30:00',
    updatedAt: '2025-11-26 15:30:00',
  },
  {
    id: 3,
    study: mockStudy,
    user: mockUser3,
    problem: getProblem(0),
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\n3D 공간에서의 기하학적 문제입니다.\n\n### 2. 접근 방식\n객체 지향적으로 `Cube` 클래스를 정의하고, `isAdjacent` 메서드를 구현하여 인접 여부를 판단했습니다.\n\n### 3. 코드 구현\nJava의 클래스 구조를 활용하여 깔끔하게 구현하려고 노력했습니다.\n\n### 추가 메모\n자바로 구현하니 코드가 좀 길어지긴 했네요.',
    createdAt: '2025-11-26 16:00:00',
    updatedAt: '2025-11-26 16:10:00',
  },
  {
    id: 4,
    study: mockStudy,
    user: mockUser4,
    problem: getProblem(0),
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\n겉넓이 구하기 문제입니다.\n\n### 2. 접근 방식\n파이썬의 `set`을 활용하여 좌표를 저장하고, 각 큐브마다 6방향을 확인하여 `set`에 없는 경우 카운트했습니다.\n\n### 3. 코드 구현\n`count += 1 for d in directions if (x+dx, y+dy, z+dz) not in cubes`\n\n### 추가 메모\n파이썬 Set이 역시 편하네요.',
    createdAt: '2025-11-26 16:20:00',
    updatedAt: '2025-11-26 16:20:00',
  },

  // 2. 가스관 (3명 풀이)
  {
    id: 5,
    study: mockStudy,
    user: mockUser1,
    problem: getProblem(1),
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\n끊어진 가스관을 찾아 적절한 블록으로 채우는 시뮬레이션 문제입니다.\n\n### 2. 접근 방식\n시작점(M, Z)에서 가스가 흐르는 방향을 따라가다가 끊긴 지점을 찾습니다. 해당 지점에서 필요한 블록의 모양을 유추합니다.\n\n### 3. 코드 구현\n각 블록(`|`, `-`, `+`, `1`, `2`, `3`, `4`)별로 연결 가능한 방향을 비트마스크로 정의하여 구현했습니다.\n\n### 추가 메모\n분기 처리가 까다로워서 상수로 정의해두는 게 좋았습니다.',
    createdAt: '2025-11-26 17:00:00',
    updatedAt: '2025-11-26 17:00:00',
  },
  {
    id: 6,
    study: mockStudy,
    user: mockUser2,
    problem: getProblem(1),
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\n유럽의 가스관 연결 문제입니다. 해커가 하나를 지웠다고 하네요.\n\n### 2. 접근 방식\nDFS를 사용하여 파이프를 따라 이동했습니다. 좌표 범위를 벗어나거나 파이프가 없는 곳에 도달했을 때, 주변 파이프와 연결될 수 있는 모양을 찾았습니다.\n\n### 3. 코드 구현\n재귀 함수를 이용한 DFS로 구현했습니다.\n\n### 추가 메모\n방향 전환 로직에서 실수가 잦았습니다.',
    createdAt: '2025-11-26 18:00:00',
    updatedAt: '2025-11-26 18:00:00',
  },
  {
    id: 7,
    study: mockStudy,
    user: mockUser4,
    problem: getProblem(1),
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\n구현 및 시뮬레이션 문제입니다.\n\n### 2. 접근 방식\n모든 빈 칸에 대해 가능한 7가지 블록을 모두 넣어보고, M에서 Z까지 연결되는지 확인하는 브루트포스 방식으로도 가능해 보였습니다.\n\n### 3. 코드 구현\n하지만 저는 흐름을 따라가는 방식으로 구현했습니다. 파이썬 딕셔너리로 방향 매핑을 처리했습니다.\n\n### 추가 메모\n테스트 케이스가 좀 더 다양했으면 좋았을 것 같아요.',
    createdAt: '2025-11-26 19:00:00',
    updatedAt: '2025-11-26 19:00:00',
  },

  // 3. 쉬운 계단 수 (2명 풀이)
  {
    id: 8,
    study: mockStudy,
    user: mockUser2,
    problem: getProblem(2),
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\n인접한 모든 자리의 차이가 1인 수를 계단 수라고 합니다. N자리의 계단 수 개수를 구해야 합니다.\n\n### 2. 접근 방식\n전형적인 DP 문제입니다. `dp[i][j]`를 길이가 i이고 마지막 숫자가 j인 계단 수의 개수로 정의했습니다.\n\n### 3. 코드 구현\n`dp[i][j] = dp[i-1][j-1] + dp[i-1][j+1]` 점화식을 사용했습니다. (0과 9일 때 예외 처리)\n\n### 추가 메모\n10억으로 나눈 나머지를 구하는 것을 잊지 말아야 합니다.',
    createdAt: '2025-11-26 10:00:00',
    updatedAt: '2025-11-26 10:00:00',
  },
  {
    id: 9,
    study: mockStudy,
    user: mockUser3,
    problem: getProblem(2),
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\n길이가 N인 계단 수의 개수를 구하는 문제입니다.\n\n### 2. 접근 방식\nBottom-up 방식의 DP를 사용했습니다.\n\n### 3. 코드 구현\n이중 for문을 사용하여 테이블을 채웠습니다. 마지막에 모든 `dp[N][j]` (j=0~9)를 더해서 답을 구했습니다.\n\n### 추가 메모\n중간 연산 과정에서도 모듈러 연산을 해줘야 오버플로우를 방지할 수 있습니다.',
    createdAt: '2025-11-26 11:00:00',
    updatedAt: '2025-11-26 11:00:00',
  },

  // 4. 2xn 타일링 2 (2명 풀이)
  {
    id: 10,
    study: mockStudy,
    user: mockUser1,
    problem: getProblem(3),
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\n2xN 직사각형을 1x2, 2x1, 2x2 타일로 채우는 방법의 수를 구하는 문제입니다.\n\n### 2. 접근 방식\n마지막에 올 수 있는 타일을 기준으로 경우의 수를 나누어 점화식을 세웠습니다.\n\n### 3. 코드 구현\n`dp[n] = dp[n-1] + 2 * dp[n-2]` 점화식을 도출하여 구현했습니다.\n\n### 추가 메모\n기본적인 타일링 문제의 변형입니다.',
    createdAt: '2025-11-26 12:00:00',
    updatedAt: '2025-11-26 12:00:00',
  },
  {
    id: 11,
    study: mockStudy,
    user: mockUser4,
    problem: getProblem(3),
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\nDP 기초 문제입니다.\n\n### 2. 접근 방식\n규칙성을 찾기 위해 N=1, 2, 3일 때를 직접 그려보았습니다.\n\n### 3. 코드 구현\n배열 없이 변수 두 개만으로 스와핑하며 O(N)으로 해결했습니다.\n\n### 추가 메모\n5분 컷 했습니다.',
    createdAt: '2025-11-26 12:30:00',
    updatedAt: '2025-11-26 12:30:00',
  },

  // 5. 테토와 바게트 (2명 풀이)
  {
    id: 12,
    study: mockStudy,
    user: mockUser2,
    problem: getProblem(4),
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\n테토가 바게트를 먹는 최적의 방법을 찾는 문제입니다. 조건이 꽤 복잡하네요.\n\n### 2. 접근 방식\n처음에는 그리디하게 접근하려 했으나, 반례가 존재했습니다. 투 포인터나 슬라이딩 윈도우 쪽으로 생각을 전환해보고 있습니다.\n\n### 3. 코드 구현\n아직 완전한 해결책을 찾지 못해 부분 점수만 받았습니다. 다시 시도해볼 예정입니다.\n\n### 추가 메모\n접근이 쉽지 않네요.',
    createdAt: '2025-11-26 20:00:00',
    updatedAt: '2025-11-26 20:00:00',
  },
  {
    id: 13,
    study: mockStudy,
    user: mockUser3,
    problem: getProblem(4),
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\n우선순위 큐를 활용해야 하는 문제로 보입니다.\n\n### 2. 접근 방식\n조건에 맞는 바게트 조각들을 우선순위 큐에 넣고, 가장 유리한 것부터 꺼내 먹는 방식으로 시뮬레이션했습니다.\n\n### 3. 코드 구현\nJava의 `PriorityQueue`와 사용자 정의 `Comparator`를 구현하여 해결했습니다.\n\n### 추가 메모\n데이터 크기가 커서 시간 복잡도에 유의해야 했습니다.',
    createdAt: '2025-11-26 21:00:00',
    updatedAt: '2025-11-26 21:00:00',
  },
];
