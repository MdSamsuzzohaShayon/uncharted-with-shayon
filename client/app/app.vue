<template>
  <!-- Root wrapper — semantic HTML5 -->
  <div class="min-h-screen bg-[#f9fafc] font-body overflow-x-hidden">

    <!-- ================================================================
         SEARCH MEGA MENU OVERLAY
    ================================================================ -->
    <div
      :class="['search-overlay fixed inset-0 z-50 bg-[#1a1a1a]/60', searchOpen ? 'is-visible' : 'is-hidden']"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      @click.self="closeSearch"
    >
      <div class="search-panel w-full max-w-2xl mx-auto mt-16 md:mt-24 px-4">
        <div class="bg-white rounded-3xl shadow-2xl shadow-black/20 overflow-hidden border border-[#e5e7eb]">

          <!-- Search Input -->
          <div class="px-6 pt-6 pb-4 border-b border-[#e5e7eb]">
            <div class="flex items-center gap-4">
              <svg class="w-5 h-5 text-[#555555] flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="8"/><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35"/>
              </svg>
              <div class="search-input-wrapper flex-1">
                <input
                  ref="searchInputRef"
                  v-model="searchQuery"
                  type="search"
                  placeholder="Search destinations, stories…"
                  class="w-full bg-transparent text-[#1a1a1a] placeholder-[#aaa] text-lg outline-none py-1 font-body"
                  aria-label="Search destinations and stories"
                />
              </div>
              <button
                class="w-8 h-8 rounded-full bg-[#f9fafc] hover:bg-[#e5e7eb] flex items-center justify-center text-[#555555] transition-colors duration-200"
                aria-label="Close search"
                @click="closeSearch"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Recent Searches -->
          <div v-if="!searchQuery" class="px-6 py-5">
            <p class="text-[#555555] text-xs font-semibold tracking-widest uppercase mb-3">Recent Searches</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="term in recentSearches"
                :key="term"
                class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f9fafc] border border-[#e5e7eb] text-[#555555] text-sm hover:border-[#7ec8e3] hover:text-[#1a1a1a] transition-all duration-200"
                @click="searchQuery = term"
              >
                <svg class="w-3 h-3 opacity-50" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                {{ term }}
              </button>
            </div>

            <!-- Trending Destinations -->
            <p class="text-[#555555] text-xs font-semibold tracking-widest uppercase mb-3 mt-6">Trending Destinations</p>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="dest in trendingDests"
                :key="dest.name"
                class="search-result-item flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200"
                @click="searchQuery = dest.name"
              >
                <span class="text-xl flex-shrink-0">{{ dest.icon }}</span>
                <div>
                  <p class="text-[#1a1a1a] text-sm font-semibold leading-tight">{{ dest.name }}</p>
                  <p class="text-[#555555] text-xs">{{ dest.sub }}</p>
                </div>
              </button>
            </div>
          </div>

          <!-- Dynamic Results -->
          <div v-else class="px-6 py-5">
            <p class="text-[#555555] text-xs font-semibold tracking-widest uppercase mb-3">
              Results for "{{ searchQuery }}"
            </p>
            <div v-if="searchResults.length" class="space-y-1">
              <a
                v-for="result in searchResults"
                :key="result.title"
                href="#"
                class="search-result-item flex items-center gap-4 px-3 py-3 rounded-xl group"
              >
                <div class="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                  <img :src="result.img" :alt="result.title" class="w-full h-full object-cover"/>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-[#1a1a1a] text-sm font-semibold truncate group-hover:text-[#1a4a6b] transition-colors">{{ result.title }}</p>
                  <p class="text-[#555555] text-xs">{{ result.category }} · {{ result.readTime }}</p>
                </div>
                <svg class="w-4 h-4 text-[#aaa] flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
            <p v-else class="text-[#555555] text-sm py-4 text-center">No results found. Try a different keyword.</p>
          </div>

          <div class="px-6 py-3 bg-[#f9fafc] border-t border-[#e5e7eb] flex items-center justify-between">
            <p class="text-[#aaa] text-xs">Press <kbd class="px-1.5 py-0.5 bg-white border border-[#e5e7eb] rounded text-[10px] font-mono">Esc</kbd> to close</p>
            <p class="text-[#aaa] text-xs">{{ searchResults.length }} results</p>
          </div>

        </div>
      </div>
    </div>


    <!-- ================================================================
         HERO SECTION
    ================================================================ -->
    <header>
      <section class="relative min-h-screen flex flex-col overflow-hidden" aria-label="Hero">

        <!-- Background image with cross-fade -->
        <div class="absolute inset-0 z-0" aria-hidden="true">
          <img
            :src="heroBg"
            alt="Scenic adventure landscape"
            class="hero-bg-image w-full h-full object-cover"
            :class="{ 'is-fading': bgFading }"
            fetchpriority="high"
          />
          <div class="absolute inset-0 bg-gradient-to-br from-[#1a1a1a]/72 via-[#1a4a6b]/40 to-[#0f2a3f]/60"></div>
          <div class="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[#f9fafc] to-transparent"></div>
        </div>

        <!-- ====== NAVBAR ====== -->
        <nav class="relative z-20 flex items-center justify-between px-6 md:px-12 lg:px-20 py-6" aria-label="Main navigation">
          <a href="/" class="flex items-center gap-3" aria-label="Uncharted with Shayon — Home">
            <div class="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center" aria-hidden="true">
              <!-- <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/>
              </svg> -->
              <NuxtImg class="w-5 h-5" src="/logo.png"  />
            </div>
            <span class="text-white font-display font-bold text-lg tracking-wide hidden sm:block">
              Uncharted <span class="text-[#7ec8e3]">with Shayon</span>
            </span>
          </a>

          <div class="hidden md:flex items-center gap-1">
            <a href="/" aria-current="page" class="px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm text-white text-sm font-medium border border-white/20 transition-all duration-300 hover:bg-white/25">Home</a>
            <a href="/destinations" class="px-4 py-2 rounded-full text-white/80 text-sm font-medium hover:text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-1">
              Destinations
              <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
            </a>
            <a href="/stories" class="px-4 py-2 rounded-full text-white/80 text-sm font-medium hover:text-white hover:bg-white/10 transition-all duration-300">Stories</a>
            <a href="/about"   class="px-4 py-2 rounded-full text-white/80 text-sm font-medium hover:text-white hover:bg-white/10 transition-all duration-300">About</a>
          </div>

          <div class="flex items-center gap-3">
            <button
              class="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300"
              aria-label="Open search"
              @click="openSearch"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="8"/><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35"/>
              </svg>
            </button>
            <button
              class="md:hidden w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
              aria-label="Open menu"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </nav>

        <!-- ====== HERO CONTENT ====== -->
        <main>
          <div class="relative z-10 flex-1 flex items-center px-6 md:px-12 lg:px-20 pb-32 pt-8">
            <div class="w-full flex flex-col lg:flex-row items-center justify-between gap-12">

              <!-- Left: Headline -->
              <div class="max-w-xl lg:max-w-none lg:w-1/2 text-center lg:text-left">
                <p class="anim-hero-label text-[#7ec8e3] text-sm font-semibold tracking-[0.2em] uppercase mb-4 flex items-center justify-center lg:justify-start gap-2">
                  <span class="w-6 h-px bg-[#7ec8e3]" aria-hidden="true"></span>
                  Travel & Adventure Blog
                </p>
                <h1 class="anim-hero-h1 font-display font-black text-white leading-none">
                  <span class="block text-7xl md:text-8xl lg:text-9xl tracking-tighter">EXPLORE</span>
                  <span class="block text-4xl md:text-5xl lg:text-6xl tracking-widest text-[#7ec8e3] mt-1">THE WORLD</span>
                </h1>
                <p class="anim-hero-body text-white/70 text-base md:text-lg mt-6 leading-relaxed max-w-md mx-auto lg:mx-0">
                  Unscripted journeys, raw landscapes, and stories from the road. Join Shayon's adventures across the globe.
                </p>
                <div class="anim-hero-cta flex flex-col sm:flex-row gap-3 mt-8 justify-center lg:justify-start">
                  <a href="/stories" class="px-7 py-3.5 bg-[#7ec8e3] hover:bg-[#5bb8d4] text-[#1a1a1a] font-semibold rounded-full text-sm tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-[#7ec8e3]/30 hover:-translate-y-0.5 active:scale-95 text-center">
                    Start Exploring →
                  </a>
                  <button class="px-7 py-3.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-full text-sm tracking-wide border border-white/20 transition-all duration-300 hover:-translate-y-0.5 active:scale-95">
                    Watch Stories
                  </button>
                </div>
              </div>

              <!-- Right: Floating Image Cards -->
              <div class="anim-cards-wrap relative w-full lg:w-1/2 h-[420px] md:h-[500px] flex items-center justify-center" aria-label="Featured travel destinations">
                <div class="flex gap-3 md:gap-4 items-end justify-center">

                  <article
                    :class="['float-card float-a group relative w-28 md:w-36 rounded-3xl overflow-hidden shadow-2xl shadow-black/40 cursor-pointer flex-shrink-0 -mb-6', activeCardIndex === 0 ? 'is-active' : '']"
                    style="height: clamp(200px, 30vw, 288px)"
                    role="button" tabindex="0"
                    aria-label="Urban travel — click to preview"
                    @click="setHeroBg(0)" @keydown.enter="setHeroBg(0)"
                  >
                    <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80" alt="Urban Tokyo cityscape at night" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                    <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" aria-hidden="true"></div>
                    <div class="absolute bottom-3 left-3"><span class="text-white text-xs font-bold tracking-wider uppercase">Urban</span></div>
                    <div v-if="activeCardIndex === 0" class="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#7ec8e3] flex items-center justify-center shadow-lg">
                      <svg class="w-3 h-3 text-[#1a1a1a]" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                    </div>
                  </article>

                  <article
                    :class="['float-card float-b group relative w-28 md:w-36 rounded-3xl overflow-hidden shadow-2xl shadow-black/40 cursor-pointer flex-shrink-0', activeCardIndex === 1 ? 'is-active' : '']"
                    style="height: clamp(240px, 36vw, 384px)"
                    role="button" tabindex="0"
                    aria-label="Nature travel — click to preview"
                    @click="setHeroBg(1)" @keydown.enter="setHeroBg(1)"
                  >
                    <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80" alt="Majestic mountain landscape at sunrise" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                    <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" aria-hidden="true"></div>
                    <div class="absolute bottom-3 left-3"><span class="text-white text-xs font-bold tracking-wider uppercase">Nature</span></div>
                    <div v-if="activeCardIndex === 1" class="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#7ec8e3] flex items-center justify-center shadow-lg">
                      <svg class="w-3 h-3 text-[#1a1a1a]" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                    </div>
                  </article>

                  <article
                    :class="['float-card float-c group relative w-28 md:w-36 rounded-3xl overflow-hidden shadow-2xl shadow-black/40 cursor-pointer flex-shrink-0 -mb-3', activeCardIndex === 2 ? 'is-active' : '']"
                    style="height: clamp(200px, 30vw, 288px)"
                    role="button" tabindex="0"
                    aria-label="Romance travel — click to preview"
                    @click="setHeroBg(2)" @keydown.enter="setHeroBg(2)"
                  >
                    <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80" alt="Romantic mountain lake at sunset" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                    <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" aria-hidden="true"></div>
                    <div class="absolute bottom-3 left-3"><span class="text-white text-xs font-bold tracking-wider uppercase">Romance</span></div>
                    <div v-if="activeCardIndex === 2" class="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#7ec8e3] flex items-center justify-center shadow-lg">
                      <svg class="w-3 h-3 text-[#1a1a1a]" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                    </div>
                  </article>

                  <article
                    :class="['float-card float-d group relative w-28 md:w-36 rounded-3xl overflow-hidden shadow-2xl shadow-black/40 cursor-pointer flex-shrink-0 -mb-8 hidden sm:block', activeCardIndex === 3 ? 'is-active' : '']"
                    style="height: clamp(180px, 26vw, 256px)"
                    role="button" tabindex="0"
                    aria-label="Culture travel — click to preview"
                    @click="setHeroBg(3)" @keydown.enter="setHeroBg(3)"
                  >
                    <img src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&q=80" alt="Venice canal with gondolas and historic architecture" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                    <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" aria-hidden="true"></div>
                    <div class="absolute bottom-3 left-3"><span class="text-white text-xs font-bold tracking-wider uppercase">Culture</span></div>
                    <div v-if="activeCardIndex === 3" class="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#7ec8e3] flex items-center justify-center shadow-lg">
                      <svg class="w-3 h-3 text-[#1a1a1a]" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                    </div>
                  </article>

                </div>
              </div>

            </div>
          </div>
        </main>

        <!-- ====== CATEGORY FILTER BAR ====== -->
        <div class="absolute bottom-0 left-0 right-0 z-20 px-6 md:px-12 lg:px-20 pb-6" role="navigation" aria-label="Category filter">
          <div class="bg-white/92 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/10 border border-[#e5e7eb] px-4 md:px-8 py-4 flex items-center gap-2 md:gap-4 overflow-x-auto scrollbar-hide">
            <span class="text-[#555555] text-xs font-semibold tracking-widest uppercase whitespace-nowrap mr-2 hidden md:block" aria-hidden="true">Explore</span>
            <div class="w-px h-6 bg-[#e5e7eb] hidden md:block" aria-hidden="true"></div>
            <button
              v-for="(cat, i) in categories"
              :key="cat.label"
              :class="['flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 flex-shrink-0 active:scale-95',
                activeCategory === i
                  ? 'cat-btn-active bg-[#1a4a6b] text-white shadow-md shadow-[#1a4a6b]/20'
                  : 'hover:bg-[#f9fafc] text-[#555555] hover:text-[#1a1a1a] hover:scale-105']"
              :aria-pressed="activeCategory === i"
              :aria-label="`Filter by ${cat.label}`"
              @click="activeCategory = i"
            >
              <span :class="['w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0', cat.bg]" aria-hidden="true">{{ cat.icon }}</span>
              {{ cat.label }}
            </button>
          </div>
        </div>

      </section>
    </header>


    <!-- ================================================================
         FEATURED POSTS
    ================================================================ -->
    <section class="px-6 md:px-12 lg:px-20 pt-16 pb-20" aria-labelledby="latest-stories-heading">
      <div class="flex items-end justify-between mb-10">
        <div>
          <p class="text-[#7ec8e3] text-xs font-semibold tracking-[0.2em] uppercase mb-2 flex items-center gap-2" aria-hidden="true">
            <span class="w-5 h-px bg-[#7ec8e3]"></span> Latest Stories
          </p>
          <h2 id="latest-stories-heading" class="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl tracking-tight">
            Fresh from the Road
          </h2>
        </div>
        <a href="/stories" class="hidden md:flex items-center gap-2 text-[#555555] text-sm font-medium hover:text-[#1a1a1a] transition-colors duration-200 group">
          View All
          <svg class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article class="group md:col-span-2 relative rounded-2xl overflow-hidden bg-white border border-[#e5e7eb] shadow-sm hover:shadow-xl hover:shadow-black/8 transition-all duration-500 cursor-pointer hover:-translate-y-1">
          <div class="relative h-72 md:h-80 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80" alt="Pristine turquoise waters of the Maldives with overwater bungalows" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy"/>
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" aria-hidden="true"></div>
            <span class="absolute top-4 left-4 bg-[#7ec8e3] text-[#1a1a1a] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">Beach</span>
          </div>
          <div class="p-6">
            <div class="flex items-center gap-3 mb-3">
              <time datetime="2025-03-12" class="text-[#555555] text-xs">March 12, 2025</time>
              <span class="w-1 h-1 rounded-full bg-[#e5e7eb]" aria-hidden="true"></span>
              <span class="text-[#555555] text-xs">8 min read</span>
            </div>
            <h3 class="font-display font-bold text-[#1a1a1a] text-xl md:text-2xl leading-snug mb-3 group-hover:text-[#1a4a6b] transition-colors duration-300">
              Lost in Paradise: 10 Days in the Maldives on a Budget
            </h3>
            <p class="text-[#555555] text-sm leading-relaxed line-clamp-2">
              Turquoise lagoons, overwater bungalows, and reef sharks — here's how I did it all without breaking the bank.
            </p>
            <div class="flex items-center justify-between mt-5">
              <div class="flex items-center gap-2">
                <div class="w-7 h-7 rounded-full bg-gradient-to-br from-[#7ec8e3] to-[#1a4a6b] flex items-center justify-center text-white text-xs font-bold" aria-hidden="true">S</div>
                <span class="text-[#555555] text-xs font-medium">Shayon</span>
              </div>
              <span class="text-[#1a4a6b] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                Read More
                <svg class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
              </span>
            </div>
          </div>
        </article>

        <div class="flex flex-col gap-6">
          <article v-for="post in smallPosts" :key="post.title" class="group relative rounded-2xl overflow-hidden bg-white border border-[#e5e7eb] shadow-sm hover:shadow-xl hover:shadow-black/8 transition-all duration-500 cursor-pointer flex flex-col hover:-translate-y-1">
            <div class="relative h-44 overflow-hidden">
              <img :src="post.img" :alt="post.imgAlt" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy"/>
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" aria-hidden="true"></div>
              <span class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#1a1a1a] text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">{{ post.category }}</span>
            </div>
            <div class="p-4 flex-1 flex flex-col">
              <time :datetime="post.datetime" class="text-[#555555] text-xs mb-1.5">{{ post.date }}</time>
              <h3 class="font-display font-bold text-[#1a1a1a] text-base leading-snug group-hover:text-[#1a4a6b] transition-colors duration-300 flex-1">{{ post.title }}</h3>
              <div class="flex items-center justify-between mt-3 pt-3 border-t border-[#e5e7eb]">
                <span class="text-[#555555] text-xs">{{ post.readTime }}</span>
                <svg class="w-4 h-4 text-[#1a4a6b] transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>


    <!-- ================================================================
         DESTINATIONS MARQUEE
    ================================================================ -->
    <div class="bg-[#1a1a1a] py-5 overflow-hidden" aria-hidden="true">
      <div class="marquee-track flex gap-8 whitespace-nowrap">
        <span v-for="(dest, i) in [...destinations, ...destinations]" :key="`${dest}-${i}`"
          class="text-white/30 text-sm font-semibold tracking-[0.3em] uppercase flex-shrink-0 flex items-center gap-8">
          {{ dest }}
          <span class="w-1.5 h-1.5 rounded-full bg-[#7ec8e3]/60 inline-block"></span>
        </span>
      </div>
    </div>


    <!-- ================================================================
         PHOTO JOURNAL MOSAIC
    ================================================================ -->
    <section class="px-6 md:px-12 lg:px-20 py-20 bg-[#f9fafc]" aria-labelledby="photo-journal-heading">
      <div class="text-center mb-12">
        <p class="text-[#7ec8e3] text-xs font-semibold tracking-[0.2em] uppercase mb-3 flex items-center justify-center gap-2" aria-hidden="true">
          <span class="w-5 h-px bg-[#7ec8e3]"></span> Photo Journal <span class="w-5 h-px bg-[#7ec8e3]"></span>
        </p>
        <h2 id="photo-journal-heading" class="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl tracking-tight">
          Moments from the Journey
        </h2>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-3 md:gap-4 h-[480px] md:h-[560px]">
        <figure v-for="(photo, i) in galleryPhotos" :key="i" :class="['group relative rounded-2xl overflow-hidden cursor-pointer', photo.span]">
          <img :src="photo.src" :alt="photo.alt" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy"/>
          <figcaption class="absolute inset-0 flex items-end p-3">
            <div class="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true"></div>
            <p class="relative text-white text-sm font-bold translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">{{ photo.alt }}</p>
          </figcaption>
        </figure>
      </div>
    </section>


    <!-- ================================================================
         NEWSLETTER CTA
    ================================================================ -->
    <section class="relative mx-6 md:mx-12 lg:mx-20 mb-20 rounded-3xl overflow-hidden" aria-labelledby="newsletter-heading">
      <img src="https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=1400&q=80" alt="Traveler standing before a breathtaking mountain vista" class="absolute inset-0 w-full h-full object-cover" loading="lazy"/>
      <div class="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/92 via-[#1a4a6b]/72 to-transparent" aria-hidden="true"></div>
      <div class="relative z-10 px-8 md:px-16 py-16 md:py-20 max-w-lg">
        <p class="text-[#7ec8e3] text-xs font-semibold tracking-[0.2em] uppercase mb-4">Newsletter</p>
        <h2 id="newsletter-heading" class="font-display font-bold text-white text-3xl md:text-4xl leading-tight mb-4">
          Join the Journey.<br>Never Miss a Story.
        </h2>
        <p class="text-white/70 text-sm leading-relaxed mb-8">
          Get exclusive travel guides, hidden gems, and adventure tips delivered straight to your inbox.
        </p>
        <form class="flex flex-col sm:flex-row gap-3" @submit.prevent="handleSubscribe">
          <label for="newsletter-email" class="sr-only">Your email address</label>
          <input
            id="newsletter-email"
            v-model="emailInput"
            type="email"
            placeholder="your@email.com"
            required
            autocomplete="email"
            class="flex-1 px-5 py-3.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white placeholder-white/40 text-sm outline-none focus:border-[#7ec8e3] focus:bg-white/20 transition-all duration-300"
          />
          <button type="submit" class="px-6 py-3.5 bg-[#7ec8e3] hover:bg-[#5bb8d4] text-[#1a1a1a] font-bold rounded-full text-sm tracking-wide transition-all duration-300 whitespace-nowrap hover:shadow-lg hover:shadow-[#7ec8e3]/30 hover:-translate-y-0.5 active:scale-95">
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
          <a href="/" class="flex items-center gap-3 mb-4">
            <div class="w-8 h-8 rounded-full bg-[#7ec8e3]/20 border border-[#7ec8e3]/30 flex items-center justify-center" aria-hidden="true">
              <svg class="w-4 h-4 text-[#7ec8e3]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/></svg>
            </div>
            <span class="font-display font-bold text-base">Uncharted <span class="text-[#7ec8e3]">with Shayon</span></span>
          </a>
          <p class="text-white/50 text-sm leading-relaxed">Stories from the road, one uncharted destination at a time.</p>
        </div>

        <div class="flex flex-wrap gap-12">
          <nav aria-label="Footer explore links">
            <p class="text-white/30 text-xs uppercase tracking-widest mb-4 font-semibold">Explore</p>
            <ul class="space-y-2.5">
              <li v-for="link in footerLinks" :key="link.label">
                <a :href="link.href" class="text-white/60 hover:text-white text-sm transition-colors duration-200">{{ link.label }}</a>
              </li>
            </ul>
          </nav>
          <nav aria-label="Social media links">
            <p class="text-white/30 text-xs uppercase tracking-widest mb-4 font-semibold">Connect</p>
            <ul class="space-y-2.5">
              <li v-for="social in socials" :key="social.label">
                <a :href="social.href" class="text-white/60 hover:text-[#7ec8e3] text-sm transition-colors duration-200">{{ social.label }}</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div class="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p class="text-white/30 text-xs">© 2025 Uncharted with Shayon. All rights reserved.</p>
        <p class="text-white/20 text-xs">Made with ♥ from the road</p>
      </div>
    </footer>

  </div>
