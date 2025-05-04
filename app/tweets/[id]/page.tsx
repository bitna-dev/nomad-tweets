import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToTimeAgo } from "@lib/util";

import { revalidatePath } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const getTweets = async (id: number) => {
  try {
    const post = await db.tweet.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
      include: {
        user: {
          select: {
            username: true,
            bio: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });
    return post;
  } catch (e) {
    console.log(e);
    return null;
  }
};

async function getIsLiked(tweetId: number) {
  const session = await getSession();
  const like = await db.like.findUnique({
    where: {
      id: {
        tweetId,
        userId: session.id!,
      },
    },
  });
  return Boolean(like);
}

const TweetDetail = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const tweet = await getTweets(id);
  if (!tweet) {
    return notFound();
  }
  const likePost = async () => {
    "use server";
    const session = await getSession();
    try {
      await db.like.create({
        data: {
          tweetId: id,
          userId: session.id!,
        },
      });
      revalidatePath(`/tweets/${id}`);
    } catch (e) {
      console.log(e);
    }
  };
  const dislikePost = async () => {
    "use server";
    try {
      const session = await getSession();
      await db.like.delete({
        where: {
          id: {
            tweetId: id,
            userId: session.id!,
          },
        },
      });
      revalidatePath(`/post/${id}`);
    } catch (e) {
      console.log(e);
    }
  };
  const isLiked = await getIsLiked(id);
  return (
    <div className="p-5 text-black">
      <div className="flex items-center gap-2 mb-2">
        <Image
          width={28}
          height={28}
          className="size-7 rounded-full"
          src={tweet.user.bio!}
          alt={tweet.user.username}
        />
        <div>
          <span className="text-sm font-semibold">{tweet.user.username}</span>
          <div className="text-xs">
            <span>{formatToTimeAgo(tweet.created_at.toString())}</span>
          </div>
        </div>
      </div>
      <h2 className="text-lg font-semibold">{tweet.tweet}</h2>
      <p className="mb-5">{}</p>
      <div className="flex gap-5 items-center *:text-sm">
        <div className="flex items-center gap-2 text-neutral-400 text-sm">
          <MdOutlineRemoveRedEye className="size-5" />
          <span>조회 {tweet.views}</span>
        </div>
        <form action={isLiked ? dislikePost : likePost}>
          <button
            className={`flex items-center gap-2 text-neutral-400 text-sm p-2 cursor-pointer`}
          >
            <FaRegHeart className="size-5" />
            <span>{tweet._count.likes}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default TweetDetail;
