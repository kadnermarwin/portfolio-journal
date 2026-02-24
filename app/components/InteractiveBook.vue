<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick, computed } from 'vue';
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
const currentPage = ref(0);
const displayPage = ref(0);
const totalPages = ref(0);
let pageFlipInstance = null;
let isFlippingFromRoute = false; 

// Map routes to page indices
// Page 0: Cover (Route: /)
// Page 1-2: Spread 1 (Route: /read/1)
// Page 3-4: Spread 2 (Route: /read/2)
// ...
const getPageIndexFromRoute = () => {
  // Ignore non-book routes
  if (route.path !== '/' && route.path !== '/book' && !route.path.startsWith('/read')) return 0;

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
    const containerWidth = bookRef.value.clientWidth;
    // Use 98dvh for calculation to match CSS
    const containerHeight = window.innerHeight * 0.98;
    
    // Calculate page dimensions to fit exactly (half width since it's a spread)
    const pageWidth = containerWidth / 2;
    const pageHeight = containerHeight;

    pageFlipInstance = new PageFlip(bookRef.value, {
      width: pageWidth, // Base width for aspect ratio
      height: pageHeight, // Base height for aspect ratio
      size: "stretch", // Stretch to container
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
      useMouseEvents: false,
      swipeDistance: 30,
      startZIndex: 0
    });

    // EVENT: State Change -> Manage Z-Index
    let zIndexTimer = null;
    pageFlipInstance.on('changeState', (e) => {
      if (bookRef.value) {
        // Always reset timer on state change to prevent race conditions
        if (zIndexTimer) clearTimeout(zIndexTimer);

        if (e.data === 'flipping') {
          // Add class ONLY when page reaches roughly the middle (half of flippingTime 800ms)
          // This allows binding cords to stay visible for the first half of the arc.
          zIndexTimer = setTimeout(() => {
            bookRef.value?.classList.add('is-animating');
          }, 350);
        } else if (e.data === 'user_fold') {
          // While dragging manually, keep cords visible (do NOT add class)
          bookRef.value.classList.remove('is-animating');
        } else if (e.data === 'read') {
          // Reset when finished
          bookRef.value.classList.remove('is-animating');
        }
      }
    });

    const pages = bookRef.value.querySelectorAll('.page-content');
    pageFlipInstance.loadFromHTML(pages);

    // EVENT: Flip -> Update Route
    pageFlipInstance.on('flip', (e) => {
      const newPageIndex = e.data;
      currentPage.value = newPageIndex;
      displayPage.value = newPageIndex;
      const newPath = getRouteFromPageIndex(newPageIndex);
      
      if (route.path !== newPath) {
        // Only push if not already triggered by route
        if (!isFlippingFromRoute) {
          router.push(newPath);
        }
      }
      isFlippingFromRoute = false;
    });

    // Initialize state
    totalPages.value = pageFlipInstance.getPageCount();
    currentPage.value = startPage;
    displayPage.value = startPage;
  }
});

const nextPage = () => {
  if (pageFlipInstance) {
    const target = currentPage.value === 0 ? 1 : currentPage.value + 2;
    const newPath = getRouteFromPageIndex(target);
    router.push(newPath);
  }
};

const prevPage = () => {
  if (pageFlipInstance) {
    const target = (currentPage.value === 1 || currentPage.value === 2) ? 0 : currentPage.value - 2;
    const newPath = getRouteFromPageIndex(target);
    router.push(newPath);
  }
};

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
  const current = pageFlipInstance.getCurrentPageIndex();

  // Check if we are already seeing this page (or its spread partner)
  if (current === targetPage || (current + 1 === targetPage && current % 2 === 1)) {
    return;
  }

  // CRITICAL: Check if an animation is already in progress
  const state = pageFlipInstance.getState();
  if (state !== 'read' && targetPage === current) {
    return;
  }
  
  isFlippingFromRoute = true;
  displayPage.value = targetPage;
  
  try {
    // flip() animates from current to target. 
    // If the target is far away, page-flip handles the transition.
    pageFlipInstance.flip(targetPage);
  } catch (err) {
    console.error("Flip error", err);
    isFlippingFromRoute = false;
  }
});

const isFrontCoverClosed = computed(() => {
  if (totalPages.value === 0) return true;
  return displayPage.value === 0;
});

const isBackCoverClosed = computed(() => {
  if (totalPages.value === 0) return false;
  return displayPage.value >= totalPages.value - 1;
});

const isClosed = computed(() => isFrontCoverClosed.value || isBackCoverClosed.value);

const emit = defineEmits(['update:closed']);
watch(isClosed, (val) => {
  emit('update:closed', val);
}, { immediate: true });

</script>

