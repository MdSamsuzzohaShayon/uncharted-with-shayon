<template>
    <div class="w-full">
        <!-- ================================================================
           HERO SECTION
      ================================================================ -->
        <header>
            <!-- // relative mx-6 md:mx-12 lg:mx-20 mb-20 rounded-3xl overflow-hidden -->
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
                                    <FeatureCategory v-for="cat, i in categories"
                                        v-bind:active-category-id="activeCategoryId" v-bind:category="cat"
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
                        <button v-for="(act, i) in activities" :key="act.id" :class="['flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 flex-shrink-0 active:scale-95',
                            activeCategory === i
                                ? 'cat-btn-active bg-[#1a4a6b] text-white shadow-md shadow-[#1a4a6b]/20'
                                : 'hover:bg-[#f9fafc] text-[#555555] hover:text-[#1a1a1a] hover:scale-105']"
                            :aria-pressed="activeCategory === i" :aria-label="`Filter by ${act.name}`"
                            @click="activeCategory = i">
                            <span :class="['w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0',
                                // act.bg
                            ]" aria-hidden="true">
                                <NuxtImg :src="act.icon.url" format="webp" loading="lazy" fetchpriority="low" />
                            </span>
                            {{ act.name }}
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
                <NuxtLink v-if="firstArticle" v-bind:href="firstArticle?.slug || String(firstArticle.documentId)"
                    class="group md:col-span-2 relative rounded-2xl overflow-hidden bg-white border border-[#e5e7eb] shadow-sm hover:shadow-xl hover:shadow-black/8 transition-all duration-500 cursor-pointer hover:-translate-y-1">

                    <div class="relative h-72 md:h-80 overflow-hidden">
                        <NuxtImg format="webp" loading="lazy" fetchpriority="low"
                            :src="firstArticle?.featured_image?.url || '/imgs/no-image.jpg'" :alt="firstArticle.title"
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

                        <span v-for="cat in firstArticle.categories"
                            class="absolute top-4 left-4 bg-[#7ec8e3] text-[#1a1a1a] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                            {{ cat.name }}
                        </span>
                    </div>

                    <div class="p-6">
                        <div class="flex items-center gap-3 mb-3">
                            <time class="text-[#555555] text-xs">
                                {{ firstArticle.published_date }}
                            </time>
                        </div>

                        <h3
                            class="font-display font-bold text-[#1a1a1a] text-xl md:text-2xl leading-snug mb-3 group-hover:text-[#1a4a6b] transition-colors duration-300">
                            {{ firstArticle.title }}
                        </h3>

                        <p class="text-[#555555] text-sm leading-relaxed line-clamp-2">
                            {{ firstArticle.description }}
                        </p>
                    </div>
                </NuxtLink>

                <div class="flex flex-col gap-6">
                    <NuxtLink v-if="nextTwoArticles && nextTwoArticles.length > 0" v-for="article in nextTwoArticles"
                        :key="article.id" v-bind:href="article?.slug || String(article.id)"
                        class="group relative rounded-2xl overflow-hidden bg-white border border-[#e5e7eb] shadow-sm hover:shadow-xl hover:shadow-black/8 transition-all duration-500 cursor-pointer flex flex-col hover:-translate-y-1">

                        <div class="relative h-44 overflow-hidden">
                            <NuxtImg :src="article?.featured_image?.url || '/imgs/no-image.jpg'" format="webp"
                                loading="lazy" fetchpriority="low" :alt="article.title"
                                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>


                            <span v-for="cat in article.categories"
                                class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#1a1a1a] text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                                {{ cat.name }}
                            </span>
                        </div>

                        <div class="p-4 flex-1 flex flex-col">
                            <time class="text-[#555555] text-xs mb-1.5">
                                {{ article.published_date }}
                            </time>

                            <h3
                                class="font-display font-bold text-[#1a1a1a] text-base leading-snug group-hover:text-[#1a4a6b] transition-colors duration-300 flex-1">
                                {{ article.title }}
                            </h3>
                        </div>
                    </NuxtLink>
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
                <figure v-for="(article, i) in latestGrouped" :key="i"
                    :class="['group relative rounded-2xl overflow-hidden cursor-pointer', article.span]">
                    <NuxtImg :src="article.featured_image?.url" :alt="article.title"
                        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        format="webp" loading="lazy" fetchpriority="low" />
                    <figcaption class="absolute inset-0 flex items-end p-3">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            aria-hidden="true"></div>
                        <p
                            class="relative text-white text-sm font-bold translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                            {{ article.title }}</p>
                    </figcaption>
                </figure>
            </div>
        </section>
        <!-- <button @click="trackPurchase">
            Complete Purchase
        </button> -->

    </div>
</template>


<script setup lang="ts">
import type { IActivitiesResponse, IActivity, IArticle, IArticleSpan, ICategoriesResponse, ICategory, ILatestArticleResponse, ILatestArticlesGrouped } from '~~/shared/types';


