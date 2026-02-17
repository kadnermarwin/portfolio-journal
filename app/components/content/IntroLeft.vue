<template>
  <div class="relative z-10 space-y-10 h-full flex flex-col">
    <!-- Doodle SVG -->
    <div class="absolute -top-4 -left-4 select-none pointer-events-none text-leather-brown dark:text-accent-orange/60 transition-colors duration-500">
      <svg class="w-20 h-20 doodle-stroke" fill="none" viewBox="0 0 100 100">
        <path d="M10,20 Q30,10 50,20 T90,20" stroke-width="1.5"></path>
        <circle cx="20" cy="40" fill="currentColor" r="3"></circle>
        <circle cx="25" cy="50" fill="currentColor" r="2"></circle>
      </svg>
    </div>

    <!-- Header / Profile -->
    <div class="flex items-center gap-8">
      <div class="relative">
        <div class="absolute -inset-2 bg-accent-orange/10 dark:bg-accent-orange/5 rounded-lg -rotate-2 transition-colors duration-300"></div>
        <img alt="Marwin Profile" class="w-28 h-28 md:w-36 md:h-36 object-cover rounded-lg border-4 border-white dark:border-[#3d2b1a] shadow-sm sepia-[0.3] transition-colors duration-300" src="/images/profile.jpg"/>
        <div class="absolute -top-4 -right-6 washi-tape px-6 py-1.5 text-[11px] uppercase tracking-widest font-bold text-white/90 rotate-6 shadow-sm">
          Sept 2024
        </div>
      </div>
      <div>
        <h1 class="font-heading text-4xl md:text-5xl text-accent-orange mb-2 tracking-wide transition-colors duration-300">Hi, I'm <span class="relative inline-block">Marwin<svg class="absolute -bottom-2 left-0 w-full h-3 text-accent-orange/40" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" stroke-width="3" fill="none" /></svg></span>.</h1>
        <p class="font-body text-2xl text-leather-brown/70 dark:text-orange-100/60 italic transition-colors duration-300">Code. Climb. Create.</p>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="flex-grow space-y-8">
      <div class="bg-white/40 dark:bg-black/20 p-8 rounded-2xl border-2 border-leather-brown/10 dark:border-white/5 shadow-sm relative overflow-hidden rotate-1 transform transition-all hover:rotate-0 hover:shadow-md duration-300">
        <div class="absolute top-4 right-4 text-leather-brown/20 dark:text-white/10 transition-colors duration-300">
          <span class="material-symbols-outlined text-4xl">code_blocks</span>
        </div>
        <h3 class="font-heading text-2xl text-accent-orange mb-4 transition-colors duration-300">The Logic & The Line</h3>
        <p class="font-body text-xl leading-relaxed text-leather-brown/80 dark:text-orange-50/70 transition-colors duration-300">
          Computer Science student by day, bouldering enthusiast by twilight. I find a strange parallel between a complex codebase and a technical V6—both require patience, precision, and the courage to fall before you reach the top.
        </p>
      </div>

      <div class="grid grid-cols-2 gap-6">
        <div class="p-6 rounded-2xl border-2 border-dashed border-leather-brown/20 dark:border-white/10 bg-white/30 dark:bg-black/20 -rotate-1 hover:rotate-0 transition-transform duration-300">
          <h4 class="font-heading text-accent-orange text-xl mb-3 flex items-center gap-2 transition-colors duration-300">
            <span class="material-symbols-outlined text-xl">terminal</span> Tech Stack
          </h4>
          <ul class="font-body text-lg text-leather-brown/80 dark:text-orange-50/70 space-y-1 ml-1 transition-colors duration-300">
            <li>• Rust / Python</li>
            <li>• React & Tailwind</li>
            <li>• Neovim / Arch</li>
          </ul>
        </div>
        <div class="p-6 rounded-2xl border-2 border-dashed border-leather-brown/20 dark:border-white/10 bg-white/30 dark:bg-black/20 rotate-2 hover:rotate-0 transition-transform duration-300">
          <h4 class="font-heading text-accent-orange text-xl mb-3 flex items-center gap-2 transition-colors duration-300">
            <span class="material-symbols-outlined text-xl">mountain_flag</span> Current Goal
          </h4>
          <p class="font-body text-lg text-leather-brown/80 dark:text-orange-50/70 leading-relaxed transition-colors duration-300">
            Sending my first 7A outdoors & mastering async Rust.
          </p>
        </div>
      </div>
    </div>

    <!-- Footer / Signature -->
    <div class="pt-10 flex justify-between items-end border-t border-leather-brown/10 dark:border-white/5 transition-colors duration-300">
      <div class="space-y-1 opacity-60 font-body text-sm">
        <p class="text-accent-orange italic transition-colors duration-300">while(climbing) { code++; }</p>
        <p class="text-leather-brown/60 dark:text-orange-100/40 transition-colors duration-300">#build_the_beta</p>
      </div>
      <div class="w-24 h-24 opacity-40 text-leather-brown dark:text-orange-100/40 transition-colors duration-300">
        <svg class="doodle-stroke" fill="none" stroke-width="1.2" viewBox="0 0 24 24">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Intro Left Page Logic
</script>
