<template>
  <div v-if="side === 'left'" class="relative z-10 space-y-10 h-full flex flex-col">
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

  <div v-else-if="side === 'right'" class="relative z-10 h-full flex flex-col">
    <div class="mb-14 text-right pr-4">
      <h2 class="font-heading text-4xl text-leather-brown dark:text-notebook-yellow/90 relative inline-block transition-colors duration-300">Table of Contents
        <span class="absolute -bottom-2 left-0 w-full h-1 bg-accent-orange/20 rounded-full transform -rotate-1"></span>
      </h2>
    </div>

    <nav class="space-y-10 flex-grow pr-4">
      <NuxtLink 
        v-for="(item, index) in navItems" 
        :key="index" 
        :to="item.link" 
        class="group flex items-end gap-6 hover:translate-x-1 transition-transform duration-300"
        @click.stop
        @mousedown.stop
        @touchstart.stop
      >
        <span class="font-heading text-2xl text-accent-orange/60 group-hover:text-accent-orange transition-colors duration-300">{{ '0' + (index + 1) + '.' }}</span>
        <div class="flex-1 pb-1 border-b-2 border-leather-brown/10 dark:border-white/10 group-hover:border-accent-orange/30 transition-colors duration-300 flex justify-between items-end">
          <h3 class="font-heading text-2xl text-leather-brown dark:text-orange-50/80 group-hover:text-accent-orange transition-colors duration-300">{{ item.title }}</h3>
          <span class="material-symbols-outlined text-leather-brown/40 dark:text-orange-100/30 group-hover:text-accent-orange text-xl mb-1 transition-colors duration-300">{{ item.icon }}</span>
        </div>
      </NuxtLink>
    </nav>

    <div class="relative mt-10 pt-10 border-t border-leather-brown/10 dark:border-white/10 flex justify-between items-center transition-colors duration-300">
      <div class="flex gap-4 opacity-70">
        <div class="w-12 h-12 rounded-full border-2 border-dashed border-accent-orange/40 flex items-center justify-center rotate-12 hover:rotate-0 transition-transform cursor-pointer">
          <span class="material-symbols-outlined text-accent-orange">alternate_email</span>
        </div>
        <div class="w-12 h-12 rounded-full border-2 border-dashed border-leather-brown/20 dark:border-white/20 flex items-center justify-center -rotate-12 hover:rotate-0 transition-transform cursor-pointer">
          <span class="material-symbols-outlined text-leather-brown/60 dark:text-orange-100/60 transition-colors duration-300">share</span>
        </div>
      </div>
      <div class="w-24 h-24 opacity-20 hover:opacity-100 transition-opacity cursor-pointer group text-leather-brown dark:text-orange-100/60" title="Click for beta">
        <svg class="w-full h-full doodle-stroke group-hover:stroke-accent-orange transition-colors duration-300" fill="none" stroke-width="1.5" viewBox="0 0 100 100">
          <path d="M40 25 C25 25 25 50 25 60 C25 80 40 85 60 85 C75 85 75 60 75 50 C75 35 60 25 50 25 Z"></path>
          <path d="M50 25 L40 25 M75 50 L75 60"></path>
          <circle cx="50" cy="25" fill="currentColor" r="2.5"></circle>
        </svg>
      </div>
      <div class="font-body text-right text-leather-brown/60 dark:text-orange-100/40 leading-tight tracking-wide transition-colors duration-300">
        <p>Climb high,</p>
        <p>stay humble.</p>
      </div>
    </div>

    <div class="absolute bottom-6 right-16 opacity-10 font-mono text-[10px] text-leather-brown dark:text-white select-none transition-colors duration-300">
      <pre>git add memories/*
git commit -m "summit"
git push</pre>
    </div>

    <!-- Sticky Note (Draggable) -->
    <div 
      ref="postIt"
      class="hidden xl:block absolute w-48 bg-orange-50/90 border border-orange-100/50 rounded-sm p-5 backdrop-blur-sm z-30 shadow-[2px_4px_8px_rgba(0,0,0,0.05)] cursor-move transition-transform duration-75 ease-out selection:bg-none select-none"
      :style="{ top: postItPos.y + 'px', left: postItPos.x + 'px', transform: `rotate(${postItRotation}deg)` }"
      @mousedown="startDrag"
    >
      <div class="w-8 h-8 rounded-full bg-orange-200/50 absolute -top-3 left-1/2 -translate-x-1/2 flex items-center justify-center shadow-sm">
         <div class="w-3 h-3 rounded-full bg-orange-400/50"></div>
      </div>
      <p class="font-body text-lg leading-snug mt-2 pointer-events-none" style="color: #d97706;">Don't forget the chalk bag this weekend! 🧗‍♂️</p>
      <div class="mt-4 flex gap-1 pointer-events-none">
        <div class="h-1 w-8 bg-accent-orange/20"></div>
        <div class="h-1 w-4 bg-accent-orange/20"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineProps<{
  side: 'left' | 'right'
}>()

const navItems = [
  { title: 'Digital Garden', icon: 'edit_note', link: '/read/2' },
  { title: 'Code Repo', icon: 'inventory_2', link: '/read/3' },
  { title: 'The Beta (CV)', icon: 'history_edu', link: '/read/4' },
  { title: 'Crag Snapshots', icon: 'photo_camera', link: '/read/5' },
]

// -- Post-It Dragging Logic --
const postIt = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const dragOffset = ref({ x: 0, y: 0 })
const postItPos = ref({ x: 0, y: 60 }) 
const postItRotation = ref(2)

onMounted(() => {
  if (postIt.value && postIt.value.parentElement) {
    const parentWidth = postIt.value.parentElement.offsetWidth
    postItPos.value = { x: parentWidth - 220, y: 50 }
  }
  
  window.addEventListener('mousemove', onDrag)
  window.addEventListener('mouseup', endDrag)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', endDrag)
  window.removeEventListener('resize', handleResize)
})

function handleResize() {
    // Optional resize logic
}

function startDrag(e: MouseEvent) {
  if (!postIt.value) return
  isDragging.value = true
  dragOffset.value = {
    x: e.clientX - postItPos.value.x,
    y: e.clientY - postItPos.value.y
  }
}

function onDrag(e: MouseEvent) {
  if (!isDragging.value) return
  e.preventDefault()
  postItPos.value = {
    x: e.clientX - dragOffset.value.x,
    y: e.clientY - dragOffset.value.y
  }
}

function endDrag() {
  if (!isDragging.value) return
  isDragging.value = false
}
</script>
