<script setup lang="ts">
const emit = defineEmits(['close']);

const projects = [
  {
    title: 'Pfennigfuchs',
    type: 'University Project',
    icon: 'school',
    description: 'Decentralized social networking web app for shared expense management. Integrated with the Matrix messaging protocol to utilize federated infrastructure.',
    links: [
      { text: 'GitHub Repo', url: 'https://github.com/kadnermarwin/pfennigfuchs', icon: 'code' }
    ]
  },
  {
    title: 'Cogni',
    type: 'Study Platform',
    icon: 'psychology',
    description: 'This study platform uses the Gemini API to transform file uploads into structured write-ups, exercises, and flashcards. Features an interactive AI tutor.',
    links: [
      { text: 'study.kadner.dev', url: 'https://study.kadner.dev', icon: 'language' },
      { text: 'GitHub Repo', url: 'https://github.com/kadnermarwin/studying-assistant', icon: 'code' }
    ]
  },
  {
    title: 'Portfolio',
    type: 'Personal Website',
    icon: 'person',
    description: 'My personal website is built on VueJS and is just a playground for myself to try out new animations and creative ideas. Replaces my desk as an interactive system.',
    links: [
      { text: 'kadner.dev', url: 'https://kadner.dev', icon: 'language' },
      { text: 'GitHub Repo', url: 'https://github.com/kadnermarwin/portfolio-journal', icon: 'code' }
    ]
  }
];
</script>

<template>
  <div class="laptop-ui">
    <div class="os-header">
      <div class="window-controls" @click="emit('close')">
        <div class="control close hover:brightness-90 transition-all flex items-center justify-center group"><span class="material-symbols-outlined text-[8px] opacity-0 group-hover:opacity-100 text-[#4c0000]">close</span></div>
        <div class="control minimize hover:brightness-90 transition-all"></div>
        <div class="control maximize hover:brightness-90 transition-all"></div>
      </div>
      <div class="url-bar"><span class="material-symbols-outlined" style="font-size: 10px; margin-right: 4px; vertical-align: middle;">lock</span>marwin.dev/projects</div>
    </div>
    <div class="os-content scrollbar-custom">
      <div class="projects-container">
        <header class="mb-8 border-b border-gray-200 dark:border-gray-800 pb-5">
          <h1 class="text-3xl font-bold flex items-center gap-2"><span class="material-symbols-outlined text-3xl">inventory_2</span> My Projects</h1>
          <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed">A selection of my recent work and experiments.</p>
        </header>
        
        <div class="projects-grid">
          <div class="project-card" v-for="(project, i) in projects" :key="i">
             <div class="flex items-start gap-5">
                <div class="icon-box">
                  <span class="material-symbols-outlined">{{ project.icon }}</span>
                </div>
                <div class="flex-grow">
                   <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ project.title }}</h3>
                   <span class="text-xs font-semibold uppercase tracking-widest text-blue-500 dark:text-blue-400 mt-1 mb-3 block">{{ project.type }}</span>
                   <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{{ project.description }}</p>
                   
                   <div class="flex flex-wrap gap-3 mt-4">
                      <a v-for="link in project.links" :key="link.text" :href="link.url" target="_blank" class="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-gray-100/80 hover:bg-gray-200 text-gray-700 dark:bg-zinc-800/80 dark:hover:bg-zinc-700 dark:text-gray-200 rounded-md transition-all font-medium border border-gray-200 dark:border-zinc-700 shadow-sm">
                        <span class="material-symbols-outlined text-[14px]">{{ link.icon }}</span>
                        {{ link.text }}
                      </a>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Base UI */
.laptop-ui {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  overflow: hidden;
}
:global(.dark) .laptop-ui {
  background: #1e1e1e;
  color: #eeeeee;
}

/* Header/Controls */
.os-header {
  height: 38px;
  background: #f1f1f1;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  padding: 0 12px;
}
:global(.dark) .os-header {
  background: #2a2a2a;
  border-bottom: 1px solid #111;
}

.window-controls {
  display: flex;
  gap: 8px;
  width: 60px;
  cursor: pointer;
  padding: 5px 0;
}
.control {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.close { background: #ff5f56; }
.minimize { background: #ffbd2e; }
.maximize { background: #27c93f; }

.url-bar {
  flex-grow: 1;
  text-align: center;
  font-size: 11px;
  color: #666;
  background: #fff;
  border: 1px solid #cfcfcf;
  border-radius: 6px;
  padding: 3px 0;
  margin: 0 12px;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.02);
  display: flex;
  align-items: center;
  justify-content: center;
}
:global(.dark) .url-bar {
  background: #1c1c1c;
  color: #999;
  border: 1px solid #111;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.2);
}

/* Content Area */
.os-content {
  flex-grow: 1;
  padding: 30px;
  overflow-y: auto;
}
.projects-container {
  max-width: 800px;
  margin: 0 auto;
}

.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.project-card {
  border: 1px solid #eaeaea;
  border-radius: 12px;
  padding: 24px;
  transition: all 0.2s ease;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
}
.project-card:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  transform: translateY(-2px);
  border-color: #d1d5db;
}
:global(.dark) .project-card {
  background: #252525;
  border-color: #333;
}
:global(.dark) .project-card:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.3);
  border-color: #444;
}

.icon-box {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: #f0f4ff;
  color: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid rgba(59, 130, 246, 0.1);
}
.icon-box .material-symbols-outlined {
  font-size: 26px;
}
:global(.dark) .icon-box {
  background: rgba(59, 130, 246, 0.1);
  color: #60a5fa;
  border-color: rgba(59, 130, 246, 0.2);
}

/* Custom Scrollbar */
.scrollbar-custom::-webkit-scrollbar {
  width: 10px;
}
.scrollbar-custom::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-custom::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 5px;
  border: 2px solid #fff;
}
:global(.dark) .scrollbar-custom::-webkit-scrollbar-thumb {
  background: #4b5563;
  border: 2px solid #1e1e1e;
}
.scrollbar-custom::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
