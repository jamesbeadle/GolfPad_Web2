import { writable } from "svelte/store";
import type { User, Session } from "@supabase/supabase-js";
import type { SupabaseClient } from '@supabase/supabase-js';

export function createAuthStore(supabase: SupabaseClient) {
  const store = writable<{ isLoggedIn: boolean; user: User | null }>({ 
    isLoggedIn: false, 
    user: null 
  });

  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session?.user) {
      store.set({ isLoggedIn: true, user: session.user });
    }
  });

  supabase.auth.onAuthStateChange((_, session: Session | null) => {
    if (session?.user) {
      store.set({ isLoggedIn: true, user: session.user });
    } else {
      store.set({ isLoggedIn: false, user: null });
    }
  });

  return store;
}
