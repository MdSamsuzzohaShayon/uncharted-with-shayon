/**
 * nuxt.config.ts
 *
 * Performance-first configuration for the Uncharted travel blog.
 *
 * Key wins over the default config:
 *  1. NuxtImg (nuxt/image) with automatic WebP conversion + width/height
 *  2. Route-level HTTP cache headers via routeRules (stale-while-revalidate)
 *  3. Nitro server-side caching storage configured for KV-compatible drivers
 *  4. Pre-bundled heavy deps to prevent client-side parse time
 *  5. Strict TypeScript mode for catching runtime issues at build time
 */

import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  // ── Compatibility ─────────────────────────────────────────────────────────
  compatibilityDate: '2025-01-01',
  future: { compatibilityVersion: 4 },

  // ── Modules ───────────────────────────────────────────────────────────────
  modules: [
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
  ],

  // ── TypeScript ────────────────────────────────────────────────────────────
  typescript: {
    strict: true,
    typeCheck: true,          // Surface type errors during build, not just in IDE
    shim: false,
  },

  // ── NuxtImg (nuxt/image) ──────────────────────────────────────────────────
  image: {
    // Use the built-in ipx provider (handles resize + WebP on the fly)
    provider: 'ipx',

    // Allowed external image domains (add your Cloudflare R2 / Strapi host)
    domains: [
      'pub-c5ea369ed0724b91bc453d6b131a6067.r2.dev',
      // add your strapi host, e.g. 'api.yourdomain.com'
    ],

    // Pre-defined sizes so the browser can pick the best srcset entry
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },

    // Generate srcset for these widths automatically
    presets: {
      hero: {
        modifiers: { format: 'webp', quality: 80 },
      },
      card: {
        modifiers: { format: 'webp', quality: 75 },
      },
      thumb: {
        modifiers: { format: 'webp', quality: 70 },
      },
    },
  },

  // ── Route Rules ───────────────────────────────────────────────────────────
  // Adds HTTP Cache-Control headers and activates Nitro's ISR/SWR per route.
  routeRules: {
    // Home page: serve from cache for 5 min, allow stale for 1 hr
    '/': {
      swr: 60 * 5,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
      },
    },

    // Internal server API route – same SWR policy, short CDN TTL
    '/api/home-data': {
      swr: 60 * 5,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
      },
    },

    // Static assets – long cache
    '/_nuxt/**': {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    },
  },

  // ── Nitro (server engine) ─────────────────────────────────────────────────
  nitro: {
    // Use filesystem cache by default; swap for Redis/Upstash in production:
    // storage: { cache: { driver: 'redis', url: process.env.REDIS_URL } }
    storage: {
      cache: {
        driver: 'fs',
        base: './.nitro/cache',
      },
    },

    compressPublicAssets: {
      gzip: true,
      brotli: true,
    },

    // Minify server output
    minify: true,
  },

  // ── Vite (client bundler) ─────────────────────────────────────────────────
  vite: {
    build: {
      // Larger chunks allowed before warning (travel sites have big images + markup)
      chunkSizeWarningLimit: 500,

      rollupOptions: {
        output: {
          // Manual chunking: vendor libs in their own chunk for long-lived cache
          manualChunks: {
            'vue-vendor': ['vue', 'vue-router'],
          },
        },
      },
    },

    // Tell Vite to pre-bundle these so they're not lazy-loaded on first paint
    optimizeDeps: {
      include: ['vue', 'vue-router'],
    },
  },

  // ── App-level head defaults ───────────────────────────────────────────────
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        // Hint browser to preconnect to image CDN for faster LCP
        { 'http-equiv': 'x-dns-prefetch-control', content: 'on' },
      ],
      link: [
        // Preconnect to your image CDN
        {
          rel: 'preconnect',
          href: 'https://pub-c5ea369ed0724b91bc453d6b131a6067.r2.dev',
          crossorigin: '',
        },
      ],
    },
  },

  // ── Runtime config ────────────────────────────────────────────────────────
  // PUBLIC values are inlined into the client bundle.
  // PRIVATE values (no `public.` prefix) stay server-only.
  runtimeConfig: {
    // ⚠ These should be set via environment variables, NOT hardcoded here.
    // Shown as placeholders.
    public: {
      backendApi: process.env.NUXT_PUBLIC_BACKEND_API ?? '',
      accessToken: process.env.NUXT_PUBLIC_ACCESS_TOKEN ?? '',
      fullAccessToken: process.env.NUXT_PUBLIC_FULL_ACCESS_TOKEN ?? '',
    },
  },

  // ── Dev tools ─────────────────────────────────────────────────────────────
  devtools: { enabled: process.env.NODE_ENV !== 'production' },
})
