"use server";
import db from "@lib/db";

export const getMoreTweets = async (page: number) => {
  const products = await db.tweet.findMany({
    select: {
      tweet: true,
      created_at: true,
      Like: true,
      user: true,
      id: true,
    },
    skip: page * 1,
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
};
