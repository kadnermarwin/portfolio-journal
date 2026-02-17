<template>
  <div class="book-layout w-full min-h-screen flex flex-col md:flex-row overflow-hidden relative transition-colors duration-500 bg-paper-cream dark:bg-background-dark">
    <!-- UI Layer (Toggles, Back Buttons) -->
    <slot name="ui" />

    <!-- Left Page -->
    <slot name="left" />

    <!-- Spiral Binding -->
    <div class="hidden md:block w-12 md:w-20 relative z-30 shrink-0 select-none">
      <div class="absolute inset-y-0 left-0 w-full flex flex-col justify-evenly py-6">
        <div v-for="i in 14" :key="i" class="relative h-20 w-full flex items-center justify-center">
          <!-- Left Hole -->
          <div class="absolute left-[20%] w-3 h-3 rounded-full bg-[#1a1814]/20 dark:bg-black/40 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] transition-colors duration-300"></div>
          <!-- Right Hole -->
          <div class="absolute right-[20%] w-3 h-3 rounded-full bg-[#1a1814]/20 dark:bg-black/40 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] transition-colors duration-300"></div>
          
          <!-- Spiral SVG -->
          <svg class="absolute w-[160%] h-full pointer-events-none overflow-visible z-10" viewBox="0 0 100 60" preserveAspectRatio="none">
            <defs>
              <linearGradient :id="'bind-grad-' + i" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#555" class="dark:stop-color-[#333] transition-colors duration-300" />
                <stop offset="30%" stop-color="#bbb" class="dark:stop-color-[#777] transition-colors duration-300" />
                <stop offset="50%" stop-color="#eee" class="dark:stop-color-[#aaa] transition-colors duration-300" />
                <stop offset="70%" stop-color="#bbb" class="dark:stop-color-[#777] transition-colors duration-300" />
                <stop offset="100%" stop-color="#555" class="dark:stop-color-[#333] transition-colors duration-300" />
              </linearGradient>
              <filter :id="'shadow-' + i" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="2" dy="3" stdDeviation="1.5" flood-color="rgba(0,0,0,0.3)" class="dark:flood-color-[rgba(0,0,0,0.7)]"/>
              </filter>
            </defs>
            
            <path 
              d="M 15 28 C 15 -10 85 -10 85 28" 
              :stroke="'url(#bind-grad-' + i + ')'" 
              stroke-width="6" 
              fill="none" 
              stroke-linecap="round"
              :filter="'url(#shadow-' + i + ')'"
            />
            <path 
              d="M 15 28 C 15 50 20 60 25 60" 
              stroke="#777" 
              class="dark:stroke-[#444] opacity-60 transition-colors duration-300"
              stroke-width="5" 
              fill="none" 
              stroke-linecap="round"
            />
              <path 
              d="M 75 60 C 80 60 85 50 85 28" 
              stroke="#777" 
              class="dark:stroke-[#444] opacity-60 transition-colors duration-300"
              stroke-width="5" 
              fill="none" 
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>
    </div>

    <!-- Right Page -->
    <slot name="right" />

    <!-- Navigation Controls (Arrows) -->
    <slot name="controls" />
  </div>
</template>

<script setup lang="ts">
// Layout logic
</script>
