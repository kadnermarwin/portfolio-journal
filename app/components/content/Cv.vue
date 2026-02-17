<template>
  <div v-if="side === 'left'" class="relative z-10 space-y-10 h-full flex flex-col justify-center items-center opacity-50">
    <span class="material-symbols-outlined text-6xl text-leather-brown/40 dark:text-white/20">history_edu</span>
    <p class="font-heading text-2xl text-leather-brown/60 dark:text-white/40">Curriculum Vitae</p>
  </div>

  <div v-else-if="side === 'right'" class="relative z-10 h-full flex flex-col">
    <div class="mb-14 text-right pr-4">
      <h2 class="font-heading text-4xl text-leather-brown dark:text-notebook-yellow/90 relative inline-block transition-colors duration-300">03. The Beta (CV)
        <span class="absolute -bottom-2 left-0 w-full h-1 bg-accent-orange/20 rounded-full transform -rotate-1"></span>
      </h2>
    </div>

    <div class="flex-grow flex items-center justify-center border-2 border-dashed border-leather-brown/10 rounded-lg p-8">
        <p class="font-body text-xl text-leather-brown/60 italic">Experience loading...</p>
    </div>

    <div class="pt-10 flex justify-between items-end border-t border-leather-brown/10 dark:border-white/5 transition-colors duration-300 mt-8">
        <p class="font-body text-sm text-leather-brown/40">Page 03</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  side: 'left' | 'right'
}>()
</script>
