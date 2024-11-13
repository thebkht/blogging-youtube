/* eslint-disable @typescript-eslint/ban-ts-comment */
import NextAuth, { type DefaultSession } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db/drizzle";
import { accounts, sessions, users, verificationTokens } from "./db/schema";
import Google from "next-auth/providers/google";

const VERCE_DEVELOPMENT = process.env.VERCEL_URL === "development";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */

      id: string;
      username: string;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }
}

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
    session: async ({ session, user }) => {
      session.user = {
        ...session?.user,
        id: user?.id,
        // @ts-expect-error
        username: user?.username,
      };
      return session;
    },
  },
});

function generateRandomString(string: number) {
  return string + Math.random().toString(36).substring(string);
}
