"use server";

import { FormState } from "@/lib/formState";
import { NewUserForm, userSchema } from "../schemas/userSchema";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function updateUser(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validateData = userSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validateData.success) {
    return {
      success: false,
      message: validateData.error.issues[0]?.message ?? "Dados inválidos",
    };
  }

  const id_usuario = Number(formData.get("id_usuario"));

  if (!id_usuario || isNaN(id_usuario)) {
    return { success: false, message: "Id inválido" };
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
      let user = await tx.usuario.findUnique({
        where: { id_usuario },
        include: {
          pessoa: true,
        },
      });

      if (!user) {
        return { success: false, message: "Usuário não encontrado" };
      }

      const updatePerson = await tx.pessoa.update({
        where: { id_pessoa: user.pessoa_id_pessoa },
        data: {
          nome_completo,
          email,
          cpf,
        },
      });

      let finalPsw = user.senha;
      const equalPsw = bcrypt.compare(senha, user.senha);

      if (!equalPsw) {
        finalPsw = await bcrypt.hash(senha, 12);
      }

      const hash = await bcrypt.hash(senha, 12);

      const createdUser = await tx.usuario.update({
        where: { id_usuario: id_usuario || 1 },
        data: {
          senha: hash,
          perfil_id_perfil: profile.id_perfil,
        },
      });

      if (!createdUser) {
        return { success: false, message: "Erro ao atualizado usuário" };
      }
      
      revalidatePath("/dashboar/usuarios")

      return { success: true, message: "Usuário atualizado com sucesso" };
    });
    return result;
  } catch (error: any) {
    console.log(error);
    if (error.code === "P2002") {
      return { success: false, message: "Usuário já atualizado no sistema" };
    }
  }
  return { success: false, message: "Não foi possível atualizar usuário" };
}
