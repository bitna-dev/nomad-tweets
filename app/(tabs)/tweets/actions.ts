"use server";
import db from "@lib/db";
import getSession from "@/lib/session";
import { revalidateTag } from "next/cache";

export const getMoreTweets = async (page: number) => {
  const tweets = await db.tweet.findMany({
    select: {
      tweet: true,
      created_at: true,
      likes: true,
      user: true,
      id: true,
    },
    skip: page * 1,
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
};

export async function likeTweet(tweetId: number) {
  await new Promise((r) => setTimeout(r, 10000));
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        tweetId,
        userId: session.id!,
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (e) {
    console.log(e);
  }
}

export async function dislikeTweet(tweetId: number) {
  await new Promise((r) => setTimeout(r, 10000));
  try {
    const session = await getSession();
    await db.like.delete({
      where: {
        id: {
          tweetId,
          userId: session.id!,
        },
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (e) {
    console.log(e);
  }
}
