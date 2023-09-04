"use server";

import { authOptions } from "@app/api/auth/[...nextauth]/route";
import User from "@models/user";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { generateToken, verifyToken } from "./../utils/token";
import { sendEmail } from "@utils/sendEmail";
// import sendEmail from "@utils/sendEmail";

const BASE_URL = process.env.NEXTAUTH_URL;

export async function signUpCredentials({ username, email, password }) {
  try {
    //     console.log("username", username);
    const user = await User.findOne({ email });
    //     throw new Error("hudai error dilam");
    if (user) {
      throw new Error("email allready exists");
    }
    if (password) {
      password = await bcrypt.hash(password, 12);
    }
    const token = generateToken({ username, email, password });

    await sendEmail({
      to: email,
      url: `${BASE_URL}/verify?token=${token}`,
      text: "Verify email",
    });
    //     console.log("token", token);

    return { msg: "sing up success chek your email to complete the registration" };
  } catch (error) {
    console.log("error", error);
    // redirect(`/errors?error=${error.message}`);
  }
}

export async function verifyWithCredentials(token) {
  try {
    const user = verifyToken(token);
    //     console.log("user", user);
    const userExist = await User.findOne({ email: user.email });
    if (userExist) {
      return { msg: "Verify success" };
    }
    const newUser = new User(user);
    await newUser.save();

    return { msg: "verify success" };
  } catch (error) {
    console.log("error", error);
    redirect(`/errors?error=${error.message}`);
  }
}
