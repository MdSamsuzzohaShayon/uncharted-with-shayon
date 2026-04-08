// composables/useArticle.ts (Fixed with proper useAsyncData)

import type { DeepReadonly, Ref } from 'vue'
import type { IArticle, IArticleBySlugResponse } from '#shared/types/article'

interface CacheEntry<T> {
    data: T
    timestamp: number
    ttl: number
}

interface UseArticleReturn {
    article: DeepReadonly<Ref<IArticle | null>>
    pending: DeepReadonly<Ref<boolean>>
    error: DeepReadonly<Ref<Error | null>>
    fetchArticle: (slug: string, options?: FetchArticleOptions) => Promise<IArticle | null>
    incrementViews: (documentId: string) => Promise<void>
    refreshArticle: () => Promise<void>
    clearArticleCache: (slug?: string) => void
}

interface FetchArticleOptions {
    forceRefresh?: boolean
    ttl?: number // Time to live in milliseconds
}

// Simple in-memory cache with TTL (for client-side cache persistence)
const articleCache = new Map<string, CacheEntry<IArticle>>()

const getCachedArticle = (slug: string, ttl?: number): IArticle | null => {
    // Only use this cache on client side
    if (!import.meta.client) return null
    
    const cached = articleCache.get(`article-${slug}`)
    if (!cached) return null

    const isExpired = ttl ? Date.now() - cached.timestamp > ttl : false
    if (isExpired) {
        articleCache.delete(`article-${slug}`)
        return null
    }

    return cached.data
}

const setCachedArticle = (slug: string, data: IArticle, ttl: number = 5 * 60 * 1000): void => {
    if (!import.meta.client) return // Only cache on client side
    
    articleCache.set(`article-${slug}`, {
        data,
        timestamp: Date.now(),
        ttl
    })
}

