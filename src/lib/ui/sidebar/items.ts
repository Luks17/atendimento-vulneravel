import { RoutePermissions } from "@/lib/auth/Permissions";
import { SidebarItem } from "./types";

export const menuItems: SidebarItem[] = [
  {
    title: "Cidadão",
    list: [
      {
        label: "Registrar Situação",
        icon: "",
        url: "registrar-situacao",
      },
      {
        label: "Solicitar Auxílio",
        icon: "",
        url: "solicitacao-auxilio",
      },
    ],
    protection: RoutePermissions.IS_NEW_USER,
  },
  {
    title: "Administrador",
    list: [
      {
        label: "Pesquisar Vulneráveis",
        icon: "",
        url: "pesquisar-vulneraveis",
      },
      {
        label: "Visualizar Totalizadores",
        icon: "",
        url: "visualizar-totalizadores",
      },
    ],
    protection: RoutePermissions.IS_ADMIN,
  },
];
