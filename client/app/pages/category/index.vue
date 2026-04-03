<template>
    <div class="w-full">
        <!-- ================================================================
           CATEGORY HERO SECTION
      ================================================================ -->
        <header>
            <section v-if="currentCategoryData" class="relative min-h-[60vh] flex flex-col overflow-hidden" aria-label="Category header">
                <!-- Background image with parallax effect -->
                <div class="absolute inset-0 z-0" aria-hidden="true">
                    <div class="absolute inset-0 bg-gradient-to-br from-[#1a1a1a]/90 via-[#1a4a6b]/70 to-[#0f2a3f]/80 z-10"></div>
                    <div class="hero-bg-layer w-full h-full bg-cover bg-center bg-fixed"
                         :style="{ backgroundImage: `url(${currentCategoryData.heroImage})` }"></div>
                    <div class="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#f9fafc] to-transparent z-20"></div>
                </div>

                <!-- Navbar -->
                <Navbar />

                <!-- Hero Content -->
                <main class="flex-1 flex items-center px-6 md:px-12 lg:px-20 py-20 relative z-20">
                    <div class="w-full text-center animate-fade-in-up">
                        <div class="inline-flex items-center gap-3 bg-white/15 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/20">
                            <span class="text-3xl animate-bounce-slow">{{ currentCategoryData.icon }}</span>
                            <span class="text-[#7ec8e3] text-sm font-semibold tracking-[0.2em] uppercase">{{ currentCategoryData.label }}</span>
                        </div>
                        <h1 class="font-display font-black text-white text-6xl md:text-7xl lg:text-8xl mb-6 leading-none">
                            {{ currentCategoryData.title }}
                        </h1>
                        <div class="w-24 h-1 bg-[#7ec8e3] mx-auto mb-6 rounded-full"></div>
                        <p class="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            {{ currentCategoryData.description }}
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
                        </div>
                    </div>
                </main>
            </section>
        </header>

        <!-- ================================================================
           CATEGORY FILTER TABS (Visual enhancement only)
      ================================================================ -->
        <div class="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#e5e7eb] shadow-sm">
            <div class="px-6 md:px-12 lg:px-20">
                <div class="flex items-center justify-center gap-2 overflow-x-auto scrollbar-hide py-4">
                    <NuxtLink v-for="category in allCategories" :key="category.slug"
                        :to="`/category/${category.slug}`"
                        :class="[
                            'group relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap',
                            category.slug === currentCategorySlug
                                ? 'bg-gradient-to-r from-[#1a4a6b] to-[#7ec8e3] text-white shadow-lg shadow-[#1a4a6b]/30'
                                : 'text-[#555555] hover:text-[#1a1a1a] hover:bg-[#f0f0f0]'
                        ]">
                        <span class="flex items-center gap-2">
                            <span class="text-lg">{{ category.icon }}</span>
                            <span>{{ category.label }}</span>
                        </span>
                        <span v-if="category.slug === currentCategorySlug" 
                              class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-[#7ec8e3] rounded-full"></span>
                    </NuxtLink>
                </div>
            </div>
        </div>

        <!-- ================================================================
           FEATURED STORY (Large hero card)
      ================================================================ -->
        <section class="px-6 md:px-12 lg:px-20 pt-16 pb-12">
            <div class="mb-12 text-center">
                <p class="text-[#7ec8e3] text-xs font-semibold tracking-[0.2em] uppercase mb-3 flex items-center justify-center gap-2">
                    <span class="w-8 h-px bg-[#7ec8e3]"></span> 
                    Featured Story 
                    <span class="w-8 h-px bg-[#7ec8e3]"></span>
                </p>
                <h2 class="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl">Editor's Pick</h2>
            </div>

            <NuxtLink href="/story/featured" class="group block">
                <div class="relative rounded-3xl overflow-hidden bg-white border border-[#e5e7eb] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <div class="relative h-[500px] md:h-[600px] overflow-hidden">
                        <img :src="featuredStory.image" :alt="featuredStory.title"
                             class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                        
                        <!-- Category Badge -->
                        <div class="absolute top-8 left-8 flex gap-3">
                            <span class="bg-[#7ec8e3] text-[#1a1a1a] text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                                {{ featuredStory.category }}
                            </span>
                        </div>
                        
                        <!-- Content Overlay -->
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
           ARTICLES GRID (Masonry style)
      ================================================================ -->
        <section class="px-6 md:px-12 lg:px-20 py-12" v-if="currentCategoryData">
            <div class="mb-12">
                <h2 class="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl mb-4">All {{ currentCategoryData.title }} Stories</h2>
                <p class="text-[#555555] text-lg">Discover our collection of inspiring adventures and travel guides</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <NuxtLink v-for="(article, index) in articles" :key="article.id"
                          :href="`/story/${article.slug}`"
                          class="group relative rounded-2xl overflow-hidden bg-white border border-[#e5e7eb] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
                          :style="{ animationDelay: `${index * 0.1}s` }">
                    
                    <!-- Image Container with Overlay -->
                    <div class="relative h-64 overflow-hidden">
                        <img :src="article.image" :alt="article.title"
                             class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <!-- Category Badge -->
                        <div class="absolute top-4 left-4">
                            <span class="bg-[#7ec8e3] text-[#1a1a1a] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                {{ article.category }}
                            </span>
                        </div>
                        
                        <!-- Floating Icon (on hover) -->
                        <div class="absolute bottom-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                            <div class="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                                <svg class="w-5 h-5 text-[#1a4a6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Content -->
                    <div class="p-6">
                        <div class="flex items-center gap-3 mb-3">
                            <div class="flex items-center gap-2">
                                <img :src="article.authorAvatar" class="w-6 h-6 rounded-full" />
                                <span class="text-xs text-[#555555]">{{ article.author }}</span>
                            </div>
                            <span class="w-1 h-1 rounded-full bg-[#7ec8e3]"></span>
                            <time class="text-[#555555] text-xs">{{ article.date }}</time>
                        </div>

                        <h3 class="font-display font-bold text-[#1a1a1a] text-xl leading-snug mb-3 group-hover:text-[#1a4a6b] transition-colors duration-300 line-clamp-2">
                            {{ article.title }}
                        </h3>

                        <p class="text-[#555555] text-sm leading-relaxed line-clamp-3 mb-4">
                            {{ article.excerpt }}
                        </p>

                        <div class="flex items-center justify-between pt-4 border-t border-[#e5e7eb]">
                            <div class="flex items-center gap-3 text-xs text-[#555555]">
                                <span class="flex items-center gap-1">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    {{ article.readTime }}
                                </span>
                                <span class="flex items-center gap-1">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                    </svg>
                                    {{ article.likes }}
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
           STATISTICS SECTION
      ================================================================ -->
        <section class="bg-gradient-to-br from-[#1a1a1a] to-[#1a4a6b] py-20 my-12">
            <div class="px-6 md:px-12 lg:px-20">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div class="stat-item animate-fade-in-up" style="animation-delay: 0s">
                        <div class="text-5xl md:text-6xl font-display font-bold text-[#7ec8e3] mb-3">{{ storiesCount }}+</div>
                        <p class="text-white/70 text-sm uppercase tracking-wider">Adventure Stories</p>
                    </div>
                    <div class="stat-item animate-fade-in-up" style="animation-delay: 0.1s">
                        <div class="text-5xl md:text-6xl font-display font-bold text-[#7ec8e3] mb-3">{{ destinationsCount }}</div>
                        <p class="text-white/70 text-sm uppercase tracking-wider">Destinations</p>
                    </div>
                    <div class="stat-item animate-fade-in-up" style="animation-delay: 0.2s">
                        <div class="text-5xl md:text-6xl font-display font-bold text-[#7ec8e3] mb-3">{{ totalPhotos }}+</div>
                        <p class="text-white/70 text-sm uppercase tracking-wider">Stunning Photos</p>
                    </div>
                    <div class="stat-item animate-fade-in-up" style="animation-delay: 0.3s">
                        <div class="text-5xl md:text-6xl font-display font-bold text-[#7ec8e3] mb-3">{{ totalMiles }}+</div>
                        <p class="text-white/70 text-sm uppercase tracking-wider">Miles Explored</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ================================================================
           FEATURED DESTINATIONS GALLERY
      ================================================================ -->
        <section class="px-6 md:px-12 lg:px-20 py-16" v-if="currentCategoryData">
            <div class="text-center mb-12">
                <p class="text-[#7ec8e3] text-xs font-semibold tracking-[0.2em] uppercase mb-3 flex items-center justify-center gap-2">
                    <span class="w-8 h-px bg-[#7ec8e3]"></span> 
                    Must-Visit Places 
                    <span class="w-8 h-px bg-[#7ec8e3]"></span>
                </p>
                <h2 class="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl">Top {{ currentCategoryData.title }} Destinations</h2>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div v-for="(dest, index) in destinations" :key="dest.name"
                     class="group relative rounded-2xl overflow-hidden cursor-pointer aspect-square animate-fade-in-up"
                     :style="{ animationDelay: `${index * 0.1}s` }">
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
        </section>

        <!-- Newsletter CTA and Footer are in layout -->
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'nuxt/app'

const route = useRoute()
const currentCategorySlug = computed(() => route.params.slug as string)

// ============================================================
// STATIC DATA
// ============================================================

// All Categories
const allCategories = [
    { slug: 'hiking', label: 'Hiking', icon: '🥾', title: 'Mountain Trails', heroImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1600&q=80', description: 'Discover breathtaking peaks, hidden trails, and mountain adventures that will elevate your spirit.' },
    { slug: 'desert', label: 'Desert', icon: '🏜️', title: 'Desert Dreams', heroImage: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1600&q=80', description: 'Embrace the silence of golden dunes, starlit skies, and timeless desert landscapes.' },
    { slug: 'forest', label: 'Forest', icon: '🌲', title: 'Forest Whispers', heroImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80', description: 'Wander through ancient woodlands, discover hidden waterfalls, and reconnect with nature.' },
    { slug: 'beach', label: 'Beach', icon: '🏖️', title: 'Coastal Paradise', heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80', description: 'Explore pristine coastlines, turquoise waters, and tropical paradises around the world.' },
    { slug: 'culture', label: 'Culture', icon: '🏛️', title: 'Cultural Odyssey', heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1600&q=80', description: 'Immerse yourself in local traditions, historic sites, and authentic experiences.' },
    { slug: 'camping', label: 'Camping', icon: '⛺', title: 'Camping Escapes', heroImage: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1600&q=80', description: 'Sleep under the stars, gather around campfires, and embrace outdoor adventures.' }
]

// Current Category Data
const currentCategoryData = computed(() => {
    const category = allCategories.find(c => c.slug === currentCategorySlug.value) || allCategories[0]
    return category
})

// Featured Story
const featuredStory = {
    id: 1,
    title: "The Ultimate Guide to Conquering Patagonia's Most Epic Trails",
    excerpt: "Join me on an unforgettable journey through Torres del Paine, where jagged peaks meet turquoise lakes, and every step reveals a new wonder. This 7-day adventure will transform how you see the world.",
    image: "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=1200&q=80",
    category: "Hiking",
    author: "Shayon",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "March 15, 2025",
    readTime: "8 min read"
}

// Articles Data
const articles = [
    {
        id: 1,
        slug: "himalayan-solo-trek",
        title: "Solo Trekking in the Himalayas: A Journey Within",
        excerpt: "A 10-day solo expedition through the Annapurna Circuit, discovering inner strength and breathtaking vistas along the way.",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
        category: "Hiking",
        author: "Shayon",
        authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
        date: "Feb 28, 2025",
        readTime: "6 min read",
        likes: 124
    },
    {
        id: 2,
        slug: "dolomites-sunrise",
        title: "Chasing Sunrise in the Italian Dolomites",
        excerpt: "Waking up at 3 AM was worth every moment when the first rays of sun painted the mountains in shades of gold and pink.",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
        category: "Hiking",
        author: "Elena",
        authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
        date: "Mar 5, 2025",
        readTime: "5 min read",
        likes: 98
    },
    {
        id: 3,
        slug: "fjords-norway",
        title: "Kayaking Through Norway's Majestic Fjords",
        excerpt: "Paddling between towering cliffs and cascading waterfalls in one of Earth's most spectacular natural wonders.",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
        category: "Adventure",
        author: "Markus",
        authorAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
        date: "Mar 10, 2025",
        readTime: "7 min read",
        likes: 156
    },
    {
        id: 4,
        slug: "sahara-starlight",
        title: "Starlit Nights in the Sahara Desert",
        excerpt: "Sleeping under a blanket of stars in the world's largest desert, where silence speaks louder than words.",
        image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80",
        category: "Desert",
        author: "Aisha",
        authorAvatar: "https://randomuser.me/api/portraits/women/68.jpg",
        date: "Mar 12, 2025",
        readTime: "5 min read",
        likes: 203
    },
    {
        id: 5,
        slug: "amazon-rainforest",
        title: "Into the Heart of the Amazon Rainforest",
        excerpt: "A week-long expedition exploring the world's most biodiverse ecosystem and meeting indigenous communities.",
        image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
        category: "Forest",
        author: "Shayon",
        authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
        date: "Mar 8, 2025",
        readTime: "9 min read",
        likes: 187
    },
    {
        id: 6,
        slug: "maldives-snorkeling",
        title: "Underwater Wonders: Snorkeling in the Maldives",
        excerpt: "Swimming with manta rays, sea turtles, and vibrant coral reefs in the Indian Ocean's clearest waters.",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
        category: "Beach",
        author: "Maya",
        authorAvatar: "https://randomuser.me/api/portraits/women/23.jpg",
        date: "Mar 3, 2025",
        readTime: "4 min read",
        likes: 245
    }
]

// Destinations Data
const destinations = [
    { name: "Swiss Alps", country: "Switzerland", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80" },
    { name: "Patagonia", country: "Argentina", image: "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=600&q=80" },
    { name: "Himalayas", country: "Nepal", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80" },
    { name: "Dolomites", country: "Italy", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80" },
    { name: "Banff", country: "Canada", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80" },
    { name: "Lake District", country: "UK", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80" },
    { name: "Yosemite", country: "USA", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80" },
    { name: "Milford Sound", country: "New Zealand", image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=600&q=80" }
]

// Statistics
const storiesCount = 48
const destinationsCount = 156
const totalPhotos = 1243
const totalMiles = 28745
const avgReadTime = 6
</script>

<style scoped lang="scss">
@use "~/assets/scss/category.scss";

.hero-bg-layer {
    transition: transform 0.3s ease-out;
    transform: scale(1.05);
}

.animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
    opacity: 0;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes bounce-slow {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}

.animate-bounce-slow {
    animation: bounce-slow 2s ease-in-out infinite;
}

.stat-item {
    position: relative;
    
    &::after {
        content: '';
        position: absolute;
        bottom: -20px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 2px;
        background: #7ec8e3;
        transition: width 0.3s ease;
    }
    
    &:hover::after {
        width: 50px;
    }
}
</style>