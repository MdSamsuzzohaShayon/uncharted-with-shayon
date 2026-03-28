<template>
    <article
        :class="['float-card float-a group relative w-28 md:w-36 rounded-3xl overflow-hidden shadow-2xl shadow-black/40 cursor-pointer flex-shrink-0 -mb-6', activeArticleId === article.id ? 'is-active' : '']"
        v-bind:style="{height: cardHeight}" role="button" tabindex="0"
        aria-label="Nature travel — click to preview" @click="emit('setHeroBg', article.id)"
        @keydown.enter="emit('setHeroBg', article.id)">
        <img v-bind:src="article.featured_image + '?w=400&q=80'"
            alt="Majestic mountain lake at sunset with alpine peaks"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" aria-hidden="true">
        </div>
        <div class="absolute bottom-3 left-3"><span
                class="text-white text-xs font-bold tracking-wider uppercase">{{ article.category }}</span>
        </div>
        <div v-if="activeArticleId === article.id"
            class="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#7ec8e3] flex items-center justify-center shadow-lg">
            <svg class="w-3 h-3 text-[#1a1a1a]" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"
                aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
        </div>
    </article>
</template>

<script setup lang="ts">

interface IFeatureArticleProps {
    activeArticleId: number | null;
    article: IArticle;
};
interface IFeatureArticleEmits {
    setHeroBg: [index: number];
}
const props = defineProps<IFeatureArticleProps>();
const emit = defineEmits<IFeatureArticleEmits>();


// Generate random height between 288px and 450px (or custom range)
const getRandomHeight = () => {
    const min = 288;
    const max = 450;
    const randomHeight = Math.floor(Math.random() * (max - min + 1) + min);
    return `${randomHeight}px`;
};

const cardHeight = ref(getRandomHeight());


// Optional: Regenerate height on mount for SSR consistency
onMounted(() => {
    cardHeight.value = getRandomHeight();
});

</script>