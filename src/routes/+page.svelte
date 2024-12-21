<script lang="ts">
  import type { Unsubscriber } from 'svelte/store';
  import Google from "$lib/components/icons/google.svelte";
  
  import { signInWithGoogle } from "$lib/firebase";
  import { currentUser } from "$lib/stores/auth-store";

  import { onMount, onDestroy } from "svelte";
    import type { User } from 'firebase/auth';
    import Layout from './Layout.svelte';

  let user: User | null;
  let unsubscribe: Unsubscriber; 

  onMount(() => {
    // 2. Subscribe to the currentUser store
    unsubscribe = currentUser.subscribe((val) => {
      user = val;
    });
  });

  onDestroy(() => {
    if (unsubscribe) unsubscribe();
  });

  // 3. Sign-in method
  async function handleSignInWithGoogle() {
    await signInWithGoogle();
  }

</script>

<Layout>
  <div class="z-10 px-4 mb-20 text-center">
    <h1 class="mb-1 font-bold text-BrandForest">
      WELCOME TO <span class="condensed">GOLFPAD</span>
    </h1>
    <h2 class="mx-16 mb-6 text-5xl font-black leading-tight text-black md:text-6xl condensed">
      THE FUTURE OF GOLF STARTS HERE
    </h2>
      
    {#if user}
      Welcome, {user.email}!
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