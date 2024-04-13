import { RoutePermissions, validateProtected } from "@/lib/auth/Permissions";
import Navbar from "../ui/dashboard/Navbar";
import Sidebar from "../ui/dashboard/Sidebar";

async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  await validateProtected(RoutePermissions.IS_LOGGED);

  return (
    <div className="drawer xl:drawer-open">
      <input id="sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content m-1.5 flex flex-col gap-y-3">
        <Navbar />
        <main>{children}</main>
      </div>
      <div className="drawer-side z-40">
        <label
          htmlFor="sidebar"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <Sidebar />
      </div>
    </div>
  );
}

export default Layout;
