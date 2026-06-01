<template>
    <section class="px-6 md:px-12 lg:px-20 py-16 bg-[#f9fafc]">
        <div class="max-w-7xl-l mx-auto-l w-full">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Previous Article -->
                <NuxtLink v-if="prevArticle" :to="`/articles/${prevArticle.slug}`"
                    class="group relative rounded-2xl overflow-hidden bg-white border border-[#e5e7eb] shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                    <div class="relative h-48 overflow-hidden">
                        <img :src="prevArticle.featured_image?.url || '/imgs/no-image.jpg'"
                            :alt="prevArticle.title"
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <span class="absolute top-4 left-4 bg-[#7ec8e3] text-[#1a1a1a] text-xs font-bold px-3 py-1.5 rounded-full">
                            ← Previous
                        </span>
                    </div>
                    <div class="p-5">
                        <h3 class="font-display font-bold text-[#1a1a1a] text-lg group-hover:text-[#1a4a6b] transition-colors duration-300">
                            {{ prevArticle.title }}
                        </h3>
                    </div>
                </NuxtLink>

                <!-- Next Article -->
                <NuxtLink v-if="nextArticle" :to="`/articles/${nextArticle.slug}`"
                    class="group relative rounded-2xl overflow-hidden bg-white border border-[#e5e7eb] shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                    <div class="relative h-48 overflow-hidden">
                        <img :src="nextArticle.featured_image?.url || '/imgs/no-image.jpg'"
                            :alt="nextArticle.title"
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <span class="absolute top-4 right-4 bg-[#7ec8e3] text-[#1a1a1a] text-xs font-bold px-3 py-1.5 rounded-full">
                            Next →
                        </span>
                    </div>
                    <div class="p-5">
                        <h3 class="font-display font-bold text-[#1a1a1a] text-lg group-hover:text-[#1a4a6b] transition-colors duration-300">
                            {{ nextArticle.title }}
                        </h3>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
defineProps<{
    prevArticle: any
    nextArticle: any
}>()
</script>