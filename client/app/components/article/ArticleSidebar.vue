<template>
    <div class="sticky top-24 space-y-8">
        <!-- Categories -->
        <div class="bg-white rounded-2xl p-6 border border-[#e5e7eb] shadow-sm">
            <h3 class="font-display font-bold text-[#1a1a1a] text-lg mb-4">Categories</h3>
            <div class="space-y-2">
                <NuxtLink v-for="cat in article.categories" :key="cat.id" :to="`/category/${cat.slug}`"
                    class="flex items-center justify-between p-3 rounded-lg hover:bg-[#f9fafc] group transition-all duration-200">
                    <span class="text-[#555555] group-hover:text-[#1a4a6b] font-medium">{{ cat.name }}</span>
                    <svg class="w-4 h-4 text-[#7ec8e3] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </NuxtLink>
            </div>
        </div>

        <!-- YouTube Video -->
        <div v-if="article.youtube_url" class="bg-white rounded-2xl p-6 border border-[#e5e7eb] shadow-sm">
            <h3 class="font-display font-bold text-[#1a1a1a] text-lg mb-4">Watch Video</h3>
            <div class="relative rounded-xl overflow-hidden cursor-pointer group" @click="emit('video-click')">
                <img :src="`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`"
                    :alt="article.title"
                    class="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105" />
                <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div class="w-14 h-14 rounded-full bg-[#7ec8e3] flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300">
                        <svg class="w-6 h-6 text-[#1a1a1a] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>

        <!-- Social Share -->
        <div class="bg-white rounded-2xl p-6 border border-[#e5e7eb] shadow-sm">
            <h3 class="font-display font-bold text-[#1a1a1a] text-lg mb-4">Share Story</h3>
            <div class="flex gap-3">
                <button @click="emit('share-twitter')"
                    class="flex-1 h-12 rounded-xl bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.677-11.855c0-.21-.005-.423-.015-.635A9.936 9.936 0 0024 4.59z" />
                    </svg>
                    <span class="text-sm font-medium">Tweet</span>
                </button>
                <button @click="emit('share-facebook')"
                    class="flex-1 h-12 rounded-xl bg-[#4267B2] hover:bg-[#365899] text-white flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span class="text-sm font-medium">Share</span>
                </button>
                <button @click="emit('copy-link')"
                    class="w-12 h-12 rounded-xl bg-[#f9fafc] hover:bg-[#7ec8e3]/10 border border-[#e5e7eb] flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                    :class="{ 'bg-green-50 border-green-200': linkCopied }">
                    <svg v-if="!linkCopied" class="w-5 h-5 text-[#555555]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                    </svg>
                    <svg v-else class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </button>
            </div>
        </div>

        <!-- Featured Articles -->
        <div class="bg-white rounded-2xl p-6 border border-[#e5e7eb] shadow-sm">
            <h3 class="font-display font-bold text-[#1a1a1a] text-lg mb-4">More Adventures</h3>
            <div class="space-y-4">
                <NuxtLink v-for="related in relatedArticles" :key="related.id" :to="`/articles/${related.slug}`" class="flex gap-3 group">
                    <img :src="related.featured_image?.url || '/imgs/no-image.jpg'"
                        :alt="related.title"
                        class="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                    <div>
                        <h4 class="text-sm font-semibold text-[#1a1a1a] group-hover:text-[#1a4a6b] transition-colors duration-200 line-clamp-2">
                            {{ related.title }}
                        </h4>
                        <p class="text-xs text-[#555555] mt-1">{{ formatDate(related.published_date) }}</p>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IArticle } from '#shared/types/article'
import { formatDate, getYouTubeId } from '#shared/utils/helpers'

const props = defineProps<{
    article: IArticle
    relatedArticles: any[]
    linkCopied: boolean
}>()

const emit = defineEmits<{
    (e: 'video-click'): void
    (e: 'share-twitter'): void
    (e: 'share-facebook'): void
    (e: 'copy-link'): void
}>()

const youtubeId = computed(() => getYouTubeId(props.article.youtube_url || ''))
</script>