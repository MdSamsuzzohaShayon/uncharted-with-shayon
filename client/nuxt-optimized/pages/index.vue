<template>
  <div class="w-full">

    <!-- Loading fallback (only visible during client-side nav without cache) -->
    <HomeSkeleton v-if="pending" />

    <!-- Hard error state -->
    <div
      v-else-if="error"
      class="min-h-screen flex items-center justify-center text-center px-6"
      role="alert"
    >
      <div>
        <p class="text-2xl font-bold text-[#1a1a1a] mb-2">Something went wrong</p>
        <p class="text-[#555555] mb-6">{{ error.message }}</p>
        <button
          class="px-6 py-3 bg-[#1a4a6b] text-white rounded-full font-semibold hover:bg-[#163d58] transition-colors"
          @click="refresh()"
        >
          Try again
        </button>
      </div>
    </div>

    <template v-else>

      <!-- ================================================================
           HERO SECTION
      ================================================================ -->
      <header>
        <section
          class="relative min-h-screen flex flex-col overflow-hidden"
          aria-label="Hero"
        >

          <!-- Background image with cross-fade -->
          <div class="absolute inset-0 z-0" aria-hidden="true">
            <NuxtImg
              :src="heroBg"
              alt="Scenic adventure landscape"
              class="hero-bg-image w-full h-full object-cover"
              :class="{ 'is-fading': bgFading }"
              fetchpriority="high"
              format="webp"
              width="1920"
              height="1080"
              loading="eager"
            />
            <div class="absolute inset-0 bg-gradient-to-br from-[#1a1a1a]/72 via-[#1a4a6b]/40 to-[#0f2a3f]/60" />
            <div class="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[#f9fafc] to-transparent" />
          </div>

          <!-- ====== NAVBAR ====== -->
          <Navbar />

          <!-- ====== HERO CONTENT ====== -->
          <main>
            <div class="relative z-10 flex-1 flex items-center px-6 md:px-12 lg:px-20 pb-32 pt-8">
              <div class="w-full flex flex-col lg:flex-row items-center justify-between gap-12">

                <!-- Left: Headline -->
                <div class="max-w-xl lg:max-w-none lg:w-5/12 text-center lg:text-left">
                  <p class="anim-hero-label text-[#7ec8e3] text-sm font-semibold tracking-[0.2em] uppercase mb-4 flex items-center justify-center lg:justify-start gap-2">
                    <span class="w-6 h-px bg-[#7ec8e3]" aria-hidden="true" />
                    Travel &amp; Adventure Blog
                  </p>
                  <h1 class="anim-hero-h1 font-display font-black text-white leading-none">
                    <span class="block text-7xl md:text-8xl lg:text-9xl tracking-tighter">EXPLORE</span>
                    <span class="block text-4xl md:text-5xl lg:text-6xl tracking-widest text-[#7ec8e3] mt-1">THE WORLD</span>
                  </h1>
                  <p class="anim-hero-body text-white/70 text-base md:text-lg mt-6 leading-relaxed max-w-md mx-auto lg:mx-0">
                    Unscripted journeys, raw landscapes, and stories from the road. Join Shayon's adventures across the globe.
                  </p>
                  <div class="anim-hero-cta flex flex-col sm:flex-row gap-3 mt-8 justify-center lg:justify-start">
                    <NuxtLink
                      href="/articles"
                      class="px-7 py-3.5 bg-[#7ec8e3] hover:bg-[#5bb8d4] text-[#1a1a1a] font-semibold rounded-full text-sm tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-[#7ec8e3]/30 hover:-translate-y-0.5 active:scale-95 text-center"
                    >
                      Start Exploring →
                    </NuxtLink>
                    <NuxtLink
                      href="/gallery"
                      class="px-7 py-3.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-full text-sm tracking-wide border border-white/20 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                    >
                      Gallery
                    </NuxtLink>
                  </div>
                </div>

                <!-- Right: Floating Image Cards -->
                <div
                  class="anim-cards-wrap relative w-full lg:w-7/12 h-[420px] md:h-[500px] flex items-center justify-end"
                  aria-label="Featured travel destinations"
                >
                  <div class="flex gap-3 md:gap-4 items-end justify-center">
                    <FeatureCategory
                      v-for="cat in categories"
                      :key="cat.id"
                      :category="cat"
                      :active-category-id="activeCategoryId"
                      @set-hero-bg="setHeroBg"
                    />
                  </div>
                </div>

              </div>
            </div>
          </main>

          <!-- ====== CATEGORY FILTER BAR ====== -->
          <nav
            class="absolute bottom-0 left-0 right-0 z-20 px-6 md:px-12 lg:px-20 pb-6"
            aria-label="Category filter"
          >
            <div class="bg-white/92 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/10 border border-[#e5e7eb] px-4 md:px-8 py-4 flex items-center gap-2 md:gap-4 overflow-x-auto scrollbar-hide">
              <span
                class="text-[#555555] text-xs font-semibold tracking-widest uppercase whitespace-nowrap mr-2 hidden md:block"
                aria-hidden="true"
              >Explore</span>
              <div class="w-px h-6 bg-[#e5e7eb] hidden md:block" aria-hidden="true" />

              <button
                v-for="(act, i) in activities"
                :key="act.id"
                :class="[
                  'flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 flex-shrink-0 active:scale-95',
                  activeCategory === i
                    ? 'bg-[#1a4a6b] text-white shadow-md shadow-[#1a4a6b]/20'
                    : 'hover:bg-[#f9fafc] text-[#555555] hover:text-[#1a1a1a] hover:scale-105',
                ]"
                :aria-pressed="activeCategory === i"
                :aria-label="`Filter by ${act.name}`"
                @click="activeCategory = i"
              >
                <span class="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0" aria-hidden="true">
                  <NuxtImg
                    v-if="act.icon?.url"
                    :src="act.icon.url"
                    :alt="act.name"
                    format="webp"
                    loading="lazy"
                    fetchpriority="low"
                    width="32"
                    height="32"
                  />
                </span>
                {{ act.name }}
              </button>
            </div>
          </nav>

        </section>
      </header>

      <!-- ================================================================
           FEATURED POSTS
      ================================================================ -->
      <section
        class="px-6 md:px-12 lg:px-20 pt-16 pb-20"
        aria-labelledby="latest-stories-heading"
      >
        <div class="flex items-end justify-between mb-10">
          <div>
            <p
              class="text-[#7ec8e3] text-xs font-semibold tracking-[0.2em] uppercase mb-2 flex items-center gap-2"
              aria-hidden="true"
            >
              <span class="w-5 h-px bg-[#7ec8e3]" /> Latest Stories
            </p>
            <h2
              id="latest-stories-heading"
              class="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl tracking-tight"
            >
              Fresh from the Road
            </h2>
          </div>
          <a
            href="/stories"
            class="hidden md:flex items-center gap-2 text-[#555555] text-sm font-medium hover:text-[#1a1a1a] transition-colors duration-200 group"
          >
            View All
            <svg
              class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <!-- Large featured card -->
          <NuxtLink
            v-if="firstArticle"
            :href="`/articles/${firstArticle.slug ?? firstArticle.documentId}`"
            class="group md:col-span-2 relative rounded-2xl overflow-hidden bg-white border border-[#e5e7eb] shadow-sm hover:shadow-xl hover:shadow-black/8 transition-all duration-500 cursor-pointer hover:-translate-y-1"
          >
            <div class="relative h-72 md:h-80 overflow-hidden">
              <NuxtImg
                :src="firstArticle.featured_image?.url ?? '/imgs/no-image.jpg'"
                :alt="firstArticle.title"
                format="webp"
                loading="lazy"
                fetchpriority="low"
                width="800"
                height="320"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <span
                v-for="cat in firstArticle.categories"
                :key="cat.slug"
                class="absolute top-4 left-4 bg-[#7ec8e3] text-[#1a1a1a] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider"
              >
                {{ cat.name }}
              </span>
            </div>

            <div class="p-6">
              <time class="text-[#555555] text-xs block mb-3">
                {{ firstArticle.published_date }}
              </time>
              <h3 class="font-display font-bold text-[#1a1a1a] text-xl md:text-2xl leading-snug mb-3 group-hover:text-[#1a4a6b] transition-colors duration-300">
                {{ firstArticle.title }}
              </h3>
              <p class="text-[#555555] text-sm leading-relaxed line-clamp-2">
                {{ firstArticle.content }}
              </p>
            </div>
          </NuxtLink>

          <!-- Smaller cards column -->
          <div class="flex flex-col gap-6">
            <NuxtLink
              v-for="article in nextTwoArticles"
              :key="article.id"
              :href="`/articles/${article.slug ?? article.id}`"
              class="group relative rounded-2xl overflow-hidden bg-white border border-[#e5e7eb] shadow-sm hover:shadow-xl hover:shadow-black/8 transition-all duration-500 cursor-pointer flex flex-col hover:-translate-y-1"
            >
              <div class="relative h-44 overflow-hidden">
                <NuxtImg
                  :src="article.featured_image?.url ?? '/imgs/no-image.jpg'"
                  :alt="article.title"
                  format="webp"
                  loading="lazy"
                  fetchpriority="low"
                  width="400"
                  height="176"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span
                  v-for="cat in article.categories"
                  :key="cat.slug"
                  class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#1a1a1a] text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                >
                  {{ cat.name }}
                </span>
              </div>

              <div class="p-4 flex-1 flex flex-col">
                <time class="text-[#555555] text-xs mb-1.5">
                  {{ article.published_date }}
                </time>
                <h3 class="font-display font-bold text-[#1a1a1a] text-base leading-snug group-hover:text-[#1a4a6b] transition-colors duration-300 flex-1">
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
          <span
            v-for="(dest, i) in marqueeDestinations"
            :key="`${dest}-${i}`"
            class="text-white/30 text-sm font-semibold tracking-[0.3em] uppercase flex-shrink-0 flex items-center gap-8"
          >
            {{ dest }}
            <span class="w-1.5 h-1.5 rounded-full bg-[#7ec8e3]/60 inline-block" />
          </span>
        </div>
      </div>

      <!-- ================================================================
           PHOTO JOURNAL MOSAIC
      ================================================================ -->
      <section
        class="px-6 md:px-12 lg:px-20 py-20 bg-[#f9fafc]"
        aria-labelledby="photo-journal-heading"
      >
        <div class="text-center mb-12">
          <p
            class="text-[#7ec8e3] text-xs font-semibold tracking-[0.2em] uppercase mb-3 flex items-center justify-center gap-2"
            aria-hidden="true"
          >
            <span class="w-5 h-px bg-[#7ec8e3]" /> Photo Journal
            <span class="w-5 h-px bg-[#7ec8e3]" />
          </p>
          <h2
            id="photo-journal-heading"
            class="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl tracking-tight"
          >
            Moments from the Journey
          </h2>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-3 md:gap-4 h-[480px] md:h-[560px]">
          <figure
            v-for="(article, i) in latestGrouped"
            :key="article.id"
            :class="['group relative rounded-2xl overflow-hidden cursor-pointer', article.span]"
          >
            <NuxtImg
              :src="article.featured_image?.url ?? '/imgs/no-image.jpg'"
              :alt="article.title"
              format="webp"
              loading="lazy"
              fetchpriority="low"
              width="600"
              height="400"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <figcaption class="absolute inset-0 flex items-end p-3">
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              />
              <p class="relative text-white text-sm font-bold translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {{ article.title }}
              </p>
            </figcaption>
          </figure>
        </div>
      </section>

    </template>
  </div>
