<template>
    <div class="w-full" v-if="destination">
        <!-- ================================================================
           HERO SECTION WITH PARALLAX
      ================================================================ -->
        <header>
            <section class="relative min-h-screen flex flex-col overflow-hidden" aria-label="Destination header">
                <!-- Background Image with Parallax Effect -->
                <div class="absolute inset-0 z-0" aria-hidden="true">
                    <div class="hero-parallax w-full h-full bg-cover bg-center bg-fixed"
                         :style="{ backgroundImage: `url(${destination.heroImage})` }">
                    </div>
                    <div class="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/70 via-[#1a4a6b]/50 to-[#0f2a3f]/80 z-10"></div>
                    <div class="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#f9fafc] to-transparent z-20"></div>
                </div>

                <!-- Navbar -->
                <Navbar />

                <!-- Hero Content -->
                <main class="flex-1 flex items-center px-6 md:px-12 lg:px-20 py-20 relative z-20">
                    <div class="w-full text-center text-white">
                        <div class="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full mb-6">
                            <span class="text-2xl">{{ getRegionIcon(destination.region) }}</span>
                            <span class="text-[#7ec8e3] text-sm font-semibold tracking-[0.2em] uppercase">{{ destination.region }}</span>
                        </div>
                        <h1 class="font-display font-black text-5xl md:text-6xl lg:text-7xl mb-4 leading-tight">
                            {{ destination.name }}
                        </h1>
                        <div class="flex items-center justify-center gap-2 mb-4">
                            <svg class="w-5 h-5 text-[#7ec8e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            <span class="text-white/80 text-lg">{{ destination.location }}, {{ destination.country }}</span>
                        </div>
                        <div class="flex items-center justify-center gap-6 mt-6">
                            <div class="flex items-center gap-2">
                                <div class="flex">
                                    <svg v-for="i in 5" :key="i" class="w-5 h-5" :class="i <= Math.floor(destination.rating) ? 'text-yellow-400' : 'text-white/30'" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                </div>
                                <span class="text-white font-bold">{{ destination.rating }}</span>
                                <span class="text-white/60">({{ destination.reviews }} reviews)</span>
                            </div>
                            <div class="w-1 h-1 bg-[#7ec8e3] rounded-full"></div>
                            <div class="flex items-center gap-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                <span>Best Time: {{ destination.bestTime }}</span>
                            </div>
                        </div>
                    </div>
                </main>

                <!-- Scroll Indicator -->
                <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
                    <svg class="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7-7-7m14-6l-7 7-7-7"></path>
                    </svg>
                </div>
            </section>
        </header>

        <!-- ================================================================
           QUICK INFO CARDS
      ================================================================ -->
        <div class="relative z-30 -mt-20 px-6 md:px-12 lg:px-20">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div class="bg-white rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <div class="w-12 h-12 rounded-full bg-[#7ec8e3]/10 flex items-center justify-center mx-auto mb-3">
                        <svg class="w-6 h-6 text-[#7ec8e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <p class="text-[#555555] text-sm uppercase tracking-wider mb-1">Best Time to Visit</p>
                    <p class="font-display font-bold text-[#1a1a1a] text-lg">{{ destination.bestTime }}</p>
                </div>
                <div class="bg-white rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <div class="w-12 h-12 rounded-full bg-[#7ec8e3]/10 flex items-center justify-center mx-auto mb-3">
                        <svg class="w-6 h-6 text-[#7ec8e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"></path>
                        </svg>
                    </div>
                    <p class="text-[#555555] text-sm uppercase tracking-wider mb-1">Recommended Duration</p>
                    <p class="font-display font-bold text-[#1a1a1a] text-lg">{{ destination.duration }}</p>
                </div>
                <div class="bg-white rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <div class="w-12 h-12 rounded-full bg-[#7ec8e3]/10 flex items-center justify-center mx-auto mb-3">
                        <svg class="w-6 h-6 text-[#7ec8e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <p class="text-[#555555] text-sm uppercase tracking-wider mb-1">Budget Level</p>
                    <p class="font-display font-bold text-[#1a1a1a] text-lg">{{ destination.budget }}</p>
                </div>
                <div class="bg-white rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <div class="w-12 h-12 rounded-full bg-[#7ec8e3]/10 flex items-center justify-center mx-auto mb-3">
                        <svg class="w-6 h-6 text-[#7ec8e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        </svg>
                    </div>
                    <p class="text-[#555555] text-sm uppercase tracking-wider mb-1">Language</p>
                    <p class="font-display font-bold text-[#1a1a1a] text-lg">{{ destination.language }}</p>
                </div>
            </div>
        </div>

        <!-- ================================================================
           MAIN CONTENT
      ================================================================ -->
        <div class="px-6 md:px-12 lg:px-20 py-16">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <!-- Left Column: Main Description -->
                <div class="lg:col-span-2">
                    <div class="prose prose-lg max-w-none">
                        <h2 class="font-display font-bold text-[#1a1a1a] text-3xl mb-6">About {{ destination.name }}</h2>
                        <p class="text-[#555555] text-lg leading-relaxed mb-6">{{ destination.fullDescription }}</p>
                        
                        <h3 class="font-display font-bold text-[#1a1a1a] text-2xl mb-4 mt-8">Top Experiences</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            <div v-for="(experience, idx) in destination.experiences" :key="idx" 
                                 class="flex items-start gap-3 p-4 bg-[#f9fafc] rounded-xl hover:bg-white hover:shadow-md transition-all">
                                <div class="w-8 h-8 rounded-full bg-[#7ec8e3]/20 flex items-center justify-center flex-shrink-0">
                                    <span class="text-[#7ec8e3]">{{ experience.icon }}</span>
                                </div>
                                <div>
                                    <p class="font-semibold text-[#1a1a1a]">{{ experience.title }}</p>
                                    <p class="text-sm text-[#555555]">{{ experience.description }}</p>
                                </div>
                            </div>
                        </div>

                        <h3 class="font-display font-bold text-[#1a1a1a] text-2xl mb-4">Travel Tips</h3>
                        <ul class="space-y-3 mb-8">
                            <li v-for="(tip, idx) in destination.tips" :key="idx" class="flex items-start gap-3">
                                <svg class="w-5 h-5 text-[#7ec8e3] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-[#555555]">{{ tip }}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Right Column: Sidebar -->
                <div class="lg:col-span-1">
                    <!-- Weather Card -->
                    <div class="bg-gradient-to-br from-[#1a4a6b] to-[#0f2a3f] rounded-2xl p-6 text-white mb-6">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="font-display font-bold text-xl">Current Weather</h3>
                            <span class="text-3xl">{{ destination.weatherIcon }}</span>
                        </div>
                        <div class="text-4xl font-bold mb-2">{{ destination.temperature }}°C</div>
                        <p class="text-white/80">{{ destination.weatherCondition }}</p>
                        <div class="mt-4 pt-4 border-t border-white/20">
                            <div class="flex justify-between text-sm">
                                <span>Humidity: {{ destination.humidity }}%</span>
                                <span>Wind: {{ destination.wind }} km/h</span>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Facts -->
                    <div class="bg-white border border-[#e5e7eb] rounded-2xl p-6 mb-6">
                        <h3 class="font-display font-bold text-[#1a1a1a] text-xl mb-4">Quick Facts</h3>
                        <div class="space-y-3">
                            <div class="flex justify-between">
                                <span class="text-[#555555]">Country</span>
                                <span class="font-semibold text-[#1a1a1a]">{{ destination.country }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-[#555555]">Region</span>
                                <span class="font-semibold text-[#1a1a1a]">{{ destination.region }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-[#555555]">Currency</span>
                                <span class="font-semibold text-[#1a1a1a]">{{ destination.currency }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-[#555555]">Time Zone</span>
                                <span class="font-semibold text-[#1a1a1a]">{{ destination.timezone }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-[#555555]">Best Months</span>
                                <span class="font-semibold text-[#1a1a1a]">{{ destination.bestMonths }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Travel Essentials -->
                    <div class="bg-[#f9fafc] rounded-2xl p-6">
                        <h3 class="font-display font-bold text-[#1a1a1a] text-xl mb-4">Essential Info</h3>
                        <div class="space-y-4">
                            <div>
                                <p class="text-sm font-semibold text-[#1a1a1a] mb-1">📋 Visa Required</p>
                                <p class="text-sm text-[#555555]">{{ destination.visaInfo }}</p>
                            </div>
                            <div>
                                <p class="text-sm font-semibold text-[#1a1a1a] mb-1">💉 Vaccinations</p>
                                <p class="text-sm text-[#555555]">{{ destination.vaccinations }}</p>
                            </div>
                            <div>
                                <p class="text-sm font-semibold text-[#1a1a1a] mb-1">🔌 Plug Type</p>
                                <p class="text-sm text-[#555555]">{{ destination.plugType }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ================================================================
           PHOTO GALLERY
      ================================================================ -->
        <section class="px-6 md:px-12 lg:px-20 py-16 bg-[#f9fafc]">
            <div class="text-center mb-12">
                <p class="text-[#7ec8e3] text-xs font-semibold tracking-[0.2em] uppercase mb-3 flex items-center justify-center gap-2">
                    <span class="w-8 h-px bg-[#7ec8e3]"></span> 
                    Visual Journey 
                    <span class="w-8 h-px bg-[#7ec8e3]"></span>
                </p>
                <h2 class="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl">Moments from {{ destination.name }}</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="(photo, idx) in destination.gallery" :key="idx"
                     class="group relative rounded-2xl overflow-hidden cursor-pointer aspect-square"
                     @click="openLightbox(idx as number)">
                    <img :src="photo" :alt="`${destination.name} gallery ${idx as number + 1 }`"
                         class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </section>

        <!-- ================================================================
           RELATED STORIES
      ================================================================ -->
        <section class="px-6 md:px-12 lg:px-20 py-16">
            <div class="mb-12">
                <h2 class="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl mb-4">Stories from {{ destination.name }}</h2>
                <p class="text-[#555555] text-lg">Travel tales and adventures from this incredible destination</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <NuxtLink v-for="story in destination.relatedStories" :key="story.id"
                          :to="`/story/${story.slug}`"
                          class="group relative rounded-2xl overflow-hidden bg-white border border-[#e5e7eb] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    
                    <div class="relative h-56 overflow-hidden">
                        <img :src="story.image" :alt="story.title"
                             class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div class="absolute bottom-4 left-4">
                            <span class="bg-[#7ec8e3] text-[#1a1a1a] text-xs font-bold px-3 py-1 rounded-full">
                                {{ story.category }}
                            </span>
                        </div>
                    </div>

                    <div class="p-5">
                        <div class="flex items-center gap-3 mb-3">
                            <div class="flex items-center gap-2">
                                <img :src="story.authorAvatar" class="w-6 h-6 rounded-full" />
                                <span class="text-xs text-[#555555]">{{ story.author }}</span>
                            </div>
                            <span class="w-1 h-1 rounded-full bg-[#7ec8e3]"></span>
                            <time class="text-[#555555] text-xs">{{ story.date }}</time>
                        </div>

                        <h3 class="font-display font-bold text-[#1a1a1a] text-lg leading-snug mb-2 group-hover:text-[#1a4a6b] transition-colors line-clamp-2">
                            {{ story.title }}
                        </h3>

                        <p class="text-[#555555] text-sm leading-relaxed line-clamp-2 mb-3">
                            {{ story.excerpt }}
                        </p>

                        <div class="flex items-center justify-between pt-3 border-t border-[#e5e7eb]">
                            <span class="text-xs text-[#555555] flex items-center gap-1">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                {{ story.readTime }}
                            </span>
                            <span class="text-[#7ec8e3] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                Read Story →
                            </span>
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </section>

        <!-- ================================================================
           MAP SECTION
      ================================================================ -->
        <section class="px-6 md:px-12 lg:px-20 pb-20">
            <div class="bg-[#f9fafc] rounded-3xl overflow-hidden">
                <div class="grid grid-cols-1 lg:grid-cols-3">
                    <div class="lg:col-span-1 p-8">
                        <h3 class="font-display font-bold text-[#1a1a1a] text-2xl mb-4">Location</h3>
                        <p class="text-[#555555] mb-4">{{ destination.locationDescription }}</p>
                        <div class="flex items-center gap-2 text-[#7ec8e3]">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            <span class="text-sm">{{ destination.location }}, {{ destination.country }}</span>
                        </div>
                    </div>
                    <div class="lg:col-span-2 h-80 lg:h-auto">
                        <img :src="destination.mapImage" :alt="`Map of ${destination.name}`" class="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </section>

        <!-- Lightbox Modal -->
        <div v-if="lightboxOpen" class="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" @click="closeLightbox">
            <div class="relative max-w-5xl max-h-[90vh]" @click.stop>
                <img :src="destination.gallery[lightboxIndex]" alt="Gallery image" class="w-full h-full object-contain" />
                <button @click="closeLightbox" class="absolute top-4 right-4 text-white hover:text-[#7ec8e3] transition-colors">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <button v-if="lightboxIndex > 0" @click="prevImage" class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-[#7ec8e3] transition-colors">
                    <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>
                <button v-if="lightboxIndex < destination.gallery.length - 1" @click="nextImage" class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-[#7ec8e3] transition-colors">
                    <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>
        </div>

        <!-- Newsletter CTA and Footer are in layout -->
    </div>

    <!-- Not Found State -->
    <div v-else class="min-h-screen flex items-center justify-center px-6">
        <div class="text-center max-w-md">
            <div class="text-6xl mb-4">🗺️</div>
            <h2 class="font-display font-bold text-2xl text-[#1a1a1a] mb-2">Destination Not Found</h2>
            <p class="text-[#555555] mb-6">We couldn't find the destination you're looking for.</p>
            <NuxtLink href="/destinations" 
                class="inline-block px-6 py-3 bg-[#7ec8e3] text-[#1a1a1a] rounded-full font-semibold hover:bg-[#5bb8d4] transition-all">
                Explore All Destinations
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'nuxt/app'

const route = useRoute()
const destinationSlug = computed(() => route.params.slug as string)

// ============================================================
// Lightbox State
// ============================================================
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

const openLightbox = (index: number) => {
    lightboxIndex.value = index
    lightboxOpen.value = true
    document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
    lightboxOpen.value = false
    document.body.style.overflow = ''
}

const prevImage = () => {
    if (lightboxIndex.value > 0) {
        lightboxIndex.value--
    }
}

const nextImage = () => {
    if (destination.value && lightboxIndex.value < destination.value.gallery.length - 1) {
        lightboxIndex.value++
    }
}

// ============================================================
// Helper Function
// ============================================================
const getRegionIcon = (region: string) => {
    const icons: Record<string, string> = {
        'Asia': '🏯',
        'Europe': '🏰',
        'Americas': '🗽',
        'Africa': '🦁',
        'Oceania': '🏝️'
    }
    return icons[region] || '🌍'
}

// ============================================================
// Destination Data
// ============================================================
const destination = computed(() => {
    const destinationsData: Record<string, any> = {
        'swiss-alps': {
            id: 1,
            slug: 'swiss-alps',
            name: 'Swiss Alps',
            country: 'Switzerland',
            region: 'Europe',
            location: 'Interlaken, Jungfrau Region',
            heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80',
            rating: 4.9,
            reviews: 342,
            bestTime: 'June - September',
            duration: '5-7 days',
            budget: '$$$',
            language: 'German, French, Italian',
            currency: 'Swiss Franc (CHF)',
            timezone: 'CET/CEST',
            bestMonths: 'Jun, Jul, Aug, Sep',
            visaInfo: 'Schengen visa required for most nationalities',
            vaccinations: 'None required',
            plugType: 'Type J (3-pin)',
            temperature: '18',
            weatherCondition: 'Partly Cloudy',
            weatherIcon: '⛅',
            humidity: '65',
            wind: '12',
            fullDescription: 'The Swiss Alps are a breathtaking mountain range that spans across Switzerland, offering some of the most spectacular landscapes in the world. From the iconic Matterhorn to the Jungfrau region, this alpine paradise is a haven for outdoor enthusiasts, nature lovers, and those seeking tranquility amidst majestic peaks. The region boasts crystal-clear lakes, charming villages, and world-class hiking trails that attract millions of visitors each year.',
            experiences: [
                { icon: '🏔️', title: 'Hike the Eiger Trail', description: 'Walk beneath the legendary north face of the Eiger' },
                { icon: '🚡', title: 'Jungfraujoch - Top of Europe', description: 'Visit the highest railway station in Europe' },
                { icon: '🛷', title: 'Paragliding in Interlaken', description: 'Soar above the stunning lakes and mountains' },
                { icon: '🚂', title: 'Glacier Express', description: 'Take the world\'s slowest express train through alpine scenery' }
            ],
            tips: [
                'Purchase a Swiss Travel Pass for unlimited travel on trains, buses, and boats',
                'Pack layers as weather can change quickly in the mountains',
                'Book accommodations in advance during peak summer season',
                'Try local specialties like fondue and raclette',
                'Learn a few basic German or French phrases for better interactions'
            ],
            gallery: [
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'
            ],
            locationDescription: 'Located in the heart of the Alps, this region is easily accessible from major Swiss cities like Zurich and Geneva. The area is well-connected by an efficient railway system, making it a perfect base for exploring the mountains.',
            mapImage: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80',
            relatedStories: [
                {
                    id: 1,
                    slug: 'hiking-swiss-alps',
                    title: 'Conquering the Jungfrau Region: A 5-Day Trek',
                    excerpt: 'An unforgettable journey through Switzerland\'s most spectacular alpine landscapes...',
                    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
                    category: 'Hiking',
                    author: 'Shayon',
                    authorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
                    date: 'Aug 15, 2024',
                    readTime: '8 min read'
                }
            ]
        },
        'kyoto-japan': {
            id: 2,
            slug: 'kyoto-japan',
            name: 'Kyoto',
            country: 'Japan',
            region: 'Asia',
            location: 'Kansai Region',
            heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1600&q=80',
            rating: 4.8,
            reviews: 567,
            bestTime: 'March-May, October-November',
            duration: '4-6 days',
            budget: '$$',
            language: 'Japanese',
            currency: 'Japanese Yen (JPY)',
            timezone: 'JST',
            bestMonths: 'Mar, Apr, Oct, Nov',
            visaInfo: 'Visa-free for many countries for short stays',
            vaccinations: 'None required',
            plugType: 'Type A & B (2-pin)',
            temperature: '22',
            weatherCondition: 'Sunny',
            weatherIcon: '☀️',
            humidity: '55',
            wind: '8',
            fullDescription: 'Kyoto, the cultural heart of Japan, is a city that seamlessly blends ancient traditions with modern life. Home to over 2,000 temples and shrines, this former imperial capital offers a glimpse into Japan\'s rich history and spiritual heritage. From the iconic golden pavilion of Kinkaku-ji to the serene Arashiyama Bamboo Grove, Kyoto captivates visitors with its timeless beauty.',
            experiences: [
                { icon: '⛩️', title: 'Visit Fushimi Inari Shrine', description: 'Walk through thousands of iconic red torii gates' },
                { icon: '🍵', title: 'Tea Ceremony Experience', description: 'Participate in a traditional Japanese tea ceremony' },
                { icon: '🎋', title: 'Arashiyama Bamboo Grove', description: 'Stroll through the magical bamboo forest' },
                { icon: '👘', title: 'Geisha District', description: 'Explore Gion and spot geiko and maiko' }
            ],
            tips: [
                'Purchase a Japan Rail Pass before arriving for significant savings',
                'Learn basic Japanese phrases like "Arigato" (thank you)',
                'Respect temple etiquette - remove shoes when required',
                'Visit popular temples early morning to avoid crowds',
                'Try local specialties like matcha and yudofu'
            ],
            gallery: [
                'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
                'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
                'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
                'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
                'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
                'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80'
            ],
            locationDescription: 'Located in the Kansai region of Honshu, Kyoto is easily accessible from Tokyo via the Shinkansen (bullet train). The city is well-connected by an extensive bus and subway network.',
            mapImage: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&q=80',
            relatedStories: []
        }
    }

    return destinationsData[destinationSlug.value] || null
})
</script>

<style scoped lang="scss">
.hero-parallax {
    will-change: transform;
    transform: scale(1.05);
    transition: transform 0.3s ease-out;
}

.animate-bounce {
    animation: bounce 2s infinite;
}

@keyframes bounce {
    0%, 100% {
        transform: translateY(-25%) translateX(-50%);
        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
        transform: translateY(0) translateX(-50%);
        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.prose {
    p {
        margin-bottom: 1.5rem;
        line-height: 1.75;
    }
}
</style>