import { connectToDB } from "@utils/database";
import NextAuth from "next-auth";
import GooogleProvider from "next-auth/providers/google";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GooogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });

      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      
      try {
        await connectToDB();
        // check if user exists
        const userExists = await User.findOne({ email: profile.email });
        // check if user does not exists
        if (!userExists) {
          await User.create({
            email: profile.email,
            username:
              profile.name.replace(" ", "").toLowerCase() +
              (Date.now() % 1000).toString(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
