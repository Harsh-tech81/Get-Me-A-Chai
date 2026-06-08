import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import mongoose from "mongoose";
import User from "@/models/User.js";
import Payment from "@/models/Payment.js";
import connectDB from "@/db/connectDb.js";
export const authOptions = {
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (
        account.provider === "github" ||
        account.provider === "google"       ) {
        // connect to database
        await connectDB();
        // check if user exists
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          // create new user
          const newUser = await User.create({
            email: user.email,
            username: user.email.split("@")[0],
          });
        }
        return true;
      }
    },
    async session({ session, token, user }) {
      const dbUser = await User.findOne({ email: session.user.email });
      session.user.name = dbUser.username;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
