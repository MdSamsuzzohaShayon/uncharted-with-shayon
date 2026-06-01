<template>
  <div>

    <NuxtLayout>
      <p class="w-full p-2 bg-red-300 text-red-900">
        Under development
      </p>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';


// SEO Meta (unchanged)
useHead({
  title: 'Uncharted with Shayon — Travel & Adventure Blog',
  meta: [
    { name: 'description', content: 'Unscripted journeys, raw landscapes, and travel stories from around the globe by Shayon.' },
    { name: 'keywords', content: 'travel blog, adventure, destinations, hiking, Maldives, Himalayas, Kyoto, travel stories' },
    { property: 'og:title', content: 'Uncharted with Shayon — Travel & Adventure Blog' },
    { property: 'og:description', content: 'Unscripted journeys and stories from the road.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Uncharted with Shayon' },
    { name: 'twitter:description', content: 'Unscripted journeys, raw landscapes, travel stories.' },
  ],
  link: [{ rel: 'canonical', href: 'https://uncharted.webdevlab.org' }]
});
</script>