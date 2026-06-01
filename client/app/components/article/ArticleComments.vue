<template>
    <section class="px-6 md:px-12 lg:px-20 py-16 bg-[#f9fafc]">
        <div class="max-w-4xl mx-auto">
            <div class="text-center mb-10">
                <p class="text-[#7ec8e3] text-xs font-semibold tracking-[0.2em] uppercase mb-3 flex items-center justify-center gap-2">
                    <span class="w-5 h-px bg-[#7ec8e3]"></span> Community <span class="w-5 h-px bg-[#7ec8e3]"></span>
                </p>
                <h2 class="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl tracking-tight">
                    Traveler Stories
                </h2>
            </div>

            <!-- Comment Form -->
            <div class="bg-white rounded-2xl p-6 md:p-8 border border-[#e5e7eb] shadow-sm mb-8">
                <h3 class="font-display font-bold text-[#1a1a1a] text-xl mb-4">Share Your Experience</h3>
                <form @submit.prevent="handleSubmit" class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input v-model="formData.name" type="text" placeholder="Your Name" required
                            class="px-4 py-3 rounded-xl border border-[#e5e7eb] focus:border-[#7ec8e3] focus:ring-2 focus:ring-[#7ec8e3]/20 outline-none transition-all duration-200" />
                        <input v-model="formData.email" type="email" placeholder="Your Email" required
                            class="px-4 py-3 rounded-xl border border-[#e5e7eb] focus:border-[#7ec8e3] focus:ring-2 focus:ring-[#7ec8e3]/20 outline-none transition-all duration-200" />
                    </div>
                    <textarea v-model="formData.content" placeholder="Your thoughts..." rows="4" required
                        class="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] focus:border-[#7ec8e3] focus:ring-2 focus:ring-[#7ec8e3]/20 outline-none transition-all duration-200 resize-none"></textarea>
                    <button type="submit"
                        class="px-6 py-3 bg-[#7ec8e3] hover:bg-[#5bb8d4] text-[#1a1a1a] font-semibold rounded-full text-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#7ec8e3]/30">
                        Post Comment
                    </button>
                </form>
            </div>

            <!-- Comments List -->
            <div class="space-y-6">
                <div v-for="comment in comments" :key="comment.id"
                    class="bg-white rounded-2xl p-6 border border-[#e5e7eb] shadow-sm">
                    <div class="flex items-start gap-4">
                        <div class="w-12 h-12 rounded-full bg-gradient-to-br from-[#7ec8e3] to-[#1a4a6b] flex items-center justify-center flex-shrink-0">
                            <span class="text-white font-bold text-lg">{{ comment.name.charAt(0) }}</span>
                        </div>
                        <div class="flex-1">
                            <div class="flex items-center justify-between mb-2">
                                <div>
                                    <h4 class="font-display font-bold text-[#1a1a1a]">{{ comment.name }}</h4>
                                    <p class="text-xs text-[#555555]">{{ formatTimeAgo(comment.date) }}</p>
                                </div>
                            </div>
                            <p class="text-[#555555] leading-relaxed">{{ comment.content }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { formatTimeAgo } from '~~/shared/utils/helpers'

const props = defineProps<{
    comments: any[]
}>()

const emit = defineEmits<{
    (e: 'submit-comment', data: any): void
}>()

const formData = reactive({
    name: '',
    email: '',
    content: ''
})

const handleSubmit = () => {
    emit('submit-comment', { ...formData })
    formData.name = ''
    formData.email = ''
    formData.content = ''
}
</script>