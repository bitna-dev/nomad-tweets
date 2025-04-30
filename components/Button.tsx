import React from "react";

export interface ButtonProps {
  value: string;
}
const Button = ({ value }: ButtonProps) => {
  return <button className=" cursor-pointer primary-btn h-10">{value}</button>;
};

export default Button;
