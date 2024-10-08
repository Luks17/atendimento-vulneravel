import { RoutePermissions } from "@/lib/auth/Permissions";
import RouteProtection from "@/lib/auth/RouteProtection";

async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  await new RouteProtection(RoutePermissions.IS_NOT_LOGGED).verifyAuth();

  return children;
}

export default Layout;
