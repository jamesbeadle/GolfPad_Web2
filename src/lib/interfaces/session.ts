import type { User } from "./user";

export interface SessionData {
    isLoggedIn: boolean;
    user: User | null;
    token: string | null;
    expiry: number | null;
}
  