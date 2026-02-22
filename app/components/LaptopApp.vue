<script setup lang="ts">
const emit = defineEmits(['close']);
</script>

<template>
  <div class="laptop-ui">
    <div class="os-header">
      <div class="window-controls" @click="emit('close')">
        <div class="control close"></div>
        <div class="control minimize"></div>
        <div class="control maximize"></div>
      </div>
      <div class="url-bar">marwin.dev/projects</div>
    </div>
    <div class="os-content">
      <div class="projects-container">
        <h1>My Projects</h1>
        <p>This is where the projects website will be displayed.</p>
        <div class="grid">
          <div class="project-card" v-for="i in 4" :key="i">
            <div class="card-img"></div>
            <h3>Project {{ i }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.laptop-ui {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}
:global(.dark) .laptop-ui {
  background: #1e1e1e;
  color: #eeeeee;
}

.os-header {
  height: 30px;
  background: #f1f1f1;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  padding: 0 10px;
}
:global(.dark) .os-header {
  background: #2a2a2a;
  border-bottom: 1px solid #111;
}

.window-controls {
  display: flex;
  gap: 6px;
  width: 60px;
  cursor: pointer;
}
.control {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.close { background: #ff5f56; }
.minimize { background: #ffbd2e; }
.maximize { background: #27c93f; }

.url-bar {
  flex-grow: 1;
  text-align: center;
  font-size: 10px;
  color: #888;
  background: rgba(0,0,0,0.05);
  border-radius: 4px;
  padding: 2px 0;
  margin: 0 10px;
}
:global(.dark) .url-bar {
  background: rgba(255,255,255,0.05);
}

.os-content {
  flex-grow: 1;
  padding: 15px;
  overflow-y: auto;
  font-size: 12px;
}
/* Scale contents up relative to laptop size */
.projects-container {
  max-width: 800px;
  margin: 0 auto;
}
h1 {
  font-size: 18px;
  margin-bottom: 5px;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 15px;
}
.project-card {
  border: 1px solid #eaeaea;
  border-radius: 6px;
  padding: 8px;
}
:global(.dark) .project-card {
  border-color: #333;
}
.card-img {
  width: 100%;
  height: 60px;
  background: #eee;
  border-radius: 4px;
  margin-bottom: 8px;
}
:global(.dark) .card-img {
  background: #2a2a2a;
}
</style>
