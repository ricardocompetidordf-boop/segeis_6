import React from "react";
import { IMaskInput } from 'react-imask';



interface InputMaskedProps  {
  label: string;
  errorMessagge?: string;
  name: string;
  placeholder: string;
  mask,
}

export default function Input({
  label,
  name,
  placeholder,
  errorMessagge,
  mask,

}: InputMaskedProps) {
  return (
    <div className="flex flex-cols">
      <label htmlFor={name} className="text-xl">
        {label}
      </label>
      <IMaskInput
      className="p-2 rounded-md border-2 border-black w-full"
        name={name}
        placeholder={placeholder}
        required
        mask={mask}
        unmask={true}
      />
      {errorMessagge && <p className="text-sm text-center">{errorMessagge}</p>}
    </div>
  );
}
