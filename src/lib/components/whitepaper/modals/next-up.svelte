<script lang="ts">
    import BrandText from "$lib/components/icons/brand-text.svelte";
    import SimpleModal from "$lib/components/shared/simple-modal.svelte";
    
    export let visible: boolean;
    export let closeModal: () => void;

    const images = [
    { src: "whitepaper/next-up1.jpg", alt: "Live View", nextLabel: "Show Results View" },
    { src: "whitepaper/next-up2.jpg", alt: "Results screen", nextLabel: "Show Live View" }
  ];

  let currentImageIndex = 0;

  function toggleImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
  }
  </script>
  
  <SimpleModal title="NEXT UP" showModal={visible} onClose={closeModal}>
    <div class="flex flex-col md:flex-row md:items-start md:space-x-4 space-y-4 md:space-y-0">
      <div class="flex flex-col items-center md:items-start md:w-1/3 space-y-4">
        <img 
          src={images[currentImageIndex].src} 
          alt={images[currentImageIndex].alt} 
          class="w-full rounded-lg shadow-lg object-cover"
        />
        <button 
          class="brand-button w-full"
          on:click={toggleImage}
        >
          {images[currentImageIndex].nextLabel}
        </button>
      </div>
      <div class="flex flex-col space-y-2 text-lg leading-relaxed md:w-2/3">
          <p><BrandText content="NEXT UP" /> is built around going first on the tee, needing to win the holes assigned to you.</p>
          <p>A golfer gets 3 points for successfully defending a hole, an opponent will get 1 if they can beat them.</p>
          <p>The game will randomise the person next on the tee equally throughout the round. Any remaining holes are assigned to the golfer with the lowest score at the time of tee off, allowing them to successfully defend the hole and potentially get back into the game.</p>
          <p><BrandText content="NEXT UP" /> trains you to get good off the tee, when it matters most.</p>
      </div>
    </div>
  </SimpleModal>
  