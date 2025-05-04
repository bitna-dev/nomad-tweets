"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { HiOutlinePaperAirplane, HiOutlineUser, HiUser } from "react-icons/hi";
import { HiMiniPaperAirplane } from "react-icons/hi2";
import { IoHome, IoHomeOutline } from "react-icons/io5";

const TabBar = () => {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 w-full mx-auto max-w-screen-md grid grid-cols-3 border-neutral-600 border-t px-5 py-3 *:text-black">
      <Link href="/home" className="flex flex-col items-center gap-px">
        {pathname === "/home" ? (
          <IoHome className="w-7 h-7" />
        ) : (
          <IoHomeOutline className="w-7 h-7" />
        )}
        <span>Home</span>
      </Link>
      <Link href="/tweet" className="flex flex-col items-center gap-px">
        {pathname === "/tweet" ? (
          <HiMiniPaperAirplane className="w-7 h-7" />
        ) : (
          <HiOutlinePaperAirplane className="w-7 h-7" />
        )}
        <span>Tweet</span>
      </Link>
      <Link href="/profile" className="flex flex-col items-center gap-px">
        {pathname === "/profile" ? (
          <HiUser className="w-7 h-7" />
        ) : (
          <HiOutlineUser className="w-7 h-7" />
        )}
        <span>프로필</span>
      </Link>
    </div>
  );
};

export default TabBar;
