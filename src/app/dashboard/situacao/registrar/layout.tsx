import ProtectedRouteWrapper from "@/app/(components)/ProtectedRouteWrapper";
import { RoutePermissions } from "@/lib/auth/Permissions";
import RouteProtection from "@/lib/auth/RouteProtection";

async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const hasClearance = await new RouteProtection(
    RoutePermissions.IS_NEW_USER,
    true
  ).verifyRole();

  return (
    <ProtectedRouteWrapper hasClearance={hasClearance}>
      {children}
    </ProtectedRouteWrapper>
  );
}

export default Layout;
