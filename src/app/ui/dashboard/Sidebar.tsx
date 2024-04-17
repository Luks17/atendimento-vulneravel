import Link from "next/link";
import type { SidebarLink } from "@/lib/sidebar/types";
import { menuItems } from "@/lib/sidebar/items";

function Sidebar() {
  return (
    <aside className="min-h-screen bg-base-300 text-base-content w-72 lg:w-96 border-r-8 border-base-300">
      <div className="sticky top-0 text-center p-5 font-bold text-xl">
        Atendimento Vulneráveis
      </div>
      <ul className="menu">
        {menuItems.map((item, i) => (
          <li key={i}>
            <h6>{item.title}</h6>
            <SidebarLinks sidebarLinks={item.list} />
          </li>
        ))}
      </ul>
    </aside>
  );
}

function SidebarLinks({ sidebarLinks }: { sidebarLinks: SidebarLink[] }) {
  return (
    <ul className="rounded-box">
      {sidebarLinks.map((item, i) => (
        <li key={i}>
          <Link href={`/dashboard/${item.url}`}>
            {item.icon}
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Sidebar;