<template>
  <div class="book-environment pointer-events-none" :class="{ 'is-closed': isClosed }">
    
    <!-- The Notebook itself -->
    <div class="book-container pointer-events-none" :class="{ 'is-closed': isClosed, 'front-cover': isFrontCoverClosed, 'back-cover': isBackCoverClosed }">
      <div class="book-wrapper pointer-events-none">
        
        <!-- BINDER RINGS (Illustration Style) -->
        <div class="hidden md:flex w-16 absolute left-1/2 top-0 bottom-0 -translate-x-1/2 z-[2] pointer-events-none select-none flex-col justify-evenly py-10">
           <div v-for="i in 3" :key="i" class="relative w-full h-8 flex items-center justify-center">
               <!-- The Ring -->
               <div class="w-[120%] h-4 bg-[#4a4e51] rounded-full border-2 border-[#2c2c2c] relative z-10 flex items-center justify-center">
                   <div class="w-full h-[2px] bg-white/20 absolute top-[2px] rounded-t-full"></div>
               </div>
               <!-- Holes on pages -->
               <div class="absolute right-0 w-3 h-3 rounded-full bg-[#1a1814]/80 border-2 border-[#2c2c2c] -translate-x-1"></div>
               <div class="absolute left-0 w-3 h-3 rounded-full bg-[#1a1814]/80 border-2 border-[#2c2c2c] translate-x-1"></div>
           </div>
        </div>

        <div ref="bookRef" class="flip-book pointer-events-auto shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-300" :class="{ 'hover:scale-[1.02] cursor-pointer': isClosed }" @click="isFrontCoverClosed ? nextPage() : (isBackCoverClosed ? prevPage() : null)">
          
          <!-- COVER PAGE (Right side when closed, but effectively Page 0) -->
          <div class="page-content cover relative" style="background: transparent !important;">
               <img src="/images/desk/journal.svg" class="absolute inset-0 w-full h-full object-fill pointer-events-none" />
               <div class="h-full flex flex-col justify-center items-center text-white p-10 pl-16 relative z-10 group text-center">
                  <h1 class="text-6xl font-heading mb-4 text-center text-white drop-shadow-lg">Marwin's<br>Logbook</h1>
                  <p class="text-xl opacity-80 group-hover:scale-110 transition-transform duration-300 mt-8 bg-black/40 px-6 py-2 rounded-lg backdrop-blur-sm">Click to Open</p>
               </div>
          </div>

          <!-- SPREAD 1: INTRO (Left & Right) -->
          <div class="page-content">
               <BookPage class="h-full relative">
                   <Intro side="left" />
                   <button 
                      @click.stop="prevPage"
                      class="absolute left-4 top-4 z-10 font-heading text-xl text-[#5d4037]/60 hover:text-[#3e2723] transition-all hover:scale-110 -rotate-2"
                      title="Previous"
                   >
                     ← Back
                   </button>
               </BookPage>
          </div>
          <div class="page-content">
            <BookPage class="h-full relative">
              <Intro side="right" />
              <button 
                 @click.stop="nextPage"
                 class="absolute right-4 top-4 z-10 font-heading text-xl text-[#5d4037]/60 hover:text-[#3e2723] transition-all hover:scale-110 rotate-2"
                 title="Next"
              >
                Next →
              </button>
            </BookPage>
          </div>
          
          <div class="page-content">
            <BookPage class="h-full relative">
              <Garden side="left" />
              <button 
                 @click.stop="prevPage"
                 class="absolute left-4 top-4 z-10 font-heading text-xl text-[#5d4037]/60 hover:text-[#3e2723] transition-all hover:scale-110 -rotate-2"
                 title="Previous"
              >
                ← Back
              </button>
            </BookPage>
          </div>
          <div class="page-content">
            <BookPage class="h-full relative">
              <Garden side="right" />
               <button 
                 @click.stop="nextPage"
                 class="absolute right-4 top-4 z-10 font-heading text-xl text-[#5d4037]/60 hover:text-[#3e2723] transition-all hover:scale-110 rotate-2"
                 title="Next"
              >
                Next →
              </button>
            </BookPage>
          </div>

          <div class="page-content">
            <BookPage class="h-full relative">
              <Projects side="left" />
               <button 
                 @click.stop="prevPage"
                 class="absolute left-4 top-4 z-10 font-heading text-xl text-[#5d4037]/60 hover:text-[#3e2723] transition-all hover:scale-110 -rotate-2"
                 title="Previous"
              >
                ← Back
              </button>
            </BookPage>
          </div>
          <div class="page-content">
            <BookPage class="h-full relative">
              <Projects side="right" />
               <button 
                 @click.stop="nextPage"
                 class="absolute right-4 top-4 z-10 font-heading text-xl text-[#5d4037]/60 hover:text-[#3e2723] transition-all hover:scale-110 rotate-2"
                 title="Next"
              >
                Next →
              </button>
            </BookPage>
          </div>

          <div class="page-content">
            <BookPage class="h-full relative">
               <Cv side="left" />
               <button 
                 @click.stop="prevPage"
                 class="absolute left-4 top-4 z-10 font-heading text-xl text-[#5d4037]/60 hover:text-[#3e2723] transition-all hover:scale-110 -rotate-2"
                 title="Previous"
              >
                ← Back
              </button>
            </BookPage>
          </div>
          <div class="page-content">
            <BookPage class="h-full relative">
               <Cv side="right" />
               <button 
                 @click.stop="nextPage"
                 class="absolute right-4 top-4 z-10 font-heading text-xl text-[#5d4037]/60 hover:text-[#3e2723] transition-all hover:scale-110 rotate-2"
                 title="Next"
              >
                Next →
              </button>
            </BookPage>
          </div>

          <div class="page-content">
            <BookPage class="h-full relative">
               <Photos side="left" />
               <button 
                 @click.stop="prevPage"
                 class="absolute left-4 top-4 z-10 font-heading text-xl text-[#5d4037]/60 hover:text-[#3e2723] transition-all hover:scale-110 -rotate-2"
                 title="Previous"
              >
                ← Back
              </button>
            </BookPage>
          </div>
          <div class="page-content">
            <BookPage class="h-full relative">
               <Photos side="right" />
               <button 
                 @click.stop="nextPage"
                 class="absolute right-4 top-4 z-10 font-heading text-xl text-[#5d4037]/60 hover:text-[#3e2723] transition-all hover:scale-110 rotate-2"
                 title="Next"
              >
                Next →
              </button>
            </BookPage>
          </div>

          <!-- BACK COVER -->
          <div class="page-content cover relative" style="background: transparent !important;">
               <!-- Flipped horizontally for the back cover binding -->
               <img src="/images/desk/journal.svg" class="absolute inset-0 w-full h-full object-fill pointer-events-none" style="transform: scaleX(-1);" />
               <div class="h-full flex justify-center items-center text-white p-10 pr-16 relative z-10">
                  <h2 class="text-4xl font-heading bg-black/40 px-8 py-4 rounded-lg backdrop-blur-sm shadow-lg text-white">The End</h2>
               </div>
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
  position: relative;
  overflow: hidden;
  background-color: transparent; 
}

