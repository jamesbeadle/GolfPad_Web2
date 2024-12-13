<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import { invalidate } from '$app/navigation'
  import NavOverlay from "$lib/components/shared/navigation.svelte";
  import type { AuthChangeEvent, Session } from '@supabase/supabase-js';

  import "../app.css";
  
  let isLoading = $state(true);
  let backgroundSpinnerRemoved = $state(false);
  let expanded = $state(false);
  let selectedRoute = 'home';
  let isHomepage = $state(false);
  
  let { data, children } = $props();
  let { session, supabase } = $derived(data);


  let unsubscribeAuth: (() => void) | undefined; // Type for unsubscribe function

  onMount(() => {
    if (!browser) return;

    const spinner = document.querySelector("body > #app-spinner");
    spinner?.remove();
    backgroundSpinnerRemoved = true;

    isHomepage = browser && window.location.pathname === "/";

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, newSession: Session | null) => {
        if (newSession?.expires_at !== session?.expires_at) {
          invalidate("supabase:auth"); // Forces layout to reload data
        }
      }
    );

    unsubscribeAuth = authListener?.unsubscribe; // Store the unsubscribe function safely
  });

  onDestroy(() => {
    unsubscribeAuth?.(); // Cleanup the auth listener
  });

  function toggleNav() {
    expanded = !expanded;
  }
</script>

{#if backgroundSpinnerRemoved && !isLoading}
  <div class="relative flex flex-col min-h-screen">
    <div class="flex-none h-[80px] relative">
      <div class="absolute z-10 top-4 left-4">
        <button
          onclick={toggleNav}
          class="flex items-center justify-center w-12 h-12 text-2xl font-bold text-white bg-black rounded-full shadow-md">
          +
        </button>
      </div>
      <div class="absolute z-10 top-4 right-4">
        <a href="/">
          <span class="text-3xl font-extrabold text-black condensed">GOLFPAD</span>
        </a>
      </div>
    </div>

    <NavOverlay {expanded} {selectedRoute} {toggleNav}/>

    <div class="{isHomepage ? 'bg-BrandYellow  items-center justify-center relative' : 'bg-white'} flex-1 flex">
      {@render children()}
    </div>

    {#if !isHomepage}
      <div class="bg-BrandYellow flex-none relative h-[50px] mt-auto">
        <div class="absolute z-10 bottom-4 left-4">
          <a href="/whitepaper" class="text-sm font-medium text-black">WHITEPAPER |</a> 
          <a href="/team" class="text-sm font-medium text-black">TEAM |</a> 
          <a target="_blank" href="https://github.com/jamesbeadle/golfpad" class="text-sm font-medium text-black">GITHUB</a> 
        </div>
      </div>
    {/if}
  </div>
{/if}