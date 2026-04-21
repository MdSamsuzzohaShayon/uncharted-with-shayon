<template>
    <div class="w-full bg-[#f9fafc] font-body overflow-x-hidden">
        <!-- Loading State -->
        <div v-if="pending" class="min-h-screen flex items-center justify-center">
            <div class="text-center">
                <div
                    class="w-16 h-16 border-4 border-[#7ec8e3] border-t-transparent rounded-full animate-spin mx-auto mb-4">
                </div>
                <p class="text-[#555555]">Loading adventure...</p>
            </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="min-h-screen flex items-center justify-center px-6">
            <div class="text-center max-w-md">
                <div class="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
                    <svg class="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z">
                        </path>
                    </svg>
                </div>
                <h2 class="font-display font-bold text-2xl text-[#1a1a1a] mb-3">Story Not Found</h2>
                <p class="text-[#555555] mb-6">{{ error.message }}</p>
                <NuxtLink to="/"
                    class="inline-block px-6 py-3 bg-[#7ec8e3] hover:bg-[#5bb8d4] text-[#1a1a1a] font-semibold rounded-full text-sm transition-all duration-300">
                    Return Home
                </NuxtLink>
            </div>
        </div>

        <!-- Article Content -->
        <article v-else-if="article">
            <!-- Reading Progress Bar -->
            <div v-if="readingProgress > 0.1" class="fixed top-0 left-0 right-0 h-1 z-50 bg-[#e5e7eb]">
                <div class="h-full bg-gradient-to-r from-[#7ec8e3] to-[#1a4a6b] transition-all duration-150"
                    :style="{ width: `${readingProgress * 100}%` }"></div>
            </div>

            <!-- Hero Section -->
            <ArticleHero :article="article" :hero-background-image="heroBackgroundImage"
                :article-location="articleLocation" @map-preview="showMapPreview = $event"
                @hero-image-ready="heroImage = $event" />

            <!-- Content Section -->
            <section class="px-6 md:px-12 lg:px-20 py-16">
                <div class="max-w-7xl-l mx-auto-l w-full">
                    <div class="flex flex-col lg:flex-row gap-12">
                        <!-- Left Column: Article Description -->
                        <div class="lg:w-8/12">
                            <div class="prose prose-lg max-w-none article-content"
                                v-html="renderMarkdown(article.description)"></div>

                            <!-- Tags -->
                            <div v-if="article.tags?.length" class="mt-12 pt-8 border-t border-[#e5e7eb]">
                                <h3 class="text-sm font-semibold text-[#555555] uppercase tracking-wider mb-4">Related
                                    Topics</h3>
                                <div class="flex flex-wrap gap-2">
                                    <NuxtLink v-for="tag in article.tags" :key="tag.id" :to="`/search?tag=${tag.slug}`"
                                        class="px-4 py-2 bg-white hover:bg-[#7ec8e3]/10 text-[#555555] hover:text-[#1a4a6b] text-sm rounded-full border border-[#e5e7eb] transition-all duration-300">
                                        #{{ tag.name }}
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>

                        <!-- Right Column: Sidebar -->
                        <div class="lg:w-4/12">
                            <ArticleSidebar :article="article" :related-articles="relatedArticles"
                                :link-copied="linkCopied" @video-click="showVideoModal = true"
                                @share-twitter="shareOnTwitter" @share-facebook="shareOnFacebook"
                                @copy-link="copyLink" />
                        </div>
                    </div>
                </div>
            </section>

            <!-- Gallery Section -->
            <ArticleGallery :gallery="article.gallery" @open-lightbox="openLightbox" />

            <!-- Previous/Next Navigation -->
            <ArticleNavigation :prev-article="prevArticle" :next-article="nextArticle" />

            <!-- Map Section -->
            <section v-if="hasValidCoordinates(article.map_lat, article.map_lng)" id="full-map-section"
                class="px-6 md:px-12 lg:px-20 py-16 bg-white">
                <div class="max-w-7xl-l mx-auto-l w-full">
                    <div class="text-center mb-10">
                        <p
                            class="text-[#7ec8e3] text-xs font-semibold tracking-[0.2em] uppercase mb-3 flex items-center justify-center gap-2">
                            <span class="w-5 h-px bg-[#7ec8e3]"></span> Location <span
                                class="w-5 h-px bg-[#7ec8e3]"></span>
                        </p>
                        <h2 class="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl tracking-tight mb-2">
                            Explore the Area</h2>
                        <p class="text-[#555555]">{{ articleLocation }}</p>
                    </div>

                    <div class="rounded-2xl overflow-hidden border border-[#e5e7eb] shadow-lg h-[400px] md:h-[500px]">
                        <ClientOnly>
                            <GeoapifyMap :latitude="article.map_lat || 90.3563" :longitude="article.map_lng || 23.6850"
                                :zoom="14" :show-marker="true" :marker-text="article.title" :interactive="true" />
                        </ClientOnly>
                    </div>

                    <div class="mt-4 flex justify-center">
                        <a :href="`https://www.google.com/maps?q=${article.map_lat},${article.map_lng}`" target="_blank"
                            class="inline-flex items-center gap-2 px-4 py-2 bg-[#f9fafc] hover:bg-[#7ec8e3]/10 text-[#555555] hover:text-[#1a4a6b] text-sm rounded-full border border-[#e5e7eb] transition-all duration-300">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14">
                                </path>
                            </svg>
                            Open in Google Maps
                        </a>
                    </div>
                </div>
            </section>

            <!-- Comments Section -->
            <ArticleComments :comments="displayComments" @submit-comment="submitComment" />
        </article>

        <!-- Modals -->
        <ArticleModals :show-video-modal="showVideoModal" :youtube-id="youtubeId" :show-lightbox="lightboxOpen"
            :current-image="currentLightboxImage" :current-index="lightboxIndex"
            :total-images="article?.gallery?.length || 0" @close-video="showVideoModal = false"
            @close-lightbox="lightboxOpen = false" @prev-image="previousImage" @next-image="nextImage" />
    </div>
