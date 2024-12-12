<script lang="ts">
    import { createClient } from '@supabase/supabase-js';
    import { writable } from 'svelte/store';
  
    let email = '';
    let password = '';
    let error = writable<string | null>(null);
  
    const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
  
    async function signInWithEmail() {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });
  
      if (authError) {
        error.set(authError.message);
      } else {
        console.log('Signed in:', data);
      }
    }
  
    async function signInWithGoogle() {
      const { data, error: authError } = await supabase.auth.signInWithOAuth({
        provider: 'google'
      });
  
      if (authError) {
        console.error('Error signing in with Google:', authError.message);
        error.set(authError.message);
      } else {
        console.log('Google sign-in initiated');
      }
    }
  </script>
  
  <form on:submit|preventDefault={signInWithEmail}>
    <input type="email" bind:value={email} placeholder="Email" required />
    <input type="password" bind:value={password} placeholder="Password" required />
    <button type="submit">Sign In</button>
    <button type="button" on:click={signInWithGoogle}>Sign in with Google</button>
    {#if $error}
      <p style="color: red;">{$error}</p>
    {/if}
  </form>