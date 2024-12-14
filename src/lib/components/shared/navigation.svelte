<script lang="ts">

    import { fade } from "svelte/transition";
    import { writable } from "svelte/store";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { authStore } from "$lib/stores/auth-store"; 
  
    export let expanded: boolean = false;
    export let selectedRoute: string = 'home';
    export let toggleNav: () => void;
  
    const navItems = writable<{ name: string; route: string }[]>([
      { name: 'HOME', route: 'home' },
      { name: 'WHITEPAPER', route: 'whitepaper' },
      { name: 'GAME RULES', route: 'game-rules' }
    ]);
  
    function selectRoute(route: string) {
      selectedRoute = route;
      toggleNav();
      if(route === 'home'){
        goto(`/`);
        return;
      }
      goto(`/${route}`);
    }
  
    function closeNav() {
      toggleNav();
    }

    function goHome(){
        toggleNav();
        goto('/');
    }

    $: {
      switch($page.url.pathname){
        case '/':
          selectedRoute = 'home';
          break;
        case '/whitepaper':
          selectedRoute = 'whitepaper';
          break;
        case '/team':
          selectedRoute = 'team';
          break;
        case '/game-rules':
          selectedRoute = 'game-rules';
          break;
        case '/games':
          selectedRoute = 'games';
          break;
        default:
          selectedRoute = 'home';
          break;
      }
    }
</script>
  
{#if expanded}

    <div class="flex min-h-screen flex-col relative nav-overlay" in:fade={{ duration: 300 }} out:fade={{ duration: 300 }}>
      
      <div class="absolute top-4 left-4 z-10">
        <button
          on:click={closeNav}
          class="bg-black rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold text-white shadow-md">
          -
        </button>
      </div>
      <div class="absolute top-4 right-4 z-10">
        <button on:click={goHome}>
            <span class="text-3xl font-extrabold text-black condensed">GOLFPAD</span>
        </button>
      </div>
  
      <div class="nav-content flex flex-col items-start pl-10">
        {#each $navItems as item (item.route)}
          <div class="nav-item expanded">
            <button
              on:click={() => selectRoute(item.route)}
              class="text-3xl lg:text-6xl font-bold condensed {selectedRoute === item.route ? 'text-white' : 'text-black'}">
              {item.name}
            </button>
          </div>
        {/each}

        {#if $authStore.isLoggedIn}
          <div class="nav-item expanded">
            <button
              on:click={() => selectRoute('games')}
              class="text-3xl lg:text-6xl font-bold condensed {selectedRoute === 'games' ? 'text-white' : 'text-black'}">
              MY GAMES
            </button>
          </div>
        {/if}
        
      </div>
      
  
      <div class="flex justify-between items-center p-5 text-xs lg:text-base">
        <div class="social-links">
          <a href="https://twitter.com" target="_blank">TWITTER</a>
          <a href="https://oc.app" target="_blank">OPENCHAT</a>
          <a href="https://youtube.com" target="_blank">YOUTUBE</a>
        </div>
        
        <div>
          <img src="profile-placeholder.jpg" alt="Profile" class="w-12 h-12 rounded-full" />
        </div>
      </div>
    </div>
{/if}
