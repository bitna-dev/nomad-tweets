import React from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail, MdKey } from "react-icons/md";

interface InputProps {
  type: string;
  placeholder: string;
  name: string;
  required?: boolean;
  errors?: string[];
  icon?: string;
  defaultValue?: string;
}

const Input = ({
  type,
  placeholder,
  name,
  required,
  errors = [],
  icon = "",
  defaultValue = "",
  ...rest
}: InputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 relative justify-center">
        {Icons(icon)}
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          required={required}
          defaultValue={defaultValue}
          {...rest}
          className="border border-gray-200 h-12 rounded-3xl p-3 w-full focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 outline-none focus:border-gray-300 pl-10 transition"
        />
      </div>
      {errors?.map((error, idx) => (
        <p key={idx} className="text-red-400 text-xs font-medium pl-5">
          {error}
        </p>
      ))}
    </div>
  );
};

const Icons = (icon: string) => {
  if (icon == "email")
    return <MdEmail className="absolute left-4 text-gray-500" />;
  if (icon == "password")
    return <MdKey className="absolute left-4 text-gray-500" />;
  if (icon == "username")
    return <FaUser className="absolute left-4 text-gray-500" />;
};
export default Input;
