<script lang="ts">
  import Layout from "./Layout.svelte";  
  import Google from "$lib/components/icons/google.svelte";
  import type { User } from '@supabase/supabase-js';
  import { authStore } from "$lib/stores/auth-store";

  export let data: { session: any; supabase: any; user: User | null; };

  const { supabase } = data;
  
  async function signInWithGoogle() {
    const { data: signInData, error: authError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://www.golfpad.xyz'
      }
    });

    if (authError) {
      console.error('Error signing in with Google:', authError.message);
      return;
    }

    if (signInData?.url) {
      window.location.href = signInData.url;
    } else {
      console.warn("No URL returned from signInWithOAuth.");
    }
  }
</script>

<Layout {data}>
<div class="z-10 px-4 mb-20 text-center">
  <h1 class="mb-1 font-bold text-BrandForest">
    WELCOME TO <span class="condensed">GOLFPAD</span>
  </h1>
  <h2 class="mx-16 mb-6 text-5xl font-black leading-tight text-black md:text-6xl condensed">
    THE FUTURE OF GOLF STARTS HERE
  </h2>
    
  {#if $authStore.user}
    <p>Welcome, {$authStore.user.email}</p>
  {:else}
    <button on:click={signInWithGoogle} class="brand-button">
      <span class="flex flex-row items-center">
        Sign In With Google
        <Google className="ml-2 w-6" />
      </span>
    </button>
  {/if}
</div>
  
<div class="absolute bottom-0 left-0 z-0 w-full">
  <img src="golfball_mobile.png" alt="Golf Ball" class="object-cover w-full h-auto md:hidden">
  <img src="golfball.png" alt="Golf Ball" class="hidden object-cover w-full md:flex">
</div>
</Layout>