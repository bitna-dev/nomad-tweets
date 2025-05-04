import { formatToTimeAgo } from "@lib/util";
import Link from "next/link";
import React from "react";
import { CiHeart } from "react-icons/ci";

interface TweetProps {
  tweet: string;
  created_at: Date;
  id: number;
}
const ListTweet = ({ tweet, created_at, id }: TweetProps) => {
  return (
    <Link href={`/products/${id}`} className="flex gap-4 items-center p-4 ">
      <div className="relative size-28 overflow-hidden rounded-md">
        {/* <Image fill src={bio} alt={username} className="object-cover" /> */}
      </div>
      <div className="flex flex-col gap-1 *:text-black">
        <span className="text-lg">{tweet}</span>
        <span className="text-sm text-neutral-500">
          {formatToTimeAgo(created_at.toString())}
        </span>
        <span className="flex items-center gap-0.5">
          <CiHeart />
          <span className="text-xs">3</span>
        </span>
      </div>
    </Link>
  );
};

export default ListTweet;
