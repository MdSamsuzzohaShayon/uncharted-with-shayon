<template>
    <div class="w-full">
        <!-- ================================================================
           HERO SECTION
      ================================================================ -->
        <header>
            <section class="relative min-h-[70vh] flex flex-col overflow-hidden" aria-label="Destinations header">
                <div class="absolute inset-0 z-0" aria-hidden="true">
                    <div class="absolute inset-0 bg-gradient-to-br from-[#1a1a1a]/85 via-[#1a4a6b]/70 to-[#0f2a3f]/80 z-10"></div>
                    <div class="w-full h-full bg-cover bg-center"
                         style="background-image: url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80')">
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#f9fafc] to-transparent z-20"></div>
                </div>

                <Navbar />

                <main class="flex-1 flex items-center px-6 md:px-12 lg:px-20 py-20 relative z-20">
                    <div class="w-full text-center">
                        <div class="inline-flex items-center gap-3 bg-white/15 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/20">
                            <span class="text-3xl">🌍</span>
                            <span class="text-[#7ec8e3] text-sm font-semibold tracking-[0.2em] uppercase">Global Explorer</span>
                        </div>
                        <h1 class="font-display font-black text-white text-6xl md:text-7xl lg:text-8xl mb-6 leading-none">
                            Destinations
                        </h1>
                        <div class="w-24 h-1 bg-[#7ec8e3] mx-auto mb-6 rounded-full"></div>
                        <p class="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            Explore the places I've called home, discovered hidden gems, and created unforgettable memories.
                        </p>
                        <div class="mt-10 flex items-center justify-center gap-6 text-white/60 text-sm">
                            <div class="flex items-center gap-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"></path>
                                </svg>
                                <span>{{ totalDestinations }} Countries Visited</span>
                            </div>
                            <div class="w-1 h-1 bg-[#7ec8e3] rounded-full"></div>
                            <div class="flex items-center gap-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span>{{ totalCities }} Cities Explored</span>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </header>

        <!-- ================================================================
           STATS SECTION
      ================================================================ -->
        <section class="bg-gradient-to-br from-[#1a1a1a] to-[#1a4a6b] py-16">
            <div class="px-6 md:px-12 lg:px-20">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div class="stat-card">
                        <div class="text-4xl md:text-5xl font-display font-bold text-[#7ec8e3] mb-2">6</div>
                        <p class="text-white/70 text-sm uppercase tracking-wider">Continents</p>
                    </div>
                    <div class="stat-card">
                        <div class="text-4xl md:text-5xl font-display font-bold text-[#7ec8e3] mb-2">{{ totalDestinations }}</div>
                        <p class="text-white/70 text-sm uppercase tracking-wider">Countries</p>
                    </div>
                    <div class="stat-card">
                        <div class="text-4xl md:text-5xl font-display font-bold text-[#7ec8e3] mb-2">{{ totalCities }}</div>
                        <p class="text-white/70 text-sm uppercase tracking-wider">Cities</p>
                    </div>
                    <div class="stat-card">
                        <div class="text-4xl md:text-5xl font-display font-bold text-[#7ec8e3] mb-2">287,000+</div>
                        <p class="text-white/70 text-sm uppercase tracking-wider">Kilometers Traveled</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ================================================================
           FEATURED REGIONS (Interactive Map Style)
      ================================================================ -->
        <section class="px-6 md:px-12 lg:px-20 py-20">
            <div class="text-center mb-12">
                <p class="text-[#7ec8e3] text-xs font-semibold tracking-[0.2em] uppercase mb-3 flex items-center justify-center gap-2">
                    <span class="w-8 h-px bg-[#7ec8e3]"></span> 
                    Explore by Region 
                    <span class="w-8 h-px bg-[#7ec8e3]"></span>
                </p>
                <h2 class="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl">Journey Across Continents</h2>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <button v-for="region in regions" :key="region.name"
                    @click="activeRegion = region.name"
                    :class="[
                        'group relative rounded-2xl overflow-hidden aspect-square cursor-pointer transition-all duration-300',
                        activeRegion === region.name ? 'ring-2 ring-[#7ec8e3] ring-offset-2 scale-105' : 'hover:scale-105'
                    ]">
                    <img :src="region.image" :alt="region.name" class="w-full h-full object-cover" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    <div class="absolute bottom-0 left-0 right-0 p-3 text-center">
                        <span class="text-white font-bold text-sm">{{ region.name }}</span>
                        <p class="text-white/60 text-xs">{{ region.count }} countries</p>
                    </div>
                </button>
            </div>
        </section>

        <!-- ================================================================
           FILTERS & SEARCH
      ================================================================ -->
        <div class="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-y border-[#e5e7eb]">
            <div class="px-6 md:px-12 lg:px-20 py-4">
                <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <!-- Search Input -->
                    <div class="relative w-full md:w-96">
                        <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#555555]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                        <input 
                            v-model="searchQuery"
                            type="text"
                            placeholder="Search destinations..."
                            class="w-full pl-12 pr-4 py-3 rounded-full border border-[#e5e7eb] focus:border-[#7ec8e3] focus:outline-none transition-colors"
                        />
                    </div>

                    <!-- Filter Chips -->
                    <div class="flex gap-2 overflow-x-auto scrollbar-hide">
                        <button v-for="filter in filters" :key="filter.value"
                            @click="activeFilter = filter.value"
                            :class="[
                                'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300',
                                activeFilter === filter.value
                                    ? 'bg-[#1a4a6b] text-white'
                                    : 'bg-[#f0f0f0] text-[#555555] hover:bg-[#e5e7eb]'
                            ]">
                            {{ filter.label }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- ================================================================
           DESTINATIONS GRID (Featured Layout)
      ================================================================ -->
        <section class="px-6 md:px-12 lg:px-20 py-16">
            <div class="mb-8 flex items-center justify-between">
                <div>
                    <h2 class="font-display font-bold text-[#1a1a1a] text-2xl md:text-3xl">
                        {{ activeRegion === 'All' ? 'All Destinations' : `${activeRegion} Destinations` }}
                    </h2>
                    <p class="text-[#555555] mt-1">{{ filteredDestinations.length }} amazing places to explore</p>
                </div>
                <div class="flex gap-2">
                    <button @click="viewMode = 'grid'" 
                        :class="['p-2 rounded-lg transition-colors', viewMode === 'grid' ? 'bg-[#7ec8e3] text-white' : 'bg-[#f0f0f0] text-[#555555]']">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                        </svg>
                    </button>
                    <button @click="viewMode = 'list'" 
                        :class="['p-2 rounded-lg transition-colors', viewMode === 'list' ? 'bg-[#7ec8e3] text-white' : 'bg-[#f0f0f0] text-[#555555]']">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Grid View -->
            <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <NuxtLink v-for="(destination, index) in filteredDestinations" :key="destination.id"
                    :to="`/destinations/${destination.slug}`"
                    class="group relative rounded-2xl overflow-hidden bg-white border border-[#e5e7eb] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    
                    <div class="relative h-72 overflow-hidden">
                        <img :src="destination.heroImage" :alt="destination.name"
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                        
                        <!-- Country Flag/Badge -->
                        <div class="absolute top-4 left-4">
                            <span class="bg-white/90 backdrop-blur-sm text-[#1a1a1a] text-xs font-bold px-3 py-1.5 rounded-full">
                                {{ destination.country }}
                            </span>
                        </div>
                        
                        <!-- Rating -->
                        <div class="absolute top-4 right-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                            <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            <span class="text-white text-xs font-bold">{{ destination.rating }}</span>
                        </div>
                    </div>

                    <div class="p-5">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="font-display font-bold text-[#1a1a1a] text-xl group-hover:text-[#1a4a6b] transition-colors">
                                {{ destination.name }}
                            </h3>
                            <div class="flex items-center gap-1 text-[#7ec8e3]">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                <span class="text-xs">{{ destination.location }}</span>
                            </div>
                        </div>
                        
                        <p class="text-[#555555] text-sm leading-relaxed line-clamp-2 mb-4">
                            {{ destination.description }}
                        </p>
                        
                        <div class="flex items-center justify-between pt-3 border-t border-[#e5e7eb]">
                            <div class="flex items-center gap-2 text-xs text-[#555555]">
                                <span class="flex items-center gap-1">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                    {{ destination.bestTime }}
                                </span>
                            </div>
                            <span class="text-[#7ec8e3] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                Explore →
                            </span>
                        </div>
                    </div>
                </NuxtLink>
            </div>

            <!-- List View -->
            <div v-else class="space-y-4">
                <NuxtLink v-for="destination in filteredDestinations" :key="destination.id"
                    :to="`/destinations/${destination.slug}`"
                    class="group flex flex-col md:flex-row gap-6 bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                    
                    <div class="relative md:w-72 h-48 md:h-auto overflow-hidden">
                        <img :src="destination.heroImage" :alt="destination.name"
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden"></div>
                    </div>
                    
                    <div class="flex-1 p-6">
                        <div class="flex items-start justify-between flex-wrap gap-2 mb-3">
                            <div>
                                <div class="flex items-center gap-2 mb-1">
                                    <span class="text-sm text-[#7ec8e3] font-semibold">{{ destination.country }}</span>
                                    <span class="w-1 h-1 rounded-full bg-[#7ec8e3]"></span>
                                    <span class="text-xs text-[#555555]">{{ destination.location }}</span>
                                </div>
                                <h3 class="font-display font-bold text-[#1a1a1a] text-2xl group-hover:text-[#1a4a6b] transition-colors">
                                    {{ destination.name }}
                                </h3>
                            </div>
                            <div class="flex items-center gap-1 bg-[#f0f0f0] px-2 py-1 rounded-full">
                                <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                                <span class="text-sm font-bold">{{ destination.rating }}</span>
                            </div>
                        </div>
                        
                        <p class="text-[#555555] leading-relaxed mb-4 line-clamp-2">
                            {{ destination.description }}
                        </p>
                        
                        <div class="flex flex-wrap gap-4 text-xs text-[#555555]">
                            <div class="flex items-center gap-1">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                Best: {{ destination.bestTime }}
                            </div>
                            <div class="flex items-center gap-1">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                {{ destination.duration }}
                            </div>
                            <div class="flex items-center gap-1">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"></path>
                                </svg>
                                {{ destination.stories }} stories
                            </div>
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </section>

        <!-- ================================================================
           MAP SECTION (Interactive Visualization)
      ================================================================ -->
        <section class="bg-[#f9fafc] py-20 border-t border-[#e5e7eb]">
            <div class="px-6 md:px-12 lg:px-20">
                <div class="text-center mb-12">
                    <p class="text-[#7ec8e3] text-xs font-semibold tracking-[0.2em] uppercase mb-3 flex items-center justify-center gap-2">
                        <span class="w-8 h-px bg-[#7ec8e3]"></span> 
                        Journey Map 
                        <span class="w-8 h-px bg-[#7ec8e3]"></span>
                    </p>
                    <h2 class="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl">My Travel Footprint</h2>
                </div>

                <div class="relative rounded-2xl overflow-hidden shadow-xl">
                    <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1400&q=80" 
                         alt="World map with travel pins"
                         class="w-full h-auto object-cover" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    
                    <!-- Overlay Stats -->
                    <div class="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 bg-white/90 backdrop-blur-md rounded-xl p-4 md:p-6 max-w-md">
                        <div class="flex items-center gap-3 mb-3">
                            <div class="w-10 h-10 rounded-full bg-[#7ec8e3] flex items-center justify-center">
                                <svg class="w-5 h-5 text-[#1a1a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 class="font-display font-bold text-[#1a1a1a]">Interactive Map</h3>
                                <p class="text-xs text-[#555555]">Click on any pin to explore stories</p>
                            </div>
                        </div>
                        <p class="text-sm text-[#555555]">Explore all my adventures across {{ totalDestinations }} countries and {{ totalCities }} cities. Each destination has its own story waiting to be discovered.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ================================================================
           TRAVEL TIPS SECTION
      ================================================================ -->
        <section class="px-6 md:px-12 lg:px-20 py-20">
            <div class="text-center mb-12">
                <p class="text-[#7ec8e3] text-xs font-semibold tracking-[0.2em] uppercase mb-3 flex items-center justify-center gap-2">
                    <span class="w-8 h-px bg-[#7ec8e3]"></span> 
                    Travel Wisdom 
                    <span class="w-8 h-px bg-[#7ec8e3]"></span>
                </p>
                <h2 class="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl">Tips for Your Journey</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div v-for="tip in travelTips" :key="tip.title" 
                     class="group bg-white border border-[#e5e7eb] rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div class="w-12 h-12 rounded-full bg-[#7ec8e3]/10 flex items-center justify-center mb-4 group-hover:bg-[#7ec8e3] transition-colors">
                        <span class="text-2xl group-hover:scale-110 transition-transform">{{ tip.icon }}</span>
                    </div>
                    <h3 class="font-display font-bold text-[#1a1a1a] text-lg mb-2">{{ tip.title }}</h3>
                    <p class="text-[#555555] text-sm leading-relaxed">{{ tip.description }}</p>
                </div>
            </div>
        </section>

        <!-- Newsletter CTA and Footer are in layout -->
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// ============================================================
// SEO
// ============================================================
useHead({
    title: 'Destinations | Uncharted with Shayon',
    meta: [
        { name: 'description', content: 'Explore all the amazing destinations I\'ve visited around the world. From mountain peaks to coastal paradises, discover travel guides and stories.' },
        { name: 'keywords', content: 'travel destinations, world travel, adventure travel, places to visit, travel guide' }
    ]
})

// ============================================================
// State
// ============================================================
const searchQuery = ref('')
const activeRegion = ref('All')
const activeFilter = ref('all')
const viewMode = ref<'grid' | 'list'>('grid')

// ============================================================
// Regions Data
// ============================================================
const regions = [
    { name: 'All', image: 'https://images.unsplash.com/photo-1589519160732-57fc498494f8?w=400&q=80', count: 32 },
    { name: 'Asia', image: 'https://images.unsplash.com/photo-1535139262971-c51845709a48?w=400&q=80', count: 12 },
    { name: 'Europe', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&q=80', count: 8 },
    { name: 'Americas', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80', count: 6 },
    { name: 'Africa', image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&q=80', count: 4 },
    { name: 'Oceania', image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=400&q=80', count: 2 }
]

// ============================================================
// Filters
// ============================================================
const filters = [
    { label: 'All', value: 'all' },
    { label: '⭐ Top Rated', value: 'top' },
    { label: '🏔️ Adventure', value: 'adventure' },
    { label: '🏖️ Beach', value: 'beach' },
    { label: '🏛️ Culture', value: 'culture' },
    { label: '🌿 Nature', value: 'nature' }
]

// ============================================================
// Destinations Data
// ============================================================
const destinations = [
    {
        id: 1,
        slug: 'swiss-alps',
        name: 'Swiss Alps',
        country: 'Switzerland',
        region: 'Europe',
        location: 'Interlaken, Jungfrau Region',
        heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        description: 'Majestic peaks, crystal-clear lakes, and charming villages. A paradise for hikers and nature lovers with some of the most breathtaking views in the world.',
        rating: 4.9,
        bestTime: 'June-September',
        duration: '5-7 days',
        stories: 12,
        category: 'adventure',
        tags: ['hiking', 'mountains', 'nature']
    },
    {
        id: 2,
        slug: 'kyoto-japan',
        name: 'Kyoto',
        country: 'Japan',
        region: 'Asia',
        location: 'Kansai Region',
        heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
        description: 'Ancient temples, traditional tea houses, and stunning autumn colors. Kyoto is the cultural heart of Japan with over 1,000 years of history.',
        rating: 4.8,
        bestTime: 'March-May, October-November',
        duration: '4-6 days',
        stories: 8,
        category: 'culture',
        tags: ['temples', 'culture', 'history']
    },
    {
        id: 3,
        slug: 'maldives',
        name: 'Maldives',
        country: 'Maldives',
        region: 'Asia',
        location: 'Indian Ocean',
        heroImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
        description: 'Turquoise waters, overwater bungalows, and vibrant coral reefs. A tropical paradise perfect for relaxation and underwater adventures.',
        rating: 4.9,
        bestTime: 'November-April',
        duration: '5-7 days',
        stories: 6,
        category: 'beach',
        tags: ['beach', 'snorkeling', 'luxury']
    },
    {
        id: 4,
        slug: 'patagonia',
        name: 'Patagonia',
        country: 'Argentina/Chile',
        region: 'Americas',
        location: 'Southern Andes',
        heroImage: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=800&q=80',
        description: 'Dramatic landscapes, glaciers, and rugged mountains. One of the world\'s last great wilderness areas for serious adventurers.',
        rating: 4.9,
        bestTime: 'December-March',
        duration: '10-14 days',
        stories: 15,
        category: 'adventure',
        tags: ['trekking', 'glaciers', 'wilderness']
    },
    {
        id: 5,
        slug: 'sahara-desert',
        name: 'Sahara Desert',
        country: 'Morocco',
        region: 'Africa',
        location: 'Merzouga',
        heroImage: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80',
        description: 'Endless golden dunes, starlit nights, and Berber culture. Experience the magic of the world\'s largest hot desert.',
        rating: 4.7,
        bestTime: 'October-April',
        duration: '3-4 days',
        stories: 5,
        category: 'adventure',
        tags: ['desert', 'camping', 'culture']
    },
    {
        id: 6,
        slug: 'amazon-rainforest',
        name: 'Amazon Rainforest',
        country: 'Brazil',
        region: 'Americas',
        location: 'Amazon Basin',
        heroImage: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80',
        description: 'Unparalleled biodiversity, indigenous communities, and jungle adventures. Explore the lungs of the Earth.',
        rating: 4.8,
        bestTime: 'June-November',
        duration: '5-7 days',
        stories: 7,
        category: 'nature',
        tags: ['wildlife', 'jungle', 'eco-tourism']
    },
    {
        id: 7,
        slug: 'santorini',
        name: 'Santorini',
        country: 'Greece',
        region: 'Europe',
        location: 'Cyclades Islands',
        heroImage: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80',
        description: 'White-washed buildings, blue domes, and stunning sunsets. The quintessential Greek island experience.',
        rating: 4.8,
        bestTime: 'April-October',
        duration: '4-5 days',
        stories: 9,
        category: 'beach',
        tags: ['island', 'sunset', 'romantic']
    },
    {
        id: 8,
        slug: 'himalayas',
        name: 'Himalayas',
        country: 'Nepal',
        region: 'Asia',
        location: 'Khumbu Region',
        heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
        description: 'Home to the world\'s highest peaks, including Everest. A spiritual and physical journey like no other.',
        rating: 4.9,
        bestTime: 'March-May, September-November',
        duration: '14-21 days',
        stories: 18,
        category: 'adventure',
        tags: ['trekking', 'mountains', 'spiritual']
    },
    {
        id: 9,
        slug: 'banff-national-park',
        name: 'Banff National Park',
        country: 'Canada',
        region: 'Americas',
        location: 'Alberta',
        heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        description: 'Turquoise lakes, majestic mountains, and abundant wildlife. Canada\'s oldest and most beautiful national park.',
        rating: 4.9,
        bestTime: 'June-September',
        duration: '5-7 days',
        stories: 11,
        category: 'nature',
        tags: ['national park', 'lakes', 'hiking']
    },
    {
        id: 10,
        slug: 'bali',
        name: 'Bali',
        country: 'Indonesia',
        region: 'Asia',
        location: 'Lesser Sunda Islands',
        heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
        description: 'Rice terraces, spiritual temples, and world-class surfing. The Island of the Gods offers something for everyone.',
        rating: 4.7,
        bestTime: 'April-October',
        duration: '7-10 days',
        stories: 14,
        category: 'beach',
        tags: ['culture', 'surfing', 'yoga']
    },
    {
        id: 11,
        slug: 'dolomites',
        name: 'Dolomites',
        country: 'Italy',
        region: 'Europe',
        location: 'Northern Italy',
        heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        description: 'Dramatic limestone peaks, charming villages, and world-class skiing. A UNESCO World Heritage site.',
        rating: 4.8,
        bestTime: 'June-September, December-March',
        duration: '5-7 days',
        stories: 8,
        category: 'adventure',
        tags: ['mountains', 'skiing', 'hiking']
    },
    {
        id: 12,
        slug: 'new-zealand-south-island',
        name: 'South Island',
        country: 'New Zealand',
        region: 'Oceania',
        location: 'New Zealand',
        heroImage: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=80',
        description: 'Fiords, glaciers, and adventure sports. A playground for outdoor enthusiasts with stunning natural beauty.',
        rating: 4.9,
        bestTime: 'December-February',
        duration: '10-14 days',
        stories: 16,
        category: 'adventure',
        tags: ['adventure', 'nature', 'road trip']
    }
]

// ============================================================
// Travel Tips
// ============================================================
const travelTips = [
    {
        icon: '🎒',
        title: 'Pack Light, Travel Smart',
        description: 'Bring versatile clothing and essential gear. You\'ll thank yourself when navigating trains and cobblestone streets.'
    },
    {
        icon: '📸',
        title: 'Capture Memories',
        description: 'Take photos, but don\'t forget to experience the moment. Sometimes the best memories are the ones without a lens.'
    },
    {
        icon: '🍜',
        title: 'Eat Like a Local',
        description: 'Venture beyond tourist restaurants. Local markets and street food often offer the most authentic culinary experiences.'
    }
]

// ============================================================
// Computed Properties
// ============================================================
const totalDestinations = computed(() => destinations.length)
const totalCities = computed(() => destinations.length)

const filteredDestinations = computed(() => {
    let filtered = destinations

    // Filter by region
    if (activeRegion.value !== 'All') {
        filtered = filtered.filter(d => d.region === activeRegion.value)
    }

    // Filter by search query
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(d => 
            d.name.toLowerCase().includes(query) ||
            d.country.toLowerCase().includes(query) ||
            d.location.toLowerCase().includes(query)
        )
    }

    // Filter by category
    if (activeFilter.value !== 'all') {
        filtered = filtered.filter(d => d.category === activeFilter.value)
    }

    // Sort by rating for top rated
    if (activeFilter.value === 'top') {
        filtered = [...filtered].sort((a, b) => b.rating - a.rating)
    }

    return filtered
})
</script>

<style scoped lang="scss">
.stat-card {
    position: relative;
    transition: transform 0.3s ease;
    
    &:hover {
        transform: translateY(-5px);
    }
}

.scrollbar-hide {
    scrollbar-width: none;
    -ms-overflow-style: none;
    
    &::-webkit-scrollbar {
        display: none;
    }
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>