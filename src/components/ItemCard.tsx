import React from 'react'

interface ItemCardProps {
    title: string;
    content: React.ReactNode;
    actions: React.ReactNode;
    border: string;
    className?: string;
}

export default function ItemCard( {title, content, className, actions, border}: ItemCardProps) {
  return (
    <div className={` gap-2 flex flex-col border-t-4 shadow-xl hover:shadow-2xl transition-shadow p-5 rounded-md ${border} ${className}`}>
        <h3 className='text-3xl text-custom-black'>{title}</h3>
        <div>{content}</div>
        {actions && <div className='flex justify justify-between'>{actions}</div> }
    </div>
  )
}
