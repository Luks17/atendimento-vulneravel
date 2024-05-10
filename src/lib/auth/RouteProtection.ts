import { User } from "lucia";
import { RoutePermissions } from "./Permissions";
import { validateRequest } from "./Session";
import { redirect } from "next/navigation";

export default class RouteProtection {
  public constructor(
    public routeProtection: RoutePermissions,
    public disallowedRole?: RoutePermissions,
  ) { }

  public async verifyAuth() {
    const { session, user } = await validateRequest();

    if (!session) {
      if (this.routeProtection > RoutePermissions.IS_NOT_LOGGED) {
        return redirect("/auth/login");
      }
    } else {
      if (this.routeProtection === RoutePermissions.IS_NOT_LOGGED) {
        return redirect("/");
      }
    }

    return { session, user };
  }

  public async verifyRole(strict = false) {
    const { user } = await validateRequest();

    return this.checkClearance(user, strict);
  }

  public checkClearance(user: User | null, strict: boolean): boolean {
    if (!user) return false;

    const { role } = user;

    if (this.disallowedRole !== undefined && this.disallowedRole === role) {
      return false;
    }

    return strict
      ? this.routeProtection === role
      : this.routeProtection <= role;
  }
}
