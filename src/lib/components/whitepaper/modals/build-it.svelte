
<script lang="ts">
  import BrandText from "$lib/components/icons/brand-text.svelte";
  import SimpleModal from "$lib/components/shared/simple-modal.svelte";

  export let visible: boolean;
  export let closeModal: () => void;

  const images = [
    { src: "whitepaper/build-it1.jpg", alt: "Team Creation View", nextLabel: "Show Results View" },
    { src: "whitepaper/build-it2.jpg", alt: "Results screen", nextLabel: "Show Team View" }
  ];

  let currentImageIndex = 0;

  function toggleImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
  }
</script>

<SimpleModal title="BUILD IT" showModal={visible} onClose={closeModal}>    
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
    <div class="flex flex-col space-y-2 text-xl leading-relaxed md:w-2/3">
      <p><BrandText content="BUILD IT" /> allows groups of friends to play each other over a customisable period of time on a chosen course.</p>
      <p>Golfers put together a team of players to compete against other teams, building a combined scorecard of their lowest scores.</p>
      <p>The competition is decided after the customisable period ends, allowing teams to compete for a single round or over an entire year.</p>
      <p><span class="condensed">BUILD IT</span> will allow golfers to contribute to a team on a more granular level, enhancing the community golf experience.</p>
    </div>
  </div>
</SimpleModal>