import z from "zod";

export const userSchema = z.object({
    nome_completo: z.string().min(4, "Insira um nome válido"),
    email: z.email().min(4, "Insira um email válido"),
    cpf: z.string().length(11),
    senha: z.string().min(6, "Insira um senha válida"),
    perfil: z.string().min(4, "Insira um perfil válido"),
})

export type NewUserForm = z.infer<typeof userSchema>;

export type NewUserFormUpdate = Partial<NewUserForm>




