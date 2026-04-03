<template>
    <div class="w-full">
        <!-- ================================================================
           HERO SECTION
      ================================================================ -->
        <header>
            <section class="relative min-h-[40vh] flex flex-col overflow-hidden" aria-label="Search header">
                <div class="absolute inset-0 z-0" aria-hidden="true">
                    <div class="absolute inset-0 bg-gradient-to-br from-[#1a1a1a]/85 via-[#1a4a6b]/70 to-[#0f2a3f]/80 z-10"></div>
                    <div class="w-full h-full bg-cover bg-center"
                         style="background-image: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80')">
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#f9fafc] to-transparent z-20"></div>
                </div>

                <Navbar />

                <main class="flex-1 flex items-center px-6 md:px-12 lg:px-20 py-16 relative z-20">
                    <div class="w-full max-w-4xl mx-auto text-center">
                        <div class="inline-flex items-center gap-3 bg-white/15 backdrop-blur-md px-5 py-2.5 rounded-full mb-6 border border-white/20">
                            <span class="text-3xl">🔍</span>
                            <span class="text-[#7ec8e3] text-sm font-semibold tracking-[0.2em] uppercase">Find Your Next Adventure</span>
                        </div>
                        <h1 class="font-display font-black text-white text-5xl md:text-6xl lg:text-7xl mb-4">
                            Search Stories
                        </h1>
                        <p class="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
                            Discover articles, destinations, and travel guides that match your curiosity
                        </p>

                        <!-- Search Input -->
                        <div class="relative max-w-2xl mx-auto">
                            <svg class="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#555555]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                            <input 
                                v-model="searchInput"
                                type="text"
                                placeholder="Search by title, author, category, or content..."
                                class="w-full pl-12 pr-20 py-4 rounded-full bg-white shadow-lg text-[#1a1a1a] placeholder-[#555555] focus:outline-none focus:ring-2 focus:ring-[#7ec8e3] transition-all text-lg"
                                @keyup.enter="performSearch"
                            />
                            <button @click="performSearch" 
                                class="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-[#7ec8e3] text-[#1a1a1a] rounded-full font-semibold hover:bg-[#5bb8d4] transition-all">
                                Search
                            </button>
                        </div>
                    </div>
                </main>
            </section>
        </header>

        <!-- ================================================================
           SEARCH RESULTS
      ================================================================ -->
        <div class="px-6 md:px-12 lg:px-20 py-12">
            <!-- Search Info -->
            <div class="mb-8">
                <div class="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h2 class="font-display font-bold text-[#1a1a1a] text-2xl md:text-3xl">
                            {{ hasSearched ? 'Search Results' : 'Start Searching' }}
                        </h2>
                        <p class="text-[#555555] mt-1">
                            {{ hasSearched ? `Found ${totalResults} result${totalResults !== 1 ? 's' : ''} for "${searchQuery}"` : 'Enter a keyword to begin your search' }}
                        </p>
                    </div>
                    
                    <!-- Filter Toggle -->
                    <button @click="showFilters = !showFilters"
                        class="flex items-center gap-2 px-4 py-2 bg-white border border-[#e5e7eb] rounded-full text-sm font-medium text-[#555555] hover:border-[#7ec8e3] transition-all">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                        </svg>
                        Filters
                    </button>
                </div>
            </div>

            <!-- Filters Panel -->
            <transition name="slide-down">
                <div v-if="showFilters" class="bg-[#f9fafc] rounded-2xl p-6 mb-8 border border-[#e5e7eb]">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <!-- Category Filter -->
                        <div>
                            <label class="block text-sm font-semibold text-[#1a1a1a] mb-2">Category</label>
                            <select v-model="filters.category" 
                                class="w-full px-4 py-2 rounded-lg border border-[#e5e7eb] bg-white focus:border-[#7ec8e3] focus:outline-none">
                                <option value="all">All Categories</option>
                                <option value="hiking">Hiking 🥾</option>
                                <option value="desert">Desert 🏜️</option>
                                <option value="forest">Forest 🌲</option>
                                <option value="beach">Beach 🏖️</option>
                                <option value="culture">Culture 🏛️</option>
                                <option value="camping">Camping ⛺</option>
                                <option value="adventure">Adventure ⚡</option>
                                <option value="wildlife">Wildlife 🦁</option>
                            </select>
                        </div>

                        <!-- Sort By -->
                        <div>
                            <label class="block text-sm font-semibold text-[#1a1a1a] mb-2">Sort By</label>
                            <select v-model="filters.sortBy" 
                                class="w-full px-4 py-2 rounded-lg border border-[#e5e7eb] bg-white focus:border-[#7ec8e3] focus:outline-none">
                                <option value="relevance">Relevance</option>
                                <option value="latest">Latest First</option>
                                <option value="popular">Most Popular</option>
                                <option value="oldest">Oldest First</option>
                            </select>
                        </div>

                        <!-- Date Range -->
                        <div>
                            <label class="block text-sm font-semibold text-[#1a1a1a] mb-2">Date Range</label>
                            <select v-model="filters.dateRange" 
                                class="w-full px-4 py-2 rounded-lg border border-[#e5e7eb] bg-white focus:border-[#7ec8e3] focus:outline-none">
                                <option value="all">Any Time</option>
                                <option value="week">Past Week</option>
                                <option value="month">Past Month</option>
                                <option value="year">Past Year</option>
                            </select>
                        </div>
                    </div>

                    <div class="flex justify-end gap-3 mt-6">
                        <button @click="resetFilters" 
                            class="px-4 py-2 text-sm font-medium text-[#555555] hover:text-[#1a1a1a] transition-colors">
                            Reset Filters
                        </button>
                        <button @click="applyFilters" 
                            class="px-6 py-2 bg-[#1a4a6b] text-white rounded-full text-sm font-semibold hover:bg-[#0f2a3f] transition-all">
                            Apply Filters
                        </button>
                    </div>
                </div>
            </transition>

            <!-- Results Grid -->
            <div v-if="hasSearched && searchResults.length > 0" class="space-y-8">
                <!-- Results Summary -->
                <div class="bg-gradient-to-r from-[#7ec8e3]/10 to-transparent p-4 rounded-xl">
                    <div class="flex flex-wrap gap-6 text-sm">
                        <div class="flex items-center gap-2">
                            <span class="font-semibold text-[#1a1a1a]">{{ totalResults }}</span>
                            <span class="text-[#555555]">articles found</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="font-semibold text-[#1a1a1a]">{{ uniqueCategoriesCount }}</span>
                            <span class="text-[#555555]">categories</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="font-semibold text-[#1a1a1a]">{{ uniqueAuthorsCount }}</span>
                            <span class="text-[#555555]">authors</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="font-semibold text-[#1a1a1a]">{{ totalReadingTime }}</span>
                            <span class="text-[#555555]">min read total</span>
                        </div>
                    </div>
                </div>

                <!-- Results List -->
                <div class="space-y-6">
                    <NuxtLink v-for="result in searchResults" :key="result.id"
                        :to="`/${result.slug}`"
                        class="group block bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        
                        <div class="flex flex-col md:flex-row">
                            <!-- Image -->
                            <div class="relative md:w-72 h-48 md:h-auto overflow-hidden">
                                <img :src="result.image" :alt="result.title"
                                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div class="absolute top-4 left-4">
                                    <span class="bg-[#7ec8e3] text-[#1a1a1a] text-xs font-bold px-3 py-1.5 rounded-full">
                                        {{ getCategoryLabel(result.category) }}
                                    </span>
                                </div>
                            </div>
                            
                            <!-- Content -->
                            <div class="flex-1 p-6">
                                <div class="flex items-center gap-3 mb-3">
                                    <img :src="result.authorAvatar" class="w-8 h-8 rounded-full" />
                                    <span class="text-sm text-[#555555]">{{ result.author }}</span>
                                    <span class="w-1 h-1 rounded-full bg-[#7ec8e3]"></span>
                                    <time class="text-sm text-[#555555]">{{ result.date }}</time>
                                    <span class="text-sm text-[#555555]">• {{ result.readTime }} read</span>
                                </div>

                                <h3 class="font-display font-bold text-[#1a1a1a] text-xl md:text-2xl mb-2 group-hover:text-[#1a4a6b] transition-colors">
                                    <span v-html="highlightText(result.title)"></span>
                                </h3>

                                <p class="text-[#555555] leading-relaxed mb-4">
                                    <span v-html="highlightText(result.excerpt)"></span>
                                </p>

                                <div class="flex items-center justify-between pt-3 border-t border-[#e5e7eb]">
                                    <div class="flex items-center gap-4 text-sm text-[#555555]">
                                        <span class="flex items-center gap-1">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                            </svg>
                                            {{ result.likes }} likes
                                        </span>
                                        <span class="flex items-center gap-1">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                                            </svg>
                                            {{ result.comments }} comments
                                        </span>
                                    </div>
                                    <span class="text-[#7ec8e3] font-medium group-hover:translate-x-1 transition-transform">
                                        Read Article →
                                    </span>
                                </div>
                            </div>
                        </div>
                    </NuxtLink>
                </div>

                <!-- Pagination -->
                <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 mt-8">
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
            </div>

            <!-- No Results -->
            <div v-else-if="hasSearched && searchResults.length === 0" class="text-center py-20">
                <div class="text-6xl mb-4">🔍</div>
                <h3 class="font-display font-bold text-[#1a1a1a] text-2xl mb-2">No Results Found</h3>
                <p class="text-[#555555] max-w-md mx-auto mb-6">
                    We couldn't find any articles matching "{{ searchQuery }}". Try different keywords or browse our categories.
                </p>
                <div class="flex flex-wrap gap-4 justify-center">
                    <button @click="clearSearch" 
                        class="px-6 py-3 bg-[#7ec8e3] text-[#1a1a1a] rounded-full font-semibold hover:bg-[#5bb8d4] transition-all">
                        Clear Search
                    </button>
                    <NuxtLink href="/articles" 
                        class="px-6 py-3 bg-white border border-[#e5e7eb] text-[#1a1a1a] rounded-full font-semibold hover:border-[#7ec8e3] transition-all">
                        Browse All Articles
                    </NuxtLink>
                </div>
            </div>

            <!-- Search Suggestions -->
            <div v-if="!hasSearched" class="py-12">
                <h3 class="font-display font-bold text-[#1a1a1a] text-xl mb-6 text-center">Popular Searches</h3>
                <div class="flex flex-wrap gap-3 justify-center">
                    <button v-for="suggestion in popularSearches" :key="suggestion"
                        @click="searchInput = suggestion; performSearch()"
                        class="px-5 py-2 bg-white border border-[#e5e7eb] rounded-full text-sm text-[#555555] hover:border-[#7ec8e3] hover:text-[#1a4a6b] transition-all">
                        {{ suggestion }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Newsletter CTA and Footer are in layout -->
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'nuxt/app'

const route = useRoute()

// ============================================================
// SEO
// ============================================================
useHead({
    title: 'Search | Uncharted with Shayon',
    meta: [
        { name: 'description', content: 'Search through our collection of travel stories, adventure guides, and destination articles. Find the perfect read for your next journey.' },
        { name: 'robots', content: 'noindex, follow' }
    ]
})

// ============================================================
// State
// ============================================================
const searchInput = ref('')
const searchQuery = ref('')
const hasSearched = ref(false)
const showFilters = ref(false)
const currentPage = ref(1)
const itemsPerPage = 10

// Filters
const filters = ref({
    category: 'all',
    sortBy: 'relevance',
    dateRange: 'all'
})

// ============================================================
// Articles Data (from articles page)
// ============================================================
const allArticles = [
    { id: 1, slug: 'himalayan-solo-trek', title: 'Solo Trekking in the Himalayas: A Journey Within', excerpt: 'A 10-day solo expedition through the Annapurna Circuit, discovering inner strength and breathtaking vistas.', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80', category: 'hiking', author: 'Shayon', authorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg', date: '2025-02-28', readTime: 6, likes: 124, comments: 23 },
    { id: 2, slug: 'dolomites-sunrise', title: 'Chasing Sunrise in the Italian Dolomites', excerpt: 'Waking up at 3 AM was worth every moment when the first rays of sun painted the mountains in shades of gold and pink.', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', category: 'hiking', author: 'Elena', authorAvatar: 'https://randomuser.me/api/portraits/women/44.jpg', date: '2025-03-05', readTime: 5, likes: 98, comments: 12 },
    { id: 3, slug: 'patagonia-w-trek', title: 'The W Trek: Patagonia\'s Most Iconic Hike', excerpt: 'Five days of pure adventure through Torres del Paine, witnessing glaciers, turquoise lakes, and jagged peaks.', image: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=800&q=80', category: 'hiking', author: 'Shayon', authorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg', date: '2025-01-20', readTime: 8, likes: 256, comments: 34 },
    { id: 4, slug: 'sahara-starlight', title: 'Starlit Nights in the Sahara Desert', excerpt: 'Sleeping under a blanket of stars in the world\'s largest desert, where silence speaks louder than words.', image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80', category: 'desert', author: 'Aisha', authorAvatar: 'https://randomuser.me/api/portraits/women/68.jpg', date: '2025-03-12', readTime: 5, likes: 203, comments: 18 },
    { id: 5, slug: 'amazon-rainforest', title: 'Into the Heart of the Amazon Rainforest', excerpt: 'A week-long expedition exploring the world\'s most biodiverse ecosystem and meeting indigenous communities.', image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80', category: 'forest', author: 'Shayon', authorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg', date: '2025-03-08', readTime: 9, likes: 187, comments: 32 },
    { id: 6, slug: 'maldives-snorkeling', title: 'Underwater Wonders: Snorkeling in the Maldives', excerpt: 'Swimming with manta rays, sea turtles, and vibrant coral reefs in the Indian Ocean\'s clearest waters.', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80', category: 'beach', author: 'Maya', authorAvatar: 'https://randomuser.me/api/portraits/women/23.jpg', date: '2025-03-03', readTime: 4, likes: 245, comments: 42 },
    { id: 7, slug: 'kyoto-temple-trail', title: 'Kyoto in Autumn: The Ultimate Temple Trail', excerpt: 'Walking through ancient temples surrounded by vibrant autumn colors, experiencing the spiritual heart of Japan.', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80', category: 'culture', author: 'Yuki', authorAvatar: 'https://randomuser.me/api/portraits/women/89.jpg', date: '2024-11-10', readTime: 6, likes: 278, comments: 34 },
    { id: 8, slug: 'camping-yellowstone', title: 'Camping Under the Stars in Yellowstone', excerpt: 'Wildlife encounters, geothermal wonders, and nights spent under some of the darkest skies in America.', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80', category: 'camping', author: 'John', authorAvatar: 'https://randomuser.me/api/portraits/men/52.jpg', date: '2024-09-05', readTime: 7, likes: 198, comments: 23 },
    { id: 9, slug: 'fjords-norway', title: 'Kayaking Through Norway\'s Majestic Fjords', excerpt: 'Paddling between towering cliffs and cascading waterfalls in one of Earth\'s most spectacular natural wonders.', image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=80', category: 'adventure', author: 'Markus', authorAvatar: 'https://randomuser.me/api/portraits/men/45.jpg', date: '2024-07-10', readTime: 7, likes: 234, comments: 31 },
    { id: 10, slug: 'safari-kenya', title: 'The Ultimate Safari Experience in Kenya', excerpt: 'Witnessing the Great Migration and the Big Five in their natural habitat.', image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80', category: 'wildlife', author: 'Grace', authorAvatar: 'https://randomuser.me/api/portraits/women/68.jpg', date: '2024-05-20', readTime: 8, likes: 389, comments: 45 }
]

// ============================================================
// Search Results
// ============================================================
const searchResults = computed(() => {
    if (!hasSearched.value) return []
    
    let results = [...allArticles]
    
    // Search by keyword
    const query = searchQuery.value.toLowerCase()
    results = results.filter(article => 
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query)
    )
    
    // Filter by category
    if (filters.value.category !== 'all') {
        results = results.filter(article => article.category === filters.value.category)
    }
    
    // Filter by date range
    if (filters.value.dateRange !== 'all') {
        const now = new Date()
        const dateRangeDays = {
            week: 7,
            month: 30,
            year: 365,
        } as const
        const range = dateRangeDays[filters.value.dateRange as keyof typeof dateRangeDays]
        if (range === undefined) return results
        
        results = results.filter(article => {
            const articleDate = new Date(article.date)
            const daysDiff = (now.getTime() - articleDate.getTime()) / (1000 * 3600 * 24)
            return daysDiff <= range
        })
    }
    
    // Sort results
    switch(filters.value.sortBy) {
        case 'latest':
            results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            break
        case 'oldest':
            results.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            break
        case 'popular':
            results.sort((a, b) => b.likes - a.likes)
            break
        case 'relevance':
        default:
            // Relevance scoring based on keyword matches
            results.sort((a, b) => {
                const scoreA = getRelevanceScore(a, searchQuery.value)
                const scoreB = getRelevanceScore(b, searchQuery.value)
                return scoreB - scoreA
            })
            break
    }
    
    return results
})

const getRelevanceScore = (article: any, query: string) => {
    const q = query.toLowerCase()
    let score = 0
    if (article.title.toLowerCase().includes(q)) score += 10
    if (article.excerpt.toLowerCase().includes(q)) score += 3
    if (article.author.toLowerCase().includes(q)) score += 2
    if (article.title.toLowerCase().startsWith(q)) score += 5
    return score
}

const totalResults = computed(() => searchResults.value.length)
const totalPages = computed(() => Math.ceil(searchResults.value.length / itemsPerPage))
const paginatedResults = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return searchResults.value.slice(start, end)
})

const uniqueCategoriesCount = computed(() => {
    const categories = new Set(searchResults.value.map(r => r.category))
    return categories.size
})

const uniqueAuthorsCount = computed(() => {
    const authors = new Set(searchResults.value.map(r => r.author))
    return authors.size
})

const totalReadingTime = computed(() => {
    return searchResults.value.reduce((sum, r) => sum + r.readTime, 0)
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

// ============================================================
// Methods
// ============================================================
const performSearch = () => {
    if (searchInput.value.trim()) {
        searchQuery.value = searchInput.value.trim()
        hasSearched.value = true
        currentPage.value = 1
        
        // Update URL with search query
        navigateTo({ query: { q: searchQuery.value } }, { replace: true })
    }
}

const applyFilters = () => {
    currentPage.value = 1
    showFilters.value = false
}

const resetFilters = () => {
    filters.value = {
        category: 'all',
        sortBy: 'relevance',
        dateRange: 'all'
    }
    currentPage.value = 1
    showFilters.value = false
}

const clearSearch = () => {
    searchInput.value = ''
    searchQuery.value = ''
    hasSearched.value = false
    currentPage.value = 1
    navigateTo({ query: {} }, { replace: true })
}

const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
        hiking: 'Hiking 🥾',
        desert: 'Desert 🏜️',
        forest: 'Forest 🌲',
        beach: 'Beach 🏖️',
        culture: 'Culture 🏛️',
        camping: 'Camping ⛺',
        adventure: 'Adventure ⚡',
        wildlife: 'Wildlife 🦁'
    }
    return labels[category] || category
}

const highlightText = (text: string) => {
    if (!searchQuery.value) return text
    const regex = new RegExp(`(${searchQuery.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    return text.replace(regex, '<mark class="bg-[#7ec8e3]/30 text-[#1a1a1a] px-0.5 rounded">$1</mark>')
}

// Popular searches
const popularSearches = [
    'Himalayas', 'Patagonia', 'Sahara', 'Kyoto', 'Maldives', 
    'Camping', 'Hiking', 'Beach', 'Adventure', 'Wildlife'
]

// ============================================================
// Watch for URL query param
// ============================================================
onMounted(() => {
    const query = route.query.q as string
    if (query) {
        searchInput.value = query
        performSearch()
    }
})

// Reset page when filters change
watch([() => filters.value.category, () => filters.value.sortBy, () => filters.value.dateRange], () => {
    currentPage.value = 1
})
</script>

<style scoped lang="scss">
// Slide down animation
.slide-down-enter-active,
.slide-down-leave-active {
    transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

// Highlight styles
:deep(mark) {
    background-color: rgba(126, 200, 227, 0.3);
    color: #1a1a1a;
    padding: 0 2px;
    border-radius: 4px;
}

// Animation
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.result-item {
    animation: fadeInUp 0.4s ease-out forwards;
}
</style>