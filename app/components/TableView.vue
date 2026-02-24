<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import InteractiveBook from '~/components/InteractiveBook.vue';
import LaptopApp from '~/components/LaptopApp.vue';
import CameraApp from '~/components/CameraApp.vue';

const route = useRoute();
const router = useRouter();

// activeItem can be 'table', 'book', 'laptop', 'camera'
const isBookClosed = ref(false);

const activeItem = computed(() => {
  if (route.path === '/') return 'table';
  if (route.path === '/projects') return 'laptop';
  if (route.path === '/photos') return 'camera';
  if (route.path.startsWith('/read') && isBookClosed.value) return 'table';
  return 'book';
});

const openItem = (item: string) => {
  if (item === 'book') {
    // Navigating to /read/1 opens the book
    router.push('/read/1');
  } else if (item === 'laptop') {
    router.push('/projects');
  } else if (item === 'camera') {
    router.push('/photos');
  } else {
    // Navigating to / closes the book and returns to desk
    router.push('/');
  }
};
</script>

<template>
  <div class="table-environment" :class="[`env-${activeItem}`]">
    <!-- Desk texture -->
    <div class="desk-surface"></div>
    
    <!-- The transformable surface containing all items -->
    <div class="table-surface" :class="[`active-${activeItem}`]">
      
      <!-- Decorations -->
      <TransitionGroup name="fade-item">
        <div v-show="activeItem === 'table'" key="map" class="table-item decoration decoration-map">
          <img src="/images/desk/map.svg" class="w-full h-full pointer-events-none" />
        </div>

        <div v-show="activeItem === 'table'" key="ivy" class="table-item decoration decoration-ivy">
          <img src="/images/desk/ivy.svg" class="w-full h-full pointer-events-none" />
        </div>

        <div v-show="activeItem === 'table'" key="plant" class="table-item decoration decoration-plant">
          <img src="/images/desk/plant.svg" class="w-full h-full pointer-events-none" />
        </div>

        <div v-show="activeItem === 'table'" key="coffee" class="table-item decoration decoration-coffee">
          <div class="coffee-saucer"></div>
          <div class="coffee-cup">
            <div class="coffee-liquid">
              <svg class="steam" viewBox="0 0 50 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 80 Q5 60 15 40 T25 0" stroke="#f0f0f0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity="0.6"/>
                <path d="M35 70 Q25 50 35 30 T25 -10" stroke="#f0f0f0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity="0.6"/>
              </svg>
            </div>
            <div class="coffee-handle"></div>
          </div>
        </div>

        <div v-show="activeItem === 'table'" key="shoes" class="table-item decoration decoration-shoes">
          <img src="/images/desk/shoes.svg" class="w-full h-full pointer-events-none" />
        </div>

        <div v-show="activeItem === 'table'" key="rope" class="table-item decoration decoration-rope">
          <img src="/images/desk/rope.svg" class="w-full h-full pointer-events-none" />
        </div>

        <div v-show="activeItem === 'table'" key="carabiner" class="table-item decoration decoration-carabiner">
          <img src="/images/desk/clips.svg" class="w-full h-full pointer-events-none" />
        </div>
      </TransitionGroup>


      <!-- Laptop -->
      <Transition name="fade-item">
        <div 
          v-show="activeItem !== 'book'"
          class="table-item laptop-wrapper" 
          :class="{ 'interactable': activeItem === 'table', 'is-active': activeItem === 'laptop' }"
          @click.stop="activeItem === 'table' && openItem('laptop')"
        >
        <div class="laptop-item relative w-[400px] h-[530px]">
          <img src="/images/desk/laptop.svg" class="absolute inset-0 w-full h-full pointer-events-none" />
          
          <!-- The screen -->
          <div class="macbook-screen-area absolute top-[10px] left-0 w-[400px] h-[240px] flex justify-center items-center px-[12px] pt-[6px] pb-[16px]">
            <div class="screen-content" v-if="activeItem === 'laptop'">
              <LaptopApp @close="openItem('table')" />
            </div>
            <div class="screen-content-preview" v-else>
               <!-- Subtle glow or off screen placeholder could go here if needed -->
            </div>
          </div>
        </div>
        </div>
      </Transition>

      <!-- Camera -->
      <Transition name="fade-item">
        <div 
          v-show="activeItem !== 'book'"
          class="table-item camera-wrapper" 
          :class="{ 'interactable': activeItem === 'table', 'is-active': activeItem === 'camera' }"
          @click.stop="activeItem === 'table' && openItem('camera')"
        >
        <div class="camera-item relative w-[180px] h-[120px]">
          <img src="/images/desk/camera.svg" class="absolute inset-0 w-full h-full pointer-events-none" />
        </div>
        </div>
      </Transition>

      <!-- Notebook -->
      <div 
        class="table-item book-wrapper-table" 
        :class="{ 'is-active': activeItem === 'book' }"
      >
        <!-- The InteractiveBook itself handles its own internal routing logic -->
        <!-- We removed the click handler here so it doesn't block clicks; we'll click the book directly -->
        <InteractiveBook @update:closed="isBookClosed = $event" />
      </div>

    </div>

    <!-- UI Overlays -->
    
    <!-- Camera Viewfinder (Full screen when active) -->
    <Transition name="fade">
      <div v-if="activeItem === 'camera'" class="camera-fullscreen-app">
        <CameraApp @close="openItem('table')" />
      </div>
    </Transition>

    <Transition name="fade">
      <button 
        v-if="activeItem === 'laptop'" 
        class="back-to-desk-btn" 
        @click="openItem('table')"
      >
        <span class="material-symbols-outlined mr-2">arrow_back</span>
        Close Laptop
      </button>
    </Transition>
  </div>
