<template>
  <div v-if="side === 'left'" class="relative z-10 space-y-10 h-full flex flex-col justify-center items-center opacity-50">
    <span class="material-symbols-outlined text-6xl text-leather-brown/40 dark:text-white/20">edit_note</span>
    <p class="font-heading text-2xl text-leather-brown/60 dark:text-white/40">Thoughts are brewing...</p>
  </div>

  <div v-else-if="side === 'right'" class="relative z-10 h-full flex flex-col">
    <div class="mb-8 text-right pr-4">
      <h2 class="font-heading text-4xl text-leather-brown dark:text-notebook-yellow/90 relative inline-block transition-colors duration-300">02. Thoughts and Rants
        <span class="absolute -bottom-2 left-0 w-full h-1 bg-accent-orange/20 rounded-full transform -rotate-1"></span>
      </h2>
    </div>

    <div class="flex-grow flex flex-col overflow-y-auto pr-4 space-y-4">
      <div class="bg-white/40 dark:bg-black/20 p-6 rounded-xl border border-leather-brown/10 dark:border-white/5 relative group transition-all duration-300 hover:shadow-md">
        <h3 class="font-heading text-2xl text-accent-orange mb-3">Why Anki should be free on Android & iOS</h3>
        <p class="font-body text-lg text-leather-brown/80 dark:text-orange-50/70 leading-relaxed mb-4">
          Anki is arguably one of the most powerful tools for spaced repetition learning. It has helped countless students, especially in medical school and language learning, achieve incredible results. On desktop and Android, it's completely open-source and free, supported by donations and its active community.
        </p>
        <p class="font-body text-lg text-leather-brown/80 dark:text-orange-50/70 leading-relaxed mb-4">
          However, when you look it up on the iOS App Store, you're confronted with a hefty $25 price tag. While I fully understand that the developers need to make a living and pay for the servers supporting AnkiWeb synchronization, placing this financial burden solely on iOS users feels inherently unbalanced.
        </p>
        <p class="font-body text-lg text-leather-brown/80 dark:text-orange-50/70 leading-relaxed">
          Educational tools with such immense impact should be as accessible as possible. A subscription model for premium sync features or an optional donation model on iOS could bridge this gap without paywalling mobile users. The barrier to effective learning shouldn't be defined by the operating system you happen to use.
        </p>
      </div>
    </div>

    <div class="pt-6 flex justify-between items-end border-t border-leather-brown/10 dark:border-white/5 transition-colors duration-300 mt-6 pr-4">
        <p class="font-body text-sm text-leather-brown/40">Page 02</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  side: 'left' | 'right'
}>()
</script>