</template>


<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';

// ── SEO Meta ──────────────────────────────────
useHead({
  title: 'Uncharted with Shayon — Travel & Adventure Blog',
  meta: [
    { name: 'description',        content: 'Unscripted journeys, raw landscapes, and travel stories from around the globe by Shayon.' },
    { name: 'keywords',           content: 'travel blog, adventure, destinations, hiking, Maldives, Himalayas, Kyoto, travel stories' },
    { property: 'og:title',       content: 'Uncharted with Shayon — Travel & Adventure Blog' },
    { property: 'og:description', content: 'Unscripted journeys and stories from the road.' },
    { property: 'og:type',        content: 'website' },
    { property: 'og:image',       content: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80' },
    { name: 'twitter:card',        content: 'summary_large_image' },
    { name: 'twitter:title',       content: 'Uncharted with Shayon' },
    { name: 'twitter:description', content: 'Unscripted journeys, raw landscapes, travel stories.' },
  ],
  link: [{ rel: 'canonical', href: 'https://unchartedwithshayon.com/' }]
})

// ── Search ────────────────────────────────────
const searchOpen     = ref(false)
const searchQuery    = ref('')
const searchInputRef = ref(null)

const recentSearches = ['Maldives beaches', 'Solo hiking Asia', 'Budget Europe']
const trendingDests  = [
  { name: 'Iceland',   icon: '🏔️', sub: 'Northern Lights' },
  { name: 'Bali',      icon: '🌴', sub: 'Rice terraces'   },
  { name: 'Patagonia', icon: '🏕️', sub: 'End of the world'},
  { name: 'Santorini', icon: '🌅', sub: 'Aegean magic'    },
]
const allPosts = [
  { title: 'Lost in Paradise: 10 Days in the Maldives',  category: 'Beach',   readTime: '8 min', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=80&q=60' },
  { title: 'Trekking the Himalayas: A Solo Adventure',   category: 'Hiking',  readTime: '6 min', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=80&q=60' },
  { title: 'Kyoto in Autumn: The Ultimate Temple Trail', category: 'Culture', readTime: '5 min', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=80&q=60' },
  { title: 'Swiss Alps on a Shoestring Budget',          category: 'Hiking',  readTime: '7 min', img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=80&q=60' },
  { title: 'Santorini Sunsets & Secret Villages',        category: 'Romance', readTime: '4 min', img: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=80&q=60' },
  { title: 'Chasing Northern Lights in Iceland',         category: 'Nature',  readTime: '9 min', img: 'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=80&q=60' },
]
const searchResults = computed(() => {
  if (!searchQuery.value.trim()) return []
  const q = searchQuery.value.toLowerCase()
  return allPosts.filter(p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
})
function openSearch()  { searchOpen.value = true;  nextTick(() => searchInputRef.value?.focus()) }
function closeSearch() { searchOpen.value = false; searchQuery.value = '' }

// ── Hero Background Cross-Fade ─────────────────
const heroBgs = [
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920&q=80',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80',
  'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1920&q=80',
]
const defaultBg       = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80'
const heroBg          = ref(defaultBg)
const bgFading        = ref(false)
const activeCardIndex  = ref(-1)

function setHeroBg(index) {
  if (activeCardIndex.value === index) { activeCardIndex.value = -1; crossFadeBg(defaultBg); return }
  activeCardIndex.value = index
  crossFadeBg(heroBgs[index])
}
function crossFadeBg(src) {
  bgFading.value = true
  setTimeout(() => { heroBg.value = src; bgFading.value = false }, 420)
}

// ── Categories ────────────────────────────────
const activeCategory = ref(0)
const categories = [
  { label: 'All',     icon: '🗺️', bg: 'bg-[#e8f4fd]' },
  { label: 'Hiking',  icon: '🥾', bg: 'bg-[#ddf4f0]' },
  { label: 'Desert',  icon: '🏜️', bg: 'bg-[#fdf3dc]' },
  { label: 'Forest',  icon: '🌲', bg: 'bg-[#dcf4e4]' },
  { label: 'Camping', icon: '⛺', bg: 'bg-[#fde8dc]' },
  { label: 'Beach',   icon: '🏖️', bg: 'bg-[#e8eafd]' },
]

// ── Posts ─────────────────────────────────────
const smallPosts = [
  { title: 'Trekking the Himalayas: A Solo Adventure',   img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80', imgAlt: 'Snow-capped Himalayan peaks with trekking trail', category: 'Hiking',  date: 'Feb 28, 2025', datetime: '2025-02-28', readTime: '6 min read' },
  { title: 'Kyoto in Autumn: The Ultimate Temple Trail', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80', imgAlt: 'Kyoto temple pathway lined with autumn maples',   category: 'Culture', date: 'Jan 15, 2025', datetime: '2025-01-15', readTime: '5 min read' },
]

// ── Marquee ───────────────────────────────────
const destinations = ['Maldives','Patagonia','Kyoto','Sahara','Santorini','Iceland','Bali','Machu Picchu','Amalfi Coast','New Zealand']

// ── Gallery ───────────────────────────────────
const galleryPhotos = [
  { src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80', alt: 'Swiss Alps panorama at golden hour',            span: 'col-span-1 row-span-2' },
  { src: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&q=80', alt: 'Santorini white domes overlooking the Aegean',   span: 'col-span-2 row-span-1' },
  { src: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=600&q=80', alt: 'Bali terraced rice fields at sunrise',            span: 'col-span-1 row-span-1' },
  { src: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80', alt: 'Misty forest trail in the Pacific Northwest',      span: 'col-span-1 row-span-1' },
  { src: 'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=600&q=80', alt: 'Aurora borealis over an Icelandic snowscape',     span: 'col-span-2 row-span-1' },
]

// ── Newsletter ────────────────────────────────
const emailInput = ref('')
const subscribed  = ref(false)
function handleSubscribe() {
  if (!emailInput.value) return
  subscribed.value = true
  emailInput.value = ''
  setTimeout(() => { subscribed.value = false }, 3500)
}

// ── Footer ────────────────────────────────────
const footerLinks = [
  { label: 'Destinations',  href: '/destinations' },
  { label: 'Stories',       href: '/stories'      },
  { label: 'Photo Journal', href: '/journal'       },
  { label: 'Travel Guides', href: '/guides'        },
  { label: 'About',         href: '/about'         },
]
const socials = [
  { label: 'Instagram',   href: '#' },
  { label: 'YouTube',     href: '#' },
  { label: 'Twitter / X', href: '#' },
  { label: 'Pinterest',   href: '#' },
]

// ── Keyboard: Esc closes search ───────────────
function onKeydown(e) { if (e.key === 'Escape' && searchOpen.value) closeSearch() }
onMounted(()  => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<style scoped lang="scss">
@use "~/assets/scss/travel-blog.scss";
</style>