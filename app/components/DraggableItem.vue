<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['update:position']);

const props = defineProps<{
  initialCssClass: string;
  isActive: boolean; 
  scale: number;
}>();

const el = ref<HTMLElement | null>(null);
const position = ref<{ x: number, y: number } | null>(null);
const totalOffset = ref<{ dx: number, dy: number }>({ dx: 0, dy: 0 });
const isDragging = ref(false);
let wasDragged = false;

let startMouseX = 0;
let startMouseY = 0;
let dragStartX = 0;
let dragStartY = 0;
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
      position.value = { x: initialX, y: initialY };
    }
    dragStartX = position.value.x;
    dragStartY = position.value.y;
  }
  
  wasDragged = false;
  
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);
  window.addEventListener('pointercancel', onPointerUp);
};

const onPointerMove = (e: PointerEvent) => {
  if (!isDragging.value) return;
  const dx = (e.clientX - startMouseX) / props.scale;
  const dy = (e.clientY - startMouseY) / props.scale;
  
  position.value = {
    x: dragStartX + dx,
    y: dragStartY + dy
  };
};

const onPointerUp = (e: PointerEvent) => {
  if (!isDragging.value) return;
  isDragging.value = false;

  window.removeEventListener('pointermove', onPointerMove);
  window.removeEventListener('pointerup', onPointerUp);
  window.removeEventListener('pointercancel', onPointerUp);

  // check if it was just a click
  const dx = e.clientX - startMouseX;
  const dy = e.clientY - startMouseY;
  const dist = Math.sqrt(dx * dx + dy * dy);
  
  if (dist >= 5) {
    wasDragged = true;
    
    // Calculate total offset from original CSS location 
    // This allows zooming mathematically reliably
    totalOffset.value = {
      dx: position.value!.x - initialX,
      dy: position.value!.y - initialY
    };

    // Emit the new position difference
    emit('update:position', totalOffset.value);
    
    setTimeout(() => { wasDragged = false; }, 0);
  }
};

const onClickCapture = (e: MouseEvent) => {
  if (wasDragged) {
    e.stopPropagation();
    e.preventDefault();
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
    @click.capture="onClickCapture"
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
