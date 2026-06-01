<!--
  components/FeatureCategory.vue
  
  Floating image card shown in the hero section.
  Emits a typed event so the parent can trigger the bg cross-fade.
-->
<template>
  <button
    type="button"
    :aria-pressed="activeCategoryId === category.id"
    :aria-label="`View ${category.name} destinations`"
    class="feature-card group relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7ec8e3]"
    :class="[
      activeCategoryId === category.id
        ? 'ring-2 ring-[#7ec8e3] shadow-xl shadow-[#7ec8e3]/20'
        : 'shadow-lg',
    ]"
    @click="$emit('set-hero-bg', category.id)"
  >
    <NuxtImg
      v-if="category.featured_image?.url"
      :src="category.featured_image.url"
      :alt="category.name"
      format="webp"
      loading="lazy"
      fetchpriority="low"
      width="160"
      height="220"
      class="w-40 h-56 object-cover transition-transform duration-500 group-hover:scale-110"
    />

    <!-- Overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
      aria-hidden="true"
    />

    <!-- Label -->
    <span
      class="absolute bottom-3 left-0 right-0 text-center text-white text-xs font-bold tracking-wider uppercase px-2"
    >
      {{ category.name }}
    </span>
  </button>
</template>

<script setup lang="ts">
import type { ICategory } from '~~/shared/types';

defineProps<{
  category: ICategory;
  activeCategoryId: number | null;
}>();

defineEmits<{
  (e: 'set-hero-bg', categoryId: number): void;
}>();
</script>
