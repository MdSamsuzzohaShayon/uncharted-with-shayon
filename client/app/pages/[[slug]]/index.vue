<template>
    <div class="single-article min-h-screen bg-[#f9fafc] font-body overflow-x-hidden">
        <!-- Loading State -->
        <div v-if="pending" class="loading-state fixed inset-0 z-50 bg-[#f9fafc] flex items-center justify-center">
            <div class="text-center">
                <div class="loading-spinner mx-auto mb-6"></div>
                <p class="text-[#1a4a6b] font-medium animate-pulse">Loading your adventure...</p>
            </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="flex items-center justify-center min-h-screen px-6">
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

        <!-- Article Content -->
        <article v-else-if="article" class="article-container">
            <!-- Hero Section with Parallax Effect -->
            <header class="article-hero relative min-h-[90vh] flex flex-col overflow-hidden">
                <div class="absolute inset-0 z-0">
                    <div class="absolute inset-0 bg-black/50 z-10"></div>
                    <img :src="article.og_image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=85'"
                        :alt="article.title" 
                        class="article-hero-image w-full h-full object-cover transform scale-105"
                        fetchpriority="high">
                    <div class="absolute inset-0 bg-gradient-to-t from-[#f9fafc] via-[#1a4a6b]/30 to-transparent z-20"></div>
                </div>


                <!-- Hero Content -->
                <div class="relative z-20 flex-1 flex items-center justify-center px-6 md:px-12 lg:px-20 pb-32 pt-20">
                    <div class="hero-content max-w-4xl mx-auto text-center">
                        <div class="hero-meta inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-2 mb-8">
                            <time :datetime="article.published_date" class="text-white text-sm flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                {{ formatDate(article.published_date) }}
                            </time>
                            <span class="w-1 h-1 rounded-full bg-white/60"></span>
                            <span class="text-white text-sm flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                </svg>
                                {{ formatNumber(article.views) }} views
                            </span>
                        </div>
                        <h1 class="hero-title font-display font-black text-white text-5xl md:text-7xl lg:text-8xl leading-tight mb-6">
                            {{ article.title }}
                        </h1>
                        <p class="hero-description text-white/90 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
                            {{ article.description }}
                        </p>
                        <div class="hero-scroll-indicator mt-16">
                            <div class="w-6 h-10 border-2 border-white/40 rounded-full mx-auto flex justify-center">
                                <div class="w-1 h-2 bg-white/60 rounded-full mt-2 animate-bounce"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Article Content Section - Redesigned -->
            <div class="article-content-wrapper relative -mt-20 z-20 px-6 md:px-12 lg:px-20 pb-20">
                <div class="max-w-7xl mx-auto">
                    <!-- Floating Info Cards -->
                    <div class="info-cards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        <div class="info-card group bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                            <div class="info-icon w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7ec8e3]/20 to-[#1a4a6b]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <svg class="w-7 h-7 text-[#1a4a6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </div>
                            <p class="text-xs text-[#7ec8e3] font-semibold uppercase tracking-wider mb-2">Location</p>
                            <p class="text-base font-bold text-[#1a1a1a]">{{ article.location }}</p>
                        </div>

                        <div v-if="article.travel_cost" class="info-card group bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                            <div class="info-icon w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7ec8e3]/20 to-[#1a4a6b]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <svg class="w-7 h-7 text-[#1a4a6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <p class="text-xs text-[#7ec8e3] font-semibold uppercase tracking-wider mb-2">Travel Cost</p>
                            <p class="text-base font-bold text-[#1a1a1a]">{{ article.travel_cost }}</p>
                        </div>

                        <div v-if="article.best_time" class="info-card group bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                            <div class="info-icon w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7ec8e3]/20 to-[#1a4a6b]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <svg class="w-7 h-7 text-[#1a4a6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <p class="text-xs text-[#7ec8e3] font-semibold uppercase tracking-wider mb-2">Best Time to Visit</p>
                            <p class="text-base font-bold text-[#1a1a1a]">{{ article.best_time }}</p>
                        </div>

                        <div class="info-card group bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                            <div class="info-icon w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7ec8e3]/20 to-[#1a4a6b]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <svg class="w-7 h-7 text-[#1a4a6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <p class="text-xs text-[#7ec8e3] font-semibold uppercase tracking-wider mb-2">Reading Time</p>
                            <p class="text-base font-bold text-[#1a1a1a]">{{ calculateReadingTime(article.description) }} min</p>
                        </div>
                    </div>

                    <!-- YouTube Video Section with Enhanced Design -->
                    <div v-if="article?.youtube_url" class="video-section mb-20">
                        <div class="relative rounded-3xl overflow-hidden shadow-2xl group">
                            <div class="absolute inset-0 bg-gradient-to-tr from-[#1a4a6b]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                            <div class="video-wrapper relative" style="padding-bottom: 56.25%;">
                                <iframe :src="getYouTubeEmbedUrl(article.youtube_url)"
                                    class="absolute inset-0 w-full h-full"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen 
                                    loading="lazy" 
                                    :title="`Video: ${article.title}`">
                                </iframe>
                            </div>
                        </div>
                    </div>

                    <!-- Description Section with Beautiful Typography -->
                    <div class="description-section mb-20">
                        <div class="bg-white rounded-3xl shadow-xl overflow-hidden">
                            <div class="h-2 bg-gradient-to-r from-[#7ec8e3] to-[#1a4a6b]"></div>
                            <div class="p-8 md:p-12">
                                <div class="flex items-center gap-3 mb-8">
                                    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7ec8e3] to-[#1a4a6b] flex items-center justify-center">
                                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"></path>
                                        </svg>
                                    </div>
                                    <h2 class="font-display font-bold text-3xl md:text-4xl text-[#1a1a1a]">Journey Details</h2>
                                </div>
                                <div class="prose prose-lg max-w-none">
                                    <p class="text-[#555555] leading-relaxed text-lg first-letter:text-5xl first-letter:font-bold first-letter:text-[#7ec8e3] first-letter:mr-3 first-letter:float-left">
                                        {{ article.description }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Stunning Gallery Section with Masonry Layout -->
                    <div class="gallery-section mb-20">
                        <div class="text-center mb-12">
                            <div class="inline-flex items-center gap-3 bg-gradient-to-r from-[#7ec8e3]/10 to-[#1a4a6b]/10 rounded-full px-6 py-2 mb-4">
                                <div class="w-2 h-2 rounded-full bg-[#7ec8e3] animate-pulse"></div>
                                <span class="text-xs font-semibold tracking-wider text-[#1a4a6b] uppercase">Visual Story</span>
                            </div>
                            <h2 class="font-display font-bold text-4xl md:text-5xl text-[#1a1a1a] mb-4">Photo Gallery</h2>
                            <p class="text-[#555555] max-w-2xl mx-auto">Experience the journey through these captivating moments</p>
                        </div>
                        
                        <div class="gallery-masonry">
                            <div class="gallery-grid columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                                <div v-for="(image, index) in galleryImages" :key="index"
                                    class="gallery-item break-inside-avoid relative rounded-2xl overflow-hidden cursor-pointer group transform hover:-translate-y-2 transition-all duration-500"
                                    @click="openLightbox(index)">
                                    <div class="relative overflow-hidden rounded-2xl shadow-lg">
                                        <img :src="image" 
                                            :alt="`${article.title} - Gallery image ${index + 1}`"
                                            class="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                                            loading="lazy">
                                        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                            <div class="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                <div class="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-all">
                                                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <p class="text-white text-sm font-medium">View image {{ index + 1 }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Map Section with Fixed Geoapify Integration -->
                    <div v-if="article.map_lat && article.map_lng" class="map-section mb-20">
                        <div class="text-center mb-12">
                            <div class="inline-flex items-center gap-3 bg-gradient-to-r from-[#7ec8e3]/10 to-[#1a4a6b]/10 rounded-full px-6 py-2 mb-4">
                                <svg class="w-4 h-4 text-[#7ec8e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                <span class="text-xs font-semibold tracking-wider text-[#1a4a6b] uppercase">Explore Location</span>
                            </div>
                            <h2 class="font-display font-bold text-4xl md:text-5xl text-[#1a1a1a] mb-4">Journey Map</h2>
                            <p class="text-[#555555] max-w-2xl mx-auto">Discover exactly where this adventure took place</p>
                        </div>
                        <div class="map-container rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                            <ClientOnly>
                                <div ref="mapContainer" class="w-full h-[500px] bg-[#e5e7eb]"></div>
                                <template #fallback>
                                    <div class="w-full h-[500px] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                        <div class="text-center">
                                            <div class="loading-spinner-small mx-auto mb-4"></div>
                                            <p class="text-[#555555]">Loading interactive map...</p>
                                        </div>
                                    </div>
                                </template>
                            </ClientOnly>
                        </div>
                    </div>

                    <!-- Share Section with Social Links -->
                    <div class="share-section bg-gradient-to-r from-[#7ec8e3]/5 to-[#1a4a6b]/5 rounded-3xl p-8 md:p-12 text-center">
                        <p class="text-[#1a4a6b] text-sm font-semibold uppercase tracking-wider mb-4">Share the Inspiration</p>
                        <div class="flex gap-4 justify-center flex-wrap">
                            <button @click="shareOnTwitter" class="share-btn group relative w-12 h-12 rounded-full bg-[#1da1f2] text-white flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-xl">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.677-11.855c0-.21-.005-.423-.015-.635A9.936 9.936 0 0024 4.59z"></path>
                                </svg>
                            </button>
                            <button @click="shareOnFacebook" class="share-btn group relative w-12 h-12 rounded-full bg-[#4267B2] text-white flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-xl">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                                </svg>
                            </button>
                            <button @click="copyToClipboard" class="share-btn group relative w-12 h-12 rounded-full bg-gradient-to-r from-[#7ec8e3] to-[#1a4a6b] text-white flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-xl">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </article>

        <!-- Enhanced Lightbox Modal -->
        <Teleport to="body">
            <Transition name="lightbox-fade">
                <div v-if="lightboxOpen" class="lightbox fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center" @click="closeLightbox">
                    <div class="relative max-w-7xl mx-4" @click.stop>
                        <img :src="galleryImages[lightboxIndex]" alt="Gallery image" class="w-full h-auto max-h-[90vh] object-contain rounded-2xl shadow-2xl">
                        
                        <!-- Navigation Buttons -->
                        <button @click="closeLightbox" class="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-300 backdrop-blur-sm">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        
                        <button v-if="lightboxIndex > 0" @click="previousImage" class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-300 backdrop-blur-sm">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                            </svg>
                        </button>
                        
                        <button v-if="lightboxIndex < galleryImages.length - 1" @click="nextImage" class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-300 backdrop-blur-sm">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </button>
                        
                        <!-- Image Counter -->
                        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
                            <span class="text-white text-sm">{{ lightboxIndex + 1 }} / {{ galleryImages.length }}</span>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script setup lang="ts">


// ============================================================
// Props & Route
// ============================================================

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const config = useRuntimeConfig()

// ============================================================
// Data Fetching with useAsyncData
// ============================================================

const { data: article, pending, error } = await useAsyncData<IArticle>(
    `article-${slug.value}`,
    async () => {
        const response = await $fetch<{ data: IArticle[] }>(
            `${config.public.backendApi}/api/articles`,
            {
                params: {
                    'filters[slug][$eq]': slug.value,
                    populate: '*',
                },
            }
        )

        const articleData = response?.data?.[0]

        if (!articleData) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Article not found',
                message: 'The requested adventure article could not be found.',
            })
        }

        return articleData
    },
    {
        lazy: false,
        server: true,
        dedupe: 'defer'
    }
)

// ============================================================
// SEO Configuration
// ============================================================

useSeoMeta({
    title: () => article.value?.meta_title || article.value?.title || 'Travel Article',
    description: () => article.value?.meta_description || article.value?.description || 'Explore amazing travel destinations and adventures',
    ogTitle: () => article.value?.meta_title || article.value?.title,
    ogDescription: () => article.value?.meta_description || article.value?.description,
    ogImage: () => article.value?.og_image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    ogType: 'article',
    twitterCard: 'summary_large_image',
    twitterTitle: () => article.value?.title,
    twitterDescription: () => article.value?.description,
    twitterImage: () => article.value?.og_image
})

useHead(() => ({
    title: article.value?.meta_title || article.value?.title || 'Travel Article',
    meta: [
        { name: 'description', content: article.value?.meta_description || article.value?.description },
        { property: 'og:title', content: article.value?.meta_title || article.value?.title },
        { property: 'og:description', content: article.value?.meta_description || article.value?.description },
        { property: 'og:image', content: article.value?.og_image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80' },
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: article.value?.canonical_url || `https://uncharted.webdevlab.org/articles/${slug.value}` },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: article.value?.title },
        { name: 'twitter:description', content: article.value?.description },
        { name: 'twitter:image', content: article.value?.og_image },
        { name: 'article:published_time', content: article.value?.published_date },
        { name: 'author', content: 'Shayon' }
    ],
    link: [
        {
            rel: 'canonical',
            href: article.value?.canonical_url || `https://uncharted.webdevlab.org/articles/${slug.value}`
        }
    ],
    script: [
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Article',
                headline: article.value?.title,
                description: article.value?.description,
                datePublished: article.value?.published_date,
                dateModified: article.value?.published_date,
                author: {
                    '@type': 'Person',
                    name: 'Shayon',
                    url: 'https://uncharted.webdevlab.org/about'
                },
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': article.value?.canonical_url || `https://uncharted.webdevlab.org/articles/${slug.value}`
                }
            })
        }
    ]
}))

