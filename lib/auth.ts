/* eslint-disable @typescript-eslint/ban-ts-comment */
import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db/drizzle";
import { accounts, sessions, users, verificationTokens } from "./db/schema";
import Google from "next-auth/providers/google";

const VERCE_DEVELOPMENT = process.env.VERCEL_URL === "development";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          username: profile.email.split("@")[0] + generateRandomString(5),
        };
      },
    }),
  ],
  cookies: {
    sessionToken: {
      name: `${VERCE_DEVELOPMENT ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: VERCE_DEVELOPMENT,
        domain: VERCE_DEVELOPMENT ? process.env.VERCEL_URL : undefined,
      },
    },
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        ...session.user,
        // @ts-expect-error
        id: token.user.id,
        // @ts-expect-error
        username: token?.user?.username,
      };
      return session;
    },
  },
});

function generateRandomString(string: number) {
  return string + Math.random().toString(36).substring(string);
}
