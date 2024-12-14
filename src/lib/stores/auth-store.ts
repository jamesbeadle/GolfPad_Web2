import type { User, Session } from "@supabase/supabase-js";
import type { SupabaseClient } from '@supabase/supabase-js';
import { writable, type Writable } from 'svelte/store';

const authStore: Writable<{ isLoggedIn: boolean; user: User | null }> = writable({
  isLoggedIn: false, 
  user: null
});

let initialized = false;

export function initAuthStore(supabase: SupabaseClient) {
  if (initialized) return; 
  initialized = true;

  const localStore = createLocalAuthStore(supabase);

  localStore.subscribe(value => {
    authStore.set(value);
  });
}

function createLocalAuthStore(supabase: SupabaseClient) {
  const store = writable<{ isLoggedIn: boolean; user: User | null }>({ 
    isLoggedIn: false, 
    user: null 
  });

  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session?.user) {
      store.set({ isLoggedIn: true, user: session.user });
    }
  });

  supabase.auth.onAuthStateChange((_, session) => {
    if (session?.user) {
      store.set({ isLoggedIn: true, user: session.user });
    } else {
      store.set({ isLoggedIn: false, user: null });
    }
  });

  return store;
}

export { authStore };