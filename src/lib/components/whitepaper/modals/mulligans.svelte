<script lang="ts">
  import BrandText from "$lib/components/icons/brand-text.svelte";
  import SimpleModal from "$lib/components/shared/simple-modal.svelte";

  export let visible: boolean;
  export let closeModal: () => void;

  const images = [
    { src: "whitepaper/mulligans1.jpg", alt: "In-game view", nextLabel: "Show Results View" },
    { src: "whitepaper/mulligans2.jpg", alt: "Results screen", nextLabel: "Show In-game View" }
  ];

  let currentImageIndex = 0;

  function toggleImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
  }
</script>

<SimpleModal title="MULLIGANS" showModal={visible} onClose={closeModal}>
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
      <p><BrandText content="MULLIGANS" /> is a strategic golf game where you decide when to utilise your free golf shots during a game against your friends.</p>
      <p>A golfer automatically receives a mulligan every 3 holes, starting with the 1st hole.</p>
      <p>Whichever golfer wins the hole gets an additional mulligan.</p>
      <p>Golfers can strategically attempt to win a hole or stop someone else from winning by playing a mulligan.</p>
      <p><BrandText content="MULLIGANS" /> gives golfers a new way of enjoying their round, safe in the knowledge a few mistakes are expected.</p>
    </div>
  </div>
</SimpleModal>