<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Intro from '~/components/content/Intro.vue'
import Garden from '~/components/content/Garden.vue'
import Projects from '~/components/content/Projects.vue'
import Cv from '~/components/content/Cv.vue'
import Photos from '~/components/content/Photos.vue'
import BookPage from '~/components/BookPage.vue'

const bookRef = ref(null);
const route = useRoute();
const router = useRouter();
let pageFlipInstance = null;
let isFlippingFromRoute = false; 

// Map routes to page indices
// Page 0: Cover (Route: /)
// Page 1-2: Spread 1 (Route: /read/1)
// Page 3-4: Spread 2 (Route: /read/2)
// ...
const getPageIndexFromRoute = () => {
  // Root -> Cover (Page 0)
  if (route.path === '/' || route.path === '/book') return 0;
  const spreadParam = route.params.spread;
  const spreadId = spreadParam ? parseInt(Array.isArray(spreadParam) ? spreadParam[0] : spreadParam) : 1;
  
  if (isNaN(spreadId) || spreadId < 1) return 1;

  // Spread 1 -> Page 1
  // Spread 2 -> Page 3
  // Formula: (Spread - 1) * 2 + 1
  return (spreadId - 1) * 2 + 1;
};

const getRouteFromPageIndex = (pageIndex) => {
  if (pageIndex === 0) return '/'; 
  
  // Page 1, 2 -> Spread 1 -> '/read/1'
  // Page 3, 4 -> Spread 2 -> '/read/2'
  const spreadId = Math.floor((pageIndex - 1) / 2) + 1;
  return `/read/${spreadId}`;
};

onMounted(async () => {
  const { PageFlip } = await import('page-flip');

  await nextTick();

  if (bookRef.value) {
    const startPage = getPageIndexFromRoute();

    pageFlipInstance = new PageFlip(bookRef.value, {
      width: 550,
      height: 733,
      size: "stretch",
      minWidth: 300,
      maxWidth: 2000,
      minHeight: 400,
      maxHeight: 2000,
      showCover: true,
      drawShadow: true,
      maxShadowOpacity: 0.1,
      flippingTime: 800,
      usePortrait: false,
      startPage: startPage,
      mobileScrollSupport: true,
      showHover: false,
      showPageCorners: false,
      clickEventForward: false,
      useMouseEvents: true,
      swipeDistance: 30,
      startZIndex: 0
    });

    const pages = bookRef.value.querySelectorAll('.page-content');
    pageFlipInstance.loadFromHTML(pages);

    // EVENT: Flip -> Update Route
    pageFlipInstance.on('flip', (e) => {
      const newPageIndex = e.data;
      const newPath = getRouteFromPageIndex(newPageIndex);
      
      if (route.path !== newPath) {
        // Only push if not already triggered by route
        if (!isFlippingFromRoute) {
          router.push(newPath);
        }
      }
      isFlippingFromRoute = false;
    });
  }
});

onBeforeUnmount(() => {
  if (pageFlipInstance) {
    pageFlipInstance.destroy();
    pageFlipInstance = null;
  }
});

// WATCH: Route -> Trigger Flip
watch(() => route.fullPath, () => {
  if (!pageFlipInstance) return;
  const targetPage = getPageIndexFromRoute();
  const currentPage = pageFlipInstance.getCurrentPageIndex();

  // Check if we are already seeing this page (or its spread partner)
  if (currentPage === targetPage || (currentPage + 1 === targetPage && currentPage % 2 === 1)) {
    return;
  }

  // CRITICAL: Check if an animation is already in progress
  const state = pageFlipInstance.getState();
  if (state !== 'read') {
    // If we are already flipping, targetPage will eventually be reached or 
    // we should wait for the current one to finish. 
    // However, if the user clicked a TOC link, we want to OVERRIDE if possible
    // or at least not start a concurrent animation that glitches.
    return;
  }
  
  isFlippingFromRoute = true;
  
  try {
    // flip() animates from current to target. 
    // If the target is far away, page-flip handles the transition.
    pageFlipInstance.flip(targetPage);
  } catch (err) {
    console.error("Flip error", err);
    isFlippingFromRoute = false;
  }
});
</script>

<template>
  <div class="book-environment">
    
    <div class="book-wrapper">
      
      <!-- SVG SPIRAL BINDING (Centered) -->
      <!-- LEATHER CORDS BINDING -->
      <div class="hidden md:flex w-16 absolute left-1/2 top-0 bottom-0 -translate-x-1/2 z-[2] pointer-events-none select-none flex-col justify-evenly py-10">
         <div v-for="i in 3" :key="i" class="relative w-full h-8 flex items-center justify-center">
             <!-- The Cord -->
             <div class="w-[120%] h-2 bg-[#3e2723] rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.4)] relative z-10 flex items-center justify-center">
                 <!-- Knot/Stitch Detail -->
                 <div class="w-8 h-3 bg-[#271c19] rounded-sm absolute left-1/2 -translate-x-1/2 shadow-inner"></div>
                 <div class="w-full h-[1px] bg-white/10 absolute top-[1px]"></div>
             </div>
             <!-- Holes on pages -->
             <div class="absolute left-0 w-3 h-3 rounded-full bg-[#1a1814]/30 shadow-inner translate-x-1"></div>
             <div class="absolute right-0 w-3 h-3 rounded-full bg-[#1a1814]/30 shadow-inner -translate-x-1"></div>
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
                 <Intro side="left" />
             </BookPage>
        </div>
        <div class="page-content">
          <BookPage class="h-full">
            <Intro side="right" />
          </BookPage>
        </div>
        
        <div class="page-content">
          <BookPage class="h-full">
            <Garden side="left" />
          </BookPage>
        </div>
        <div class="page-content">
          <BookPage class="h-full">
            <Garden side="right" />
          </BookPage>
        </div>

        <div class="page-content">
          <BookPage class="h-full">
            <Projects side="left" />
          </BookPage>
        </div>
        <div class="page-content">
          <BookPage class="h-full">
            <Projects side="right" />
          </BookPage>
        </div>

        <div class="page-content">
          <BookPage class="h-full">
             <Cv side="left" />
          </BookPage>
        </div>
        <div class="page-content">
          <BookPage class="h-full">
             <Cv side="right" />
          </BookPage>
        </div>

        <div class="page-content">
          <BookPage class="h-full">
             <Photos side="left" />
          </BookPage>
        </div>
        <div class="page-content">
          <BookPage class="h-full">
             <Photos side="right" />
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


/* Override page-flip hover effects forcefully */
/* Note: .stf__block is the PAGE wrapper in some versions, do not hide it! */
:global(.stf__item.-hover) {
  /* Prevent the "peel" transform if possible */
  /* If this hides the page on hover, we might need to be more specific. 
     But for now, removing the filter usually just stops the shadow/highlight. */
  filter: none !important;
}

.cover {
  background-color: #8b4513;
}
</style>
