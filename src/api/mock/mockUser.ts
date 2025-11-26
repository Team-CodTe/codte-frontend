import { type UserResponse } from '../types/userDto';
import { Provider } from '../types/userDto';

export const mockUser1: UserResponse = {
  id: 1,
  username: '강동우',
  email: 'kdw34441360@gmail.com',
  nickname: '코테초보',
  provider: Provider.GOOGLE,
  bojUsername: 'alsdn1360',
  profileImgUrl: 'https://github.com/shadcn.png',
  createdAt: '2025-01-01',
};

export const mockUser2: UserResponse = {
  id: 2,
  username: '이상훈',
  email: 'dltkdgns830@naver.com',
  nickname: '알고리즘마스터',
  provider: Provider.GITHUB,
  bojUsername: 'dltkdgns830',
  profileImgUrl: 'https://github.com/shadcn.png',
  createdAt: '2025-01-02',
};

export const mockUser3: UserResponse = {
  id: 3,
  username: '김수인',
  email: 'waterperosn@google.com',
  nickname: '자바깎는노인',
  provider: Provider.GOOGLE,
  bojUsername: 'waterperson',
  profileImgUrl: 'https://github.com/shadcn.png',
  createdAt: '2025-01-03',
};

export const mockUser4: UserResponse = {
  id: 4,
  username: '이기현',
  email: 'leekki@naver.com',
  nickname: '파이썬조아',
  provider: Provider.GITHUB,
  bojUsername: 'a1522',
  profileImgUrl: 'https://github.com/shadcn.png',
  createdAt: '2025-01-04',
};

export const mockUser5: UserResponse = {
  id: 5,
  username: '김진영',
  email: 'joannekim@google.com',
  nickname: '문과지만코테를풀겠어요',
  provider: Provider.GOOGLE,
  bojUsername: 'joanne',
  profileImgUrl: 'https://github.com/shadcn.png',
  createdAt: '2025-01-05',
};

export const mockUsers: UserResponse[] = [
  mockUser1,
  mockUser2,
  mockUser3,
  mockUser4,
  mockUser5,
];
