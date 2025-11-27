import type { SolutionNoteResponse } from '../types/solutionDto';
import { MOCK_PROBLEMS } from './mockProblem';
import { MOCK_STUDY } from './mockStudy';
import { MOCK_USER_1, MOCK_USER_2, MOCK_USER_3, MOCK_USER_4 } from './mockUser';

const getProblemById = (id: number) => MOCK_PROBLEMS.find((p) => p.id === id);

export const MOCK_SOLUTION_NOTES: SolutionNoteResponse[] = [
  {
    id: 1,
    study: MOCK_STUDY,
    user: MOCK_USER_4,
    problem: getProblemById(109)!, // 미로 탐색
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\n(1, 1)에서 (N, M)으로 이동하는 최단 경로의 칸 수를 구해야 합니다.\n\n### 2. 접근 방식\n가중치가 없는 최단 경로는 BFS가 제격입니다.\n\n### 3. 코드 구현\n`deque`를 사용했고, `visited` 배열에 거리를 저장하는 방식으로 구현했습니다.\n\n### 추가 메모\n시작 위치도 칸 수에 포함됨을 유의해야 합니다.',
    createdAt: '2025-11-27 09:12:41',
    updatedAt: '2025-11-27 09:12:41',
  },
  {
    id: 2,
    study: MOCK_STUDY,
    user: MOCK_USER_1,
    problem: getProblemById(106)!, // 1로 만들기
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\n정수 X에 사용할 수 있는 3가지 연산을 사용하여 1을 만드는데, 연산 횟수의 최솟값을 구하는 문제입니다.\n\n### 2. 접근 방식\nBottom-up 방식의 DP로 접근했습니다. 작은 수부터 1로 만드는 최소 횟수를 저장해나갔습니다.\n\n### 3. 코드 구현\n`dp[i] = dp[i-1] + 1`로 초기화 후, 2나 3으로 나누어 떨어지는 경우 `Math.min`으로 갱신했습니다.\n\n### 추가 메모\nGreedy하게 풀면 안되는 대표적인 예제입니다.',
    createdAt: '2025-11-27 09:45:22',
    updatedAt: '2025-11-27 09:45:22',
  },
  {
    id: 3,
    study: MOCK_STUDY,
    user: MOCK_USER_2,
    problem: getProblemById(113)!, // 연구소
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\n벽을 3개 세워 바이러스가 퍼지지 않는 안전 영역의 최댓값을 구해야 합니다.\n\n### 2. 접근 방식\n벽을 세울 수 있는 모든 경우의 수(조합)에 대해 BFS를 수행했습니다.\n\n### 3. 코드 구현\n3중 for문(또는 재귀)으로 벽을 선택하고, 그때마다 BFS로 바이러스를 퍼뜨려 안전 영역을 셌습니다.\n\n### 추가 메모\nN, M이 작아서 브루트포스가 가능했습니다.',
    createdAt: '2025-11-27 10:23:15',
    updatedAt: '2025-11-27 10:23:15',
  },
  {
    id: 4,
    study: MOCK_STUDY,
    user: MOCK_USER_3,
    problem: getProblemById(107)!, // DFS와 BFS
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\n기본적인 그래프 탐색 문제입니다.\n\n### 2. 접근 방식\n인접 리스트(ArrayList[])를 사용했습니다. 정렬이 필요합니다.\n\n### 3. 코드 구현\n각 정점의 연결 리스트를 오름차순 정렬한 뒤 탐색을 진행했습니다.\n\n### 추가 메모\nScanner 대신 BufferedReader를 사용했습니다.',
    createdAt: '2025-11-27 11:05:33',
    updatedAt: '2025-11-27 11:05:33',
  },
  {
    id: 5,
    study: MOCK_STUDY,
    user: MOCK_USER_1,
    problem: getProblemById(108)!, // 회의실 배정
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\n사용할 수 있는 회의의 최대 개수를 구하는 문제입니다.\n\n### 2. 접근 방식\n그리디 알고리즘입니다. 끝나는 시간이 빠른 순서대로 정렬해야 합니다.\n\n### 3. 코드 구현\n끝나는 시간이 같다면 시작 시간이 빠른 순으로 정렬했습니다. 그 후 순회하며 겹치지 않는 회의를 선택했습니다.\n\n### 추가 메모\n정렬 기준이 핵심인 문제입니다.',
    createdAt: '2025-11-27 11:40:12',
    updatedAt: '2025-11-27 11:40:12',
  },
  {
    id: 6,
    study: MOCK_STUDY,
    user: MOCK_USER_4,
    problem: getProblemById(111)!, // AC
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\nR(뒤집기), D(버리기) 연산을 수행하는 언어 AC를 구현해야 합니다.\n\n### 2. 접근 방식\n실제로 배열을 뒤집으면 시간 초과가 납니다. `reverse` 플래그를 사용하여 앞/뒤 어디서 뺄지만 결정했습니다.\n\n### 3. 코드 구현\n`collections.deque`의 `popleft`와 `pop`을 활용했습니다.\n\n### 추가 메모\n빈 배열에서 D 연산 시 에러 처리가 중요합니다.',
    createdAt: '2025-11-27 12:30:55',
    updatedAt: '2025-11-27 12:30:55',
  },
  {
    id: 7,
    study: MOCK_STUDY,
    user: MOCK_USER_2,
    problem: getProblemById(110)!, // 토마토
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\n모든 토마토가 익는데 걸리는 최소 일수를 구하는 문제입니다. 동시에 여러 곳에서 익기 시작합니다.\n\n### 2. 접근 방식\nMulti-source BFS입니다. 처음에 익은 토마토를 모두 큐에 넣고 시작합니다.\n\n### 3. 코드 구현\n큐가 빌 때까지 반복하며 최대 일수를 갱신했습니다. 마지막에 안 익은 토마토가 있는지 확인합니다.\n\n### 추가 메모\n-1 출력 조건을 잘 확인해야 합니다.',
    createdAt: '2025-11-27 13:15:20',
    updatedAt: '2025-11-27 13:15:20',
  },
  {
    id: 8,
    study: MOCK_STUDY,
    user: MOCK_USER_4,
    problem: getProblemById(106)!, // 1로 만들기
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\nDP 문제입니다.\n\n### 2. 접근 방식\n재귀함수와 메모이제이션(Top-down)을 사용했습니다. `sys.setrecursionlimit` 설정이 필요할 수 있습니다.\n\n### 3. 코드 구현\n딕셔너리를 사용하여 이미 계산한 값을 저장했습니다.\n\n### 추가 메모\n파이썬에서는 Bottom-up이 조금 더 빠를 수 있습니다.',
    createdAt: '2025-11-27 13:55:40',
    updatedAt: '2025-11-27 13:55:40',
  },
  {
    id: 9,
    study: MOCK_STUDY,
    user: MOCK_USER_2,
    problem: getProblemById(115)!, // 보석 도둑
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\n가방에 담을 수 있는 무게 제한이 있고, 보석의 가격을 최대로 만들어야 합니다.\n\n### 2. 접근 방식\n보석과 가방을 모두 오름차순 정렬합니다. 작은 가방부터 채울 수 있는 보석 중 가장 비싼 것을 담습니다.\n\n### 3. 코드 구현\n가방을 순회하면서 현재 가방 용량 이하인 보석을 모두 Max-Heap(Priority Queue)에 넣고, 힙의 Top을 꺼내 결과에 더했습니다.\n\n### 추가 메모\nO(NlogN)으로 해결해야 합니다.',
    createdAt: '2025-11-27 14:40:11',
    updatedAt: '2025-11-27 14:40:11',
  },
  {
    id: 10,
    study: MOCK_STUDY,
    user: MOCK_USER_3,
    problem: getProblemById(109)!, // 미로 탐색
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\nBFS 문제입니다.\n\n### 2. 접근 방식\nPoint 클래스를 만들어서 큐에 넣었습니다.\n\n### 3. 코드 구현\n상하좌우 델타 배열을 만들어 이동 가능 여부를 체크했습니다.\n\n### 추가 메모\n인덱스 범위 체크를 꼼꼼히 해야 합니다.',
    createdAt: '2025-11-27 15:10:25',
    updatedAt: '2025-11-27 15:10:25',
  },
  {
    id: 11,
    study: MOCK_STUDY,
    user: MOCK_USER_1,
    problem: getProblemById(112)!, // N-Queen
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\nN x N 체스판 위에 퀸 N개를 서로 공격하지 않게 놓는 문제입니다.\n\n### 2. 접근 방식\n대표적인 백트래킹 문제입니다. 한 행에는 하나의 퀸만 놓을 수 있다는 성질을 이용했습니다.\n\n### 3. 코드 구현\n1차원 배열 `cols[row] = col`로 상태를 표현하고, 대각선 검사는 `Math.abs`를 이용했습니다.\n\n### 추가 메모\nN=14까지라 최적화가 꽤 필요합니다.',
    createdAt: '2025-11-27 16:05:50',
    updatedAt: '2025-11-27 16:05:50',
  },
  {
    id: 12,
    study: MOCK_STUDY,
    user: MOCK_USER_2,
    problem: getProblemById(107)!, // DFS와 BFS
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\n그래프를 DFS로 탐색한 결과와 BFS로 탐색한 결과를 출력하는 문제입니다.\n\n### 2. 접근 방식\n정점의 개수가 적어서 인접 행렬을 사용했습니다. DFS는 재귀, BFS는 큐를 사용했습니다.\n\n### 3. 코드 구현\n방문할 수 있는 정점이 여러 개인 경우 정점 번호가 작은 것을 먼저 방문해야 하므로 반복문 순서에 유의했습니다.\n\n### 추가 메모\n초기화 실수로 몇 번 틀렸네요.',
    createdAt: '2025-11-27 17:00:30',
    updatedAt: '2025-11-27 17:00:30',
  },
  {
    id: 13,
    study: MOCK_STUDY,
    user: MOCK_USER_3,
    problem: getProblemById(114)!, // 아기 상어
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\n상어가 물고기를 잡아먹으며 성장하는 시뮬레이션 문제입니다. 조건이 많습니다.\n\n### 2. 접근 방식\n매 단계마다 BFS로 먹을 수 있는 물고기까지의 거리를 구하고, 조건(거리, 위, 왼쪽)에 맞는 물고기를 찾아 이동했습니다.\n\n### 3. 코드 구현\nPriorityQueue를 사용하여 같은 거리일 때 위쪽, 그 다음 왼쪽 우선순위를 처리했습니다.\n\n### 추가 메모\n구현량이 많아 실수가 잦을 수 있는 문제입니다.',
    createdAt: '2025-11-27 18:20:15',
    updatedAt: '2025-11-27 18:20:15',
  },
  {
    id: 14,
    study: MOCK_STUDY,
    user: MOCK_USER_2,
    problem: getProblemById(108)!, // 회의실 배정
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\nActivity Selection Problem입니다.\n\n### 2. 접근 방식\nC++의 `vector<pair<int, int>>`를 사용하고 커스텀 `cmp` 함수를 만들어 정렬했습니다.\n\n### 3. 코드 구현\n`sort` 함수 활용이 중요했습니다.\n\n### 추가 메모\n끝나는 시간 정렬 증명은 귀류법으로 가능합니다.',
    createdAt: '2025-11-27 19:15:45',
    updatedAt: '2025-11-27 19:15:45',
  },
  {
    id: 15,
    study: MOCK_STUDY,
    user: MOCK_USER_1,
    problem: getProblemById(110)!, // 토마토
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\nBFS 응용 문제입니다.\n\n### 2. 접근 방식\n익은 토마토가 있는 위치를 모두 큐에 넣는 것이 핵심입니다.\n\n### 3. 코드 구현\n2차원 배열을 순회하며 초기 큐 세팅을 하고 BFS를 돌렸습니다.\n\n### 추가 메모\n토마토가 하나도 없는 경우는 없다고 가정했습니다.',
    createdAt: '2025-11-27 20:05:10',
    updatedAt: '2025-11-27 20:05:10',
  },
  {
    id: 16,
    study: MOCK_STUDY,
    user: MOCK_USER_4,
    problem: getProblemById(113)!, // 연구소
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\n삼성 SW 역량 테스트 기출 문제입니다.\n\n### 2. 접근 방식\n파이썬의 `itertools.combinations`로 벽을 세울 빈 칸 3개를 뽑았습니다.\n\n### 3. 코드 구현\n매 시뮬레이션마다 지도를 복사(`deepcopy`)해서 사용했습니다. 시간 복잡도가 조금 걱정되었지만 통과했습니다.\n\n### 추가 메모\nPypy3로 제출했습니다.',
    createdAt: '2025-11-27 21:30:22',
    updatedAt: '2025-11-27 21:30:22',
  },
  {
    id: 17,
    study: MOCK_STUDY,
    user: MOCK_USER_3,
    problem: getProblemById(111)!, // AC
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\n문자열 파싱과 덱(Deque) 활용 문제입니다.\n\n### 2. 접근 방식\n입력 형식이 `[1,2,3,4]` 형태라 파싱에 신경써야 합니다.\n\n### 3. 코드 구현\n`StringTokenizer`를 사용해 파싱하고, boolean 변수로 방향을 제어했습니다.\n\n### 추가 메모\n출력 형식을 맞추는 것도 까다로웠습니다.',
    createdAt: '2025-11-27 22:45:05',
    updatedAt: '2025-11-27 22:45:05',
  },

  // --- 11월 28일 (ID 18 ~ 30: 기존 유지) ---
  {
    id: 18,
    study: MOCK_STUDY,
    user: MOCK_USER_2,
    problem: getProblemById(103)!,
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\n인접한 모든 자리의 차이가 1인 수를 계단 수라고 합니다. N자리의 계단 수 개수를 구해야 합니다.\n\n### 2. 접근 방식\n전형적인 DP 문제입니다. `dp[i][j]`를 길이가 i이고 마지막 숫자가 j인 계단 수의 개수로 정의했습니다.\n\n### 3. 코드 구현\n`dp[i][j] = dp[i-1][j-1] + dp[i-1][j+1]` 점화식을 사용했습니다. (0과 9일 때 예외 처리)\n\n### 추가 메모\n10억으로 나눈 나머지를 구하는 것을 잊지 말아야 합니다.',
    createdAt: '2025-11-28 10:04:11',
    updatedAt: '2025-11-28 10:04:11',
  },
  {
    id: 19,
    study: MOCK_STUDY,
    user: MOCK_USER_3,
    problem: getProblemById(103)!,
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\n길이가 N인 계단 수의 개수를 구하는 문제입니다.\n\n### 2. 접근 방식\nBottom-up 방식의 DP를 사용했습니다.\n\n### 3. 코드 구현\n이중 for문을 사용하여 테이블을 채웠습니다. 마지막에 모든 `dp[N][j]` (j=0~9)를 더해서 답을 구했습니다.\n\n### 추가 메모\n중간 연산 과정에서도 모듈러 연산을 해줘야 오버플로우를 방지할 수 있습니다.',
    createdAt: '2025-11-28 10:56:32',
    updatedAt: '2025-11-28 10:56:32',
  },
  {
    id: 20,
    study: MOCK_STUDY,
    user: MOCK_USER_1,
    problem: getProblemById(104)!,
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\n2xN 직사각형을 1x2, 2x1, 2x2 타일로 채우는 방법의 수를 구하는 문제입니다.\n\n### 2. 접근 방식\n마지막에 올 수 있는 타일을 기준으로 경우의 수를 나누어 점화식을 세웠습니다.\n\n### 3. 코드 구현\n`dp[n] = dp[n-1] + 2 * dp[n-2]` 점화식을 도출하여 구현했습니다.\n\n### 추가 메모\n기본적인 타일링 문제의 변형입니다.',
    createdAt: '2025-11-28 12:03:45',
    updatedAt: '2025-11-28 12:03:45',
  },
  {
    id: 21,
    study: MOCK_STUDY,
    user: MOCK_USER_4,
    problem: getProblemById(104)!,
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\nDP 기초 문제입니다.\n\n### 2. 접근 방식\n규칙성을 찾기 위해 N=1, 2, 3일 때를 직접 그려보았습니다.\n\n### 3. 코드 구현\n배열 없이 변수 두 개만으로 스와핑하며 O(N)으로 해결했습니다.\n\n### 추가 메모\n5분 컷 했습니다.',
    createdAt: '2025-11-28 12:38:19',
    updatedAt: '2025-11-28 12:38:19',
  },
  {
    id: 22,
    study: MOCK_STUDY,
    user: MOCK_USER_1,
    problem: getProblemById(101)!,
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\n폴리큐브는 1x1x1 큐브가 면끼리 접해있는 도형입니다. 주어진 큐브들의 좌표를 통해 겉넓이를 구해야 합니다.\n\n### 2. 접근 방식\n3차원 배열을 사용하여 큐브가 존재하는 위치를 마킹합니다. 각 큐브의 6면을 검사하여 인접한 칸이 비어있으면 겉넓이에 추가하는 방식으로 해결했습니다.\n\n### 3. 코드 구현\n`visited` 3차원 배열과 6방향 델타 탐색을 활용하여 구현했습니다.\n\n### 추가 메모\n좌표 범위가 작아서 배열로 충분히 가능했습니다.',
    createdAt: '2025-11-28 14:07:55',
    updatedAt: '2025-11-28 14:07:55',
  },
  {
    id: 23,
    study: MOCK_STUDY,
    user: MOCK_USER_2,
    problem: getProblemById(101)!,
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\nN개의 큐브가 주어질 때 전체 겉넓이를 구하는 문제입니다. 겹치는 면은 겉넓이에서 제외됩니다.\n\n### 2. 접근 방식\n단순하게 모든 큐브의 면(6*N)에서 서로 맞닿아 있는 면의 개수 * 2를 빼는 방식으로 접근했습니다.\n\n### 3. 코드 구현\nSet 자료구조를 사용하여 큐브의 존재 여부를 빠르게 확인했습니다.\n\n### 추가 메모\n좌표 압축은 필요 없었습니다.',
    createdAt: '2025-11-28 15:32:10',
    updatedAt: '2025-11-28 15:32:10',
  },
  {
    id: 24,
    study: MOCK_STUDY,
    user: MOCK_USER_3,
    problem: getProblemById(101)!,
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\n3D 공간에서의 기하학적 문제입니다.\n\n### 2. 접근 방식\n객체 지향적으로 `Cube` 클래스를 정의하고, `isAdjacent` 메서드를 구현하여 인접 여부를 판단했습니다.\n\n### 3. 코드 구현\nJava의 클래스 구조를 활용하여 깔끔하게 구현하려고 노력했습니다.\n\n### 추가 메모\n자바로 구현하니 코드가 좀 길어지긴 했네요.',
    createdAt: '2025-11-28 16:15:22',
    updatedAt: '2025-11-28 16:15:22',
  },
  {
    id: 25,
    study: MOCK_STUDY,
    user: MOCK_USER_4,
    problem: getProblemById(101)!,
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\n겉넓이 구하기 문제입니다.\n\n### 2. 접근 방식\n파이썬의 `set`을 활용하여 좌표를 저장하고, 각 큐브마다 6방향을 확인하여 `set`에 없는 경우 카운트했습니다.\n\n### 3. 코드 구현\n`count += 1 for d in directions if (x+dx, y+dy, z+dz) not in cubes`\n\n### 추가 메모\n파이썬 Set이 역시 편하네요.',
    createdAt: '2025-11-28 16:48:05',
    updatedAt: '2025-11-28 16:48:05',
  },
  {
    id: 26,
    study: MOCK_STUDY,
    user: MOCK_USER_1,
    problem: getProblemById(102)!,
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\n끊어진 가스관을 찾아 적절한 블록으로 채우는 시뮬레이션 문제입니다.\n\n### 2. 접근 방식\n시작점(M, Z)에서 가스가 흐르는 방향을 따라가다가 끊긴 지점을 찾습니다. 해당 지점에서 필요한 블록의 모양을 유추합니다.\n\n### 3. 코드 구현\n각 블록(`|`, `-`, `+`, `1`, `2`, `3`, `4`)별로 연결 가능한 방향을 비트마스크로 정의하여 구현했습니다.\n\n### 추가 메모\n분기 처리가 까다로워서 상수로 정의해두는 게 좋았습니다.',
    createdAt: '2025-11-28 17:12:33',
    updatedAt: '2025-11-28 17:12:33',
  },
  {
    id: 27,
    study: MOCK_STUDY,
    user: MOCK_USER_2,
    problem: getProblemById(102)!,
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\n유럽의 가스관 연결 문제입니다. 해커가 하나를 지웠다고 하네요.\n\n### 2. 접근 방식\nDFS를 사용하여 파이프를 따라 이동했습니다. 좌표 범위를 벗어나거나 파이프가 없는 곳에 도달했을 때, 주변 파이프와 연결될 수 있는 모양을 찾았습니다.\n\n### 3. 코드 구현\n재귀 함수를 이용한 DFS로 구현했습니다.\n\n### 추가 메모\n방향 전환 로직에서 실수가 잦았습니다.',
    createdAt: '2025-11-28 18:05:47',
    updatedAt: '2025-11-28 18:05:47',
  },
  {
    id: 28,
    study: MOCK_STUDY,
    user: MOCK_USER_4,
    problem: getProblemById(102)!,
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\n구현 및 시뮬레이션 문제입니다.\n\n### 2. 접근 방식\n모든 빈 칸에 대해 가능한 7가지 블록을 모두 넣어보고, M에서 Z까지 연결되는지 확인하는 브루트포스 방식으로도 가능해 보였습니다.\n\n### 3. 코드 구현\n하지만 저는 흐름을 따라가는 방식으로 구현했습니다. 파이썬 딕셔너리로 방향 매핑을 처리했습니다.\n\n### 추가 메모\n테스트 케이스가 좀 더 다양했으면 좋았을 것 같아요.',
    createdAt: '2025-11-28 19:22:14',
    updatedAt: '2025-11-28 19:22:14',
  },
  {
    id: 29,
    study: MOCK_STUDY,
    user: MOCK_USER_2,
    problem: getProblemById(105)!,
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\n테토가 바게트를 먹는 최적의 방법을 찾는 문제입니다. 조건이 꽤 복잡하네요.\n\n### 2. 접근 방식\n처음에는 그리디하게 접근하려 했으나, 반례가 존재했습니다. 투 포인터나 슬라이딩 윈도우 쪽으로 생각을 전환해보고 있습니다.\n\n### 3. 코드 구현\n아직 완전한 해결책을 찾지 못해 부분 점수만 받았습니다. 다시 시도해볼 예정입니다.\n\n### 추가 메모\n접근이 쉽지 않네요.',
    createdAt: '2025-11-28 20:15:09',
    updatedAt: '2025-11-28 20:15:09',
  },
  {
    id: 30,
    study: MOCK_STUDY,
    user: MOCK_USER_3,
    problem: getProblemById(105)!,
    content:
      '## 문제 풀이\n\n### 1. 문제 분석\n우선순위 큐를 활용해야 하는 문제로 보입니다.\n\n### 2. 접근 방식\n조건에 맞는 바게트 조각들을 우선순위 큐에 넣고, 가장 유리한 것부터 꺼내 먹는 방식으로 시뮬레이션했습니다.\n\n### 3. 코드 구현\nJava의 `PriorityQueue`와 사용자 정의 `Comparator`를 구현하여 해결했습니다.\n\n### 추가 메모\n데이터 크기가 커서 시간 복잡도에 유의해야 했습니다.',
    createdAt: '2025-11-28 21:08:56',
    updatedAt: '2025-11-28 21:08:56',
  },
];
