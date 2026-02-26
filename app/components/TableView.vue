<script setup lang="ts">
import { ref, computed, useTemplateRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTransition, TransitionPresets, useElementHover } from '@vueuse/core';
import InteractiveBook from '~/components/InteractiveBook.vue';
import LaptopApp from '~/components/LaptopApp.vue';
import CameraApp from '~/components/CameraApp.vue';
import DraggableItem from '~/components/DraggableItem.vue';

const route = useRoute();
const router = useRouter();

const isBookClosed = ref(false);

const itemOffsets = ref({
  laptop: { dx: 0, dy: 0 },
  camera: { dx: 0, dy: 0 },
  book: { dx: 0, dy: 0 }
});

const handlePositionUpdate = (item: 'laptop'|'camera'|'book', pos: { dx: number, dy: number }) => {
  itemOffsets.value[item] = pos;
};

const activeItem = computed(() => {
  if (route.path === '/') return 'table';
  if (route.path === '/projects') return 'laptop';
  if (route.path === '/photos') return 'camera';
  if (route.path.startsWith('/read') && isBookClosed.value) return 'table';
  return 'book';
});

const targetTransform = computed(() => {
  if (activeItem.value === 'table') {
    return [0.65, 0, 3.25, 0, 0, 0];
  } else if (activeItem.value === 'book') {
    return [1, 0, 0, 0, -itemOffsets.value.book.dx, -itemOffsets.value.book.dy];
  } else if (activeItem.value === 'laptop') {
    return [3.5, 122.5, 112, 31.5, -itemOffsets.value.laptop.dx * 3.5, -itemOffsets.value.laptop.dy * 3.5];
  } else if (activeItem.value === 'camera') {
    return [3.5, -112, 112, 0, -itemOffsets.value.camera.dx * 3.5, -itemOffsets.value.camera.dy * 3.5];
  }
  return [0.65, 0, 3.25, 0, 0, 0];
});

const animatedTransformArray = useTransition(targetTransform, {
  duration: 1200,
  transition: TransitionPresets.easeOutCubic,
});

const surfaceStyle = computed(() => {
  const [scale, xVW, yVH, extraYVW, dynX, dynY] = animatedTransformArray.value;
  return {
    transform: `translate(calc(${xVW}vw + ${dynX}px), calc(${yVH}vh + ${extraYVW}vw + ${dynY}px)) scale(${scale})`
  };
});

// Item wrapping animations using VueUse
const laptopRef = ref(null);
const cameraRef = ref(null);

const extractEl = (refVal: any) => refVal?.$el ?? refVal;
const isLaptopHovered = useElementHover(() => extractEl(laptopRef.value));
const isCameraHovered = useElementHover(() => extractEl(cameraRef.value));

const laptopTarget = computed(() => {
  if (activeItem.value === 'laptop') return [1, 0, -50, -50];
  if (activeItem.value === 'table' && isLaptopHovered.value) return [0.9, -15, -50, -50];
  return [0.85, -15, -50, -50];
});

const cameraTarget = computed(() => {
  if (activeItem.value === 'camera') return [1, 0, -50, -50];
  if (activeItem.value === 'table' && isCameraHovered.value) return [1.05, 25, -50, -50];
  return [1, 25, -50, -50];
});

const bookTarget = computed(() => {
  if (activeItem.value === 'book') return [1, 0, -50, -50];
  return [0.4, 6, -45, -45];
});

const laptopAnimArr = useTransition(laptopTarget, { duration: 1200, transition: TransitionPresets.easeOutCubic });
const cameraAnimArr = useTransition(cameraTarget, { duration: 1200, transition: TransitionPresets.easeOutCubic });
const bookAnimArr = useTransition(bookTarget, { duration: 1200, transition: TransitionPresets.easeOutCubic });

