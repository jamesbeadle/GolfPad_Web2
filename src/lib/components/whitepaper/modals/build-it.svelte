
<script lang="ts">
  import BrandText from "$lib/components/icons/brand-text.svelte";
  import SimpleModal from "$lib/components/shared/simple-modal.svelte";

  export let visible: boolean;
  export let closeModal: () => void;
</script>

<SimpleModal title="BUILD IT" showModal={visible} onClose={closeModal}>    
  <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
    <img 
      src="whitepaper/build-it-game.png" 
      alt="game" 
      class="w-full h-48 md:w-1/3 md:h-auto rounded-lg shadow-lg object-cover object-center md:object-[25%_top]" 
    />
    <div class="flex flex-col space-y-2 text-lg leading-relaxed">
      <p><BrandText content="BUILD IT" /> allows groups of friends to play each other over a customisable period of time on a chosen course.</p>
      <p>Golfers put together a team of players to compete against other teams, building a combined scorecard of their lowest scores.</p>
      <p>The competition is decided after the customisable period ends, allowing teams to compete for a single round or over an entire year.</p>
      <p><span class="condensed">BUILD IT</span> will allow golfers to contribute to a team on a more granular level, enhancing the community golf experience.</p>
    </div>
  </div>
</SimpleModal>