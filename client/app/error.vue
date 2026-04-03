<template>
  <div class="min-h-screen bg-gradient-to-br from-[#f9fafc] to-[#e5e7eb]">
      <!-- ================================================================
         ERROR CONTENT
    ================================================================ -->
      <div class="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
          <!-- Background Decorative Elements -->
          <div class="absolute inset-0 z-0" aria-hidden="true">
              <!-- Gradient Orbs -->
              <div class="absolute top-20 left-10 w-72 h-72 bg-[#7ec8e3]/20 rounded-full blur-3xl animate-float"></div>
              <div class="absolute bottom-20 right-10 w-96 h-96 bg-[#1a4a6b]/20 rounded-full blur-3xl animate-float-delayed"></div>
              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-gradient-to-r from-[#7ec8e3]/5 to-[#1a4a6b]/5 rounded-full blur-3xl"></div>
              
              <!-- Pattern Overlay -->
              <svg class="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                      <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" stroke-width="0.5"/>
                      </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)"/>
              </svg>
          </div>

          <!-- Main Error Content -->
          <div class="relative z-10 max-w-2xl mx-auto text-center">
              <!-- Error Status with Animation -->
              <div class="relative mb-8">
                  <div class="text-[15rem] md:text-[20rem] font-display font-black leading-none tracking-tighter">
                      <span class="bg-gradient-to-r from-[#1a4a6b] to-[#7ec8e3] bg-clip-text text-transparent animate-pulse-slow">
                          {{ error.status || 404 }}
                      </span>
                  </div>
                  <div class="absolute inset-0 flex items-center justify-center">
                      <div class="w-48 h-48 bg-[#7ec8e3]/10 rounded-full blur-2xl animate-ping-slow"></div>
                  </div>
              </div>

              <!-- Error Message -->
              <div class="mb-8">
                  <h2 class="font-display font-bold text-3xl md:text-4xl text-[#1a1a1a] mb-4">
                      {{ getErrorMessage() }}
                  </h2>
                  <p class="text-[#555555] text-lg md:text-xl leading-relaxed max-w-md mx-auto">
                      {{ getErrorDescription() }}
                  </p>
              </div>

              <!-- Fun Fact or Quote -->
              <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-[#e5e7eb] shadow-lg">
                  <div class="flex items-start gap-3">
                      <span class="text-3xl">✨</span>
                      <div class="text-left">
                          <p class="text-sm text-[#555555] font-medium mb-1">Travel Wisdom</p>
                          <p class="text-[#1a1a1a] text-sm leading-relaxed">
                              "{{ getRandomQuote() }}"
                          </p>
                      </div>
                  </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <NuxtLink href="/" 
                      class="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#1a4a6b] to-[#7ec8e3] text-white rounded-full font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95">
                      <svg class="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                      </svg>
                      Back to Home
                  </NuxtLink>
                  
                  <button @click="goBack" 
                      class="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#1a1a1a] rounded-full font-semibold border-2 border-[#e5e7eb] transition-all duration-300 hover:border-[#7ec8e3] hover:shadow-lg hover:scale-105 active:scale-95">
                      <svg class="w-5 h-5 transition-transform group-hover:-rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                      </svg>
                      Go Back
                  </button>
              </div>

              <!-- Quick Links -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                  <NuxtLink href="/stories" 
                      class="group p-3 bg-white/80 backdrop-blur-sm rounded-xl text-center hover:bg-white transition-all duration-300 hover:shadow-md">
                      <div class="text-2xl mb-1 group-hover:scale-110 transition-transform">📖</div>
                      <p class="text-xs font-medium text-[#1a1a1a]">Stories</p>
                  </NuxtLink>
                  <NuxtLink href="/destinations" 
                      class="group p-3 bg-white/80 backdrop-blur-sm rounded-xl text-center hover:bg-white transition-all duration-300 hover:shadow-md">
                      <div class="text-2xl mb-1 group-hover:scale-110 transition-transform">🗺️</div>
                      <p class="text-xs font-medium text-[#1a1a1a]">Destinations</p>
                  </NuxtLink>
                  <NuxtLink href="/gallery" 
                      class="group p-3 bg-white/80 backdrop-blur-sm rounded-xl text-center hover:bg-white transition-all duration-300 hover:shadow-md">
                      <div class="text-2xl mb-1 group-hover:scale-110 transition-transform">📸</div>
                      <p class="text-xs font-medium text-[#1a1a1a]">Gallery</p>
                  </NuxtLink>
                  <NuxtLink href="/about" 
                      class="group p-3 bg-white/80 backdrop-blur-sm rounded-xl text-center hover:bg-white transition-all duration-300 hover:shadow-md">
                      <div class="text-2xl mb-1 group-hover:scale-110 transition-transform">👤</div>
                      <p class="text-xs font-medium text-[#1a1a1a]">About</p>
                  </NuxtLink>
              </div>

              <!-- Search Section -->
              <div class="mt-12 pt-8 border-t border-[#e5e7eb]">
                  <p class="text-sm text-[#555555] mb-3">Can't find what you're looking for?</p>
                  <div class="relative max-w-md mx-auto">
                      <input type="text" 
                             placeholder="Search stories and destinations..." 
                             class="w-full px-5 py-3 pl-12 rounded-full border border-[#e5e7eb] focus:border-[#7ec8e3] focus:outline-none focus:ring-2 focus:ring-[#7ec8e3]/20 transition-all"
                             @keyup.enter="handleSearch">
                      <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#555555]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

// ============================================================
// Error Message Mapping
// ============================================================
const getErrorMessage = () => {
  const status = props.error.statusCode || props.error.status || 404
  
  const messages: Record<number, string> = {
      400: 'Bad Request',
      401: 'Unauthorized Access',
      403: 'Forbidden Territory',
      404: 'Page Not Found',
      500: 'Server Error',
      503: 'Service Unavailable'
  }
  
  return messages[status] || 'Something Went Wrong'
}

const getErrorDescription = () => {
  const status = props.error.statusCode || props.error.status || 404
  
  const descriptions: Record<number, string> = {
      400: 'The request could not be understood by the server. Please check your input and try again.',
      401: 'You need to be authenticated to access this page. Please log in and continue your journey.',
      403: 'This area is restricted. It seems you don\'t have permission to explore this path.',
      404: 'The page you\'re looking for seems to have wandered off the map. It might have been moved or never existed.',
      500: 'Our server encountered an unexpected error. Our team has been notified and is working on it.',
      503: 'The site is currently under maintenance. We\'ll be back with more adventures soon!'
  }
  
  return descriptions[status] || 'We encountered an unexpected issue. Please try again later or contact support if the problem persists.'
}

// ============================================================
// Travel Quotes
// ============================================================
const quotes = [
  "Not all those who wander are lost. - J.R.R. Tolkien",
  "The journey of a thousand miles begins with a single step. - Lao Tzu",
  "Adventure is worthwhile in itself. - Amelia Earhart",
  "Travel is the only thing you buy that makes you richer. - Anonymous",
  "Take only memories, leave only footprints. - Chief Seattle",
  "The world is a book, and those who do not travel read only one page. - Saint Augustine",
  "To travel is to live. - Hans Christian Andersen",
  "Life is either a daring adventure or nothing at all. - Helen Keller"
]

const getRandomQuote = () => {
  return quotes[Math.floor(Math.random() * quotes.length)]
}

// ============================================================
// Navigation Functions
// ============================================================
const goBack = () => {
  if (window.history.length > 1) {
      window.history.back()
  } else {
      navigateTo('/')
  }
}

const handleSearch = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.value.trim()) {
      navigateTo(`/search?q=${encodeURIComponent(input.value)}`)
  }
}

// ============================================================
// Clear Error on Navigation
// ============================================================
const clearError = () => {
  // Clear the error from Nuxt's error handler
  if (clearError) {
      // @ts-ignore - Nuxt's clearError function
      clearError()
  }
}

// Use the clearError function when navigating away
onBeforeRouteLeave(() => {
  clearError()
})
</script>

<style scoped>
@keyframes float {
  0%, 100% {
      transform: translateY(0px) rotate(0deg);
  }
  50% {
      transform: translateY(-20px) rotate(5deg);
  }
}

@keyframes float-delayed {
  0%, 100% {
      transform: translateY(0px) rotate(0deg);
  }
  50% {
      transform: translateY(-30px) rotate(-3deg);
  }
}

@keyframes ping-slow {
  75%, 100% {
      transform: scale(1.5);
      opacity: 0;
  }
}

@keyframes pulse-slow {
  0%, 100% {
      opacity: 1;
  }
  50% {
      opacity: 0.7;
  }
}

.animate-float {
  animation: float 8s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 10s ease-in-out infinite;
}

.animate-ping-slow {
  animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>