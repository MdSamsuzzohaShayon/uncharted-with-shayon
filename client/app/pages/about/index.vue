<template>
    <div class="w-full">
        <!-- ================================================================
           HERO SECTION
      ================================================================ -->
        <header>
            <section class="relative min-h-[70vh] flex flex-col overflow-hidden" aria-label="About header">
                <div class="absolute inset-0 z-0" aria-hidden="true">
                    <div class="absolute inset-0 bg-gradient-to-br from-[#1a1a1a]/85 via-[#1a4a6b]/70 to-[#0f2a3f]/80 z-10"></div>
                    <div class="w-full h-full bg-cover bg-center"
                         style="background-image: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80')">
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#f9fafc] to-transparent z-20"></div>
                </div>

                <Navbar />

                <main class="flex-1 flex items-center px-6 md:px-12 lg:px-20 py-20 relative z-20">
                    <div class="w-full text-center">
                        <div class="inline-flex items-center gap-3 bg-white/15 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/20">
                            <span class="text-3xl">✨</span>
                            <span class="text-[#7ec8e3] text-sm font-semibold tracking-[0.2em] uppercase">The Story Behind the Journey</span>
                        </div>
                        <h1 class="font-display font-black text-white text-6xl md:text-7xl lg:text-8xl mb-6 leading-none">
                            Uncharted with Shayon
                        </h1>
                        <div class="w-24 h-1 bg-[#7ec8e3] mx-auto mb-6 rounded-full"></div>
                        <p class="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            One traveler's journey to explore the unexplored, connect with cultures, and share stories that inspire.
                        </p>
                    </div>
                </main>

                <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
                    <svg class="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7-7-7m14-6l-7 7-7-7"></path>
                    </svg>
                </div>
            </section>
        </header>

        <!-- ================================================================
           INTRO STATS
      ================================================================ -->
        <div class="relative z-30 -mt-20 px-6 md:px-12 lg:px-20">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-white rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <div class="text-4xl md:text-5xl font-display font-bold text-[#7ec8e3] mb-2">32+</div>
                    <p class="text-[#555555] text-sm uppercase tracking-wider">Countries Visited</p>
                </div>
                <div class="bg-white rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <div class="text-4xl md:text-5xl font-display font-bold text-[#7ec8e3] mb-2">156+</div>
                    <p class="text-[#555555] text-sm uppercase tracking-wider">Cities Explored</p>
                </div>
                <div class="bg-white rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <div class="text-4xl md:text-5xl font-display font-bold text-[#7ec8e3] mb-2">287K+</div>
                    <p class="text-[#555555] text-sm uppercase tracking-wider">Kilometers Traveled</p>
                </div>
                <div class="bg-white rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <div class="text-4xl md:text-5xl font-display font-bold text-[#7ec8e3] mb-2">5+</div>
                    <p class="text-[#555555] text-sm uppercase tracking-wider">Years on the Road</p>
                </div>
            </div>
        </div>

        <!-- ================================================================
           ABOUT STORY
      ================================================================ -->
        <div class="px-6 md:px-12 lg:px-20 py-20">
            <div class="max-w-6xl mx-auto">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div class="order-2 lg:order-1">
                        <p class="text-[#7ec8e3] text-xs font-semibold tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
                            <span class="w-8 h-px bg-[#7ec8e3]"></span> 
                            The Journey Begins
                        </p>
                        <h2 class="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl mb-6">
                            From Corporate Cubicle to Global Explorer
                        </h2>
                        <div class="space-y-4 text-[#555555] leading-relaxed">
                            <p>Three years ago, I was sitting in a glass-walled office, watching the world through a screen. I had a stable job, a comfortable apartment, and everything society told me I should want. But something was missing—the call of the unknown, the thrill of discovery, the stories waiting to be told.</p>
                            <p>One day, I made a decision that changed everything. I packed a single backpack, booked a one-way ticket to Nepal, and stepped into the unknown. What started as a "gap year" has become a five-year journey across 32 countries, countless mountains, deserts, forests, and coastlines.</p>
                            <p>Uncharted with Shayon was born from this journey—a space to share raw, unfiltered stories from the road. No itineraries, no perfect plans, just real adventures and the people I've met along the way.</p>
                        </div>
                    </div>
                    <div class="order-1 lg:order-2 relative">
                        <div class="relative rounded-2xl overflow-hidden shadow-2xl">
                            <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80" 
                                 alt="Shayon on a mountain peak"
                                 class="w-full h-auto object-cover" />
                            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                        <div class="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-4 max-w-xs hidden md:block">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-[#7ec8e3]/20 flex items-center justify-center">
                                    <span class="text-xl">🏔️</span>
                                </div>
                                <div>
                                    <p class="text-xs text-[#555555]">First Peak Conquered</p>
                                    <p class="font-semibold text-[#1a1a1a]">Annapurna Base Camp, 2022</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ================================================================
           MISSION & VALUES
      ================================================================ -->
        <section class="bg-[#f9fafc] py-20">
            <div class="px-6 md:px-12 lg:px-20">
                <div class="text-center mb-12">
                    <p class="text-[#7ec8e3] text-xs font-semibold tracking-[0.2em] uppercase mb-3 flex items-center justify-center gap-2">
                        <span class="w-8 h-px bg-[#7ec8e3]"></span> 
                        What Drives Me 
                        <span class="w-8 h-px bg-[#7ec8e3]"></span>
                    </p>
                    <h2 class="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl">Mission & Values</h2>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div class="w-16 h-16 rounded-full bg-[#7ec8e3]/10 flex items-center justify-center mx-auto mb-4">
                            <span class="text-3xl">🌍</span>
                        </div>
                        <h3 class="font-display font-bold text-[#1a1a1a] text-xl mb-3">Authentic Exploration</h3>
                        <p class="text-[#555555] text-sm leading-relaxed">
                            Moving beyond tourist traps to discover the heart of each destination through local connections and genuine experiences.
                        </p>
                    </div>
                    <div class="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div class="w-16 h-16 rounded-full bg-[#7ec8e3]/10 flex items-center justify-center mx-auto mb-4">
                            <span class="text-3xl">📸</span>
                        </div>
                        <h3 class="font-display font-bold text-[#1a1a1a] text-xl mb-3">Storytelling</h3>
                        <p class="text-[#555555] text-sm leading-relaxed">
                            Capturing not just places, but the moments, emotions, and people that make each journey unforgettable.
                        </p>
                    </div>
                    <div class="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div class="w-16 h-16 rounded-full bg-[#7ec8e3]/10 flex items-center justify-center mx-auto mb-4">
                            <span class="text-3xl">🤝</span>
                        </div>
                        <h3 class="font-display font-bold text-[#1a1a1a] text-xl mb-3">Community</h3>
                        <p class="text-[#555555] text-sm leading-relaxed">
                            Building a community of like-minded adventurers who believe in the power of travel to connect and transform.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ================================================================
           MY STORY TIMELINE
      ================================================================ -->
        <section class="px-6 md:px-12 lg:px-20 py-20">
            <div class="text-center mb-12">
                <p class="text-[#7ec8e3] text-xs font-semibold tracking-[0.2em] uppercase mb-3 flex items-center justify-center gap-2">
                    <span class="w-8 h-px bg-[#7ec8e3]"></span> 
                    The Journey So Far 
                    <span class="w-8 h-px bg-[#7ec8e3]"></span>
                </p>
                <h2 class="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl">Milestones & Memories</h2>
            </div>

            <div class="max-w-4xl mx-auto">
                <div v-for="(milestone, index) in milestones" :key="index" 
                     class="relative pl-8 pb-12 last:pb-0 group">
                    <!-- Timeline Line -->
                    <div class="absolute left-0 top-0 bottom-0 w-px bg-[#e5e7eb] group-last:hidden"></div>
                    <!-- Timeline Dot -->
                    <div class="absolute left-0 top-0 w-4 h-4 rounded-full bg-[#7ec8e3] transform -translate-x-1/2"></div>
                    
                    <div class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 ml-4">
                        <div class="flex flex-wrap items-center justify-between mb-3">
                            <span class="text-sm font-semibold text-[#7ec8e3]">{{ milestone.year }}</span>
                            <span class="text-xs text-[#555555]">{{ milestone.location }}</span>
                        </div>
                        <h3 class="font-display font-bold text-[#1a1a1a] text-xl mb-2">{{ milestone.title }}</h3>
                        <p class="text-[#555555] text-sm leading-relaxed">{{ milestone.description }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ================================================================
           PHILOSOPHY SECTION
      ================================================================ -->
        <section class="bg-gradient-to-br from-[#1a1a1a] to-[#1a4a6b] py-20">
            <div class="px-6 md:px-12 lg:px-20">
                <div class="max-w-4xl mx-auto text-center">
                    <div class="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/20">
                        <span class="text-2xl">💭</span>
                        <span class="text-[#7ec8e3] text-sm font-semibold tracking-[0.2em] uppercase">Travel Philosophy</span>
                    </div>
                    <blockquote class="text-white text-2xl md:text-3xl font-display leading-relaxed mb-6">
                        "The world is not a collection of destinations to check off a list, but a tapestry of experiences to be woven into your story."
                    </blockquote>
                    <p class="text-white/70 text-lg max-w-2xl mx-auto">
                        I believe in slow travel, meaningful connections, and leaving places better than I found them. Every journey is an opportunity to learn, grow, and share.
                    </p>
                </div>
            </div>
        </section>

        <!-- ================================================================
           FAVORITE MOMENTS GALLERY
      ================================================================ -->
        <section class="px-6 md:px-12 lg:px-20 py-20">
            <div class="text-center mb-12">
                <p class="text-[#7ec8e3] text-xs font-semibold tracking-[0.2em] uppercase mb-3 flex items-center justify-center gap-2">
                    <span class="w-8 h-px bg-[#7ec8e3]"></span> 
                    Favorite Moments 
                    <span class="w-8 h-px bg-[#7ec8e3]"></span>
                </p>
                <h2 class="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl">Unforgettable Experiences</h2>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div v-for="(moment, index) in favoriteMoments" :key="index"
                     class="group relative rounded-2xl overflow-hidden cursor-pointer aspect-square">
                    <img :src="moment.image" :alt="moment.title"
                         class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div class="absolute bottom-0 left-0 right-0 p-4">
                        <p class="text-white font-semibold text-sm">{{ moment.title }}</p>
                        <p class="text-white/70 text-xs">{{ moment.location }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ================================================================
           FUTURE PLANS
      ================================================================ -->
        <section class="bg-[#f9fafc] py-20">
            <div class="px-6 md:px-12 lg:px-20">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <p class="text-[#7ec8e3] text-xs font-semibold tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
                            <span class="w-8 h-px bg-[#7ec8e3]"></span> 
                            What's Next
                        </p>
                        <h2 class="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl mb-6">
                            The Adventure Continues
                        </h2>
                        <div class="space-y-4 text-[#555555] leading-relaxed">
                            <p>The journey never really ends—it just evolves. In the coming year, I'm planning expeditions to:</p>
                            <div class="grid grid-cols-2 gap-3 mt-4">
                                <div v-for="plan in futurePlans" :key="plan.name" 
                                     class="flex items-center gap-2 bg-white rounded-lg p-3">
                                    <span class="text-xl">{{ plan.icon }}</span>
                                    <div>
                                        <p class="font-semibold text-[#1a1a1a] text-sm">{{ plan.name }}</p>
                                        <p class="text-xs text-[#555555]">{{ plan.country }}</p>
                                    </div>
                                </div>
                            </div>
                            <p class="mt-4">Follow along as I discover new horizons, share more stories, and build this community of curious travelers.</p>
                        </div>
                    </div>
                    <div class="relative">
                        <div class="bg-gradient-to-br from-[#1a4a6b] to-[#0f2a3f] rounded-2xl p-8 text-white">
                            <div class="flex items-center gap-3 mb-4">
                                <span class="text-4xl">🚀</span>
                                <h3 class="font-display font-bold text-2xl">Join the Journey</h3>
                            </div>
                            <p class="text-white/80 mb-6">Subscribe to the newsletter and never miss a story from the road.</p>
                            <div class="flex gap-3">
                                <input type="email" placeholder="Your email address" 
                                       class="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#7ec8e3]">
                                <button class="px-6 py-2 bg-[#7ec8e3] text-[#1a1a1a] rounded-lg font-semibold hover:bg-[#5bb8d4] transition-colors">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ================================================================
           TESTIMONIALS
      ================================================================ -->
        <section class="px-6 md:px-12 lg:px-20 py-20">
            <div class="text-center mb-12">
                <p class="text-[#7ec8e3] text-xs font-semibold tracking-[0.2em] uppercase mb-3 flex items-center justify-center gap-2">
                    <span class="w-8 h-px bg-[#7ec8e3]"></span> 
                    Reader Stories 
                    <span class="w-8 h-px bg-[#7ec8e3]"></span>
                </p>
                <h2 class="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl">What Travelers Say</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div v-for="testimonial in testimonials" :key="testimonial.name" 
                     class="bg-white border border-[#e5e7eb] rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                    <div class="flex items-center gap-3 mb-4">
                        <img :src="testimonial.avatar" :alt="testimonial.name" class="w-12 h-12 rounded-full object-cover" />
                        <div>
                            <p class="font-semibold text-[#1a1a1a]">{{ testimonial.name }}</p>
                            <p class="text-xs text-[#555555]">{{ testimonial.location }}</p>
                        </div>
                    </div>
                    <div class="flex mb-3">
                        <svg v-for="i in 5" :key="i" class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                    </div>
                    <p class="text-[#555555] text-sm leading-relaxed italic">"{{ testimonial.quote }}"</p>
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
    title: 'About Shayon | Uncharted with Shayon',
    meta: [
        { name: 'description', content: 'Meet Shayon, the traveler behind Uncharted with Shayon. Discover the journey from corporate life to global explorer, sharing authentic travel stories and adventures.' },
        { name: 'keywords', content: 'travel blogger, adventure traveler, about me, travel journey, travel story' },
        { property: 'og:title', content: 'About Shayon | Uncharted with Shayon' },
        { property: 'og:description', content: 'Discover the story behind the journey. Meet Shayon and explore the mission to share authentic travel experiences.' },
        { property: 'og:image', content: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80' },
        { name: 'twitter:card', content: 'summary_large_image' }
    ]
})

// ============================================================
// Data
// ============================================================
const milestones = [
    {
        year: '2021',
        location: 'Nepal',
        title: 'The Leap of Faith',
        description: 'Quit my corporate job and booked a one-way ticket to Kathmandu. Started my journey with a 10-day solo trek in the Annapurna region.'
    },
    {
        year: '2022',
        location: 'Patagonia, Chile',
        title: 'Conquering the W Trek',
        description: 'Completed the 5-day W Trek in Torres del Paine, discovering the raw beauty of Patagonia and meeting fellow adventurers from around the world.'
    },
    {
        year: '2023',
        location: 'Sahara Desert, Morocco',
        title: 'Starlit Nights in the Desert',
        description: 'Spent a week living with Berber nomads in the Sahara, learning about their culture and sleeping under the most incredible starry skies.'
    },
    {
        year: '2024',
        location: 'Kyoto, Japan',
        title: 'Finding Peace in Tradition',
        description: 'A month-long journey through Japan, discovering the perfect balance between ancient traditions and modern innovation.'
    },
    {
        year: '2025',
        location: 'Global',
        title: 'Launching Uncharted with Shayon',
        description: 'Created this platform to share authentic travel stories, inspire others to explore, and build a community of curious travelers.'
    }
]

const favoriteMoments = [
    {
        title: 'Sunrise at Machu Picchu',
        location: 'Peru',
        image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&q=80'
    },
    {
        title: 'Northern Lights in Iceland',
        location: 'Iceland',
        image: 'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=600&q=80'
    },
    {
        title: 'Trekking in Himalayas',
        location: 'Nepal',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80'
    },
    {
        title: 'Kayaking in Milford Sound',
        location: 'New Zealand',
        image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=600&q=80'
    }
]

const futurePlans = [
    { name: 'Antarctic Expedition', country: 'Antarctica', icon: '❄️' },
    { name: 'Safari in Serengeti', country: 'Tanzania', icon: '🦁' },
    { name: 'Road Trip Across Iceland', country: 'Iceland', icon: '🚗' },
    { name: 'Amazon Rainforest', country: 'Brazil', icon: '🌿' },
    { name: 'Camino de Santiago', country: 'Spain', icon: '🥾' },
    { name: 'Mongolian Steppe', country: 'Mongolia', icon: '🏇' }
]

const testimonials = [
    {
        name: 'Sarah Johnson',
        location: 'Portland, USA',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        quote: 'Shayon\'s stories inspired me to take my first solo trip. His honest, unfiltered writing made me feel like I was right there with him.'
    },
    {
        name: 'Marcus Chen',
        location: 'Singapore',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        quote: 'The most authentic travel blog I\'ve ever read. No fluff, no sponsored nonsense—just real experiences and genuine insights.'
    },
    {
        name: 'Elena Rodriguez',
        location: 'Barcelona, Spain',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        quote: 'Uncharted with Shayon isn\'t just a travel blog. It\'s a reminder that adventure is waiting for all of us if we have the courage to seek it.'
    }
]
</script>

<style scoped lang="scss">
.animate-bounce {
    animation: bounce 2s infinite;
}

@keyframes bounce {
    0%, 100% {
        transform: translateY(-25%) translateX(-50%);
    }
    50% {
        transform: translateY(0) translateX(-50%);
    }
}

// Timeline animation
.timeline-item {
    animation: fadeInLeft 0.6s ease-out forwards;
}

@keyframes fadeInLeft {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

// Section animations
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
.stat-card:hover {
    transform: translateY(-4px);
}

// Responsive adjustments
@media (max-width: 768px) {
    .timeline-line {
        left: 0;
    }
}
</style>