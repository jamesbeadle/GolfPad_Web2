<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  export let showModal: boolean;
  export let onClose: () => void;

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
    // Check if pointer down started on the backdrop
    if (e.target === e.currentTarget) {
      startOnBackdrop = true;
    } else {
      startOnBackdrop = false;
    }
  };

  const handlePointerUp = (e: PointerEvent) => {
    // Close only if pointer started and ended on backdrop
    if (startOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
    startOnBackdrop = false;
  };

  onMount(() => {
    // Move focus into the modal for accessibility
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
      class="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full mx-4 text-black outline-none"
      tabindex="-1"
    >
      <header class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold">New Game</h2>
        <button
          type="button"
          class="text-black"
          aria-label="Close modal"
          on:click={onClose}
        >
          &times;
        </button>
      </header>
      <div class="overflow-auto">
        <slot />
      </div>
      <footer class="flex items-center justify-end mt-4 space-x-2">
        <button type="button" class="px-4 py-2 bg-gray-300 rounded" on:click={onClose}>
          Cancel
        </button>
        <button type="button" class="px-4 py-2 bg-green-600 text-white rounded">
          Select
        </button>
      </footer>
    </div>
  </div>
{/if}