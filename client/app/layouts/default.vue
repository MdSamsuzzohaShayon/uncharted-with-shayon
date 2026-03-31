<template>
    <!-- Root wrapper — semantic HTML5 -->
    <div class="min-h-screen bg-[#f9fafc] font-body overflow-x-hidden">

        <slot />

        <!-- ================================================================
            NEWSLETTER CTA
            ================================================================ -->
        <section class="relative mx-6 md:mx-12 lg:mx-20 mb-20 rounded-3xl overflow-hidden"
            aria-labelledby="newsletter-heading">
            <img src="https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=1400&q=80"
                alt="Traveler standing before a breathtaking mountain vista"
                class="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <div class="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/92 via-[#1a4a6b]/72 to-transparent"
                aria-hidden="true"></div>
            <div class="relative z-10 px-8 md:px-16 py-16 md:py-20 max-w-lg">
                <p class="text-[#7ec8e3] text-xs font-semibold tracking-[0.2em] uppercase mb-4">Newsletter</p>
                <h2 id="newsletter-heading"
                    class="font-display font-bold text-white text-3xl md:text-4xl leading-tight mb-4">
                    Join the Journey.<br>Never Miss a Story.
                </h2>
                <p class="text-white/70 text-sm leading-relaxed mb-8">
                    Get exclusive travel guides, hidden gems, and adventure tips delivered straight to your inbox.
                </p>
                <form class="flex flex-col sm:flex-row gap-3" @submit.prevent="handleSubscribe">
                    <label for="newsletter-email" class="sr-only">Your email address</label>
                    <input id="newsletter-email" v-model="emailInput" type="email" placeholder="your@email.com" required
                        autocomplete="email"
                        class="flex-1 px-5 py-3.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white placeholder-white/40 text-sm outline-none focus:border-[#7ec8e3] focus:bg-white/20 transition-all duration-300" />
                    <button type="submit"
                        class="px-6 py-3.5 bg-[#7ec8e3] hover:bg-[#5bb8d4] text-[#1a1a1a] font-bold rounded-full text-sm tracking-wide transition-all duration-300 whitespace-nowrap hover:shadow-lg hover:shadow-[#7ec8e3]/30 hover:-translate-y-0.5 active:scale-95">
                        {{ subscribed ? '✓ Subscribed!' : 'Subscribe →' }}
                    </button>
                </form>
            </div>
        </section>


        <!-- ================================================================
            FOOTER
            ================================================================ -->
        <footer class="bg-[#1a1a1a] text-white px-6 md:px-12 lg:px-20 py-14">
            <div class="flex flex-col md:flex-row justify-between gap-10">
                <div class="max-w-xs">
                    <NuxtLink href="/" class="flex items-center gap-3 mb-4">
                        <div class="w-8 h-8 rounded-full bg-[#7ec8e3]/20 border border-[#7ec8e3]/30 flex items-center justify-center"
                            aria-hidden="true">
                            <!-- <svg class="w-4 h-4 text-[#7ec8e3]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/></svg> -->
                            <NuxtImg src="/logo.png" class="w-8" />
                        </div>
                        <span class="font-display font-bold text-base">Uncharted <span class="text-[#7ec8e3]">with
                                Shayon</span></span>
                    </NuxtLink>
                    <p class="text-white/50 text-sm leading-relaxed">Stories from the road, one uncharted destination at
                        a time.
                    </p>
                </div>

                <div class="flex flex-wrap gap-12">
                    <nav aria-label="Footer explore links">
                        <p class="text-white/30 text-xs uppercase tracking-widest mb-4 font-semibold">Explore</p>
                        <ul class="space-y-2.5">
                            <li v-for="link in footerLinks" :key="link.label">
                                <a :href="link.href"
                                    class="text-white/60 hover:text-white text-sm transition-colors duration-200">{{
                                        link.label }}</a>
                            </li>
                        </ul>
                    </nav>
                    <nav aria-label="Social media links">
                        <p class="text-white/30 text-xs uppercase tracking-widest mb-4 font-semibold">Connect</p>
                        <ul class="space-y-2.5">
                            <li v-for="social in socials" :key="social.label">
                                <a :href="social.href"
                                    class="text-white/60 hover:text-[#7ec8e3] text-sm transition-colors duration-200">{{
                                        social.label
                                    }}</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div
                class="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p class="text-white/30 text-xs">© 2025 Uncharted with Shayon. All rights reserved.</p>
                <p class="text-white/20 text-xs">Made with ♥ from the road</p>
            </div>
        </footer>

    </div>
</template>

<script setup lang="ts">

// ── Newsletter ────────────────────────────────
const emailInput = ref<string>('');
const subscribed = ref<boolean>(false);


function handleSubscribe() {
    if (!emailInput.value) return
    subscribed.value = true
    emailInput.value = ''
    setTimeout(() => { subscribed.value = false }, 3500)
}

// ── Footer ────────────────────────────────────
const footerLinks = [
    { label: 'Destinations', href: '/destinations' },
    { label: 'Category', href: '/stories' },
    { label: 'Gallery', href: '/journal' },
    { label: 'Articles', href: '/articles' },
    { label: 'About', href: '/about' },
]
const socials = [
    { label: 'Instagram', href: '#' },
    { label: 'YouTube', href: '#' },
    { label: 'Twitter / X', href: '#' },
    { label: 'Pinterest', href: '#' },
]

</script>