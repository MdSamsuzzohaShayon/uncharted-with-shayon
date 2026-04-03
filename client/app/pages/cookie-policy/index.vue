<template>
    <div class="w-full">
        <!-- ================================================================
           HERO SECTION
      ================================================================ -->
        <header>
            <section class="relative min-h-[50vh] flex flex-col overflow-hidden" aria-label="Cookie Policy header">
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
                            <span class="text-3xl">🍪</span>
                            <span class="text-[#7ec8e3] text-sm font-semibold tracking-[0.2em] uppercase">Your Privacy Matters</span>
                        </div>
                        <h1 class="font-display font-black text-white text-6xl md:text-7xl lg:text-8xl mb-6 leading-none">
                            Cookie Policy
                        </h1>
                        <div class="w-24 h-1 bg-[#7ec8e3] mx-auto mb-6 rounded-full"></div>
                        <p class="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            We use cookies to enhance your experience, analyze site traffic, and personalize content. Learn how we use them and how you can control your preferences.
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
                                <span>GDPR Compliant</span>
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
                            This Cookie Policy explains what cookies are, how we use them, and your choices regarding their use. By continuing to use our website, you agree to our use of cookies as described in this policy.
                        </p>
                    </div>
                </section>

                <!-- What Are Cookies -->
                <section id="what-are-cookies" class="mb-12 scroll-mt-24">
                    <h2 class="font-display font-bold text-[#1a1a1a] text-2xl md:text-3xl mb-4 flex items-center gap-3">
                        <span class="w-8 h-8 rounded-full bg-[#7ec8e3]/20 flex items-center justify-center text-[#7ec8e3]">🍪</span>
                        What Are Cookies?
                    </h2>
                    <div class="space-y-4 text-[#555555] leading-relaxed">
                        <p>Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.</p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div class="bg-[#f9fafc] p-4 rounded-xl">
                                <div class="flex items-center gap-2 mb-2">
                                    <span class="text-xl">📝</span>
                                    <span class="font-semibold text-[#1a1a1a]">First-Party Cookies</span>
                                </div>
                                <p class="text-sm">Set by our website directly and only accessible to us.</p>
                            </div>
                            <div class="bg-[#f9fafc] p-4 rounded-xl">
                                <div class="flex items-center gap-2 mb-2">
                                    <span class="text-xl">🔗</span>
                                    <span class="font-semibold text-[#1a1a1a]">Third-Party Cookies</span>
                                </div>
                                <p class="text-sm">Set by external services we use (analytics, social media, etc.).</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Types of Cookies We Use -->
                <section id="types-of-cookies" class="mb-12 scroll-mt-24">
                    <h2 class="font-display font-bold text-[#1a1a1a] text-2xl md:text-3xl mb-4 flex items-center gap-3">
                        <span class="w-8 h-8 rounded-full bg-[#7ec8e3]/20 flex items-center justify-center text-[#7ec8e3]">📊</span>
                        Types of Cookies We Use
                    </h2>
                    <div class="space-y-6">
                        <!-- Essential Cookies -->
                        <div class="border border-[#e5e7eb] rounded-xl p-6 hover:shadow-md transition-shadow">
                            <div class="flex items-center gap-3 mb-3">
                                <div class="w-10 h-10 rounded-full bg-[#7ec8e3]/20 flex items-center justify-center">
                                    <span class="text-xl">🔒</span>
                                </div>
                                <div>
                                    <h3 class="font-display font-bold text-[#1a1a1a] text-xl">Essential Cookies</h3>
                                    <p class="text-xs text-[#555555]">Always Active</p>
                                </div>
                            </div>
                            <p class="text-[#555555] text-sm leading-relaxed">These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. You cannot opt out of these cookies.</p>
                            <div class="mt-3 flex flex-wrap gap-2">
                                <span class="text-xs px-2 py-1 bg-[#f0f0f0] rounded-full">Session Management</span>
                                <span class="text-xs px-2 py-1 bg-[#f0f0f0] rounded-full">Security</span>
                                <span class="text-xs px-2 py-1 bg-[#f0f0f0] rounded-full">Authentication</span>
                            </div>
                        </div>

                        <!-- Preference Cookies -->
                        <div class="border border-[#e5e7eb] rounded-xl p-6 hover:shadow-md transition-shadow">
                            <div class="flex items-center gap-3 mb-3">
                                <div class="w-10 h-10 rounded-full bg-[#7ec8e3]/20 flex items-center justify-center">
                                    <span class="text-xl">⚙️</span>
                                </div>
                                <div>
                                    <h3 class="font-display font-bold text-[#1a1a1a] text-xl">Preference Cookies</h3>
                                    <p class="text-xs text-[#555555]">Customize Your Experience</p>
                                </div>
                            </div>
                            <p class="text-[#555555] text-sm leading-relaxed">These cookies allow our website to remember choices you make and provide enhanced, personalized features. They may be set by us or by third-party providers whose services we have added to our pages.</p>
                            <div class="mt-3 flex flex-wrap gap-2">
                                <span class="text-xs px-2 py-1 bg-[#f0f0f0] rounded-full">Language Preferences</span>
                                <span class="text-xs px-2 py-1 bg-[#f0f0f0] rounded-full">Theme Selection</span>
                                <span class="text-xs px-2 py-1 bg-[#f0f0f0] rounded-full">Region Settings</span>
                            </div>
                        </div>

                        <!-- Analytics Cookies -->
                        <div class="border border-[#e5e7eb] rounded-xl p-6 hover:shadow-md transition-shadow">
                            <div class="flex items-center gap-3 mb-3">
                                <div class="w-10 h-10 rounded-full bg-[#7ec8e3]/20 flex items-center justify-center">
                                    <span class="text-xl">📈</span>
                                </div>
                                <div>
                                    <h3 class="font-display font-bold text-[#1a1a1a] text-xl">Analytics Cookies</h3>
                                    <p class="text-xs text-[#555555]">Performance Tracking</p>
                                </div>
                            </div>
                            <p class="text-[#555555] text-sm leading-relaxed">These cookies collect information about how visitors use our website, such as which pages are visited most often. This helps us improve how our website works.</p>
                            <div class="mt-3 flex flex-wrap gap-2">
                                <span class="text-xs px-2 py-1 bg-[#f0f0f0] rounded-full">Google Analytics</span>
                                <span class="text-xs px-2 py-1 bg-[#f0f0f0] rounded-full">Page Views</span>
                                <span class="text-xs px-2 py-1 bg-[#f0f0f0] rounded-full">Session Duration</span>
                            </div>
                        </div>

                        <!-- Marketing Cookies -->
                        <div class="border border-[#e5e7eb] rounded-xl p-6 hover:shadow-md transition-shadow">
                            <div class="flex items-center gap-3 mb-3">
                                <div class="w-10 h-10 rounded-full bg-[#7ec8e3]/20 flex items-center justify-center">
                                    <span class="text-xl">🎯</span>
                                </div>
                                <div>
                                    <h3 class="font-display font-bold text-[#1a1a1a] text-xl">Marketing Cookies</h3>
                                    <p class="text-xs text-[#555555]">Personalized Content</p>
                                </div>
                            </div>
                            <p class="text-[#555555] text-sm leading-relaxed">These cookies track your online activity to help advertisers deliver more relevant advertising or to limit how many times you see an ad. They may be set by advertising partners.</p>
                            <div class="mt-3 flex flex-wrap gap-2">
                                <span class="text-xs px-2 py-1 bg-[#f0f0f0] rounded-full">Ad Preferences</span>
                                <span class="text-xs px-2 py-1 bg-[#f0f0f0] rounded-full">Retargeting</span>
                                <span class="text-xs px-2 py-1 bg-[#f0f0f0] rounded-full">Social Media</span>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Cookie Management -->
                <section id="cookie-management" class="mb-12 scroll-mt-24">
                    <h2 class="font-display font-bold text-[#1a1a1a] text-2xl md:text-3xl mb-4 flex items-center gap-3">
                        <span class="w-8 h-8 rounded-full bg-[#7ec8e3]/20 flex items-center justify-center text-[#7ec8e3]">🎛️</span>
                        Managing Your Cookie Preferences
                    </h2>
                    <div class="space-y-4 text-[#555555] leading-relaxed">
                        <p>You have the right to accept or reject cookies. Most web browsers automatically accept cookies, but you can modify your browser settings to decline cookies if you prefer. Here's how to manage cookies in popular browsers:</p>
                        
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                            <a href="#" class="flex items-center gap-3 p-3 bg-[#f9fafc] rounded-xl hover:bg-[#e5e7eb] transition-colors">
                                <span class="text-2xl">🌐</span>
                                <div>
                                    <p class="font-semibold text-[#1a1a1a] text-sm">Google Chrome</p>
                                    <p class="text-xs text-[#555555]">Settings → Privacy & Security → Cookies</p>
                                </div>
                            </a>
                            <a href="#" class="flex items-center gap-3 p-3 bg-[#f9fafc] rounded-xl hover:bg-[#e5e7eb] transition-colors">
                                <span class="text-2xl">🦊</span>
                                <div>
                                    <p class="font-semibold text-[#1a1a1a] text-sm">Mozilla Firefox</p>
                                    <p class="text-xs text-[#555555]">Options → Privacy & Security → Cookies</p>
                                </div>
                            </a>
                            <a href="#" class="flex items-center gap-3 p-3 bg-[#f9fafc] rounded-xl hover:bg-[#e5e7eb] transition-colors">
                                <span class="text-2xl">🍎</span>
                                <div>
                                    <p class="font-semibold text-[#1a1a1a] text-sm">Safari</p>
                                    <p class="text-xs text-[#555555]">Preferences → Privacy → Cookies</p>
                                </div>
                            </a>
                            <a href="#" class="flex items-center gap-3 p-3 bg-[#f9fafc] rounded-xl hover:bg-[#e5e7eb] transition-colors">
                                <span class="text-2xl">🔷</span>
                                <div>
                                    <p class="font-semibold text-[#1a1a1a] text-sm">Microsoft Edge</p>
                                    <p class="text-xs text-[#555555]">Settings → Privacy & Security → Cookies</p>
                                </div>
                            </a>
                        </div>

                        <div class="bg-[#7ec8e3]/10 border border-[#7ec8e3]/30 rounded-xl p-4 mt-4">
                            <div class="flex items-start gap-3">
                                <svg class="w-5 h-5 text-[#1a4a6b] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <p class="text-sm font-medium text-[#1a4a6b]">Please note that disabling cookies may affect the functionality of our website and your user experience.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Cookie Duration -->
                <section id="duration" class="mb-12 scroll-mt-24">
                    <h2 class="font-display font-bold text-[#1a1a1a] text-2xl md:text-3xl mb-4 flex items-center gap-3">
                        <span class="w-8 h-8 rounded-full bg-[#7ec8e3]/20 flex items-center justify-center text-[#7ec8e3]">⏱️</span>
                        Cookie Duration
                    </h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-[#f9fafc] p-4 rounded-xl">
                            <div class="flex items-center gap-2 mb-2">
                                <span class="text-xl">🔄</span>
                                <span class="font-semibold text-[#1a1a1a]">Session Cookies</span>
                            </div>
                            <p class="text-sm text-[#555555]">These are temporary cookies that expire when you close your browser. They help maintain your session while you navigate our website.</p>
                        </div>
                        <div class="bg-[#f9fafc] p-4 rounded-xl">
                            <div class="flex items-center gap-2 mb-2">
                                <span class="text-xl">📅</span>
                                <span class="font-semibold text-[#1a1a1a]">Persistent Cookies</span>
                            </div>
                            <p class="text-sm text-[#555555]">These remain on your device for a set period or until you delete them. They help remember your preferences for future visits.</p>
                        </div>
                    </div>
                </section>

                <!-- Third-Party Cookies -->
                <section id="third-party" class="mb-12 scroll-mt-24">
                    <h2 class="font-display font-bold text-[#1a1a1a] text-2xl md:text-3xl mb-4 flex items-center gap-3">
                        <span class="w-8 h-8 rounded-full bg-[#7ec8e3]/20 flex items-center justify-center text-[#7ec8e3]">🤝</span>
                        Third-Party Cookies
                    </h2>
                    <div class="space-y-4 text-[#555555] leading-relaxed">
                        <p>We use services provided by trusted third parties that may set cookies on our behalf:</p>
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                            <div class="border border-[#e5e7eb] rounded-xl p-3">
                                <div class="flex items-center gap-2 mb-1">
                                    <span class="text-lg">📊</span>
                                    <span class="font-semibold text-[#1a1a1a] text-sm">Google Analytics</span>
                                </div>
                                <p class="text-xs text-[#555555]">Analytics & Performance</p>
                            </div>
                            <div class="border border-[#e5e7eb] rounded-xl p-3">
                                <div class="flex items-center gap-2 mb-1">
                                    <span class="text-lg">📧</span>
                                    <span class="font-semibold text-[#1a1a1a] text-sm">Mailchimp</span>
                                </div>
                                <p class="text-xs text-[#555555]">Newsletter Signup</p>
                            </div>
                            <div class="border border-[#e5e7eb] rounded-xl p-3">
                                <div class="flex items-center gap-2 mb-1">
                                    <span class="text-lg">💬</span>
                                    <span class="font-semibold text-[#1a1a1a] text-sm">Disqus</span>
                                </div>
                                <p class="text-xs text-[#555555]">Comments System</p>
                            </div>
                            <div class="border border-[#e5e7eb] rounded-xl p-3">
                                <div class="flex items-center gap-2 mb-1">
                                    <span class="text-lg">📸</span>
                                    <span class="font-semibold text-[#1a1a1a] text-sm">Unsplash</span>
                                </div>
                                <p class="text-xs text-[#555555]">Image Delivery</p>
                            </div>
                            <div class="border border-[#e5e7eb] rounded-xl p-3">
                                <div class="flex items-center gap-2 mb-1">
                                    <span class="text-lg">📱</span>
                                    <span class="font-semibold text-[#1a1a1a] text-sm">Facebook Pixel</span>
                                </div>
                                <p class="text-xs text-[#555555]">Social Media Integration</p>
                            </div>
                            <div class="border border-[#e5e7eb] rounded-xl p-3">
                                <div class="flex items-center gap-2 mb-1">
                                    <span class="text-lg">🐦</span>
                                    <span class="font-semibold text-[#1a1a1a] text-sm">Twitter</span>
                                </div>
                                <p class="text-xs text-[#555555]">Social Sharing</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Consent Management -->
                <section id="consent" class="mb-12 scroll-mt-24">
                    <h2 class="font-display font-bold text-[#1a1a1a] text-2xl md:text-3xl mb-4 flex items-center gap-3">
                        <span class="w-8 h-8 rounded-full bg-[#7ec8e3]/20 flex items-center justify-center text-[#7ec8e3]">✅</span>
                        Consent Management
                    </h2>
                    <div class="space-y-4 text-[#555555] leading-relaxed">
                        <p>When you first visit our website, we display a cookie banner asking for your consent. You can manage your preferences at any time:</p>
                        <div class="bg-[#f9fafc] p-6 rounded-xl mt-4">
                            <div class="flex items-center justify-between flex-wrap gap-4">
                                <div>
                                    <p class="font-semibold text-[#1a1a1a]">Cookie Preferences Center</p>
                                    <p class="text-sm text-[#555555]">Customize your cookie settings</p>
                                </div>
                                <button class="px-6 py-3 bg-[#7ec8e3] text-[#1a1a1a] rounded-full font-semibold hover:bg-[#5bb8d4] transition-all duration-300">
                                    Manage Preferences
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Updates to Policy -->
                <section id="updates" class="mb-12 scroll-mt-24">
                    <h2 class="font-display font-bold text-[#1a1a1a] text-2xl md:text-3xl mb-4 flex items-center gap-3">
                        <span class="w-8 h-8 rounded-full bg-[#7ec8e3]/20 flex items-center justify-center text-[#7ec8e3]">🔄</span>
                        Updates to This Policy
                    </h2>
                    <div class="space-y-4 text-[#555555] leading-relaxed">
                        <p>We may update this Cookie Policy from time to time to reflect changes in technology, regulations, or our practices. Any updates will be posted on this page with a revised "Last Updated" date.</p>
                        <div class="bg-[#f9fafc] p-4 rounded-xl">
                            <div class="flex items-start gap-3">
                                <svg class="w-5 h-5 text-[#7ec8e3] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <p class="text-sm">We encourage you to review this policy periodically to stay informed about how we use cookies and protect your privacy.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Contact Information -->
                <section id="contact" class="scroll-mt-24">
                    <h2 class="font-display font-bold text-[#1a1a1a] text-2xl md:text-3xl mb-4 flex items-center gap-3">
                        <span class="w-8 h-8 rounded-full bg-[#7ec8e3]/20 flex items-center justify-center text-[#7ec8e3]">📧</span>
                        Contact Us
                    </h2>
                    <div class="bg-gradient-to-br from-[#1a4a6b] to-[#0f2a3f] rounded-2xl p-8 text-white">
                        <p class="mb-4 text-white/90">If you have any questions about our use of cookies or this policy, please contact us:</p>
                        <div class="space-y-3">
                            <div class="flex items-center gap-3">
                                <svg class="w-5 h-5 text-[#7ec8e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                                <span>admin@webdevlab.org</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <svg class="w-5 h-5 text-[#7ec8e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                                <span>Attn: Privacy Team, Uncharted with Shayon</span>
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
                <h2 class="font-display font-bold text-white text-3xl md:text-4xl mb-4">Take Control of Your Privacy</h2>
                <p class="text-white/70 text-lg max-w-2xl mx-auto mb-8">
                    We're committed to transparency and giving you control over your data. Manage your cookie preferences or learn more about our privacy practices.
                </p>
                <div class="flex flex-wrap gap-4 justify-center">
                    <button class="inline-flex items-center gap-2 px-8 py-4 bg-[#7ec8e3] text-[#1a1a1a] rounded-full font-semibold hover:bg-[#5bb8d4] transition-all duration-300 hover:scale-105">
                        Manage Cookies
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                    </button>
                    <NuxtLink href="/privacy" 
                        class="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300">
                        View Privacy Policy
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
    title: 'Cookie Policy | Uncharted with Shayon',
    meta: [
        { name: 'description', content: 'Learn about how Uncharted with Shayon uses cookies to enhance your browsing experience. Understand cookie types, duration, and how to manage your preferences.' },
        { name: 'keywords', content: 'cookie policy, cookies, GDPR, privacy, cookie consent, browser cookies, third-party cookies' },
        { property: 'og:title', content: 'Cookie Policy | Uncharted with Shayon' },
        { property: 'og:description', content: 'Understand how we use cookies and manage your privacy preferences.' },
        { name: 'robots', content: 'index, follow' }
    ]
})

// ============================================================
// Navigation Sections
// ============================================================
const sections = [
    { id: 'introduction', label: 'Introduction' },
    { id: 'what-are-cookies', label: 'What Are Cookies' },
    { id: 'types-of-cookies', label: 'Types of Cookies' },
    { id: 'cookie-management', label: 'Managing Cookies' },
    { id: 'duration', label: 'Cookie Duration' },
    { id: 'third-party', label: 'Third-Party' },
    { id: 'consent', label: 'Consent' },
    { id: 'updates', label: 'Updates' },
    { id: 'contact', label: 'Contact' }
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

html {
    scroll-behavior: smooth;
}

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

// Hover effects
.cookie-card {
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
    }
}
</style>