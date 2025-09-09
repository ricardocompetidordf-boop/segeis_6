import { usuario, perfil, pessoa } from "@prisma/client";

export interface user extends usuario {
    perfil: perfil;
    pessoa: pessoa,
}
