<template>
    <div class="w-full">
        <!-- ================================================================
           HERO SECTION
      ================================================================ -->
        <header>
            <section class="relative min-h-[50vh] flex flex-col overflow-hidden" aria-label="Articles header">
                <div class="absolute inset-0 z-0" aria-hidden="true">
                    <div class="absolute inset-0 bg-gradient-to-br from-[#1a1a1a]/85 via-[#1a4a6b]/70 to-[#0f2a3f]/80 z-10"></div>
                    <div class="w-full h-full bg-cover bg-center"
                         style="background-image: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80')">
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#f9fafc] to-transparent z-20"></div>
                </div>

                <Navbar />

                <main class="flex-1 flex items-center px-6 md:px-12 lg:px-20 py-20 relative z-20">
                    <div class="w-full text-center">
                        <div class="inline-flex items-center gap-3 bg-white/15 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/20">
                            <span class="text-3xl">📚</span>
                            <span class="text-[#7ec8e3] text-sm font-semibold tracking-[0.2em] uppercase">Travel Stories</span>
                        </div>
                        <h1 class="font-display font-black text-white text-6xl md:text-7xl lg:text-8xl mb-6 leading-none">
                            Articles & Stories
                        </h1>
                        <div class="w-24 h-1 bg-[#7ec8e3] mx-auto mb-6 rounded-full"></div>
                        <p class="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            Dive into inspiring travel stories, adventure guides, and cultural insights from around the world.
                        </p>
                        <div class="mt-8 flex items-center justify-center gap-6 text-white/60 text-sm">
                            <div class="flex items-center gap-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"></path>
                                </svg>
                                <span>{{ totalArticles }} Articles</span>
                            </div>
                            <div class="w-1 h-1 bg-[#7ec8e3] rounded-full"></div>
                            <div class="flex items-center gap-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span>{{ totalReadingTime }} min read</span>
                            </div>
                            <div class="w-1 h-1 bg-[#7ec8e3] rounded-full"></div>
                            <div class="flex items-center gap-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                </svg>
                                <span>{{ totalLikes }} Likes</span>
                            </div>
                        </div>
                    </div>
                </main>

                <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
                    <svg class="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7-7-7m14-6l-7 7-7-7"></path>
                    </svg>
                </div>
            </section>
        </header>

        <!-- ================================================================
           STATS BAR
      ================================================================ -->
        <div class="bg-white border-b border-[#e5e7eb] sticky top-0 z-30">
            <div class="px-6 md:px-12 lg:px-20 py-4">
                <div class="flex flex-wrap items-center justify-between gap-4">
                    <div class="flex items-center gap-6">
                        <div class="flex items-center gap-2">
                            <div class="w-10 h-10 rounded-full bg-[#7ec8e3]/10 flex items-center justify-center">
                                <span class="text-xl">📖</span>
                            </div>
                            <div>
                                <p class="text-xs text-[#555555]">Total Articles</p>
                                <p class="font-semibold text-[#1a1a1a]">{{ totalArticles }}</p>
                            </div>
                        </div>
                        <div class="w-px h-8 bg-[#e5e7eb]"></div>
                        <div>
                            <p class="text-xs text-[#555555]">Categories</p>
                            <p class="font-semibold text-[#1a1a1a]">{{ categories.length }}</p>
                        </div>
                        <div class="w-px h-8 bg-[#e5e7eb] hidden sm:block"></div>
                        <div class="hidden sm:block">
                            <p class="text-xs text-[#555555]">Authors</p>
                            <p class="font-semibold text-[#1a1a1a]">{{ uniqueAuthors.length }}</p>
                        </div>
                    </div>
                    
                    <div class="flex gap-2">
                        <button v-for="view in viewOptions" :key="view.value"
                            @click="viewMode = view.value"
                            :class="[
                                'p-2 rounded-lg transition-all duration-300',
                                viewMode === view.value
                                    ? 'bg-[#1a4a6b] text-white'
                                    : 'bg-[#f0f0f0] text-[#555555] hover:bg-[#e5e7eb]'
                            ]">
                            <span class="text-lg">{{ view.icon }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- ================================================================
           FILTERS & SEARCH
      ================================================================ -->
        <div class="sticky top-[73px] z-20 bg-white/95 backdrop-blur-md border-b border-[#e5e7eb]">
            <div class="px-6 md:px-12 lg:px-20 py-4">
                <div class="flex flex-col lg:flex-row gap-4 items-center justify-between">
                    <!-- Search -->
                    <div class="relative w-full lg:w-96">
                        <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#555555]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                        <input 
                            v-model="searchQuery"
                            type="text"
                            placeholder="Search articles by title, author, or content..."
                            class="w-full pl-12 pr-4 py-3 rounded-full border border-[#e5e7eb] focus:border-[#7ec8e3] focus:outline-none focus:ring-2 focus:ring-[#7ec8e3]/20 transition-all"
                        />
                    </div>

                    <!-- Filters -->
                    <div class="flex flex-wrap gap-2">
                        <select v-model="selectedCategory" 
                            class="px-4 py-2 rounded-full border border-[#e5e7eb] bg-white text-[#555555] text-sm focus:border-[#7ec8e3] focus:outline-none">
                            <option value="all">All Categories</option>
                            <option v-for="cat in categories" :key="cat.value" :value="cat.value">
                                {{ cat.label }}
                            </option>
                        </select>
                        
                        <select v-model="sortBy" 
                            class="px-4 py-2 rounded-full border border-[#e5e7eb] bg-white text-[#555555] text-sm focus:border-[#7ec8e3] focus:outline-none">
                            <option value="latest">Latest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="popular">Most Popular</option>
                            <option value="trending">Trending</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <!-- ================================================================
           FEATURED ARTICLE
      ================================================================ -->
        <section v-if="featuredArticle && !searchQuery && selectedCategory === 'all'" class="px-6 md:px-12 lg:px-20 pt-12 pb-8">
            <div class="mb-8">
                <p class="text-[#7ec8e3] text-xs font-semibold tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
                    <span class="w-8 h-px bg-[#7ec8e3]"></span> 
                    Featured Story
                </p>
                <h2 class="font-display font-bold text-[#1a1a1a] text-2xl md:text-3xl">Editor's Pick</h2>
            </div>

            <NuxtLink :to="`/story/${featuredArticle.slug}`" class="group block">
                <div class="relative rounded-3xl overflow-hidden bg-white border border-[#e5e7eb] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <div class="relative h-[450px] md:h-[500px] overflow-hidden">
                        <img :src="featuredArticle.image" :alt="featuredArticle.title"
                             class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                        
                        <div class="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                            <div class="max-w-3xl">
                                <div class="flex items-center gap-3 mb-4">
                                    <span class="bg-[#7ec8e3] text-[#1a1a1a] text-xs font-bold px-3 py-1 rounded-full">
                                        {{ featuredArticle.category }}
                                    </span>
                                    <span class="text-white/60">{{ featuredArticle.readTime }} read</span>
                                </div>
                                <h3 class="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4 group-hover:text-[#7ec8e3] transition-colors duration-300">
                                    {{ featuredArticle.title }}
                                </h3>
                                <p class="text-white/80 text-lg leading-relaxed mb-6 line-clamp-2">
                                    {{ featuredArticle.excerpt }}
                                </p>
                                <div class="flex items-center gap-4">
                                    <div class="flex items-center gap-2">
                                        <img :src="featuredArticle.authorAvatar" class="w-10 h-10 rounded-full border-2 border-[#7ec8e3]" />
                                        <div>
                                            <p class="font-medium">{{ featuredArticle.author }}</p>
                                            <p class="text-sm text-white/60">{{ featuredArticle.date }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </NuxtLink>
        </section>

        <!-- ================================================================
           ARTICLES GRID
      ================================================================ -->
        <section class="px-6 md:px-12 lg:px-20 py-12">
            <div class="mb-8 flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h2 class="font-display font-bold text-[#1a1a1a] text-2xl md:text-3xl">
                        {{ getPageTitle() }}
                    </h2>
                    <p class="text-[#555555] mt-1">{{ filteredArticles.length }} articles found</p>
                </div>
                <div class="text-sm text-[#555555]">
                    Showing {{ paginatedArticles.length }} of {{ filteredArticles.length }}
                </div>
            </div>

            <!-- Grid View -->
            <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <NuxtLink v-for="(article, index) in paginatedArticles" :key="article.id"
                          :to="`/story/${article.slug}`"
                          class="group relative rounded-2xl overflow-hidden bg-white border border-[#e5e7eb] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    
                    <div class="relative h-56 overflow-hidden">
                        <img :src="article.image" :alt="article.title"
                             class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div class="absolute top-4 left-4">
                            <span class="bg-[#7ec8e3] text-[#1a1a1a] text-xs font-bold px-3 py-1.5 rounded-full">
                                {{ article.category }}
                            </span>
                        </div>
                        
                        <div class="absolute top-4 right-4">
                            <span class="bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                {{ article.readTime }}
                            </span>
                        </div>
                    </div>

                    <div class="p-5">
                        <div class="flex items-center gap-3 mb-3">
                            <img :src="article.authorAvatar" class="w-6 h-6 rounded-full" />
                            <span class="text-xs text-[#555555]">{{ article.author }}</span>
                            <span class="w-1 h-1 rounded-full bg-[#7ec8e3]"></span>
                            <time class="text-[#555555] text-xs">{{ article.date }}</time>
                        </div>

                        <h3 class="font-display font-bold text-[#1a1a1a] text-lg leading-snug mb-2 group-hover:text-[#1a4a6b] transition-colors line-clamp-2">
                            {{ article.title }}
                        </h3>

                        <p class="text-[#555555] text-sm leading-relaxed line-clamp-2 mb-3">
                            {{ article.excerpt }}
                        </p>

                        <div class="flex items-center justify-between pt-3 border-t border-[#e5e7eb]">
                            <div class="flex items-center gap-2 text-xs text-[#555555]">
                                <span class="flex items-center gap-1">
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                    </svg>
                                    {{ article.likes }}
                                </span>
                                <span class="flex items-center gap-1">
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                                    </svg>
                                    {{ article.comments }}
                                </span>
                            </div>
                            <span class="text-[#7ec8e3] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                Read →
                            </span>
                        </div>
                    </div>
                </NuxtLink>
            </div>

            <!-- List View -->
            <div v-else class="space-y-6">
                <NuxtLink v-for="article in paginatedArticles" :key="article.id"
                          :to="`/story/${article.slug}`"
                          class="group flex flex-col md:flex-row gap-6 bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                    
                    <div class="relative md:w-80 h-48 md:h-auto overflow-hidden">
                        <img :src="article.image" :alt="article.title"
                             class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div class="absolute top-4 left-4">
                            <span class="bg-[#7ec8e3] text-[#1a1a1a] text-xs font-bold px-3 py-1.5 rounded-full">
                                {{ article.category }}
                            </span>
                        </div>
                    </div>
                    
                    <div class="flex-1 p-6">
                        <div class="flex items-center gap-3 mb-3">
                            <img :src="article.authorAvatar" class="w-8 h-8 rounded-full" />
                            <span class="text-sm text-[#555555]">{{ article.author }}</span>
                            <span class="w-1 h-1 rounded-full bg-[#7ec8e3]"></span>
                            <time class="text-sm text-[#555555]">{{ article.date }}</time>
                            <span class="text-sm text-[#555555]">• {{ article.readTime }} read</span>
                        </div>

                        <h3 class="font-display font-bold text-[#1a1a1a] text-xl md:text-2xl mb-2 group-hover:text-[#1a4a6b] transition-colors">
                            {{ article.title }}
                        </h3>

                        <p class="text-[#555555] leading-relaxed mb-4 line-clamp-2">
                            {{ article.excerpt }}
                        </p>

                        <div class="flex items-center justify-between pt-3 border-t border-[#e5e7eb]">
                            <div class="flex items-center gap-4 text-sm text-[#555555]">
                                <span class="flex items-center gap-1">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                    </svg>
                                    {{ article.likes }} likes
                                </span>
                                <span class="flex items-center gap-1">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                                    </svg>
                                    {{ article.comments }} comments
                                </span>
                            </div>
                            <span class="text-[#7ec8e3] font-medium group-hover:translate-x-1 transition-transform">
                                Read Article →
                            </span>
                        </div>
                    </div>
                </NuxtLink>
            </div>

            <!-- Pagination -->
            <div v-if="filteredArticles.length > 0" class="mt-12 flex items-center justify-center gap-2">
                <button @click="currentPage--" :disabled="currentPage === 1"
                    :class="['p-2 rounded-lg transition-all', currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#f0f0f0]']">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>
                <button v-for="page in visiblePages" :key="page"
                    @click="currentPage = page"
                    :class="['px-4 py-2 rounded-lg font-medium transition-all', currentPage === page ? 'bg-[#1a4a6b] text-white' : 'hover:bg-[#f0f0f0] text-[#555555]']">
                    {{ page }}
                </button>
                <button @click="currentPage++" :disabled="currentPage === totalPages"
                    :class="['p-2 rounded-lg transition-all', currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#f0f0f0]']">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>

            <!-- Empty State -->
            <div v-else class="text-center py-20">
                <div class="text-6xl mb-4">🔍</div>
                <h3 class="font-display font-bold text-[#1a1a1a] text-2xl mb-2">No articles found</h3>
                <p class="text-[#555555] mb-6">Try adjusting your search or filter to find what you're looking for.</p>
                <button @click="resetFilters" 
                    class="px-6 py-3 bg-[#7ec8e3] text-[#1a1a1a] rounded-full font-semibold hover:bg-[#5bb8d4] transition-all">
                    Reset Filters
                </button>
            </div>
        </section>

        <!-- ================================================================
           CATEGORIES SECTION
      ================================================================ -->
        <section class="bg-[#f9fafc] py-16 border-t border-[#e5e7eb]">
            <div class="px-6 md:px-12 lg:px-20">
                <div class="text-center mb-10">
                    <p class="text-[#7ec8e3] text-xs font-semibold tracking-[0.2em] uppercase mb-3 flex items-center justify-center gap-2">
                        <span class="w-8 h-px bg-[#7ec8e3]"></span> 
                        Explore by Category 
                        <span class="w-8 h-px bg-[#7ec8e3]"></span>
                    </p>
                    <h2 class="font-display font-bold text-[#1a1a1a] text-2xl md:text-3xl">Discover More Stories</h2>
                </div>

                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <NuxtLink v-for="cat in categories" :key="cat.value"
                        :to="`/category/${cat.value}`"
                        class="group bg-white rounded-2xl p-5 text-center border border-[#e5e7eb] hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <div class="text-3xl mb-2 group-hover:scale-110 transition-transform">{{ cat.icon }}</div>
                        <p class="font-semibold text-[#1a1a1a] text-sm">{{ cat.label }}</p>
                        <p class="text-xs text-[#555555] mt-1">{{ getCategoryCount(cat.value) }} articles</p>
                    </NuxtLink>
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
    title: 'Articles & Stories | Uncharted with Shayon',
    meta: [
        { name: 'description', content: 'Explore inspiring travel stories, adventure guides, and cultural insights from around the world. Discover new destinations and travel tips.' },
        { name: 'keywords', content: 'travel articles, travel stories, adventure blog, travel guides, travel tips' }
    ]
})

// ============================================================
// State
// ============================================================
const searchQuery = ref('')
const selectedCategory = ref('all')
const sortBy = ref('latest')
type ViewMode = 'grid' | 'list'
const viewMode = ref<ViewMode>('grid')
const currentPage = ref(1)
const itemsPerPage = 9

// View options
const viewOptions = [
    { value: 'grid', icon: '⊞' },
    { value: 'list', icon: '☰' }
] as const satisfies readonly { value: ViewMode; icon: string }[]

// ============================================================
// Categories Data
// ============================================================
const categories = [
    { value: 'hiking', label: 'Hiking', icon: '🥾' },
    { value: 'desert', label: 'Desert', icon: '🏜️' },
    { value: 'forest', label: 'Forest', icon: '🌲' },
    { value: 'beach', label: 'Beach', icon: '🏖️' },
    { value: 'culture', label: 'Culture', icon: '🏛️' },
    { value: 'camping', label: 'Camping', icon: '⛺' },
    { value: 'adventure', label: 'Adventure', icon: '⚡' },
    { value: 'wildlife', label: 'Wildlife', icon: '🦁' }
]

// ============================================================
// Articles Data (24 articles for demonstration)
// ============================================================
const allArticles = [
    // Hiking Articles
    { id: 1, slug: 'himalayan-solo-trek', title: 'Solo Trekking in the Himalayas: A Journey Within', excerpt: 'A 10-day solo expedition through the Annapurna Circuit, discovering inner strength and breathtaking vistas.', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80', category: 'hiking', author: 'Shayon', authorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg', date: 'Feb 28, 2025', readTime: '6 min read', likes: 124, comments: 23, featured: true },
    { id: 2, slug: 'dolomites-sunrise', title: 'Chasing Sunrise in the Italian Dolomites', excerpt: 'Waking up at 3 AM was worth every moment when the first rays of sun painted the mountains in gold.', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', category: 'hiking', author: 'Elena', authorAvatar: 'https://randomuser.me/api/portraits/women/44.jpg', date: 'Mar 5, 2025', readTime: '5 min read', likes: 98, comments: 12, featured: false },
    { id: 3, slug: 'patagonia-w-trek', title: 'The W Trek: Patagonia\'s Most Iconic Hike', excerpt: 'Five days of pure adventure through Torres del Paine, witnessing glaciers, turquoise lakes, and jagged peaks.', image: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=800&q=80', category: 'hiking', author: 'Shayon', authorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg', date: 'Jan 20, 2025', readTime: '8 min read', likes: 256, comments: 34, featured: false },
    { id: 4, slug: 'swiss-alps-traverse', title: 'Traversing the Swiss Alps: A Photographer\'s Dream', excerpt: 'Capturing the beauty of the Matterhorn, Jungfrau, and hidden alpine lakes in Switzerland.', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', category: 'hiking', author: 'Markus', authorAvatar: 'https://randomuser.me/api/portraits/men/45.jpg', date: 'Dec 10, 2024', readTime: '7 min read', likes: 189, comments: 28, featured: false },
    
    // Desert Articles
    { id: 5, slug: 'sahara-starlight', title: 'Starlit Nights in the Sahara Desert', excerpt: 'Sleeping under a blanket of stars in the world\'s largest desert, where silence speaks louder than words.', image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80', category: 'desert', author: 'Aisha', authorAvatar: 'https://randomuser.me/api/portraits/women/68.jpg', date: 'Mar 12, 2025', readTime: '5 min read', likes: 203, comments: 18, featured: true },
    { id: 6, slug: 'wadi-rum-adventure', title: 'Wadi Rum: Mars on Earth', excerpt: 'Exploring the red desert of Jordan, climbing massive rock formations, and Bedouin hospitality.', image: 'https://images.unsplash.com/photo-1549755391-01b4ccde7a9c?w=800&q=80', category: 'desert', author: 'Omar', authorAvatar: 'https://randomuser.me/api/portraits/men/52.jpg', date: 'Feb 15, 2025', readTime: '6 min read', likes: 167, comments: 21, featured: false },
    
    // Forest Articles
    { id: 7, slug: 'amazon-rainforest', title: 'Into the Heart of the Amazon Rainforest', excerpt: 'A week-long expedition exploring the world\'s most biodiverse ecosystem.', image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80', category: 'forest', author: 'Shayon', authorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg', date: 'Mar 8, 2025', readTime: '9 min read', likes: 187, comments: 32, featured: true },
    { id: 8, slug: 'black-forest-germany', title: 'Mysteries of the Black Forest', excerpt: 'Hiking through ancient woodlands, discovering cuckoo clocks, and German folklore.', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80', category: 'forest', author: 'Sophie', authorAvatar: 'https://randomuser.me/api/portraits/women/23.jpg', date: 'Jan 28, 2025', readTime: '5 min read', likes: 134, comments: 15, featured: false },
    
    // Beach Articles
    { id: 9, slug: 'maldives-snorkeling', title: 'Underwater Wonders: Snorkeling in the Maldives', excerpt: 'Swimming with manta rays, sea turtles, and vibrant coral reefs.', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80', category: 'beach', author: 'Maya', authorAvatar: 'https://randomuser.me/api/portraits/women/23.jpg', date: 'Mar 3, 2025', readTime: '4 min read', likes: 245, comments: 42, featured: true },
    { id: 10, slug: 'santorini-sunset', title: 'Santorini: The Most Beautiful Sunset on Earth', excerpt: 'Experiencing the magic of Oia, white-washed buildings, and the Aegean Sea.', image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80', category: 'beach', author: 'Nikos', authorAvatar: 'https://randomuser.me/api/portraits/men/38.jpg', date: 'Feb 20, 2025', readTime: '6 min read', likes: 312, comments: 56, featured: false },
    
    // Culture Articles
    { id: 11, slug: 'kyoto-temple-trail', title: 'Kyoto in Autumn: The Ultimate Temple Trail', excerpt: 'Walking through ancient temples surrounded by vibrant autumn colors.', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80', category: 'culture', author: 'Yuki', authorAvatar: 'https://randomuser.me/api/portraits/women/89.jpg', date: 'Nov 10, 2024', readTime: '6 min read', likes: 278, comments: 34, featured: false },
    { id: 12, slug: 'machu-picchu-guide', title: 'Machu Picchu: A Complete Travel Guide', excerpt: 'Everything you need to know before visiting the ancient Incan citadel.', image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80', category: 'culture', author: 'Carlos', authorAvatar: 'https://randomuser.me/api/portraits/men/42.jpg', date: 'Oct 15, 2024', readTime: '8 min read', likes: 345, comments: 67, featured: false },
    
    // Camping Articles
    { id: 13, slug: 'camping-yellowstone', title: 'Camping Under the Stars in Yellowstone', excerpt: 'Wildlife encounters, geothermal wonders, and nights spent under dark skies.', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80', category: 'camping', author: 'John', authorAvatar: 'https://randomuser.me/api/portraits/men/52.jpg', date: 'Sep 5, 2024', readTime: '7 min read', likes: 198, comments: 23, featured: false },
    { id: 14, slug: 'banff-camping-guide', title: 'The Ultimate Guide to Camping in Banff', excerpt: 'Best campgrounds, tips, and must-see spots in Canada\'s most beautiful national park.', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', category: 'camping', author: 'Sarah', authorAvatar: 'https://randomuser.me/api/portraits/women/44.jpg', date: 'Aug 20, 2024', readTime: '6 min read', likes: 167, comments: 19, featured: false },
    
    // Adventure Articles
    { id: 15, slug: 'fjords-norway', title: 'Kayaking Through Norway\'s Majestic Fjords', excerpt: 'Paddling between towering cliffs and cascading waterfalls.', image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=80', category: 'adventure', author: 'Markus', authorAvatar: 'https://randomuser.me/api/portraits/men/45.jpg', date: 'Jul 10, 2024', readTime: '7 min read', likes: 234, comments: 31, featured: false },
    { id: 16, slug: 'new-zealand-road-trip', title: 'New Zealand South Island Road Trip', excerpt: 'A 14-day adventure through stunning landscapes and adventure sports.', image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=80', category: 'adventure', author: 'Shayon', authorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg', date: 'Jun 15, 2024', readTime: '10 min read', likes: 456, comments: 78, featured: false },
    
    // Wildlife Articles
    { id: 17, slug: 'safari-kenya', title: 'The Ultimate Safari Experience in Kenya', excerpt: 'Witnessing the Great Migration and the Big Five in their natural habitat.', image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80', category: 'wildlife', author: 'Grace', authorAvatar: 'https://randomuser.me/api/portraits/women/68.jpg', date: 'May 20, 2024', readTime: '8 min read', likes: 389, comments: 45, featured: false },
    { id: 18, slug: 'galapagos-islands', title: 'Wildlife Wonders of the Galapagos Islands', excerpt: 'Swimming with sea lions and walking among giant tortoises.', image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80', category: 'wildlife', author: 'Elena', authorAvatar: 'https://randomuser.me/api/portraits/women/44.jpg', date: 'Apr 12, 2024', readTime: '7 min read', likes: 267, comments: 32, featured: false }
]

// ============================================================
// Computed Properties
// ============================================================
const filteredArticles = computed(() => {
    let articles = [...allArticles]
    
    // Filter by search
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        articles = articles.filter(a => 
            a.title.toLowerCase().includes(query) ||
            a.excerpt.toLowerCase().includes(query) ||
            a.author.toLowerCase().includes(query)
        )
    }
    
    // Filter by category
    if (selectedCategory.value !== 'all') {
        articles = articles.filter(a => a.category === selectedCategory.value)
    }
    
    // Sort
    switch(sortBy.value) {
        case 'latest':
            articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            break
        case 'oldest':
            articles.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            break
        case 'popular':
            articles.sort((a, b) => b.likes - a.likes)
            break
        case 'trending':
            articles.sort((a, b) => (b.likes + b.comments) - (a.likes + a.comments))
            break
    }
    
    return articles
})

const featuredArticle = computed(() => {
    return filteredArticles.value.find(a => a.featured) || filteredArticles.value[0]
})

const totalPages = computed(() => {
    return Math.ceil(filteredArticles.value.length / itemsPerPage)
})

const paginatedArticles = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredArticles.value.slice(start, end)
})

const visiblePages = computed(() => {
    const pages = []
    const total = totalPages.value
    const current = currentPage.value
    const maxVisible = 5
    
    if (total <= maxVisible) {
        for (let i = 1; i <= total; i++) pages.push(i)
    } else {
        if (current <= 3) {
            for (let i = 1; i <= 5; i++) pages.push(i)
        } else if (current >= total - 2) {
            for (let i = total - 4; i <= total; i++) pages.push(i)
        } else {
            for (let i = current - 2; i <= current + 2; i++) pages.push(i)
        }
    }
    return pages
})

const totalArticles = computed(() => allArticles.length)
const totalReadingTime = computed(() => {
    const total = allArticles.reduce((sum, a) => sum + parseInt(a.readTime), 0)
    return total
})
const totalLikes = computed(() => {
    return allArticles.reduce((sum, a) => sum + a.likes, 0)
})
const uniqueAuthors = computed(() => {
    const authors = new Set(allArticles.map(a => a.author))
    return Array.from(authors)
})

// ============================================================
// Methods
// ============================================================
const getPageTitle = () => {
    if (searchQuery.value) return `Search Results: "${searchQuery.value}"`
    if (selectedCategory.value !== 'all') {
        const cat = categories.find(c => c.value === selectedCategory.value)
        return `${cat?.label} Stories`
    }
    return 'All Articles'
}

const getCategoryCount = (categoryValue: string) => {
    return allArticles.filter(a => a.category === categoryValue).length
}

const resetFilters = () => {
    searchQuery.value = ''
    selectedCategory.value = 'all'
    sortBy.value = 'latest'
    currentPage.value = 1
}

// Reset page when filters change
watch([searchQuery, selectedCategory, sortBy], () => {
    currentPage.value = 1
})
</script>

<style scoped lang="scss">
.animate-bounce {
    animation: bounce 2s infinite;
}

@keyframes bounce {
    0%, 100% {
        transform: translateY(-25%) translateX(-50%);
    }
    50% {
        transform: translateY(0) translateX(-50%);
    }
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.scrollbar-hide {
    scrollbar-width: none;
    -ms-overflow-style: none;
    
    &::-webkit-scrollbar {
        display: none;
    }
}
</style>