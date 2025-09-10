import Dropdown from '@/components/Dropdown'
import Input from '@/components/Input'
import { FormState } from '@/lib/formState'
import React, { useActionState } from 'react'
import InputMasked from '../../../../components/InputMasked'

export default function CreateFormUser() {
    const initialState: FormState = {success: false, message: ""}
    const [state, dispatch] = useActionState(createuser, initialState)

    const profile = [
        {label: "Administrador", value: "Administrador"},
        {label: "Vendedor", value: "Vendedor"},
        {label: "Validador", value: "Validador"},
    ]

  return (


    <form action={dispatch} className="w-full md:w-auto p-5 border-2 border-custom-blue rounded md">
        <Input label={'Nome'} name={'nome_completo'} placeholder={'Digite o nome completo'}/>
        <Input label={'Email:'} name={'email'} placeholder={'Digite o email'}/>
        <InputMasked label={"CPF:"} name={'cpf'} placeholder={'Digite seu cpf'} mask={"000.000.000-00"}/>        <Input label={'Senha:'} type='password' name={'senha'} placeholder={'Digite a senha'}/>
        <Dropdown/>

    </form>
  )
}
