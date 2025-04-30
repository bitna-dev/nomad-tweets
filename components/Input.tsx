import React from "react";

interface InputProps {
  type: string;
  placeholder: string;
  required: boolean;
  name: string;
  errors?: string[];
}

const Input = ({
  type,
  placeholder,
  required,
  errors,
  name,
  ...rest
}: InputProps) => {
  return (
    <div className="flex flex-col">
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        name={name}
        {...rest}
        className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-2 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400 pl-3"
      />
      {errors?.map((error, idx) => (
        <span className="text-red-500 font-medium" key={idx}>
          {error}
        </span>
      ))}
    </div>
  );
};

export default Input;
