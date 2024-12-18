<script lang="ts">
  import BrandText from "../icons/brand-text.svelte";
  import Bands from "./modals/bands.svelte";
  import BuildIt from "./modals/build-it.svelte";
  import Mulligans from "./modals/mulligans.svelte";
  import NextUp from "./modals/next-up.svelte";

  import { onMount } from "svelte";

  let showMulligans = false;
  let showBands = false;
  let showBuildIt = false;
  let showNextUp = false;
  
  onMount(() => {
      window.scrollTo(0, 0);
  });

  function openMulligans(){
    showMulligans = true;
  }

  function closeMulligans(){
    showMulligans = false;
  }
  
  function openBands(){
    showBands = true;
  }

  function closeBands(){
    showBands = false;
  }
  
  function openBuildIt(){
    showBuildIt = true;
  }

  function closeBuiltIt(){
    showBuildIt = false;
  }
  
  function openNextUp(){
    showNextUp = true;
  }

  function closeNextUp(){
    showNextUp = false;
  }

</script>

{#if showMulligans}
  <Mulligans closeModal={closeMulligans} visible={showMulligans} />
{/if}

{#if showBands}
  <Bands visible={showBands} closeModal={closeBands} />
{/if}

{#if showBuildIt}
  <BuildIt closeModal={closeBuiltIt} visible={showBuildIt} />
{/if}

{#if showNextUp}
  <NextUp closeModal={closeNextUp} visible={showNextUp} />
{/if}

<div class="md:px-4">
  <h2 class="text-2xl condensed tracking-wide mb-2">
    OUR NEW GAMES
  </h2>

  <div class="space-y-4">
    <p>
      We’re excited to introduce our <BrandText content="4" /> new game formats crafted for the next generation of golfers. Each one provides a fresh avenue to challenge your abilities, refine your technique, and discover new dimensions of the sport.
    </p>
    <p>
      These formats blend tradition with innovation. Some build on classic rules through subtle twists while others introduce entirely new approaches that spark excitement. They encourage personal growth and friendly competition while inviting players to connect and enjoy their shared love of the game.
    </p>
    <p>
      In the sections that follow, we’ll highlight each of these four experiences, explaining what sets them apart and why they belong in your golf journey. As our platform evolves, we’ll continue shaping new and exciting ways to play, ensuring <BrandText content="GOLFPAD" /> remains a hub where golf’s past, present, and future are seamlessly united.
    </p>
  </div>
  <div class="pt-4 flex flex-col w-full space-y-4 md:flex-row md:space-y-0 md:space-x-2 mt-2">
    <div class="flex flex-col w-full space-y-2 md:w-1/4">
      <div class="aspect-square rounded-2xl overflow-hidden">
        <img src="game-images/mulligans.png" alt="mulligans" class="w-full h-full object-fill" />
      </div>
      <p class="text-3xl text-center condensed md:text-lg">MULLIGANS</p>
      <button on:click={openMulligans} class="px-4 py-2 text-xs rounded bg-BrandForest text-BrandYellow">More Info</button>
    </div>
    <div class="flex flex-col w-full space-y-2 md:w-1/4">
      <div class="aspect-square rounded-2xl overflow-hidden">
        <img src="game-images/bands.png" alt="bands" class="w-full h-full object-cover" />
      </div>
      <p class="text-3xl text-center condensed md:text-lg">BANDS</p>
      <button on:click={openBands} class="px-4 py-2 text-xs rounded bg-BrandForest text-BrandYellow">More Info</button>
    </div>
    <div class="flex flex-col w-full space-y-2 md:w-1/4">
      <div class="aspect-square rounded-2xl overflow-hidden">
        <img src="game-images/build-it.png" alt="build-it" class="w-full h-full object-cover" />
      </div>
      <p class="text-3xl text-center condensed md:text-lg">BUILD IT</p>
      <button on:click={openBuildIt} class="px-4 py-2 text-xs rounded bg-BrandForest text-BrandYellow">More Info</button>
    </div>
    <div class="flex flex-col w-full space-y-2 md:w-1/4">
      <div class="aspect-square rounded-2xl overflow-hidden">
        <img src="game-images/next-up.png" alt="next-up" class="w-full h-full object-cover" />
      </div>
      <p class="text-3xl text-center condensed md:text-lg">NEXT UP</p>
      <button on:click={openNextUp} class="px-4 py-2 text-xs rounded bg-BrandForest text-BrandYellow">More Info</button>
    </div>
  </div>
</div>