</template>

<script setup lang="ts">
// ── Data ──────────────────────────────────────────────────────────────────────
const { data, pending, error, latestGrouped, firstArticle, nextTwoArticles, categories, activities } = useHomeData()

// Expose refresh for error-state retry button
const { refresh } = useAsyncData('home-page', () => $fetch('/api/home-data'), { immediate: false })

// ── Hero background ───────────────────────────────────────────────────────────
const DEFAULT_BG = 'https://pub-c5ea369ed0724b91bc453d6b131a6067.r2.dev/festival_7be1fef336.webp'
const { heroBg, bgFading, activeCategoryId, setHeroBg } = useHeroBg(categories, DEFAULT_BG)

// ── Category filter ───────────────────────────────────────────────────────────
const activeCategory = ref(0)

// ── Marquee – doubled list computed once, not inline in template ──────────────
const BASE_DESTINATIONS = [
  'Maldives', 'Patagonia', 'Kyoto', 'Sahara', 'Santorini',
  'Iceland', 'Bali', 'Machu Picchu', 'Amalfi Coast', 'New Zealand',
] as const

const marqueeDestinations = computed(() => [...BASE_DESTINATIONS, ...BASE_DESTINATIONS])

// ── SEO Meta ──────────────────────────────────────────────────────────────────
useHead({
  title: 'Uncharted with Shayon — Travel & Adventure Blog',
  meta: [
    { name: 'description', content: 'Unscripted journeys, raw landscapes, and travel stories from around the globe by Shayon.' },
    { name: 'keywords', content: 'travel blog, adventure, destinations, hiking, Maldives, Himalayas, Kyoto, travel stories' },
    { property: 'og:title', content: 'Uncharted with Shayon — Travel & Adventure Blog' },
    { property: 'og:description', content: 'Unscripted journeys and stories from the road.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: DEFAULT_BG },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Uncharted with Shayon' },
    { name: 'twitter:description', content: 'Unscripted journeys, raw landscapes, travel stories.' },
  ],
  link: [{ rel: 'canonical', href: 'https://uncharted.webdevlab.org' }],
})
</script>

<style scoped lang="scss">
@use "~/assets/scss/home.scss";
</style>
