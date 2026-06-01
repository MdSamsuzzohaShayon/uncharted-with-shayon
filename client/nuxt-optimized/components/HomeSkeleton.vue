<!--
  components/HomeSkeleton.vue
  
  Shown while page data is still in-flight (rare with SSR + cache, 
  but needed as a fallback for client-side navigations).
-->
<template>
  <div class="animate-pulse" aria-busy="true" aria-label="Loading content">
    <!-- Hero skeleton -->
    <div class="min-h-screen bg-gray-800" />

    <!-- Cards skeleton -->
    <section class="px-6 md:px-12 lg:px-20 pt-16 pb-20">
      <div class="h-8 w-48 bg-gray-200 rounded mb-10" />
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="md:col-span-2 h-80 bg-gray-200 rounded-2xl" />
        <div class="flex flex-col gap-6">
          <div class="h-44 bg-gray-200 rounded-2xl" />
          <div class="h-44 bg-gray-200 rounded-2xl" />
        </div>
      </div>
    </section>

    <!-- Mosaic skeleton -->
    <section class="px-6 md:px-12 lg:px-20 py-20 bg-[#f9fafc]">
      <div class="h-[480px] bg-gray-200 rounded-2xl" />
    </section>
  </div>
</template>
