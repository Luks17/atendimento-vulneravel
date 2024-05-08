import { RoutePermissions } from "@/lib/auth/Permissions";
import RouteProtection from "@/lib/auth/RouteProtection";

async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  await new RouteProtection(RoutePermissions.HAS_SITUACAO).verifyRole(true);

  return children;
}

export default Layout;
