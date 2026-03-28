<template>
    <div class="w-full">
        <!-- ================================================================
           HERO SECTION
      ================================================================ -->
        <header>
            <section class="relative min-h-screen flex flex-col overflow-hidden" aria-label="Hero">

                <!-- Background image with cross-fade -->
                <div class="absolute inset-0 z-0" aria-hidden="true">
                    <img :src="heroBg" alt="Scenic adventure landscape" class="hero-bg-image w-full h-full object-cover"
                        :class="{ 'is-fading': bgFading }" fetchpriority="high" />
                    <div class="absolute inset-0 bg-gradient-to-br from-[#1a1a1a]/72 via-[#1a4a6b]/40 to-[#0f2a3f]/60">
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[#f9fafc] to-transparent">
                    </div>
                </div>

                <!-- ====== NAVBAR ====== -->
                <Navbar />

                <!-- ====== HERO CONTENT ====== -->
                <main>
                    <div class="relative z-10 flex-1 flex items-center px-6 md:px-12 lg:px-20 pb-32 pt-8">
                        <div class="w-full flex flex-col lg:flex-row items-center justify-between gap-12">

                            <!-- Left: Headline -->
                            <div class="max-w-xl lg:max-w-none lg:w-5/12 text-center lg:text-left">
                                <p
                                    class="anim-hero-label text-[#7ec8e3] text-sm font-semibold tracking-[0.2em] uppercase mb-4 flex items-center justify-center lg:justify-start gap-2">
                                    <span class="w-6 h-px bg-[#7ec8e3]" aria-hidden="true"></span>
                                    Travel & Adventure Blog
                                </p>
                                <h1 class="anim-hero-h1 font-display font-black text-white leading-none">
                                    <span class="block text-7xl md:text-8xl lg:text-9xl tracking-tighter">EXPLORE</span>
                                    <span
                                        class="block text-4xl md:text-5xl lg:text-6xl tracking-widest text-[#7ec8e3] mt-1">THE
                                        WORLD</span>
                                </h1>
                                <p
                                    class="anim-hero-body text-white/70 text-base md:text-lg mt-6 leading-relaxed max-w-md mx-auto lg:mx-0">
                                    Unscripted journeys, raw landscapes, and stories from the road. Join Shayon's
                                    adventures across the
                                    globe.
                                </p>
                                <div
                                    class="anim-hero-cta flex flex-col sm:flex-row gap-3 mt-8 justify-center lg:justify-start">
                                    <a href="/stories"
                                        class="px-7 py-3.5 bg-[#7ec8e3] hover:bg-[#5bb8d4] text-[#1a1a1a] font-semibold rounded-full text-sm tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-[#7ec8e3]/30 hover:-translate-y-0.5 active:scale-95 text-center">
                                        Start Exploring →
                                    </a>
                                    <button
                                        class="px-7 py-3.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-full text-sm tracking-wide border border-white/20 transition-all duration-300 hover:-translate-y-0.5 active:scale-95">
                                        Watch Stories
                                    </button>
                                </div>
                            </div>

                            <!-- Right: Floating Image Cards -->
                            <div class="anim-cards-wrap relative w-full lg:w-7/12 h-[420px] md:h-[500px] flex items-center justify-end"
                                aria-label="Featured travel destinations">
                                <div class="flex gap-3 md:gap-4 items-end justify-center">

                                    <FeatureArticle v-for="article, i in featureArticles"
                                        v-bind:active-article-id="activeArticleId" v-bind:article="article"
                                        v-on:set-hero-bg="setHeroBg" />
                                </div>
                            </div>

                        </div>
                    </div>
                </main>

                <!-- ====== CATEGORY FILTER BAR ====== -->
                <div class="absolute bottom-0 left-0 right-0 z-20 px-6 md:px-12 lg:px-20 pb-6" role="navigation"
                    aria-label="Category filter">
                    <div
                        class="bg-white/92 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/10 border border-[#e5e7eb] px-4 md:px-8 py-4 flex items-center gap-2 md:gap-4 overflow-x-auto scrollbar-hide">
                        <span
                            class="text-[#555555] text-xs font-semibold tracking-widest uppercase whitespace-nowrap mr-2 hidden md:block"
                            aria-hidden="true">Explore</span>
                        <div class="w-px h-6 bg-[#e5e7eb] hidden md:block" aria-hidden="true"></div>
                        <button v-for="(cat, i) in categories" :key="cat.label" :class="['flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 flex-shrink-0 active:scale-95',
                            activeCategory === i
                                ? 'cat-btn-active bg-[#1a4a6b] text-white shadow-md shadow-[#1a4a6b]/20'
                                : 'hover:bg-[#f9fafc] text-[#555555] hover:text-[#1a1a1a] hover:scale-105']"
                            :aria-pressed="activeCategory === i" :aria-label="`Filter by ${cat.label}`"
                            @click="activeCategory = i">
                            <span
                                :class="['w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0', cat.bg]"
                                aria-hidden="true">{{ cat.icon }}</span>
                            {{ cat.label }}
                        </button>
                    </div>
                </div>

            </section>
        </header>


        <!-- ================================================================
           FEATURED POSTS
      ================================================================ -->
        <section class="px-6 md:px-12 lg:px-20 pt-16 pb-20" aria-labelledby="latest-stories-heading">
            <div class="flex items-end justify-between mb-10">
                <div>
                    <p class="text-[#7ec8e3] text-xs font-semibold tracking-[0.2em] uppercase mb-2 flex items-center gap-2"
                        aria-hidden="true">
                        <span class="w-5 h-px bg-[#7ec8e3]"></span> Latest Stories
                    </p>
                    <h2 id="latest-stories-heading"
                        class="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl tracking-tight">
                        Fresh from the Road
                    </h2>
                </div>
                <a href="/stories"
                    class="hidden md:flex items-center gap-2 text-[#555555] text-sm font-medium hover:text-[#1a1a1a] transition-colors duration-200 group">
                    View All
                    <svg class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none"
                        stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </a>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <article
                    class="group md:col-span-2 relative rounded-2xl overflow-hidden bg-white border border-[#e5e7eb] shadow-sm hover:shadow-xl hover:shadow-black/8 transition-all duration-500 cursor-pointer hover:-translate-y-1">
                    <div class="relative h-72 md:h-80 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80"
                            alt="Pristine turquoise waters of the Maldives with overwater bungalows"
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
                            aria-hidden="true">
                        </div>
                        <span
                            class="absolute top-4 left-4 bg-[#7ec8e3] text-[#1a1a1a] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">Beach</span>
                    </div>
                    <div class="p-6">
                        <div class="flex items-center gap-3 mb-3">
                            <time datetime="2025-03-12" class="text-[#555555] text-xs">March 12, 2025</time>
                            <span class="w-1 h-1 rounded-full bg-[#e5e7eb]" aria-hidden="true"></span>
                            <span class="text-[#555555] text-xs">8 min read</span>
                        </div>
                        <h3
                            class="font-display font-bold text-[#1a1a1a] text-xl md:text-2xl leading-snug mb-3 group-hover:text-[#1a4a6b] transition-colors duration-300">
                            Lost in Paradise: 10 Days in the Maldives on a Budget
                        </h3>
                        <p class="text-[#555555] text-sm leading-relaxed line-clamp-2">
                            Turquoise lagoons, overwater bungalows, and reef sharks — here's how I did it all without
                            breaking the
                            bank.
                        </p>
                        <div class="flex items-center justify-between mt-5">
                            <div class="flex items-center gap-2">
                                <div class="w-7 h-7 rounded-full bg-gradient-to-br from-[#7ec8e3] to-[#1a4a6b] flex items-center justify-center text-white text-xs font-bold"
                                    aria-hidden="true">S</div>
                                <span class="text-[#555555] text-xs font-medium">Shayon</span>
                            </div>
                            <span
                                class="text-[#1a4a6b] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                                Read More
                                <svg class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                                    fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                                    aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </article>

                <div class="flex flex-col gap-6">
                    <article v-for="post in smallPosts" :key="post.title"
                        class="group relative rounded-2xl overflow-hidden bg-white border border-[#e5e7eb] shadow-sm hover:shadow-xl hover:shadow-black/8 transition-all duration-500 cursor-pointer flex flex-col hover:-translate-y-1">
                        <div class="relative h-44 overflow-hidden">
                            <img :src="post.img" :alt="post.imgAlt"
                                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                loading="lazy" />
                            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                                aria-hidden="true"></div>
                            <span
                                class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#1a1a1a] text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">{{
                                    post.category }}</span>
                        </div>
                        <div class="p-4 flex-1 flex flex-col">
                            <time :datetime="post.datetime" class="text-[#555555] text-xs mb-1.5">{{ post.date }}</time>
                            <h3
                                class="font-display font-bold text-[#1a1a1a] text-base leading-snug group-hover:text-[#1a4a6b] transition-colors duration-300 flex-1">
                                {{ post.title }}</h3>
                            <div class="flex items-center justify-between mt-3 pt-3 border-t border-[#e5e7eb]">
                                <span class="text-[#555555] text-xs">{{ post.readTime }}</span>
                                <svg class="w-4 h-4 text-[#1a4a6b] transition-transform duration-200 group-hover:translate-x-1"
                                    fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                                    aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>


        <!-- ================================================================
           DESTINATIONS MARQUEE
      ================================================================ -->
        <div class="bg-[#1a1a1a] py-5 overflow-hidden" aria-hidden="true">
            <div class="marquee-track flex gap-8 whitespace-nowrap">
                <span v-for="(dest, i) in [...destinations, ...destinations]" :key="`${dest}-${i}`"
                    class="text-white/30 text-sm font-semibold tracking-[0.3em] uppercase flex-shrink-0 flex items-center gap-8">
                    {{ dest }}
                    <span class="w-1.5 h-1.5 rounded-full bg-[#7ec8e3]/60 inline-block"></span>
                </span>
            </div>
        </div>


        <!-- ================================================================
           PHOTO JOURNAL MOSAIC
      ================================================================ -->
        <section class="px-6 md:px-12 lg:px-20 py-20 bg-[#f9fafc]" aria-labelledby="photo-journal-heading">
            <div class="text-center mb-12">
                <p class="text-[#7ec8e3] text-xs font-semibold tracking-[0.2em] uppercase mb-3 flex items-center justify-center gap-2"
                    aria-hidden="true">
                    <span class="w-5 h-px bg-[#7ec8e3]"></span> Photo Journal <span
                        class="w-5 h-px bg-[#7ec8e3]"></span>
                </p>
                <h2 id="photo-journal-heading"
                    class="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl tracking-tight">
                    Moments from the Journey
                </h2>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-3 md:gap-4 h-[480px] md:h-[560px]">
                <figure v-for="(photo, i) in galleryPhotos" :key="i"
                    :class="['group relative rounded-2xl overflow-hidden cursor-pointer', photo.span]">
                    <img :src="photo.src" :alt="photo.alt"
                        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy" />
                    <figcaption class="absolute inset-0 flex items-end p-3">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            aria-hidden="true"></div>
                        <p
                            class="relative text-white text-sm font-bold translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                            {{ photo.alt }}</p>
                    </figcaption>
                </figure>
            </div>
        </section>


    </div>
