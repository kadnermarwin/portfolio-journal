<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import IntroLeft from '~/components/content/IntroLeft.vue'
import IntroRight from '~/components/content/IntroRight.vue'
import GardenLeft from '~/components/content/GardenLeft.vue'
import GardenRight from '~/components/content/GardenRight.vue'
import ProjectsLeft from '~/components/content/ProjectsLeft.vue'
import ProjectsRight from '~/components/content/ProjectsRight.vue'
import CvLeft from '~/components/content/CvLeft.vue'
import CvRight from '~/components/content/CvRight.vue'
import PhotosLeft from '~/components/content/PhotosLeft.vue'
import PhotosRight from '~/components/content/PhotosRight.vue'
import BookPage from '~/components/BookPage.vue'

const bookRef = ref(null);
const route = useRoute();
const router = useRouter();
let pageFlipInstance = null;
let isFlippingByRoute = false; // Flag to prevent circular updates

// Map routes to page indices
// Page 0: Cover (Route: /)
// Page 1-2: Spread 1 (Route: /read/1)
// Page 3-4: Spread 2 (Route: /read/2)
// ...
const getPageIndexFromRoute = () => {
  if (route.path === '/' || route.path === '/book') return 0;
  const spreadParam = route.params.spread;
  if (!spreadParam) return 0;
  
  const spreadId = parseInt(Array.isArray(spreadParam) ? spreadParam[0] : spreadParam);
  if (isNaN(spreadId)) return 0;

  // Spread 1 starts at Page 1 (0 is cover)
  // Logic: Spread 1 -> Page 1 (actually view shows 1 & 2)
  // Spread 2 -> Page 3
  // Spread N -> Page (N-1)*2 + 1
  return (spreadId - 1) * 2 + 1;
};

const getRouteFromPageIndex = (pageIndex) => {
  if (pageIndex === 0) return '/';
  // Page 1 or 2 -> Spread 1
  // Page 3 or 4 -> Spread 2
  // Formula: floor((Page - 1) / 2) + 1
  const spreadId = Math.floor((pageIndex - 1) / 2) + 1;
  return `/read/${spreadId}`;
};

onMounted(async () => {
  const { PageFlip } = await import('page-flip');

  if (bookRef.value) {
    const startPage = getPageIndexFromRoute();

    const pageFlip = new PageFlip(bookRef.value, {
      width: 550, // Base width per page
      height: 733, // Base height
      // force spread view
      size: "stretch",
      minWidth: 500, // Significantly lowered to allow fitting on smaller screens
      maxWidth: 2000,
      minHeight: 300,
      maxHeight: 2000,
      showCover: true,
      drawShadow: true,
      maxShadowOpacity: 0.2,
      flippingTime: 1000,
      usePortrait: false, // Attempt to force landscape/spread
      startPage: startPage, // Start at correct page based on URL
      mobileScrollSupport: true 
    });

    const pages = bookRef.value.querySelectorAll('.page-content');
    pageFlip.loadFromHTML(pages);
    pageFlipInstance = pageFlip;

    // EVENT: Flip -> Route
    pageFlip.on('flip', (e) => {
      // If the flip was triggered by our route watcher, ignore strictly to avoid double push
      // But page-flip doesn't pass that context easily.
      // We check if the expected route matches current.
      const newPageIndex = e.data;
      const newPath = getRouteFromPageIndex(newPageIndex);
      
      if (route.path !== newPath && !isFlippingByRoute) {
        router.push(newPath);
      }
      isFlippingByRoute = false; // Reset flag after flip
    });
  }
});

// WATCH: Route -> Flip
watch(() => route.fullPath, () => {
  if (!pageFlipInstance) return;
  const targetPage = getPageIndexFromRoute();
  
  // Check if we are already seeing this page (or its spread partner)
  const currentOrient = pageFlipInstance.getOrientation(); // 'landscape' or 'portrait'
  // Actually pageFlipInstance.getCurrentPageIndex() gives the specific page index
  // Note: specific implementation detail of page-flip: 
  // In landscape, flipping to 1 or 2 results in the same "view".
  
  // Just try to flip to it.
  // We set a flag to tell the flip handler "this is intentional from route, don't push again"
  // (Though pushing same route is usually harmless/ignored by router)
  isFlippingByRoute = true;
  try {
     pageFlipInstance.flip(targetPage);
  } catch (err) {
    console.error("Flip error", err);
  }
});
</script>

