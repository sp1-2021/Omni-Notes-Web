import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/drive.appdata',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/drive.install',
      ].join(' '),
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
    async session(session, userOrToken) {
      if (!session?.user) {
        return session;
      }

      session.accessToken = userOrToken.accessToken;
      return session;
    },
  },
});