</template>


<script setup lang="ts">

// ── SEO Meta ──────────────────────────────────
useHead({
    title: 'Uncharted with Shayon — Travel & Adventure Blog',
    meta: [
        { name: 'description', content: 'Unscripted journeys, raw landscapes, and travel stories from around the globe by Shayon.' },
        { name: 'keywords', content: 'travel blog, adventure, destinations, hiking, Maldives, Himalayas, Kyoto, travel stories' },
        { property: 'og:title', content: 'Uncharted with Shayon — Travel & Adventure Blog' },
        { property: 'og:description', content: 'Unscripted journeys and stories from the road.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Uncharted with Shayon' },
        { name: 'twitter:description', content: 'Unscripted journeys, raw landscapes, travel stories.' },
    ],
    link: [{ rel: 'canonical', href: 'https://unchartedwithshayon.com/' }]
})

// ── Search ────────────────────────────────────


const searchInputRef = ref(null);
const featureArticles = ref<IArticle[]>(articlesData);
const defaultBg = ref<string>(articlesData[0]?.featured_image || "");








const heroBg = ref(defaultBg.value)
const bgFading = ref(false)
const activeArticleId = ref<null | number>(articlesData[0]?.id || null);

function setHeroBg(articleId: number) {
    if (activeArticleId.value === articleId) {
        activeArticleId.value = -1;
        crossFadeBg(defaultBg.value);
        return
    }
    activeArticleId.value = articleId

    const bgArticle = featureArticles.value.find((a) => a.id === articleId);
    if (bgArticle) {
        crossFadeBg(bgArticle.featured_image);
    }
}
function crossFadeBg(src: string) {
    bgFading.value = true
    setTimeout(() => { heroBg.value = src; bgFading.value = false }, 420)
}