// ============================================================
// Gallery Images
// ============================================================

const galleryImages = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",      // ocean / sea
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&q=80",      // mountains
  "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=600&q=80",      // forest trail
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80",      // desert road
  "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?w=600&q=80",      // city skyline
  "https://images.unsplash.com/photo-1558673810-9b0b6316d4f4?w=600&q=80",      // waterfall
  "https://images.unsplash.com/photo-1483721310020-03333e577078?w=600&q=80",      // beach sunset
  "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=600&q=80"       // snow landscape
];
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

const nextImage = () => {
    if (lightboxIndex.value < galleryImages.length - 1) {
        lightboxIndex.value++
    }
}

const previousImage = () => {
    if (lightboxIndex.value > 0) {
        lightboxIndex.value--
    }
}

// ============================================================
// Map Integration (Fixed)
// ============================================================

const mapContainer = ref<HTMLElement | null>(null)
let mapInstance: any = null
let mapScriptLoaded = false

onMounted(async () => {
    if (article.value?.map_lat && article.value?.map_lng && mapContainer.value) {
        await loadMapAndInitialize()
    }
})

const loadMapAndInitialize = async () => {
    return new Promise((resolve) => {
        if (mapScriptLoaded) {
            initMap()
            resolve(true)
            return
        }
        
        const script = document.createElement('script')
        script.src = `https://maps.geoapify.com/v1/js/api.js?api_key=${config.public.geoapifyApiKey}`
        script.async = true
        script.defer = true
        
        script.onload = () => {
            mapScriptLoaded = true
            initMap()
            resolve(true)
        }
        
        script.onerror = () => {
            console.error('Failed to load Geoapify map')
            resolve(false)
        }
        
        document.head.appendChild(script)
    })
}

