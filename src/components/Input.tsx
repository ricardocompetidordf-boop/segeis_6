import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessagge?: string;
  name: string;
  placeholder: string;
}

export default function Input({
  label,
  name,
  placeholder,
  errorMessagge,
  type = "text",
  required = true,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-cols">
      <label htmlFor={name} className="text-xl">
        {label}
      </label>
      <input
      className="p-2 rounded-md border-2 border-black w-full"
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        {...props}
      />
      {errorMessagge && <p className="text-sm text-center">{errorMessagge}</p>}
    </div>
  );
}
