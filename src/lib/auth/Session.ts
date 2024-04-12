import { Lucia, TimeSpan } from "lucia";
import { TypeORMAdapter } from "./TypeORMAdapter";

export const lucia = new Lucia(new TypeORMAdapter(), {
  sessionExpiresIn: new TimeSpan(2, "w"),
  sessionCookie: {
    expires: false,
    attributes: { secure: process.env.NODE_ENV === "production" },
  },
  getUserAttributes: (attr) => ({ nome: attr.nome, role: attr.role }),
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: UserAttributes;
  }
}

interface UserAttributes {
  nome: string;
  role: string;
}
