import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@models/user";
import { connectToDB } from "@utils/database";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
// import { signInWithCredentials } from "@action/authActions";

connectToDB();

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@gmail.com", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        const user = await signInWithCredentials({ email, password });
        console.log("user in credential login", user);
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      // console.log("accoutn", account, "profile", profile);
      if (account.type === "oauth") {
        // console.log("google type");
        return await signInWithOAuth({ account, profile });
      }
      return true;
    },
    async jwt({ token, trigger, session }) {
      // console.log("token", token);
      const user = await getUserByEmail({ email: token.email });
      token.user = user;
      return token;
    },
    async session({ session, token }) {
      // console.log("session", session, "token", token);
      session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// ------------------------
async function signInWithOAuth({ account, profile }) {
  const user = await User.findOne({ email: profile.email });
  if (user) return true; //user login

  const newUser = new User({
    username: profile.name,
    email: profile.email,
  });
  // console.log("new user", newUser);
  await newUser.save();
}

async function getUserByEmail({ email }) {
  const user = await User.findOne({ email }).select("-password");
  if (!user) throw Error("email or password dose not exist in get by email");
  return user;
}

async function signInWithCredentials({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("email or password does not match");

  const compare = await bcrypt.compare(password, user.password);
  if (!compare) throw new Error("Email or password does not match");
  return { ...user._doc, _id: user._id.toString() };
}
