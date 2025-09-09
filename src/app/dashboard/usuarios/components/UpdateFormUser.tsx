"use client"

import Button from '@/components/Button'
import Dropdown from '@/components/Dropdown'
import Input from '@/components/Input'
import { FormState } from '@/lib/formState'
import { user } from '@/lib/user'
import React, { useActionState } from 'react'
import { updateUser } from '../actions/updateUser'

interface UpdateFormUserProps {
    user: user;
}

export default function UpdateUserForm({user}: UpdateFormUserProps) {
    const initialState: FormState = {
        success: false,
        message: ""
    }
    const [state, dispatch, isPending] = useActionState(updateUser, initialState);

    const profile = [
        {label: "Administrador", value: "Administrador"},
        {label: "Vendedor", value: "Vendedor"},
        {label: "Validador", value: "Validador"},
    ]

  return (
    <form className='flex flex-col w-full md:w-auto gap-5  border-4 rounded-md border-custom-blue p-5' action={dispatch}>
        <h1 className="text-4xl text-center text-custom-blue">Atualizar Usuário</h1>
        <input type="hidden" name="id_usuario" value={user.id_usuario} />

        <Input label={"Nome:"} name={'nome_completo'}placeholder='Digite o nome completo'  defaultValue={user.pessoa.nome_completo}/>
        <Input label={'Email:'} name={'email'} placeholder='Digite o email completo' defaultValue={user.pessoa.email}/>
        <Input label={'CPF:'} name={'cpf'} placeholder='Digite o CPF ' defaultValue={user.pessoa.cpf}/>
        <Input label={'Senha'} type='password' name={'senha'} placeholder='Digite a senha' defaultValue={user.senha}/>
        <Dropdown options={profile} label={'Perfil:'} name='perfil' placeholder={'Selecione um perfil'} defaultValue={user.perfil.titulo_perfil}/>
        <Button>{"Criar"}</Button>
        {state.success === false ? <p className='text-sm text-center text-custom-orange'>{state.message}</p> : <p className='text-sm text-center text-custom-green'>{state.message}</p> }
    </form>
  )
}
