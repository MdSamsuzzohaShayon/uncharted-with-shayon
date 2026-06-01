<template>
    <div class="w-full">
        <!-- ================================================================
           HERO SECTION - Compact
      ================================================================ -->
        <header>
            <section class="relative min-h-[50vh] md:min-h-[60vh] flex flex-col overflow-hidden" aria-label="Categories header">
                <!-- Background image with parallax effect -->
                <div class="absolute inset-0 z-0" aria-hidden="true">
                    <div class="absolute inset-0 bg-gradient-to-br from-[#1a1a1a]/95 via-[#1a4a6b]/80 to-[#0f2a3f]/90 z-10"></div>
                    <div class="hero-bg-layer w-full h-full bg-cover bg-center bg-fixed"
                         style="background-image: url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80')"></div>
                    <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f9fafc] to-transparent z-20"></div>
                </div>

                <Navbar />

                <main class="flex-1 flex items-center px-6 md:px-12 lg:px-20 py-12 md:py-16 relative z-20">
                    <div class="w-full text-center animate-fade-in-up">
                        <div class="inline-flex items-center gap-2 md:gap-3 bg-white/15 backdrop-blur-md px-4 md:px-5 py-2 md:py-2.5 rounded-full mb-6 border border-white/20">
                            <span class="text-2xl md:text-3xl animate-bounce-slow">🌍</span>
                            <span class="text-[#7ec8e3] text-xs md:text-sm font-semibold tracking-[0.2em] uppercase">Explore Our World</span>
                        </div>
                        <h1 class="font-display font-black text-white text-4xl md:text-6xl lg:text-7xl mb-4 leading-none">
                            Adventure Categories
                        </h1>
                        <div class="w-20 h-1 bg-[#7ec8e3] mx-auto mb-4 rounded-full"></div>
                        <p class="text-white/80 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                            Choose your next adventure from our curated collection
                        </p>
                        <div class="mt-8 flex items-center justify-center gap-6 text-white/60 text-sm">
                            <div class="flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"></path>
                                </svg>
                                <span>{{ totalStoriesCount }} Stories</span>
                            </div>
                            <div class="w-1 h-1 bg-[#7ec8e3] rounded-full"></div>
                            <div class="flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                                </svg>
                                <span>{{ totalCategoriesCount }} Categories</span>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </header>

        <!-- ================================================================
           CATEGORY FILTER TABS - Compact
      ================================================================ -->
        <div class="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#e5e7eb] shadow-sm">
            <div class="px-6 md:px-12 lg:px-20 pt-8">
                <div class="flex items-center gap-2 overflow-x-auto category-scroll py-3">
                    <a v-for="category in categories" 
                       :key="category.slug"
                       :href="`#category-${category.slug}`"
                       class="group relative px-4 md:px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap text-[#555555] hover:text-[#1a1a1a] hover:bg-[#f0f0f0]">
                        <span class="flex items-center gap-2">
                            <NuxtImg :src="category.icon.url" class="w-5 h-5" height="32" width="32" />
                            <span>{{ category.name }}</span>
                        </span>
                    </a>
                </div>
            </div>
        </div>

        <!-- ================================================================
           DYNAMIC CATEGORY SECTIONS - Compact Layout
      ================================================================ -->
        <section v-for="(category, catIndex) in categoriesWithContent" 
                 :key="category.slug"
                 :id="`category-${category.slug}`"
                 class="category-section py-12 md:py-16"
                 :class="{ 'bg-[#f9fafc]': catIndex % 2 === 0 }">
            
            <div class="px-6 md:px-12 lg:px-20 pt-8">
                <!-- Category Header - Compact -->
                <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div class="flex items-center gap-3">
                        <NuxtImg :src="category.icon.url" class="w-8 h-8 md:w-10 md:h-10 animate-float" height="40" width="40" />
                        <div>
                            <h2 class="font-display font-bold text-[#1a1a1a] text-2xl md:text-3xl">
                                {{ category.name }}
                            </h2>
                            <p class="text-[#555555] text-sm md:text-base max-w-md">
                                {{ category.description || `Discover the best ${category.name.toLowerCase()} experiences` }}
                            </p>
                        </div>
                    </div>
                    <NuxtLink :to="`/category/${category.slug}`" 
                              class="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#1a4a6b] to-[#7ec8e3] text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-[#1a4a6b]/30 transition-all duration-300">
                        View All
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </NuxtLink>
                </div>

                <!-- Two Column Layout: Featured Story + Side Grid -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Featured Story Card - Left Column -->
                    <NuxtLink :href="`/story/${category.slug}`" 
                              class="group block h-full">
                        <div class="relative h-full min-h-[320px] md:min-h-[400px] rounded-2xl overflow-hidden bg-white border border-[#e5e7eb] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                            <NuxtImg height="200" width="200" :src="category.featured_image.url"
                            :alt="category.name"
                            class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                             />
                            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                            
                            <div class="absolute top-4 left-4">
                                <span class="bg-[#7ec8e3] text-[#1a1a1a] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                    {{ category.name }}
                                </span>
                            </div>
                            
                            <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                                <div class="flex items-center gap-3 mb-3">
                                    <img :src="getCategoryFeaturedStory(String(category.slug)).authorAvatar" 
                                         class="w-8 h-8 rounded-full border-2 border-[#7ec8e3]" />
                                    <span class="text-sm font-medium">{{ getCategoryFeaturedStory(String(category.slug)).author }}</span>
                                    <span class="text-white/60 text-xs">• {{ getCategoryFeaturedStory(String(category.slug)).readTime }}</span>
                                </div>
                                <h3 class="font-display font-bold text-xl md:text-2xl mb-2 group-hover:text-[#7ec8e3] transition-colors duration-300 line-clamp-2">
                                    {{ getCategoryFeaturedStory(String(category.slug)).title }}
                                </h3>
                                <p class="text-white/70 text-sm leading-relaxed line-clamp-2">
                                    {{ getCategoryFeaturedStory(String(category.slug)).excerpt }}
                                </p>
                            </div>
                        </div>
                    </NuxtLink>

                    <!-- Right Column: Articles + Activities + Destinations -->
                    <div class="flex flex-col gap-4">
                        <!-- Article Mini Cards -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <NuxtLink v-for="(article, index) in getCategoryArticles(category.slug).slice(0, 2)" 
                                      :key="article.id"
                                      :href="`/story/${article.slug}`"
                                      class="group flex gap-3 p-3 rounded-xl bg-white border border-[#e5e7eb] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 animate-fade-in-up"
                                      :style="{ animationDelay: `${index * 0.1}s` }">
                                
                                <img :src="article.image" :alt="article.title"
                                     class="w-20 h-20 rounded-lg object-cover flex-shrink-0 transition-transform duration-500 group-hover:scale-105" />
                                
                                <div class="flex-1 min-w-0">
                                    <h4 class="font-display font-bold text-[#1a1a1a] text-sm mb-1 group-hover:text-[#1a4a6b] transition-colors line-clamp-2">
                                        {{ article.title }}
                                    </h4>
                                    <div class="flex items-center gap-2 text-xs text-[#555555]">
                                        <span>{{ article.author }}</span>
                                        <span class="w-1 h-1 rounded-full bg-[#7ec8e3]"></span>
                                        <span>{{ article.readTime }}</span>
                                    </div>
                                </div>
                            </NuxtLink>
                        </div>

                        <!-- Activities & Destinations Row -->
                        <div class="grid grid-cols-2 gap-3">
                            <!-- Activities Mini -->
                            <div v-if="getCategoryActivities(category.slug).length" 
                                 class="p-4 rounded-xl bg-white border border-[#e5e7eb]">
                                <h4 class="font-display font-bold text-[#1a1a1a] text-sm mb-3 flex items-center gap-1">
                                    <span>🏃</span> Activities
                                </h4>
                                <div class="space-y-2">
                                    <div v-for="activity in getCategoryActivities(category.slug).slice(0, 3)" 
                                         :key="activity.name"
                                         class="flex items-center gap-2">
                                        <span class="text-lg">{{ activity.icon }}</span>
                                        <div class="flex-1 min-w-0">
                                            <p class="text-xs font-medium text-[#1a1a1a] truncate">{{ activity.name }}</p>
                                            <div class="flex items-center gap-2">
                                                <div class="flex-1 h-1 bg-[#e5e7eb] rounded-full overflow-hidden">
                                                    <div class="h-full bg-gradient-to-r from-[#1a4a6b] to-[#7ec8e3] rounded-full"
                                                         :style="{ width: `${activity.popularity}%` }"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Destinations Mini -->
                            <div v-if="getCategoryDestinations(category.slug).length" 
                                 class="p-4 rounded-xl bg-white border border-[#e5e7eb]">
                                <h4 class="font-display font-bold text-[#1a1a1a] text-sm mb-3 flex items-center gap-1">
                                    <span>📍</span> Destinations
                                </h4>
                                <div class="grid grid-cols-2 gap-2">
                                    <div v-for="dest in getCategoryDestinations(category.slug).slice(0, 4)" 
                                         :key="dest.name"
                                         class="group relative rounded-lg overflow-hidden aspect-video cursor-pointer">
                                        <img :src="dest.image" :alt="dest.name" 
                                             class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                        <p class="absolute bottom-1 left-1.5 text-white text-xs font-medium truncate">{{ dest.name }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Divider -->
            <div v-if="catIndex < categoriesWithContent.length - 1" 
                 class="px-6 md:px-12 lg:px-20 pt-8 mt-12">
                <div class="border-t border-[#e5e7eb]"></div>
            </div>
        </section>

        <!-- ================================================================
           GLOBAL STATISTICS SECTION - Compact
      ================================================================ -->
        <section class="bg-gradient-to-br from-[#1a1a1a] to-[#1a4a6b] py-12 md:py-16">
            <div class="px-6 md:px-12 lg:px-20 pt-8">
                <div class="text-center mb-8">
                    <h2 class="font-display font-bold text-white text-3xl md:text-4xl mb-3">Adventure by Numbers</h2>
                    <p class="text-white/70 text-base">Our growing community of explorers</p>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
                    <div class="stat-item animate-fade-in-up" style="animation-delay: 0s">
                        <div class="text-4xl md:text-5xl font-display font-bold text-[#7ec8e3] mb-2">{{ totalStoriesCount }}+</div>
                        <p class="text-white/70 text-xs uppercase tracking-wider">Stories</p>
                    </div>
                    <div class="stat-item animate-fade-in-up" style="animation-delay: 0.1s">
                        <div class="text-4xl md:text-5xl font-display font-bold text-[#7ec8e3] mb-2">{{ totalDestinationsCount }}</div>
                        <p class="text-white/70 text-xs uppercase tracking-wider">Destinations</p>
                    </div>
                    <div class="stat-item animate-fade-in-up" style="animation-delay: 0.2s">
                        <div class="text-4xl md:text-5xl font-display font-bold text-[#7ec8e3] mb-2">{{ totalActivitiesCount }}</div>
                        <p class="text-white/70 text-xs uppercase tracking-wider">Activities</p>
                    </div>
                    <div class="stat-item animate-fade-in-up" style="animation-delay: 0.3s">
                        <div class="text-4xl md:text-5xl font-display font-bold text-[#7ec8e3] mb-2">{{ totalCategoriesCount }}</div>
                        <p class="text-white/70 text-xs uppercase tracking-wider">Categories</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const config = useRuntimeConfig()

// ============================================================
// FETCH CATEGORIES DATA
// ============================================================

const { data: categoriesData } = await useAsyncData<ICategoriesResponse>(
  "categories",
  async () => {
    return await $fetch(`${config.public.backendApi}/api/categories`, {
      headers: {
        Authorization: `Bearer ${config.public.accessToken}`,
      },
      params: {
        // Select only required fields
        "fields[0]": "name",
        "fields[1]": "slug",
        "fields[2]": "documentId",

        // Populate icon
        "populate[icon][fields][0]": "url",

        // Populate featured image
        "populate[featured_image][fields][0]": "url",
      },
    });
  }
);

const categories = computed(() => categoriesData.value?.data ?? []);

// ============================================================
// STATIC DATA GENERATORS
// ============================================================

// Generate static articles for a category
const generateArticlesForCategory = (categorySlug: string, categoryName: string) => {
    const articlesMap: Record<string, any[]> = {
        hiking: [
            { id: 1, slug: 'himalayan-trek', title: 'Solo Trekking in the Himalayas', excerpt: 'A 10-day expedition through the Annapurna Circuit.', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80', category: categoryName, author: 'Shayon', authorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg', date: 'Feb 28, 2025', readTime: '6 min' },
            { id: 2, slug: 'dolomites-sunrise', title: 'Chasing Sunrise in the Dolomites', excerpt: 'Waking up at 3 AM for golden mountain views.', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', category: categoryName, author: 'Elena', authorAvatar: 'https://randomuser.me/api/portraits/women/44.jpg', date: 'Mar 5, 2025', readTime: '5 min' },
            { id: 3, slug: 'patagonia-trails', title: 'Patagonia\'s Most Epic Trails', excerpt: 'Discover the best hiking routes in Torres del Paine.', image: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=800&q=80', category: categoryName, author: 'Markus', authorAvatar: 'https://randomuser.me/api/portraits/men/45.jpg', date: 'Mar 10, 2025', readTime: '7 min' },
        ],
        adventure: [
            { id: 4, slug: 'fjords-norway', title: 'Kayaking Through Norwegian Fjords', excerpt: 'Paddling between towering cliffs and waterfalls.', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', category: categoryName, author: 'Markus', authorAvatar: 'https://randomuser.me/api/portraits/men/45.jpg', date: 'Mar 10, 2025', readTime: '7 min' },
            { id: 5, slug: 'amazon-expedition', title: 'Into the Heart of the Amazon', excerpt: 'A week-long expedition in the world\'s largest rainforest.', image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80', category: categoryName, author: 'Shayon', authorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg', date: 'Mar 8, 2025', readTime: '9 min' },
            { id: 6, slug: 'sahara-desert', title: 'Starlit Nights in the Sahara', excerpt: 'Sleeping under a blanket of stars in the desert.', image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80', category: categoryName, author: 'Aisha', authorAvatar: 'https://randomuser.me/api/portraits/women/68.jpg', date: 'Mar 12, 2025', readTime: '5 min' },
        ],
        beach: [
            { id: 7, slug: 'maldives-snorkeling', title: 'Snorkeling in the Maldives', excerpt: 'Swimming with manta rays and sea turtles.', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80', category: categoryName, author: 'Maya', authorAvatar: 'https://randomuser.me/api/portraits/women/23.jpg', date: 'Mar 3, 2025', readTime: '4 min' },
            { id: 8, slug: 'bali-paradise', title: 'Bali\'s Hidden Beaches', excerpt: 'Discovering secluded coves and crystal waters.', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', category: categoryName, author: 'Liam', authorAvatar: 'https://randomuser.me/api/portraits/men/22.jpg', date: 'Mar 1, 2025', readTime: '5 min' },
            { id: 9, slug: 'greek-islands', title: 'Island Hopping in Greece', excerpt: 'Exploring the Aegean\'s most beautiful islands.', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', category: categoryName, author: 'Sophia', authorAvatar: 'https://randomuser.me/api/portraits/women/33.jpg', date: 'Feb 25, 2025', readTime: '6 min' },
        ],
        forest: [
            { id: 10, slug: 'redwood-giants', title: 'Walking Among Redwood Giants', excerpt: 'Exploring California\'s ancient forests.', image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80', category: categoryName, author: 'John', authorAvatar: 'https://randomuser.me/api/portraits/men/55.jpg', date: 'Mar 7, 2025', readTime: '5 min' },
            { id: 11, slug: 'bamboo-forest', title: 'Japan\'s Enchanted Bamboo Forest', excerpt: 'Finding peace in Arashiyama\'s green tunnels.', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80', category: categoryName, author: 'Yuki', authorAvatar: 'https://randomuser.me/api/portraits/women/77.jpg', date: 'Mar 9, 2025', readTime: '4 min' },
            { id: 12, slug: 'black-forest', title: 'Mysteries of the Black Forest', excerpt: 'Hiking through Germany\'s legendary woodland.', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80', category: categoryName, author: 'Hans', authorAvatar: 'https://randomuser.me/api/portraits/men/66.jpg', date: 'Mar 11, 2025', readTime: '6 min' },
        ],
        desert: [
            { id: 13, slug: 'wadi-rum', title: 'Wadi Rum: Mars on Earth', excerpt: 'Exploring Jordan\'s red desert landscapes.', image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80', category: categoryName, author: 'Omar', authorAvatar: 'https://randomuser.me/api/portraits/men/88.jpg', date: 'Mar 4, 2025', readTime: '5 min' },
            { id: 14, slug: 'atacama-stars', title: 'Stargazing in the Atacama', excerpt: 'The world\'s clearest skies in Chile\'s desert.', image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80', category: categoryName, author: 'Carlos', authorAvatar: 'https://randomuser.me/api/portraits/men/99.jpg', date: 'Mar 6, 2025', readTime: '4 min' },
            { id: 15, slug: 'namib-dunes', title: 'Climbing Namibia\'s Giant Dunes', excerpt: 'Conquering the tallest sand dunes on Earth.', image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80', category: categoryName, author: 'Sarah', authorAvatar: 'https://randomuser.me/api/portraits/women/11.jpg', date: 'Mar 2, 2025', readTime: '6 min' },
        ]
    };
    
    return articlesMap[categorySlug] || [
        { id: Date.now(), slug: `${categorySlug}-1`, title: `${categoryName} Adventure`, excerpt: `Discover amazing ${categoryName} experiences.`, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', category: categoryName, author: 'Explorer', authorAvatar: 'https://randomuser.me/api/portraits/men/1.jpg', date: 'Mar 2025', readTime: '5 min' },
        { id: Date.now() + 1, slug: `${categorySlug}-2`, title: `Ultimate ${categoryName} Guide`, excerpt: `Everything you need to know about ${categoryName}.`, image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80', category: categoryName, author: 'Traveler', authorAvatar: 'https://randomuser.me/api/portraits/women/1.jpg', date: 'Mar 2025', readTime: '7 min' },
        { id: Date.now() + 2, slug: `${categorySlug}-3`, title: `${categoryName} Secrets Revealed`, excerpt: `Hidden gems and insider tips for ${categoryName}.`, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80', category: categoryName, author: 'Guide', authorAvatar: 'https://randomuser.me/api/portraits/men/2.jpg', date: 'Mar 2025', readTime: '4 min' },
    ];
};

// Generate activities for a category
const generateActivitiesForCategory = (categorySlug: string) => {
    const activitiesMap: Record<string, any[]> = {
        hiking: [
            { name: 'Mountain Trekking', icon: '⛰️', duration: '4-8 hours', popularity: 95 },
            { name: 'Trail Running', icon: '🏃', duration: '2-4 hours', popularity: 78 },
            { name: 'Camping', icon: '🏕️', duration: 'Overnight', popularity: 88 },
            { name: 'Wildlife Watching', icon: '🦌', duration: '3-5 hours', popularity: 72 },
        ],
        adventure: [
            { name: 'Kayaking', icon: '🛶', duration: '3-6 hours', popularity: 85 },
            { name: 'Rock Climbing', icon: '🧗', duration: '4-8 hours', popularity: 76 },
            { name: 'White Water Rafting', icon: '🚣', duration: '2-4 hours', popularity: 82 },
            { name: 'Zip Lining', icon: '🪢', duration: '1-2 hours', popularity: 70 },
        ],
        beach: [
            { name: 'Snorkeling', icon: '🤿', duration: '2-3 hours', popularity: 92 },
            { name: 'Surfing', icon: '🏄', duration: '2-4 hours', popularity: 85 },
            { name: 'Beach Yoga', icon: '🧘', duration: '1 hour', popularity: 65 },
            { name: 'Sunset Sailing', icon: '⛵', duration: '2-3 hours', popularity: 88 },
        ],
        forest: [
            { name: 'Nature Walks', icon: '🌲', duration: '2-3 hours', popularity: 90 },
            { name: 'Bird Watching', icon: '🦜', duration: '3-4 hours', popularity: 75 },
            { name: 'Photography', icon: '📷', duration: 'Flexible', popularity: 82 },
            { name: 'Meditation', icon: '🧘', duration: '1 hour', popularity: 60 },
        ],
        desert: [
            { name: 'Dune Bashing', icon: '🚙', duration: '3-4 hours', popularity: 88 },
            { name: 'Camel Riding', icon: '🐪', duration: '2-3 hours', popularity: 80 },
            { name: 'Sandboarding', icon: '🏂', duration: '2 hours', popularity: 72 },
            { name: 'Stargazing', icon: '✨', duration: 'Overnight', popularity: 95 },
        ]
    };
    
    return activitiesMap[categorySlug] || [
        { name: 'Exploration', icon: '🔍', duration: '3-5 hours', popularity: 85 },
        { name: 'Photography', icon: '📸', duration: 'Flexible', popularity: 78 },
        { name: 'Local Tours', icon: '🗺️', duration: '4-6 hours', popularity: 82 },
        { name: 'Cultural Experiences', icon: '🎭', duration: '2-4 hours', popularity: 75 },
    ];
};

// Generate destinations for a category
const generateDestinationsForCategory = (categorySlug: string) => {
    const destinationsMap: Record<string, any[]> = {
        hiking: [
            { name: 'Swiss Alps', location: 'Switzerland', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80' },
            { name: 'Patagonia', location: 'Argentina', image: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=600&q=80' },
            { name: 'Himalayas', location: 'Nepal', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80' },
            { name: 'Dolomites', location: 'Italy', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80' },
        ],
        adventure: [
            { name: 'Queenstown', location: 'New Zealand', image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=600&q=80' },
            { name: 'Interlaken', location: 'Switzerland', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80' },
            { name: 'Moab', location: 'USA', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80' },
            { name: 'Costa Rica', location: 'Central America', image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=80' },
        ],
        beach: [
            { name: 'Maldives', location: 'Indian Ocean', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80' },
            { name: 'Bora Bora', location: 'French Polynesia', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80' },
            { name: 'Seychelles', location: 'East Africa', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80' },
            { name: 'Bali', location: 'Indonesia', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80' },
        ],
        forest: [
            { name: 'Amazon', location: 'Brazil', image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=80' },
            { name: 'Redwood National Park', location: 'USA', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80' },
            { name: 'Black Forest', location: 'Germany', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80' },
            { name: 'Daintree', location: 'Australia', image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=80' },
        ],
        desert: [
            { name: 'Sahara', location: 'Morocco', image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80' },
            { name: 'Wadi Rum', location: 'Jordan', image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80' },
            { name: 'Atacama', location: 'Chile', image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80' },
            { name: 'Namib', location: 'Namibia', image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80' },
        ]
    };
    
    return destinationsMap[categorySlug] || [
        { name: 'Top Destination', location: 'Worldwide', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80' },
        { name: 'Hidden Gem', location: 'Discover Now', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80' },
        { name: 'Popular Spot', location: 'Trending', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80' },
        { name: 'Must Visit', location: 'Recommended', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80' },
    ];
};

// Combine categories with their content
const categoriesWithContent = computed(() => {
    return categories.value.map(category => ({
        ...category,
        description: getCategoryDescription(category.slug),
        featuredStory: getCategoryFeaturedStory(category.slug),
        articles: getCategoryArticles(category.slug),
        activities: getCategoryActivities(category.slug),
        destinations: getCategoryDestinations(category.slug)
    }));
});

// Helper functions
const getCategoryDescription = (slug: string) => {
    const descriptions: Record<string, string> = {
        hiking: 'Conquer peaks, traverse valleys, and discover breathtaking trails around the globe.',
        adventure: 'Push your limits with thrilling experiences and adrenaline-pumping activities.',
        beach: 'Relax on pristine shores, dive into crystal waters, and chase endless summers.',
        forest: 'Immerse yourself in lush greenery, ancient woodlands, and tranquil nature escapes.',
        desert: 'Experience the magic of vast dunes, starry nights, and timeless landscapes.'
    };
    return descriptions[slug] || `Discover amazing ${slug} experiences and unforgettable adventures.`;
};

const getCategoryFeaturedStory = (slug: string) => {
    return generateArticlesForCategory(slug, slug.charAt(0).toUpperCase() + slug.slice(1))[0];
};

const getCategoryArticles = (slug: string) => {
    return generateArticlesForCategory(slug, slug.charAt(0).toUpperCase() + slug.slice(1));
};

const getCategoryActivities = (slug: string) => {
    return generateActivitiesForCategory(slug);
};

const getCategoryDestinations = (slug: string) => {
    return generateDestinationsForCategory(slug);
};

// Computed totals
const totalCategoriesCount = computed(() => categories.value.length);
const totalStoriesCount = computed(() => categoriesWithContent.value.reduce((acc, cat) => acc + cat.articles.length, 0));
const totalDestinationsCount = computed(() => categoriesWithContent.value.reduce((acc, cat) => acc + cat.destinations.length, 0));
const totalActivitiesCount = computed(() => categoriesWithContent.value.reduce((acc, cat) => acc + cat.activities.length, 0));
</script>

<style scoped lang="scss">
@use "~/assets/scss/category.scss";

.hero-bg-layer {
    transition: transform 0.3s ease-out;
    transform: scale(1.05);
}

.category-scroll {
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    
    &::-webkit-scrollbar {
        height: 3px;
    }
    
    &::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.05);
        border-radius: 10px;
    }
    
    &::-webkit-scrollbar-thumb {
        background: #7ec8e3;
        border-radius: 10px;
    }
}

.category-section {
    scroll-margin-top: 60px;
    transition: background-color 0.3s ease;
}

.animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
    opacity: 0;
}

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

@keyframes bounce-slow {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-8px);
    }
}

.animate-bounce-slow {
    animation: bounce-slow 2s ease-in-out infinite;
}

@keyframes float {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-5px);
    }
}

.animate-float {
    animation: float 3s ease-in-out infinite;
}

.stat-item {
    position: relative;
    
    &::after {
        content: '';
        position: absolute;
        bottom: -15px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 2px;
        background: #7ec8e3;
        transition: width 0.3s ease;
    }
    
    &:hover::after {
        width: 40px;
    }
}
</style>