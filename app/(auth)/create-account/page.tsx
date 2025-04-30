"use client";
import Button from "@components/Button";
import Input from "@components/Input";

import { HiFire } from "react-icons/hi";

const CreateAccount = () => {
  return (
    <div className=" p-20 bg-[#F9F8F7] w-screen h-screen flex flex-col items-center gap-10 ">
      <h1>
        <HiFire className="text-5xl text-red-400" />
      </h1>
      <form
        // action={action}
        className="flex flex-col gap-5 w-full max-w-lg min-w-sm "
      >
        <Input
          type="email"
          required
          placeholder="Email"
          name="email"
          icon="email"
          errors={[]}
        />
        <Input
          type="text"
          required
          placeholder="Username"
          name="username"
          icon="username"
          errors={[]}
        />
        <Input
          type="password"
          required
          placeholder="Password"
          name="password"
          icon="password"
          errors={[]}
        />
        <Input
          type="password"
          required
          placeholder="Confirm Password"
          name="confirmPassword"
          icon="password"
          errors={[]}
        />
        <Button value="Sign Up" />
      </form>
    </div>
  );
};

export default CreateAccount;
