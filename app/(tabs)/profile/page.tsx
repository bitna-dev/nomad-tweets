import Button from "@components/Button";
import db from "@lib/db";
import getSession from "@lib/session";
import { redirect } from "next/navigation";
import React from "react";

const getUser = async () => {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    return user;
  }
};
const Profile = async () => {
  const user = await getUser();
  const logout = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };
  return (
    <div>
      <h1>Welcome! {user?.username}</h1>
      <form action={logout}>
        <Button value="Logout" />
      </form>
    </div>
  );
};

export default Profile;
