<template>
    <section v-if="gallery?.length" class="px-6 md:px-12 lg:px-20 py-16 bg-white" aria-labelledby="gallery-heading">
        <div class="max-w-7xl-l mx-auto-l w-full">
            <div class="text-center mb-10">
                <p class="text-[#7ec8e3] text-xs font-semibold tracking-[0.2em] uppercase mb-3 flex items-center justify-center gap-2">
                    <span class="w-5 h-px bg-[#7ec8e3]"></span> Visual Journey <span class="w-5 h-px bg-[#7ec8e3]"></span>
                </p>
                <h2 id="gallery-heading" class="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl tracking-tight">
                    Moments Captured
                </h2>
            </div>

            <!-- Interactive Masonry Grid -->
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div v-for="(image, index) in gallery" :key="image.id" 
                    :class="['group relative rounded-2xl overflow-hidden cursor-pointer',
                        index === 0 ? 'md:col-span-2 md:row-span-2' : '']"
                    @click="emit('open-lightbox', index)">
                    <img :src="image.url" :alt="`Gallery image ${index + 1}`"
                        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        :class="index === 0 ? 'aspect-[4/3]' : 'aspect-square'" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div class="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m-3-3h6"></path>
                            </svg>
                            View
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { IImage } from '~~/shared/types/image'

const props = defineProps<{
    gallery: ReadonlyArray<IImage> | null
}>()

const emit = defineEmits<{
    (e: 'open-lightbox', index: number): void
}>()
</script>