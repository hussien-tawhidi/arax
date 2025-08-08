import { dbConnect } from "@/libs/db";
import Otp from "@/models/Otp";
import User from "@/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Define your user type
interface User {
  id: string;
  phone: string;
  name?: string | null;
  email?: string | null;
  role: string;
  
}

// Extend the default session user type
declare module "next-auth" {
  interface Session {
    user: User;
  }

  // Also extend the User type in next-auth
  interface User {
    role: string;
    phone: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone", type: "text" },
        code: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("اطلاعات نامعتبر است");
        }

        const { phone, code } = credentials;
        if (!phone || !code) {
          throw new Error("شماره یا کد وارد نشده است");
        }

        await dbConnect();

        const otp = await Otp.findOne({ phone, code });
        if (!otp || otp.expiresAt < new Date()) {
          throw new Error("کد نامعتبر است یا منقضی شده است");
        }

        const user = await User.findOne({ phone });
        if (!user) {
          throw new Error("کاربری یافت نشد");
        }

        await Otp.deleteOne({ _id: otp._id });

        return {
          id: user._id.toString(),
          phone: user.phone,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.phone = user.phone;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.phone = token.phone as string;
      }
      return session;
    },
  },
});
