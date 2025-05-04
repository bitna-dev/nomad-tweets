"use client";
import Button from "@components/Button";
import Input from "@components/Input";

import { HiFire } from "react-icons/hi";
import { createAccount } from "./actions";
import { useActionState } from "react";

const CreateAccount = () => {
  const [state, action] = useActionState(createAccount, null);
  return (
    <div className=" p-20 bg-[#F9F8F7] w-screen h-screen flex flex-col items-center gap-10 ">
      <h1>
        <HiFire className="text-5xl text-red-400" />
      </h1>
      <form
        action={action}
        className="flex flex-col gap-5 w-full max-w-lg min-w-sm "
      >
        <Input
          type="email"
          required
          placeholder="Email"
          name="email"
          icon="email"
          errors={state?.fieldErrors.email}
          defaultValue={state?.values?.email as string}
        />
        <Input
          type="text"
          required
          placeholder="Username"
          name="username"
          icon="username"
          errors={state?.fieldErrors.username}
          defaultValue={state?.values?.username as string}
        />
        <Input
          type="password"
          required
          placeholder="Password"
          name="password"
          icon="password"
          errors={state?.fieldErrors.password}
          defaultValue={state?.values?.password as string}
        />
        <Input
          type="password"
          required
          placeholder="Confirm Password"
          name="confirm_password"
          icon="password"
          errors={state?.fieldErrors.confirm_password}
          defaultValue={state?.values?.confirm_password as string}
        />
        <Button value="Sign Up" />
      </form>
    </div>
  );
};

export default CreateAccount;
