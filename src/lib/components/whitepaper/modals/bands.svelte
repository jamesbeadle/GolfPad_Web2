
  <script lang="ts">
    import BrandText from "$lib/components/icons/brand-text.svelte";
    import SimpleModal from "$lib/components/shared/simple-modal.svelte";

    export let visible: boolean;
    export let closeModal: () => void;
  </script>
  
  <SimpleModal title="BANDS" showModal={visible} onClose={closeModal}>    
    <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
      <img 
        src="whitepaper/bands-game.png" 
        alt="game" 
        class="w-full h-48 md:w-1/3 md:h-auto rounded-lg shadow-lg object-cover object-center md:object-[25%_top]" 
      />
      <div class="flex flex-col space-y-2 text-lg leading-relaxed">
        <p><BrandText content="BANDS" /> is designed for those purple patches in your golf round you know you typically play well in.</p>
        <p>You select a 3 hole range, known as a <BrandText content="BAND" />, as the part of your round you will hit one of our 9 achievement categories.</p>
        <p>You'll build up points for scoring well on holes along with hitting fairways, greens or not losing a ball.</p>
        <p><BrandText content="BANDS" /> trains each part of your game using this new and exciting format, from hitting fairways to sinking putts.</p>
        <p>Whether you start well or only get going towards the end, playing well at the right time is what counts.</p>
      </div>
    </div>
  </SimpleModal>
  