</template>

<script setup lang="ts">
import { formatDate, formatNumber, formatTravelCost, formatTimeAgo, hasValidCoordinates, getLocationString, getYouTubeId, calculateReadingTime, renderMarkdown } from '#shared/utils/helpers'
import { dummyCommentsData } from '~~/shared/utils/staticData'

// Route
const route = useRoute()
const slug = computed(() => route.params.slug as string)

// Article Data
const { article, pending, error, fetchArticle, incrementViews } = useArticle()
await fetchArticle(slug.value)

if (article.value && import.meta.client) {
    await incrementViews(article.value.documentId)
}

// Refs
const heroImage = ref<HTMLElement | null>(null)
const readingProgress = ref<number>(0)
const showMapPreview = ref<boolean>(false)
const showVideoModal = ref<boolean>(false)
const lightboxOpen = ref<boolean>(false)
const lightboxIndex = ref<number>(0)
const currentLightboxImage = ref<string>('')
const linkCopied = ref<boolean>(false)

// Computed
const heroBackgroundImage = computed(() => article.value?.featured_image?.url || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2000&q=90')
const articleLocation = computed(() => getLocationString(article.value?.map_lat, article.value?.map_lng))
const youtubeId = computed(() => getYouTubeId(article.value?.youtube_url || ''))

// Dummy Data (moved to composable in production)
const displayComments = ref(dummyCommentsData);
const relatedArticles = ref(relatedArticlesData);
const prevArticle = ref(prevArticleData);
const nextArticle = ref(nextArticleData);


// Methods
const openLightbox = (index: number) => {
    if (!article.value?.gallery) return
    lightboxIndex.value = index
    currentLightboxImage.value = article.value.gallery[index]?.url || ""
    lightboxOpen.value = true
}

const nextImage = () => {
    if (!article.value?.gallery) return
    if (lightboxIndex.value < article.value.gallery.length - 1) {
        lightboxIndex.value++
        currentLightboxImage.value = article.value.gallery[lightboxIndex.value]?.url || ""
    }
}

const previousImage = () => {
    if (lightboxIndex.value > 0) {
        lightboxIndex.value--
        currentLightboxImage.value = article.value!.gallery[lightboxIndex.value]?.url || ""
    }
}

const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(article.value?.title || '')
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400')
}

const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400')
}

const copyLink = async () => {
    try {
        await navigator.clipboard.writeText(window.location.href)
        linkCopied.value = true
        setTimeout(() => { linkCopied.value = false }, 2000)
    } catch (err) {
        console.error('Failed to copy:', err)
    }
}

const submitComment = (formData: any) => {
    displayComments.value.unshift({
        id: Date.now(),
        ...formData,
        date: new Date()
    })
}

// Lifecycle
onMounted(() => {
    const handleScroll = () => {
        const winScroll = document.documentElement.scrollTop
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
        readingProgress.value = winScroll / height

        if (heroImage.value) {
            heroImage.value.style.transform = `translateY(${window.pageYOffset * 0.3}px)`
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    onUnmounted(() => window.removeEventListener('scroll', handleScroll))
})

// SEO
useSeoMeta({
    title: () => article.value?.meta_title || article.value?.title || 'Travel Article',
    description: () => article.value?.meta_description || article.value?.description?.substring(0, 160) || '',
    ogTitle: () => article.value?.meta_title || article.value?.title,
    ogDescription: () => article.value?.meta_description || article.value?.description?.substring(0, 160) || '',
    ogImage: () => article.value?.featured_image?.url,
    ogType: 'article',
    twitterCard: 'summary_large_image',
})
</script>

<style scoped lang="scss">
@use "~/assets/scss/single-article.scss";
</style>