const initMap = () => {
    if (!mapContainer.value || !article.value?.map_lat || !article.value?.map_lng) return
    
    // Wait for Geoapify to be available
    const checkGeoapify = setInterval(() => {
        // if (window.geoapify) {
        //     clearInterval(checkGeoapify)
            
        //     try {
        //         const geoapify = window.geoapify
                
        //         mapInstance = new geoapify.Map(mapContainer.value, {
        //             center: [article.value!.map_lng, article.value!.map_lat],
        //             zoom: 12,
        //             style: 'osm-carto'
        //         })
                
        //         // Add marker
        //         new geoapify.Marker({
        //             position: [article.value!.map_lng, article.value!.map_lat],
        //             map: mapInstance,
        //             draggable: false
        //         }).setPopup({
        //             content: `<div class="p-2"><strong>${article.value?.location}</strong><br/>${article.value?.title}</div>`
        //         })
        //     } catch (error) {
        //         console.error('Error initializing map:', error)
        //     }
        // }
    }, 100)
    
    // Timeout after 10 seconds
    setTimeout(() => clearInterval(checkGeoapify), 10000)
}

// ============================================================
// Utility Functions
// ============================================================

const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
}

const calculateReadingTime = (text: string): number => {
    const wordsPerMinute = 200
    const wordCount = text.split(/\s+/).length
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}

