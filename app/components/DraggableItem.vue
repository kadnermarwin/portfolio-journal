<script setup lang="ts">
import { ref, computed } from 'vue';
import { usePointerSwipe } from '@vueuse/core';

const emit = defineEmits(['update:position']);

const props = defineProps<{
  initialCssClass: string;
  isActive: boolean; 
  scale: number;
}>();

const el = ref<HTMLElement | null>(null);
const position = ref<{ x: number, y: number } | null>(null);
const totalOffset = ref<{ dx: number, dy: number }>({ dx: 0, dy: 0 });
let wasDragged = false;

let dragStartX = 0;
let dragStartY = 0;
let initialX = 0;
let initialY = 0;

const { isSwiping } = usePointerSwipe(el, {
  threshold: 0,
  onSwipeStart(e: PointerEvent) {
    if (!props.isActive) return;

    if (el.value && !position.value) {
      const style = window.getComputedStyle(el.value);
      initialX = style.left !== 'auto' ? parseFloat(style.left) : el.value.offsetLeft;
      initialY = style.top !== 'auto' ? parseFloat(style.top) : el.value.offsetTop;
      position.value = { x: initialX, y: initialY };
    }

    if (position.value) {
      dragStartX = position.value.x;
      dragStartY = position.value.y;
    }
    wasDragged = false;
  },
  onSwipe(e: PointerEvent) {
    if (!props.isActive || !isSwiping.value) return;
    
    // usePointerSwipe handles the initial pointerdown coordinates implicitly, 
    // but we can calculate dx/dy manually or use the built-in distance.
    // Actually, usePointerSwipe tracks `distanceX` and `distanceY` reactive refs.
  },
  onSwipeEnd(e: PointerEvent) {
    if (!props.isActive) return;
  }
});

// Since usePointerSwipe is a bit too abstract for exact scaled continuous coordinates,
// let's use useEventListener for a simpler, VueUse-idiomatic global drag listener 
// while binding the pointer down to the element.
import { useEventListener } from '@vueuse/core';

const isDragging = ref(false);
let startMouseX = 0;
let startMouseY = 0;

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
  
  // Use VueUse's useEventListener (it returns a cleanup function) 
  // but since we want to add/remove them dynamically, we just call it directly.
  // Actually, VueUse's `useEventListener` automatically cleans up on component unmount.
  // We can just register them once and use the `isDragging` flag.
};

useEventListener('pointermove', (e: PointerEvent) => {
  if (!isDragging.value) return;
  const dx = (e.clientX - startMouseX) / props.scale;
  const dy = (e.clientY - startMouseY) / props.scale;
  
  position.value = {
    x: dragStartX + dx,
    y: dragStartY + dy
  };
});

const handlePointerUp = (e: PointerEvent) => {
  if (!isDragging.value) return;
  isDragging.value = false;

  const dx = e.clientX - startMouseX;
  const dy = e.clientY - startMouseY;
  const dist = Math.sqrt(dx * dx + dy * dy);
  
  if (dist >= 5) {
    wasDragged = true;
    
    totalOffset.value = {
      dx: position.value!.x - initialX,
      dy: position.value!.y - initialY
    };

    emit('update:position', totalOffset.value);
    
    setTimeout(() => { wasDragged = false; }, 0);
  }
};

useEventListener('pointerup', handlePointerUp);
useEventListener('pointercancel', handlePointerUp);

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
