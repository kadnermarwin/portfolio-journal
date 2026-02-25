<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import InteractiveBook from '~/components/InteractiveBook.vue';
import LaptopApp from '~/components/LaptopApp.vue';
import CameraApp from '~/components/CameraApp.vue';
import DraggableItem from '~/components/DraggableItem.vue';

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
        <DraggableItem v-show="activeItem === 'table'" key="map" initialCssClass="decoration decoration-map" :isActive="activeItem === 'table'" :scale="0.65">
          <img src="/images/desk/map.svg" class="w-full h-full pointer-events-none" />
        </DraggableItem>

        <DraggableItem v-show="activeItem === 'table'" key="ivy" initialCssClass="decoration decoration-ivy" :isActive="activeItem === 'table'" :scale="0.65">
          <img src="/images/desk/ivy.svg" class="w-full h-full pointer-events-none" />
        </DraggableItem>

        <DraggableItem v-show="activeItem === 'table'" key="plant" initialCssClass="decoration decoration-plant" :isActive="activeItem === 'table'" :scale="0.65">
          <img src="/images/desk/plant.svg" class="w-full h-full pointer-events-none" />
        </DraggableItem>

        <DraggableItem v-show="activeItem === 'table'" key="coffee" initialCssClass="decoration decoration-coffee" :isActive="activeItem === 'table'" :scale="0.65">
          <img src="/images/desk/coffee.svg" class="w-full h-full pointer-events-none" />
        </DraggableItem>

        <DraggableItem v-show="activeItem === 'table'" key="shoes" initialCssClass="decoration decoration-shoes" :isActive="activeItem === 'table'" :scale="0.65">
          <img src="/images/desk/shoes.svg" class="w-full h-full pointer-events-none" />
        </DraggableItem>

        <DraggableItem v-show="activeItem === 'table'" key="rope" initialCssClass="decoration decoration-rope" :isActive="activeItem === 'table'" :scale="0.65">
          <img src="/images/desk/rope.svg" class="w-full h-full pointer-events-none" />
        </DraggableItem>

        <DraggableItem v-show="activeItem === 'table'" key="carabiner" initialCssClass="decoration decoration-carabiner" :isActive="activeItem === 'table'" :scale="0.65">
          <img src="/images/desk/clips.svg" class="w-full h-full pointer-events-none" />
        </DraggableItem>
      </TransitionGroup>


      <!-- Laptop -->
      <Transition name="fade-item">
        <div 
          v-show="activeItem !== 'book'"
          class="table-item laptop-wrapper" 
          :class="{ 'interactable': activeItem === 'table', 'is-active': activeItem === 'laptop' }"
          @click.stop="activeItem === 'table' && openItem('laptop')"
        >
        <div class="laptop-item relative w-[28vw] h-[37vw]">
          <img src="/images/desk/laptop.svg" class="absolute inset-0 w-full h-full pointer-events-none" />
          
          <!-- The screen -->
          <div class="macbook-screen-area absolute top-[0.7vw] left-0 w-[28vw] h-[16.7vw] flex justify-center items-center px-[0.8vw] pt-[0.4vw] pb-[1.1vw]">
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
        <div class="camera-item relative w-[16vw] h-[10vw]">
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
  transform: translate(122.5vw, calc(112vh + 31.5vw)) scale(3.5);
}

/* CAMERA ACTIVE: scale heavily and shift to center camera */
.table-surface.active-camera {
  transform: translate(-112vw, 112vh) scale(3.5);
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
  transform: translate(-45%, -45%) rotate(6deg) scale(0.4);
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
  left: 15vw;
  top: 18vh;
  width: 28vw;
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
  left: 82vw;
  top: 18vh;
  width: 16vw;
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
  inset: 1.1vw;
  background: transparent;
}

.screen-content {
  position: absolute;
  inset: 1.1vw;
  background: #fdfaf4;
  border-radius: 0.3vw;
  overflow: hidden;
  display: flex;
  border: 0.2vw solid #2c2c2c;
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
}

/* Map under laptop */
.decoration-map {
  left: 6vw;
  top: 5vh;
  width: 19vw;
  height: 14vw;
  transform: rotate(-5deg);
  z-index: 4; /* Below laptop */
}

/* Ivy */
.decoration-ivy {
  right: -1.5vw;
  top: -1.5vw;
  width: 17vw;
  height: 17vw;
}

.decoration-plant {
  left: 2vw;
  bottom: 20vh;
  width: 9vw;
  height: 9vw;
  transform: rotate(25deg);
}

/* Coffee Cup */
.decoration-coffee {
  left: 10vw;
  top: 45vh;
  width: 7vw;
  height: 7vw;
  transform: rotate(-15deg);
}
/* Carabiner */
.decoration-carabiner {
  left: 20vw;
  bottom: 8vh;
  width: 6vw;
  height: 9vw;
  transform: rotate(15deg);
}

/* Rope */
.decoration-rope {
  left: 5vw;
  bottom: -5vh;
  width: 17vw;
  height: 14vw;
  transform: rotate(0deg);
}

/* Shoes */
.decoration-shoes {
  right: 5vw;
  bottom: 5vh;
  width: 17vw;
  height: 14vw;
  transform: rotate(-10deg);
}
</style>
