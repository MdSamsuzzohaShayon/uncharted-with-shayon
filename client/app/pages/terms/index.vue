<template>
    <div class="w-full">
        <!-- ================================================================
           HERO SECTION
      ================================================================ -->
        <header>
            <section class="relative min-h-[50vh] flex flex-col overflow-hidden" aria-label="Terms and Conditions header">
                <div class="absolute inset-0 z-0" aria-hidden="true">
                    <div class="absolute inset-0 bg-gradient-to-br from-[#1a1a1a]/85 via-[#1a4a6b]/70 to-[#0f2a3f]/80 z-10"></div>
                    <div class="w-full h-full bg-cover bg-center"
                         style="background-image: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80')">
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#f9fafc] to-transparent z-20"></div>
                </div>

                <Navbar />

                <main class="flex-1 flex items-center px-6 md:px-12 lg:px-20 py-20 relative z-20">
                    <div class="w-full text-center">
                        <div class="inline-flex items-center gap-3 bg-white/15 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/20">
                            <span class="text-3xl">⚖️</span>
                            <span class="text-[#7ec8e3] text-sm font-semibold tracking-[0.2em] uppercase">Legal Agreement</span>
                        </div>
                        <h1 class="font-display font-black text-white text-6xl md:text-7xl lg:text-8xl mb-6 leading-none">
                            Terms & Conditions
                        </h1>
                        <div class="w-24 h-1 bg-[#7ec8e3] mx-auto mb-6 rounded-full"></div>
                        <p class="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            Please read these terms carefully before using our website. By accessing this site, you agree to be bound by these terms.
                        </p>
                        <div class="mt-8 flex items-center justify-center gap-4 text-white/60 text-sm">
                            <div class="flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span>Last Updated: March 15, 2025</span>
                            </div>
                            <div class="w-1 h-1 bg-[#7ec8e3] rounded-full"></div>
                            <div class="flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                </svg>
                                <span>Effective Immediately</span>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </header>

        <!-- ================================================================
           QUICK NAVIGATION
      ================================================================ -->
        <div class="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#e5e7eb] shadow-sm">
            <div class="px-6 md:px-12 lg:px-20">
                <div class="flex items-center gap-2 overflow-x-auto scrollbar-hide py-4">
                    <button v-for="section in sections" :key="section.id"
                        @click="scrollToSection(section.id)"
                        class="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 hover:bg-[#f0f0f0] text-[#555555] hover:text-[#1a1a1a]">
                        {{ section.label }}
                    </button>
                </div>
            </div>
        </div>

        <!-- ================================================================
           MAIN CONTENT
      ================================================================ -->
        <div class="px-6 md:px-12 lg:px-20 py-16">
            <div class="max-w-4xl mx-auto">
                <!-- Introduction -->
                <section id="introduction" class="mb-12 scroll-mt-24">
                    <div class="bg-gradient-to-r from-[#7ec8e3]/10 to-transparent p-6 rounded-2xl mb-8">
                        <p class="text-[#555555] text-lg leading-relaxed">
                            Welcome to Uncharted with Shayon. These Terms and Conditions govern your use of our website and services. By accessing or using our website, you agree to comply with and be bound by these terms.
                        </p>
                    </div>
                </section>

                <!-- Acceptance of Terms -->
                <section id="acceptance" class="mb-12 scroll-mt-24">
                    <h2 class="font-display font-bold text-[#1a1a1a] text-2xl md:text-3xl mb-4 flex items-center gap-3">
                        <span class="w-8 h-8 rounded-full bg-[#7ec8e3]/20 flex items-center justify-center text-[#7ec8e3]">✓</span>
                        Acceptance of Terms
                    </h2>
                    <div class="space-y-4 text-[#555555] leading-relaxed">
                        <p>By accessing or using Uncharted with Shayon ("we," "us," "our"), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our website.</p>
                        <div class="bg-[#f9fafc] p-4 rounded-xl mt-4">
                            <div class="flex items-start gap-3">
                                <svg class="w-5 h-5 text-[#7ec8e3] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <p class="text-sm">We reserve the right to modify these terms at any time. Continued use of the site after changes constitutes acceptance of the modified terms.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Intellectual Property -->
                <section id="intellectual-property" class="mb-12 scroll-mt-24">
                    <h2 class="font-display font-bold text-[#1a1a1a] text-2xl md:text-3xl mb-4 flex items-center gap-3">
                        <span class="w-8 h-8 rounded-full bg-[#7ec8e3]/20 flex items-center justify-center text-[#7ec8e3]">©️</span>
                        Intellectual Property
                    </h2>
                    <div class="space-y-4 text-[#555555] leading-relaxed">
                        <p>All content on this website, including but not limited to text, images, graphics, logos, videos, and software, is the property of Uncharted with Shayon and is protected by copyright, trademark, and other intellectual property laws.</p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div class="border border-[#e5e7eb] rounded-xl p-4">
                                <div class="flex items-center gap-2 mb-2">
                                    <span class="text-xl">✅</span>
                                    <span class="font-semibold text-[#1a1a1a]">You May:</span>
                                </div>
                                <ul class="list-disc pl-5 text-sm space-y-1">
                                    <li>Share content with proper attribution</li>
                                    <li>Link to our website</li>
                                    <li>Download content for personal, non-commercial use</li>
                                </ul>
                            </div>
                            <div class="border border-[#e5e7eb] rounded-xl p-4">
                                <div class="flex items-center gap-2 mb-2">
                                    <span class="text-xl">❌</span>
                                    <span class="font-semibold text-[#1a1a1a]">You May Not:</span>
                                </div>
                                <ul class="list-disc pl-5 text-sm space-y-1">
                                    <li>Republish content without permission</li>
                                    <li>Sell or commercialize our content</li>
                                    <li>Modify or create derivative works</li>
                                    <li>Remove copyright notices</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- User Conduct -->
                <section id="user-conduct" class="mb-12 scroll-mt-24">
                    <h2 class="font-display font-bold text-[#1a1a1a] text-2xl md:text-3xl mb-4 flex items-center gap-3">
                        <span class="w-8 h-8 rounded-full bg-[#7ec8e3]/20 flex items-center justify-center text-[#7ec8e3]">👥</span>
                        User Conduct
                    </h2>
                    <div class="space-y-4 text-[#555555] leading-relaxed">
                        <p>When using our website, you agree to:</p>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                            <div class="flex items-start gap-2">
                                <svg class="w-5 h-5 text-[#7ec8e3] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Provide accurate and truthful information</span>
                            </div>
                            <div class="flex items-start gap-2">
                                <svg class="w-5 h-5 text-[#7ec8e3] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Respect other users and their opinions</span>
                            </div>
                            <div class="flex items-start gap-2">
                                <svg class="w-5 h-5 text-[#7ec8e3] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Not post harmful or offensive content</span>
                            </div>
                            <div class="flex items-start gap-2">
                                <svg class="w-5 h-5 text-[#7ec8e3] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Not engage in unauthorized advertising</span>
                            </div>
                            <div class="flex items-start gap-2">
                                <svg class="w-5 h-5 text-[#7ec8e3] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Not attempt to hack or disrupt the site</span>
                            </div>
                            <div class="flex items-start gap-2">
                                <svg class="w-5 h-5 text-[#7ec8e3] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Comply with all applicable laws</span>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- User Content -->
                <section id="user-content" class="mb-12 scroll-mt-24">
                    <h2 class="font-display font-bold text-[#1a1a1a] text-2xl md:text-3xl mb-4 flex items-center gap-3">
                        <span class="w-8 h-8 rounded-full bg-[#7ec8e3]/20 flex items-center justify-center text-[#7ec8e3]">💬</span>
                        User-Generated Content
                    </h2>
                    <div class="space-y-4 text-[#555555] leading-relaxed">
                        <p>By submitting comments, feedback, or other content to our website, you grant us a non-exclusive, royalty-free, perpetual license to use, modify, and display that content in connection with our services.</p>
                        <div class="bg-[#f9fafc] p-4 rounded-xl mt-4">
                            <div class="flex items-start gap-3">
                                <svg class="w-5 h-5 text-[#7ec8e3] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <p class="text-sm">You retain ownership of your content, but you are responsible for ensuring it does not violate any third-party rights or applicable laws.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Affiliate Disclosure -->
                <section id="affiliate" class="mb-12 scroll-mt-24">
                    <h2 class="font-display font-bold text-[#1a1a1a] text-2xl md:text-3xl mb-4 flex items-center gap-3">
                        <span class="w-8 h-8 rounded-full bg-[#7ec8e3]/20 flex items-center justify-center text-[#7ec8e3]">💸</span>
                        Affiliate Disclosure
                    </h2>
                    <div class="space-y-4 text-[#555555] leading-relaxed">
                        <p>Uncharted with Shayon participates in affiliate marketing programs. This means we may earn commissions on purchases made through links to partner sites. However:</p>
                        <ul class="list-disc pl-6 space-y-2">
                            <li>We only recommend products and services we genuinely use and believe in</li>
                            <li>Affiliate links do not affect the price you pay</li>
                            <li>We are transparent about our affiliate relationships</li>
                            <li>Our editorial content is never influenced by affiliate partnerships</li>
                        </ul>
                        <div class="bg-[#7ec8e3]/10 border border-[#7ec8e3]/30 rounded-xl p-4 mt-4">
                            <p class="text-sm font-medium text-[#1a4a6b]">✨ Transparency Note: We believe in honest recommendations. If you purchase through our links, you're supporting the creation of more free content for this community.</p>
                        </div>
                    </div>
                </section>

                <!-- Limitation of Liability -->
                <section id="liability" class="mb-12 scroll-mt-24">
                    <h2 class="font-display font-bold text-[#1a1a1a] text-2xl md:text-3xl mb-4 flex items-center gap-3">
                        <span class="w-8 h-8 rounded-full bg-[#7ec8e3]/20 flex items-center justify-center text-[#7ec8e3]">⚠️</span>
                        Limitation of Liability
                    </h2>
                    <div class="space-y-4 text-[#555555] leading-relaxed">
                        <p>To the fullest extent permitted by law, Uncharted with Shayon shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or content.</p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div class="border border-[#e5e7eb] rounded-xl p-4">
                                <p class="font-semibold text-[#1a1a1a] mb-2">We Are Not Liable For:</p>
                                <ul class="list-disc pl-5 text-sm space-y-1 text-[#555555]">
                                    <li>Travel disruptions or cancellations</li>
                                    <li>Loss of data or personal property</li>
                                    <li>Injuries during adventure activities</li>
                                    <li>Third-party services or products</li>
                                </ul>
                            </div>
                            <div class="border border-[#e5e7eb] rounded-xl p-4">
                                <p class="font-semibold text-[#1a1a1a] mb-2">Important Note:</p>
                                <p class="text-sm text-[#555555]">Travel involves inherent risks. Always do your own research and consult with professionals before undertaking any travel or adventure activities.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Third-Party Links -->
                <section id="third-party" class="mb-12 scroll-mt-24">
                    <h2 class="font-display font-bold text-[#1a1a1a] text-2xl md:text-3xl mb-4 flex items-center gap-3">
                        <span class="w-8 h-8 rounded-full bg-[#7ec8e3]/20 flex items-center justify-center text-[#7ec8e3]">🔗</span>
                        Third-Party Links
                    </h2>
                    <div class="space-y-4 text-[#555555] leading-relaxed">
                        <p>Our website may contain links to third-party websites for your convenience. We do not endorse or assume responsibility for the content, privacy policies, or practices of these sites. Accessing linked sites is at your own risk.</p>
                        <div class="flex flex-wrap gap-3 mt-4">
                            <span class="px-3 py-1 bg-[#f0f0f0] rounded-full text-sm">Booking.com</span>
                            <span class="px-3 py-1 bg-[#f0f0f0] rounded-full text-sm">Airbnb</span>
                            <span class="px-3 py-1 bg-[#f0f0f0] rounded-full text-sm">GetYourGuide</span>
                            <span class="px-3 py-1 bg-[#f0f0f0] rounded-full text-sm">AllTrails</span>
                            <span class="px-3 py-1 bg-[#f0f0f0] rounded-full text-sm">World Nomads</span>
                        </div>
                    </div>
                </section>

                <!-- Termination -->
                <section id="termination" class="mb-12 scroll-mt-24">
                    <h2 class="font-display font-bold text-[#1a1a1a] text-2xl md:text-3xl mb-4 flex items-center gap-3">
                        <span class="w-8 h-8 rounded-full bg-[#7ec8e3]/20 flex items-center justify-center text-[#7ec8e3]">⛔</span>
                        Termination
                    </h2>
                    <div class="space-y-4 text-[#555555] leading-relaxed">
                        <p>We reserve the right to suspend or terminate your access to our website at our sole discretion, without notice, for conduct that violates these Terms or is harmful to other users or our interests.</p>
                        <p>Upon termination, your right to use the website will immediately cease, and we may remove any user content you have submitted.</p>
                    </div>
                </section>

                <!-- Governing Law -->
                <section id="governing-law" class="mb-12 scroll-mt-24">
                    <h2 class="font-display font-bold text-[#1a1a1a] text-2xl md:text-3xl mb-4 flex items-center gap-3">
                        <span class="w-8 h-8 rounded-full bg-[#7ec8e3]/20 flex items-center justify-center text-[#7ec8e3]">⚖️</span>
                        Governing Law
                    </h2>
                    <div class="space-y-4 text-[#555555] leading-relaxed">
                        <p>These Terms shall be governed by and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in [Your Location].</p>
                    </div>
                </section>

                <!-- Contact Information -->
                <section id="contact" class="mb-12 scroll-mt-24">
                    <h2 class="font-display font-bold text-[#1a1a1a] text-2xl md:text-3xl mb-4 flex items-center gap-3">
                        <span class="w-8 h-8 rounded-full bg-[#7ec8e3]/20 flex items-center justify-center text-[#7ec8e3]">📧</span>
                        Contact Us
                    </h2>
                    <div class="bg-gradient-to-br from-[#1a4a6b] to-[#0f2a3f] rounded-2xl p-8 text-white">
                        <p class="mb-4 text-white/90">If you have any questions about these Terms and Conditions, please contact us:</p>
                        <div class="space-y-3">
                            <div class="flex items-center gap-3">
                                <svg class="w-5 h-5 text-[#7ec8e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                                <span>legal@unchartedwithshayon.com</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <svg class="w-5 h-5 text-[#7ec8e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                                <span>Attn: Legal Department, Uncharted with Shayon</span>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Entire Agreement -->
                <section id="agreement" class="scroll-mt-24">
                    <div class="border-t border-[#e5e7eb] pt-8">
                        <div class="bg-[#f9fafc] p-6 rounded-xl">
                            <div class="flex items-start gap-3">
                                <svg class="w-6 h-6 text-[#7ec8e3] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <div>
                                    <p class="font-semibold text-[#1a1a1a] mb-1">Entire Agreement</p>
                                    <p class="text-sm text-[#555555]">These Terms and Conditions constitute the entire agreement between you and Uncharted with Shayon regarding your use of our website and supersede all prior agreements and understandings.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>

        <!-- ================================================================
           CALL TO ACTION
      ================================================================ -->
        <section class="bg-gradient-to-br from-[#1a1a1a] to-[#1a4a6b] py-16 mt-8">
            <div class="px-6 md:px-12 lg:px-20 text-center">
                <h2 class="font-display font-bold text-white text-3xl md:text-4xl mb-4">Questions About Our Terms?</h2>
                <p class="text-white/70 text-lg max-w-2xl mx-auto mb-8">
                    We're committed to transparency and fair practices. Reach out if you need clarification.
                </p>
                <div class="flex flex-wrap gap-4 justify-center">
                    <NuxtLink href="/contact" 
                        class="inline-flex items-center gap-2 px-8 py-4 bg-[#7ec8e3] text-[#1a1a1a] rounded-full font-semibold hover:bg-[#5bb8d4] transition-all duration-300 hover:scale-105">
                        Contact Support
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </NuxtLink>
                    <NuxtLink href="/privacy" 
                        class="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300">
                        Read Privacy Policy
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                        </svg>
                    </NuxtLink>
                </div>
            </div>
        </section>

        <!-- Newsletter CTA and Footer are in layout -->
    </div>
</template>

<script setup lang="ts">
// ============================================================
// SEO
// ============================================================
useHead({
    title: 'Terms and Conditions | Uncharted with Shayon',
    meta: [
        { name: 'description', content: 'Read the terms and conditions for using Uncharted with Shayon. Understand your rights, responsibilities, and our policies regarding content, affiliate links, and user conduct.' },
        { name: 'keywords', content: 'terms and conditions, terms of service, legal, user agreement, affiliate disclosure, intellectual property' },
        { property: 'og:title', content: 'Terms and Conditions | Uncharted with Shayon' },
        { property: 'og:description', content: 'Understand the terms governing your use of Uncharted with Shayon.' },
        { name: 'robots', content: 'index, follow' }
    ]
})

// ============================================================
// Navigation Sections
// ============================================================
const sections = [
    { id: 'introduction', label: 'Introduction' },
    { id: 'acceptance', label: 'Acceptance' },
    { id: 'intellectual-property', label: 'Intellectual Property' },
    { id: 'user-conduct', label: 'User Conduct' },
    { id: 'user-content', label: 'User Content' },
    { id: 'affiliate', label: 'Affiliate Disclosure' },
    { id: 'liability', label: 'Liability' },
    { id: 'third-party', label: 'Third-Party Links' },
    { id: 'termination', label: 'Termination' },
    { id: 'governing-law', label: 'Governing Law' },
    { id: 'contact', label: 'Contact' },
    { id: 'agreement', label: 'Agreement' }
]

// ============================================================
// Scroll to Section Function
// ============================================================
const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
        const offset = 100
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        })
    }
}
</script>

<style scoped lang="scss">
.scrollbar-hide {
    scrollbar-width: none;
    -ms-overflow-style: none;
    
    &::-webkit-scrollbar {
        display: none;
    }
}

.scroll-mt-24 {
    scroll-margin-top: 6rem;
}

// Smooth scrolling for anchor links
html {
    scroll-behavior: smooth;
}

// Animation for sections
section {
    animation: fadeInUp 0.6s ease-out forwards;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

// Hover effects for cards
.border-card {
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
    }
}
</style>