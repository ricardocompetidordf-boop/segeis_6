import prisma from "@/lib/prisma";

export async function listUsers() {
    const users = await prisma.usuario.findMany({
        include: {
            pessoa: true,
            perfil: true
        }
    })
    return users;
    console.log(users)
}
