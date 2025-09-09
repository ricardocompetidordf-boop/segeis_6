import React, { SelectHTMLAttributes } from 'react'

interface ButtonProps extends SelectHTMLAttributes<HTMLSelectElement> {
    options: {label: string, value: string}[],
    label: string;
    placeholder: string;
}

export default function Input({placeholder, options, label, name, required=true, defaultValue, ...props}: ButtonProps) {
  return (
    <div className='flex flex-col '>
        <label htmlFor={name}>{label}</label>
        <select className='p-2 border-2 rounded md border-black w-full'  name={name}>
        <option value="">{placeholder}</option>
        {options.map((opt)=> (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
        </select>

    </div>
    )
}

