import ProtectedRouteWrapper from "@/app/(components)/ProtectedRouteWrapper";
import { RoutePermissions } from "@/lib/auth/Permissions";
import RouteProtection from "@/lib/auth/RouteProtection";

async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const hasClearance = await new RouteProtection(
    RoutePermissions.HAS_SITUACAO,
  ).verifyRole();

  const message: string =
    "É necessário ter uma situação registrada antes de fazer uma solicitação";

  return (
    <ProtectedRouteWrapper hasClearance={hasClearance} message={message}>
      {children}
    </ProtectedRouteWrapper>
  );
}

export default Layout;
