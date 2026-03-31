<template>
    <div class="w-full">
        <div  class="flex items-center justify-center min-h-screen px-6">
               <div class="text-center max-w-md">
                   <div class="error-icon w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center shadow-lg">
                       <svg class="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                               d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z">
                           </path>
                       </svg>
                   </div>
                   <h2 class="text-3xl font-display font-bold text-[#1a1a1a] mb-4">Article Not Found</h2>
                   <p class="text-[#555555] mb-8 leading-relaxed">
                       {{ error.message || "The adventure you're looking for doesn't exist or has been moved." }}
                   </p>
                   <NuxtLink to="/"
                       class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#7ec8e3] to-[#1a4a6b] hover:from-[#5bb8d4] hover:to-[#0f2a3f] text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                       <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                       </svg>
                       Back to Home
                   </NuxtLink>
               </div>
           </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps(['error'])
</script>