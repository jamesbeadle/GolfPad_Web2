<script lang="ts">
  import { onMount } from "svelte";
    import BrandText from "../icons/brand-text.svelte";

  onMount(() => {
      window.scrollTo(0, 0);
  });
</script>
<div class="flex flex-col space-y-4">
    <h2 class="text-2xl font-black text-black condensed">MARKETING</h2>
    
    <p>
      Waterway Labs are an expanding tech company with a focus on real world events to introduce people to new community driven applications. 
    </p>
  
    <p>
      Like most successful brands, we too have our niche. We use narrowboats, something most people we have met love, to bring a unique excitement to each one of our products. 
    </p>
  
    <div class="w-full mt-4">
      <img 
        src="whitepaper/boat.png" 
        alt="boat" 
        class="w-full h-64 md:h-72 lg:h-80 rounded-md shadow-md object-cover object-center" 
      />
    </div>
  
    <p>
      <BrandText content="GOLFPAD" /> will be no different, we are creating a floating mini golf course, to be used for promotional events throughout the UK.
    </p>
  
    <p>
      We plan to moor our floating <BrandText content="GOLFPAD MINIPUTT" /> course near some of the best golf courses in the world, in the heart of Surrey in the United Kingdom.
    </p>
  
    <p>
      We will use our unique setup to provide entertaining golf gamification to real world users, building a strong social media presence within this already competitive environment. 
    </p>
  
    <p>
      We recognise that the US is likely to be our largest market. To ensure a seamless entry, our promotional team is already building strong relationships and working to showcase the beauty of their courses on our platform. Through this effort, we aim to inspire the next generation of golfers with our innovative games    
    </p>
  </div>
  