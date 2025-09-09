"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import ItemCard from "@/components/ItemCard";
import { user } from "@/lib/user";
import Link from "next/link";
import React, { useState } from "react";
import { deleteUser } from "../actions/deleteUser";

interface UserListCardProps {
  users: user[];
}

export default function userListCard({ users }: UserListCardProps) {
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<number | null>(null);

  const handleAction = (id_usuario: number) => {
    setModal(id_usuario)
  }

  const handleCancelAction = () => {
    setModal(null)
  }
  const handleConfirm = async () => {
    if(modal === null) return;
    const result = await deleteUser(modal)
    setModal(null)
  }

  const filteredUsers = users.filter(
    (u) =>
      u.pessoa.nome_completo.toLowerCase().includes(search.toLowerCase()) ||
      u.perfil.titulo_perfil.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="flex flex-col gap-5">
      <Input
        label={""}
        placeholder="Filtre usuarios por nome ou perfil"
        name={"filter"}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredUsers.length === 0 ? (
        <p
          className="text-3xl text-cente
        "
        >
          Nenhum Usuário foi encontrado
        </p>
      ) : (
        <div className="grid cols grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredUsers.map((u) => (
            <div key={u.id_usuario}>
              <ItemCard
                title={u.pessoa.nome_completo}
                content={
                  <>
                    <p className="text-xl text-right">{u.pessoa.email}</p>
                    <p className="text-xl text-right">
                      {u.perfil.titulo_perfil}
                    </p>
                  </>
                }
                actions={
                  <>
                    <Link
                      className="text-2xl text-custom-blue hover:underline"
                      href={`/dashboard/usuarios/${u.id_usuario}/editar`}
                    >
                      Editar
                    </Link>
                    <Button
                      variant="danger"
                      type="button"
                      onClick={() => handleAction(u.id_usuario)}
                    >
                      {"Deletar"}
                    </Button>
                  </>
                }
                border={"border-custom-blue"}
              />
            </div>
          ))}
        </div>
      )}

      {modal !== null && (
        <div className="flex flex-col center bg-custom-white ">
            <p className="text-xl">Tem certeza que quer deletar o item?</p>
            <div className="flex">
            {" "}
          <Button
            variant="primary"
            type="button"
            className="w-1/2"
            onClick={handleCancelAction}
          >
            {"Cancelar"}
          </Button>{" "}
          <Button
            variant="danger"
            type="button"
            className="w-1/2"
            onClick={handleConfirm}
          >
            {"Deletar"}
          </Button>
            </div>
        </div>
      )}
    </div>
  );
}
