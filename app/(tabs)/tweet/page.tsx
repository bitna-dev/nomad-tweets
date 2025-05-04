import TweetList from "@components/TweetList";
import db from "@lib/db";
import { Prisma } from "@prisma/client";
import React from "react";

const getInitialTweet = async () => {
  const tweets = await db.tweet.findMany({
    select: {
      tweet: true,
      created_at: true,
      Like: true,
      id: true,
    },
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
};

// 프리즈마한테 어떤 타입인지 알려달라고 하는 것
export type InitialTweet = Prisma.PromiseReturnType<typeof getInitialTweet>;

const Tweet = async () => {
  const initialTweet = await getInitialTweet();
  return (
    <div>
      <TweetList initialTweet={initialTweet} />
    </div>
  );
};

export default Tweet;