const getYouTubeEmbedUrl = (url: string): string => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)?.[1]
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1` : url
}

// ============================================================
// Share Functions
// ============================================================

const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(`Check out this amazing travel article: ${article.value?.title}`)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'width=600,height=400')
}

const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400')
}

const copyToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(window.location.href)
        const toast = document.createElement('div')
        toast.className = 'fixed bottom-6 right-6 bg-gradient-to-r from-[#1a4a6b] to-[#0f2a3f] text-white px-6 py-3 rounded-full shadow-2xl z-50 animate-slide-up'
        toast.innerHTML = '<div class="flex items-center gap-2"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg><span>Link copied to clipboard!</span></div>'
        document.body.appendChild(toast)
        setTimeout(() => {
            toast.style.opacity = '0'
            setTimeout(() => toast.remove(), 300)
        }, 3000)
    } catch (err) {
        console.error('Failed to copy:', err)
    }
}
</script>

<style scoped>
@use "~/assets/scss/single-article.scss";
</style>


<!-- hero -> beautiful background with featured image, overlay location, views, date,  travel cost, best time to visit, reading time, author detail
section -> In the left, description. On the right, featured articles, youtube url, social share, category (sticky right side). 
section -> A beautiful gallery, very interactive 
section -> 2 cards for previous article, net article 
section -> map 
section -> Display all comments (use dummy comments) -->