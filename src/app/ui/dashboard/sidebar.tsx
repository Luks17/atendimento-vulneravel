interface SidebarItem {
  title: string,
  list: SidebarLink[]
}

interface SidebarLink {
  label: string,
  icon: string,
}

const menuItems: SidebarItem[] = [
  {
    title: "Cidadão",
    list: [
      {
        label: "Cadastrar Vulnerável",
        icon: "",
      }
    ]
  },
  {
    title: "Administrador",
    list: [
      {
        label: "Pesquisar Vulneráveis",
        icon: "",
      },
      {
        label: "Visualizar Totalizadores",
        icon: "",
      }
    ]
  }
]

function Sidebar() {
  return (
    <aside className="min-h-screen bg-base-300 w-72">
      <div className="sticky top-0 text-center p-5 font-bold text-xl">Sidebar Title</div>
      <ul className="menu">
        {menuItems.map((item, i) => <li key={i}>
          <h6>{item.title}</h6>
          <SidebarLinks sidebarLinks={item.list} />
        </li>)}
      </ul>
    </aside>
  )
}

function SidebarLinks({ sidebarLinks }: { sidebarLinks: SidebarLink[] }) {
  return (
    <ul className="rounded-box">
      {sidebarLinks.map((item, i) => <li key={i}>
        <a href="#">{item.icon}{item.label}</a>
      </li>)}
    </ul>
  )
}

export default Sidebar;
