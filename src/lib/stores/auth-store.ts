// stores/authStore.ts
import { writable, type Writable } from 'svelte/store';
import type { User } from '../interfaces/user';
import type { SessionData } from '../interfaces/session';
import { supabase } from '$lib/superbaseClient';

const createAuthStore = () => {
  const store: Writable<SessionData> = writable({
    isLoggedIn: false,
    user: null,
    token: null,
    expiry: null
  });

  // Function to update the store with new session data
  const updateSession = (session: any) => {
    if (session) {
      store.update(state => ({
        ...state,
        isLoggedIn: true,
        user: session.user,
        token: session.access_token,
        expiry: session.expires_at ? session.expires_at * 1000 : null // Convert to milliseconds if it's a timestamp
      }));
    } else {
      store.set({
        isLoggedIn: false,
        user: null,
        token: null,
        expiry: null
      });
    }
  };

  // Listen for authentication state changes
  supabase.auth.onAuthStateChange((event, session) => {
    console.log('Auth state change:', event, session); // Useful for debugging
    updateSession(session);
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
    logout: async () => {
      await supabase.auth.signOut(); // Sign out from Supabase
      store.set({
        isLoggedIn: false,
        user: null,
        token: null,
        expiry: null
      });
    },
    isExpired: (): boolean => {
      let expired = true;
      store.subscribe((session) => {
        const now = new Date();
        expired = session.expiry !== null && session.expiry < now.getTime();
      })();
      return expired;
    }
  };
};

export const authStore = createAuthStore();