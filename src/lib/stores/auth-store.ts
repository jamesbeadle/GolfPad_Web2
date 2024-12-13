import { writable, type Writable } from "svelte/store";
import type { User } from "../interfaces/user";
import { supabase } from "$lib/superbaseClient";

const createAuthStore = () => {
  const store: Writable<{ isLoggedIn: boolean; user: User | null }> = writable({
    isLoggedIn: false,
    user: null,
  });

  const initializeSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      store.set({ isLoggedIn: true, user: session.user });
    }
  };

  supabase.auth.onAuthStateChange((_, session) => {
    if (session) {
      store.set({ isLoggedIn: true, user: session.user });
    } else {
      store.set({ isLoggedIn: false, user: null });
    }
  });

  initializeSession(); // Initialize on app load

  return store;
};

export const authStore = createAuthStore();