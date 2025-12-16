import 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    id: string;
    provider?: string;
    email?: string;
    username?: string;
    bojUsername?: string;
    profileImgUrl?: string;
    createdAt?: string;
  }

  interface Session {
    provider?: string;
    accessToken?: string;
    user: User & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    provider?: string;
    accessToken?: string;
    id: string;
    email?: string;
    username?: string;
    bojUsername?: string;
    profileImgUrl?: string;
    createdAt?: string;
  }
}
