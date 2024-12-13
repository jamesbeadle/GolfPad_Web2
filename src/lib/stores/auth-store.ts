// stores/authStore.ts
import { writable, type Writable } from 'svelte/store';
import type { User } from '../interfaces/user';
import type { SessionData } from '../interfaces/session';

const createAuthStore = () => {
  const store: Writable<SessionData> = writable({
    isLoggedIn: false,
    user: null,
    token: null,
    expiry: null
  });

  return {
    subscribe: store.subscribe,
    login: (user: User, token: string, expires_in: number) => {
      const now = new Date();
      store.update(state => ({
        ...state,
        isLoggedIn: true,
        user,
        token,
        expiry: now.setSeconds(now.getSeconds() + expires_in)
      }));
    },
    logout: () => store.set({
      isLoggedIn: false,
      user: null,
      token: null,
      expiry: null
    }),
    isExpired: (): boolean => {
        let expired = true;
        store.subscribe((session) => {
            const now = new Date();
            expired = session.expiry !== null && session.expiry < now.getTime();
        });
        return expired;
    }
  };
};

export const authStore = createAuthStore();