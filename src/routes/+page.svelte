<script lang="ts">
    import Layout from "./Layout.svelte";  
    import Google from "$lib/components/icons/google.svelte";
    import { createClient } from '@supabase/supabase-js';
  
    const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
  
    async function signInWithGoogle() {
      const { data, error: authError } = await supabase.auth.signInWithOAuth({
        provider: 'google'
      });
  
      if (authError) {
        console.error('Error signing in with Google:', authError.message);
      } else {

        //TODO Set Store variables

        console.log(data);
      }
    }
  
</script>
<Layout>    
   
    <div class="z-10 px-4 mb-20 text-center">
        <h1 class="mb-1 font-bold text-BrandForest">WELCOME TO <span class="condensed">GOLFPAD</span></h1>
        <h2 class="mx-16 mb-6 text-5xl font-black leading-tight text-black md:text-6xl condensed">THE FUTURE OF GOLF STARTS HERE</h2>
        
        <button on:click={signInWithGoogle} class="brand-button">
            <span class="flex flex-row items-center">
                Sign In With Google
                <Google className="ml-2 w-6" />
            </span>
        </button>
    </div>
    <div class="absolute bottom-0 left-0 z-0 w-full">
        <img src="golfball_mobile.png" alt="Golf Ball" class="object-cover w-full h-auto md:hidden">
        <img src="golfball.png" alt="Golf Ball" class="hidden object-cover w-full md:flex">
    </div>

</Layout>