<script setup lang="ts">
const emit = defineEmits(['close']);
</script>

<template>
  <div class="camera-ui">
    <div class="viewfinder">
      <div class="crosshairs">
        <div class="hz"></div>
        <div class="vt"></div>
      </div>
      
      <div class="photos-gallery">
        <div class="photo-info">
          <h2>Crag Snapshots</h2>
          <p>Rolling through memories film by film...</p>
        </div>
        <!-- Grid of polaroid styled photos could go here later -->
      </div>
      
      <div class="camera-overlay-info top-left">ISO 400</div>
      <div class="camera-overlay-info top-right">F 2.8</div>
      <div class="camera-overlay-info bottom-center">REC •</div>
      
      <button class="close-viewfinder" @click="emit('close')">
        <span class="material-symbols-outlined">close</span>
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
  align-items: center;
  justify-content: center;
}

/* Simulate viewfinder texture */
.viewfinder::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(255, 255, 255, 0.05) 2px,
    rgba(255, 255, 255, 0.05) 4px
  );
  pointer-events: none;
}

.crosshairs .hz {
  position: absolute;
  top: 50%;
  left: 30%;
  right: 30%;
  height: 1px;
  background: rgba(255, 255, 255, 0.4);
}
.crosshairs .vt {
  position: absolute;
  left: 50%;
  top: 30%;
  bottom: 30%;
  width: 1px;
  background: rgba(255, 255, 255, 0.4);
}

.photos-gallery {
  z-index: 10;
  text-align: center;
  color: #fff;
}
.photos-gallery h2 {
  font-family: var(--font-heading, "Gloria Hallelujah", cursive);
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: 0 4px 10px rgba(0,0,0,0.8);
}

.camera-overlay-info {
  position: absolute;
  font-family: monospace;
  font-size: 1.5rem;
  color: #0f0;
  text-shadow: 0 0 5px #0f0;
}
.top-left { top: 20px; left: 20px; }
.top-right { top: 20px; right: 20px; }
.bottom-center { bottom: 20px; left: 50%; transform: translateX(-50%); color: #f00; text-shadow: 0 0 5px #f00; animation: blink 1s infinite; }

@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

.close-viewfinder {
  position: absolute;
  top: 20px;
  right: 80px;
  background: rgba(255,255,255,0.2);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 20;
  transition: background 0.2s;
}
.close-viewfinder:hover {
  background: rgba(255,255,255,0.4);
}
</style>
