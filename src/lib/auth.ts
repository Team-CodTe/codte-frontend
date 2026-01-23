import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

const SESSION_MAX_AGE = 7 * 60 * 60 * 24;

export const { handlers, auth } = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: SESSION_MAX_AGE,
  },
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ account, token, user }) {
      if (account && user) {
        token.provider = account.provider;
        token.accessToken = account.access_token;
      }

      return token;
    },
    async session({ token, session }) {
      if (token.provider && token.accessToken) {
        session.provider = token.provider as string;
        session.accessToken = token.accessToken as string;
      }

      return session;
    },
  },
});
