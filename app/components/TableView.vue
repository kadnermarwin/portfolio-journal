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
          <!-- A simple SVG or CSS representation of a map -->
          <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="150" fill="#e8e2c7" stroke="#2c2c2c" stroke-width="3"/>
            <path d="M40 0V150M80 0V150M120 0V150M160 0V150M0 40H200M0 80H200M0 120H200" stroke="#d5cead" stroke-width="1.5"/>
            <path d="M20 150C30 130 50 120 80 140C110 160 140 130 180 150" stroke="#7ab583" stroke-width="3" fill="#a4d1a2" fill-opacity="0.5"/>
            <circle cx="100" cy="80" r="4" fill="#d9544d" stroke="#2c2c2c" stroke-width="2"/>
          </svg>
        </div>

        <div v-show="activeItem === 'table'" key="ivy" class="table-item decoration decoration-ivy">
          <svg viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M150 0 C130 20 120 50 140 80 C160 110 120 130 100 150" stroke="#68a562" stroke-width="4" stroke-linecap="round"/>
            <path d="M150 20 C110 20 90 40 80 70 C70 100 80 120 60 140" stroke="#68a562" stroke-width="4" stroke-linecap="round"/>
            <path d="M150 50 C120 40 100 10 70 0" stroke="#68a562" stroke-width="4" stroke-linecap="round"/>
            <!-- Leaves -->
            <path d="M130 30 C120 20 110 30 120 40 C130 50 140 40 130 30Z" fill="#7ab583" stroke="#2c2c2c" stroke-width="2"/>
            <path d="M100 50 C90 40 80 50 90 60 C100 70 110 60 100 50Z" fill="#7ab583" stroke="#2c2c2c" stroke-width="2"/>
            <path d="M130 80 C120 70 110 80 120 90 C130 100 140 90 130 80Z" fill="#7ab583" stroke="#2c2c2c" stroke-width="2"/>
            <path d="M90 90 C80 80 70 90 80 100 C90 110 100 100 90 90Z" fill="#7ab583" stroke="#2c2c2c" stroke-width="2"/>
            <!-- Pot partially visible at top right -->
            <path d="M120 -20 L160 -20 L150 20 L130 20 Z" fill="#d48a60" stroke="#2c2c2c" stroke-width="2"/>
          </svg>
        </div>

        <div v-show="activeItem === 'table'" key="plant" class="table-item decoration decoration-plant">
          <div class="plant-pot">
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
          <svg viewBox="0 0 180 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 130 C10 100 30 70 60 50 C90 30 130 20 160 40 C170 50 170 80 150 100 C130 120 90 130 60 140 C40 145 25 140 20 130Z" fill="#7d8a90" stroke="#2c2c2c" stroke-width="3"/>
            <path d="M40 70 C70 50 100 40 130 50" stroke="#e8e2c7" stroke-width="15" stroke-linecap="round"/>
            <path d="M50 100 C80 90 110 80 140 80" stroke="#e8e2c7" stroke-width="15" stroke-linecap="round"/>
            <path d="M150 80 C160 90 160 100 140 110" fill="#edd65a" stroke="#2c2c2c" stroke-width="2"/>
            <path d="M16 110 C5 80 25 50 55 30 C85 10 125 0 155 20 C165 30 165 60 145 80 C125 100 85 110 55 120 C35 125 20 120 16 110Z" fill="#9babaf" stroke="#2c2c2c" stroke-width="3"/>
            <path d="M35 50 C65 30 95 20 125 30" stroke="#e8e2c7" stroke-width="15" stroke-linecap="round" stroke-dasharray="10 5"/>
            <path d="M45 80 C75 70 105 60 135 60" stroke="#e8e2c7" stroke-width="15" stroke-linecap="round" stroke-dasharray="10 5"/>
          </svg>
        </div>

        <div v-show="activeItem === 'table'" key="rope" class="table-item decoration decoration-rope">
          <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M200 130 C150 140 100 130 60 100 C20 70 10 30 30 10 C50 -10 90 0 110 30 C130 60 120 100 90 120 C60 140 20 130 -10 100" stroke="#909b9f" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M200 130 C150 140 100 130 60 100 C20 70 10 30 30 10 C50 -10 90 0 110 30 C130 60 120 100 90 120 C60 140 20 130 -10 100" stroke="#2c2c2c" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" style="mix-blend-mode: overlay;" />
            <path d="M200 130 C150 140 100 130 60 100 C20 70 10 30 30 10 C50 -10 90 0 110 30 C130 60 120 100 90 120 C60 140 20 130 -10 100" stroke="#2c2c2c" stroke-width="3" stroke-dasharray="8 4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        <div v-show="activeItem === 'table'" key="carabiner" class="table-item decoration decoration-carabiner">
          <svg viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 20 C40 10 60 20 70 40 L75 80 C80 100 60 110 40 110 C20 110 10 90 10 70 L5 40 Z" fill="none" stroke="#7bb0ca" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20 20 C40 10 60 20 70 40 L75 80 C80 100 60 110 40 110 C20 110 10 90 10 70 L5 40 Z" fill="none" stroke="#2c2c2c" stroke-width="16" style="mix-blend-mode: overlay;"/>
            <path d="M5 40 L10 70" stroke="#d5cead" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5 40 L10 70" stroke="#2c2c2c" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="40" cy="100" r="4" fill="#2c2c2c"/>
            <path d="M18 18 C38 8 58 18 68 38 L73 78 C78 98 58 108 38 108 C18 108 8 88 8 68 L3 38 Z" fill="none" stroke="#2c2c2c" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
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

