import { HiFire } from "react-icons/hi";
import Button from "@components/Button";
import Input from "@components/Input";
import Link from "next/link";

export default function Home() {
  //   const [state, action] = useActionState(LoginAccount, null);
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
          type="password"
          required
          placeholder="Password"
          name="password"
          icon="password"
          errors={[]}
        />
        <Button value="Login" />
      </form>
      <Link className="hover:underline" href="/create-account">
        Have not joined yet?
      </Link>
    </div>
  );
}
