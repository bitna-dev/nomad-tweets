import React from "react";
import { FaGithub } from "react-icons/fa";
import { IoChatbubbleEllipses } from "react-icons/io5";
import Link from "next/link";

interface SocialProp {
  icon: string;
  value: string;
}
const SocialButton = ({ icon, value, ...rest }: SocialProp) => {
  return (
    <Link
      href={`/icon`}
      className="primary-btn flex h-10 items-center justify-center gap-2"
      {...rest}
    >
      <span className="h-6 w-6">{Icons(icon)}</span>
      <span>{value}</span>
    </Link>
  );
};

const Icons = (icon: string) => {
  if (icon == "github") return <FaGithub />;
  if (icon == "sms") return <IoChatbubbleEllipses />;
};
export default SocialButton;
