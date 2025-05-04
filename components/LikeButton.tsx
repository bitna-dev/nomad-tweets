"use client";
import { dislikeTweet, likeTweet } from "@app/(tabs)/tweets/actions";
import { startTransition, useOptimistic } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
}

export const LikeButton = ({
  isLiked,
  likeCount,
  tweetId,
}: LikeButtonProps) => {
  const [state, reducerFn] = useOptimistic(
    { isLiked, likeCount },
    (previousState, payload) => ({
      isLiked: !previousState.isLiked,
      likeCount: previousState.isLiked
        ? previousState.likeCount - 1
        : previousState.likeCount + 1,
    })
  );
  const onClick = async () => {
    startTransition(() => {
      reducerFn(undefined);
    });
    if (isLiked) {
      await dislikeTweet(tweetId);
    } else {
      await likeTweet(tweetId);
    }
  };
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-neutral-400 text-sm "
    >
      {state.isLiked ? (
        <FaHeart className="size-5" />
      ) : (
        <FaRegHeart className="size-5" />
      )}
      {state.isLiked ? (
        <span> {state.likeCount}</span>
      ) : (
        <span>{state.likeCount}</span>
      )}
    </button>
  );
};
