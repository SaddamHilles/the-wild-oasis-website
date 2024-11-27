import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
// import Facebook from 'next-auth/providers/facebook';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
  },
  pages: {
    signIn: '/login',
  },
});

// const authConfig = {
//   providers: [],
// };
