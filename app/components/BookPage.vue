<template>
  <section class="flex-1 h-full overflow-y-auto p-8 md:py-14 md:pl-14 md:pr-16 relative dot-grid dark:dot-grid-dark transition-colors duration-500">
    <slot />
  </section>
</template>

<script setup lang="ts">
// Common page logic if any
</script>

<style scoped>
/* Ensure dot-grid styles are available here if not global */
/* They are in main.css so it should be fine */
</style>