// ── SEO Meta ──────────────────────────────────
useHead({
    title: 'Uncharted with Shayon — Travel & Adventure Blog',
    meta: [
        { name: 'description', content: 'Unscripted journeys, raw landscapes, and travel stories from around the globe by Shayon.' },
        { name: 'keywords', content: 'travel blog, adventure, destinations, hiking, Maldives, Himalayas, Kyoto, travel stories' },
        { property: 'og:title', content: 'Uncharted with Shayon — Travel & Adventure Blog' },
        { property: 'og:description', content: 'Unscripted journeys and stories from the road.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: 'https://pub-c5ea369ed0724b91bc453d6b131a6067.r2.dev/festival_7be1fef336.webp' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Uncharted with Shayon' },
        { name: 'twitter:description', content: 'Unscripted journeys, raw landscapes, travel stories.' },
    ],
    link: [{ rel: 'canonical', href: 'https://uncharted.webdevlab.org' }]
})

// ── Search ────────────────────────────────────
const defaultBg = ref<string>("https://pub-c5ea369ed0724b91bc453d6b131a6067.r2.dev/festival_7be1fef336.webp");
const heroBg = ref(defaultBg.value);
const bgFading = ref(false);
const activeCategoryId = ref<null | number>(null);
// ── Categories ────────────────────────────────
const activeCategory = ref(0)

// ── Posts ─────────────────────────────────────

// ── Marquee ───────────────────────────────────
const destinations = ['Maldives', 'Patagonia', 'Kyoto', 'Sahara', 'Santorini', 'Iceland', 'Bali', 'Machu Picchu', 'Amalfi Coast', 'New Zealand']



// Fetch Latest 3 Articles (with caching)
const config = useRuntimeConfig();

// curl --location --globoff 'http://localhost:1337/api/articles?sort=published_date%3Adesc&fields=title%2Cslug&populate[featured_image][fields]=url'
const { data: latestArticles } = await useAsyncData<ILatestArticleResponse>(
    "latest-articles",
    async () => {
        return await $fetch(`${config.public.backendApi}/api/articles`, {
            headers: {
                Authorization: `Bearer ${config.public.accessToken}`,
            },
            params: {
                sort: ["published_date:desc"],
                "fields[0]": "title",
                "fields[1]": "slug",
                "fields[2]": "documentId",
                "fields[3]": "meta_title",
                // meta_title

                "pagination[limit]": 5,

                "populate[featured_image][fields][0]": "url",
            },
        })
    }
);




const latestGrouped = computed<IArticleSpan[]>(() => {

    const spans = ['col-span-1 row-span-2',
        'col-span-2 row-span-1',
        'col-span-1 row-span-1',
        'col-span-1 row-span-1',
        'col-span-2 row-span-1',]

    return (latestArticles.value?.data ?? []).map((article: IArticle, i: number) => ({
        ...article,
        span: spans[i] || "",
    }))
})




// Fetch Featured Articles (3 articles for home page)
const { data: featuredArticles, error: featuredError, pending: featuredPending } = await useAsyncData<IFeaturedArticlesResponse>(
    "featured-articles",
    async () => {
        return await $fetch(`${config.public.backendApi}/api/featured-posts`, {
            headers: {
                Authorization: `Bearer ${config.public.fullAccessToken}`,
            },
            params: {
                "pagination[start]": 0,
                "pagination[limit]": 3,
                "fields[0]": "title",
                "fields[1]": "slug",
                "fields[2]": "documentId",
                "populate[featured_image][fields][0]": "url",
                "populate[categories][fields][0]": "name",
                "populate[categories][fields][1]": "slug",
            }
        })
    }
);



const firstArticle = computed(() => {
    return featuredArticles.value?.data?.[0] ?? null;
})

const nextTwoArticles = computed(() => {
    return featuredArticles.value?.data?.slice(1, 3) ?? [];
});




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





// Watch for data changes and update categories
const categories = computed(() => categoriesData.value?.data ?? []);




function setHeroBg(categoryId: number) {
    // Setting default
    if (activeCategoryId.value === categoryId) {
        activeCategoryId.value = -1;
        crossFadeBg(defaultBg.value);
        return
    }
    activeCategoryId.value = categoryId;

    const bgCategory = categories.value.find((a) => a.id === categoryId);
    if (bgCategory) {
        crossFadeBg(bgCategory.featured_image?.url || null);
    }
}
function crossFadeBg(src: string | null) {
    if (!src) return;
    bgFading.value = true
    setTimeout(() => { heroBg.value = src; bgFading.value = false }, 420)
}



const { data: activitiesData } = await useAsyncData<IActivitiesResponse>(
    "activities",
    async () => {
        return await $fetch(`${config.public.backendApi}/api/activities`, {
            headers: {
                Authorization: `Bearer ${config.public.accessToken}`,
            },
            params: {
                "fields[0]": "documentId",
                "fields[1]": "name",

                "pagination[limit]": 100,

                "populate[icon][fields][0]": "url",
            },
        })
    }
)

const activities = computed(() => activitiesData.value?.data ?? []);



</script>

<style scoped lang="scss">
@use "~/assets/scss/home.scss";
</style>