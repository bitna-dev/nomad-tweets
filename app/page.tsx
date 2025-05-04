import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6">
      <div className="my-auto flex flex-col items-center gap-2 *:font-medium">
        <span className="text-9xl">💙</span>
        <h1 className="text-4xl ">Nomad Tweets</h1>
        <h2 className="text-2xl">Welcome to Nomad Tweets</h2>
      </div>

      <div className="flex flex-col items-center gap-3 w-full">
        <Link
          href="/create-account"
          className="primary-btn text-lg py-2.5 max-w-md"
        >
          Sign Up
        </Link>
        <div className="flex gap-2">
          <span>Have you registered already?</span>
          <Link href="/login" className="hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
