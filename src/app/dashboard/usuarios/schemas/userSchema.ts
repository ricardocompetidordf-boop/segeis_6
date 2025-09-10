import z from "zod";

export const userSchema = z.object({
    nome_completo: z.string().min(4, "Digite o nome completo"),
    email: z.email().min(4, "Digite o email"),
    cpf: z.string().min(4, "Digite o cpf"),
    senha: z.string().min(4, "Digite a senha"),
    perfil: z.string().min(4, "Digite o perfil"),
})


export type NewUserData = z.infer<typeof userSchema>