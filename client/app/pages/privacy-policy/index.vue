<template>
    <div class="w-full">
        <!-- ================================================================
           HERO SECTION
      ================================================================ -->
        <header>
            <section class="relative min-h-[50vh] flex flex-col overflow-hidden" aria-label="Privacy Policy header">
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
                            <span class="text-3xl">🔒</span>
                            <span class="text-[#7ec8e3] text-sm font-semibold tracking-[0.2em] uppercase">Legal Information</span>
                        </div>
                        <h1 class="font-display font-black text-white text-6xl md:text-7xl lg:text-8xl mb-6 leading-none">
                            Privacy Policy
                        </h1>
                        <div class="w-24 h-1 bg-[#7ec8e3] mx-auto mb-6 rounded-full"></div>
                        <p class="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            Your privacy matters. Learn how we collect, use, and protect your personal information.
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
                            At Uncharted with Shayon, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
                        </p>
                    </div>
                </section>

                <!-- Information We Collect -->
                <section id="information" class="mb-12 scroll-mt-24">
                    <h2 class="font-display font-bold text-[#1a1a1a] text-2xl md:text-3xl mb-4 flex items-center gap-3">
                        <span class="w-8 h-8 rounded-full bg-[#7ec8e3]/20 flex items-center justify-center text-[#7ec8e3]">📋</span>
                        Information We Collect
                    </h2>
                    <div class="space-y-4 text-[#555555] leading-relaxed">
                        <p>We collect information that you voluntarily provide to us when you:</p>
                        <ul class="list-disc pl-6 space-y-2">
                            <li>Subscribe to our newsletter</li>
                            <li>Leave comments on our blog posts</li>
                            <li>Contact us through our contact form</li>
                            <li>Participate in surveys or contests</li>
                            <li>Create a user account</li>
                        </ul>
                        <p class="mt-4">This information may include your name, email address, and any other details you choose to provide.</p>
                    </div>
                </section>

                <!-- Automatically Collected Information -->
                <section id="auto-collected" class="mb-12 scroll-mt-24">
                    <h2 class="font-display font-bold text-[#1a1a1a] text-2xl md:text-3xl mb-4 flex items-center gap-3">
                        <span class="w-8 h-8 rounded-full bg-[#7ec8e3]/20 flex items-center justify-center text-[#7ec8e3]">🤖</span>
                        Automatically Collected Information
                    </h2>
                    <div class="space-y-4 text-[#555555] leading-relaxed">
                        <p>When you visit our website, we automatically collect certain information about your device and browsing behavior:</p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div class="bg-[#f9fafc] p-4 rounded-xl">
                                <div class="flex items-center gap-2 mb-2">
                                    <svg class="w-5 h-5 text-[#7ec8e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                    <span class="font-semibold text-[#1a1a1a]">Device Information</span>
                                </div>
                                <p class="text-sm">IP address, browser type, operating system, device type</p>
                            </div>
                            <div class="bg-[#f9fafc] p-4 rounded-xl">
                                <div class="flex items-center gap-2 mb-2">
                                    <svg class="w-5 h-5 text-[#7ec8e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                    </svg>
                                    <span class="font-semibold text-[#1a1a1a]">Usage Data</span>
                                </div>
                                <p class="text-sm">Pages visited, time spent, links clicked, search queries</p>
                            </div>
                            <div class="bg-[#f9fafc] p-4 rounded-xl">
                                <div class="flex items-center gap-2 mb-2">
                                    <svg class="w-5 h-5 text-[#7ec8e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                    <span class="font-semibold text-[#1a1a1a]">Location Data</span>
                                </div>
                                <p class="text-sm">General geographic location based on IP address</p>
                            </div>
                            <div class="bg-[#f9fafc] p-4 rounded-xl">
                                <div class="flex items-center gap-2 mb-2">
                                    <svg class="w-5 h-5 text-[#7ec8e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <span class="font-semibold text-[#1a1a1a]">Cookies</span>
                                </div>
                                <p class="text-sm">Small data files stored on your device to enhance user experience</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- How We Use Your Information -->
                <section id="usage" class="mb-12 scroll-mt-24">
                    <h2 class="font-display font-bold text-[#1a1a1a] text-2xl md:text-3xl mb-4 flex items-center gap-3">
                        <span class="w-8 h-8 rounded-full bg-[#7ec8e3]/20 flex items-center justify-center text-[#7ec8e3]">⚙️</span>
                        How We Use Your Information
                    </h2>
                    <div class="space-y-4 text-[#555555] leading-relaxed">
                        <p>We use the information we collect to:</p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                            <div class="flex items-start gap-2">
                                <svg class="w-5 h-5 text-[#7ec8e3] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Send you newsletters and updates</span>
                            </div>
                            <div class="flex items-start gap-2">
                                <svg class="w-5 h-5 text-[#7ec8e3] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Respond to your inquiries and comments</span>
                            </div>
                            <div class="flex items-start gap-2">
                                <svg class="w-5 h-5 text-[#7ec8e3] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Improve our website and content</span>
                            </div>
                            <div class="flex items-start gap-2">
                                <svg class="w-5 h-5 text-[#7ec8e3] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Analyze website traffic and user behavior</span>
                            </div>
                            <div class="flex items-start gap-2">
                                <svg class="w-5 h-5 text-[#7ec8e3] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Personalize your experience</span>
                            </div>
                            <div class="flex items-start gap-2">
                                <svg class="w-5 h-5 text-[#7ec8e3] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Protect against fraudulent activity</span>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Cookies Policy -->
                <section id="cookies" class="mb-12 scroll-mt-24">
                    <h2 class="font-display font-bold text-[#1a1a1a] text-2xl md:text-3xl mb-4 flex items-center gap-3">
                        <span class="w-8 h-8 rounded-full bg-[#7ec8e3]/20 flex items-center justify-center text-[#7ec8e3]">🍪</span>
                        Cookies Policy
                    </h2>
                    <div class="space-y-4 text-[#555555] leading-relaxed">
                        <p>We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small data files stored on your device that help us:</p>
                        <ul class="list-disc pl-6 space-y-2">
                            <li>Remember your preferences and settings</li>
                            <li>Understand how you use our website</li>
                            <li>Improve website performance and functionality</li>
                            <li>Deliver relevant content and advertisements</li>
                        </ul>
                        <p class="mt-4">You can control cookies through your browser settings. However, disabling cookies may affect your ability to use certain features of our website.</p>
                        <div class="bg-[#f9fafc] p-4 rounded-xl mt-4">
                            <div class="flex items-center justify-between flex-wrap gap-4">
                                <div>
                                    <p class="font-semibold text-[#1a1a1a]">Cookie Preferences</p>
                                    <p class="text-sm text-[#555555]">Manage your cookie settings</p>
                                </div>
                                <button class="px-4 py-2 bg-[#7ec8e3] text-[#1a1a1a] rounded-full text-sm font-semibold hover:bg-[#5bb8d4] transition-colors">
                                    Customize Settings
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Data Security -->
                <section id="security" class="mb-12 scroll-mt-24">
                    <h2 class="font-display font-bold text-[#1a1a1a] text-2xl md:text-3xl mb-4 flex items-center gap-3">
                        <span class="w-8 h-8 rounded-full bg-[#7ec8e3]/20 flex items-center justify-center text-[#7ec8e3]">🛡️</span>
                        Data Security
                    </h2>
                    <div class="space-y-4 text-[#555555] leading-relaxed">
                        <p>We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                            <div class="flex items-center gap-2 bg-[#f9fafc] p-3 rounded-lg">
                                <svg class="w-5 h-5 text-[#7ec8e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6-4h12a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2zm10-4V6a4 4 0 00-8 0v4h8z"></path>
                                </svg>
                                <span class="text-sm">SSL/TLS encryption</span>
                            </div>
                            <div class="flex items-center gap-2 bg-[#f9fafc] p-3 rounded-lg">
                                <svg class="w-5 h-5 text-[#7ec8e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                </svg>
                                <span class="text-sm">Regular security audits</span>
                            </div>
                            <div class="flex items-center gap-2 bg-[#f9fafc] p-3 rounded-lg">
                                <svg class="w-5 h-5 text-[#7ec8e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                </svg>
                                <span class="text-sm">Access controls</span>
                            </div>
                            <div class="flex items-center gap-2 bg-[#f9fafc] p-3 rounded-lg">
                                <svg class="w-5 h-5 text-[#7ec8e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                </svg>
                                <span class="text-sm">Data backup systems</span>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Third-Party Services -->
                <section id="third-party" class="mb-12 scroll-mt-24">
                    <h2 class="font-display font-bold text-[#1a1a1a] text-2xl md:text-3xl mb-4 flex items-center gap-3">
                        <span class="w-8 h-8 rounded-full bg-[#7ec8e3]/20 flex items-center justify-center text-[#7ec8e3]">🔗</span>
                        Third-Party Services
                    </h2>
                    <div class="space-y-4 text-[#555555] leading-relaxed">
                        <p>We may use third-party services to enhance our website functionality. These services have their own privacy policies and may collect information about you:</p>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                            <div class="border border-[#e5e7eb] rounded-xl p-4">
                                <div class="flex items-center gap-2 mb-2">
                                    <span class="text-xl">📊</span>
                                    <span class="font-semibold text-[#1a1a1a]">Google Analytics</span>
                                </div>
                                <p class="text-sm text-[#555555]">For website analytics and traffic analysis</p>
                            </div>
                            <div class="border border-[#e5e7eb] rounded-xl p-4">
                                <div class="flex items-center gap-2 mb-2">
                                    <span class="text-xl">📧</span>
                                    <span class="font-semibold text-[#1a1a1a]">Mailchimp</span>
                                </div>
                                <p class="text-sm text-[#555555]">For newsletter distribution and email marketing</p>
                            </div>
                            <div class="border border-[#e5e7eb] rounded-xl p-4">
                                <div class="flex items-center gap-2 mb-2">
                                    <span class="text-xl">💬</span>
                                    <span class="font-semibold text-[#1a1a1a]">Disqus</span>
                                </div>
                                <p class="text-sm text-[#555555]">For blog comments and community engagement</p>
                            </div>
                            <div class="border border-[#e5e7eb] rounded-xl p-4">
                                <div class="flex items-center gap-2 mb-2">
                                    <span class="text-xl">📸</span>
                                    <span class="font-semibold text-[#1a1a1a]">Unsplash</span>
                                </div>
                                <p class="text-sm text-[#555555]">For high-quality stock photography</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Your Rights -->
                <section id="rights" class="mb-12 scroll-mt-24">
                    <h2 class="font-display font-bold text-[#1a1a1a] text-2xl md:text-3xl mb-4 flex items-center gap-3">
                        <span class="w-8 h-8 rounded-full bg-[#7ec8e3]/20 flex items-center justify-center text-[#7ec8e3]">⚖️</span>
                        Your Rights
                    </h2>
                    <div class="space-y-4 text-[#555555] leading-relaxed">
                        <p>Depending on your location, you may have the following rights regarding your personal information:</p>
                        <div class="grid grid-cols-1 gap-3 mt-4">
                            <div class="flex items-start gap-3 p-3 bg-[#f9fafc] rounded-lg">
                                <div class="w-6 h-6 rounded-full bg-[#7ec8e3]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span class="text-xs text-[#7ec8e3]">1</span>
                                </div>
                                <div>
                                    <p class="font-semibold text-[#1a1a1a]">Right to Access</p>
                                    <p class="text-sm">Request a copy of the personal information we hold about you</p>
                                </div>
                            </div>
                            <div class="flex items-start gap-3 p-3 bg-[#f9fafc] rounded-lg">
                                <div class="w-6 h-6 rounded-full bg-[#7ec8e3]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span class="text-xs text-[#7ec8e3]">2</span>
                                </div>
                                <div>
                                    <p class="font-semibold text-[#1a1a1a]">Right to Rectification</p>
                                    <p class="text-sm">Request correction of inaccurate or incomplete information</p>
                                </div>
                            </div>
                            <div class="flex items-start gap-3 p-3 bg-[#f9fafc] rounded-lg">
                                <div class="w-6 h-6 rounded-full bg-[#7ec8e3]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span class="text-xs text-[#7ec8e3]">3</span>
                                </div>
                                <div>
                                    <p class="font-semibold text-[#1a1a1a]">Right to Erasure</p>
                                    <p class="text-sm">Request deletion of your personal information</p>
                                </div>
                            </div>
                            <div class="flex items-start gap-3 p-3 bg-[#f9fafc] rounded-lg">
                                <div class="w-6 h-6 rounded-full bg-[#7ec8e3]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span class="text-xs text-[#7ec8e3]">4</span>
                                </div>
                                <div>
                                    <p class="font-semibold text-[#1a1a1a]">Right to Opt-Out</p>
                                    <p class="text-sm">Opt-out of marketing communications at any time</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Contact Information -->
                <section id="contact" class="mb-12 scroll-mt-24">
                    <h2 class="font-display font-bold text-[#1a1a1a] text-2xl md:text-3xl mb-4 flex items-center gap-3">
                        <span class="w-8 h-8 rounded-full bg-[#7ec8e3]/20 flex items-center justify-center text-[#7ec8e3]">📧</span>
                        Contact Us
                    </h2>
                    <div class="bg-gradient-to-br from-[#1a4a6b] to-[#0f2a3f] rounded-2xl p-8 text-white">
                        <p class="mb-4 text-white/90">If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
                        <div class="space-y-3">
                            <div class="flex items-center gap-3">
                                <svg class="w-5 h-5 text-[#7ec8e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                                <span>admin@webdevlab.org</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <svg class="w-5 h-5 text-[#7ec8e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                <span>58-gha-4, West Raja Bazaar, Dhaka, Bangladesh</span>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Updates to Policy -->
                <section id="updates" class="scroll-mt-24">
                    <div class="border-t border-[#e5e7eb] pt-8">
                        <div class="bg-[#f9fafc] p-6 rounded-xl">
                            <div class="flex items-start gap-3">
                                <svg class="w-6 h-6 text-[#7ec8e3] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <div>
                                    <p class="font-semibold text-[#1a1a1a] mb-1">Updates to This Policy</p>
                                    <p class="text-sm text-[#555555]">We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically to stay informed about how we protect your information.</p>
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
                <h2 class="font-display font-bold text-white text-3xl md:text-4xl mb-4">Still Have Questions?</h2>
                <p class="text-white/70 text-lg max-w-2xl mx-auto mb-8">
                    We're here to help. Reach out to us anytime for privacy-related concerns.
                </p>
                <NuxtLink href="/contact" 
                    class="inline-flex items-center gap-2 px-8 py-4 bg-[#7ec8e3] text-[#1a1a1a] rounded-full font-semibold hover:bg-[#5bb8d4] transition-all duration-300 hover:scale-105">
                    Contact Our Team
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                </NuxtLink>
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
    title: 'Privacy Policy | Uncharted with Shayon',
    meta: [
        { name: 'description', content: 'Learn about how Uncharted with Shayon collects, uses, and protects your personal information. Read our privacy policy to understand your rights.' },
        { name: 'keywords', content: 'privacy policy, data protection, GDPR, cookie policy, privacy, legal' },
        { property: 'og:title', content: 'Privacy Policy | Uncharted with Shayon' },
        { property: 'og:description', content: 'Your privacy matters. Learn how we protect your personal information.' },
        { name: 'robots', content: 'index, follow' }
    ]
})

// ============================================================
// Navigation Sections
// ============================================================
const sections = [
    { id: 'introduction', label: 'Introduction' },
    { id: 'information', label: 'Information Collection' },
    { id: 'auto-collected', label: 'Auto-Collected Data' },
    { id: 'usage', label: 'How We Use Data' },
    { id: 'cookies', label: 'Cookies Policy' },
    { id: 'security', label: 'Data Security' },
    { id: 'third-party', label: 'Third-Party Services' },
    { id: 'rights', label: 'Your Rights' },
    { id: 'contact', label: 'Contact Us' },
    { id: 'updates', label: 'Updates' }
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
</style>