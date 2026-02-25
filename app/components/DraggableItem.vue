<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  initialCssClass: string;
  isActive: boolean; 
  scale: number;
}>();

const el = ref<HTMLElement | null>(null);
const position = ref<{ x: number, y: number } | null>(null);
const isDragging = ref(false);

let startMouseX = 0;
let startMouseY = 0;
let initialX = 0;
let initialY = 0;

const onPointerDown = (e: PointerEvent) => {
  if (!props.isActive) return;
  isDragging.value = true;
  startMouseX = e.clientX;
  startMouseY = e.clientY;
  
  if (el.value) {
    if (!position.value) {
      const style = window.getComputedStyle(el.value);
      initialX = style.left !== 'auto' ? parseFloat(style.left) : el.value.offsetLeft;
      initialY = style.top !== 'auto' ? parseFloat(style.top) : el.value.offsetTop;
    } else {
      initialX = position.value.x;
      initialY = position.value.y;
    }
    
    position.value = { x: initialX, y: initialY };
    el.value.setPointerCapture(e.pointerId);
  }
  
  e.preventDefault();
  e.stopPropagation();
};

const onPointerMove = (e: PointerEvent) => {
  if (!isDragging.value) return;
  const dx = (e.clientX - startMouseX) / props.scale;
  const dy = (e.clientY - startMouseY) / props.scale;
  
  position.value = {
    x: initialX + dx,
    y: initialY + dy
  };
};

const onPointerUp = (e: PointerEvent) => {
  if (!isDragging.value) return;
  isDragging.value = false;
  if (el.value) {
    el.value.releasePointerCapture(e.pointerId);
  }
};
</script>

<template>
  <div
    ref="el"
    class="draggable-wrapper table-item"
    :class="[initialCssClass, { 'is-dragging': isDragging, interactable: props.isActive }]"
    :style="position ? { left: position.x + 'px', top: position.y + 'px', right: 'auto', bottom: 'auto' } : {}"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
    @dragstart.prevent
  >
    <slot />
  </div>
</template>

<style scoped>
.draggable-wrapper {
  touch-action: none;
  user-select: none;
  -webkit-user-drag: none;
}
.is-dragging {
  z-index: 100 !important;
  transition: transform 0.05s ease !important;
  cursor: grabbing !important;
}
.interactable {
  cursor: grab;
}
</style>
