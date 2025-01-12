import { createGuest, getGuest } from '@/services/data-services';
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
    authorized({ auth }) {
      return !!auth?.user;
    },
    async signIn({ user }) {
      try {
        const existingGuest = await getGuest(user?.email!);
        console.log('existingGuest: ', existingGuest);

        if (!existingGuest) {
          await createGuest({ email: user.email, fullName: user.name });
        }
        return true;
      } catch (er) {
        return false;
      }
    },
    async session({ session }) {
      const quest = await getGuest(session.user.email);
      session.user.id = quest?.id!;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});

// const authConfig = {
//   providers: [],
// };
