import { User } from "@prisma/client";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../utils/prisma";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      //@ts-ignore
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        // perform you login logic
        // find out user from db
        const savedUser:User | null = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (savedUser?.password !== password) {
          throw new Error("invalid credentials");
        }
        // if everything is fine
        return {
          email: email,
          password: password
        };
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET
};

export default NextAuth(authOptions);