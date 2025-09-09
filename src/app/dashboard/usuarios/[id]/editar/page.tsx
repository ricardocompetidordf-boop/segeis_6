"use server"

import prisma from '@/lib/prisma';
import UpdateUserForm from '../../components/UpdateFormUser'

export default async function page({params}:{params: Promise<{ id: string}>}) {
    const { id } = await params;

    const user = await prisma.usuario.findUnique({
        where: {id_usuario: Number(id)},
        include: { pessoa: true, perfil: true}
    })

    if (!user) return <div className="text-custom-orange">"Usuário não encontrado"</div>

  return (
    <div className='flex justify-center items-center'>
        <UpdateUserForm user={user}/>
    </div>
  )
}

