import Button from "@/components/Button";
import UserListCard from "./dashboard/usuarios/components/UserListCard";
import { listUsers } from "./dashboard/usuarios/actions/listUsers";
import Link from "next/link";

export default async function Home() {
  const users = await listUsers()
  return (
    <div className="flex flex-col min-h-screen w-full gap-5 jus">
      <div className="flex flex-col md:flex-row justify-between items-center">
      <h1 className="text-5xl">Gerenciar Usuários</h1>
      <Link href={"/dashboard/usuarios/criar"}><Button children={"Novo usuário"} type="button"/>
</Link>      </div>
      <UserListCard users={users} />
    </div>
  );
}