export const useArticle = (initialSlug?: string): UseArticleReturn => {
    const config = useRuntimeConfig()

    const article = ref<IArticle | null>(null)
    const error = ref<Error | null>(null)
    const pending = ref(false)
    
    let currentSlug: string = initialSlug || ''
    let refreshFunction: (() => Promise<void>) | null = null

    const fetchArticle = async (slug: string, options: FetchArticleOptions = {}): Promise<IArticle | null> => {
        const { forceRefresh = false, ttl = 5 * 60 * 1000 } = options

        if (!slug) {
            error.value = createError({
                statusCode: 400,
                statusMessage: 'Invalid request',
                message: 'Article slug is required'
            })
            return null
        }

        currentSlug = slug
        const cacheKey = `article-${slug}`

        // Check client-side cache first
        if (!forceRefresh && import.meta.client) {
            const cachedArticle = getCachedArticle(slug, ttl)
            if (cachedArticle) {
                article.value = cachedArticle
                pending.value = false
                error.value = null
                return cachedArticle
            }
        }

        // Use useAsyncData for SSR-friendly fetching and caching
        const { data, pending: asyncPending, error: asyncError, refresh } = await useAsyncData<IArticleBySlugResponse>(
            cacheKey,
            async () => {
                const response = await $fetch<IArticleBySlugResponse>(
                    `${config.public.backendApi}/api/articles`,
                    {
                        params: {
                            'filters[slug][$eq]': slug,
                            'fields[0]': 'title',
                            'fields[1]': 'slug',
                            'fields[2]': 'youtube_url',
                            'fields[3]': 'published_date',
                            'fields[4]': 'travel_cost',
                            'fields[5]': 'best_time',
                            'fields[6]': 'map_lat',
                            'fields[7]': 'map_lng',
                            'fields[8]': 'meta_title',
                            'fields[9]': 'meta_description',
                            'fields[10]': 'canonical_url',
                            'fields[11]': 'views',
                            'fields[12]': 'description',
                            'populate[featured_image][fields][0]': 'url',
                            'populate[featured_image][fields][1]': 'name',
                            'populate[gallery][fields][0]': 'url',
                            'populate[categories][fields][0]': 'name',
                            'populate[categories][fields][1]': 'slug',
                            'populate[tags][fields][0]': 'name',
                            'populate[tags][fields][1]': 'slug',
                            'populate[activities][fields][0]': 'name',
                            'populate[activities][fields][1]': 'slug'
                        },
                        headers: {
                            'Authorization': `Bearer ${config.public.accessToken}`
                        }
                    }
                )

                if (!response?.data?.[0]) {
                    throw createError({
                        statusCode: 404,
                        statusMessage: 'Article not found',
                        message: 'The requested adventure article could not be found.',
                        fatal: true
                    })
                }

                return response
            },
            {
                server: true,
                lazy: false, // Wait for data before navigation completes
                immediate: true, // Execute immediately
                getCachedData(key) {
                    // Use Nuxt's payload cache first (for SSR hydration)
                    const nuxtCached = useNuxtData<IArticleBySlugResponse>(key).data.value
                    if (nuxtCached) {
                        return nuxtCached
                    }
                    
                    // Fall back to our TTL cache on client
                    if (import.meta.client) {
                        const cached = getCachedArticle(slug, ttl)
                        if (cached) {
                            return { data: [cached], meta: { pagination: { page: 1, pageSize: 1, pageCount: 1, total: 1 } } } as IArticleBySlugResponse
                        }
                    }
                    
                    return undefined
                }
            }
        )

        // Store refresh function for later use
        refreshFunction = refresh

        // Watch for changes in async state
        watch(asyncPending, (value) => {
            pending.value = value
        }, { immediate: true })

        // Watch for errors
        watch(asyncError, (value) => {
            if (value) {
                error.value = value as Error
                article.value = null
            } else {
                error.value = null
            }
        }, { immediate: true })

        // Watch for data changes
        watch(data, (newData) => {
            if (newData?.data?.[0]) {
                const articleData = newData.data[0]
                article.value = articleData
                error.value = null
                
                // Update client-side cache
                if (import.meta.client) {
                    setCachedArticle(slug, articleData, ttl)
                }
            }
        }, { immediate: true })

        // Wait for the data to be available
        await new Promise<void>((resolve) => {
            if (!asyncPending.value && data.value) {
                resolve()
            } else {
                const unwatch = watch([asyncPending, data], () => {
                    if (!asyncPending.value && data.value) {
                        unwatch()
                        resolve()
                    }
                })
            }
        })

        return article.value
    }

    const refreshArticle = async (): Promise<void> => {
        if (refreshFunction) {
            await refreshFunction()
        } else if (currentSlug) {
            await fetchArticle(currentSlug, { forceRefresh: true })
        }
    }

    const clearArticleCache = (slug?: string): void => {
        if (slug) {
            // Clear both caches
            articleCache.delete(`article-${slug}`)
            clearNuxtData(`article-${slug}`)
        } else {
            // Clear all article caches
            for (const key of articleCache.keys()) {
                if (key.startsWith('article-')) {
                    articleCache.delete(key)
                }
            }
            clearNuxtData()
        }
    }

    const incrementViews = async (documentId: string): Promise<void> => {
        if (!documentId) return

        try {
            await $fetch(`${config.public.backendApi}/api/articles/${documentId}`, {
                method: 'PUT',
                body: {
                    data: {
                        views: (article.value?.views || 0) + 1
                    }
                },
                headers: {
                    'Authorization': `Bearer ${config.public.fullAccessToken}`
                }
            })

            // Update local view count
            if (article.value) {
                article.value.views += 1

                // Update cache with new view count
                if (currentSlug) {
                    setCachedArticle(currentSlug, article.value, 5 * 60 * 1000)
                }
            }

            // Refresh Nuxt data cache
            if (currentSlug) {
                refreshNuxtData(`article-${currentSlug}`)
            }
        } catch (err) {
            console.error('Error incrementing views:', err)
            // Don't throw - view count is not critical
        }
    }

    // Auto-fetch if initialSlug is provided
    if (initialSlug) {
        fetchArticle(initialSlug).catch(console.error)
    }

    return {
        article: readonly(article),
        pending: readonly(pending),
        error: readonly(error),
        fetchArticle,
        incrementViews,
        refreshArticle,
        clearArticleCache
    }
}