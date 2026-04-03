<template>
    <div class="loading-state fixed inset-0 z-50 bg-[#f9fafc] flex items-center justify-center">
        <div class="text-center">
            <div class="loading-spinner mx-auto mb-6"></div>
            <p class="text-[#1a4a6b] font-medium animate-pulse">Loading your adventure...</p>
        </div>
    </div>
</template>


<script setup lang="ts">
const props = defineProps(['pending'])
</script>