interface ButtonProps {
  value: string;
}

const Button = ({ value }: ButtonProps) => {
  return (
    <button className="primary-btn disabled:bg-neutral-400 disabled:text-gray-300 disabled:cursor-not-allowed px-4 ">
      {value}
    </button>
  );
};

export default Button;
