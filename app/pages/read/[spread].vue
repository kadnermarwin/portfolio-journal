<template>
  <!-- Rendered by layout -->
  <div></div>
</template>

<script setup lang="ts">
// The InteractiveBook component basically handles everything based on the route.
// We just need to ensure this page renders it.
definePageMeta({
  layout: 'default',
  key: 'book-view' // Shared key to prevent unmounting between /read/1 and /read/2
})
</script>