const laptopAnim = computed(() => ({ scale: laptopAnimArr.value[0], rot: laptopAnimArr.value[1], tx: laptopAnimArr.value[2], ty: laptopAnimArr.value[3] }));
const cameraAnim = computed(() => ({ scale: cameraAnimArr.value[0], rot: cameraAnimArr.value[1], tx: cameraAnimArr.value[2], ty: cameraAnimArr.value[3] }));
const bookAnim = computed(() => ({ scale: bookAnimArr.value[0], rot: bookAnimArr.value[1], tx: bookAnimArr.value[2], ty: bookAnimArr.value[3] }));

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
    <div class="table-surface" :class="[`active-${activeItem}`]" :style="surfaceStyle">
      
      <!-- Decorations -->
      <TransitionGroup name="fade-item">
        <DraggableItem v-show="activeItem === 'table'" key="map" initialCssClass="decoration decoration-map" :isActive="activeItem === 'table'" :scale="0.65">
          <img src="/images/desk/map.png" class="w-full h-full pointer-events-none" />
        </DraggableItem>

        <!-- <DraggableItem v-show="activeItem === 'table'" key="ivy" initialCssClass="decoration decoration-ivy" :isActive="activeItem === 'table'" :scale="0.65">
          <img src="/images/desk/ivy.svg" class="w-full h-full pointer-events-none" />
        </DraggableItem> -->

        <DraggableItem v-show="activeItem === 'table'" key="plant" initialCssClass="decoration decoration-plant" :isActive="activeItem === 'table'" :scale="0.65">
          <img src="/images/desk/plant.png" class="w-full h-full pointer-events-none" />
        </DraggableItem>

        <DraggableItem v-show="activeItem === 'table'" key="coffee" initialCssClass="decoration decoration-coffee" :isActive="activeItem === 'table'" :scale="0.65">
          <img src="/images/desk/coffee.png" class="w-full h-full pointer-events-none" />
        </DraggableItem>

        <!-- <DraggableItem v-show="activeItem === 'table'" key="shoes" initialCssClass="decoration decoration-shoes" :isActive="activeItem === 'table'" :scale="0.65">
          <img src="/images/desk/shoes.svg" class="w-full h-full pointer-events-none" />
        </DraggableItem>

        <!-- <DraggableItem v-show="activeItem === 'table'" key="rope" initialCssClass="decoration decoration-rope" :isActive="activeItem === 'table'" :scale="0.65">
          <img src="/images/desk/rope.svg" class="w-full h-full pointer-events-none" />
        </DraggableItem>

        <!-- <DraggableItem v-show="activeItem === 'table'" key="carabiner" initialCssClass="decoration decoration-carabiner" :isActive="activeItem === 'table'" :scale="0.65">
          <img src="/images/desk/clips.svg" class="w-full h-full pointer-events-none" />
        </DraggableItem> -->
      </TransitionGroup>


      <!-- Laptop -->
      <Transition name="fade-item">
        <DraggableItem
          v-show="activeItem !== 'book'"
          ref="laptopRef"
          initialCssClass="laptop-wrapper" 
          :style="{ transform: `translate(${laptopAnim.tx}%, ${laptopAnim.ty}%) scale(${laptopAnim.scale}) rotate(${laptopAnim.rot}deg)` }"
          :class="{ 'is-active': activeItem === 'laptop' }"
          :isActive="activeItem === 'table'"
          :scale="0.65"
          @click="activeItem === 'table' && openItem('laptop')"
          @update:position="p => handlePositionUpdate('laptop', p)"
        >
        <div class="laptop-item relative">
          <img src="/images/desk/laptop.png" class="absolute inset-0 w-full h-full pointer-events-none" />
          
          <!-- The screen -->
          <div class="macbook-screen-area absolute top-[4.5vw] left-[2.5vw] w-[30vw] h-[16vw] flex justify-center items-center px-[0.8vw] pt-[0.4vw] pb-[1.1vw]">
            <div class="screen-content" v-if="activeItem === 'laptop'">
              <LaptopApp @close="openItem('table')" />
            </div>
            <div class="screen-content-preview" v-else>
               <!-- Subtle glow or off screen placeholder could go here if needed -->
            </div>
          </div>
        </div>
        </DraggableItem>
      </Transition>

      <!-- Camera -->
      <Transition name="fade-item">
        <DraggableItem
          v-show="activeItem !== 'book'"
          ref="cameraRef"
          initialCssClass="camera-wrapper" 
          :style="{ transform: `translate(${cameraAnim.tx}%, ${cameraAnim.ty}%) scale(${cameraAnim.scale}) rotate(${cameraAnim.rot}deg)` }"
          :class="{ 'is-active': activeItem === 'camera' }"
          :isActive="activeItem === 'table'"
          :scale="0.65"
          @click="activeItem === 'table' && openItem('camera')"
          @update:position="p => handlePositionUpdate('camera', p)"
        >
        <div class="camera-item relative w-[16vw] h-[10vw]">
          <img src="/images/desk/camera.png" class="absolute inset-0 w-full h-full pointer-events-none" />
        </div>
        </DraggableItem>
      </Transition>

      <!-- Notebook -->
      <DraggableItem
        initialCssClass="book-wrapper-table" 
        :style="{ 
          transform: `translate(${bookAnim.tx}%, ${bookAnim.ty}%) scale(${bookAnim.scale}) rotate(${bookAnim.rot}deg)`,
          opacity: (activeItem !== 'table' && activeItem !== 'book') ? 0.8 : 1,
          pointerEvents: (activeItem !== 'table' && activeItem !== 'book') ? 'none' : 'auto'
        }"
        :class="{ 'is-active': activeItem === 'book' }"
        :isActive="activeItem === 'table'"
        :scale="0.65"
        @update:position="p => handlePositionUpdate('book', p)"
      >
        <!-- The InteractiveBook itself handles its own internal routing logic -->
        <!-- We removed the click handler here so it doesn't block clicks; we'll click the book directly -->
        <InteractiveBook @update:closed="isBookClosed = $event" />
      </DraggableItem>

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
  /* transition property removed as VueUse handles interpolation now */
  transform-origin: center center;
}

/* ITEM WRAPPERS */
.table-item {
  position: absolute;
  /* transition property removed as VueUse handles interpolation now */
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
  z-index: 5;
  pointer-events: none; /* Let clicks pass through to laptop and camera */
}


/* When desk is active, scatter items slightly */
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
  width: 40vw;
  z-index: 10;
}
.active-laptop .laptop-wrapper {
  z-index: 20;
}

/* CAMERA WRAPPER */
.camera-wrapper {
  /* Position cleanly in top right corner */
  left: 82vw;
  top: 18vh;
  width: 25vw;
  z-index: 10;
}
.active-camera .camera-wrapper {
  z-index: 20;
}

/* ========================================= */
/* CAMERA CSS (Replaced by Image) */
/* ========================================= */
.camera-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 18vw;
  width: 25vw;
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
  width: 40vw;
  height: 40vw;
  transform: rotate(14deg);
}

.macbook-screen-area {
  transform: rotate(-15deg);
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
  width: 40vw;
  height: 33vw;
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
  width: 40vw;
  height: 40vw;
}

/* Coffee Cup */
.decoration-coffee {
  left: 10vw;
  top: 45vh;
  width: 30vw;
  height: 25vw;
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
