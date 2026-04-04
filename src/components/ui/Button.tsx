import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  children: React.ReactNode;
}

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  const base =
    "text-sm rounded-lg px-4 py-2 font-medium transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-[#ffc008] hover:bg-[#e6ad00] text-gray-900",
    ghost:
      "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
