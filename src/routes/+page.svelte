<script lang="ts">
    import Layout from "./Layout.svelte";  
    import Google from "$lib/components/icons/google.svelte";
    import { authStore } from "$lib/stores/auth-store";
    import type { User } from "$lib/interfaces/user";
  
    let { data } = $props()
    let { supabase } = $derived(data)
    
   
    let user: User | null = $state(null);

    authStore.subscribe((session) => {
        user = session.user;
    });


  
    async function signInWithGoogle() {
        const { data, error: authError } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
            redirectTo: 'https://www.golfpad.xyz' // Ensure this matches your domain
            }
        });
    
        if (authError) {
            console.error('Error signing in with Google:', authError.message);
            return;
        };
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
            <p>Welcome</p>
        {/if}

    </div>
    <div class="absolute bottom-0 left-0 z-0 w-full">
        <img src="golfball_mobile.png" alt="Golf Ball" class="object-cover w-full h-auto md:hidden">
        <img src="golfball.png" alt="Golf Ball" class="hidden object-cover w-full md:flex">
    </div>

</Layout>