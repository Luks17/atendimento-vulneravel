import { SidebarItem } from "./types";

export const menuItems: SidebarItem[] = [
  {
    title: "Cidadão",
    list: [
      {
        label: "Cadastrar Vulnerável",
        icon: "",
        url: "cadastrar-vulneravel"
      }
    ]
  },
  {
    title: "Administrador",
    list: [
      {
        label: "Pesquisar Vulneráveis",
        icon: "",
        url: "pesquisar-vulneraveis"
      },
      {
        label: "Visualizar Totalizadores",
        icon: "",
        url: "visualizar-totalizadores"
      }
    ]
  }
]