</template>

<style scoped>
.table-environment {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: #fdfaf4;
}

.desk-surface {
  position: absolute;
  inset: -20vw; /* extended so when zooming we don't clip */
  background-image: url('/images/desk/wood-texture.svg');
  background-size: 800px auto;
  background-repeat: repeat;
  z-index: 0;
  transition: opacity 1s cubic-bezier(0.25, 1, 0.5, 1);
  opacity: 1;
}

:global(.dark) .desk-surface {
  background-color: #5d4037;
  /* Need a dark mode specific SVG or blend mode - keeping simple for now by blending into the dark bg */
  background-blend-mode: overlay;
  opacity: 0.8;
}

.table-surface {
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  transition: transform 1.2s cubic-bezier(0.25, 1, 0.5, 1);
  transform-origin: center center;
}

/* Base states: When desk is viewed, zoom out */
.table-surface.active-table {
  transform: scale(0.65) translate(0, 5vh);
}

/* When book is active, scale to 1 to fit screen */
.table-surface.active-book {
  transform: scale(1) translate(0, 0);
}

/* LAPTOP ACTIVE: scale heavily and shift to center the laptop */
/* Focus precisely on the macbook-screen. */
.table-surface.active-laptop {
  transform: translate(133vw, calc(140vh + 490px)) scale(3.5);
}

/* CAMERA ACTIVE: scale heavily and shift to center camera */
/* Camera is at left 88vw, top 12vh. Center is 50vw, 50vh. */
.table-surface.active-camera {
  transform: translate(-133vw, 133vh) scale(3.5);
}

/* ITEM WRAPPERS */
.table-item {
  position: absolute;
  transform-style: preserve-3d;
  transition: transform 1.2s cubic-bezier(0.25, 1, 0.5, 1);
}

/* Hover highlights for interactable items */
.table-item.interactable {
  cursor: pointer;
}
.table-item.interactable:hover {
  filter: drop-shadow(0 0 20px rgba(255, 200, 100, 0.3));
}
.table-item.interactable:active {
  filter: drop-shadow(0 0 10px rgba(255, 200, 100, 0.5));
}

/* BOOK WRAPPER */
.book-wrapper-table {
  left: 50vw;
  top: 50vh;
  /* Ensure it has full screen size for the book to unfold properly */
  width: 100vw; 
  height: 100vh;
  transform: translate(-50%, -50%) rotate(0deg);
  z-index: 5;
  pointer-events: none; /* Let clicks pass through to laptop and camera */
}


/* When desk is active, scatter items slightly */
.active-table .book-wrapper-table {
  transform: translate(-45%, -45%) rotate(6deg) scale(0.65);
}
.active-laptop .book-wrapper-table {
  /* Book shouldn't overlap laptop while zoomed in */
  opacity: 0.8;
  pointer-events: none;
}
.active-camera .book-wrapper-table {
  opacity: 0.8;
  pointer-events: none;
}

/* LAPTOP WRAPPER */
.laptop-wrapper {
  /* Position cleanly in top left corner */
  left: 12vw;
  top: 10vh;
  width: 400px;
  transform: translate(-50%, -50%) scale(0.85) rotate(-15deg);
  z-index: 10;
}
.active-laptop .laptop-wrapper {
  /* correct the rotation when zoomed in */
  transform: translate(-50%, -50%) scale(1) rotate(0deg);
  z-index: 20;
}
.active-table .laptop-wrapper:hover {
  transform: translate(-50%, -50%) scale(0.9) rotate(-15deg);
}

