import React, { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    errorMessage?: string;
    name: string;
    placeholder: string;
}


export default function Input({label, type = "text", required = true, defaultValue, placeholder, errorMessage, name, ...props}: InputProps) {
  return (
    <div>
        <label htmlFor={name}>{label}</label>
        <input name={name} className='p-2 border-2 rounded md border-black w-full' type={type} required={required} placeholder={placeholder} defaultValue={defaultValue} {...props}/>
        {errorMessage &&  <p className='text-sm text-custom-orange'>{errorMessage}</p> }
    </div>
  )
}
