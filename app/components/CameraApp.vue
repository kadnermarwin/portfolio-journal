<script setup lang="ts">
const emit = defineEmits(['close']);

// Mock photos for the crag snapshots
const photos = [
  { id: 1, title: 'Fontainebleau 2023', degree: -3, color: 'bg-stone-300' },
  { id: 2, title: 'Magic Wood', degree: 4, color: 'bg-emerald-800' },
  { id: 3, title: 'Albarracín', degree: -2, color: 'bg-amber-700' },
  { id: 4, title: 'Frankenjura', degree: 5, color: 'bg-green-800' },
];
</script>

<template>
  <div class="camera-ui">
    <div class="viewfinder">
      <!-- Camera Crosshairs overlay -->
      <div class="crosshairs pointer-events-none">
        <div class="hz"></div>
        <div class="vt"></div>
      </div>
      
      <!-- Photos Gallery Content -->
      <div class="photos-gallery w-full h-full p-8 overflow-y-auto custom-scrollbar flex flex-col items-center">
        <div class="photo-info mb-12 mt-4 text-center">
          <h2 class="font-heading text-5xl text-white mb-3 tracking-wide drop-shadow-md">Crag Snapshots</h2>
          <p class="font-mono text-white/70 tracking-widest uppercase text-sm">Film Roll 001 • Development in progress...</p>
        </div>
        
        <div class="gallery-grid">
           <!-- Polaroid Cards -->
           <div 
             v-for="(photo, index) in photos" 
             :key="photo.id"
             class="polaroid group cursor-pointer"
             :style="`transform: rotate(${photo.degree}deg);`"
           >
              <div class="polaroid-image relative overflow-hidden bg-zinc-800">
                 <!-- Placeholder for actual photo, using solid color for now -->
                 <div class="absolute inset-0 w-full h-full mix-blend-overlay opacity-50" :class="photo.color"></div>
                 <div class="absolute inset-0 flex items-center justify-center text-white/20 group-hover:scale-110 transition-transform duration-700">
                    <span class="material-symbols-outlined text-4xl">landscape</span>
                 </div>
                 <!-- Vintage film grain overlay -->
                 <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgibm9pc2UpIiBvcGFjaXR5PSIwLjA4Ii8+PC9zdmc+')] opacity-20 pointer-events-none mix-blend-overlay"></div>
              </div>
              <div class="polaroid-caption font-body text-gray-800 text-center mt-3 text-lg font-medium tracking-wide">
                 {{ photo.title }}
              </div>
           </div>
        </div>
      </div>
      
      <!-- Camera Interface Elements -->
      <div class="camera-overlay-info top-left pointer-events-none">ISO 400</div>
      <div class="camera-overlay-info top-right pointer-events-none">F 2.8</div>
      <div class="camera-overlay-info bottom-center pointer-events-none flex items-center gap-2">
         <div class="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div> REC
      </div>
      
      <button class="close-viewfinder group" @click="emit('close')">
        <span class="material-symbols-outlined group-hover:rotate-90 transition-transform duration-300">close</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.camera-ui {
  width: 100%;
  height: 100vh;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4vmin;
}

.viewfinder {
  width: 100%;
  max-width: 1200px;
  aspect-ratio: 3 / 2;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  background: #111;
  display: flex;
  flex-direction: column;
}

/* Simulate viewfinder texture */
.viewfinder::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(255, 255, 255, 0.03) 2px,
    rgba(255, 255, 255, 0.03) 4px
  );
  pointer-events: none;
  z-index: 50;
}

.crosshairs .hz {
  position: absolute;
  top: 50%;
  left: 20%;
  right: 20%;
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  z-index: 40;
}
.crosshairs .vt {
  position: absolute;
  left: 50%;
  top: 20%;
  bottom: 20%;
  width: 1px;
  background: rgba(255, 255, 255, 0.2);
  z-index: 40;
}

.photos-gallery {
  z-index: 10;
  position: relative;
}

.photo-info h2 {
  font-family: var(--font-heading, "Gloria Hallelujah", cursive);
  text-shadow: 0 4px 10px rgba(0,0,0,0.8);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 3rem;
  width: 100%;
  max-width: 1000px;
  padding: 2rem;
  margin-bottom: 4rem; /* space for REC indicator */
}

/* Polaroid Styling */
.polaroid {
  background: #f8f6f0;
  padding: 1rem 1rem 2.5rem 1rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-sizing: border-box;
}
.polaroid:hover {
  transform: rotate(0deg) scale(1.05) !important;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.7);
  z-index: 20;
}
.polaroid-image {
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #222;
  box-shadow: inset 0 2px 8px rgba(0,0,0,0.5);
}

.camera-overlay-info {
  position: absolute;
  font-family: monospace;
  font-size: 1.25rem;
  color: #0f0;
  text-shadow: 0 0 5px #0f0;
  z-index: 60;
  letter-spacing: 2px;
}
.top-left { top: 25px; left: 30px; }
.top-right { top: 25px; right: 30px; }
.bottom-center { bottom: 25px; left: 50%; transform: translateX(-50%); font-weight: bold; }

.close-viewfinder {
  position: absolute;
  top: 25px;
  right: 100px;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 50%;
  width: 44px;
  height: 44px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 60;
  backdrop-filter: blur(4px);
  transition: all 0.2s;
}
.close-viewfinder:hover {
  background: rgba(255,255,255,0.25);
  border-color: rgba(255,255,255,0.5);
  transform: scale(1.05);
}

/* Custom scrollbar for the gallery */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.4);
}
</style>
