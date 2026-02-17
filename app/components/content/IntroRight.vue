<template>
  <div class="relative z-10 h-full flex flex-col">
    <div class="mb-14 text-right pr-4">
      <h2 class="font-heading text-4xl text-leather-brown dark:text-notebook-yellow/90 relative inline-block transition-colors duration-300">Table of Contents
        <span class="absolute -bottom-2 left-0 w-full h-1 bg-accent-orange/20 rounded-full transform -rotate-1"></span>
      </h2>
    </div>

    <nav class="space-y-10 flex-grow pr-4">
      <NuxtLink v-for="(item, index) in navItems" :key="index" :to="item.link" class="group flex items-end gap-6 hover:translate-x-1 transition-transform duration-300">
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
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

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
