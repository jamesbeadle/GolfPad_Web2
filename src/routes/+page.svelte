<script lang="ts">
    import Layout from "./Layout.svelte";  
    import Google from "$lib/components/icons/google.svelte";
    import type { User } from '@supabase/supabase-js';
    import { createAuthStore } from "$lib/stores/auth-store";
  
    let { data } = $props()
    let { supabase } = $derived(data)
  
    // Create the store with the supabase client from data
    let authStore = createAuthStore(supabase);
  
    let user: User | null = null;
  
    // Subscribe to the store to track the user
    const unsubscribe = authStore.subscribe((authState) => {
      user = authState.user;
    });
  
    // Sign-in function
    async function signInWithGoogle() {
      console.log("Starting Google sign-in...");
      const { data, error: authError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'https://www.golfpad.xyz'
        }
      });
      
      console.log("Sign-in response:", { data, authError });
  
      if (authError) {
        console.error('Error signing in with Google:', authError.message);
        return;
      };
  
      if (data?.url) {
        console.log("Redirecting user to OAuth URL:", data.url);
        window.location.href = data.url;
      } else {
        console.warn("No URL returned from signInWithOAuth.");
      }
    }
  </script>
  
  <Layout data={data}>
    <div class="z-10 px-4 mb-20 text-center">
      <h1 class="mb-1 font-bold text-BrandForest">WELCOME TO <span class="condensed">GOLFPAD</span></h1>
      <h2 class="mx-16 mb-6 text-5xl font-black leading-tight text-black md:text-6xl condensed">THE FUTURE OF GOLF STARTS HERE</h2>
      
      {#if !user}
        <button onclick={signInWithGoogle} class="brand-button">
          <span class="flex flex-row items-center">
            Sign In With Google
            <Google className="ml-2 w-6" />
          </span>
        </button>
      {:else}
        <p>Welcome, {user.email}</p>
      {/if}
    </div>
    <div class="absolute bottom-0 left-0 z-0 w-full">
      <img src="golfball_mobile.png" alt="Golf Ball" class="object-cover w-full h-auto md:hidden">
      <img src="golfball.png" alt="Golf Ball" class="hidden object-cover w-full md:flex">
    </div>
  </Layout>