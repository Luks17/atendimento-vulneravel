import { RoutePermissions } from "@/lib/auth/Permissions";
import type { SidebarItem } from "./types";
import RouteProtection from "@/lib/auth/RouteProtection";

export const menuItems: SidebarItem[] = [
  {
    title: "Cidadão",
    list: [
      {
        label: "Registrar Situação",
        icon: "",
        url: "situacao/registrar",
        protection: new RouteProtection(RoutePermissions.IS_NEW_USER, true),
      },
      {
        label: "Visualizar Situação",
        icon: "",
        url: "situacao/visualizar",
        protection: new RouteProtection(RoutePermissions.HAS_SITUACAO),
      },
      {
        label: "Registrar Solicitação Auxílio",
        icon: "",
        url: "solicitacao-auxilio/registrar",
        protection: new RouteProtection(RoutePermissions.HAS_SITUACAO),
      },
      {
        label: "Visualizar Solicitações Auxílio",
        icon: "",
        url: "solicitacao-auxilio/listar",
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
