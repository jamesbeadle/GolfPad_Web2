
  <script lang="ts">
    import BrandText from "$lib/components/icons/brand-text.svelte";
    import SimpleModal from "$lib/components/shared/simple-modal.svelte";

    export let visible: boolean;
    export let closeModal: () => void;

    const images = [
    { src: "whitepaper/bands1.jpg", alt: "Prediction view", nextLabel: "Show Live View" },
    { src: "whitepaper/bands2.jpg", alt: "Live view", nextLabel: "Show Results View" },
    { src: "whitepaper/bands3.jpg", alt: "Results view", nextLabel: "Show Prediction View" }
  ];

  let currentImageIndex = 0;

  function toggleImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
  }
  </script>
  
  <SimpleModal title="BANDS" showModal={visible} onClose={closeModal}>    
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
        <p><BrandText content="BANDS" /> is designed for those purple patches in your golf round you know you typically play well in.</p>
        <p>You select a 3 hole range, known as a <BrandText content="BAND" />, as the part of your round you will hit one of our 9 achievement categories.</p>
        <p>You'll build up points for scoring well on holes along with hitting fairways, greens or not losing a ball.</p>
        <p><BrandText content="BANDS" /> trains each part of your game using this new and exciting format, from hitting fairways to sinking putts.</p>
        <p>Whether you start well or only get going towards the end, playing well at the right time is what counts.</p>
      </div>
    </div>
  </SimpleModal>
  