/* Container defining standard book positioning and zooming */
.book-container {
  position: relative;
  z-index: 2;
  /* the width and height will be determined by its parent wrapper (.book-wrapper in TableView) */
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 1.2s cubic-bezier(0.25, 1, 0.5, 1);
  transform-origin: center center;
  /* Prevent pointer events on the container itself so we don't block clicks on the table, only the wrapper contents */
  pointer-events: none;
}
.book-container > * {
  pointer-events: auto;
}

/* When closed, the book scales down but stays in the center */
.book-container.is-closed.front-cover {
  transform: translateX(-25%);
}
.book-container.is-closed.front-cover .flip-book {
  clip-path: polygon(50% -10%, 110% -10%, 110% 110%, 50% 110%);
}

.book-container.is-closed.back-cover {
  /* Shift to the right by half the container width so the left-sided page sits exactly where the right-sided page sits */
  transform: translateX(25%);
}
.book-container.is-closed.back-cover .flip-book {
  clip-path: polygon(-10% -10%, 50% -10%, 50% 110%, -10% 110%);
}

/* Media query to adjust for mobile/smaller screens where side-by-side might be tight */
@media (max-width: 1024px) {
  .book-container.is-closed.front-cover {
    transform: translateX(-25%);
  }
  .book-container.is-closed.back-cover {
    transform: translateX(25%);
  }
}

.book-wrapper {
  position: relative;
  /* Allow full width stretching */
  width: 100%;
  height: 98dvh; /* Use dynamic viewport height with a small buffer */
  margin: auto;
  
  /* Fallback constraints just in case */
  max-width: 100%;
  /* Optional: max-height if you don't want it taller than screen */
  max-height: 100vh;
}
/* If the screen is very wide but short (height constrained), the max-height above works but width might shrink too */
/* If the screen is narrow (width constrained), 95vw kicks in and height adjusts automatically due to aspect-ratio */

/* --- PAGE STYLING --- */
.page-content {
  background-color: #fdfaf4;
  overflow: hidden;
  border: 4px solid #2c2c2c;
  box-sizing: border-box;
}
:global(.dark) .page-content {
  background-color: #dfd8ca;
  border: 4px solid #2c2c2c;
}

/* Override page-flip hover effects forcefully */
/* Note: .stf__block is the PAGE wrapper in some versions, do not hide it! */
:global(.stf__item.-hover) {
  /* Prevent the "peel" transform if possible */
  /* If this hides the page on hover, we might need to be more specific. 
     But for now, removing the filter usually just stops the shadow/highlight. */
  filter: none !important;
}

.page-content.cover {
  background-color: transparent !important;
}

:global(.dark) .page-content.cover {
  background-color: transparent !important;
}

/* When flipping, we boost the z-index of the flip-book container.
   This ensures that while a page is 'in the air', it doesn't 
   clash with the spiral binding or other absolute elements.
*/
.flip-book.is-animating {
  z-index: 50 !important;
}


</style>
