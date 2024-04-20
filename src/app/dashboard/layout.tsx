import { RoutePermissions, validateProtected } from "@/lib/auth/Permissions";
import Navbar from "@/app/(components)/dashboard/Navbar";
import Sidebar from "@/app/(components)/dashboard/Sidebar";

async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { user, session } = await validateProtected(RoutePermissions.IS_LOGGED);

  return (
    <div className="drawer lg:drawer-open h-full">
      <input id="sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content h-full bg-base-300 flex flex-col gap-y-3">
        <Navbar />
        <main className="mx-3">{children}</main>
      </div>
      <div className="drawer-side z-40">
        <label
          htmlFor="sidebar"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <Sidebar username={user!.nome} />
      </div>
    </div>
  );
}

export default Layout;
