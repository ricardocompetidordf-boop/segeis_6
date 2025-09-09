"use client"

import Button from '@/components/Button'
import Dropdown from '@/components/Dropdown'
import Input from '@/components/Input'
import { FormState } from '@/lib/formState'
import React, { useActionState } from 'react'
import { createUser } from '../actions/createUser'

export default function CreateFormUser() {
    const initialState: FormState = {
        success: false,
        message: ""
    }
    const [state, dispatch, isPending] = useActionState(createUser, initialState);

    const profile = [
        {label: "Administrador", value: "Administrador"},
        {label: "Vendedor", value: "Vendedor"},
        {label: "Validador", value: "Validador"},
    ]

  return (
    <form className='flex flex-col w-full md:w-auto gap-5  border-4 rounded-md border-custom-blue p-5' action={dispatch}>
        <h1 className="text-4xl text-center text-custom-blue">Cadastro de Usuário</h1>
        <Input label={"Nome:"} name={'nome_completo'}placeholder='Digite o nome completo' />
        <Input label={'Email:'} name={'email'} placeholder='Digite o email completo'/>
        <Input label={'CPF:'} name={'cpf'} placeholder='Digite o CPF'/>
        <Input label={'Senha'} name={'senha'} placeholder='Digite a senha'/>
        <Dropdown options={profile} label={'Perfil:'} name='perfil' placeholder={'Selecione um perfil'}/>
        <Button>{"Criar"}</Button>
        {state.success === false ? <p className='text-sm text-center text-custom-orange'>{state.message}</p> : <p className='text-sm text-center text-custom-green'>{state.message}</p> }
    </form>
  )
}
