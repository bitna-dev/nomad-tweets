"use server";

import db from "@lib/db";
import getSession from "@lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcrypt";
const checkEmailExist = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};
const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .trim()
    .refine(checkEmailExist, "A account with this email does not exist."),
  password: z.string().min(4),
});

export const loginAccount = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return {
      fieldErrors: result.error.flatten().fieldErrors,
      values: data,
    };
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        password: true,
        id: true,
      },
    });
    const passwordStatus = await bcrypt.compare(
      result.data.password,
      user!.password ?? ""
    );
    if (passwordStatus) {
      const session = await getSession();
      session.id = user?.id;
      await session.save();
      redirect("/profile");
    } else {
      return {
        fieldErrors: {
          password: ["Wrong password."],
          email: [],
        },
        values: data,
      };
    }
    // if the user is found check the password hash
    // log the user in redirect
  }
};
