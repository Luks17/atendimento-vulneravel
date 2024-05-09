import { RoutePermissions } from "@/lib/auth/Permissions";
import Navbar from "@/app/(components)/dashboard/Navbar";
import Sidebar from "@/app/(components)/dashboard/Sidebar";
import RouteProtection from "@/lib/auth/RouteProtection";

async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { user } = await new RouteProtection(
    RoutePermissions.IS_NEW_USER,
  ).verifyAuth();

  return (
    <div className="drawer lg:drawer-open h-full">
      <input id="sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content h-full bg-base-300 flex flex-col gap-y-3 pb-3">
        <Navbar />
        <main className="mx-3 h-full">{children}</main>
      </div>
      <div className="drawer-side z-40">
        <label
          htmlFor="sidebar"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <Sidebar user={user!} />
      </div>
    </div>
  );
}

export default Layout;
