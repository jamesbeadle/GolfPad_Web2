<script lang="ts">
    import BrandText from "$lib/components/icons/brand-text.svelte";
    import SimpleModal from "$lib/components/shared/simple-modal.svelte";

    export let visible: boolean;
    export let closeModal: () => void;
  </script>
  
  <SimpleModal title="MULLIGANS" showModal={visible} onClose={closeModal}>    
    <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
      <img 
        src="whitepaper/mulligans-game.png" 
        alt="game" 
        class="w-full h-48 md:w-1/3 md:h-auto rounded-lg shadow-lg object-cover object-center md:object-[25%_top]" 
      />
      <div class="flex flex-col space-y-2 text-lg leading-relaxed">
        <p><BrandText content="MULLIGANS" /> is a strategic golf game where you decide when to utilise your free golf shots during a game against your friends.</p>
        <p>A golfer automatically receives a mulligan every 3 holes, starting with the 1st hole.</p>
        <p>Whichever golfer wins the hole gets an additional mulligan.</p>
        <p>Golfers can strategically attempt to win a hole or stop someone else winning by playing a mulligan.</p>
        <p><BrandText content="MULLIGANS" /> gives golfers a new way of enjoying their round safe in the knowledge a few mistakes are expected.</p>
      </div>
    </div>
  </SimpleModal>
  