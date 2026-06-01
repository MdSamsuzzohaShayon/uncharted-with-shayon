# Nuxt.js Home Page — Optimization Guide

A complete breakdown of every change made and **why** each one matters.

---

## File Structure

```
├── nuxt.config.ts                  # Nuxt + Vite + Nitro configuration
├── shared/
│   └── types/index.ts              # All TypeScript types (no `any`)
├── server/
│   └── api/
│       └── home-data.get.ts        # Cached server route (batches 4 → 1 request)
├── composables/
│   ├── useHomeData.ts              # Single composable for all page data
│   └── useHeroBg.ts               # Hero background cross-fade logic
├── components/
│   ├── FeatureCategory.vue         # Typed floating card component
│   └── HomeSkeleton.vue            # Graceful loading skeleton
└── pages/
    └── index.vue                   # Clean, optimized home page
```

---

## 1. Server-Side: Batch All API Calls (Biggest Win)

**Before:** 4 separate `useAsyncData` calls that could block render sequentially.

**After:** `server/api/home-data.get.ts` fires all 4 Strapi requests in **parallel** with `Promise.all()`, then caches the combined result with **Nitro's `defineCachedEventHandler`**.

```
Before: [latestReq] → [featuredReq] → [categoriesReq] → [activitiesReq]
         ~200ms          ~200ms            ~150ms             ~150ms = ~700ms

After:  Promise.all([latestReq, featuredReq, categoriesReq, activitiesReq])
        = ~200ms (slowest wins)  →  cached for 5 min  →  subsequent: ~1ms
```

**Cache policy:** `maxAge: 300` (fresh for 5 min) + `staleMaxAge: 3600` (serve stale for 1 hr while revalidating). For a travel blog that updates occasionally, this means almost every visitor gets a sub-millisecond response.

---

## 2. One `useAsyncData` Call on the Page

**Before:** 4 `await useAsyncData(...)` calls, each potentially delaying SSR render.

**After:** `useHomeData()` composable calls `$fetch('/api/home-data')` — one request, one awaited call. `useAsyncData` with `dedupe: 'defer'` means navigating back to the home page reuses the already-fetched data without any network round-trip.

---

## 3. Image Optimization (`nuxt/image`)

Every `<NuxtImg>` now has:

| Attribute | Reason |
|-----------|--------|
| `format="webp"` | 30–50% smaller than JPEG/PNG |
| `width` + `height` | Prevents layout shift (CLS), lets browser reserve space |
| `loading="lazy"` | Below-fold images load only when they enter viewport |
| `fetchpriority="high"` | Hero image only — tells browser to fetch it first |
| `fetchpriority="low"` | All other images — don't compete with LCP |

The hero image also gets `loading="eager"` so it's part of the initial request — critical for LCP score.

---

## 4. Route-Level HTTP Caching (`routeRules`)

```ts
'/': { swr: 60 * 5, headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600' } }
```

This tells your CDN (Cloudflare, Vercel Edge, etc.) to cache the **full rendered HTML** of the home page for 5 minutes and serve stale copies for up to 1 hour. Repeat visitors get instant HTML without hitting your server at all.

---

## 5. TypeScript: Zero `any`

`shared/types/index.ts` defines:
- `StrapiMedia` — image shape
- `StrapiListResponse<T>` — generic wrapper used for all list endpoints
- `IArticle`, `ICategory`, `IActivity` — domain models
- `IHomePageData` — shape of the cached server response

The `IFeaturedArticlesResponse` type that was missing in the original code is now properly declared. All computed properties and function signatures are fully typed.

---

## 6. Error Handling

The page now renders:
- **`<HomeSkeleton>`** when `pending === true` (client-side nav without cache)
- **Error UI with retry button** when `error` is non-null
- **Full content** otherwise

The retry calls `refresh()` from the same `useAsyncData` key, which refetches without reloading the page.

---

## 7. Computed & Reactivity Efficiency

- `marqueeDestinations` is now a `computed()` — the doubled array is created once, not on every render cycle.
- `MOSAIC_SPANS` array is defined **outside** the composable — not re-created on each invocation.
- `latestGrouped`, `firstArticle`, `nextTwoArticles` are all `computed` — they recalculate only when `data` changes (which is rare with caching).
- `useHeroBg` is a dedicated composable so the cross-fade timer logic doesn't mix with data fetching.

---

## 8. DRY Improvements

| Original duplication | Fixed |
|---|---|
| 4 separate fetch boilerplate blocks | 1 composable (`useHomeData`) |
| `activeCategoryId === -1` toggle hack | `null` check with proper type |
| `v-if` + `v-for` on same element | Separated (Vue 3 best practice) |
| `String(article.id)` fallback | `article.slug ?? article.id` with null coalescing |
| Category badge loop without `:key` | Added `:key="cat.slug"` |

---

## 9. `nuxt.config.ts` Additions

| Setting | Effect |
|---|---|
| `image.domains` | Allows external CDN URLs to be proxied through IPX for resizing |
| `image.screens` | Correct srcset breakpoints for responsive images |
| `nitro.compressPublicAssets` | Gzip + Brotli compression on all static assets |
| `nitro.minify` | Minified server bundle |
| `vite.build.manualChunks` | Separates Vue core into its own long-cached chunk |
| `app.head.link preconnect` | Tells browser to open TCP connection to CDN early |
| `runtimeConfig` env vars | Tokens read from environment, not hardcoded |

---

## Production Checklist

- [ ] Set `NUXT_PUBLIC_BACKEND_API`, `NUXT_PUBLIC_ACCESS_TOKEN`, `NUXT_PUBLIC_FULL_ACCESS_TOKEN` as environment variables
- [ ] Add your Strapi host to `image.domains` in `nuxt.config.ts`
- [ ] Swap Nitro's `fs` cache driver for `redis` or `upstash` in production
- [ ] Enable a CDN (Cloudflare) in front of your deployment to leverage `Cache-Control` headers
- [ ] Set `devtools: { enabled: false }` for production builds
