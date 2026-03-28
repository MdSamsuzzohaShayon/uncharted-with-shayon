<template>
    <div>

        <!-- ====== NAVBAR ====== -->
        <nav class="relative z-20 flex items-center justify-between px-6 md:px-12 lg:px-20 py-6"
            aria-label="Main navigation">
            <NuxtLink href="/" class="flex items-center gap-3" aria-label="Uncharted with Shayon — Home">
                <NuxtImg class="w-12" src="/logo.png" />
                <span class="text-white font-display font-bold text-lg tracking-wide hidden sm:block">
                    Uncharted <span class="text-[#7ec8e3]">with Shayon</span>
                </span>
            </NuxtLink>

            <div class="hidden md:flex items-center gap-1">
                <NuxtLink href="/" aria-current="page"
                    class="px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm text-white text-sm font-medium border border-white/20 transition-all duration-300 hover:bg-white/25">
                    Home</NuxtLink>
                <NuxtLink href="/destinations"
                    class="px-4 py-2 rounded-full text-white/80 text-sm font-medium hover:text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-1">
                    Destinations
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"
                        aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </NuxtLink>
                <NuxtLink href="/stories"
                    class="px-4 py-2 rounded-full text-white/80 text-sm font-medium hover:text-white hover:bg-white/10 transition-all duration-300">
                    Stories</NuxtLink>
                <NuxtLink href="/about"
                    class="px-4 py-2 rounded-full text-white/80 text-sm font-medium hover:text-white hover:bg-white/10 transition-all duration-300">
                    About</NuxtLink>
            </div>

            <div class="flex items-center gap-3">
                <button
                    class="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300"
                    aria-label="Open search" @click="openSearch">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                        aria-hidden="true">
                        <circle cx="11" cy="11" r="8" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35" />
                    </svg>
                </button>
                <button
                    class="md:hidden w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                    aria-label="Open menu">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                        aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </nav>

        <!-- ================================================================
           SEARCH MEGA MENU OVERLAY
      ================================================================ -->
        <div v-if="searchOpen" :class="['search-overlay fixed inset-0 z-50 bg-[#1a1a1a]/60', searchOpen ? 'is-visible' : 'is-hidden']"
            role="dialog" aria-modal="true" aria-label="Search" @click.self="closeSearch">
            <div class="search-panel w-full max-w-2xl mx-auto mt-16 md:mt-24 px-4">
                <div class="bg-white rounded-3xl shadow-2xl shadow-black/20 overflow-hidden border border-[#e5e7eb]">

                    <!-- Search Input -->
                    <div class="px-6 pt-6 pb-4 border-b border-[#e5e7eb]">
                        <div class="flex items-center gap-4">
                            <svg class="w-5 h-5 text-[#555555] flex-shrink-0" fill="none" stroke="currentColor"
                                stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                                <circle cx="11" cy="11" r="8" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35" />
                            </svg>
                            <div class="search-input-wrapper flex-1">
                                <input ref="searchInputRef" v-model="searchQuery" type="search"
                                    placeholder="Search destinations, stories…"
                                    class="w-full bg-transparent text-[#1a1a1a] placeholder-[#aaa] text-lg outline-none py-1 font-body"
                                    aria-label="Search destinations and stories" />
                            </div>
                            <button
                                class="w-8 h-8 rounded-full bg-[#f9fafc] hover:bg-[#e5e7eb] flex items-center justify-center text-[#555555] transition-colors duration-200"
                                aria-label="Close search" @click="closeSearch">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5"
                                    viewBox="0 0 24 24" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Recent Searches -->
                    <div v-if="!searchQuery" class="px-6 py-5">
                        <p class="text-[#555555] text-xs font-semibold tracking-widest uppercase mb-3">Recent Searches
                        </p>
                        <div class="flex flex-wrap gap-2">
                            <button v-for="term in recentSearches" :key="term"
                                class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f9fafc] border border-[#e5e7eb] text-[#555555] text-sm hover:border-[#7ec8e3] hover:text-[#1a1a1a] transition-all duration-200"
                                @click="searchQuery = term">
                                <svg class="w-3 h-3 opacity-50" fill="none" stroke="currentColor" stroke-width="2"
                                    viewBox="0 0 24 24" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {{ term }}
                            </button>
                        </div>

                        <!-- Trending Destinations -->
                        <p class="text-[#555555] text-xs font-semibold tracking-widest uppercase mb-3 mt-6">Trending
                            Destinations
                        </p>
                        <div class="grid grid-cols-2 gap-2">
                            <button v-for="dest in trendingDests" :key="dest.name"
                                class="search-result-item flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200"
                                @click="searchQuery = dest.name">
                                <span class="text-xl flex-shrink-0">{{ dest.icon }}</span>
                                <div>
                                    <p class="text-[#1a1a1a] text-sm font-semibold leading-tight">{{ dest.name }}</p>
                                    <p class="text-[#555555] text-xs">{{ dest.sub }}</p>
                                </div>
                            </button>
                        </div>
                    </div>

                    <!-- Dynamic Results -->
                    <div v-else class="px-6 py-5">
                        <p class="text-[#555555] text-xs font-semibold tracking-widest uppercase mb-3">
                            Results for "{{ searchQuery }}"
                        </p>
                        <div v-if="searchResults.length" class="space-y-1">
                            <a v-for="result in searchResults" :key="result.title" href="#"
                                class="search-result-item flex items-center gap-4 px-3 py-3 rounded-xl group">
                                <div class="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                                    <img :src="result.img" :alt="result.title" class="w-full h-full object-cover" />
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p
                                        class="text-[#1a1a1a] text-sm font-semibold truncate group-hover:text-[#1a4a6b] transition-colors">
                                        {{ result.title }}</p>
                                    <p class="text-[#555555] text-xs">{{ result.category }} · {{ result.readTime }}</p>
                                </div>
                                <svg class="w-4 h-4 text-[#aaa] flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                                    fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                                    aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                        <p v-else class="text-[#555555] text-sm py-4 text-center">No results found. Try a different
                            keyword.</p>
                    </div>

                    <div class="px-6 py-3 bg-[#f9fafc] border-t border-[#e5e7eb] flex items-center justify-between">
                        <p class="text-[#aaa] text-xs">Press <kbd
                                class="px-1.5 py-0.5 bg-white border border-[#e5e7eb] rounded text-[10px] font-mono">Esc</kbd>
                            to close
                        </p>
                        <p class="text-[#aaa] text-xs">{{ searchResults.length }} results</p>
                    </div>

                </div>
            </div>
        </div>

    </div>

</template>

<script setup lang="ts">
const searchOpen = ref<boolean>(false);


const searchQuery = ref<string>('');
const recentSearches = ['Maldives beaches', 'Solo hiking Asia', 'Budget Europe']
const trendingDests = [
    { name: 'Iceland', icon: '🏔️', sub: 'Northern Lights' },
    { name: 'Bali', icon: '🌴', sub: 'Rice terraces' },
    { name: 'Patagonia', icon: '🏕️', sub: 'End of the world' },
    { name: 'Santorini', icon: '🌅', sub: 'Aegean magic' },
]

// Use pinia for state management and use it in the search bar
const allPosts = [
    { title: 'Lost in Paradise: 10 Days in the Maldives', category: 'Beach', readTime: '8 min', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=80&q=60' },
    { title: 'Trekking the Himalayas: A Solo Adventure', category: 'Hiking', readTime: '6 min', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=80&q=60' },
    { title: 'Kyoto in Autumn: The Ultimate Temple Trail', category: 'Culture', readTime: '5 min', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=80&q=60' },
    { title: 'Swiss Alps on a Shoestring Budget', category: 'Hiking', readTime: '7 min', img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=80&q=60' },
    { title: 'Santorini Sunsets & Secret Villages', category: 'Romance', readTime: '4 min', img: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=80&q=60' },
    { title: 'Chasing Northern Lights in Iceland', category: 'Nature', readTime: '9 min', img: 'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=80&q=60' },
]


const searchResults = computed(() => {
    if (!searchQuery.value.trim()) return []
    const q = searchQuery.value.toLowerCase()
    return allPosts.filter(p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
})
function openSearch() {
    searchOpen.value = true;
    // nextTick(() => searchInputRef.value?.focus());
}
function closeSearch() { searchOpen.value = false; searchQuery.value = '' }



// ── Keyboard: Esc closes search ───────────────
function onKeydown(e: KeyboardEvent): void {
    if (e.key === 'Escape' && searchOpen.value) {
        closeSearch();
    }
}
onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))

</script>