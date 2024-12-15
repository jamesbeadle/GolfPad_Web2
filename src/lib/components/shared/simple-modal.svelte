<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import Close from "../icons/close.svelte";

  export let showModal: boolean;
  export let onClose: () => void;
  export let title: string;

  let modalElement: HTMLDivElement;
  let startOnBackdrop = false;

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && showModal) {
      onClose();
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("keydown", handleKeydown);
  }

  onDestroy(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("keydown", handleKeydown);
    }
  });

  const handlePointerDown = (e: PointerEvent) => {
    if (e.target === e.currentTarget) {
      startOnBackdrop = true;
    } else {
      startOnBackdrop = false;
    }
  };

  const handlePointerUp = (e: PointerEvent) => {
    if (startOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
    startOnBackdrop = false;
  };

  onMount(() => {
    if (modalElement && showModal) {
      modalElement.focus();
    }
  });
</script>

{#if showModal}
  <div
    class="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm"
    role="dialog"
    aria-modal="true"
    tabindex="-1"
    on:pointerdown={handlePointerDown}
    on:pointerup={handlePointerUp}
  >
    <div
      bind:this={modalElement}
      class="bg-BrandYellow rounded-lg shadow-lg p-6 max-w-lg w-full mx-4 text-black outline-none"
      tabindex="-1"
    >
      <header class="flex items-center justify-between mb-4">
        <h2 class="text-3xl condensed">{title}</h2>
        <button
          type="button"
          class="text-black"
          aria-label="Close modal"
          on:click={onClose}
        >
          <Close className="w-6" />
        </button>
      </header>
      <div class="overflow-auto">
        <slot />
      </div>
    </div>
  </div>
{/if}