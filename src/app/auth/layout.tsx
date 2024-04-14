import { RoutePermissions, validateProtected } from "@/lib/auth/Permissions";

async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  await validateProtected(RoutePermissions.IS_NOT_LOGGED);

  return children;
}

export default Layout;
