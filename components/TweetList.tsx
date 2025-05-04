"use client";
import React, { useEffect, useRef, useState } from "react";
// import Button from "./Button";
import { getMoreTweets } from "@app/(tabs)/tweet/actions";
import { InitialTweet } from "@app/(tabs)/tweet/page";
import ListTweet from "./ListTweet";

interface TweetListProps {
  initialTweet: InitialTweet;
}
const TweetList = ({ initialTweet }: TweetListProps) => {
  const [tweets, setTweets] = useState(initialTweet);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  // const onLoadMore = async () => {
  //   setIsLoading(true);
  //   const moreProducts = await getMoreProducts(page + 1);
  //   if (moreProducts.length !== 0) {
  //     setPage((prev) => prev + 1);
  //     setProducts((prev) => [...prev, ...moreProducts]);
  //   } else {
  //     setIsLastPage(true);
  //   }
  //   setIsLoading(false);
  // };

  // infinite scrolling
  const trigger = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    // whenever page changes
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);
          const moreTweets = await getMoreTweets(page + 1);
          if (moreTweets.length !== 0) {
            setPage((prev) => prev + 1);
            setTweets((prev) => [...prev, ...moreTweets]);
          } else {
            setIsLastPage(true);
          }
          setIsLoading(false);
        }
      }
    );
    if (trigger.current) {
      observer.observe(trigger.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [page]);
  return (
    <div className="flex flex-col">
      {tweets.map((tweet) => (
        <ListTweet key={tweet.id} {...tweet} />
      ))}
      {isLastPage ? (
        ""
      ) : (
        <span
          style={{ marginTop: `${page + 1 * 300}vh` }}
          ref={trigger}
          className=" mb-96 cursor-pointer primary-btn h-10 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
        >
          {isLoading ? "Loading" : "Load more"}
        </span>
        // Button 형식
        // <Button
        //   disabled={isLoading}
        //   onClick={onLoadMore}
        //   value={isLoading ? "Loading" : "Load More"}
        // />
      )}
    </div>
  );
};

export default TweetList;
