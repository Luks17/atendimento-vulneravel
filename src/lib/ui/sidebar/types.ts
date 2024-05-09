import { RoutePermissions } from "@/lib/auth/Permissions";

export interface SidebarItem {
  title: string;
  protection: RoutePermissions;
  list: SidebarLink[];
}

export interface SidebarLink {
  label: string;
  icon: string;
  url: string;
}
