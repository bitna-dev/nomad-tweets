"use server";

import db from "@lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import getSession from "@lib/session";
const checkPassword = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

// checking username unique
const checkUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(user);
};

// checking email unique
const checkUserEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(user);
};

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string",
        required_error: "Where is your username?",
      })
      .min(5, "Username should be more than 5 letters")
      .max(10, "Username should be shoter than 10 letters")
      .trim()
      .refine(checkUsername, "This username is already taken."),
    email: z
      .string()
      .email()
      .toLowerCase()
      .trim()
      .refine(
        checkUserEmail,
        "This email is already registered in our system."
      ),
    password: z.string().min(4),
    confirm_password: z.string().min(4),
  })
  .refine(checkPassword, {
    message: "Both passwords should be equal",
    path: ["confirm_password"],
  });

export const createAccount = async (prevState: any, formData: FormData) => {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return {
      fieldErrors: result.error.flatten().fieldErrors,
      values: data,
    };
  } else {
    // hash password
    const hashedPW = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPW,
      },
    });
    const session = await getSession();
    session.id = user.id;
    await session.save();

    redirect("/profile");
  }
};
