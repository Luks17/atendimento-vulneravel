import { RoutePermissions } from "@/lib/auth/Permissions";
import { SidebarItem } from "./types";
import RouteProtection from "@/lib/auth/RouteProtection";

export const menuItems: SidebarItem[] = [
  {
    title: "Cidadão",
    list: [
      {
        label: "Registrar Situação",
        icon: "",
        url: "registrar-situacao",
        protection: new RouteProtection(RoutePermissions.IS_NEW_USER, true),
      },
      {
        label: "Solicitar Auxílio",
        icon: "",
        url: "solicitacao-auxilio",
        protection: new RouteProtection(RoutePermissions.HAS_SITUACAO),
      },
    ],
  },
  {
    title: "Administrador",
    list: [
      {
        label: "Pesquisar Vulneráveis",
        icon: "",
        url: "pesquisar-vulneraveis",
        protection: new RouteProtection(RoutePermissions.IS_ADMIN),
      },
      {
        label: "Visualizar Totalizadores",
        icon: "",
        url: "visualizar-totalizadores",
        protection: new RouteProtection(RoutePermissions.IS_ADMIN),
      },
    ],
  },
];
