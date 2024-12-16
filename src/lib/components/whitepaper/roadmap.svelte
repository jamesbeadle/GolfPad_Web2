<script lang="ts">
  import { onMount } from "svelte";
    import BrandText from "../icons/brand-text.svelte";

  onMount(() => {
      window.scrollTo(0, 0);
  });
</script>
<div class="flex flex-col space-y-4 text-base">
  <h2 class="text-2xl font-black text-black condensed">ROADMAP</h2>

  <div class="w-full mt-4">
    <img 
      src="whitepaper/roadmap.png" 
      alt="roadmap" 
      class="w-full h-64 md:h-72 lg:h-80 rounded-md shadow-md object-cover object-center" 
    />
  </div>
  <p>
    <BrandText content="Q1 2025" />: We will begin the year signing up users and introducing them to the first of our player tools, <BrandText content="YARDAGE SETS" />.
  </p>
  <p>
    <BrandText content="Q2 2025" />: As the summer season gets into full swing, our users will begin to feel familiar with <BrandText content="MULLIGANS" />, <BrandText content="BANDS" /> and <BrandText content="Next Up" />.
  </p>
  <p>
    <BrandText content="Q3 2025" />: We will follow up our 4 ball games with our first team game, <BrandText content="BUILD IT" />.
  </p>
  <p>
    <BrandText content="Q4 2025" />: We will evaluate the technology landscape and look to decentralise either ownership or profits of the <BrandText content="GOLFPAD" /> platform with its users.
  </p>
</div>