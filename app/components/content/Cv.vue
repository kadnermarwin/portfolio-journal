<template>
  <div v-if="side === 'left'" class="relative z-10 h-full flex flex-col font-body text-leather-brown dark:text-orange-50/80 -translate-y-4">
    <!-- Header -->
    <div class="mb-4">
      <h1 class="font-heading text-4xl text-accent-orange uppercase tracking-wider">Marwin Kadner</h1>
      <h2 class="font-heading text-xl text-leather-brown/80 dark:text-orange-100/60 font-bold mb-2">B.Sc. Computer Science</h2>
      
      <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs opacity-70">
        <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[14px] text-accent-orange">alternate_email</span> kadner.marwin@outlook.com</span>
        <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[14px] text-accent-orange">call</span> +49 1763 0409864</span>
        <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[14px] text-accent-orange">location_on</span> Karlstraße 8, 76133 Karlsruhe</span>
        <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[14px] text-accent-orange">language</span> www.kadner.dev</span>
        <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[14px] text-accent-orange">code</span> kadnermarwin</span>
      </div>
    </div>

    <div class="flex-grow space-y-4 overflow-y-auto pr-2 pb-4 scrollbar-hide text-sm">
      <!-- Education Section -->
      <section>
        <h3 class="font-heading text-2xl text-leather-brown dark:text-white/90 border-b-2 border-accent-orange/30 pb-1 mb-3 uppercase flex items-center gap-2">
          <span class="material-symbols-outlined text-accent-orange">school</span> Education
        </h3>
        
        <div class="space-y-3 pl-1">
          <div class="relative pl-4 border-l-2 border-leather-brown/20 dark:border-white/10">
            <div class="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-accent-orange"></div>
            <h4 class="font-bold text-[15px]">B.Sc. Computer Science (2.7)</h4>
            <div class="text-accent-orange font-medium">Karlsruhe Institute of Technology</div>
            <div class="flex items-center gap-1 opacity-60 text-xs mt-0.5"><span class="material-symbols-outlined text-[12px]">calendar_month</span> October 2018 – December 2023</div>
          </div>
          
          <div class="relative pl-4 border-l-2 border-leather-brown/20 dark:border-white/10">
            <div class="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-accent-orange"></div>
            <h4 class="font-bold text-[15px]">M.Sc. Computer Science (1.6)</h4>
            <div class="text-accent-orange font-medium">Karlsruhe Institute of Technology</div>
            <div class="flex items-center gap-1 opacity-60 text-xs mt-0.5"><span class="material-symbols-outlined text-[12px]">calendar_month</span> April 2024 – Expected: January 2027</div>
          </div>
        </div>
      </section>

      <!-- Experience Section -->
      <section>
        <h3 class="font-heading text-2xl text-leather-brown dark:text-white/90 border-b-2 border-accent-orange/30 pb-1 mb-3 uppercase flex items-center gap-2">
          <span class="material-symbols-outlined text-accent-orange">work</span> Experience
        </h3>
        
        <div class="space-y-4 pl-1">
          <div class="relative pl-4 border-l-2 border-leather-brown/20 dark:border-white/10">
            <div class="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-leather-brown/40 dark:bg-white/40"></div>
            <h4 class="font-bold text-[15px]">Working Student – Internal IT</h4>
            <div class="text-accent-orange font-medium">Axoom/GFT Technologies</div>
            <div class="flex items-center gap-1 opacity-60 text-xs mt-0.5 mb-1"><span class="material-symbols-outlined text-[12px]">calendar_month</span> April 2019 – April 2020</div>
            <ul class="list-disc list-outside ml-4 mt-1 opacity-80 space-y-0.5 text-xs">
              <li>IT Support</li>
              <li>Development of Inventory System (Frontend & Backend)</li>
            </ul>
          </div>

           <div class="relative pl-4 border-l-2 border-leather-brown/20 dark:border-white/10">
            <div class="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-leather-brown/40 dark:bg-white/40"></div>
            <h4 class="font-bold text-[15px]">Working Student – R&D</h4>
            <div class="text-accent-orange font-medium">Trumpf Hüttinger</div>
            <div class="flex items-center gap-1 opacity-60 text-xs mt-0.5 mb-1"><span class="material-symbols-outlined text-[12px]">calendar_month</span> March 2023 – August 2024</div>
            <ul class="list-disc list-outside ml-4 mt-1 opacity-80 space-y-0.5 text-xs">
              <li>Built C# MVVM applications for PID temperature control and automated testing.</li>
              <li>Implemented device communication via TCP (1kW SSPG), Serial (pyrometer), and CAN-FD.</li>
              <li>Designed and implemented algorithms for pallet balancing, power sweeps, and polynomial calculations.</li>
              <li>Automated the calibration of 2.4-2.5GHz solid-state microwave generators.</li>
              <li>Aided 6kW SSPG development via microcontroller selection, Eagle schematic analysis, and MS Visio block diagrams.</li>
              <li>Authored comprehensive technical project documentation in LaTeX.</li>
            </ul>
          </div>

          <div class="relative pl-4 border-l-2 border-leather-brown/20 dark:border-white/10">
            <div class="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-leather-brown/40 dark:bg-white/40"></div>
            <h4 class="font-bold text-[15px]">Working Student – Quantum Computing</h4>
            <div class="text-accent-orange font-medium">dmTech</div>
            <div class="flex items-center gap-1 opacity-60 text-xs mt-0.5 mb-1"><span class="material-symbols-outlined text-[12px]">calendar_month</span> March 2025 – September 2025</div>
            <ul class="list-disc list-outside ml-4 mt-1 opacity-80 space-y-0.5 text-xs">
              <li>Conducted an assessment of quantum readiness by interviewing internal stakeholders and coordinating with external quantum vendors.</li>
              <li>Developed proof-of-concept implementations of NIST-standardized post-quantum algorithms using Python and Java notebooks.</li>
              <li>Implemented quantum algorithms (Qiskit) and quantum Annealing models (D-Wave) to apply in optimization problems relevant to DM's operational logistics.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </div>

  <div v-else-if="side === 'right'" class="relative z-10 h-full flex flex-col font-body text-leather-brown dark:text-orange-50/80">
    <div class="mb-4 text-right pr-4">
      <h2 class="font-heading text-4xl text-leather-brown dark:text-notebook-yellow/90 relative inline-block transition-colors duration-300">01. Curriculum Vitae
        <span class="absolute -bottom-2 left-0 w-full h-1 bg-accent-orange/20 rounded-full transform -rotate-1"></span>
      </h2>
    </div>

    <div class="flex-grow space-y-5 overflow-y-auto pr-2 pb-4 scrollbar-hide text-sm mt-2">
      <!-- Experience Abroad Section -->
      <section>
        <h3 class="font-heading text-2xl text-leather-brown dark:text-white/90 border-b-2 border-accent-orange/30 pb-1 mb-3 uppercase flex items-center gap-2">
          <span class="material-symbols-outlined text-accent-orange">public</span> Experience Abroad
        </h3>
        
        <div class="space-y-3 pl-1">
          <div class="relative pl-4 border-l-2 border-leather-brown/20 dark:border-white/10">
            <div class="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full border-2 border-accent-orange bg-white dark:bg-[#2c2c2c]"></div>
            <h4 class="font-bold text-[15px]">B.Sc. Computer Science</h4>
            <div class="text-accent-orange font-medium">Universidad Politecnica de Madrid</div>
            <div class="flex items-center gap-1 opacity-60 text-xs mt-0.5"><span class="material-symbols-outlined text-[12px]">calendar_month</span> September 2023 – February 2024</div>
            <div class="flex items-center gap-1 opacity-60 text-xs mt-0.5"><span class="material-symbols-outlined text-[12px]">location_on</span> Madrid, Spain</div>
          </div>
          
           <div class="relative pl-4 border-l-2 border-leather-brown/20 dark:border-white/10">
            <div class="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full border-2 border-accent-orange bg-white dark:bg-[#2c2c2c]"></div>
            <h4 class="font-bold text-[15px]">M.Sc. Computer Science</h4>
            <div class="text-accent-orange font-medium">Radboud University</div>
            <div class="flex items-center gap-1 opacity-60 text-xs mt-0.5"><span class="material-symbols-outlined text-[12px]">calendar_month</span> September 2023 – February 2024</div>
            <div class="flex items-center gap-1 opacity-60 text-xs mt-0.5"><span class="material-symbols-outlined text-[12px]">location_on</span> Nijmegen, Netherlands</div>
          </div>
        </div>
      </section>

      <!-- Skills Section -->
      <section>
        <h3 class="font-heading text-2xl text-leather-brown dark:text-white/90 border-b-2 border-accent-orange/30 pb-1 mb-3 uppercase flex items-center gap-2">
          <span class="material-symbols-outlined text-accent-orange">build</span> Skills
        </h3>
        <div class="flex flex-wrap gap-2 mt-2">
           <span v-for="skill in ['Python (Notebooks)', 'React, Next', 'Vue, Nuxt', 'Supabase', 'Java', 'C#', 'C(++)', 'Linux', 'Docker']" :key="skill" class="px-2 py-1 text-xs border border-leather-brown/30 dark:border-white/20 rounded-md bg-white/40 dark:bg-black/20 shadow-sm">{{ skill }}</span>
        </div>
      </section>

      <!-- Languages Section -->
      <section>
        <h3 class="font-heading text-2xl text-leather-brown dark:text-white/90 border-b-2 border-accent-orange/30 pb-1 mb-3 uppercase flex items-center gap-2">
          <span class="material-symbols-outlined text-accent-orange">translate</span> Languages
        </h3>
        <div class="grid grid-cols-2 gap-y-2 gap-x-6 mt-2 text-[15px]">
          <div class="flex items-center justify-between">
             <span class="font-bold">German</span>
             <div class="flex gap-1 text-accent-orange items-center">
                <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">circle</span>
                <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">circle</span>
                <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">circle</span>
                <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">circle</span>
                <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">circle</span>
             </div>
          </div>
           <div class="flex items-center justify-between">
             <span class="font-bold">English</span>
             <div class="flex gap-1 text-accent-orange items-center">
                <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">circle</span>
                <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">circle</span>
                <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">circle</span>
                <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">circle</span>
                <!-- Half circle using a precise relative wrapper -->
                <div class="relative flex items-center">
                    <span class="material-symbols-outlined text-[14px] text-leather-brown/30 dark:text-white/20" style="font-variation-settings: 'FILL' 0;">circle</span>
                    <span class="material-symbols-outlined text-[14px] absolute left-0 top-0 bottom-0 overflow-hidden text-accent-orange" style="font-variation-settings: 'FILL' 1; width: 50%;">circle</span>
                </div>
             </div>
          </div>
           <div class="flex items-center justify-between">
             <span class="font-bold">Spanish</span>
             <div class="flex gap-1 text-accent-orange items-center">
                <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">circle</span>
                <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">circle</span>
                <span class="material-symbols-outlined text-[14px] text-leather-brown/30 dark:text-white/20" style="font-variation-settings: 'FILL' 0;">circle</span>
                <span class="material-symbols-outlined text-[14px] text-leather-brown/30 dark:text-white/20" style="font-variation-settings: 'FILL' 0;">circle</span>
                <span class="material-symbols-outlined text-[14px] text-leather-brown/30 dark:text-white/20" style="font-variation-settings: 'FILL' 0;">circle</span>
             </div>
          </div>
           <div class="flex items-center justify-between">
             <span class="font-bold">French</span>
             <div class="flex gap-1 text-accent-orange items-center">
                <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">circle</span>
                <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">circle</span>
                <span class="material-symbols-outlined text-[14px] text-leather-brown/30 dark:text-white/20" style="font-variation-settings: 'FILL' 0;">circle</span>
                <span class="material-symbols-outlined text-[14px] text-leather-brown/30 dark:text-white/20" style="font-variation-settings: 'FILL' 0;">circle</span>
                <span class="material-symbols-outlined text-[14px] text-leather-brown/30 dark:text-white/20" style="font-variation-settings: 'FILL' 0;">circle</span>
             </div>
          </div>
        </div>
      </section>

      <!-- Publications Section -->
      <section>
        <h3 class="font-heading text-2xl text-leather-brown dark:text-white/90 border-b-2 border-accent-orange/30 pb-1 mb-2 uppercase flex items-center gap-2">
          <span class="material-symbols-outlined text-accent-orange">menu_book</span> Publications
        </h3>
        
        <div class="space-y-2 mt-2">
           <div>
             <h4 class="text-[14px] font-bold text-accent-orange flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px]">book</span> Thesis</h4>
             <ul class="list-disc list-inside mt-1 opacity-80 space-y-0.5 text-[11px] leading-snug">
               <li>M. Kadner, "Towards improved uniform random sampling using grover's algorithm," 2023.</li>
             </ul>
           </div>
           <div>
             <h4 class="text-[14px] font-bold text-accent-orange flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px]">description</span> Papers</h4>
             <ul class="list-disc list-inside mt-1 opacity-80 space-y-0.5 text-[11px] leading-snug">
               <li>M. Kadner, <span class="italic">Exploring configurability of quantum compiling</span>, 2025.</li>
               <li>M. Kadner, <span class="italic">Enhancing and optimizing grover's algorithm for unified random sampling of software product lines</span>, 2024.</li>
             </ul>
           </div>
        </div>
      </section>
    </div>

    <!-- Page Number -->
    <div class="pt-4 flex justify-between items-end border-t border-leather-brown/10 dark:border-white/5 transition-colors duration-300 mt-2">
        <p class="font-body text-sm text-leather-brown/40">Page 01</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  side: 'left' | 'right'
}>()
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
