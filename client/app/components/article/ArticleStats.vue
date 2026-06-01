<template>
    <div class="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-4xl mx-auto lg:mx-0 mb-8">
        <!-- Views -->
        <div class="stat-card">
            <div class="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div class="w-10 h-10 rounded-lg bg-[#7ec8e3]/20 flex items-center justify-center">
                    <svg class="w-5 h-5 text-[#7ec8e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                </div>
                <div>
                    <p class="text-white/60 text-[10px] uppercase tracking-wider">Views</p>
                    <p class="text-white text-sm font-semibold">{{ formatNumber(article.views) }}</p>
                </div>
            </div>
        </div>

        <!-- Date -->
        <div class="stat-card">
            <div class="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div class="w-10 h-10 rounded-lg bg-[#7ec8e3]/20 flex items-center justify-center">
                    <svg class="w-5 h-5 text-[#7ec8e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                </div>
                <div>
                    <p class="text-white/60 text-[10px] uppercase tracking-wider">Published</p>
                    <p class="text-white text-sm font-semibold">{{ formatDate(article.published_date) }}</p>
                </div>
            </div>
        </div>

        <!-- Travel Cost -->
        <div v-if="article.travel_cost" class="stat-card">
            <div class="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div class="w-10 h-10 rounded-lg bg-[#7ec8e3]/20 flex items-center justify-center">
                    <svg class="w-5 h-5 text-[#7ec8e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
                <div>
                    <p class="text-white/60 text-[10px] uppercase tracking-wider">Travel Cost</p>
                    <p class="text-white text-sm font-semibold">{{ formatTravelCost(article.travel_cost) }}</p>
                </div>
            </div>
        </div>

        <!-- Reading Time -->
        <div class="stat-card">
            <div class="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div class="w-10 h-10 rounded-lg bg-[#7ec8e3]/20 flex items-center justify-center">
                    <svg class="w-5 h-5 text-[#7ec8e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"></path>
                    </svg>
                </div>
                <div>
                    <p class="text-white/60 text-[10px] uppercase tracking-wider">Read Time</p>
                    <p class="text-white text-sm font-semibold">{{ readingTime }} min</p>
                </div>
            </div>
        </div>

        <!-- Location -->
        <div class="stat-card group" @mouseenter="emit('map-preview', true)" @mouseleave="emit('map-preview', false)">
            <div class="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div class="w-10 h-10 rounded-lg bg-[#7ec8e3]/20 flex items-center justify-center">
                    <svg class="w-5 h-5 text-[#7ec8e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                </div>
                <div>
                    <p class="text-white/60 text-[10px] uppercase tracking-wider">Location</p>
                    <p class="text-white text-sm font-semibold truncate max-w-[120px]">{{ articleLocation }}</p>
                </div>
            </div>

            <!-- Map Preview Tooltip -->
            <Transition name="fade">
                <div v-if="hasValidCoordinates(article?.map_lat, article?.map_lng) && showMapPreview"
                    class="absolute z-50 mt-2 w-80 rounded-xl overflow-hidden shadow-2xl">
                    <div class="bg-white">
                        <ClientOnly>
                            <GeoapifyMap v-if="showMapPreview"
                                :latitude="article.map_lat || 90.3563"
                                :longitude="article.map_lng || 23.6850"
                                :zoom="12"
                                :show-marker="true"
                                :marker-text="articleLocation"
                                :interactive="false"
                                class="w-full h-48" />
                        </ClientOnly>
                        <div class="p-3 border-t border-gray-100">
                            <p class="text-xs text-center text-[#1a4a6b] font-medium">{{ articleLocation }}</p>
                            <button @click="emit('scroll-to-map')"
                                class="w-full mt-2 px-3 py-1.5 bg-[#7ec8e3]/10 hover:bg-[#7ec8e3]/20 text-[#1a4a6b] text-xs font-medium rounded-lg transition-colors duration-200">
                                View Full Map ↓
                            </button>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IArticle } from '~~/shared/types/article'
import { formatDate, formatNumber, formatTravelCost, calculateReadingTime, hasValidCoordinates } from '~~/shared/utils/helpers'

const props = defineProps<{
    article: IArticle
    articleLocation: string
    showMapPreview?: boolean
}>()

const emit = defineEmits<{
    (e: 'map-preview', show: boolean): void
    (e: 'scroll-to-map'): void
}>()

const readingTime = computed(() => calculateReadingTime(props.article.description))
</script>