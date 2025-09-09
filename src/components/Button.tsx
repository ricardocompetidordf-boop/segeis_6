import clsx from 'clsx';
import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: string;
    className?: string;
}


export default function Button({type = "submit",className, variant = "primary", children, ...props}: ButtonProps) {
  return (
    <button className={
      clsx(
        "p-2 text-white font-semibold text-xl rounded-md",
        {
          "bg-custom-blue" : variant === "primary",
          "bg-custom-pink" : variant === "danger",
        },
        className
      )
    } type={type} {...props}>{children}</button>
  )
}
