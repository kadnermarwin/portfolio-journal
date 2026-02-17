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
  // If we are at root, we want to show the Intro spread (Pages 1 & 2)
  if (route.path === '/' || route.path === '/book') return 1;
  const spreadParam = route.params.spread;
  if (!spreadParam) return 1; // Default to Intro if invalid
  
  const spreadId = parseInt(Array.isArray(spreadParam) ? spreadParam[0] : spreadParam);
  if (isNaN(spreadId)) return 1;

  // Spread 1 (Intro) -> Page 1
  // Spread 2 (Garden) -> Page 3
  // Formula: (Spread - 1) * 2 + 1
  return (spreadId - 1) * 2 + 1;
};

const getRouteFromPageIndex = (pageIndex) => {
  if (pageIndex === 0) return '/?cover=true'; // Optional: explicit cover url or just '/'
  
  // Page 1, 2 -> Spread 1 -> '/'
  if (pageIndex === 1 || pageIndex === 2) return '/';
  
  // Page 3, 4 -> Spread 2 -> '/read/2'
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
      mobileScrollSupport: true,
      showHover: false, // Disable dynamic corner peel
      showPageCorners: false, // Helper to hide corners visual
      clickEventForward: false, // Prevent default click on invalid areas
      useMouseEvents: true // Needed for drag, but we want to kill hover
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
  const currentPage = pageFlipInstance.getCurrentPageIndex();

  // If already close enough (spread view), skip
  if (currentPage === targetPage || (currentPage + 1 === targetPage && currentPage % 2 === 1)) {
     return;
  }
  
  isFlippingByRoute = true;
  
  // Logic: If jump is > 2 pages (more than 1 spread), separate logic?
  // Current: p1(0), p2+3(1), p4+5(2)
  // Actually page indices: 0 (cover), 1,2,3...
  
  const diff = Math.abs(targetPage - currentPage);
  
  try {
     if (diff > 2) {
       // "Jump" - use turnToPage for instant or cleaner transition
       // Wait, user wants "animation is played with the main page as background".
       // This implies they WANT the flip, but WITHOUT intermediate pages showing up ghost-like.
       // simple-page-flip doesn't support "skip rendering intermediate" easily.
       // Try: turnToPage (instant) -> then flip last step? 
       // If I am at 1. Go to 5.
       // If I turnToPage(3), it shows 3.
       // Maybe best bet: Just let it flip but fast? Or accept standard behavior.
       // User says: "immediately showing the previous page of the one selected"
       // This implies: "I clicked 'Code Repo' (p5). I see 'Digital Garden' (p3) briefly."
       // Correct logic: If I jump 1 -> 5. 1 flips to 2/3. 3 flips to 4/5. 
       // User wants 1 -> [Flip Effect] -> 5.
       // Library doesn't support skipping spreads in a single flip.
       // Forced Workaround: 
       // 1. turnToPage(targetPage - 2) (Instant jump to one-before)
       // 2. flip(targetPage) (Animate last step)
       // This makes it look like 1 "Step" transition.
       
       if (targetPage > currentPage) {
           // Going forward. e.g. 1 -> 5.
           // Jump to 3 (target - 2).
           // Then flip to 5.
           // However, if target is just next spread (diff <= 2), normal flip.
           const jumpTo = targetPage - 2;
           if (jumpTo > currentPage) {
             pageFlipInstance.turnToPage(jumpTo); // Instant
             setTimeout(() => {
                 pageFlipInstance.flip(targetPage);
             }, 50); // Small tick
             return;
           }
       } else {
           // Going back. e.g. 5 -> 1.
           // Jump to 3 (target + 2).
           const jumpTo = targetPage + 2;
           if (jumpTo < currentPage) {
               pageFlipInstance.turnToPage(jumpTo);
               setTimeout(() => {
                 pageFlipInstance.flip(targetPage);
               }, 50);
               return;
           }
       }
     }
     
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
      <!-- LEATHER CORDS BINDING -->
      <div class="hidden md:flex w-16 absolute left-1/2 top-0 bottom-0 -translate-x-1/2 z-50 pointer-events-none select-none flex-col justify-evenly py-10">
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
