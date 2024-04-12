import { Lucia, TimeSpan } from "lucia";
import { TypeORMAdapter } from "./TypeORMAdapter";

export const lucia = new Lucia(new TypeORMAdapter(), {
  sessionExpiresIn: new TimeSpan(2, "w"),
});