/* CAMERA WRAPPER */
.camera-wrapper {
  /* Position cleanly in top right corner */
  left: 88vw;
  top: 12vh;
  width: 200px;
  transform: translate(-50%, -50%) rotate(25deg);
  z-index: 10;
}
.active-camera .camera-wrapper {
  transform: translate(-50%, -50%) rotate(0deg);
  z-index: 20;
}
.active-table .camera-wrapper:hover {
  transform: translate(-50%, -50%) rotate(25deg) scale(1.05);
}

/* ========================================= */
/* CAMERA CSS (Replaced by Image) */
/* ========================================= */
.camera-item {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
}


/* ========================================= */
/* LAPTOP CSS (Replaced by Image partially) */
/* ========================================= */
.laptop-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.screen-content-preview {
  position: absolute;
  inset: 16px;
  background: transparent;
}

.screen-content {
  position: absolute;
  inset: 16px;
  background: #fdfaf4;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  border: 3px solid #2c2c2c;
}

/* ========================================= */
/* OVERLAYS & UI */
/* ========================================= */
.back-to-desk-btn {
  position: fixed;
  top: 2rem;
  left: 2rem;
  z-index: 100;
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border-radius: 30px;
  font-family: var(--font-heading, "Gloria Hallelujah", cursive);
  font-size: 1.25rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  transition: all 0.3s ease;
  cursor: pointer;
}
.back-to-desk-btn:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: translateY(-2px);
}

.camera-fullscreen-app {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: #000;
  display: flex;
  flex-direction: column;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-item-enter-active,
.fade-item-leave-active {
  transition: opacity 0.5s ease;
}
.fade-item-enter-from,
.fade-item-leave-to {
  opacity: 0;
}

/* ========================================= */
/* DECORATIONS CSS (Flat Illustration Style) */
/* ========================================= */
.decoration {
  position: absolute;
  z-index: 5;
  pointer-events: none;
}

/* Map under laptop */
.decoration-map {
  left: 6vw;
  top: 5vh;
  width: 280px;
  height: 200px;
  transform: rotate(-5deg);
  z-index: 4; /* Below laptop */
}

/* Ivy */
.decoration-ivy {
  right: -20px;
  top: -20px;
  width: 250px;
  height: 250px;
}

.decoration-plant {
  left: 2vw;
  bottom: 20vh;
  width: 120px;
  height: 120px;
  transform: rotate(25deg);
}

/* Coffee Cup */
.decoration-coffee {
  left: 10vw;
  top: 45vh;
  width: 100px;
  height: 100px;
  transform: rotate(-15deg);
}
.coffee-saucer {
  position: absolute;
  width: 110px;
  height: 110px;
  background: #f0f0f0;
  border: 3px solid #2c2c2c;
  border-radius: 50%;
  top: -5px;
  left: -5px;
  box-shadow: 6px 6px 0 rgba(0,0,0,0.1);
}
.coffee-cup {
  position: absolute;
  width: 80px;
  height: 80px;
  background: #fdfdfd;
  border: 3px solid #2c2c2c;
  border-radius: 50%;
  left: 10px;
  top: 10px;
}
.coffee-liquid {
  position: absolute;
  inset: 10px;
  background: #5d4037;
  border-radius: 50%;
  border: 3px solid #2c2c2c;
  display: flex;
  justify-content: center;
  align-items: center;
}
.coffee-handle {
  position: absolute;
  width: 30px;
  height: 20px;
  border: 8px solid #fdfdfd;
  border-radius: 12px;
  left: -20px;
  top: 30px;
  z-index: -1;
  border-color: #2c2c2c #fdfdfd #2c2c2c #2c2c2c;
}

/* Carabiner */
.decoration-carabiner {
  left: 20vw;
  bottom: 8vh;
  width: 80px;
  height: 120px;
  transform: rotate(15deg);
}

/* Rope */
.decoration-rope {
  left: 5vw;
  bottom: -5vh;
  width: 250px;
  height: 200px;
  transform: rotate(0deg);
}

/* Shoes */
.decoration-shoes {
  right: 5vw;
  bottom: 5vh;
  width: 250px;
  height: 200px;
  transform: rotate(-10deg);
}
</style>
