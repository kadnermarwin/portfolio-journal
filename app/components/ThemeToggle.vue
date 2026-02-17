<template>
  <button 
    @click="toggleDarkMode" 
    class="absolute top-6 right-6 z-50 p-2 rounded-full border-2 border-leather-brown/20 dark:border-accent-orange/20 text-leather-brown dark:text-accent-orange hover:bg-leather-brown/5 dark:hover:bg-accent-orange/10 transition-all duration-300"
    title="Toggle Dark Mode"
  >
    <span class="material-symbols-outlined text-xl block" v-if="!isDark">dark_mode</span>
    <span class="material-symbols-outlined text-xl block" v-else>light_mode</span>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDark = ref(false)

function toggleDarkMode() {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  } else {
    isDark.value = false
    document.documentElement.classList.remove('dark')
  }
})
</script>
