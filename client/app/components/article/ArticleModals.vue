<template>
    <Teleport to="body">
        <!-- Video Modal -->
        <Transition name="modal">
            <div v-if="showVideoModal" class="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" @click="emit('close-video')">
                <div class="relative max-w-6xl w-full" @click.stop>
                    <button @click="emit('close-video')" class="absolute -top-12 right-0 text-white/60 hover:text-white transition-all duration-300">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                    <div class="relative rounded-2xl overflow-hidden" style="padding-bottom: 56.25%">
                        <iframe :src="`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`"
                            class="absolute inset-0 w-full h-full" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                        </iframe>
                    </div>
                </div>
            </div>
        </Transition>

        <!-- Lightbox Modal -->
        <Transition name="modal">
            <div v-if="showLightbox" class="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" @click="emit('close-lightbox')">
                <div class="relative max-w-7xl w-full mx-4" @click.stop>
                    <button @click="emit('close-lightbox')" class="absolute -top-12 right-0 text-white/60 hover:text-white transition-all duration-300 z-10">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>

                    <img :src="currentImage" alt="Gallery image" class="max-h-[85vh] w-auto mx-auto rounded-lg" />

                    <button v-if="currentIndex > 0" @click="emit('prev-image')"
                        class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-all duration-300">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                    </button>

                    <button v-if="currentIndex < totalImages - 1" @click="emit('next-image')"
                        class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-all duration-300">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </button>

                    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
                        {{ currentIndex + 1 }} / {{ totalImages }}
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
    showVideoModal: boolean
    youtubeId: string
    showLightbox: boolean
    currentImage: string
    currentIndex: number
    totalImages: number
}>()

const emit = defineEmits<{
    (e: 'close-video'): void
    (e: 'close-lightbox'): void
    (e: 'prev-image'): void
    (e: 'next-image'): void
}>()
</script>