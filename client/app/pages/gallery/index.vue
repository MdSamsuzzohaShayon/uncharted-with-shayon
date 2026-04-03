<template>
    <div class="w-full">
        <!-- ================================================================
           GALLERY HERO SECTION
      ================================================================ -->
        <header>
            <section class="relative min-h-[60vh] flex flex-col overflow-hidden" aria-label="Gallery header">
                <!-- Background image -->
                <div class="absolute inset-0 z-0" aria-hidden="true">
                    <div class="absolute inset-0 bg-gradient-to-br from-[#1a1a1a]/85 via-[#1a4a6b]/70 to-[#0f2a3f]/80 z-10"></div>
                    <div class="w-full h-full bg-cover bg-center"
                         style="background-image: url('https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&q=80')">
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#f9fafc] to-transparent z-20"></div>
                </div>

                <Navbar />

                <main class="flex-1 flex items-center px-6 md:px-12 lg:px-20 py-20 relative z-20">
                    <div class="w-full text-center">
                        <div class="inline-flex items-center gap-3 bg-white/15 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/20">
                            <span class="text-3xl">📸</span>
                            <span class="text-[#7ec8e3] text-sm font-semibold tracking-[0.2em] uppercase">Visual Stories</span>
                        </div>
                        <h1 class="font-display font-black text-white text-6xl md:text-7xl lg:text-8xl mb-6 leading-none">
                            Photo Journal
                        </h1>
                        <div class="w-24 h-1 bg-[#7ec8e3] mx-auto mb-6 rounded-full"></div>
                        <p class="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            A collection of breathtaking moments, raw landscapes, and unforgettable memories from around the world.
                        </p>
                        <div class="mt-10 flex items-center justify-center gap-6 text-white/60 text-sm">
                            <div class="flex items-center gap-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                <span>{{ totalPhotos }} Photos</span>
                            </div>
                            <div class="w-1 h-1 bg-[#7ec8e3] rounded-full"></div>
                            <div class="flex items-center gap-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"></path>
                                </svg>
                                <span>{{ totalDestinations }} Destinations</span>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </header>

        <!-- ================================================================
           FILTER BAR
      ================================================================ -->
        <div class="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#e5e7eb]">
            <div class="px-6 md:px-12 lg:px-20 py-4">
                <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <!-- Category Filter -->
                    <div class="flex gap-2 overflow-x-auto scrollbar-hide pb-2 md:pb-0">
                        <button v-for="category in categories" :key="category.value"
                            @click="activeCategory = category.value"
                            :class="[
                                'px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300',
                                activeCategory === category.value
                                    ? 'bg-[#1a4a6b] text-white shadow-lg shadow-[#1a4a6b]/20'
                                    : 'bg-[#f0f0f0] text-[#555555] hover:bg-[#e5e7eb]'
                            ]">
                            <span class="flex items-center gap-2">
                                <span>{{ category.icon }}</span>
                                <span>{{ category.label }}</span>
                                <span class="text-xs opacity-75">{{ getCategoryCount(category.value) }}</span>
                            </span>
                        </button>
                    </div>

                    <!-- View Toggle -->
                    <div class="flex gap-2">
                        <button @click="viewMode = 'grid'" 
                            :class="['p-2 rounded-lg transition-all duration-300', viewMode === 'grid' ? 'bg-[#7ec8e3] text-white' : 'bg-[#f0f0f0] text-[#555555] hover:bg-[#e5e7eb]']">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                            </svg>
                        </button>
                        <button @click="viewMode = 'masonry'" 
                            :class="['p-2 rounded-lg transition-all duration-300', viewMode === 'masonry' ? 'bg-[#7ec8e3] text-white' : 'bg-[#f0f0f0] text-[#555555] hover:bg-[#e5e7eb]']">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h2a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h2a1 1 0 011 1v14a1 1 0 01-1 1h-2a1 1 0 01-1-1V5z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- ================================================================
           GRID VIEW
      ================================================================ -->
        <section v-if="viewMode === 'grid'" class="px-6 md:px-12 lg:px-20 py-16">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div v-for="(photo, index) in filteredPhotos" :key="photo.id"
                     class="gallery-item group relative rounded-2xl overflow-hidden cursor-pointer bg-white border border-[#e5e7eb] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                     @click="openLightbox(index)">
                    
                    <!-- Image -->
                    <div class="relative aspect-square overflow-hidden">
                        <img :src="photo.image" :alt="photo.title"
                             class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                             loading="lazy" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <!-- Category Badge -->
                        <div class="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
                            <span class="bg-[#7ec8e3] text-[#1a1a1a] text-xs font-bold px-3 py-1.5 rounded-full">
                                {{ photo.category }}
                            </span>
                        </div>
                        
                        <!-- Overlay Icon -->
                        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div class="bg-white/90 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                                <svg class="w-6 h-6 text-[#1a4a6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Info -->
                    <div class="p-4">
                        <h3 class="font-display font-bold text-[#1a1a1a] text-base mb-1 line-clamp-1">{{ photo.title }}</h3>
                        <div class="flex items-center justify-between text-xs text-[#555555]">
                            <span class="flex items-center gap-1">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                {{ photo.location }}
                            </span>
                            <span>{{ photo.date }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ================================================================
           MASONRY VIEW
      ================================================================ -->
        <section v-else class="px-6 md:px-12 lg:px-20 py-16">
            <div class="masonry-grid">
                <div v-for="(photo, index) in filteredPhotos" :key="photo.id"
                     class="masonry-item group relative rounded-2xl overflow-hidden cursor-pointer bg-white border border-[#e5e7eb] shadow-sm hover:shadow-2xl transition-all duration-500"
                     :class="{ 'masonry-item-large': photo.featured }"
                     @click="openLightbox(index)">
                    
                    <!-- Image -->
                    <div class="relative overflow-hidden">
                        <img :src="photo.image" :alt="photo.title"
                             class="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                             loading="lazy" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <!-- Overlay Content -->
                        <div class="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                            <div class="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <span class="bg-[#7ec8e3] text-[#1a1a1a] text-xs font-bold px-3 py-1.5 rounded-full mb-2 inline-block">
                                    {{ photo.category }}
                                </span>
                                <h3 class="text-white font-display font-bold text-xl mb-1">{{ photo.title }}</h3>
                                <p class="text-white/80 text-sm">{{ photo.location }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ================================================================
           LIGHTBOX MODAL
      ================================================================ -->
        <div v-if="lightboxOpen" class="lightbox-modal" @click="closeLightbox">
            <div class="lightbox-content" @click.stop>
                <button class="lightbox-close" @click="closeLightbox">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                
                <button v-if="lightboxIndex > 0" class="lightbox-nav lightbox-nav-prev" @click="prevImage">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>
                
                <img :src="filteredPhotos[lightboxIndex]?.image" 
                     :alt="filteredPhotos[lightboxIndex]?.title"
                     class="lightbox-image" />
                
                <button v-if="lightboxIndex < filteredPhotos.length - 1" class="lightbox-nav lightbox-nav-next" @click="nextImage">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
                
                <div class="lightbox-info">
                    <h3 class="text-white font-display font-bold text-xl mb-1">{{ filteredPhotos[lightboxIndex]?.title }}</h3>
                    <p class="text-white/80 text-sm">{{ filteredPhotos[lightboxIndex]?.location }}</p>
                    <p class="text-white/60 text-xs mt-2">{{ filteredPhotos[lightboxIndex]?.date }} • {{ filteredPhotos[lightboxIndex]?.category }}</p>
                </div>
            </div>
        </div>

        <!-- ================================================================
           STATS SECTION
      ================================================================ -->
        <section class="bg-gradient-to-br from-[#1a1a1a] to-[#1a4a6b] py-20 mt-12">
            <div class="px-6 md:px-12 lg:px-20">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div class="stat-card">
                        <div class="text-5xl md:text-6xl font-display font-bold text-[#7ec8e3] mb-3">{{ totalPhotos }}</div>
                        <p class="text-white/70 text-sm uppercase tracking-wider">Moments Captured</p>
                    </div>
                    <div class="stat-card">
                        <div class="text-5xl md:text-6xl font-display font-bold text-[#7ec8e3] mb-3">{{ totalDestinations }}</div>
                        <p class="text-white/70 text-sm uppercase tracking-wider">Destinations</p>
                    </div>
                    <div class="stat-card">
                        <div class="text-5xl md:text-6xl font-display font-bold text-[#7ec8e3] mb-3">{{ totalYears }}</div>
                        <p class="text-white/70 text-sm uppercase tracking-wider">Years of Travel</p>
                    </div>
                    <div class="stat-card">
                        <div class="text-5xl md:text-6xl font-display font-bold text-[#7ec8e3] mb-3">{{ totalLikes }}+</div>
                        <p class="text-white/70 text-sm uppercase tracking-wider">Photo Likes</p>
                    </div>
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
    title: 'Photo Journal | Uncharted with Shayon',
    meta: [
        { name: 'description', content: 'A visual journey through breathtaking landscapes, cultural moments, and unforgettable adventures from around the world.' },
        { name: 'keywords', content: 'travel photography, photo gallery, travel photos, adventure photography, landscape photography' }
    ]
})

// ============================================================
// State
// ============================================================
const activeCategory = ref('all')
const viewMode = ref<'grid' | 'masonry'>('grid')
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

// ============================================================
// Categories
// ============================================================
const categories = [
    { value: 'all', label: 'All Photos', icon: '📷' },
    { value: 'landscape', label: 'Landscape', icon: '🏔️' },
    { value: 'culture', label: 'Culture', icon: '🏛️' },
    { value: 'adventure', label: 'Adventure', icon: '🥾' },
    { value: 'wildlife', label: 'Wildlife', icon: '🦁' },
    { value: 'street', label: 'Street', icon: '🚶' },
    { value: 'sunset', label: 'Sunset', icon: '🌅' }
]

// ============================================================
// Gallery Data
// ============================================================
const galleryPhotos = [
    // Landscape Photos
    {
        id: 1,
        title: 'Golden Hour in the Swiss Alps',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        location: 'Interlaken, Switzerland',
        category: 'landscape',
        date: 'Aug 15, 2024',
        featured: true,
        likes: 234
    },
    {
        id: 2,
        title: 'Misty Morning in Patagonia',
        image: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=800&q=80',
        location: 'Torres del Paine, Chile',
        category: 'landscape',
        date: 'Mar 10, 2024',
        featured: false,
        likes: 189
    },
    {
        id: 3,
        title: 'Himalayan Majesty',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
        location: 'Annapurna, Nepal',
        category: 'landscape',
        date: 'Oct 22, 2024',
        featured: true,
        likes: 456
    },
    {
        id: 4,
        title: 'Aurora Over Iceland',
        image: 'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=800&q=80',
        location: 'Reykjavik, Iceland',
        category: 'landscape',
        date: 'Dec 05, 2024',
        featured: false,
        likes: 567
    },
    
    // Culture Photos
    {
        id: 5,
        title: 'Kyoto Temple in Autumn',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
        location: 'Kyoto, Japan',
        category: 'culture',
        date: 'Nov 10, 2024',
        featured: true,
        likes: 342
    },
    {
        id: 6,
        title: 'Santorini Blue Domes',
        image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80',
        location: 'Santorini, Greece',
        category: 'culture',
        date: 'Jul 18, 2024',
        featured: false,
        likes: 278
    },
    {
        id: 7,
        title: 'Machu Picchu Sunrise',
        image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80',
        location: 'Cusco, Peru',
        category: 'culture',
        date: 'May 05, 2024',
        featured: false,
        likes: 423
    },
    
    // Adventure Photos
    {
        id: 8,
        title: 'Kayaking Through Fjords',
        image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=80',
        location: 'Milford Sound, NZ',
        category: 'adventure',
        date: 'Feb 28, 2024',
        featured: true,
        likes: 198
    },
    {
        id: 9,
        title: 'Desert Safari in Sahara',
        image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80',
        location: 'Merzouga, Morocco',
        category: 'adventure',
        date: 'Apr 12, 2024',
        featured: false,
        likes: 267
    },
    {
        id: 10,
        title: 'Camping Under Stars',
        image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
        location: 'Banff, Canada',
        category: 'adventure',
        date: 'Sep 03, 2024',
        featured: false,
        likes: 312
    },
    
    // Wildlife Photos
    {
        id: 11,
        title: 'Elephants in the Wild',
        image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80',
        location: 'Amboseli, Kenya',
        category: 'wildlife',
        date: 'Jun 20, 2024',
        featured: true,
        likes: 289
    },
    {
        id: 12,
        title: 'Mountain Gorilla Encounter',
        image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80',
        location: 'Bwindi, Uganda',
        category: 'wildlife',
        date: 'Jan 15, 2024',
        featured: false,
        likes: 234
    },
    
    // Street Photos
    {
        id: 13,
        title: 'Venice Canals at Dusk',
        image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80',
        location: 'Venice, Italy',
        category: 'street',
        date: 'Oct 05, 2024',
        featured: false,
        likes: 156
    },
    {
        id: 14,
        title: 'Bali Rice Terraces',
        image: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800&q=80',
        location: 'Ubud, Bali',
        category: 'street',
        date: 'Mar 25, 2024',
        featured: true,
        likes: 345
    },
    
    // Sunset Photos
    {
        id: 15,
        title: 'Maldives Sunset',
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
        location: 'Maldives',
        category: 'sunset',
        date: 'Dec 20, 2024',
        featured: true,
        likes: 678
    },
    {
        id: 16,
        title: 'African Savannah Sunset',
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
        location: 'Serengeti, Tanzania',
        category: 'sunset',
        date: 'Jul 30, 2024',
        featured: false,
        likes: 423
    },
    {
        id: 17,
        title: 'Dolomites Golden Hour',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        location: 'Italian Alps',
        category: 'sunset',
        date: 'Sep 15, 2024',
        featured: false,
        likes: 289
    },
    {
        id: 18,
        title: 'Beach Paradise Sunset',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
        location: 'Phi Phi Islands, Thailand',
        category: 'sunset',
        date: 'Feb 10, 2024',
        featured: false,
        likes: 234
    }
]

// ============================================================
// Computed Properties
// ============================================================
const filteredPhotos = computed(() => {
    if (activeCategory.value === 'all') {
        return galleryPhotos
    }
    return galleryPhotos.filter(photo => photo.category === activeCategory.value)
})

const totalPhotos = computed(() => galleryPhotos.length)
const totalDestinations = computed(() => {
    const uniqueLocations = new Set(galleryPhotos.map(p => p.location.split(',')[0]))
    return uniqueLocations.size
})
const totalYears = 5
const totalLikes = computed(() => {
    return galleryPhotos.reduce((sum, photo) => sum + (photo.likes || 0), 0)
})

const getCategoryCount = (categoryValue: string) => {
    if (categoryValue === 'all') return galleryPhotos.length
    return galleryPhotos.filter(p => p.category === categoryValue).length
}

// ============================================================
// Lightbox Functions
// ============================================================
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
    if (lightboxIndex.value < filteredPhotos.value.length - 1) {
        lightboxIndex.value++
    }
}
</script>

<style scoped lang="scss">
@use "~/assets/scss/gallery.scss";
</style>