.desk-surface {
  position: absolute;
  inset: -20vw; /* extended so when zooming we don't clip */
  background-color: #c99368;
  background-image: 
    repeating-linear-gradient(to bottom, transparent, transparent 150px, rgba(44, 44, 44, 0.4) 150px, rgba(44, 44, 44, 0.4) 152px),
    repeating-linear-gradient(to right, transparent, transparent 80px, rgba(160, 110, 75, 0.1) 80px, rgba(160, 110, 75, 0.1) 85px);
  z-index: 0;
  transition: opacity 1s cubic-bezier(0.25, 1, 0.5, 1);
  opacity: 1;
}

:global(.dark) .desk-surface {
  background-color: #5d4037;
  background-image: 
    repeating-linear-gradient(to bottom, transparent, transparent 150px, rgba(20, 15, 10, 0.5) 150px, rgba(20, 15, 10, 0.5) 152px),
    repeating-linear-gradient(to right, transparent, transparent 80px, rgba(60, 40, 30, 0.2) 80px, rgba(60, 40, 30, 0.2) 85px);
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
/* CAMERA CSS (Flat Illustration Style) */
/* ========================================= */
.camera-item {
  width: 180px;
  height: 120px;
  background: #333638;
  border-radius: 8px;
  border: 3px solid #2c2c2c;
  box-shadow: 6px 6px 0 rgba(0,0,0,0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;
}
.camera-item::after {
  content: '';
  position: absolute;
  top: 15px; right: -8px; width: 6px; height: 30px;
  background: #2c2c2c;
  border-radius: 0 4px 4px 0;
}
.camera-body {
  position: relative;
  width: 100%;
  height: 100%;
}
.camera-flash {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 16px;
  background: #2c2c2c;
  border-radius: 6px 6px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.camera-flash-bulb {
  width: 30px;
  height: 8px;
  background: #e65252;
  border-radius: 4px;
}
.camera-shutter {
  position: absolute;
  top: -6px;
  right: 25px;
  width: 25px;
  height: 6px;
  background: #2c2c2c;
  border-radius: 4px 4px 0 0;
}
.camera-lens {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: #111;
  border-radius: 50%;
  border: 5px solid #2c2c2c;
  box-shadow: 0 0 0 8px #5c6265, -4px 4px 0 rgba(0,0,0,0.2) inset;
  display: flex;
  justify-content: center;
  align-items: center;
}
.camera-lens-inner {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #7bb0ca;
  border: 3px solid #2c2c2c;
  position: relative;
  overflow: hidden;
}
.camera-lens-inner::after {
  content: '';
  position: absolute;
  top: 5px;
  left: 5px;
  width: 15px;
  height: 15px;
  background: #fff;
  border-radius: 50%;
  opacity: 0.8;
}
.camera-grip {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 25px;
  height: 70%;
  background: #2c2c2c;
  border-radius: 4px;
}


/* ========================================= */
/* LAPTOP CSS (Flat Illustration Style) */
/* ========================================= */
.laptop-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  /* subtle shadow to separate from desk */
  box-shadow: 8px 12px 0 rgba(0,0,0,0.1);
  border-radius: 12px;
  border: 3px solid #2c2c2c;
  background: #fdfdfd;
}
.macbook-screen {
  width: 400px;
  height: 250px;
  background: #b5c4cb;
  border-radius: 10px 10px 0 0;
  border-bottom: 3px solid #2c2c2c;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  padding: 12px;
}
.screen-content-preview {
  position: absolute;
  inset: 16px;
  background: #7ab583; /* Green background to match the map in illustration */
  background-image: radial-gradient(circle at center, rgba(255,255,255,0.2) 2px, transparent 2.5px);
  background-size: 10px 10px;
  border: 3px solid #2c2c2c;
  border-radius: 4px;
  overflow: hidden;
}
.screen-content-preview::after {
  content: ''; /* Mountains */
  position: absolute;
  bottom: -5px; left: -10px; right: -10px; height: 120px;
  background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg"><path d="M0 120L50 40L100 120Z" fill="%2368a562" stroke="%232c2c2c" stroke-width="3"/><path d="M70 120L150 20L230 120Z" fill="%237bb0ca" stroke="%232c2c2c" stroke-width="3"/><path d="M180 120L250 50L320 120Z" fill="%23a4d1a2" stroke="%232c2c2c" stroke-width="3"/><path d="M150 20L120 60L140 70L150 55L160 70L180 60Z" fill="%23fdfdfd" stroke="%232c2c2c" stroke-width="3"/></svg>') bottom center / contain repeat-x;
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

.macbook-base {
  width: 400px;
  height: 280px;
  background: #e9eaec; 
  border-radius: 0 0 10px 10px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
:global(.dark) .macbook-base {
  background: #8b929a; 
}

.macbook-keyboard {
  width: 330px;
  height: 140px;
  background: #4a4e51;
  border-radius: 4px;
  margin-bottom: 24px;
  border: 3px solid #2c2c2c;
  padding: 4px;
}
.keyboard-inner {
  width: 100%;
  height: 100%;
  background-image: 
    repeating-linear-gradient(to right, transparent, transparent 18px, #2c2c2c 18px, #2c2c2c 21px),
    repeating-linear-gradient(to bottom, transparent, transparent 18px, #2c2c2c 18px, #2c2c2c 21px);
}
:global(.dark) .keyboard-inner {
  background-image: 
    repeating-linear-gradient(to right, transparent, transparent 18px, #2c2c2c 18px, #2c2c2c 21px),
    repeating-linear-gradient(to bottom, transparent, transparent 18px, #2c2c2c 18px, #2c2c2c 21px);
}

.macbook-trackpad {
  width: 120px;
  height: 60px;
  background: #dcdede;
  border-radius: 4px;
  border: 3px solid #2c2c2c;
}
:global(.dark) .macbook-trackpad {
  background: #73787f;
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

/* Plant in Pot */
.decoration-plant {
  left: 2vw;
  bottom: 20vh;
  width: 100px;
  height: 100px;
  transform: rotate(25deg);
}
.plant-pot {
  width: 70px;
  height: 70px;
  background: #d48a60;
  border: 3px solid #2c2c2c;
  border-radius: 50%;
  position: relative;
  box-shadow: 6px 6px 0 rgba(0,0,0,0.1);
}
.leaf {
  position: absolute;
  background: #7ab583;
  border: 3px solid #2c2c2c;
  border-radius: 0 50% 0 50%;
}
.leaf-1 { width: 50px; height: 50px; top: -15px; left: -10px; transform: rotate(-20deg); }
.leaf-2 { width: 60px; height: 60px; top: -20px; right: -15px; transform: rotate(40deg); background: #68a562; }
.leaf-3 { width: 55px; height: 55px; top: 10px; right: -25px; transform: rotate(90deg); }
.leaf-4 { width: 45px; height: 45px; bottom: -10px; left: -10px; transform: rotate(-110deg); background: #50874c; }
.leaf-5 { width: 65px; height: 65px; top: 5px; left: -30px; transform: rotate(-60deg); }

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
