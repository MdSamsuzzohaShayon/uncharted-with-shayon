<template>
    <header class="relative min-h-screen flex flex-col overflow-hidden">
        <!-- Background Image with Parallax -->
        <div class="absolute inset-0 z-0">
            <img :src="heroBackgroundImage" :alt="article.title"
                class="w-full h-full object-cover hero-parallax" ref="heroImageRef" fetchpriority="high" />
            <div class="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#f9fafc] to-transparent"></div>
        </div>

        <!-- Hero Content -->
        <div class="relative z-10 flex-1 flex items-center px-6 md:px-12 lg:px-20 pt-24 pb-16">
            <div class="w-full max-w-7xl-l mx-auto-l w-full">
                <!-- Categories -->
                <div class="mb-6 text-center lg:text-left">
                    <div class="inline-flex flex-wrap gap-2 justify-center lg:justify-start">
                        <NuxtLink v-for="cat in article.categories" :key="cat.id" :to="`/category/${cat.slug}`"
                            class="px-4 py-1.5 bg-white/10 backdrop-blur-sm hover:bg-[#7ec8e3]/20 text-white text-xs font-semibold rounded-full border border-white/20 transition-all duration-300 hover:scale-105">
                            {{ cat.name }}
                        </NuxtLink>
                    </div>
                </div>

                <!-- Title -->
                <h1 class="font-display font-black text-white text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tighter text-center lg:text-left mb-6">
                    {{ article.title }}
                </h1>

                <!-- Stats Grid -->
                <ArticleStats :article="article" :article-location="articleLocation" @map-preview="handleMapPreview" />

                <!-- Best Time to Visit -->
                <div v-if="article.best_time" class="inline-block mb-6">
                    <div class="flex items-center gap-2 px-4 py-2 bg-[#7ec8e3]/10 backdrop-blur-sm rounded-full border border-[#7ec8e3]/30">
                        <svg class="w-4 h-4 text-[#7ec8e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span class="text-white/90 text-sm">Best time to visit: <span class="font-semibold">{{ article.best_time }}</span></span>
                    </div>
                </div>

                <!-- Author Info -->
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-full bg-gradient-to-br from-[#7ec8e3] to-[#1a4a6b] p-0.5">
                        <div class="w-full h-full rounded-full bg-[#1a1a1a] flex items-center justify-center">
                            <span class="text-white font-bold text-xl">S</span>
                        </div>
                    </div>
                    <div>
                        <p class="text-white/60 text-xs uppercase tracking-wider">Written by</p>
                        <p class="text-white font-display font-bold">Shayon</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Scroll Indicator -->
        <div class="relative z-10 text-center pb-8">
            <div class="inline-flex flex-col items-center gap-2 text-white/40 text-xs animate-bounce">
                <span>Scroll to explore</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7-7-7"></path>
                </svg>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import type { IArticle } from '~~/shared/types/article'

const props = defineProps<{
    article: IArticle
    heroBackgroundImage: string
    articleLocation: string
}>()

const emit = defineEmits<{
    (e: 'map-preview', show: boolean): void
    (e: 'hero-image-ready', element: HTMLElement | null): void
}>()

const heroImageRef = ref<HTMLElement | null>(null)

const handleMapPreview = (show: boolean) => {
    emit('map-preview', show)
}

// Expose hero image ref to parent
watch(heroImageRef, (el) => {
    emit('hero-image-ready', el)
}, { immediate: true })

defineExpose({
    heroImageRef
})
</script>