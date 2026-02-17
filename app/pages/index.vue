<template>
  <div>
    <main class="w-full min-h-screen flex flex-col md:flex-row overflow-hidden relative">
      <!-- Left Section: Profile and Intro -->
      <section class="flex-1 min-h-[650px] p-8 md:py-14 md:pl-14 md:pr-16 relative dot-grid">
        <!-- Doodle SVG -->
        <div class="absolute top-6 left-6 select-none pointer-events-none">
          <svg class="w-20 h-20 doodle-stroke" fill="none" viewBox="0 0 100 100">
            <path d="M10,20 Q30,10 50,20 T90,20" stroke-width="1.5"></path>
            <circle cx="20" cy="40" fill="currentColor" r="3"></circle>
            <circle cx="25" cy="50" fill="currentColor" r="2"></circle>
          </svg>
        </div>
  
        <div class="relative z-10 space-y-10 h-full flex flex-col">
          <!-- Header / Profile -->
          <div class="flex items-center gap-8">
            <div class="relative">
              <div class="absolute -inset-2 bg-accent-orange/10 rounded-lg -rotate-2"></div>
              <img alt="Alex Profile" class="w-28 h-28 md:w-36 md:h-36 object-cover rounded-lg border-4 border-white shadow-sm sepia-[0.3]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8FFD35gk9n7wfmG0diGKkixsnv_9-LREGWFk7DNtAqBFBCUH_vLeiCA0DPbI8E7NELV5N4dKgknYfIdo2aoI84A4yi1BQ9-IJahqOVs5Vuc4HndnjfeXCbHrlZzzOXzZa-7U1BB3Yc0_QdqzkDkK0GPmjcJ1M7CpBX0bM-Y8IZVxGrgqNdmPMw94zBeEphBNbNu1Bs9uC93skD5SFL3surMuWjdXZPAQB8WAm9IncvEvm0G8n0_4Sey_Z3WVo0pmdL_TaDmT206U"/>
              <div class="absolute -top-4 -right-6 washi-tape px-6 py-1.5 text-[11px] uppercase tracking-widest font-bold text-white/90 rotate-6 shadow-sm">
                Sept 2024
              </div>
            </div>
            <div>
              <h1 class="font-heading text-4xl md:text-5xl text-accent-orange mb-2 tracking-wide">Hi, I'm <span class="relative inline-block">Alex<svg class="absolute -bottom-2 left-0 w-full h-3 text-accent-orange/40" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" stroke-width="3" fill="none" /></svg></span>.</h1>
              <p class="font-body text-2xl text-leather-brown/70 italic">Code. Climb. Create.</p>
            </div>
          </div>
  
          <!-- Main Content Area -->
          <div class="flex-grow space-y-8">
            <div class="bg-white/40 p-8 rounded-2xl border-2 border-leather-brown/10 shadow-sm relative overflow-hidden rotate-1 transform transition hover:rotate-0 hover:shadow-md duration-300">
              <div class="absolute top-4 right-4 text-leather-brown/20">
                <span class="material-symbols-outlined text-4xl">code_blocks</span>
              </div>
              <h3 class="font-heading text-2xl text-accent-orange mb-4">The Logic & The Line</h3>
              <p class="font-body text-xl leading-relaxed text-leather-brown/80">
                Computer Science student by day, bouldering enthusiast by twilight. I find a strange parallel between a complex codebase and a technical V6—both require patience, precision, and the courage to fall before you reach the top.
              </p>
            </div>
  
            <div class="grid grid-cols-2 gap-6">
              <div class="p-6 rounded-2xl border-2 border-dashed border-leather-brown/20 bg-white/30 -rotate-1 hover:rotate-0 transition-transform duration-300">
                <h4 class="font-heading text-accent-orange text-xl mb-3 flex items-center gap-2">
                  <span class="material-symbols-outlined text-xl">terminal</span> Tech Stack
                </h4>
                <ul class="font-body text-lg text-leather-brown/80 space-y-1 ml-1">
                  <li>• Rust / Python</li>
                  <li>• React & Tailwind</li>
                  <li>• Neovim / Arch</li>
                </ul>
              </div>
              <div class="p-6 rounded-2xl border-2 border-dashed border-leather-brown/20 bg-white/30 rotate-2 hover:rotate-0 transition-transform duration-300">
                <h4 class="font-heading text-accent-orange text-xl mb-3 flex items-center gap-2">
                  <span class="material-symbols-outlined text-xl">mountain_flag</span> Current Goal
                </h4>
                <p class="font-body text-lg text-leather-brown/80 leading-relaxed">
                  Sending my first 7A outdoors & mastering async Rust.
                </p>
              </div>
            </div>
          </div>
  
          <!-- Footer / Signature -->
          <div class="pt-6 flex justify-between items-end border-t border-leather-brown/5">
            <div class="space-y-1 opacity-60 font-body text-sm">
              <p class="text-accent-orange italic">while(climbing) { code++; }</p>
              <p class="text-leather-brown/60">#build_the_beta</p>
            </div>
            <div class="w-16 h-16 opacity-40">
              <svg class="doodle-stroke" fill="none" stroke-width="1.2" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Spine Crease -->
          <!-- Spiral Binding -->
      <div class="hidden md:block w-12 md:w-16 relative z-20 shrink-0 select-none">
        <div class="absolute inset-y-0 left-0 w-full flex flex-col justify-evenly py-6">
          <div v-for="i in 16" :key="i" class="relative h-16 w-full flex items-center justify-center">
             <!-- Top Hole -->
             <div class="absolute left-1/2 -translate-x-[140%] w-3 h-3 rounded-full bg-[#1a1814]/10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]"></div>
             <!-- Bottom Hole -->
             <div class="absolute left-1/2 translate-x-[40%] w-3 h-3 rounded-full bg-[#1a1814]/10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]"></div>
             <!-- Wire Coil -->
             <div class="w-[140%] h-12 border-t-4 border-gray-400/80 rounded-[100%] absolute top-3 left-1/2 -translate-x-1/2 -rotate-12 shadow-sm"></div>
             <div class="w-[140%] h-12 border-b-4 border-gray-400/50 rounded-[100%] absolute bottom-3 left-1/2 -translate-x-1/2 -rotate-12"></div>
          </div>
        </div>
      </div>
  
      <!-- Right Section: Table of Contents -->
      <section class="flex-1 min-h-[650px] p-8 md:py-14 md:pr-14 md:pl-16 relative dot-grid">
        <div class="absolute inset-0 bg-accent-orange/5 opacity-20 pointer-events-none"></div>
        <div class="relative z-10 h-full flex flex-col">
          <div class="mb-14 text-right pr-4">
            <h2 class="font-heading text-4xl text-leather-brown relative inline-block">Table of Contents
              <span class="absolute -bottom-2 left-0 w-full h-1 bg-accent-orange/20 rounded-full transform -rotate-1"></span>
            </h2>
          </div>
  
          <nav class="space-y-10 flex-grow pr-4">
            <a class="group flex items-end gap-6 hover:translate-x-1 transition-transform duration-300" href="#">
              <span class="font-heading text-2xl text-accent-orange/60 group-hover:text-accent-orange transition-colors">01.</span>
              <div class="flex-1 pb-1 border-b-2 border-leather-brown/10 group-hover:border-accent-orange/30 transition-colors flex justify-between items-end">
                <h3 class="font-heading text-2xl text-leather-brown group-hover:text-accent-orange transition-colors">Digital Garden</h3>
                <span class="material-symbols-outlined text-leather-brown/40 group-hover:text-accent-orange text-xl mb-1">edit_note</span>
              </div>
            </a>
            <a class="group flex items-end gap-6 hover:translate-x-1 transition-transform duration-300" href="#">
              <span class="font-heading text-2xl text-accent-orange/60 group-hover:text-accent-orange transition-colors">02.</span>
              <div class="flex-1 pb-1 border-b-2 border-leather-brown/10 group-hover:border-accent-orange/30 transition-colors flex justify-between items-end">
                <h3 class="font-heading text-2xl text-leather-brown group-hover:text-accent-orange transition-colors">Code Repo</h3>
                <span class="material-symbols-outlined text-leather-brown/40 group-hover:text-accent-orange text-xl mb-1">inventory_2</span>
              </div>
            </a>
            <a class="group flex items-end gap-6 hover:translate-x-1 transition-transform duration-300" href="#">
              <span class="font-heading text-2xl text-accent-orange/60 group-hover:text-accent-orange transition-colors">03.</span>
              <div class="flex-1 pb-1 border-b-2 border-leather-brown/10 group-hover:border-accent-orange/30 transition-colors flex justify-between items-end">
                <h3 class="font-heading text-2xl text-leather-brown group-hover:text-accent-orange transition-colors">The Beta (CV)</h3>
                <span class="material-symbols-outlined text-leather-brown/40 group-hover:text-accent-orange text-xl mb-1">history_edu</span>
              </div>
            </a>
            <a class="group flex items-end gap-6 hover:translate-x-1 transition-transform duration-300" href="#">
              <span class="font-heading text-2xl text-accent-orange/60 group-hover:text-accent-orange transition-colors">04.</span>
              <div class="flex-1 pb-1 border-b-2 border-leather-brown/10 group-hover:border-accent-orange/30 transition-colors flex justify-between items-end">
                <h3 class="font-heading text-2xl text-leather-brown group-hover:text-accent-orange transition-colors">Crag Snapshots</h3>
                <span class="material-symbols-outlined text-leather-brown/40 group-hover:text-accent-orange text-xl mb-1">photo_camera</span>
              </div>
            </a>
          </nav>
  
          <div class="relative mt-10 pt-10 border-t border-leather-brown/10 flex justify-between items-center">
            <div class="flex gap-4 opacity-70">
              <div class="w-12 h-12 rounded-full border-2 border-dashed border-accent-orange/40 flex items-center justify-center rotate-12 hover:rotate-0 transition-transform cursor-pointer">
                <span class="material-symbols-outlined text-accent-orange">alternate_email</span>
              </div>
              <div class="w-12 h-12 rounded-full border-2 border-dashed border-leather-brown/20 flex items-center justify-center -rotate-12 hover:rotate-0 transition-transform cursor-pointer">
                <span class="material-symbols-outlined text-leather-brown/60">share</span>
              </div>
            </div>
            <div class="w-24 h-24 opacity-20 hover:opacity-100 transition-opacity cursor-pointer group" title="Click for beta">
              <svg class="w-full h-full doodle-stroke group-hover:stroke-accent-orange" fill="none" stroke-width="1.5" viewBox="0 0 100 100">
                <path d="M40 25 C25 25 25 50 25 60 C25 80 40 85 60 85 C75 85 75 60 75 50 C75 35 60 25 50 25 Z"></path>
                <path d="M50 25 L40 25 M75 50 L75 60"></path>
                <circle cx="50" cy="25" fill="currentColor" r="2.5"></circle>
              </svg>
            </div>
            <div class="font-body text-right text-leather-brown/60 leading-tight tracking-wide">
              <p>Climb high,</p>
              <p>stay humble.</p>
            </div>
          </div>
        </div>
        <div class="absolute bottom-6 right-16 opacity-10 font-mono text-[10px] text-leather-brown select-none">
          <pre>git add memories/*
  git commit -m "summit"
  git push</pre>
        </div>
      </section>
  
      <!-- Sticky Note -->
      <div class="hidden xl:block absolute -right-8 top-12 w-48 bg-orange-50/90 border border-orange-100/50 rounded-sm p-5 rotate-2 backdrop-blur-sm z-30 shadow-[2px_4px_8px_rgba(0,0,0,0.05)]">
        <div class="w-8 h-8 rounded-full bg-orange-200/50 absolute -top-3 left-1/2 -translate-x-1/2 flex items-center justify-center shadow-sm">
           <div class="w-3 h-3 rounded-full bg-orange-400/50"></div>
        </div>
        <p class="font-body text-accent-orange text-lg leading-snug mt-2">Don't forget the chalk bag this weekend! 🧗‍♂️</p>
        <div class="mt-4 flex gap-1">
          <div class="h-1 w-8 bg-accent-orange/20"></div>
          <div class="h-1 w-4 bg-accent-orange/20"></div>
        </div>
      </div>
    </main>
  
    <footer class="fixed bottom-6 left-0 right-0 text-center opacity-40 text-[10px] uppercase tracking-[0.3em] font-display text-leather-brown/60">
      Handcrafted with code & chalk • 2024
    </footer>
  </div>
</template>
