"use server";

import { FormState } from "@/lib/formState";
import prisma from "@/lib/prisma";

export async function deleteUser(id_usuario: number
): Promise<FormState> {

  if (!id_usuario || isNaN(id_usuario)) {
    return { success: false, message: "Id inválido" };
  }
  try {
    const result = await prisma.$transaction(async (tx) => {
      let user = await tx.usuario.findUnique({
        where: { id_usuario },
      });

      if (!user) {
        return { success: false, message: "Usuário não encontrado" };
      }
      const deletedUser = await tx.usuario.delete({
        where: { id_usuario: id_usuario },
      });
      return { success: true, message: "Usuário deletado com sucesso" };
    });
    return result;
  } catch (error: any) {
    console.log(error);
    if (error.code === "P2025") {
      return { success: false, message: "Usuário não encontrado no sistema" };
    }
  }
  return { success: false, message: "Não foi possível deletar usuário" };
}
