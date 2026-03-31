<template>



    <div id="__nuxt" class="min-h-screen bg-[#f9fafc] font-body overflow-x-hidden">
        <!-- Semantic About Page Container -->
        <div class="w-full">

            <!-- ================================================================
             ABOUT HERO SECTION (Immersive Story Introduction)
        ================================================================ -->
            <header class="relative min-h-[85vh] flex flex-col overflow-hidden" aria-label="About hero">
                <!-- Background Image with cross-fade effect & gradient overlay -->
                <div class="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=85"
                        alt="Shayon standing on mountain ridge overlooking misty valleys"
                        class="w-full h-full object-cover object-center" fetchpriority="high">
                    <div class="absolute inset-0 bg-gradient-to-br from-[#1a1a1a]/70 via-[#1a4a6b]/50 to-[#0f2a3f]/70">
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#f9fafc] to-transparent">
                    </div>
                </div>

                <!-- Minimal Nav (reusable like homepage but lightweight) -->
                <nav class="relative z-20 flex items-center justify-between px-6 md:px-12 lg:px-20 py-6"
                    aria-label="Main navigation">
                    <a href="/" class="flex items-center gap-3 group" aria-label="Uncharted with Shayon — Home">
                        <!-- <img data-nuxt-img src="/logo.png" class="w-12" alt="logo"> -->
                        <span class="text-white font-display font-bold text-lg tracking-wide hidden sm:block"> Uncharted
                            <span class="text-[#7ec8e3]">with Shayon</span></span>
                    </a>
                    <div class="hidden md:flex items-center gap-1">
                        <a href="/"
                            class="px-4 py-2 rounded-full text-white/80 text-sm font-medium hover:text-white hover:bg-white/10 transition-all duration-300">
                            Home</a>
                        <a href="/destinations"
                            class="px-4 py-2 rounded-full text-white/80 text-sm font-medium hover:text-white hover:bg-white/10 transition-all duration-300">
                            Destinations</a>
                        <a href="/stories"
                            class="px-4 py-2 rounded-full text-white/80 text-sm font-medium hover:text-white hover:bg-white/10 transition-all duration-300">
                            Stories</a>
                        <a href="/about"
                            class="px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm text-white text-sm font-medium border border-white/20 transition-all duration-300 hover:bg-white/25">
                            About</a>
                    </div>
                    <div class="flex items-center gap-3">
                        <button
                            class="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300"
                            aria-label="Open search">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35"></path>
                            </svg>
                        </button>
                        <button
                            class="md:hidden w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-300"
                            aria-label="Open menu">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </nav>

                <!-- Hero Main Content: Intro to Shayon -->
                <main class="relative z-10 flex-1 flex items-center px-6 md:px-12 lg:px-20 pb-24 pt-12">
                    <div class="max-w-4xl mx-auto text-center lg:text-left lg:mx-0">
                        <div
                            class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 mb-6">
                            <span class="w-2 h-2 rounded-full bg-[#7ec8e3] animate-pulse"></span>
                            <span class="text-xs font-medium tracking-wide text-white/90">THE STORYTELLER</span>
                        </div>
                        <h1
                            class="font-display font-black text-white text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tighter">
                            Meet <span class="text-[#7ec8e3]">Shayon</span>
                        </h1>
                        <p class="text-white/80 text-lg md:text-xl max-w-2xl mt-6 leading-relaxed mx-auto lg:mx-0">
                            From the crowded streets of Dhaka to the silent summits of the Himalayas —
                            I trade comfort for curiosity and bring you stories that linger.
                        </p>
                        <div class="flex flex-wrap gap-4 justify-center lg:justify-start mt-8">
                            <a href="#journey-story"
                                class="px-6 py-3 bg-[#7ec8e3] hover:bg-[#5bb8d4] text-[#1a1a1a] font-semibold rounded-full text-sm tracking-wide transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-95">Read
                                my journey →</a>
                            <a href="#connect"
                                class="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-full text-sm transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5">Connect
                                with me</a>
                        </div>
                    </div>
                </main>
            </header>

            <!-- ================================================================
             PHILOSOPHY & STORY SECTION (Personal Narrative)
        ================================================================ -->
            <section id="journey-story" class="px-6 md:px-12 lg:px-20 py-20 md:py-28 bg-[#f9fafc]">
                <div class="max-w-6xl mx-auto">
                    <div class="grid lg:grid-cols-2 gap-12 items-center">
                        <div class="order-2 lg:order-1">
                            <span
                                class="text-[#7ec8e3] text-sm font-semibold tracking-[0.2em] uppercase flex items-center gap-2 mb-4">
                                <span class="w-6 h-px bg-[#7ec8e3]"></span> THE UNCHARTED WAY
                            </span>
                            <h2 class="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl leading-tight mb-6">
                                Not just a traveler, but a storyteller of the unseen.</h2>
                            <div class="space-y-5 text-[#555555] leading-relaxed">
                                <p>I started this journey with a beat-up backpack and an obsession for real connections.
                                    I don’t believe in scripted itineraries. Every trail, every local tea stall, every
                                    midnight train ride taught me that adventure is found where the map ends.</p>
                                <p>Uncharted with Shayon is my visual diary — a space for raw landscapes, honest
                                    conversations, and the kind of wanderlust that changes you. I’ve trekked solo across
                                    the Alps, slept under the stars in the Thar desert, and chased northern lights in
                                    Iceland. But the real magic? The people, the silence, and the moments that can’t be
                                    captured in a guidebook.</p>
                                <p class="font-medium text-[#1a4a6b]">Today, I share those moments with you. To inspire
                                    you to step off the beaten path and write your own story.</p>
                            </div>
                            <div class="mt-8 flex gap-5">
                                <div class="flex items-center gap-2">
                                    <svg class="w-5 h-5 text-[#7ec8e3]" fill="none" stroke="currentColor"
                                        stroke-width="2" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span class="text-sm text-[#1a1a1a]">Authentic storytelling</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <svg class="w-5 h-5 text-[#7ec8e3]" fill="none" stroke="currentColor"
                                        stroke-width="2" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span class="text-sm text-[#1a1a1a]">Solo & sustainable travel</span>
                                </div>
                            </div>
                        </div>
                        <div class="order-1 lg:order-2 relative">
                            <div class="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
                                <img src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=85"
                                    alt="Shayon hiking in Patagonian mountains"
                                    class="w-full h-auto object-cover transition-transform duration-700 hover:scale-105">
                                <div
                                    class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent">
                                </div>
                            </div>
                            <div
                                class="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl hidden md:block pulse-ring">
                                <div class="flex items-center gap-3">
                                    <div
                                        class="w-12 h-12 rounded-full bg-[#7ec8e3]/20 flex items-center justify-center">
                                        <svg class="w-6 h-6 text-[#1a4a6b]" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                                            </path>
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-xs text-[#555]">Currently exploring</p>
                                        <p class="font-bold text-[#1a1a1a]">Swiss Alps · Summer '25</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ================================================================
             STATS / MILESTONES (Journey highlights)
        ================================================================ -->
            <section class="bg-[#e8f4fd] py-16 md:py-20">
                <div class="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
                    <div class="text-center mb-12">
                        <p class="text-[#7ec8e3] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Wanderlust
                            numbers</p>
                        <h3 class="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl">Footprints across the
                            globe</h3>
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div class="bg-white rounded-2xl p-6 text-center shadow-sm stat-card">
                            <div class="text-4xl md:text-5xl font-black text-[#1a4a6b] mb-2">32+</div>
                            <p class="text-[#555] text-sm font-medium">Countries visited</p>
                        </div>
                        <div class="bg-white rounded-2xl p-6 text-center shadow-sm stat-card">
                            <div class="text-4xl md:text-5xl font-black text-[#1a4a6b] mb-2">180+</div>
                            <p class="text-[#555] text-sm font-medium">Stories published</p>
                        </div>
                        <div class="bg-white rounded-2xl p-6 text-center shadow-sm stat-card">
                            <div class="text-4xl md:text-5xl font-black text-[#1a4a6b] mb-2">4</div>
                            <p class="text-[#555] text-sm font-medium">Continents hiked</p>
                        </div>
                        <div class="bg-white rounded-2xl p-6 text-center shadow-sm stat-card">
                            <div class="text-4xl md:text-5xl font-black text-[#1a4a6b] mb-2">15k+</div>
                            <p class="text-[#555] text-sm font-medium">Adventure miles</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ================================================================
             PERSONAL MILESTONE TIMELINE (Key moments)
        ================================================================ -->
            <section class="px-6 md:px-12 lg:px-20 py-20 bg-[#f9fafc]">
                <div class="max-w-5xl mx-auto">
                    <div class="text-center mb-14">
                        <p class="text-[#7ec8e3] text-xs font-semibold tracking-[0.2em] uppercase">The timeline</p>
                        <h2 class="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl mt-2">Moments that defined
                            the path</h2>
                    </div>
                    <div class="space-y-8">
                        <div
                            class="flex flex-col md:flex-row gap-5 bg-white p-6 rounded-2xl shadow-sm border border-[#e5e7eb] milestone-item">
                            <div class="md:w-32 flex-shrink-0"><span
                                    class="text-[#7ec8e3] font-mono text-lg font-bold">2017</span></div>
                            <div>
                                <h4 class="font-bold text-[#1a1a1a] text-lg">First solo trek — Everest Base Camp</h4>
                                <p class="text-[#555] text-sm mt-1">Started the journey with a leap of faith; discovered
                                    that solitude in the mountains heals.</p>
                            </div>
                        </div>
                        <div
                            class="flex flex-col md:flex-row gap-5 bg-white p-6 rounded-2xl shadow-sm border border-[#e5e7eb] milestone-item">
                            <div class="md:w-32 flex-shrink-0"><span
                                    class="text-[#7ec8e3] font-mono text-lg font-bold">2020</span></div>
                            <div>
                                <h4 class="font-bold text-[#1a1a1a] text-lg">Founded Uncharted with Shayon</h4>
                                <p class="text-[#555] text-sm mt-1">Launched the blog to share unfiltered travel
                                    stories, connecting with a global community.</p>
                            </div>
                        </div>
                        <div
                            class="flex flex-col md:flex-row gap-5 bg-white p-6 rounded-2xl shadow-sm border border-[#e5e7eb] milestone-item">
                            <div class="md:w-32 flex-shrink-0"><span
                                    class="text-[#7ec8e3] font-mono text-lg font-bold">2023</span></div>
                            <div>
                                <h4 class="font-bold text-[#1a1a1a] text-lg">Across the Sahara documentary style</h4>
                                <p class="text-[#555] text-sm mt-1">Captured the raw beauty of desert life, featured by
                                    several travel platforms.</p>
                            </div>
                        </div>
                        <div
                            class="flex flex-col md:flex-row gap-5 bg-white p-6 rounded-2xl shadow-sm border border-[#e5e7eb] milestone-item">
                            <div class="md:w-32 flex-shrink-0"><span
                                    class="text-[#7ec8e3] font-mono text-lg font-bold">2025</span></div>
                            <div>
                                <h4 class="font-bold text-[#1a1a1a] text-lg">Keynote speaker at AdventureCon</h4>
                                <p class="text-[#555] text-sm mt-1">Spoke about sustainable travel and authentic
                                    storytelling.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ================================================================
             PHILOSOPHY IN IMAGES (Photo mosaic)
        ================================================================ -->
            <section class="px-6 md:px-12 lg:px-20 pb-16">
                <div class="max-w-7xl mx-auto">
                    <div class="text-center mb-12">
                        <p class="text-[#7ec8e3] text-xs font-semibold tracking-[0.2em] uppercase">Visual diary</p>
                        <h2 class="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl">Life through my lens</h2>
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[240px]">
                        <div class="rounded-2xl overflow-hidden col-span-1 row-span-2 relative group">
                            <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80"
                                alt="Mountain panorama"
                                class="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700">
                            <div
                                class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                            </div>
                        </div>
                        <div class="rounded-2xl overflow-hidden col-span-1 row-span-1 relative group">
                            <img src="https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=600&q=80"
                                alt="Rice terraces Bali"
                                class="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700">
                        </div>
                        <div class="rounded-2xl overflow-hidden col-span-1 row-span-1 relative group">
                            <img src="https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=600&q=80"
                                alt="Northern lights"
                                class="w-full h-full object-cover transition-transform group-hover:scale-105">
                        </div>
                        <div class="rounded-2xl overflow-hidden col-span-2 row-span-1 relative group">
                            <img src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80"
                                alt="Santorini sunset"
                                class="w-full h-full object-cover transition-transform group-hover:scale-105">
                        </div>
                        <div class="rounded-2xl overflow-hidden col-span-1 row-span-1 relative group">
                            <img src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80"
                                alt="Hiking Patagonia" class="w-full h-full object-cover">
                        </div>
                    </div>
                </div>
            </section>

        </div>
    </div>



</template>

<style scoped>
/* ===== ADDITIONAL CUSTOM STYLES (enhancing Tailwind) ===== */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

body {
    font-family: 'DM Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
    background-color: #f9fafc;
    overflow-x: hidden;
}

.font-display {
    font-family: 'Playfair Display', Georgia, serif;
}

/* Custom animations for about page */
@keyframes fade-in-up {
    from {
        opacity: 0;
        transform: translateY(28px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes float-soft {

    0%,
    100% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-12px);
    }
}

@keyframes slow-pulse {

    0%,
    100% {
        box-shadow: 0 0 0 0 rgba(126, 200, 227, 0.3);
    }

    50% {
        box-shadow: 0 0 0 16px rgba(126, 200, 227, 0);
    }
}

.animate-fade-in-up {
    animation: fade-in-up 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
}

.float-slow {
    animation: float-soft 6s ease-in-out infinite;
}

.pulse-ring {
    animation: slow-pulse 2s infinite;
}

/* Smooth scroll & image overlay enhancement */
.hero-gradient-overlay {
    background: linear-gradient(105deg, rgba(0, 0, 0, 0.75) 0%, rgba(26, 74, 107, 0.5) 70%, transparent 100%);
}

.stat-card {
    transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
}

.stat-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 30px -12px rgba(0, 0, 0, 0.15);
}

.milestone-item {
    position: relative;
    transition: all 0.2s ease;
}

.milestone-item:hover {
    transform: translateX(6px);
}

/* Scrollbar hide utility (if needed) */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>