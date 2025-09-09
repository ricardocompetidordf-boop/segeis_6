"use server"

import { FormState } from "@/lib/formState";
import { NewUserForm, userSchema } from "../schemas/userSchema";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function createUser(prevState: FormState, formData: FormData) {
  const validateData = userSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validateData.success) {
    return { success: false, message: validateData.error.issues[0]?.message ?? "Erro na validação"};
  }

  const { nome_completo, email, cpf, senha, perfil } =
    validateData.data as NewUserForm;

  const profile = await prisma.perfil.findUnique({
    where: { titulo_perfil: perfil },
  });

  if (!profile) {
    return { success: false, message: "Perfil inválido" };
  }
  try {
    const result = await prisma.$transaction(async (tx) => {
      let person = await tx.pessoa.findUnique({
        where: { cpf },
      });

      if (!person) {
        person = await tx.pessoa.create({
          data: {
            nome_completo,
            email,
            cpf,
          },
        });
      }

      const existingUser = await tx.usuario.findUnique({
        where: { pessoa_id_pessoa: person.id_pessoa },
      });

      if (existingUser) {
        return { success: false, message: "Usuário já cadastrado no sistema" };
      }

      const hash = await bcrypt.hash(senha, 12);

      const createdUser = await tx.usuario.create({
        data: {
          senha: hash,
          pessoa_id_pessoa: person.id_pessoa,
          perfil_id_perfil: profile.id_perfil,
          criador_id_usuario: 1,
        },
      });

      if(!createdUser) {
        return { success: false, message: "Erro ao cadastrar usuário" }; 
      }
      revalidatePath("/dashboar/usuarios")
      return { success: true, message: "Usuário criado com sucesso" };
    });
    return result;
  } catch (error: any) {
    console.log(error);
    if (error.code === "P2002") {
      return { success: false, message: "Usuário já cadastrado no sistema" };
    }
  }
  return { success: false, message: "Não foi possível cadastrar usuário" };
}
