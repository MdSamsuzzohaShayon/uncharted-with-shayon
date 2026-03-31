<template>
    <div class="single-article min-h-screen bg-[#f9fafc] font-body overflow-x-hidden">
        <!-- Loading State -->
        <Loader v-if="pending" />
        <Error v-else-if="error" v-bind:error="error" />

        <!-- Article Content -->
        <article v-else-if="article" class="article-container">
            
            <!-- Premium Reading Progress Bar -->
            <div class="reading-progress-bar fixed top-0 left-0 right-0 h-1.5 z-50">
                <div class="h-full bg-gradient-to-r from-[#7ec8e3] via-[#1a4a6b] to-[#7ec8e3] transition-all duration-100 relative" :style="{ width: `${readingProgress * 100}%` }">
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-[#7ec8e3] shadow-lg"></div>
                </div>
            </div>

            <!-- Hero Section - Cinematic Experience -->
            <header class="hero-section relative min-h-screen overflow-hidden">
                
                <!-- Background Layers with Parallax -->
                <div class="hero-bg absolute inset-0 z-0">
                    <div class="absolute inset-0 overflow-hidden">
                        <!-- Main Background Image -->
                        <img 
                            :src="heroBackgroundImage"
                            :alt="article.title"
                            class="hero-image w-full h-full object-cover"
                            ref="heroImage"
                            fetchpriority="high"
                        >
                        
                        <!-- Gradient Overlays for Depth -->
                        <div class="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-transparent"></div>
                        <div class="absolute inset-0 bg-gradient-to-t from-[#f9fafc] via-transparent to-transparent"></div>
                        <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>
                    </div>
                </div>

                <!-- Animated Particle Field -->
                <canvas ref="particleCanvas" class="absolute inset-0 z-10 pointer-events-none"></canvas>

                <!-- Dynamic Abstract Shapes -->
                <div class="hero-shapes absolute inset-0 z-10 pointer-events-none">
                    <div class="shape shape-1 absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-[#7ec8e3]/20 to-transparent rounded-full blur-3xl animate-float-slow"></div>
                    <div class="shape shape-2 absolute bottom-40 left-20 w-128 h-128 bg-gradient-to-l from-[#1a4a6b]/20 to-transparent rounded-full blur-3xl animate-float-slower"></div>
                    <div class="shape shape-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-pulse-gentle"></div>
                    
                    <!-- Animated Dots Pattern -->
                    <svg class="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
                        <defs>
                            <pattern id="dots-pattern" patternUnits="userSpaceOnUse" width="40" height="40">
                                <circle cx="20" cy="20" r="1.5" fill="white" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#dots-pattern)" />
                    </svg>
                </div>

                <!-- Hero Content Container -->
                <div class="hero-content relative z-20 min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20">
                    <div class="max-w-7xl mx-auto w-full">
                        
                        <!-- Category Tags - Premium Badges -->
                        <div class="category-container mb-6 text-center animate-fade-up">
                            <div class="inline-flex flex-wrap gap-3 justify-center">
                                <NuxtLink 
                                    v-for="cat in article.category" 
                                    :key="cat.id"
                                    :to="`/category/${cat.slug}`"
                                    class="category-tag group relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-500 hover:scale-105"
                                >
                                    <span class="relative z-10">{{ cat.name }}</span>
                                    <div class="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm group-hover:bg-gradient-to-r group-hover:from-[#7ec8e3] group-hover:to-[#1a4a6b] transition-all duration-500"></div>
                                    <div class="absolute inset-0 rounded-full bg-gradient-to-r from-[#7ec8e3] to-[#1a4a6b] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"></div>
                                </NuxtLink>
                            </div>
                        </div>

                        <!-- Article Title with Split Text Effect -->
                        <div class="title-container text-center mb-8">
                            <h1 class="article-title font-display font-black text-white leading-[1.1] tracking-tighter">
                                <span class="block text-5xl md:text-7xl lg:text-8xl xl:text-9xl animate-title-reveal">
                                    {{ article.title }}
                                </span>
                            </h1>
                            <p class="article-description text-white/80 text-lg md:text-xl max-w-3xl mx-auto mt-6 leading-relaxed animate-fade-up animation-delay-200">
                                {{ article.description }}
                            </p>
                        </div>

                        <!-- Location Badge with Map Preview -->
                        <div class="location-wrapper mb-8 text-center animate-fade-up animation-delay-300">
                            <div class="location-badge-container relative inline-block">
                                <button 
                                    class="location-trigger group flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-500 border border-white/20"
                                    @mouseenter="showMapPreview = true"
                                    @mouseleave="showMapPreview = false"
                                >
                                    <svg class="w-5 h-5 text-[#7ec8e3] group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                    <span class="text-white text-base font-medium">{{ article.location }}</span>
                                    <svg class="w-4 h-4 text-white/60 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                    </svg>
                                </button>
                                
                                <!-- Premium Map Preview Card -->
                                <Transition name="map-preview">
                                    <div v-if="article.map_lat && article.map_lng && showMapPreview" class="map-preview-card absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-80 rounded-2xl overflow-hidden shadow-2xl z-50">
                                        <div class="bg-white p-2">
                                            <ClientOnly>
                                                <div ref="previewMapContainer" class="w-full h-48 rounded-lg"></div>
                                            </ClientOnly>
                                            <div class="p-3 text-center border-t border-gray-100">
                                                <p class="text-xs font-medium text-[#1a4a6b]">{{ article.location }}</p>
                                            </div>
                                        </div>
                                        <div class="map-preview-arrow"></div>
                                    </div>
                                </Transition>
                            </div>
                        </div>

                        <!-- YouTube Teaser Card -->
                        <div v-if="article.youtube_url" class="youtube-teaser max-w-3xl mx-auto mb-10 animate-fade-up animation-delay-400">
                            <div class="relative rounded-2xl overflow-hidden cursor-pointer group shadow-2xl" @click="showVideoModal = true">
                                <img 
                                    :src="`https://img.youtube.com/vi/${getYouTubeId(article.youtube_url)}/maxresdefault.jpg`"
                                    :alt="`Watch video: ${article.title}`"
                                    class="w-full h-64 md:h-80 object-cover transition-transform duration-1000 group-hover:scale-110"
                                >
                                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                <div class="absolute inset-0 flex items-center justify-center">
                                    <div class="play-button w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-[#7ec8e3] to-[#1a4a6b] flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(126,200,227,0.5)]">
                                        <svg class="w-10 h-10 md:w-12 md:h-12 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <div class="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md rounded-full px-4 py-2">
                                    <span class="text-white text-sm font-medium flex items-center gap-2">
                                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z"></path>
                                        </svg>
                                        Watch the story
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Premium Stats Dashboard -->
                        <div class="stats-dashboard max-w-5xl mx-auto animate-fade-up animation-delay-500">
                            <div class="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 md:p-8 shadow-2xl">
                                <div class="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
                                    
                                    <!-- Views Card with Animated Counter -->
                                    <div class="stat-premium text-center group cursor-pointer">
                                        <div class="stat-icon w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7ec8e3]/20 to-[#1a4a6b]/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-all duration-300">
                                            <svg class="w-7 h-7 text-[#7ec8e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                            </svg>
                                        </div>
                                        <div class="stat-value text-2xl md:text-3xl font-bold text-white">
                                            <CountUp :end="article.views" :duration="2.5" :suffix="article.views >= 1000 ? '+' : ''" />
                                        </div>
                                        <div class="stat-label text-xs text-white/50 uppercase tracking-wider mt-1">Total Views</div>
                                    </div>

                                    <!-- Date Card -->
                                    <div class="stat-premium text-center group cursor-pointer">
                                        <div class="stat-icon w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7ec8e3]/20 to-[#1a4a6b]/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-all duration-300">
                                            <svg class="w-7 h-7 text-[#7ec8e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                            </svg>
                                        </div>
                                        <div class="stat-value text-sm md:text-base font-bold text-white">{{ formatDate(article.published_date) }}</div>
                                        <div class="stat-label text-xs text-white/50 uppercase tracking-wider mt-1">Published</div>
                                    </div>

                                    <!-- Travel Cost Card -->
                                    <div v-if="article.travel_cost" class="stat-premium text-center group cursor-pointer">
                                        <div class="stat-icon w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7ec8e3]/20 to-[#1a4a6b]/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-all duration-300">
                                            <svg class="w-7 h-7 text-[#7ec8e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                        </div>
                                        <div class="stat-value text-sm md:text-base font-bold text-white">{{ article.travel_cost }}</div>
                                        <div class="stat-label text-xs text-white/50 uppercase tracking-wider mt-1">Travel Cost</div>
                                    </div>

                                    <!-- Best Time Card -->
                                    <div v-if="article.best_time" class="stat-premium text-center group cursor-pointer">
                                        <div class="stat-icon w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7ec8e3]/20 to-[#1a4a6b]/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-all duration-300">
                                            <svg class="w-7 h-7 text-[#7ec8e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                        </div>
                                        <div class="stat-value text-sm md:text-base font-bold text-white">{{ article.best_time }}</div>
                                        <div class="stat-label text-xs text-white/50 uppercase tracking-wider mt-1">Best Time</div>
                                    </div>

                                    <!-- Reading Time Card -->
                                    <div class="stat-premium text-center group cursor-pointer">
                                        <div class="stat-icon w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7ec8e3]/20 to-[#1a4a6b]/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-all duration-300">
                                            <svg class="w-7 h-7 text-[#7ec8e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"></path>
                                            </svg>
                                        </div>
                                        <div class="stat-value text-2xl md:text-3xl font-bold text-white">{{ calculateReadingTime(article.description) }}</div>
                                        <div class="stat-label text-xs text-white/50 uppercase tracking-wider mt-1">Minutes Read</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Author Card with Social Links -->
                        <div class="author-card max-w-md mx-auto mt-10 animate-fade-up animation-delay-600">
                            <div class="relative group">
                                <div class="absolute inset-0 bg-gradient-to-r from-[#7ec8e3] to-[#1a4a6b] rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                                <div class="relative bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20 hover:border-[#7ec8e3]/50 transition-all duration-500">
                                    <div class="flex items-center gap-4">
                                        <!-- Avatar -->
                                        <div class="author-avatar w-16 h-16 rounded-full bg-gradient-to-br from-[#7ec8e3] to-[#1a4a6b] p-0.5">
                                            <div class="w-full h-full rounded-full bg-[#1a1a1a] flex items-center justify-center">
                                                <span class="text-white font-bold text-2xl">S</span>
                                            </div>
                                        </div>
                                        
                                        <!-- Author Info -->
                                        <div class="flex-1">
                                            <p class="text-white/60 text-xs uppercase tracking-wider">Written by</p>
                                            <p class="text-white text-xl font-display font-bold">Shayon</p>
                                            <p class="text-white/40 text-xs">Adventure Storyteller</p>
                                        </div>
                                        
                                        <!-- Social Links -->
                                        <div class="flex gap-2">
                                            <a href="#" class="social-link w-10 h-10 rounded-full bg-white/10 hover:bg-[#1da1f2] flex items-center justify-center transition-all duration-300 hover:scale-110" aria-label="Twitter">
                                                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.677-11.855c0-.21-.005-.423-.015-.635A9.936 9.936 0 0024 4.59z"></path>
                                                </svg>
                                            </a>
                                            <a href="#" class="social-link w-10 h-10 rounded-full bg-white/10 hover:bg-[#e4405f] flex items-center justify-center transition-all duration-300 hover:scale-110" aria-label="Instagram">
                                                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311 1.266-.058 1.646-.07 4.85-.07zM12 7.376c-2.55 0-4.624 2.074-4.624 4.624 0 2.55 2.074 4.624 4.624 4.624 2.55 0 4.624-2.074 4.624-4.624 0-2.55-2.074-4.624-4.624-4.624zm0 7.623c-1.656 0-3-1.344-3-3s1.344-3 3-3 3 1.344 3 3-1.344 3-3 3z"></path>
                                                </svg>
                                            </a>
                                            <a href="#" class="social-link w-10 h-10 rounded-full bg-white/10 hover:bg-[#ff0000] flex items-center justify-center transition-all duration-300 hover:scale-110" aria-label="YouTube">
                                                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Scroll Hint -->
                        <div class="scroll-hint text-center mt-12 animate-bounce">
                            <div class="inline-flex flex-col items-center gap-2 text-white/40 text-xs">
                                <span>Scroll to explore the journey</span>
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7-7-7m14-6l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Rest of your article content continues here... -->
            
        </article>

        <!-- Premium Video Modal -->
        <Teleport to="body">
            <Transition name="modal-premium">
                <div v-if="showVideoModal" class="video-modal fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" @click="showVideoModal = false">
                    <div class="relative max-w-6xl w-full" @click.stop>
                        <button @click="showVideoModal = false" class="absolute -top-12 right-0 text-white/60 hover:text-white transition-all duration-300">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <div class="relative rounded-2xl overflow-hidden shadow-2xl" style="padding-bottom: 56.25%">
                            <iframe 
                                :src="`https://www.youtube.com/embed/${getYouTubeId(article?.youtube_url || '')}?autoplay=1&rel=0&modestbranding=1`"
                                class="absolute inset-0 w-full h-full"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (process.client) {
    gsap.registerPlugin(ScrollTrigger)
}



// Route & Data
const route = useRoute()
const slug = computed(() => route.params.slug as string)
const config = useRuntimeConfig()

const { data: article, pending, error } = await useAsyncData<IArticle>(
    `article-${slug.value}`,
    async () => {
        const response = await $fetch<{ data: IArticle[] }>(
            `${config.public.backendApi}/api/articles`,
            {
                params: {
                    'filters[slug][$eq]': slug.value,
                    populate: 'category,featured_image',
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

// Computed hero background
const heroBackgroundImage = computed(() => {
    return article.value?.og_image || 
           article.value?.featured_image?.url || 
           'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2000&q=90'
})

// Refs & State
const heroImage = ref<HTMLElement | null>(null)
const particleCanvas = ref<HTMLCanvasElement | null>(null)
const readingProgress = ref(0)
const showMapPreview = ref(false)
const showVideoModal = ref(false)
const previewMapContainer = ref<HTMLElement | null>(null)

// Particle Animation System
let particleAnimation: number | null = null

const initParticles = () => {
    if (!particleCanvas.value) return
    
    const canvas = particleCanvas.value
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    let particles: Array<{
        x: number
        y: number
        size: number
        speedX: number
        speedY: number
        opacity: number
    }> = []
    
    const resizeCanvas = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        initParticlesArray()
    }
    
    const initParticlesArray = () => {
        particles = []
        const particleCount = Math.floor((canvas.width * canvas.height) / 12000)
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.2,
                speedY: (Math.random() - 0.5) * 0.2,
                opacity: Math.random() * 0.4 + 0.1
            })
        }
    }
    
    const animate = () => {
        if (!ctx || !canvas) return
        
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        particles.forEach(particle => {
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(126, 200, 227, ${particle.opacity})`
            ctx.fill()
            
            particle.x += particle.speedX
            particle.y += particle.speedY
            
            if (particle.x < 0) particle.x = canvas.width
            if (particle.x > canvas.width) particle.x = 0
            if (particle.y < 0) particle.y = canvas.height
            if (particle.y > canvas.height) particle.y = 0
        })
        
        particleAnimation = requestAnimationFrame(animate)
    }
    
    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()
    animate()
}

// Animations
onMounted(() => {
    // Parallax effect
    if (process.client && heroImage.value) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset
            const rate = scrolled * 0.3
            heroImage.value!.style.transform = `translateY(${rate}px)`
        })
    }
    
    // Reading progress
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
        const scrolled = (winScroll / height) * 100
        readingProgress.value = scrolled / 100
    })
    
    // Initialize particles
    initParticles()
    
    // GSAP Timeline for hero elements
    if (process.client) {
        const tl = gsap.timeline()
        
        tl.fromTo('.category-container', 
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
        )
        .fromTo('.title-container', 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power4.out' },
            '-=0.3'
        )
        .fromTo('.location-wrapper', 
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
            '-=0.2'
        )
        .fromTo('.youtube-teaser', 
            { y: 30, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(0.6)' },
            '-=0.2'
        )
        .fromTo('.stats-dashboard', 
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
            '-=0.2'
        )
        .fromTo('.author-card', 
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
            '-=0.2'
        )
        .fromTo('.scroll-hint', 
            { opacity: 0 },
            { opacity: 1, duration: 1 },
            '-=0.5'
        )
    }
})

// Cleanup
onUnmounted(() => {
    if (particleAnimation) {
        cancelAnimationFrame(particleAnimation)
    }
})

// Map Preview
let mapScriptLoaded = false

const loadMapForPreview = async () => {
    return new Promise((resolve) => {
        if (mapScriptLoaded) {
            initPreviewMap()
            resolve(true)
            return
        }
        
        const script = document.createElement('script')
        script.src = `https://maps.geoapify.com/v1/js/api.js?api_key=${config.public.geoapifyApiKey}`
        script.async = true
        script.defer = true
        
        script.onload = () => {
            mapScriptLoaded = true
            initPreviewMap()
            resolve(true)
        }
        
        document.head.appendChild(script)
    })
}

const initPreviewMap = () => {
    if (!previewMapContainer.value || !article.value?.map_lat || !article.value?.map_lng) return
    
    const checkGeoapify = setInterval(() => {
        // if (window.geoapify) {
        //     clearInterval(checkGeoapify)
        //     const geoapify = window.geoapify
            
        //     new geoapify.Map(previewMapContainer.value, {
        //         center: [article.value!.map_lng, article.value!.map_lat],
        //         zoom: 13,
        //         style: 'osm-carto'
        //     })
            
        //     new geoapify.Marker({
        //         position: [article.value!.map_lng, article.value!.map_lat],
        //         map: previewMapContainer.value
        //     })
        // }
    }, 100)
    
    setTimeout(() => clearInterval(checkGeoapify), 5000)
}

watch(showMapPreview, async (show) => {
    if (show && article.value?.map_lat && article.value?.map_lng && previewMapContainer.value && !mapScriptLoaded) {
        await loadMapForPreview()
    }
})

// SEO
useSeoMeta({
    title: () => article.value?.meta_title || article.value?.title || 'Travel Article',
    description: () => article.value?.meta_description || article.value?.description || 'Explore amazing travel destinations and adventures',
    ogTitle: () => article.value?.meta_title || article.value?.title,
    ogDescription: () => article.value?.meta_description || article.value?.description,
    ogImage: () => article.value?.og_image || article.value?.featured_image?.url,
    ogType: 'article',
    twitterCard: 'summary_large_image',
})

// Utilities
const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

const calculateReadingTime = (text: string): number => {
    const wordsPerMinute = 200
    const wordCount = text?.split(/\s+/).length || 0
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}

const getYouTubeId = (url: string): string => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)
    return match?.[1] || ''
}
</script>

<style scoped>
@use "~/assets/scss/single-article.scss";
</style>