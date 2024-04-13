import { validateRequest } from "./Session";
import { redirect } from "next/navigation";

export const validateProtected = async (routeProtection: RoutePermissions) => {
  const { session, user } = await validateRequest();

  if (routeProtection == RoutePermissions.IS_NOT_LOGGED && session) {
    redirect("/");
  } else if (routeProtection == RoutePermissions.IS_LOGGED && !session) {
    redirect("/auth/login");
  }

  return { session, user };
};

export enum RoutePermissions {
  IS_NOT_LOGGED,
  IS_LOGGED,
  IS_ADMIN,
}
