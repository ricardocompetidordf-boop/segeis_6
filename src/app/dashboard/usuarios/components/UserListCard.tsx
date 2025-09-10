"use client"

import Button from '@/components/Button'
import Input from '@/components/Input'
import { user } from '@/lib/user'
import Link from 'next/link'
import React, { useState } from 'react'

interface UserListCardProps {
    users: user[],
}

export default function UserListCard({users}: UserListCardProps) {
    const [search, setSearch] = useState("")

    const filteredItems = users.filter(
        (i) => i.pessoa.nome_completo.toLowerCase().includes(search.toLowerCase()) ||
        i.perfil.titulo_perfil.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <div className='flex flex-col w-full min-h-screen'>
        <Input label={''} errorMessagge={''} name={'filtros'} placeholder={'Filtre por nome de usuário ou  perfil'} onChange={(e) => setSearch(e.target.value)} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-5 gap-5">

        {filteredItems.length === 0 ? <h1 className="text-3xl text-center">"Nehum usuário encontrado"</h1> :
                          (filteredItems.map((i) => (
                              <div key={i.id_usuario} className='rounded-md border-t-4 border-custom-blue shadow-md hover:shadow-lg transition-shado flex flex-col p-5'
                              >
                <h1 className="text-2xl font-semibold">{i.pessoa.nome_completo}</h1>
                <p className="text-xl ">{i.pessoa.email}</p>
                <p className="text-xl ">{i.perfil.titulo_perfil}</p>

                <div className='flex items-center justify-between'>
                <Link className="text-xl text-custom-blue hover:underline" href={`/dashboard/usuarios/${i.id_usuario}/editar`}> Editar</Link>
                    <Button variant={'danger'} className={''}>Deletar</Button>
                </div>
            </div>
        ) ))
    }

    </div>
    </div>
  )
}