// ── Categories ────────────────────────────────
const activeCategory = ref(0)
const categories = [
    { label: 'All', icon: '🗺️', bg: 'bg-[#e8f4fd]' },
    { label: 'Hiking', icon: '🥾', bg: 'bg-[#ddf4f0]' },
    { label: 'Desert', icon: '🏜️', bg: 'bg-[#fdf3dc]' },
    { label: 'Forest', icon: '🌲', bg: 'bg-[#dcf4e4]' },
    { label: 'Camping', icon: '⛺', bg: 'bg-[#fde8dc]' },
    { label: 'Beach', icon: '🏖️', bg: 'bg-[#e8eafd]' },
]

// ── Posts ─────────────────────────────────────
const smallPosts = [
    { title: 'Trekking the Himalayas: A Solo Adventure', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80', imgAlt: 'Snow-capped Himalayan peaks with trekking trail', category: 'Hiking', date: 'Feb 28, 2025', datetime: '2025-02-28', readTime: '6 min read' },
    { title: 'Kyoto in Autumn: The Ultimate Temple Trail', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80', imgAlt: 'Kyoto temple pathway lined with autumn maples', category: 'Culture', date: 'Jan 15, 2025', datetime: '2025-01-15', readTime: '5 min read' },
]

// ── Marquee ───────────────────────────────────
const destinations = ['Maldives', 'Patagonia', 'Kyoto', 'Sahara', 'Santorini', 'Iceland', 'Bali', 'Machu Picchu', 'Amalfi Coast', 'New Zealand']

// ── Gallery ───────────────────────────────────
const galleryPhotos = [
    { src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80', alt: 'Swiss Alps panorama at golden hour', span: 'col-span-1 row-span-2' },
    { src: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&q=80', alt: 'Santorini white domes overlooking the Aegean', span: 'col-span-2 row-span-1' },
    { src: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=600&q=80', alt: 'Bali terraced rice fields at sunrise', span: 'col-span-1 row-span-1' },
    { src: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80', alt: 'Misty forest trail in the Pacific Northwest', span: 'col-span-1 row-span-1' },
    { src: 'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=600&q=80', alt: 'Aurora borealis over an Icelandic snowscape', span: 'col-span-2 row-span-1' },
]


</script>

<style scoped lang="scss">
@use "~/assets/scss/home.scss";
</style>