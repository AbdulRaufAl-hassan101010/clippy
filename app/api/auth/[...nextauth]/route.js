import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // get user
      const user = await User.findOne({ email: session.user.email });

      // update user
      session.user.id = user._id.toString();

      return session;
    },
    async signIn({ profile }) {
      try {
        console.log("connecting.....");
        // connect to db
        connectToDB();

        // check if users exists
        const user = await User.findOne({ email: profile.email });

        // if not, create user
        if (!user) {
          const newUser = new User({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });

          await newUser.save();
        }

        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export { handler as GET, handler as POST };
