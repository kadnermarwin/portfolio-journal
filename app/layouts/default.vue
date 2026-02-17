<template>
  <div class="bg-notebook-yellow dark:bg-background-dark font-body text-leather-brown dark:text-paper-cream min-h-screen w-full selection:bg-accent-orange/20 transition-colors duration-500 perspective-1000">
    <ClientOnly>
      <InteractiveBook />
    </ClientOnly>
    <!-- Slot is kept for router functionality, but pages should be empty for book views -->
    <slot />
  </div>
</template>

<script setup lang="ts">
import InteractiveBook from '~/components/InteractiveBook.vue'
</script>
