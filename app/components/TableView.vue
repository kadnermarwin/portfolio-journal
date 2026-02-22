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
        <div v-show="activeItem === 'table'" key="plant" class="table-item decoration decoration-plant">
          <div class="plant-pot">
             <div class="plant-dirt"></div>
             <div class="leaf leaf-1"></div>
             <div class="leaf leaf-2"></div>
             <div class="leaf leaf-3"></div>
             <div class="leaf leaf-4"></div>
             <div class="leaf leaf-5"></div>
          </div>
        </div>

        <div v-show="activeItem === 'table'" key="coffee" class="table-item decoration decoration-coffee">
          <div class="coffee-saucer"></div>
          <div class="coffee-cup">
            <div class="coffee-liquid"></div>
            <div class="coffee-handle"></div>
          </div>
        </div>

        <div v-show="activeItem === 'table'" key="pens" class="table-item decoration decoration-pens">
          <div class="pen-1"></div>
          <div class="pen-2"></div>
          <div class="pencil"></div>
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
        <div class="laptop-item">
          <!-- The screen -->
          <div class="macbook-screen">
            <div class="screen-content" v-if="activeItem === 'laptop'">
              <LaptopApp @close="openItem('table')" />
            </div>
            <div class="screen-content-preview" v-else>
               <!-- Subtle glow or off screen -->
            </div>
          </div>
          <!-- The base -->
          <div class="macbook-base">
            <div class="macbook-keyboard">
              <div class="keyboard-inner"></div>
            </div>
            <div class="macbook-trackpad"></div>
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
        <div class="camera-item">
          <div class="camera-body">
            <div class="camera-flash">
              <div class="camera-flash-bulb"></div>
            </div>
            <div class="camera-shutter"></div>
            <div class="camera-lens">
              <div class="camera-lens-inner"></div>
            </div>
            <div class="camera-grip"></div>
          </div>
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
:global(.dark) .table-environment {
  background-color: #1a1814;
}

