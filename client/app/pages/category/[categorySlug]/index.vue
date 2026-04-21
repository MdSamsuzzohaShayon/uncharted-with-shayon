<template>
    <div class="w-full" v-if="categoryData">
        <!-- ================================================================
           CATEGORY HERO SECTION
      ================================================================ -->
        <header>
            <section class="relative min-h-[70vh] flex flex-col overflow-hidden" aria-label="Category header">
                <div class="absolute inset-0 z-0" aria-hidden="true">
                    <div class="absolute inset-0 bg-gradient-to-br from-[#1a1a1a]/85 via-[#1a4a6b]/70 to-[#0f2a3f]/80 z-10"></div>
                    <div class="hero-parallax w-full h-full bg-cover bg-center"
                         :style="{ backgroundImage: `url(${categoryData.heroImage})` }">
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#f9fafc] to-transparent z-20"></div>
                </div>

                <Navbar />

                <main class="flex-1 flex items-center px-6 md:px-12 lg:px-20 py-20 relative z-20">
                    <div class="w-full text-center">
                        <div class="inline-flex items-center gap-3 bg-white/15 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/20">
                            <span class="text-4xl">{{ categoryData.icon }}</span>
                            <span class="text-[#7ec8e3] text-sm font-semibold tracking-[0.2em] uppercase">{{ categoryData.name }}</span>
                        </div>
                        <h1 class="font-display font-black text-white text-6xl md:text-7xl lg:text-8xl mb-6 leading-none">
                            {{ categoryData.title }}
                        </h1>
                        <div class="w-24 h-1 bg-[#7ec8e3] mx-auto mb-6 rounded-full"></div>
                        <p class="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            {{ categoryData.description }}
                        </p>
                        <div class="mt-10 flex items-center justify-center gap-6 text-white/60 text-sm">
                            <div class="flex items-center gap-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"></path>
                                </svg>
                                <span>{{ storiesCount }} Stories</span>
                            </div>
                            <div class="w-1 h-1 bg-[#7ec8e3] rounded-full"></div>
                            <div class="flex items-center gap-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span>{{ avgReadTime }} min read</span>
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
           CATEGORY STATS BAR
      ================================================================ -->
        <div class="bg-white border-b border-[#e5e7eb] sticky top-0 z-30">
            <div class="px-6 md:px-12 lg:px-20 py-4">
                <div class="flex flex-wrap items-center justify-between gap-4">
                    <div class="flex items-center gap-6">
                        <div class="flex items-center gap-2">
                            <div class="w-10 h-10 rounded-full bg-[#7ec8e3]/10 flex items-center justify-center">
                                <span class="text-xl">{{ categoryData.icon }}</span>
                            </div>
                            <div>
                                <p class="text-xs text-[#555555]">Category</p>
                                <p class="font-semibold text-[#1a1a1a]">{{ categoryData.name }}</p>
                            </div>
                        </div>
                        <div class="w-px h-8 bg-[#e5e7eb]"></div>
                        <div>
                            <p class="text-xs text-[#555555]">Total Stories</p>
                            <p class="font-semibold text-[#1a1a1a]">{{ storiesCount }}</p>
                        </div>
                        <div class="w-px h-8 bg-[#e5e7eb] hidden sm:block"></div>
                        <div class="hidden sm:block">
                            <p class="text-xs text-[#555555]">Avg. Read Time</p>
                            <p class="font-semibold text-[#1a1a1a]">{{ avgReadTime }} min</p>
                        </div>
                    </div>
                    
                    <div class="flex gap-2">
                        <button v-for="sort in sortOptions" :key="sort.value"
                            @click="activeSort = sort.value"
                            :class="[
                                'px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300',
                                activeSort === sort.value
                                    ? 'bg-[#1a4a6b] text-white'
                                    : 'bg-[#f0f0f0] text-[#555555] hover:bg-[#e5e7eb]'
                            ]">
                            {{ sort.label }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- ================================================================
           FEATURED STORY
      ================================================================ -->
        <section v-if="featuredStory" class="px-6 md:px-12 lg:px-20 pt-16 pb-12">
            <div class="mb-8">
                <p class="text-[#7ec8e3] text-xs font-semibold tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
                    <span class="w-8 h-px bg-[#7ec8e3]"></span> 
                    Featured Story
                </p>
                <h2 class="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl">Must Read</h2>
            </div>

            <NuxtLink :to="`/story/${featuredStory.slug}`" class="group block">
                <div class="relative rounded-3xl overflow-hidden bg-white border border-[#e5e7eb] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <div class="relative h-[500px] md:h-[550px] overflow-hidden">
                        <img :src="featuredStory.image" :alt="featuredStory.title"
                             class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                        
                        <div class="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                            <div class="max-w-3xl">
                                <div class="flex items-center gap-4 mb-4">
                                    <div class="flex items-center gap-2">
                                        <img :src="featuredStory.authorAvatar" class="w-10 h-10 rounded-full border-2 border-[#7ec8e3]" />
                                        <span class="font-medium">{{ featuredStory.author }}</span>
                                    </div>
                                    <span class="text-white/60">{{ featuredStory.date }}</span>
                                    <span class="text-white/60">• {{ featuredStory.readTime }} read</span>
                                </div>
                                <h3 class="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4 group-hover:text-[#7ec8e3] transition-colors duration-300">
                                    {{ featuredStory.title }}
                                </h3>
                                <p class="text-white/80 text-lg leading-relaxed mb-6 line-clamp-2">
                                    {{ featuredStory.excerpt }}
                                </p>
                                <div class="inline-flex items-center gap-2 text-[#7ec8e3] font-semibold group-hover:gap-3 transition-all">
                                    Read Full Story
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </NuxtLink>
        </section>

        <!-- ================================================================
           ALL STORIES GRID
      ================================================================ -->
        <section class="px-6 md:px-12 lg:px-20 py-16">
            <div class="mb-12">
                <h2 class="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl mb-4">
                    All {{ categoryData.name }} Stories
                </h2>
                <p class="text-[#555555] text-lg">Discover inspiring adventures and travel guides from this category</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <NuxtLink v-for="story in sortedStories" :key="story.id"
                          :to="`/story/${story.slug}`"
                          class="group relative rounded-2xl overflow-hidden bg-white border border-[#e5e7eb] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    
                    <div class="relative h-64 overflow-hidden">
                        <img :src="story.image" :alt="story.title"
                             class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div class="absolute top-4 left-4">
                            <span class="bg-[#7ec8e3] text-[#1a1a1a] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                {{ story.category }}
                            </span>
                        </div>
                        
                        <div class="absolute top-4 right-4">
                            <span class="bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                {{ story.readTime }}
                            </span>
                        </div>
                        
                        <div class="absolute bottom-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                            <div class="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                                <svg class="w-5 h-5 text-[#1a4a6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="p-6">
                        <div class="flex items-center gap-3 mb-3">
                            <div class="flex items-center gap-2">
                                <img :src="story.authorAvatar" class="w-6 h-6 rounded-full" />
                                <span class="text-xs text-[#555555]">{{ story.author }}</span>
                            </div>
                            <span class="w-1 h-1 rounded-full bg-[#7ec8e3]"></span>
                            <time class="text-[#555555] text-xs">{{ story.date }}</time>
                        </div>

                        <h3 class="font-display font-bold text-[#1a1a1a] text-xl leading-snug mb-3 group-hover:text-[#1a4a6b] transition-colors duration-300 line-clamp-2">
                            {{ story.title }}
                        </h3>

                        <p class="text-[#555555] text-sm leading-relaxed line-clamp-3 mb-4">
                            {{ story.excerpt }}
                        </p>

                        <div class="flex items-center justify-between pt-4 border-t border-[#e5e7eb]">
                            <div class="flex items-center gap-3 text-xs text-[#555555]">
                                <span class="flex items-center gap-1">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                    </svg>
                                    {{ story.likes }}
                                </span>
                                <span class="flex items-center gap-1">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                                    </svg>
                                    {{ story.comments }}
                                </span>
                            </div>
                            <span class="text-[#7ec8e3] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Read →
                            </span>
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </section>

        <!-- ================================================================
           RELATED DESTINATIONS
      ================================================================ -->
        <section class="bg-[#f9fafc] py-20">
            <div class="px-6 md:px-12 lg:px-20">
                <div class="text-center mb-12">
                    <p class="text-[#7ec8e3] text-xs font-semibold tracking-[0.2em] uppercase mb-3 flex items-center justify-center gap-2">
                        <span class="w-8 h-px bg-[#7ec8e3]"></span> 
                        Explore More 
                        <span class="w-8 h-px bg-[#7ec8e3]"></span>
                    </p>
                    <h2 class="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl">
                        Top {{ categoryData.name }} Destinations
                    </h2>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div v-for="dest in relatedDestinations" :key="dest.name"
                         class="group relative rounded-2xl overflow-hidden cursor-pointer aspect-square">
                        <img :src="dest.image" :alt="dest.name" 
                             class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-all duration-300"></div>
                        <div class="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <p class="text-white font-bold text-lg mb-1">{{ dest.name }}</p>
                            <p class="text-white/70 text-sm">{{ dest.country }}</p>
                            <div class="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span class="text-[#7ec8e3] text-xs font-semibold">Explore →</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ================================================================
           POPULAR TIPS & GUIDES
      ================================================================ -->
        <section class="px-6 md:px-12 lg:px-20 py-20">
            <div class="text-center mb-12">
                <p class="text-[#7ec8e3] text-xs font-semibold tracking-[0.2em] uppercase mb-3 flex items-center justify-center gap-2">
                    <span class="w-8 h-px bg-[#7ec8e3]"></span> 
                    Insider Tips 
                    <span class="w-8 h-px bg-[#7ec8e3]"></span>
                </p>
                <h2 class="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl">Essential {{ categoryData.name }} Guides</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div v-for="tip in travelTips" :key="tip.title" 
                     class="group bg-white border border-[#e5e7eb] rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div class="w-12 h-12 rounded-full bg-[#7ec8e3]/10 flex items-center justify-center mb-4 group-hover:bg-[#7ec8e3] transition-colors">
                        <span class="text-2xl group-hover:scale-110 transition-transform">{{ tip.icon }}</span>
                    </div>
                    <h3 class="font-display font-bold text-[#1a1a1a] text-lg mb-2">{{ tip.title }}</h3>
                    <p class="text-[#555555] text-sm leading-relaxed mb-4">{{ tip.description }}</p>
                    <NuxtLink :to="tip.link" class="text-[#7ec8e3] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read Guide
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </NuxtLink>
                </div>
            </div>
        </section>
    </div>

    <!-- Not Found State -->
    <div v-else class="min-h-screen flex items-center justify-center px-6">
        <div class="text-center max-w-md">
            <div class="text-6xl mb-4">🔍</div>
            <h2 class="font-display font-bold text-2xl text-[#1a1a1a] mb-2">Category Not Found</h2>
            <p class="text-[#555555] mb-6">The category you're looking for doesn't exist.</p>
            <NuxtLink href="/" 
                class="inline-block px-6 py-3 bg-[#7ec8e3] text-[#1a1a1a] rounded-full font-semibold hover:bg-[#5bb8d4] transition-all">
                Back to Home
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'nuxt/app'

const route = useRoute()
const categorySlug = computed(() => route.params.slug as string)

// ============================================================
// Sort Options
// ============================================================
const sortOptions = [
    { value: 'latest', label: 'Latest' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'trending', label: 'Trending' }
]
const activeSort = ref('latest')

// ============================================================
// Category Data (Static)
// ============================================================
const categoryData = computed(() => {
    const categories: Record<string, any> = {
        hiking: {
            name: 'Hiking',
            slug: 'hiking',
            icon: '🥾',
            title: 'Mountain Trails',
            heroImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1600&q=80',
            description: 'Conquer peaks, traverse scenic trails, and discover breathtaking mountain vistas around the world.',
            color: '#4c9f70'
        },
        desert: {
            name: 'Desert',
            slug: 'desert',
            icon: '🏜️',
            title: 'Desert Dreams',
            heroImage: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1600&q=80',
            description: 'Embrace the silence of golden dunes, starlit skies, and timeless desert landscapes.',
            color: '#e6b17e'
        },
        forest: {
            name: 'Forest',
            slug: 'forest',
            icon: '🌲',
            title: 'Forest Whispers',
            heroImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80',
            description: 'Wander through ancient woodlands, discover hidden waterfalls, and reconnect with nature.',
            color: '#2d6a4f'
        },
        beach: {
            name: 'Beach',
            slug: 'beach',
            icon: '🏖️',
            title: 'Coastal Paradise',
            heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80',
            description: 'Explore pristine coastlines, turquoise waters, and tropical paradises around the world.',
            color: '#48cae4'
        },
        culture: {
            name: 'Culture',
            slug: 'culture',
            icon: '🏛️',
            title: 'Cultural Odyssey',
            heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1600&q=80',
            description: 'Immerse yourself in local traditions, historic sites, and authentic experiences.',
            color: '#9c89b8'
        },
        camping: {
            name: 'Camping',
            slug: 'camping',
            icon: '⛺',
            title: 'Camping Escapes',
            heroImage: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1600&q=80',
            description: 'Sleep under the stars, gather around campfires, and embrace outdoor adventures.',
            color: '#d4a373'
        }
    }
    return categories[categorySlug.value] || null
})

// ============================================================
// Stories Data (Static)
// ============================================================
const allStories = [
    // Hiking Stories
    {
        id: 1,
        slug: 'himalayan-solo-trek',
        title: 'Solo Trekking in the Himalayas: A Journey Within',
        excerpt: 'A 10-day solo expedition through the Annapurna Circuit, discovering inner strength and breathtaking vistas along the way.',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
        category: 'Hiking',
        author: 'Shayon',
        authorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        date: 'Feb 28, 2025',
        readTime: '6 min read',
        likes: 124,
        comments: 23,
        featured: true
    },
    {
        id: 2,
        slug: 'dolomites-sunrise',
        title: 'Chasing Sunrise in the Italian Dolomites',
        excerpt: 'Waking up at 3 AM was worth every moment when the first rays of sun painted the mountains in shades of gold and pink.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        category: 'Hiking',
        author: 'Elena',
        authorAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        date: 'Mar 5, 2025',
        readTime: '5 min read',
        likes: 98,
        comments: 12,
        featured: false
    },
    {
        id: 3,
        slug: 'patagonia-w-trek',
        title: 'The W Trek: Patagonia\'s Most Iconic Hike',
        excerpt: 'Five days of pure adventure through Torres del Paine, witnessing glaciers, turquoise lakes, and jagged peaks.',
        image: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=800&q=80',
        category: 'Hiking',
        author: 'Shayon',
        authorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        date: 'Jan 20, 2025',
        readTime: '8 min read',
        likes: 256,
        comments: 34,
        featured: false
    },
    {
        id: 4,
        slug: 'swiss-alps-traverse',
        title: 'Traversing the Swiss Alps: A Photographer\'s Dream',
        excerpt: 'Capturing the beauty of the Matterhorn, Jungfrau, and hidden alpine lakes in Switzerland.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        category: 'Hiking',
        author: 'Markus',
        authorAvatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        date: 'Dec 10, 2024',
        readTime: '7 min read',
        likes: 189,
        comments: 28,
        featured: false
    },
    
    // Desert Stories
    {
        id: 5,
        slug: 'sahara-starlight',
        title: 'Starlit Nights in the Sahara Desert',
        excerpt: 'Sleeping under a blanket of stars in the world\'s largest desert, where silence speaks louder than words.',
        image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80',
        category: 'Desert',
        author: 'Aisha',
        authorAvatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        date: 'Mar 12, 2025',
        readTime: '5 min read',
        likes: 203,
        comments: 18,
        featured: true
    },
    {
        id: 6,
        slug: 'wadi-rum-adventure',
        title: 'Wadi Rum: Mars on Earth',
        excerpt: 'Exploring the red desert of Jordan, climbing massive rock formations, and Bedouin hospitality.',
        image: 'https://images.unsplash.com/photo-1549755391-01b4ccde7a9c?w=800&q=80',
        category: 'Desert',
        author: 'Omar',
        authorAvatar: 'https://randomuser.me/api/portraits/men/52.jpg',
        date: 'Feb 15, 2025',
        readTime: '6 min read',
        likes: 167,
        comments: 21,
        featured: false
    },
    
    // Forest Stories
    {
        id: 7,
        slug: 'amazon-rainforest',
        title: 'Into the Heart of the Amazon Rainforest',
        excerpt: 'A week-long expedition exploring the world\'s most biodiverse ecosystem and meeting indigenous communities.',
        image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80',
        category: 'Forest',
        author: 'Shayon',
        authorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        date: 'Mar 8, 2025',
        readTime: '9 min read',
        likes: 187,
        comments: 32,
        featured: true
    },
    {
        id: 8,
        slug: 'black-forest-germany',
        title: 'Mysteries of the Black Forest',
        excerpt: 'Hiking through ancient woodlands, discovering cuckoo clocks, and German folklore.',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
        category: 'Forest',
        author: 'Sophie',
        authorAvatar: 'https://randomuser.me/api/portraits/women/23.jpg',
        date: 'Jan 28, 2025',
        readTime: '5 min read',
        likes: 134,
        comments: 15,
        featured: false
    },
    
    // Beach Stories
    {
        id: 9,
        slug: 'maldives-snorkeling',
        title: 'Underwater Wonders: Snorkeling in the Maldives',
        excerpt: 'Swimming with manta rays, sea turtles, and vibrant coral reefs in the Indian Ocean\'s clearest waters.',
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
        category: 'Beach',
        author: 'Maya',
        authorAvatar: 'https://randomuser.me/api/portraits/women/23.jpg',
        date: 'Mar 3, 2025',
        readTime: '4 min read',
        likes: 245,
        comments: 42,
        featured: true
    },
    {
        id: 10,
        slug: 'santorini-sunset',
        title: 'Santorini: The Most Beautiful Sunset on Earth',
        excerpt: 'Experiencing the magic of Oia, white-washed buildings, and the Aegean Sea.',
        image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80',
        category: 'Beach',
        author: 'Nikos',
        authorAvatar: 'https://randomuser.me/api/portraits/men/38.jpg',
        date: 'Feb 20, 2025',
        readTime: '6 min read',
        likes: 312,
        comments: 56,
        featured: false
    }
]

// ============================================================
// Filtered Stories (Safe)
// ============================================================
const filteredStories = computed(() => {
    if (!categoryData.value) return []
    const categoryName = categoryData.value.name
    return allStories.filter(story => story.category === categoryName)
})

const featuredStory = computed(() => {
    const stories = filteredStories.value
    if (stories.length === 0) return null
    return stories.find(story => story.featured) || stories[0]
})

const sortedStories = computed(() => {
    const stories = filteredStories.value.filter(s => s.id !== featuredStory.value?.id)
    
    if (stories.length === 0) return []
    
    switch(activeSort.value) {
        case 'latest':
            return [...stories].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        case 'popular':
            return [...stories].sort((a, b) => b.likes - a.likes)
        case 'trending':
            return [...stories].sort((a, b) => (b.likes + b.comments) - (a.likes + a.comments))
        default:
            return stories
    }
})

const storiesCount = computed(() => filteredStories.value.length)
const avgReadTime = computed(() => {
    const stories = filteredStories.value
    if (stories.length === 0) return 6
    const total = stories.reduce((sum, story) => {
        const minutes = parseInt(story.readTime) || 5
        return sum + minutes
    }, 0)
    return Math.round(total / stories.length)
})
const totalLikes = computed(() => {
    return filteredStories.value.reduce((sum, story) => sum + story.likes, 0)
})

// ============================================================
// Related Destinations (Safe)
// ============================================================
const relatedDestinations = computed(() => {
    if (!categoryData.value) return []
    
    const destinationsByCategory: Record<string, any[]> = {
        hiking: [
            { name: 'Swiss Alps', country: 'Switzerland', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80' },
            { name: 'Patagonia', country: 'Argentina', image: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=600&q=80' },
            { name: 'Himalayas', country: 'Nepal', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80' },
            { name: 'Dolomites', country: 'Italy', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80' }
        ],
        desert: [
            { name: 'Sahara', country: 'Morocco', image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80' },
            { name: 'Atacama', country: 'Chile', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80' },
            { name: 'Wadi Rum', country: 'Jordan', image: 'https://images.unsplash.com/photo-1549755391-01b4ccde7a9c?w=600&q=80' },
            { name: 'Death Valley', country: 'USA', image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80' }
        ],
        forest: [
            { name: 'Amazon', country: 'Brazil', image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=80' },
            { name: 'Black Forest', country: 'Germany', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80' },
            { name: 'Redwood', country: 'USA', image: 'https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=600&q=80' },
            { name: 'Jiuzhaigou', country: 'China', image: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?w=600&q=80' }
        ],
        beach: [
            { name: 'Maldives', country: 'Maldives', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80' },
            { name: 'Santorini', country: 'Greece', image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&q=80' },
            { name: 'Bora Bora', country: 'French Polynesia', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80' },
            { name: 'Phi Phi Islands', country: 'Thailand', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80' }
        ],
        culture: [
            { name: 'Kyoto', country: 'Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80' },
            { name: 'Rome', country: 'Italy', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80' },
            { name: 'Machu Picchu', country: 'Peru', image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&q=80' },
            { name: 'Angkor Wat', country: 'Cambodia', image: 'https://images.unsplash.com/photo-1502301197179-65228ab524f2?w=600&q=80' }
        ],
        camping: [
            { name: 'Banff', country: 'Canada', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80' },
            { name: 'Lake District', country: 'UK', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80' },
            { name: 'Yosemite', country: 'USA', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80' },
            { name: 'Milford Sound', country: 'New Zealand', image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=600&q=80' }
        ]
    }
    return destinationsByCategory[categoryData.value.slug] || destinationsByCategory.hiking
})

// ============================================================
// Travel Tips (Safe)
// ============================================================
const travelTips = computed(() => {
    if (!categoryData.value) return []
    
    const tipsByCategory: Record<string, any[]> = {
        hiking: [
            { icon: '🥾', title: 'Essential Hiking Gear', description: 'Proper footwear, layers, navigation tools, and emergency supplies for safe adventures.', link: '/guides/hiking-gear' },
            { icon: '📱', title: 'Navigation Apps', description: 'Best offline maps and GPS apps for mountain trails and remote areas.', link: '/guides/navigation-apps' },
            { icon: '🏔️', title: 'Altitude Acclimatization', description: 'Tips for preventing altitude sickness and staying safe at high elevations.', link: '/guides/altitude-safety' }
        ],
        desert: [
            { icon: '💧', title: 'Hydration Strategies', description: 'Essential tips for staying hydrated and safe in extreme desert conditions.', link: '/guides/desert-hydration' },
            { icon: '🧥', title: 'Desert Clothing Guide', description: 'What to wear for day and night in the desert for comfort and protection.', link: '/guides/desert-clothing' },
            { icon: '🏜️', title: 'Navigating the Dunes', description: 'Tips for desert navigation, vehicle safety, and avoiding common pitfalls.', link: '/guides/desert-navigation' }
        ],
        forest: [
            { icon: '🌿', title: 'Leave No Trace', description: 'Essential principles for responsible forest exploration and conservation.', link: '/guides/leave-no-trace' },
            { icon: '🐾', title: 'Wildlife Safety', description: 'How to safely encounter and observe wildlife in forest environments.', link: '/guides/wildlife-safety' },
            { icon: '🧭', title: 'Forest Navigation', description: 'Tips for staying oriented in dense forest terrain.', link: '/guides/forest-navigation' }
        ],
        beach: [
            { icon: '🏊', title: 'Water Safety', description: 'Essential tips for safe swimming and water activities.', link: '/guides/water-safety' },
            { icon: '☀️', title: 'Sun Protection', description: 'How to protect your skin while enjoying tropical beaches.', link: '/guides/sun-protection' },
            { icon: '🐠', title: 'Marine Life', description: 'Respecting coral reefs and marine ecosystems.', link: '/guides/marine-life' }
        ]
    }
    return tipsByCategory[categoryData.value.slug] || [
        { icon: '📸', title: 'Photography Tips', description: 'Capture the best moments with these pro photography techniques.', link: '/guides/photography' },
        { icon: '🎒', title: 'Packing Essentials', description: 'Must-have items for your next adventure.', link: '/guides/packing' },
        { icon: '🌍', title: 'Local Customs', description: 'Respect local cultures with these essential etiquette tips.', link: '/guides/customs' }
    ]
})

// SEO
useHead(() => ({
    title: categoryData.value ? `${categoryData.value.name} Stories | Uncharted with Shayon` : 'Category | Uncharted with Shayon',
    meta: [
        { name: 'description', content: categoryData.value?.description || 'Explore amazing travel stories and adventures.' },
        { name: 'keywords', content: categoryData.value ? `${categoryData.value.name}, travel, adventure, stories` : 'travel, adventure' }
    ]
}))
</script>

<style scoped lang="scss">
.hero-parallax {
    will-change: transform;
    transform: scale(1.05);
}

@keyframes bounce {
    0%, 100% {
        transform: translateY(-25%) translateX(-50%);
    }
    50% {
        transform: translateY(0) translateX(-50%);
    }
}

.animate-bounce {
    animation: bounce 2s infinite;
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