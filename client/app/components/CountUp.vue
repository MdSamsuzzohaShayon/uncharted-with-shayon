<template>
    <span ref="countRef">{{ displayValue }}{{ suffix }}</span>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const props = defineProps({
    end: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        default: 2
    },
    decimals: {
        type: Number,
        default: 0
    },
    suffix: {
        type: String,
        default: ''
    }
})

const displayValue = ref('0')

onMounted(() => {
    const start = 0
    const end = props.end
    
    gsap.to({}, {
        duration: props.duration,
        onUpdate: function() {
            const progress = this.progress()
            const current = Math.floor(start + (end - start) * progress)
            displayValue.value = current.toLocaleString()
        },
        ease: 'power2.out'
    })
})
</script>