.desk-surface {
  position: absolute;
  inset: -20vw; /* extended so when zooming we don't clip */
  background: radial-gradient(circle at center, #4e342e 0%, #2e1d18 100%);
  z-index: 0;
  transition: opacity 1s cubic-bezier(0.25, 1, 0.5, 1);
  opacity: 1;
}

:global(.dark) .desk-surface {
  background: radial-gradient(circle at center, #2e1d18 0%, #150d0b 100%);
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
  transform: translate(-45%, -45%) rotate(3deg);
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
/* CAMERA CSS */
/* ========================================= */
.camera-item {
  width: 200px;
  height: 130px;
  background: #2b2b2b;
  border-radius: 12px;
  box-shadow: 0 15px 25px rgba(0,0,0,0.6), inset 0 2px 3px rgba(255,255,255,0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;
}
.camera-item::after {
  content: '';
  position: absolute;
  inset: 5px;
  border: 1px solid #3c3c3c;
  border-radius: 8px;
  pointer-events: none;
}
.camera-body {
  position: relative;
  width: 100%;
  height: 100%;
}
.camera-flash {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 70px;
  height: 25px;
  background: #333;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 -2px 5px rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.camera-flash-bulb {
  width: 40px;
  height: 12px;
  background: #fff;
  border-radius: 4px;
  box-shadow: inset 0 0 5px #000, 0 0 10px rgba(255,255,255,0.2);
}
.camera-shutter {
  position: absolute;
  top: -8px;
  right: 20px;
  width: 30px;
  height: 8px;
  background: silver;
  border-radius: 5px 5px 0 0;
  box-shadow: inset 0 -2px 5px rgba(0,0,0,0.3);
}
.camera-lens {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90px;
  height: 90px;
  background: #111;
  border-radius: 50%;
  border: 6px solid #444;
  box-shadow: 0 10px 20px rgba(0,0,0,0.8), inset 0 0 15px rgba(0,0,0,1);
  display: flex;
  justify-content: center;
  align-items: center;
}
.camera-lens-inner {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #597d9a 0%, #0d1b2a 70%);
  border: 3px solid #000;
  box-shadow: inset -5px -5px 10px rgba(0,0,0,0.5);
  position: relative;
}
.camera-lens-inner::after {
  content: '';
  position: absolute;
  top: 15%;
  left: 20%;
  width: 12px;
  height: 12px;
  background: rgba(255,255,255,0.4);
  border-radius: 50%;
}
.camera-grip {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 35px;
  height: 80%;
  background: #1a1a1a;
  border-radius: 8px;
  background-image: radial-gradient(#333 15%, transparent 16%);
  background-size: 4px 4px;
  box-shadow: -2px 0 5px rgba(0,0,0,0.5);
}


/* ========================================= */
/* LAPTOP CSS */
/* ========================================= */
.laptop-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.macbook-screen {
  width: 380px;
  height: 240px;
  background: #000;
  border-radius: 12px 12px 0 0;
  box-shadow: inset 0 2px 5px rgba(255,255,255,0.1), 0 -5px 15px rgba(0,0,0,0.5);
  margin-bottom: -2px;
  z-index: 1;
  border-top: 1px solid #4df;
  border-left: 1px solid #3c3c3c;
  border-right: 1px solid #3c3c3c;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
}
.screen-content-preview {
  position: absolute;
  inset: 6px;
  background: #0a0a0a;
  border-radius: 6px;
  background-image: linear-gradient(135deg, rgba(255,255,255,0.05) 25%, transparent 25%);
}
.screen-content {
  position: absolute;
  inset: 6px;
  background: #111;
  border-radius: 6px;
  overflow: hidden;
  /* Very important: because the laptop is scaled up by 2.8, we might need to apply inverse scaling to the actual webview if it uses absolute px, but for now we let it scale up naturally. */
  display: flex;
}
/* If the laptop screen is tiny in px (368x228) we scale it inside the laptop view *only* mentally. The content within LaptopApp will just be responsive. */

.macbook-base {
  width: 400px;
  height: 280px;
  background: #ccd0d5; 
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 20px 40px rgba(0,0,0,0.6), inset 0 0 15px rgba(255,255,255,0.6);
  z-index: 2;
  border: 1px solid #aeb4bc;
}
:global(.dark) .macbook-base {
  background: #373a3d; 
  box-shadow: 0 20px 40px rgba(0,0,0,0.8), inset 0 0 15px rgba(255,255,255,0.2);
  border: 1px solid #222;
}

.macbook-keyboard {
  width: 330px;
  height: 140px;
  background: #1c1c1e;
  border-radius: 8px;
  margin-bottom: 24px;
  box-shadow: inset 0 2px 6px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.2);
  padding: 4px;
}
.keyboard-inner {
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(90deg, transparent 94%, #111 6%),
    linear-gradient(0deg, transparent 88%, #111 12%);
  background-size: 22px 22px;
  border-radius: 4px;
}
:global(.dark) .keyboard-inner {
  background-image: 
    linear-gradient(90deg, transparent 94%, #000 6%),
    linear-gradient(0deg, transparent 88%, #000 12%);
}

.macbook-trackpad {
  width: 120px;
  height: 70px;
  background: #b5b9bf;
  border-radius: 8px;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.5);
}
:global(.dark) .macbook-trackpad {
  background: #2d2f32;
  box-shadow: inset 0 1px 4px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.1);
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
/* DECORATIONS CSS */
/* ========================================= */
.decoration {
  position: absolute;
  z-index: 5;
  pointer-events: none;
}

/* Plant */
.decoration-plant {
  right: 18vw;
  top: 8vh;
  width: 80px;
  height: 80px;
  transform: rotate(15deg);
}
.plant-pot {
  width: 60px;
  height: 60px;
  background: #c17754;
  border-radius: 50%;
  position: relative;
  box-shadow: inset -5px -5px 10px rgba(0,0,0,0.3), 5px 15px 15px rgba(0,0,0,0.4);
}
.plant-dirt {
  position: absolute;
  inset: 8px;
  background: #3e2723;
  border-radius: 50%;
}
.leaf {
  position: absolute;
  background: #4caf50;
  border-radius: 0 50% 0 50%;
  box-shadow: inset -2px -2px 5px rgba(0,0,0,0.2);
}
.leaf-1 { width: 40px; height: 40px; top: -15px; left: -10px; transform: rotate(-20deg); }
.leaf-2 { width: 50px; height: 50px; top: -20px; right: -15px; transform: rotate(40deg); background: #388e3c; }
.leaf-3 { width: 45px; height: 45px; top: 10px; right: -25px; transform: rotate(90deg); }
.leaf-4 { width: 35px; height: 35px; bottom: -10px; left: -10px; transform: rotate(-110deg); background: #2e7d32; }
.leaf-5 { width: 55px; height: 55px; top: 5px; left: -30px; transform: rotate(-60deg); }

/* Coffee Cup */
.decoration-coffee {
  left: 15vw;
  bottom: 12vh;
  width: 90px;
  height: 90px;
  transform: rotate(-30deg);
}
.coffee-saucer {
  position: absolute;
  width: 110px;
  height: 110px;
  background: #e0e0e0;
  border-radius: 50%;
  top: -10px;
  left: -10px;
  box-shadow: 2px 10px 15px rgba(0,0,0,0.3), inset -2px -2px 5px rgba(255,255,255,0.8);
}
.coffee-cup {
  position: absolute;
  width: 80px;
  height: 80px;
  background: #fdfdfd;
  border-radius: 50%;
  box-shadow: inset -3px -3px 10px rgba(0,0,0,0.1), 0 5px 10px rgba(0,0,0,0.2);
}
.coffee-liquid {
  position: absolute;
  inset: 6px;
  background: #4e342e;
  border-radius: 50%;
  box-shadow: inset 2px 2px 5px rgba(0,0,0,0.5);
  border: 4px solid #8d6e63;
}
.coffee-handle {
  position: absolute;
  width: 30px;
  height: 20px;
  border: 8px solid #fdfdfd;
  border-radius: 15px;
  right: -25px;
  top: 30px;
  box-shadow: 2px 5px 8px rgba(0,0,0,0.2);
}

/* Pens/Pencils */
.decoration-pens {
  right: 22vw;
  bottom: 15vh;
  width: 100px;
  height: 100px;
  transform: rotate(45deg);
}
.pen-1, .pen-2, .pencil {
  position: absolute;
  border-radius: 4px;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
}
.pen-1 {
  width: 120px;
  height: 12px;
  background: #111;
  top: 20px;
  left: -10px;
  transform: rotate(-15deg);
}
.pen-1::before {
  content: ''; position: absolute; left: -10px; top: 1px; width: 0; height: 0;
  border-top: 5px solid transparent; border-bottom: 5px solid transparent; border-right: 10px solid #111;
}
.pen-2 {
  width: 110px;
  height: 14px;
  background: #1565c0;
  top: 40px;
  left: 0;
  transform: rotate(5deg);
}
.pen-2::before {
  content: ''; position: absolute; left: -10px; top: 2px; width: 0; height: 0;
  border-top: 5px solid transparent; border-bottom: 5px solid transparent; border-right: 10px solid #bdbdbd;
}
.pencil {
  width: 100px;
  height: 10px;
  background: #fbc02d;
  top: 60px;
  left: 10px;
  transform: rotate(-25deg);
}
.pencil::before {
  content: ''; position: absolute; left: -12px; top: 0; width: 0; height: 0;
  border-top: 5px solid transparent; border-bottom: 5px solid transparent; border-right: 12px solid #ffcc80;
}
.pencil::after {
  content: ''; position: absolute; left: -12px; top: 3px; width: 4px; height: 4px; background: #333; border-radius: 50%;
}
</style>
