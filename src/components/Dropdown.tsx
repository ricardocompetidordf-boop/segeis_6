import React, { SelectHTMLAttributes } from "react";

interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  errorMessagge?: string;
  name: string;
  placeholder: string;
  options: { label: string; value: string }[];
}

export default function Dropdown({
  label,
  name,
  placeholder,
  errorMessagge,
  required = true,
  options,
  ...props
}: DropdownProps) {
  return (
    <div className="flex flex-cpls">
      <label htmlFor={name} className="text-xl">
        {label}
      </label>
      <select
        className="p-2 rounded-md border-2 border-black"
        name={name}
        id={name}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {errorMessagge && <p className="text-sm text-center">{errorMessagge}</p>}
    </div>
  );
}