<template>
  <div class="book-environment">
    
    <div class="book-wrapper">
      
      <!-- SVG SPIRAL BINDING (Centered) -->
      <div class="hidden md:flex w-12 md:w-20 absolute left-1/2 top-0 bottom-0 -translate-x-1/2 z-50 pointer-events-none select-none py-6 flex-col justify-evenly">
        <div v-for="i in 14" :key="i" class="relative h-20 w-full flex items-center justify-center">
          <!-- Left Hole -->
          <div class="absolute left-[20%] w-3 h-3 rounded-full bg-[#1a1814]/20 dark:bg-black/40 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] transition-colors duration-300"></div>
          <!-- Right Hole -->
          <div class="absolute right-[20%] w-3 h-3 rounded-full bg-[#1a1814]/20 dark:bg-black/40 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] transition-colors duration-300"></div>
          
          <!-- Spiral SVG -->
          <svg class="absolute w-[160%] h-full overflow-visible z-10" viewBox="0 0 100 60" preserveAspectRatio="none">
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

      <div ref="bookRef" class="flip-book">
        
        <!-- COVER PAGE (Right side when closed, but effectively Page 0) -->
        <div class="page-content cover">
             <div class="h-full flex flex-col justify-center items-center bg-leather-brown text-white p-10 border-4 border-[#5a2c0c] shadow-inner">
                <h1 class="text-6xl font-heading mb-4 text-center">Marwin's<br>Logbook</h1>
                <p class="text-xl opacity-80">Click to Open</p>
             </div>
        </div>

        <!-- SPREAD 1: INTRO (Left & Right) -->
        <!-- Note: page-flip considers these pages 1 & 2 -->
        <div class="page-content">
             <BookPage class="h-full">
                 <IntroLeft />
             </BookPage>
        </div>
        <div class="page-content">
          <BookPage class="h-full">
            <IntroRight />
          </BookPage>
        </div>
        
        <!-- SPREAD 2: GARDEN -->
        <div class="page-content">
          <BookPage class="h-full">
            <GardenLeft />
          </BookPage>
        </div>
        <div class="page-content">
          <BookPage class="h-full">
            <GardenRight />
          </BookPage>
        </div>

        <!-- SPREAD 3: PROJECTS -->
        <div class="page-content">
          <BookPage class="h-full">
            <ProjectsLeft />
          </BookPage>
        </div>
        <div class="page-content">
          <BookPage class="h-full">
            <ProjectsRight />
          </BookPage>
        </div>

        <!-- SPREAD 4: CV -->
        <div class="page-content">
          <BookPage class="h-full">
             <CvLeft />
          </BookPage>
        </div>
        <div class="page-content">
          <BookPage class="h-full">
             <CvRight />
          </BookPage>
        </div>

         <!-- SPREAD 5: PHOTOS -->
        <div class="page-content">
          <BookPage class="h-full">
             <PhotosLeft />
          </BookPage>
        </div>
        <div class="page-content">
          <BookPage class="h-full">
             <PhotosRight />
          </BookPage>
        </div>

        <!-- BACK COVER -->
        <div class="page-content cover">
             <div class="h-full flex justify-center items-center bg-leather-brown text-white p-10 border-4 border-[#5a2c0c]">
                <h2 class="text-3xl font-heading">The End</h2>
             </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.book-environment {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  /* Use the same background as the default layout or a nice desk color */
  background-color: #fdfaf4; 
}
:global(.dark) .book-environment {
  background-color: #1a1814;
}

.book-wrapper {
  position: relative;
  /* Logic: scale until we hit max-width OR max-height, keeping aspect ratio */
  width: 100vw;
  height: auto;
  aspect-ratio: 1.5; /* 2 pages wide roughly */
  max-height: 100vh; /* Don't get too tall */
  margin: auto;
}
/* If the screen is very wide but short (height constrained), the max-height above works but width might shrink too */
/* If the screen is narrow (width constrained), 95vw kicks in and height adjusts automatically due to aspect-ratio */

/* --- PAGE STYLING --- */
.page-content {
  background-color: #fdfaf4;
  overflow: hidden;
}
:global(.dark) .page-content {
  background-color: #2a2824;
}

.cover {
  background-color: #8b4513;
}
</style>
