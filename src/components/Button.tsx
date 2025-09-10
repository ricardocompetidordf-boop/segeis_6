import clsx from "clsx";
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
  className?: string;
}

export default function Button({
  variant = "primary",
  className,
  type = "submit",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "rounded-md p-2 text-white font-semibold",
        {
          "bg-custom-blue": variant === "primary",
          "bg-custom-pink": variant === "danger",
          "bg-custom-green": variant === "success",
          "bg-custom-orange": variant === "alert",
        },
        className
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
