import db from "@lib/db";
import getSession from "@lib/session";
import { formatToWon } from "@lib/util";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

const getIsOwner = async (userId: number) => {
  const session = await getSession();
  if (session.id) {
    return session.id == userId;
  }
};
const getProduct = async (id: number) => {
  const product = db.tweet.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          bio: true,
        },
      },
    },
  });
  return product;
};

const TweetDetail = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  const product = await getProduct(id);

  if (isNaN(id)) return notFound();
  if (!product) return notFound();

  const isOwner = await getIsOwner(product.userId);

  return (
    <div>
      <div className="relative aspect-square">
        <Image fill src={product.photo} alt={product.title} />
      </div>
      <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
        <div className="size-10 rounded-full flex justify-center items-center">
          {product.user.avatar !== null ? (
            <Image
              src={product.user.avatar}
              width={40}
              height={40}
              alt={product.user.username}
              className="rounded-full"
            />
          ) : (
            <FaUserCircle />
          )}
        </div>
        <div>
          <h3>{product.user.username}</h3>
        </div>
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p>{product.description}</p>
      </div>
      <div className="fixed w-full bottom-0 left-0 p-5 pb-10 bg-neutral-800 flex justify-between items-center">
        <span className="font-semibold text-xl text-white">
          {formatToWon(product.price)}원
        </span>
        {isOwner ? (
          <button className="cursor-pointer bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">
            Delete product
          </button>
        ) : null}
        <Link
          className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold"
          href={``}
        >
          채팅하기
        </Link>
      </div>
    </div>
  );
};

export default TweetDetail;
