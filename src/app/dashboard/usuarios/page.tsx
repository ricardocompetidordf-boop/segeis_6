
import React from "react";
import UserListCard from "./components/UserListCard";
import prisma from "@/lib/prisma";
import Button from "@/components/Button";

export default async function page() {
    const users = await prisma.usuario.findMany({
        include: { pessoa: true, perfil: true },
      });
  return (
    <div className="flex flex-col w-full min-h-screen gap-4">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-4xl">Gerenciar usuários</h1>
        <Button className={""}>Novo usuário</Button>
      </div>
      <UserListCard users={users} />
    </div>
  );
}
